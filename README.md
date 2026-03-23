# DataQuest - Class 8 Data Handling Learning App

DataQuest is a production-ready, gamified, and adaptive learning platform designed for 8th-grade students to master the "Data Handling" chapter in Mathematics.

## 🚀 Features

- **5E Pedagogical Model**: Engage, Explore, Explain, Elaborate, Evaluate.
- **Adaptive Learning Paths**: Three paths (A, B, C) based on student performance.
- **Gamified Experience**: XP, coins, streaks, lives, rocket animations, and boss battles.
- **Interactive Question Mechanics**: Raindrop Catch, Drag & Drop, Spin the Wheel, Bar Builder, and Hotspot.
- **Real-time Analytics**: Extensive internal tracking for adaptive logic.
- **Merge Team Integration**: Strict data separation and payload formatting for external systems.
- **Admin Dashboard**: Real-time monitoring of student sessions and performance.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express.
- **State Management**: Zustand with persistence.
- **Charts**: Recharts.
- **Animations**: Framer Motion, Canvas Confetti.

## 📦 Architecture

- `/src/analytics`: Internal tracking logic.
- `/src/adaptive`: Decision engine for learning paths and remediation.
- `/src/integration`: Transformation layer for external payloads.
- `/src/config`: Game rules and difficulty thresholds.
- `/src/admin`: Admin-only views and dashboards.
- `/src/components`: Reusable UI and game mechanics.
- `/src/pages`: Main application screens.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## 🌐 Deployment (Render)

This app is configured for Render.
- **Build Command**: `npm run build`
- **Start Command**: `node server.ts`

## 🔗 Merge Team Integration

DataQuest implements a strict transformation layer to ensure only the required data is sent to the Merge System.

### Integration Checklist
- [ ] Chapter Metadata API exposed.
- [ ] Session payload sent only at completion or confirmed exit.
- [ ] Exact field names and formats used.
- [ ] No score computation in the payload (handled by Merge Team).
- [ ] Sanity checks enforced (correct + wrong <= attempted).

## 🛡 Admin Access

- **Username**: `admin`
- **Password**: `admin`
