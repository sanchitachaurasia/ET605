import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DEFAULT_SETTINGS, useSessionStore } from './store/sessionStore';
import { saveStudentProgressToCloud } from './lib/firebaseAuth';
import {
  flushTrackingEvents,
  setTrackingSession,
  setupGlobalClickstream,
  trackTelemetryEvent,
} from './analytics/telemetry';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PreTest from './pages/PreTest';
import PathAssignment from './pages/PathAssignment';
import AdminDashboard from './pages/AdminDashboard';
import ModulePage from './pages/ModulePage';
import PostTest from './pages/PostTest';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import type { StudentSession } from './types';

export default function App() {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const updateSession = useSessionStore(state => state.updateSession);
  const [mergeBootstrapDone, setMergeBootstrapDone] = useState(false);

  const mergeSearch = window.location.search || '';
  const mergeParams = useMemo(() => new URLSearchParams(mergeSearch), [mergeSearch]);
  const hasMergeParams = Boolean(
    mergeParams.get('token') && mergeParams.get('student_id') && mergeParams.get('session_id')
  );
  const mergeForcedPretestPath = `/pre-test${mergeSearch}`;
  const sessionLandingPath = session
    ? (session.preTestDone ? '/dashboard' : '/pre-test')
    : '/login';
  const chapterRedirectTo = hasMergeParams ? mergeForcedPretestPath : `${sessionLandingPath}${mergeSearch}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') || sessionStorage.getItem('token');
    const studentId = params.get('student_id') || sessionStorage.getItem('student_id');
    const sessionId = params.get('session_id') || sessionStorage.getItem('session_id');

    if (token) sessionStorage.setItem('token', token);
    if (studentId) sessionStorage.setItem('student_id', studentId);
    if (sessionId) sessionStorage.setItem('session_id', sessionId);

    if (!studentId || !sessionId) {
      setMergeBootstrapDone(true);
      return;
    }

    if (!session) {
      const mergeBootstrapSession: StudentSession = {
        studentId,
        pin: 'merge-redirect',
        name: studentId,
        school: 'Merge Portal',
        class: '8',
        preTestScore: 0,
        preTestDone: false,
        learningPath: 'B',
        settings: DEFAULT_SETTINGS,
        moduleProgress: [],
        badgesEarned: [],
        postTestScore: null,
        journeyComplete: false,
        lives: 5,
        xp: 0,
        coins: 0,
        streak: 0,
        chapterSessionId: sessionId,
        sessionStatus: 'in_progress',
      };
      setSession(mergeBootstrapSession);
      setMergeBootstrapDone(true);
      return;
    }

    if (
      session.studentId !== studentId ||
      session.chapterSessionId !== sessionId ||
      session.name !== studentId ||
      session.preTestDone !== false
    ) {
      updateSession({
        studentId,
        name: studentId,
        chapterSessionId: sessionId,
        preTestDone: false,
      });
    }
    setMergeBootstrapDone(true);
  }, [session, setSession, updateSession]);

  useEffect(() => {
    if (!hasMergeParams) {
      setMergeBootstrapDone(true);
    }
  }, [hasMergeParams]);

  useEffect(() => {
    if (!session?.studentId) return;

    const trackingSessionId = session.chapterSessionId || `app_${session.studentId}`;
    setTrackingSession({
      studentId: session.studentId,
      sessionId: trackingSessionId,
      chapterId: 'grade8_data_handling',
    });

    const teardownClickstream = setupGlobalClickstream();
    trackTelemetryEvent('navigation', {
      event_data: {
        path: window.location.pathname,
        source: 'app_mount',
      }
    });

    const flushTimer = window.setInterval(() => {
      flushTrackingEvents().catch(() => undefined);
    }, 30000);

    return () => {
      teardownClickstream();
      window.clearInterval(flushTimer);
    };
  }, [session?.studentId, session?.chapterSessionId]);

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

    const accessibilityClasses = [
      'a11y-high-contrast',
      'a11y-dyslexia',
      'a11y-colorblind',
      'a11y-reduced-motion',
      'a11y-bold-text',
      'a11y-underline-links',
      'a11y-sepia',
    ];
    accessibilityClasses.forEach((className) => document.documentElement.classList.remove(className));
    (session?.settings?.accessibilityModes || []).forEach((mode) => {
      if (mode === 'highContrast') document.documentElement.classList.add('a11y-high-contrast');
      if (mode === 'dyslexia') document.documentElement.classList.add('a11y-dyslexia');
      if (mode === 'colorblind') document.documentElement.classList.add('a11y-colorblind');
      if (mode === 'reducedMotion') document.documentElement.classList.add('a11y-reduced-motion');
      if (mode === 'boldText') document.documentElement.classList.add('a11y-bold-text');
      if (mode === 'underlineLinks') document.documentElement.classList.add('a11y-underline-links');
      if (mode === 'sepia') document.documentElement.classList.add('a11y-sepia');
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
        name: session.name,
        school: session.school,
        class: session.class,
        preTestScore: session.preTestScore,
        preTestDone: session.preTestDone,
        preTestConfidenceByQuestion: session.preTestConfidenceByQuestion,
        preTestSkillMastery: session.preTestSkillMastery,
        preTestRetakeInProgress: session.preTestRetakeInProgress,
        preTestProgress: session.preTestProgress,
        postTestProgress: session.postTestProgress,
        learningPath: session.learningPath,
        preTestFeedback: session.preTestFeedback,
        recommendedStyle: session.recommendedStyle,
        moduleProgress: session.moduleProgress,
        moduleTracking: session.moduleTracking,
        badgesEarned: session.badgesEarned,
        postTestScore: session.postTestScore,
        postTestAttempts: session.postTestAttempts,
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
    <AppErrorBoundary>
      {!mergeBootstrapDone ? (
        <div>Loading session...</div>
      ) : (
        <Routes>
          <Route path="/login" element={hasMergeParams ? <Navigate to={mergeForcedPretestPath} replace /> : (!session ? <LoginPage /> : <Navigate to={session.preTestDone ? "/dashboard" : "/pre-test"} />)} />
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/pre-test" element={session ? <PreTest /> : <Navigate to="/login" />} />
          <Route path="/path-assignment" element={session ? <PathAssignment /> : <Navigate to="/login" />} />
          <Route path="/module/:moduleId" element={session ? <ModulePage /> : <Navigate to="/login" />} />
          <Route path="/post-test" element={session ? <PostTest /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chapter" element={<Navigate to={chapterRedirectTo} replace />} />

          <Route path="/" element={<Navigate to={hasMergeParams ? mergeForcedPretestPath : (session ? (session.preTestDone ? '/dashboard' : '/pre-test') : '/login')} replace />} />
          <Route path="*" element={<Navigate to={hasMergeParams ? mergeForcedPretestPath : (session ? (session.preTestDone ? '/dashboard' : '/pre-test') : '/login')} replace />} />
        </Routes>
      )}
    </AppErrorBoundary>
  );
}
