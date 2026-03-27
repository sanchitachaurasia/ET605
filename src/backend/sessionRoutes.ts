import { Request, Response, Router } from 'express';
import { db, auth } from './firebase';
import admin from 'firebase-admin';

const router = Router();
const ADMIN_API_KEY = String(process.env.ADMIN_API_KEY || '').trim();
const GEO_IP_ENABLED = String(process.env.GEO_IP_ENABLED || 'true').toLowerCase() !== 'false';
const GEO_IP_PROVIDER = String(process.env.GEO_IP_PROVIDER || 'ipapi').trim().toLowerCase();
const GEO_IP_TIMEOUT_MS = Math.max(Number(process.env.GEO_IP_TIMEOUT_MS) || 1500, 500);
const GEO_IP_CACHE_TTL_MS = Math.max(Number(process.env.GEO_IP_CACHE_TTL_MS) || 12 * 60 * 60 * 1000, 60 * 1000);

type GeoIpResult = {
  city?: string;
  country?: string;
  countryCode?: string;
};

const geoIpCache = new Map<string, { expiresAt: number; value: GeoIpResult | null }>();

const getClientIp = (req: Request) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string' && xForwardedFor.length) {
    return xForwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length) {
    return realIp;
  }
  return req.socket.remoteAddress || 'unknown';
};

const normalizeIp = (ip: string) => {
  const value = String(ip || '').trim();
  if (!value) return '';
  return value.startsWith('::ffff:') ? value.slice(7) : value;
};

const isPrivateOrLocalIp = (ip: string) => {
  const value = normalizeIp(ip);
  if (!value) return true;
  if (value === '127.0.0.1' || value === '::1' || value === 'localhost') return true;
  if (value.startsWith('10.')) return true;
  if (value.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(value)) return true;
  if (value.startsWith('169.254.')) return true;
  if (value.startsWith('fc') || value.startsWith('fd')) return true;
  return false;
};

const sanitizeGeoIpField = (value: any) => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const fetchJsonWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEO_IP_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const fetchGeoIp = async (ip: string): Promise<GeoIpResult | null> => {
  if (!GEO_IP_ENABLED) return null;

  const normalizedIp = normalizeIp(ip);
  if (!normalizedIp || isPrivateOrLocalIp(normalizedIp)) {
    return null;
  }

  const cached = geoIpCache.get(normalizedIp);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  try {
    let result: GeoIpResult | null = null;

    if (GEO_IP_PROVIDER === 'ipwhois' || GEO_IP_PROVIDER === 'ipwho.is') {
      const data = await fetchJsonWithTimeout(`https://ipwho.is/${encodeURIComponent(normalizedIp)}`);
      if (data && data.success !== false) {
        result = {
          city: sanitizeGeoIpField(data.city),
          country: sanitizeGeoIpField(data.country),
          countryCode: sanitizeGeoIpField(data.country_code),
        };
      }
    } else {
      const data = await fetchJsonWithTimeout(`https://ipapi.co/${encodeURIComponent(normalizedIp)}/json/`);
      if (data && !data.error) {
        result = {
          city: sanitizeGeoIpField(data.city),
          country: sanitizeGeoIpField(data.country_name),
          countryCode: sanitizeGeoIpField(data.country_code),
        };
      }
    }

    geoIpCache.set(normalizedIp, {
      value: result,
      expiresAt: Date.now() + GEO_IP_CACHE_TTL_MS,
    });
    return result;
  } catch {
    geoIpCache.set(normalizedIp, {
      value: null,
      expiresAt: Date.now() + Math.min(GEO_IP_CACHE_TTL_MS, 5 * 60 * 1000),
    });
    return null;
  }
};

const toIsoString = (value: any) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  return null;
};

const stripUndefinedDeep = (input: any): any => {
  if (Array.isArray(input)) {
    return input
      .map((item) => stripUndefinedDeep(item))
      .filter((item) => item !== undefined);
  }

  if (input && typeof input === 'object') {
    const output: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      const cleaned = stripUndefinedDeep(value);
      if (cleaned !== undefined) {
        output[key] = cleaned;
      }
    }
    return output;
  }

  return input === undefined ? undefined : input;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableFirestoreError = (error: any) => {
  const code = Number(error?.code);
  const message = String(error?.message || '').toLowerCase();
  return (
    code === 4 || // DEADLINE_EXCEEDED
    code === 10 || // ABORTED
    code === 13 || // INTERNAL
    code === 14 || // UNAVAILABLE
    message.includes('deadline exceeded') ||
    message.includes('unavailable') ||
    message.includes('aborted')
  );
};

