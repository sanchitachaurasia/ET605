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

const API_BASE = import.meta.env.DEV
  ? (rawApiBase || 'http://localhost:3000')
  : (isLoopbackApiBase ? '' : rawApiBase);

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
