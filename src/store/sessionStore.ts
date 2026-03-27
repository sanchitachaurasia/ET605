import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudentSession, GameFormat, LearningPath, UserSettings } from '../types';
import { gameConfig } from '../config/gameConfig';
import { trackTelemetryEvent } from '../analytics/telemetry';

export const DEFAULT_SETTINGS: UserSettings = {
  enabledMechanics: [
    GameFormat.RAINDROP,
    GameFormat.DRAG_SORT,
    GameFormat.SPIN_WHEEL,
    GameFormat.BAR_BUILDER,
    GameFormat.HOTSPOT,
    GameFormat.PIE_SLICER,
    GameFormat.TALLY_TAP
  ],
  darkMode: false,
  soundEnabled: true,
  vfxEnabled: true,
  themeColor: '#3b82f6', // blue-500
  assessmentStyle: 'gamified',
  contentMode: 'text',
  assessmentTime: 'inModule',
  accessibilityModes: [],
  textSize: 'medium',
  lineSpacing: 'normal'
};

interface SessionState {
  session: StudentSession | null;
  users: StudentSession[];
  setSession: (session: StudentSession | null) => void;
  updateSession: (updates: Partial<StudentSession>) => void;
  updateMetrics: (updates: Partial<NonNullable<StudentSession["chapterMetrics"]>>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  addUser: (user: StudentSession) => void;
  clearSession: () => void;
  addXP: (amount: number) => void;
  useLife: () => void;
  resetProgress: () => void;
  resetAll: () => void;
}

export const DEMO_USER: StudentSession = {
  studentId: 'demo-id',
  pin: '1234',
  name: 'Demo Student',
  school: 'DataQuest Academy',
  class: '8-A',
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
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      users: [DEMO_USER],
      setSession: (session) => set({ session }),
      updateSession: (updates) =>
        set((state) => ({
          session: state.session ? { ...state.session, ...updates } : null,
          users: state.users.map(u => u.studentId === state.session?.studentId ? { ...u, ...updates } : u)
        })),
      updateMetrics: (updates) =>
        set((state) => {
          if (!state.session) return state;
          const current = state.session.chapterMetrics || {
            startTime: Date.now(),
            correctAnswers: 0,
            wrongAnswers: 0,
            questionsAttempted: [],
            questionAttemptCounts: {},
            retryCount: 0,
            hintsUsed: 0,
            totalHintsEmbedded: 0,
            activeTimeSpent: 0,
            idleTimeSpent: 0,
            lastActivityTime: Date.now(),
            optionMarkedCount: 0,
            optionChangedCount: 0,
            remedialClicks: 0,
            settingsChanges: 0,
          };
          const next = { ...current, ...updates };
          const newSession = { ...state.session, chapterMetrics: next };
          return {
            session: newSession,
            users: state.users.map(u => u.studentId === newSession.studentId ? newSession : u)
          };
        }),
      updateSettings: (updates) =>
        set((state) => {
          if (!state.session) return state;
          const currentSettings = state.session.settings || DEFAULT_SETTINGS;
          const newSettings = { ...currentSettings, ...updates };
          const currentMetrics = state.session.chapterMetrics;
          const newSession = { ...state.session, settings: newSettings };

          if (state.session.chapterSessionId) {
            trackTelemetryEvent('settings_changed', {
              event_data: {
                updates,
              }
            });
          }

          if (currentMetrics) {
            newSession.chapterMetrics = {
              ...currentMetrics,
              settingsChanges: (currentMetrics.settingsChanges || 0) + 1,
              lastActivityTime: Date.now(),
            };
          }

          return {
            session: newSession,
            users: state.users.map(u => u.studentId === newSession.studentId ? newSession : u)
          };
        }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      clearSession: () => set({ session: null }),
      addXP: (amount) =>
        set((state) => {
          if (!state.session) return state;
          const newSession = { ...state.session, xp: state.session.xp + amount };
          return {
            session: newSession,
            users: state.users.map(u => u.studentId === newSession.studentId ? newSession : u)
          };
        }),
      useLife: () =>
        set((state) => {
          if (!state.session) return state;
          const newSession = { ...state.session, lives: Math.max(0, state.session.lives - 1) };
          return {
            session: newSession,
            users: state.users.map(u => u.studentId === newSession.studentId ? newSession : u)
          };
        }),
      resetProgress: () =>
        set((state) => {
          if (!state.session) return state;
          const resetUser = {
            ...state.session,
            preTestScore: 0,
            preTestDone: false,
            preTestRetakeInProgress: false,
            preTestProgress: null,
            postTestProgress: null,
            moduleProgress: [],
            badgesEarned: [],
            postTestScore: null,
            journeyComplete: false,
            lives: 5,
            xp: 0,
            coins: 0,
            streak: 0,
            settings: DEFAULT_SETTINGS,
          };
          return {
            session: resetUser,
            users: state.users.map(u => u.studentId === resetUser.studentId ? resetUser : u)
          };
        }),
      resetAll: () => set({ session: null, users: [DEMO_USER] }),
    }),
    {
      name: 'dataquest-session',
    }
  )
);
