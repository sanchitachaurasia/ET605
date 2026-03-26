import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSessionStore } from './store/sessionStore';
import { saveStudentProgressToCloud } from './lib/firebaseAuth';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PreTest from './pages/PreTest';
import PreferenceSurvey from './pages/PreferenceSurvey';
import PathAssignment from './pages/PathAssignment';
import AdminDashboard from './pages/AdminDashboard';
import ModulePage from './pages/ModulePage';
import PostTest from './pages/PostTest';

export default function App() {
  const session = useSessionStore(state => state.session);

  useEffect(() => {
    if (session?.settings?.themeColor) {
      document.documentElement.style.setProperty('--theme-color', session.settings.themeColor);
    }

    const textScaleMap: Record<string, string> = {
      small: '0.94',
      medium: '1',
      large: '1.1',
      xLarge: '1.2',
    };
    const lineSpacingMap: Record<string, string> = {
      normal: '1.5',
      relaxed: '1.7',
      wide: '1.9',
    };

    const textSize = session?.settings?.textSize || 'medium';
    const lineSpacing = session?.settings?.lineSpacing || 'normal';
    document.documentElement.style.setProperty('--app-font-scale', textScaleMap[textSize] || '1');
    document.documentElement.style.setProperty('--app-line-height', lineSpacingMap[lineSpacing] || '1.5');

    const accessibilityClasses = ['a11y-high-contrast', 'a11y-dyslexia', 'a11y-colorblind'];
    accessibilityClasses.forEach((className) => document.documentElement.classList.remove(className));
    (session?.settings?.accessibilityModes || []).forEach((mode) => {
      if (mode === 'highContrast') document.documentElement.classList.add('a11y-high-contrast');
      if (mode === 'dyslexia') document.documentElement.classList.add('a11y-dyslexia');
      if (mode === 'colorblind') document.documentElement.classList.add('a11y-colorblind');
    });

    if (session?.settings?.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [session?.settings]);

  useEffect(() => {
    if (!session?.studentId || session.studentId === 'demo-id') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      saveStudentProgressToCloud({
        preTestScore: session.preTestScore,
        preTestDone: session.preTestDone,
        preTestProgress: session.preTestProgress,
        postTestProgress: session.postTestProgress,
        learningPath: session.learningPath,
        preTestFeedback: session.preTestFeedback,
        recommendedStyle: session.recommendedStyle,
        learnerProfile: session.learnerProfile,
        moduleProgress: session.moduleProgress,
        badgesEarned: session.badgesEarned,
        postTestScore: session.postTestScore,
        journeyComplete: session.journeyComplete,
        settings: session.settings,
        lives: session.lives,
        xp: session.xp,
        coins: session.coins,
        streak: session.streak,
        sessionStatus: session.sessionStatus,
        exitConfirmed: session.exitConfirmed,
        isStruggling: session.isStruggling,
      });
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [session]);

  return (
    <Routes>
      <Route path="/login" element={!session ? <LoginPage /> : <Navigate to={session.preTestDone ? "/dashboard" : "/pre-test"} />} />
      <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/pre-test" element={session ? <PreTest /> : <Navigate to="/login" />} />
      <Route path="/preference-survey" element={session ? <PreferenceSurvey /> : <Navigate to="/login" />} />
      <Route path="/path-assignment" element={session ? <PathAssignment /> : <Navigate to="/login" />} />
      <Route path="/module/:moduleId" element={session ? <ModulePage /> : <Navigate to="/login" />} />
      <Route path="/post-test" element={session ? <PostTest /> : <Navigate to="/login" />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Fallback */}
      <Route path="/" element={<Navigate to={session ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}
