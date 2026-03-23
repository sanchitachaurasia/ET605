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

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  stars: number;
  learningPath: LearningPath;
  masteryMap: Record<string, 'untried' | 'mastered' | 'masteredWithSupport' | 'struggling' | 'attempted'>;
  attemptsCount: Record<string, number>;
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

export interface Concept {
  id: string;
  title: string;
  textContent: string;
  videoUrl: string;
  workedExamples: {
    steps: string[];
    explanation: string;
  }[];
  questions: Question[];
  path?: LearningPath;
}

export interface Module {
  id: string;
  title: string;
  concepts: Concept[];
}
