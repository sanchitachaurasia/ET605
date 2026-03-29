import express from 'express';
const { Request, Response, Router } = express;
import { auth, db } from './firebase.ts';
import admin from 'firebase-admin';

const router = Router();

const USER_ID_PATTERN = /^[a-zA-Z0-9_.-]{4,24}$/;

const normalizeUserId = (value: string) => String(value || '').trim().toLowerCase();
const isEmailIdentifier = (value: string) => /@/.test(String(value || '').trim());

const toUserIdBase = (value: string) => {
  const normalized = normalizeUserId(value)
    .replace(/[^a-z0-9_.-]+/g, '-')
    .replace(/^[-_.]+|[-_.]+$/g, '');

  if (!normalized) return 'student';
  if (normalized.length < 4) return `${normalized}001`.slice(0, 4);
  return normalized.slice(0, 24);
};

const resolveUniqueUserId = async (baseCandidate: string, excludeUid?: string) => {
  const base = toUserIdBase(baseCandidate);

  for (let attempt = 0; attempt < 5000; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(attempt + 1);
    const trimmedBase = suffix ? base.slice(0, Math.max(4, 24 - suffix.length)) : base;
    const candidate = `${trimmedBase}${suffix}`;

    if (!USER_ID_PATTERN.test(candidate)) continue;

    const snap = await db
      .collection('students')
      .where('userIdNormalized', '==', candidate)
      .limit(1)
      .get();

    if (snap.empty) return candidate;

    const existingUid = snap.docs[0]?.id;
    if (excludeUid && existingUid === excludeUid) {
      return candidate;
    }
  }

  throw new Error('Could not generate a unique user ID');
};

const ensureUserIdForStudent = async (uid: string, studentData: any) => {
  const existing = normalizeUserId(studentData?.userId || '');
  if (existing && USER_ID_PATTERN.test(existing)) {
    if (studentData?.userIdNormalized !== existing) {
      await db.collection('students').doc(uid).set({
        userId: existing,
        userIdNormalized: existing,
      }, { merge: true });
    }
    return existing;
  }

  const basedOnName = String(studentData?.name || '').trim();
  const generated = await resolveUniqueUserId(basedOnName || `student_${uid.slice(0, 6)}`, uid);

  await db.collection('students').doc(uid).set({
    userId: generated,
    userIdNormalized: generated,
  }, { merge: true });

  return generated;
};

router.get('/check-userid', async (req: Request, res: Response) => {
  try {
    const userId = normalizeUserId(String(req.query.userId || ''));

    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId required' });
    }

    if (!USER_ID_PATTERN.test(userId)) {
      return res.json({
        success: true,
        available: false,
        message: 'User ID must be 4-24 characters (letters, numbers, dot, underscore, hyphen)'
      });
    }

    const snap = await db
      .collection('students')
      .where('userIdNormalized', '==', userId)
      .limit(1)
      .get();

    res.json({
      success: true,
      available: snap.empty,
      message: snap.empty ? 'User ID is available' : 'User ID already taken'
    });
  } catch (error: any) {
    console.error('check-userid error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to validate user ID' });
  }
});

/**
 * POST /api/auth/change-userid
 * Change current user's userId (requires auth token)
 */