const withFirestoreRetry = async <T>(
  label: string,
  operation: () => Promise<T>,
  maxAttempts = 4
): Promise<T> => {
  let attempt = 0;
  let lastError: any;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      const retryable = isRetryableFirestoreError(error);
      if (!retryable || attempt >= maxAttempts) {
        throw error;
      }

      const delayMs = Math.min(3000, 250 * Math.pow(2, attempt - 1));
      console.warn(`${label} failed on attempt ${attempt}/${maxAttempts}, retrying in ${delayMs}ms`, {
        code: error?.code,
        message: error?.message,
      });
      await sleep(delayMs);
    }
  }

  throw lastError;
};

const isMissingIndexError = (error: any) => {
  const message = String(error?.message || '').toLowerCase();
  const code = String(error?.code || '').toLowerCase();
  return (
    message.includes('requires an index') ||
    message.includes('failed_precondition') ||
    code === 'failed-precondition' ||
    code === '9'
  );
};

/**
 * Middleware to verify Firebase auth token
 */
const verifyToken = async (req: Request, res: Response, next: any) => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new Error('No token');

    const decodedToken = await auth.verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const verifyAdminAccess = async (req: Request, res: Response, next: any) => {
  try {
    const headerAdminKey = String(req.headers['x-admin-key'] || '').trim();
    const queryAdminKey = String(req.query.adminKey || '').trim();
    const authorization = String(req.headers.authorization || '').trim();
    const bearerToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';

    if (ADMIN_API_KEY) {
      const providedKey = headerAdminKey || queryAdminKey || (bearerToken === ADMIN_API_KEY ? bearerToken : '');
      if (providedKey && providedKey === ADMIN_API_KEY) {
        return next();
      }
    }

    if (bearerToken && bearerToken !== ADMIN_API_KEY) {
      const decodedToken = await auth.verifyIdToken(bearerToken);
      if (decodedToken.admin === true || decodedToken.role === 'admin') {
        (req as any).admin = decodedToken;
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      error: 'Admin authorization failed',
      hint: 'Provide x-admin-key header (or adminKey query for export), or a Firebase token with admin claim.'
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: error?.message || 'Admin authorization failed'
    });
  }
};

/**
 * POST /api/session/update
 * Save session metrics to cloud
 */
