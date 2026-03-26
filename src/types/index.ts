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
export type AccessibilityLevel =
  | 'standard'
  | 'highContrast'
  | 'dyslexia'
  | 'colorblind'
  | 'reducedMotion'
  | 'boldText'
  | 'underlineLinks'
  | 'sepia';
export type AccessibilityMode = Exclude<AccessibilityLevel, 'standard'>;

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
  questionAttemptCounts: Record<string, number>;
  retryCount: number;
  hintsUsed: number;
  totalHintsEmbedded: number;
  activeTimeSpent: number; // in seconds
  idleTimeSpent: number; // in seconds
  lastActivityTime: number;
  optionMarkedCount: number;
  optionChangedCount: number;
  remedialClicks: number;
  settingsChanges: number;
}

export type TrackingEventType =
  | 'session_start'
  | 'session_end'
  | 'module_open'
  | 'module_exit'
  | 'module_complete'
  | 'stage_change'
  | 'question_view'
  | 'question_attempt'
  | 'question_correct'
  | 'question_wrong'
  | 'option_marked'
  | 'option_changed'
  | 'hint_opened'
  | 'remedial_opened'
  | 'remedial_expanded'
  | 'settings_changed'
  | 'navigation'
  | 'clickstream'
  | 'focus_change'
  | 'heartbeat';

export interface TrackingEvent {
  id: string;
  type: TrackingEventType;
  timestamp: string;
  student_id: string;
  session_id: string;
  chapter_id: string;
  module_id?: string;
  question_id?: string;
  event_data?: Record<string, any>;
  context?: {
    url?: string;
    referrer?: string;
    userAgent?: string;
    language?: string;
    timezone?: string;
    platform?: string;
    screen?: string;
    viewport?: string;
    ip?: string;
    city?: string;
    country?: string;
    device_id?: string;
    online?: boolean;
  };
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

export interface PreTestProgress {
  stage: 'questions' | 'learningStyle' | 'personalization';
  currentIdx: number;
  score: number;
  correctAnswers: Record<string, boolean>;
  preferredQuestionIds: string[];
  learningStyle: LearningStyle;
  recommendation: string;
  prefContentMode: 'text' | 'video';
  prefAssessmentTime: 'inModule' | 'endOfModule';
  pendingResults: any | null;
}

export interface PostTestProgress {
  step: 'intro' | 'questions' | 'results';
  currentQuestionIdx: number;
  answers: boolean[];
  startTime: number;
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
  showFinalAssessment?: boolean;
  finalAssessmentIdx?: number;
}

export interface ModuleTracking {
  moduleId: string;
  path: LearningPath;
  visits: number;
  startedAt: number;
  lastVisitedAt: number;
  completedAt?: number;
  exitedAt?: number;
  totalTimeSpentSec: number;
  activeTimeSpentSec: number;
  stageTransitions: number;
  contentViews: number;
  examplesViews: number;
  questionViews: number;
  conceptAdvances: number;
  previousPageClicks: number;
  nextClicks: number;
  questionAttempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  hintsShown: number;
  remediationShown: number;
  remediationExpanded: number;
  videoPlayCount: number;
  videoPauseCount: number;
  videoSeekCount: number;
  videoEndedCount: number;
  videoWatchTimeSec: number;
  exitPromptShownCount: number;
  exitsConfirmed: number;
  completionCount: number;
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
  accessibilityModes: AccessibilityMode[];
  textSize: 'small' | 'medium' | 'large' | 'xLarge';
  lineSpacing: 'normal' | 'relaxed' | 'wide';
}

export interface StudentSession {
  chapterSessionId?: string;
  chapterMetrics?: SessionMetrics;
  preTestProgress?: PreTestProgress | null;
  postTestProgress?: PostTestProgress | null;
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
  moduleTracking?: Record<string, ModuleTracking>;
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
