import { Request, Response, Router } from 'express';
import { auth, db } from './firebase';
import admin from 'firebase-admin';

const router = Router();

/**
 * POST /api/auth/signup
 * Create new student account with email/password
 */
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name, school, class: studentClass, pin } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Missing required fields: email, password, name'
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
        enabledMechanics: ['raindrop', 'dragSort', 'spinWheel', 'barBuilder', 'hotspot', 'pieSlicer', 'tallyTap'],
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
        name,
        email
      }
    });
  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }

    res.status(500).json({
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password required'
      });
    }

    // Get user by email
    const userRecord = await auth.getUserByEmail(email);

    // Create custom token (client will verify password with Firebase SDKAuth)
    const customToken = await auth.createCustomToken(userRecord.uid);

    // Return student data
    const studentDoc = await db.collection('students').doc(userRecord.uid).get();
    const studentData = studentDoc.data();

    res.json({
      success: true,
      message: 'Login successful',
      token: customToken,
      student: {
        studentId: userRecord.uid,
        name: studentData?.name,
        email: studentData?.email,
        ...studentData
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);

    if (error.code === 'auth/user-not-found') {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    res.status(500).json({
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

    res.status(500).json({
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

    res.json({
      success: true,
      student: studentDoc.data()
    });
  } catch (error: any) {
    console.error('Fetch student error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch student' });
  }
});

export default router;