router.post('/change-userid', async (req: Request, res: Response) => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const requestedUserId = normalizeUserId(String(req.body?.userId || ''));
    if (!requestedUserId) {
      return res.status(400).json({ success: false, error: 'userId required' });
    }

    if (!USER_ID_PATTERN.test(requestedUserId)) {
      return res.status(400).json({
        success: false,
        error: 'User ID must be 4-24 characters (letters, numbers, dot, underscore, hyphen)'
      });
    }

    const studentRef = db.collection('students').doc(uid);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    const studentData = studentDoc.data() || {};
    const currentUserId = normalizeUserId(studentData.userId || '');

    if (currentUserId === requestedUserId) {
      return res.json({
        success: true,
        message: 'User ID unchanged',
        userId: requestedUserId,
      });
    }

    const takenSnap = await db
      .collection('students')
      .where('userIdNormalized', '==', requestedUserId)
      .limit(1)
      .get();

    if (!takenSnap.empty && takenSnap.docs[0].id !== uid) {
      return res.status(400).json({ success: false, error: 'User ID already taken' });
    }

    await studentRef.set({
      userId: requestedUserId,
      userIdNormalized: requestedUserId,
      updatedAt: admin.firestore.Timestamp.now(),
    }, { merge: true });

    const now = admin.firestore.Timestamp.now();
    const eventTimestamp = new Date().toISOString();
    const auditEventRef = db.collection('analytics_events').doc();

    await auditEventRef.set({
      type: 'user_id_changed',
      timestamp: eventTimestamp,
      serverTimestamp: now,
      uid,
      student_id: uid,
      event_data: {
        previous_user_id: currentUserId || null,
        new_user_id: requestedUserId,
        source: 'settings_account',
      },
      context: {
        userAgent: String(req.headers['user-agent'] || ''),
      },
    });

    const summaryRef = db.collection('students').doc(uid).collection('analytics').doc('summary');
    await summaryRef.set({
      totalEvents: admin.firestore.FieldValue.increment(1),
      lastActivityAt: now,
      updatedAt: now,
    }, { merge: true });

    return res.json({
      success: true,
      message: 'User ID updated successfully',
      userId: requestedUserId,
    });
  } catch (error: any) {
    console.error('change-userid error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to change user ID' });
  }
});

