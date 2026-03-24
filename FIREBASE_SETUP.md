# Firebase Cloud Setup Guide

This guide walks you through setting up Firebase for cloud-based user accounts and session sync.

## 1. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Create a project"**
3. Name it `dataquest` (or your choice)
4. Enable Google Analytics (optional)
5. Click **Create Project**

## 2. Set Up Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click **Get started**
3. Enable **Email/Password** provider:
   - Click **Email/Password**
   - Toggle enabled
   - Save

## 3. Create Firestore Database

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select region closest to your users (e.g., `us-central1`)
5. Click **Create**

### Set Firestore Security Rules

In Firestore, go to **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own student document
    match /students/{uid} {
      allow read, write: if request.auth.uid == uid;
      
      // Allow full access to subcollections
      match /{document=**} {
        allow read, write: if request.auth.uid == uid;
      }
    }
  }
}
```

Click **Publish**

## 4. Get Service Account Key (Backend Only)

1. Go to **Project Settings** (gear icon)
2. Click **Service Accounts** tab
3. Select **Node.js**
4. Click **Generate new private key**
5. This downloads a JSON file
6. Keep this **SECRET** — never commit to Git!

## 5. Configure Environment Variables

### For Local Development:

Create a `.env` file in project root:

```bash
# Backend (Server)
FIREBASE_PROJECT_ID="dataquest-xxxxx"
FIREBASE_DATABASE_URL="https://dataquest-xxxxx.firebaseio.com"
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"dataquest-xxxxx",...}'

# Frontend (Browser)
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="dataquest-xxxxx.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="dataquest-xxxxx"
VITE_FIREBASE_STORAGE_BUCKET="dataquest-xxxxx.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcd1234"

VITE_API_BASE_URL="http://localhost:3000"
```

### For Render Deployment:

1. Go to your Render service
2. Click **Environment**
3. Add each variable from step 5 above
4. For `FIREBASE_SERVICE_ACCOUNT`, paste the entire JSON as a single line string

### How to Get Frontend Firebase Config:

1. Go to **Project Settings**
2. In **Your apps**, click the web app icon `</>`
3. Copy all values shown
4. Paste into `.env`

## 6. Deploy to Render

1. Push code to GitHub:
```bash
git add .
git commit -m "feat: add Firebase cloud sync"
git push
```

2. In Render, redeploy or create new service

3. Verify environment variables in **Environment** tab

## 7. Test Locally

```bash
# Install dependencies
npm install

# Start server (it will read .env)
npm run dev
```

Test signup at `http://localhost:3000/api/auth/signup` (POST):
```json
{
  "email": "student@example.com",
  "password": "password123",
  "name": "John Doe",
  "school": "School Name",
  "class": "8-A",
  "pin": "1234"
}
```

## 8. Verify It Works

### Check Firestore:
- Go to Firebase Console → Firestore
- New `students` collection should appear
- Student documents created under collection

### Check Authentication:
- Go to Firebase Console → Authentication
- New users should appear in the Users tab

## 9. Common Issues

### "Firebase config not initialized"
- Check `.env` file exists
- Verify `FIREBASE_SERVICE_ACCOUNT` is valid JSON
- Restart server: `npm run dev`

### "CORS error from frontend"
- Make sure `VITE_API_BASE_URL` matches your Render URL in production
- Verify server is running and accessible

### "Permission denied" errors
- Check Firestore security rules
- Verify user is authenticated (token in Authorization header)

### "Firebase Service Account invalid"
- Download new key from Project Settings
- Paste entire JSON as single line
- Don't add escape characters

## 10. Next Steps

Once set up, students can:
1. **Sign up** with email + password on first visit
2. **Login** from any device with their credentials
3. **Use PIN** for quick access on known devices
4. **Sync progress** automatically across devices
5. **Access account** from anywhere via Render URL

## Troubleshooting

Run this to test if backend can reach Firebase:

```bash
node -e "require('firebase-admin').initializeApp(); console.log('✓ Firebase connected')"
```

Or add this to your server startup:

```typescript
db.collection('test').doc('connection').set({ status: 'ok' })
  .then(() => console.log('✓ Firebase connection verified'))
  .catch(err => console.error('✗ Firebase error:', err));
```

---

**Questions?** Check Firebase docs: https://firebase.google.com/docs
