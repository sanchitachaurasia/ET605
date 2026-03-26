import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, sendPasswordResetEmail, User } from 'firebase/auth';

// Firebase config (public, OK to expose)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

const rawApiBase = String(import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
const isLoopbackApiBase = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(rawApiBase);

export const API_BASE = import.meta.env.DEV
  ? (rawApiBase || 'http://localhost:3000')
  : (isLoopbackApiBase ? '' : rawApiBase);

const ADMIN_API_KEY = String(import.meta.env.VITE_ADMIN_API_KEY || '').trim();

const getAdminHeaders = () => {
  if (!ADMIN_API_KEY) return {};
  return { 'x-admin-key': ADMIN_API_KEY };
};

/**
 * Sign up new student account
 */
export const signUp = async (
  email: string,
  password: string,
  name: string,
  school?: string,
  studentClass?: string,
  pin?: string
) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, school, class: studentClass, pin })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Sign in with custom token
    await signInWithCustomToken(firebaseAuth, data.token);

    return {
      success: true,
      student: data.student,
      user: data.student,
      token: data.token
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Login with email and password
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Sign in with custom token
    await signInWithCustomToken(firebaseAuth, data.token);

    return {
      success: true,
      student: data.student,
      user: data.student,
      token: data.token
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Login with PIN (quick access)
 */
export const loginWithPin = async (email: string, pin: string) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pin })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'PIN login failed');
    }

    await signInWithCustomToken(firebaseAuth, data.token);

    return {
      success: true,
      student: data.student,
      user: data.student,
      token: data.token
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Logout
 */
export const logout = async () => {
  try {
    await firebaseAuth.signOut();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset email
 */
export const sendResetPasswordEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
    return { success: true };
  } catch (error: any) {
    const code = error?.code || '';

    if (code === 'auth/user-not-found') {
      return {
        success: false,
        error: 'No account found for this email.'
      };
    }

    if (code === 'auth/invalid-email') {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      };
    }

    return {
      success: false,
      error: error.message || 'Could not send reset email.'
    };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

/**
 * Save session metrics to cloud
 */
export const saveSessionToCloud = async (
  chapterId: string,
  metrics: any,
  status: string = 'in_progress'
) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const idToken = await user.getIdToken();

    const response = await fetch(`${API_BASE}/api/session/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ chapterId, metrics, status })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save session');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Save session error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch session from cloud
 */
export const fetchSessionFromCloud = async (chapterId: string) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const idToken = await user.getIdToken();

    const response = await fetch(`${API_BASE}/api/session/${chapterId}`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch session');
    }

    return {
      success: true,
      session: data.session
    };
  } catch (error: any) {
    console.error('Fetch session error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Save final session payload
 */
export const saveSessionPayload = async (payload: any) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const idToken = await user.getIdToken();

    const response = await fetch(`${API_BASE}/api/session/payload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save payload');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Save payload error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Persist student profile/progress fields for login resume
 */
export const saveStudentProgressToCloud = async (progress: any) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('Not authenticated');

    const idToken = await user.getIdToken();

    const response = await fetch(`${API_BASE}/api/session/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ progress })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sync progress');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Progress sync error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch realtime admin analytics stream and user summaries.
 */
export const fetchAdminRealtimeAnalytics = async (limit: number = 200) => {
  const response = await fetch(`${API_BASE}/api/session/admin/realtime?limit=${Math.max(10, limit)}`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch realtime analytics');
  }
  return data;
};

/**
 * Fetch full activity trail for a specific student.
 */
export const fetchAdminUserActivity = async (studentId: string, limit: number = 1000) => {
  const response = await fetch(`${API_BASE}/api/session/admin/user/${encodeURIComponent(studentId)}/activity?limit=${Math.max(10, limit)}`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch user activity');
  }
  return data;
};

/**
 * Get CSV export URL for analytics data that can be downloaded/opened in Excel.
 */
export const getAdminAnalyticsExportUrl = (studentId?: string, limit: number = 5000) => {
  const params = new URLSearchParams();
  params.set('limit', String(Math.max(10, limit)));
  if (studentId) params.set('studentId', studentId);
  if (ADMIN_API_KEY) params.set('adminKey', ADMIN_API_KEY);
  return `${API_BASE}/api/session/admin/export?${params.toString()}`;
};
