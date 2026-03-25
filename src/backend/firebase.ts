import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
// Download your Firebase service account key from:
// Firebase Console → Project Settings → Service Accounts → Generate new private key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

console.log('Firebase Service Account Project ID:', serviceAccount.project_id);
console.log('FIREBASE_PROJECT_ID env:', process.env.FIREBASE_PROJECT_ID);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    console.log('✓ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('✗ Firebase initialization failed:', error);
  }
} else {
  console.log('✓ Firebase already initialized');
}

export const db = admin.firestore();
export const auth = admin.auth();

console.log('✓ Firestore and Auth exported');

export default admin;
