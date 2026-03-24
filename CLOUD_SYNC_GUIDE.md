# Cloud Sync Integration Guide

## 🎯 Complete Checklist

### Phase 1: Backend Setup ✅
- [x] Firebase initialized in `src/backend/firebase.ts`
- [x] Auth routes created in `src/backend/authRoutes.ts`
- [x] Session routes created in `src/backend/sessionRoutes.ts`
- [x] Server updated with new routes
- [x] Packages installed

### Phase 2: Frontend Setup (Do This Next)
- [ ] Add Firebase config to `.env`
- [ ] Update sessionStore to sync with cloud
- [ ] Create Login/Signup page components
- [ ] Add cloud sync to session updates
- [ ] Test locally

### Phase 3: Deployment (After Testing)
- [ ] Set environment variables in Render
- [ ] Test on Render.com
- [ ] Verify data persists across devices

---

## 📝 What Changed

### New Files Created:
```
src/backend/
  ├── firebase.ts              [NEW] Firebase Admin SDK setup
  ├── authRoutes.ts            [NEW] Signup/Login endpoints
  └── sessionRoutes.ts         [NEW] Session sync endpoints
    
src/lib/
  └── firebaseAuth.ts          [NEW] Frontend Firebase client

FIREBASE_SETUP.md              [NEW] Setup instructions
```

### Modified Files:
```
server.ts                       [UPDATED] Added new routes
.env.example                    [UPDATED] Firebase config template
```

---

## 🚀 Next: Update sessionStore for Cloud Sync

The sessionStore currently uses localStorage only. Update it to sync to Firebase:

**File:** `src/store/sessionStore.ts`

Replace the `updateMetrics` function to also sync to cloud:

```typescript
updateMetrics: (updates) =>
  set((state) => {
    if (!state.session) return state;
    const current = state.session.chapterMetrics || {
      // ... existing defaults
    };
    const next = { ...current, ...updates };
    const newSession = { ...state.session, chapterMetrics: next };
    
    // NEW: Sync to cloud
    const { saveSessionToCloud } = require('../lib/firebaseAuth');
    saveSessionToCloud(state.session.chapterId || 'grade8_data_handling', next).catch(err => {
      console.warn('Cloud sync failed:', err);
    });
    
    return {
      session: newSession,
      users: state.users.map(u => u.studentId === newSession.studentId ? newSession : u)
    };
  }),
```

---

## 🔐 How It Works (Data Flow)

### Sign Up Flow:
```
User enters signup form
    ↓
POST /api/auth/signup
    ↓
Create Firebase Auth user
Create Firestore student document
    ↓
Return custom token
    ↓
Frontend authenticates with Firebase
    ↓
User logged in & ready to learn
```

### Session Sync Flow:
```
Student answers question → Metrics update
    ↓
sessionStore.updateMetrics()
    ↓
Save to localStorage (instant)
Save to cloud: saveSessionToCloud()
    ↓
API: POST /api/session/update
    ↓
Firestore: students/{uid}/sessions/{chapterId}
    ↓
✓ Data synced to cloud
```

### Multi-Device Access:
```
Device 1: Student logs in
    ↓
Device 2: Same student logs in with email/password
    ↓
API: POST /api/auth/login
Retrieves Firestore student doc
    ↓
Loads all previous sessions
    ↓
✓ Can resume from Device 1
```

---

## 💾 Firestore Database Structure

```
students/
├── {uid}/
│   ├── studentId: string
│   ├── email: string
│   ├── name: string
│   ├── school: string
│   ├── class: string
│   ├── pin: string
│   ├── settings: {...}
│   ├── lives: number
│   ├── xp: number
│   ├── coins: number
│   ├── streak: number
│   │
│   ├── sessions/ (subcollection)
│   │   ├── grade8_data_handling/
│   │   │   ├── chapterId: string
│   │   │   ├── metrics: {...}
│   │   │   ├── status: "in_progress" | "completed" | "exited_midway"
│   │   │   ├── updatedAt: timestamp
│   │   │   ├── syncedAt: timestamp
│   │   │
│   │   └── grade7_probability/
│   │       └── {...}
│   │
│   └── session_payloads/ (subcollection)
│       ├── {docId}/
│       │   ├── session_id: string
│       │   ├── correct_answers: number
│       │   ├── topic_completion_ratio: number
│       │   ├── submittedAt: timestamp
```

---

## 🧪 Test the Setup Locally

### 1. Start Server with Firebase
```bash
npm run dev
```

### 2. Test Signup (in browser console or Postman)
```javascript
import { signUp } from './src/lib/firebaseAuth';

const result = await signUp(
  'test@example.com',
  'password123',
  'Test Student',
  'Test School',
  '8-A',
  '1234'
);

console.log(result);
// Expected: { success: true, user: {...}, token: '...' }
```

### 3. Check Firestore
Go to Firebase Console → Firestore Database
- Should see `students` collection
- New document by uid should exist with all fields

### 4. Test Session Sync
```javascript
import { saveSessionToCloud } from './src/lib/firebaseAuth';
import { getCurrentUser } from './src/lib/firebaseAuth';

const user = await getCurrentUser();

const result = await saveSessionToCloud('grade8_data_handling', {
  correctAnswers: 5,
  wrongAnswers: 2,
  questionsAttempted: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
  // ... other metrics
}, 'in_progress');

console.log(result);
// Expected: { success: true }
```

### 5. Verify in Firestore
Go to Firestore → `students/{uid}/sessions/grade8_data_handling`
- Should see metrics saved with timestamp

---

## 🌍 Deploy to Render

### 1. Commit and Push
```bash
git add .
git commit -m "chore: add Firebase cloud infrastructure"
git push origin main
```

### 2. Set Environment Variables in Render

Go to Render Dashboard → Your Service → Environment

Add all variables from `.env`:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_SERVICE_ACCOUNT` (paste entire JSON)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_BASE_URL=https://your-render-app.onrender.com`

Save and redeploy.

### 3. Test on Render
Visit `https://your-render-app.onrender.com`
- Try signing up
- Check Firestore Console for data
- Login from another device
- Verify session syncs

---

## ✨ Features Unlocked

✅ **Multi-Device Accounts** - Students can login from anywhere  
✅ **Cloud Persistence** - All progress saved to Firebase  
✅ **Session Recovery** - Can resume from another device  
✅ **Automatic Sync** - Changes sync instantly to cloud  
✅ **Secure Auth** - Firebase handles passwords securely  
✅ **PIN Quick Access** - Fast login on known devices  

---

## 🔧 Troubleshooting

### "TypeError: Cannot find module 'firebase-admin'"
```bash
npm install firebase-admin --save
npm run dev
```

### "Firebase not initialized"
- Check `.env` file exists
- Verify all `FIREBASE_*` variables set
- Restart server: `npm run dev`

### "CORS error when accessing backend"
- Update `VITE_API_BASE_URL` to match your server URL
- In production, that's your Render app domain

### "Permission denied" in Firestore
- Check security rules were pasted correctly
- Verify user is authenticated (has valid token)
- Check request includes `Authorization: Bearer {token}`

---

## 📚 Useful Commands

```bash
# Check Firebase connection
npm run dev

# See Firebase logs in Render
# Render Dashboard → Logs

# Test an endpoint
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123","name":"Test"}'

# View Firestore
# Firebase Console → Firestore Database
```

---

## 🎓 Learn More

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Render Deployment](https://render.com/docs)

---

**You're ready! Follow the "Phase 2" checklist above to complete the integration.** 🚀
