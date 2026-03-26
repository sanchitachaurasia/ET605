export enum GameFormat {
  RAINDROP = 'raindrop',
  DRAG_SORT = 'dragSort',
  SPIN_WHEEL = 'spinWheel',
  BAR_BUILDER = 'barBuilder',
  HOTSPOT = 'hotspot',
  PIE_SLICER = 'pieSlicer',
  TALLY_TAP = 'tallyTap'
}

export type LearningPath = 'A' | 'B' | 'C';
export type LearningStyle = 'visual' | 'auditory' | 'readWrite' | 'kinesthetic' | 'mixed';
export type AccessibilityLevel = 'standard' | 'highContrast' | 'dyslexia' | 'colorblind';

// Learner profile for personalization
export interface LearnerProfile {
  preferredStyle: LearningStyle;
  accessibilityNeeds: AccessibilityLevel;
  contentPreference: 'images' | 'videos' | 'text' | 'interactive' | 'mixed';
  pacePref: 'slow' | 'medium' | 'fast';
  feedbackStyle: 'immediate' | 'summary' | 'delayed';
  distractionLevel: 'sensitive' | 'moderate' | 'resilient';
}

// Session tracking and validation
export type SessionStatus = 'completed' | 'exited_midway' | 'in_progress';

export interface SessionMetrics {
  startTime: number;
  correctAnswers: number;
  wrongAnswers: number;
  questionsAttempted: string[]; // unique question IDs
  retryCount: number;
  hintsUsed: number;
  totalHintsEmbedded: number;
  activeTimeSpent: number; // in seconds
  lastActivityTime: number;
}

export interface PayloadRetryQueue {
  payloadId: string;
  payload: any;
  attempts: number;
  maxAttempts: number;
  lastAttempted: string; // ISO 8601 timestamp
  nextRetryAt: string; // ISO 8601 timestamp
  error?: string;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  stars: number;
  learningPath: LearningPath;
  masteryMap: Record<string, 'untried' | 'mastered' | 'masteredWithSupport' | 'struggling' | 'attempted'>;
  attemptsCount: Record<string, number>;
  currentConceptIdx?: number;
}

export interface UserSettings {
  enabledMechanics: GameFormat[];
  darkMode: boolean;
  soundEnabled: boolean;
  vfxEnabled: boolean;
  themeColor: string;
  assessmentStyle: 'gamified' | 'traditional' | 'balanced';
  contentMode: 'text' | 'video';
  assessmentTime: 'inModule' | 'endOfModule';
}

export interface StudentSession {
  chapterSessionId?: string;
  chapterMetrics?: SessionMetrics;
  sessionStatus?: SessionStatus;
  exitConfirmed?: boolean;
  isStruggling?: boolean;
  studentId: string;
  pin: string;
  name: string;
  school: string;
  class: string;
  preTestScore: number;
  preTestDone: boolean;
  preTestFeedback?: number;
  recommendedStyle?: string;
  learningPath: LearningPath;
  learnerProfile?: LearnerProfile;
  settings: UserSettings;
  moduleProgress: ModuleProgress[];
  badgesEarned: string[];
  postTestScore: number | null;
  journeyComplete: boolean;
  completed?: boolean;
  lives: number;
  xp: number;
  coins: number;
  streak: number;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | number | string[];
  format: GameFormat;
  difficulty?: 'easy' | 'medium' | 'hard';
  hint: string;
  remedialBrief: string;
  remedialDetail: string;
  image?: string;
  path?: LearningPath;
  styles?: Record<string, any>;
}

export interface RemediationLevel {
  level: 1 | 2 | 3;
  title: string; // e.g., "Gentle Review", "Deeper Explanation", "Interactive Practice"
  content: string;
  examples?: string[];
}

export interface Concept {
  id: string;
  title: string;
  textContent: string;
  videoUrl: string;
  videoStartSeconds?: number;
  videoEndSeconds?: number;
  videoCheckpointPrompt?: string;
  storyNarrative?: {
    title: string;
    scenario: string;
    realWorldConnection: string;
    studentChallenge: string;
  };
  workedExamples: {
    steps: string[];
    explanation: string;
  }[];
  remediationLevels?: RemediationLevel[];
  questions: Question[];
  path?: LearningPath;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTimeSeconds?: number;
  prerequisiteReview?: string; // ID of prerequisite concept
  realWorldApplications?: string[]; // Real-world examples
}

export interface Module {
  id: string;
  title: string;
  concepts: Concept[];
}