router.post('/update', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { chapterId, metrics, status } = req.body;

    if (!chapterId || !metrics) {
      return res.status(400).json({
        error: 'chapterId and metrics required'
      });
    }

    // Store session data in Firestore
    await db
      .collection('students')
      .doc(user.uid)
      .collection('sessions')
      .doc(chapterId)
      .set(
        {
          chapterId,
          metrics,
          status: status || 'in_progress',
          updatedAt: admin.firestore.Timestamp.now(),
          syncedAt: admin.firestore.Timestamp.now()
        },
        { merge: true }
      );

    res.json({
      success: true,
      message: 'Session saved to cloud'
    });
  } catch (error: any) {
    console.error('Session update error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/session/:chapterId
 * Fetch session data from cloud
 */
router.get('/:chapterId', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const chapterId = String(req.params.chapterId || '').trim();

    if (!chapterId) {
      return res.status(400).json({ success: false, error: 'chapterId required' });
    }

    const docSnap = await db
      .collection('students')
      .doc(user.uid)
      .collection('sessions')
      .doc(chapterId)
      .get();

    if (!docSnap.exists) {
      return res.json({
        success: true,
        session: null,
        message: 'No session found'
      });
    }

    res.json({
      success: true,
      session: docSnap.data()
    });
  } catch (error: any) {
    console.error('Session fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/session/payload
 * Save final session payload (when chapter completes)
 */
router.post('/payload', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const payload = req.body;
    const clientIp = getClientIp(req);
    const geo = await fetchGeoIp(clientIp);

    // Store in session payloads collection
    await db
      .collection('students')
      .doc(user.uid)
      .collection('session_payloads')
      .add({
        ...payload,
        studentId: user.uid,
        clientIp,
        clientGeo: geo || null,
        submittedAt: admin.firestore.Timestamp.now()
      });

    res.json({
      success: true,
      message: 'Session payload stored'
    });
  } catch (error: any) {
    console.error('Payload save error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/session/profile
 * Persist student progress/profile fields for login resume
 */
router.post('/profile', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const progress = req.body?.progress || {};

    const allowedKeys = [
      'name',
      'school',
      'class',
      'preTestScore',
      'preTestDone',
      'preTestRetakeInProgress',
      'preTestProgress',
      'postTestProgress',
      'learningPath',
      'preTestFeedback',
      'recommendedStyle',
      'moduleProgress',
      'moduleTracking',
      'badgesEarned',
      'postTestScore',
      'journeyComplete',
      'lives',
      'xp',
      'coins',
      'streak',
      'settings',
      'sessionStatus',
      'exitConfirmed',
      'isStruggling'
    ];

    const sanitized: Record<string, any> = {};
    for (const key of allowedKeys) {
      if (progress[key] !== undefined) {
        sanitized[key] = progress[key];
      }
    }

    sanitized.updatedAt = admin.firestore.Timestamp.now();

    await db.collection('students').doc(user.uid).set(sanitized, { merge: true });

    res.json({
      success: true,
      message: 'Student progress synced'
    });
  } catch (error: any) {
    console.error('Profile sync error:', error);
    res.status(500).json({ error: error.message || 'Failed to sync profile' });
  }
});

/**
 * GET /api/session/all
 * Fetch all sessions for a student
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const sessionDocs = await db
      .collection('students')
      .doc(user.uid)
      .collection('sessions')
      .get();

    const sessions = sessionDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      sessions
    });
  } catch (error: any) {
    console.error('Fetch sessions error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/session/telemetry/batch
 * Persist telemetry clickstream and interaction events to Firestore.
 */
router.post('/telemetry/batch', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const events = Array.isArray(req.body?.events) ? req.body.events : [];

    if (!events.length) {
      return res.status(400).json({ success: false, error: 'events array required' });
    }

    const ipAddress = getClientIp(req);
    const geo = await fetchGeoIp(ipAddress);
    const eventsToStore = events.slice(0, 2000);
    const chunkSize = 200;

    for (let i = 0; i < eventsToStore.length; i += chunkSize) {
      const chunk = eventsToStore.slice(i, i + chunkSize);
      const batch = db.batch();

      for (const event of chunk) {
        const eventRef = db.collection('analytics_events').doc();
        const eventDocRaw = {
          ...event,
          uid: user.uid,
          student_id: event.student_id || user.uid,
          context: {
            ...(event.context || {}),
            ip: ipAddress,
            city: event?.context?.city || geo?.city || undefined,
            country: event?.context?.country || geo?.country || undefined,
            countryCode: event?.context?.countryCode || geo?.countryCode || undefined,
          },
          serverTimestamp: admin.firestore.Timestamp.now(),
        };
        const eventDoc = stripUndefinedDeep(eventDocRaw);
        batch.set(eventRef, eventDoc);
      }

      await withFirestoreRetry(`telemetry-batch-commit-${i / chunkSize + 1}`, () => batch.commit());
    }

    const summaryRef = db.collection('students').doc(user.uid).collection('analytics').doc('summary');
    const uniqueDevices = events
      .map((ev: any) => ev?.context?.device_id)
      .filter((value: string | undefined) => !!value);

    const uniqueCities = events
      .map((ev: any) => ev?.context?.city || geo?.city)
      .filter((value: string | undefined) => !!value);

    const uniqueCountries = events
      .map((ev: any) => ev?.context?.country || geo?.country)
      .filter((value: string | undefined) => !!value);

    const summaryUpdate: Record<string, any> = {
      studentId: user.uid,
      lastActivityAt: admin.firestore.Timestamp.now(),
      totalEvents: admin.firestore.FieldValue.increment(events.length),
    };

    if (uniqueDevices.length) {
      summaryUpdate.uniqueDevices = admin.firestore.FieldValue.arrayUnion(...uniqueDevices);
    }
    if (ipAddress) {
      summaryUpdate.uniqueIps = admin.firestore.FieldValue.arrayUnion(ipAddress);
    }
    if (uniqueCities.length) {
      summaryUpdate.uniqueCities = admin.firestore.FieldValue.arrayUnion(...uniqueCities);
    }
    if (uniqueCountries.length) {
      summaryUpdate.uniqueCountries = admin.firestore.FieldValue.arrayUnion(...uniqueCountries);
    }

    await withFirestoreRetry('telemetry-summary-upsert', () => summaryRef.set(summaryUpdate, { merge: true }));

    res.json({ success: true, stored: eventsToStore.length });
  } catch (error: any) {
    console.error('Telemetry batch error:', error);
    res.status(500).json({ success: false, error: error.message || 'Telemetry write failed' });
  }
});

/**
 * GET /api/session/admin/realtime
 * Fetch recent events and user-level aggregate summaries for admin dashboard.
 */
router.get('/admin/realtime', verifyAdminAccess, async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 200, 10), 1000);

    const eventSnap = await db
      .collection('analytics_events')
      .orderBy('serverTimestamp', 'desc')
      .limit(limit)
      .get();

    const events = eventSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp || toIsoString(doc.data().serverTimestamp),
    }));

    const studentSnap = await db.collection('students').limit(500).get();
    const users = await Promise.all(
      studentSnap.docs.map(async (doc) => {
        const student = doc.data();
        const summaryDoc = await db.collection('students').doc(doc.id).collection('analytics').doc('summary').get();
        const summary = summaryDoc.exists ? summaryDoc.data() : {};

        return {
          studentId: doc.id,
          userId: student?.userId || doc.id,
          name: student?.name || 'Unknown',
          email: student?.email || '',
          school: student?.school || '',
          class: student?.class || '',
          totalEvents: summary?.totalEvents || 0,
          totalDevices: (summary?.uniqueDevices || []).length,
          totalLocations: (summary?.uniqueCountries || []).length,
          totalIps: (summary?.uniqueIps || []).length,
          lastActivityAt: toIsoString(summary?.lastActivityAt),
        };
      })
    );

    res.json({
      success: true,
      stats: {
        totalEvents: events.length,
        activeUsers: new Set(events.map((event: any) => event.student_id || event.uid)).size,
      },
      events,
      users,
    });
  } catch (error: any) {
    console.error('Admin realtime fetch error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch realtime data' });
  }
});

