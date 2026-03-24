import { Request, Response, Router } from 'express';
import { db, auth } from './firebase';
import admin from 'firebase-admin';

const router = Router();

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
    const { chapterId } = req.params;

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

    // Store in session payloads collection
    await db
      .collection('students')
      .doc(user.uid)
      .collection('session_payloads')
      .add({
        ...payload,
        studentId: user.uid,
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

export default router;