/**
 * POST /api/auth/signup
 * Create new student account with email/password
 */
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name, userId, school, class: studentClass, pin } = req.body;
    const normalizedUserId = normalizeUserId(userId);

    if (!email || !password || !name || !normalizedUserId) {
      return res.status(400).json({
        error: 'Missing required fields: email, password, name, userId'
      });
    }

    if (!USER_ID_PATTERN.test(normalizedUserId)) {
      return res.status(400).json({
        success: false,
        error: 'User ID must be 4-24 characters (letters, numbers, dot, underscore, hyphen)'
      });
    }

    const existingUserIdSnap = await db
      .collection('students')
      .where('userIdNormalized', '==', normalizedUserId)
      .limit(1)
      .get();

    if (!existingUserIdSnap.empty) {
      return res.status(400).json({
        success: false,
        error: 'User ID already taken'
      });
    }

    // Create Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Create student document in Firestore
    await db.collection('students').doc(userRecord.uid).set({
      studentId: userRecord.uid,
      userId: normalizedUserId,
      userIdNormalized: normalizedUserId,
      email,
      name,
      school: school || 'Unknown',
      class: studentClass || 'Unknown',
      pin: pin || '1234', // Default PIN if not provided
      createdAt: admin.firestore.Timestamp.now(),
      preTestScore: 0,
      preTestDone: false,
      learningPath: 'B',
      settings: {
        enabledMechanics: ['raindrop', 'dragSort', 'spinWheel', 'barBuilder', 'hotspot', 'pieSlicer'],
        darkMode: false,
        soundEnabled: true,
        vfxEnabled: true,
        themeColor: '#3b82f6',
        assessmentStyle: 'gamified',
        contentMode: 'text',
        assessmentTime: 'inModule'
      },
      moduleProgress: [],
      badgesEarned: [],
      postTestScore: null,
      journeyComplete: false,
      lives: 5,
      xp: 0,
      coins: 0,
      streak: 0
    });

    // Create custom token for immediate login
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      uid: userRecord.uid,
      token: customToken,
      student: {
        studentId: userRecord.uid,
        userId: normalizedUserId,
        name,
        email
      }
    });
  } catch (error: any) {
    console.error('Signup error:', error);

    const errorCode = error.code || error.errorInfo?.code;

    if (errorCode === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    if (errorCode === 'auth/invalid-password') {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }

    if (errorCode === 'auth/invalid-email') {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    if (errorCode === 9) {
      return res.status(400).json({
        success: false,
        error: 'Invalid signup data'
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Signup failed'
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate student with email/password
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const identifierValue = String(identifier || '').trim();

    if (!identifierValue || !password) {
      return res.status(400).json({
        error: 'Identifier and password required'
      });
    }

    let userRecord;
    if (isEmailIdentifier(identifierValue)) {
      userRecord = await auth.getUserByEmail(identifierValue);
    } else {
      const normalized = normalizeUserId(identifierValue);
      const matchByUserId = await db
        .collection('students')
        .where('userIdNormalized', '==', normalized)
        .limit(1)
        .get();

      const studentDoc = !matchByUserId.empty
        ? matchByUserId.docs[0]
        : await db.collection('students').doc(identifierValue).get();

      if (!studentDoc.exists) {
        return res.status(401).json({
          success: false,
          error: 'User not found. Please check your email/user ID or sign up.'
        });
      }

      userRecord = await auth.getUser(studentDoc.id);
    }

    // Create custom token (client will verify password with Firebase SDKAuth)
    const customToken = await auth.createCustomToken(userRecord.uid);

    // Return student data
    const studentDoc = await db.collection('students').doc(userRecord.uid).get();
    const studentData = studentDoc.data() || {};
    const ensuredUserId = await ensureUserIdForStudent(userRecord.uid, studentData);

    res.json({
      success: true,
      message: 'Login successful',
      token: customToken,
      student: {
        studentId: userRecord.uid,
        userId: ensuredUserId,
        name: studentData?.name,
        email: studentData?.email,
        ...studentData
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);

    const errorCode = error.code || error.errorInfo?.code;

    if (errorCode === 'auth/user-not-found') {
      return res.status(401).json({
        success: false,
        error: 'User not found. Please check your email/user ID or sign up.'
      });
    }

    if (errorCode === 'auth/invalid-password') {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Login failed'
    });
  }
});

/**
 * POST /api/auth/login-pin
 * Authenticate with PIN (quick access for known devices)
 */
router.post('/login-pin', async (req: Request, res: Response) => {
  try {
    const { email, pin } = req.body;

    if (!email || !pin) {
      return res.status(400).json({
        success: false,
        error: 'Email and PIN required'
      });
    }

    // Get user by email
    const userRecord = await auth.getUserByEmail(email);

    // Get student doc and verify PIN
    const studentDoc = await db.collection('students').doc(userRecord.uid).get();
    const studentData = studentDoc.data();

    if (!studentData || studentData.pin !== pin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid PIN'
      });
    }

    const customToken = await auth.createCustomToken(userRecord.uid);

    res.json({
      success: true,
      message: 'PIN login successful',
      token: customToken,
      student: {
        studentId: userRecord.uid,
        name: studentData.name,
        email: studentData.email,
        ...studentData
      }
    });
  } catch (error: any) {
    console.error('PIN login error:', error);

    const errorCode = error.code || error.errorInfo?.code;

    if (errorCode === 'auth/user-not-found') {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'PIN login failed'
    });
  }
});

/**
 * GET /api/auth/student/:uid
 * Fetch student data (requires auth token)
 */
router.get('/student/:uid', async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify token
    const decodedToken = await auth.verifyIdToken(idToken);

    if (decodedToken.uid !== uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Fetch student doc
    const studentDoc = await db.collection('students').doc(uid).get();

    if (!studentDoc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentData = studentDoc.data() || {};
    const ensuredUserId = await ensureUserIdForStudent(uid, studentData);

    res.json({
      success: true,
      student: {
        ...studentData,
        userId: ensuredUserId,
      }
    });
  } catch (error: any) {
    console.error('Fetch student error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch student' });
  }
});

export default router;