/**
 * GET /api/session/admin/user/:studentId/activity
 * Fetch all recent activity and summaries for a specific student.
 */
router.get('/admin/user/:studentId/activity', verifyAdminAccess, async (req: Request, res: Response) => {
  try {
    const studentId = String(req.params.studentId || '').trim();
    const limit = Math.min(Math.max(Number(req.query.limit) || 1000, 10), 5000);

    if (!studentId) {
      return res.status(400).json({ success: false, error: 'studentId required' });
    }

    let eventSnap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;
    try {
      eventSnap = await db
        .collection('analytics_events')
        .where('student_id', '==', studentId)
        .orderBy('serverTimestamp', 'desc')
        .limit(limit)
        .get();
    } catch (queryError: any) {
      if (!isMissingIndexError(queryError)) {
        throw queryError;
      }

      // Fallback while composite index is still building/not deployed.
      eventSnap = await db
        .collection('analytics_events')
        .where('student_id', '==', studentId)
        .limit(limit)
        .get();
    }

    const payloadSnap = await db
      .collection('students')
      .doc(studentId)
      .collection('session_payloads')
      .orderBy('submittedAt', 'desc')
      .limit(100)
      .get();

    const summaryDoc = await db.collection('students').doc(studentId).collection('analytics').doc('summary').get();

    const events = eventSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp || toIsoString(doc.data().serverTimestamp),
    }))
      .sort((a: any, b: any) => {
        const aTs = new Date(a.timestamp || 0).getTime();
        const bTs = new Date(b.timestamp || 0).getTime();
        return bTs - aTs;
      })
      .slice(0, limit);

    const sessionPayloads = payloadSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: toIsoString(doc.data().submittedAt),
    }));

    const summary = summaryDoc.exists ? summaryDoc.data() : {};

    res.json({
      success: true,
      studentId,
      summary: {
        ...summary,
        totalDevices: (summary?.uniqueDevices || []).length,
        totalLocations: (summary?.uniqueCountries || []).length,
        totalIps: (summary?.uniqueIps || []).length,
        lastActivityAt: toIsoString(summary?.lastActivityAt),
      },
      events,
      sessionPayloads,
    });
  } catch (error: any) {
    console.error('Admin user activity fetch error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch user activity' });
  }
});

/**
 * GET /api/session/admin/export
 * Export analytics events in CSV format for Excel.
 */
router.get('/admin/export', verifyAdminAccess, async (req: Request, res: Response) => {
  try {
    const studentId = String(req.query.studentId || '').trim();
    const limit = Math.min(Math.max(Number(req.query.limit) || 5000, 10), 20000);

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db
      .collection('analytics_events')
      .orderBy('serverTimestamp', 'desc')
      .limit(limit);

    if (studentId) {
      query = db
        .collection('analytics_events')
        .where('student_id', '==', studentId)
        .orderBy('serverTimestamp', 'desc')
        .limit(limit);
    }

    const snap = await query.get();

    const headers = [
      'event_id',
      'timestamp',
      'student_id',
      'session_id',
      'chapter_id',
      'module_id',
      'question_id',
      'type',
      'device_id',
      'ip',
      'city',
      'country',
      'url',
      'event_data',
    ];

    const escapeCsv = (value: any) => {
      const str = value === null || value === undefined ? '' : String(value);
      if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = snap.docs.map((doc) => {
      const row = doc.data();
      return [
        doc.id,
        row.timestamp || toIsoString(row.serverTimestamp),
        row.student_id || row.uid || '',
        row.session_id || '',
        row.chapter_id || '',
        row.module_id || '',
        row.question_id || '',
        row.type || '',
        row.context?.device_id || '',
        row.context?.ip || '',
        row.context?.city || '',
        row.context?.country || '',
        row.context?.url || '',
        row.event_data ? JSON.stringify(row.event_data) : '',
      ].map(escapeCsv).join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.header('Content-Disposition', `attachment; filename="analytics_export_${studentId || 'all'}.csv"`);
    res.send(csv);
  } catch (error: any) {
    console.error('Admin export error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to export analytics' });
  }
});

export default router;
