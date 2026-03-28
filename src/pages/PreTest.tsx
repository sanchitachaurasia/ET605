import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, ChevronRight } from 'lucide-react';
import { GameQuestion } from '../components/GameQuestion';
import { preTestQuestions } from '../data/Pre-Test/questions';
import { useSessionStore } from '../store/sessionStore';
import { trackEvent } from '../analytics/tracker';
import { logout } from '../lib/firebaseAuth';
import { GameFormat, PreTestConfidence, PreTestProgress } from '../types';
import { cn } from '../lib/utils';
import { useResponsive } from '../components/ResponsiveLayout';

type PreTestAdaptiveMode = 'support' | 'standard' | 'challenge';

type ModuleSkillEval = {
  mastery: number;
  path: 'A' | 'B' | 'C';
  adaptiveMode: PreTestAdaptiveMode;
};

const MODULE_SKILL_QUESTION_IDS: Record<string, string[]> = {
  '2.1': ['q_books_raj', 'q_pictograph_300', 'q_improvement_40', 'q_science_fraction', 'q_tally_7'],
  '2.2': ['q_interval_25'],
  '2.3': ['q_pie_chocolate'],
  '2.4': ['q_spinner_blue'],
};

const SUPPORT_STYLE_FALLBACK: GameFormat[] = [
  GameFormat.DRAG_SORT,
  GameFormat.TALLY_TAP,
  GameFormat.BAR_BUILDER,
];

const CHALLENGE_STYLE_FALLBACK: GameFormat[] = [
  GameFormat.SPIN_WHEEL,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
];

const STYLE_FORMAT_PRIORITIES: Record<'gamified' | 'traditional' | 'balanced', GameFormat[]> = {
  gamified: [GameFormat.RAINDROP, GameFormat.SPIN_WHEEL, GameFormat.PIE_SLICER, GameFormat.DRAG_SORT],
  traditional: [GameFormat.BAR_BUILDER, GameFormat.TALLY_TAP, GameFormat.HOTSPOT, GameFormat.DRAG_SORT],
  balanced: [GameFormat.DRAG_SORT, GameFormat.BAR_BUILDER, GameFormat.RAINDROP, GameFormat.TALLY_TAP],
};

function getConfidenceWeight(isCorrect: boolean, confidence: PreTestConfidence): number {
  if (isCorrect && confidence === 'sure') return 1;
  if (isCorrect && confidence === 'maybe') return 0.75;
  if (isCorrect && confidence === 'guess') return 0.35;
  if (!isCorrect && confidence === 'sure') return 0.05;
  if (!isCorrect && confidence === 'maybe') return 0.12;
  return 0.2;
}

function getPathFromMastery(mastery: number): 'A' | 'B' | 'C' {
  if (mastery < 0.45) return 'A';
  if (mastery < 0.75) return 'B';
  return 'C';
}

function getAdaptiveModeFromMastery(mastery: number): PreTestAdaptiveMode {
  if (mastery <= 0.45) return 'support';
  if (mastery >= 0.82) return 'challenge';
  return 'standard';
}

function evaluateModuleSkill(
  questionIds: string[],
  correctAnswers: Record<string, boolean>,
  confidenceByQuestion: Record<string, PreTestConfidence>
): ModuleSkillEval {
  if (questionIds.length === 0) {
    return { mastery: 0.5, path: 'B', adaptiveMode: 'standard' };
  }

  const weightedScore = questionIds.reduce((sum, questionId) => {
    const isCorrect = Boolean(correctAnswers[questionId]);
    const confidence = confidenceByQuestion[questionId] || 'guess';
    return sum + getConfidenceWeight(isCorrect, confidence);
  }, 0);

  const mastery = Math.max(0, Math.min(1, weightedScore / questionIds.length));
  return {
    mastery,
    path: getPathFromMastery(mastery),
    adaptiveMode: getAdaptiveModeFromMastery(mastery),
  };
}

function buildRecommendedGameStyles(
  correctAnswers: Record<string, boolean>,
  confidenceByQuestion: Record<string, PreTestConfidence>,
  overallMastery: number
): string[] {
  const scoreByFormat = new Map<GameFormat, { weighted: number; total: number }>();

  for (const question of preTestQuestions) {
    const format = question.format;
    const confidence = confidenceByQuestion[question.id] || 'guess';
    const isCorrect = Boolean(correctAnswers[question.id]);
    const weighted = getConfidenceWeight(isCorrect, confidence);
    const current = scoreByFormat.get(format) || { weighted: 0, total: 0 };
    scoreByFormat.set(format, {
      weighted: current.weighted + weighted,
      total: current.total + 1,
    });
  }

  const rankedFormats = Array.from(scoreByFormat.entries())
    .map(([format, stats]) => ({
      format,
      score: stats.total > 0 ? stats.weighted / stats.total : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.format);

  const baseRecommendation =
    overallMastery <= 0.45
      ? SUPPORT_STYLE_FALLBACK
      : overallMastery >= 0.82
        ? CHALLENGE_STYLE_FALLBACK
        : rankedFormats;

  const merged = [...new Set([...baseRecommendation, ...rankedFormats])];
  return merged.slice(0, 3).map((format) => format);
}

export default function PreTest() {
  const isRestoringRef = useRef(false);
  const lastPersistedRef = useRef('');
  const [isProgressInitialized, setIsProgressInitialized] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [confidenceByQuestion, setConfidenceByQuestion] = useState<Record<string, PreTestConfidence>>({});
  const [preferredQuestionIds, setPreferredQuestionIds] = useState<string[]>([]);
  const [prefAssessmentStyle, setPrefAssessmentStyle] = useState<'gamified' | 'traditional' | 'balanced'>('balanced');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [prefContentMode, setPrefContentMode] = useState<'text' | 'video'>('video');
  const [prefAssessmentTime, setPrefAssessmentTime] = useState<'inModule' | 'endOfModule'>('inModule');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfidenceCapture, setShowConfidenceCapture] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<{ questionId: string; isCorrect: boolean } | null>(null);
  const { isMobile } = useResponsive();
  
  const { session, updateSession, clearSession } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.preTestDone && !session?.preTestRetakeInProgress) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  useEffect(() => {
    if (!session) {
      return;
    }
    
    if (session.preTestDone && !session.preTestRetakeInProgress) {
      return;
    }

    // Only try to restore if session has been properly initialized from storage
    // (indicated by having a studentId and preTestProgress field exists)
    if (!session.studentId) {
      return;
    }

    const saved = session.preTestProgress;
    
    if (!saved) {
      setIsProgressInitialized(true);
      return;
    }

    isRestoringRef.current = true;

    setCurrentIdx(saved.currentIdx ?? 0);
    setScore(saved.score ?? 0);
    setCorrectAnswers(saved.correctAnswers ?? {});
    setConfidenceByQuestion(saved.confidenceByQuestion ?? {});
    const restoredPreferred = Array.isArray(saved.preferredQuestionIds) ? saved.preferredQuestionIds : [];
    const recommendedFromPending = Array.isArray(saved.pendingResults?.recommendedFormatIds)
      ? saved.pendingResults.recommendedFormatIds
      : [];
    setPreferredQuestionIds(restoredPreferred.length > 0 ? restoredPreferred : recommendedFromPending);
    setPrefAssessmentStyle(saved.assessmentStyle ?? 'balanced');
    setRecommendation(saved.recommendation ?? '');
    setPrefContentMode(saved.prefContentMode ?? 'video');
    setPrefAssessmentTime(saved.prefAssessmentTime ?? 'inModule');
    setShowRecommendation(saved.stage === 'personalization');

    if (saved.pendingResults) {
      (window as any)._tempPreTestResults = saved.pendingResults;
    }

    window.setTimeout(() => {
      isRestoringRef.current = false;
      setIsProgressInitialized(true);
    }, 0);
  }, [session]);

  useEffect(() => {
    if (!session || (session.preTestDone && !session.preTestRetakeInProgress) || isRestoringRef.current || !isProgressInitialized) {
      return;
    }

    const stage: PreTestProgress['stage'] = showRecommendation
      ? 'personalization'
      : 'questions';

    const payload: PreTestProgress = {
      stage,
      currentIdx,
      score,
      correctAnswers,
      confidenceByQuestion,
      preferredQuestionIds,
      assessmentStyle: prefAssessmentStyle,
      recommendation,
      prefContentMode,
      prefAssessmentTime,
      pendingResults: (window as any)._tempPreTestResults || null,
    };

    const serialized = JSON.stringify(payload);
    if (serialized === lastPersistedRef.current) {
      return;
    }
    lastPersistedRef.current = serialized;
    updateSession({ preTestProgress: payload });
  }, [
    session,
    isProgressInitialized,
    currentIdx,
    score,
    correctAnswers,
    confidenceByQuestion,
    preferredQuestionIds,
    prefAssessmentStyle,
    recommendation,
    prefContentMode,
    prefAssessmentTime,
    showRecommendation,
    updateSession,
  ]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logout();
    if (result.success) {
      clearSession();
      navigate('/login');
    }
    setIsLoggingOut(false);
  };

  const handleSkipAndGoDashboard = () => {
    // Skip pretest but mark that user can still take it later
    // Modules will be locked until pretest is done
    trackEvent({
      type: 'pretest_skipped',
      timestamp: new Date().toISOString(),
      data: {
        questionsAttempted: currentIdx,
        phase: 'pre-test',
        retakeInProgress: Boolean(session?.preTestRetakeInProgress),
      }
    });

    if (session?.preTestRetakeInProgress) {
      // Keep previous pretest results and modules active; user can continue retake later.
      updateSession({ preTestRetakeInProgress: true });
    }

    navigate('/dashboard');
  };

  const preTestPreferenceOptions = (() => {
    const formatDescriptions: Record<GameFormat, string> = {
      [GameFormat.DRAG_SORT]: 'Drag items into the right category',
      [GameFormat.RAINDROP]: 'Catch correct falling drops quickly',
      [GameFormat.SPIN_WHEEL]: 'Spin and answer from outcome chance',
      [GameFormat.BAR_BUILDER]: 'Read or compare bar graph values',
      [GameFormat.HOTSPOT]: 'Tap the correct value hotspot',
      [GameFormat.PIE_SLICER]: 'Understand pie sectors and percentages',
      [GameFormat.TALLY_TAP]: 'Read and count tally patterns',
    };

    return Object.values(GameFormat).map((format) => ({
      id: format,
      format,
      label: formatDescriptions[format],
    }));
  })();

  const togglePreferredQuestion = (questionId: string) => {
    setPreferredQuestionIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const getRecommendedFormatIds = (): string[] => {
    const pendingRecommended = (window as any)?._tempPreTestResults?.recommendedFormatIds;
    if (Array.isArray(pendingRecommended) && pendingRecommended.length > 0) {
      return pendingRecommended;
    }
    return effectivePreferredQuestionIds;
  };

  const getAutoSelectionForStyle = (style: 'gamified' | 'traditional' | 'balanced'): string[] => {
    const recommended = getRecommendedFormatIds();
    const stylePriority = STYLE_FORMAT_PRIORITIES[style].map((format) => format);

    if (style === 'balanced') {
      const mergedBalanced = [...new Set([...(recommended || []), ...stylePriority])];
      return mergedBalanced.slice(0, 3);
    }

    const recommendedInStyle = recommended.filter((formatId) => stylePriority.includes(formatId as GameFormat));
    const merged = [...new Set([...recommendedInStyle, ...stylePriority, ...recommended])];
    return merged.slice(0, 3);
  };

  const handleAssessmentStyleChange = (style: 'gamified' | 'traditional' | 'balanced') => {
    setPrefAssessmentStyle(style);
    const autoSelection = getAutoSelectionForStyle(style);
    setPreferredQuestionIds(autoSelection);
  };

  const effectivePreferredQuestionIds =
    preferredQuestionIds.length > 0
      ? preferredQuestionIds
      : (Array.isArray((window as any)?._tempPreTestResults?.recommendedFormatIds)
          ? (window as any)._tempPreTestResults.recommendedFormatIds
          : []);

  useEffect(() => {
    if (!showRecommendation || preferredQuestionIds.length > 0) return;
    const recommendedIds = (window as any)?._tempPreTestResults?.recommendedFormatIds;
    if (Array.isArray(recommendedIds) && recommendedIds.length > 0) {
      setPreferredQuestionIds(recommendedIds);
    }
  }, [showRecommendation, preferredQuestionIds.length]);

  const getFormatLabel = (format: GameFormat) => {
    switch (format) {
      case GameFormat.DRAG_SORT:
        return 'Drag & Sort';
      case GameFormat.RAINDROP:
        return 'Raindrop Catch';
      case GameFormat.BAR_BUILDER:
        return 'Bar Builder';
      case GameFormat.TALLY_TAP:
        return 'Tally Tap';
      case GameFormat.SPIN_WHEEL:
        return 'Spin Wheel';
      case GameFormat.PIE_SLICER:
        return 'Pie Slicer';
      case GameFormat.HOTSPOT:
        return 'Hotspot';
      default:
        return format;
    }
  };

  const getFormatPreview = (format: GameFormat) => {
    if (format === GameFormat.BAR_BUILDER) {
      return (
        <div className="flex h-10 items-end gap-1">
          <span className="w-2 rounded-t bg-brand/50" style={{ height: '40%' }} />
          <span className="w-2 rounded-t bg-brand/70" style={{ height: '70%' }} />
          <span className="w-2 rounded-t bg-brand" style={{ height: '95%' }} />
        </div>
      );
    }
    if (format === GameFormat.RAINDROP) {
      return (
        <div className="relative h-10 w-12 overflow-hidden rounded-lg bg-sky-50">
          <motion.span
            animate={{ y: [-10, 18], opacity: [0, 1, 0.8] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1 top-0 text-sm"
          >
            💧
          </motion.span>
          <motion.span
            animate={{ y: [-12, 18], opacity: [0, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.25, ease: 'linear' }}
            className="absolute left-5 top-0 text-sm"
          >
            💧
          </motion.span>
          <motion.span
            animate={{ y: [-8, 18], opacity: [0, 1, 0.8] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.45, ease: 'linear' }}
            className="absolute left-8 top-0 text-sm"
          >
            💧
          </motion.span>
        </div>
      );
    }
    if (format === GameFormat.SPIN_WHEEL) {
      return <div className="h-8 w-8 rounded-full bg-[conic-gradient(#ef4444_0deg_130deg,#3b82f6_130deg_320deg,#22c55e_320deg_360deg)]" />;
    }
    if (format === GameFormat.PIE_SLICER) {
      return <div className="h-8 w-8 rounded-full bg-[conic-gradient(#3b82f6_0deg_180deg,#e2e8f0_180deg_360deg)]" />;
    }
    if (format === GameFormat.TALLY_TAP) {
      return <div className="font-mono text-sm tracking-widest text-slate-700">|||| /</div>;
    }
    if (format === GameFormat.HOTSPOT) {
      return (
        <div className="relative h-8 w-12 rounded-lg border border-slate-200 bg-white">
          <span className="absolute left-1 top-1 text-[10px] font-bold text-slate-400">4</span>
          <span className="absolute right-1 top-1 rounded-full bg-brand px-1 text-[9px] font-black text-white">7</span>
          <span className="absolute left-1 bottom-1 text-[10px] font-bold text-slate-400">5</span>
        </div>
      );
    }
    return <div className="text-xl">🧩</div>;
  };

  const prepareResults = () => {
    const finalScore = Math.round((score / preTestQuestions.length) * 100);
    const avgFeedback = 3;

    const overallMastery = preTestQuestions.reduce((sum, question) => {
      const confidence = confidenceByQuestion[question.id] || 'guess';
      const isCorrect = Boolean(correctAnswers[question.id]);
      return sum + getConfidenceWeight(isCorrect, confidence);
    }, 0) / Math.max(preTestQuestions.length, 1);

    const confidenceAdjustedScore = Math.round(overallMastery * 100);
    const overallPath = getPathFromMastery(overallMastery);
    const recommendedFormatIds = buildRecommendedGameStyles(correctAnswers, confidenceByQuestion, overallMastery);

    const moduleEvaluationEntries = Object.entries(MODULE_SKILL_QUESTION_IDS).map(([moduleKey, questionIds]) => {
      const evaluation = evaluateModuleSkill(questionIds, correctAnswers, confidenceByQuestion);
      return [moduleKey, evaluation] as const;
    });

    const moduleSkillMastery = moduleEvaluationEntries.reduce((acc, [moduleKey, evaluation]) => {
      acc[moduleKey] = Number(evaluation.mastery.toFixed(3));
      return acc;
    }, {} as Record<string, number>);

    const m21 = moduleEvaluationEntries.find(([moduleKey]) => moduleKey === '2.1')?.[1] || { mastery: 0.5, path: 'B', adaptiveMode: 'standard' as PreTestAdaptiveMode };
    const m22 = moduleEvaluationEntries.find(([moduleKey]) => moduleKey === '2.2')?.[1] || { mastery: 0.5, path: 'B', adaptiveMode: 'standard' as PreTestAdaptiveMode };
    const m23 = moduleEvaluationEntries.find(([moduleKey]) => moduleKey === '2.3')?.[1] || { mastery: 0.5, path: 'B', adaptiveMode: 'standard' as PreTestAdaptiveMode };
    const m24 = moduleEvaluationEntries.find(([moduleKey]) => moduleKey === '2.4')?.[1] || { mastery: 0.5, path: 'B', adaptiveMode: 'standard' as PreTestAdaptiveMode };

    const path25 = getPathFromMastery(overallMastery);
    const path26 = getPathFromMastery(overallMastery);
    const mode25 = getAdaptiveModeFromMastery(overallMastery);
    const mode26 = getAdaptiveModeFromMastery(overallMastery);

    const supportModules = [
      ...(m21.adaptiveMode === 'support' ? ['2.1'] : []),
      ...(m22.adaptiveMode === 'support' ? ['2.2'] : []),
      ...(m23.adaptiveMode === 'support' ? ['2.3'] : []),
      ...(m24.adaptiveMode === 'support' ? ['2.4'] : []),
      ...(mode25 === 'support' ? ['2.5'] : []),
      ...(mode26 === 'support' ? ['2.6'] : []),
    ];
    const challengeModules = [
      ...(m21.adaptiveMode === 'challenge' ? ['2.1'] : []),
      ...(m22.adaptiveMode === 'challenge' ? ['2.2'] : []),
      ...(m23.adaptiveMode === 'challenge' ? ['2.3'] : []),
      ...(m24.adaptiveMode === 'challenge' ? ['2.4'] : []),
      ...(mode25 === 'challenge' ? ['2.5'] : []),
      ...(mode26 === 'challenge' ? ['2.6'] : []),
    ];

    const contentMode: 'text' | 'video' = overallMastery >= 0.6 ? 'text' : 'video';
    const assessmentTime: 'inModule' | 'endOfModule' = overallMastery >= 0.78 ? 'endOfModule' : 'inModule';

    const recParts = [`Adaptive setup (${finalScore}% accuracy, ${confidenceAdjustedScore}% confidence-adjusted mastery)`];
    if (supportModules.length > 0) {
      recParts.push(`Support focus: ${supportModules.join(', ')}`);
    }
    if (challengeModules.length > 0) {
      recParts.push(`Challenge-ready: ${challengeModules.join(', ')}`);
    }
    const rec = recParts.join(' • ');

    setPreferredQuestionIds(recommendedFormatIds);
    setRecommendation(rec);
    setPrefContentMode(contentMode);
    setPrefAssessmentTime(assessmentTime);
    setShowRecommendation(true);

    const tempResults = {
      preTestScore: finalScore,
      learningPath: overallPath,
      preTestFeedback: avgFeedback,
      recommendedStyle: rec,
      recommendedFormatIds,
      overallMastery,
      moduleSkillMastery,
      confidenceByQuestion,
      moduleProgress: [
        {
          moduleId: '2.1',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: m21.path,
          adaptiveMode: m21.adaptiveMode,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: m21.adaptiveMode === 'challenge' ? 'questions' : 'content',
        },
        {
          moduleId: '2.2',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: m22.path,
          adaptiveMode: m22.adaptiveMode,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: m22.adaptiveMode === 'challenge' ? 'questions' : 'content',
        },
        {
          moduleId: '2.3',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: m23.path,
          adaptiveMode: m23.adaptiveMode,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: m23.adaptiveMode === 'challenge' ? 'questions' : 'content',
        },
        {
          moduleId: '2.4',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: m24.path,
          adaptiveMode: m24.adaptiveMode,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: m24.adaptiveMode === 'challenge' ? 'questions' : 'content',
        },
        {
          moduleId: '2.5',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: path25,
          adaptiveMode: mode25,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: mode25 === 'challenge' ? 'questions' : 'content',
        },
        {
          moduleId: '2.6',
          completed: false,
          score: 0,
          stars: 0,
          learningPath: path26,
          adaptiveMode: mode26,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: 0,
          currentConceptStage: mode26 === 'challenge' ? 'questions' : 'content',
        },
      ],
      style: prefAssessmentStyle,
    };
    (window as any)._tempPreTestResults = tempResults;
  };

  const handleFinish = () => {
    const results = (window as any)._tempPreTestResults;
    if (!results) return;

    if (effectivePreferredQuestionIds.length === 0) {
      return;
    }

    const selectedFormats = preTestPreferenceOptions
      .filter((option) => effectivePreferredQuestionIds.includes(option.id))
      .map((option) => option.format);

    const enabledMechanics = selectedFormats.length > 0
      ? selectedFormats
      : Object.values(GameFormat);

    // Keep existing module history; only refresh pretest-derived path mapping.
    const existingProgress = session?.moduleProgress || [];
    const mergedModuleProgress = results.moduleProgress.map((nextModule: any) => {
      const existingModule = existingProgress.find((m) => m.moduleId === nextModule.moduleId);
      if (!existingModule) return nextModule;

      const hasModuleActivity =
        Boolean(existingModule.completed) ||
        Boolean(existingModule.showFinalAssessment) ||
        (existingModule.currentConceptIdx || 0) > 0 ||
        Object.keys(existingModule.attemptsCount || {}).length > 0;

      if (hasModuleActivity) {
        return {
          ...existingModule,
          completedPathSnapshot: existingModule.completed
            ? (existingModule.completedPathSnapshot || existingModule.learningPath)
            : existingModule.completedPathSnapshot,
          adaptiveMode: existingModule.adaptiveMode || nextModule.adaptiveMode,
        };
      }

      return {
        ...existingModule,
        ...nextModule,
        completedPathSnapshot: existingModule.completedPathSnapshot,
      };
    });

    const missingExistingModules = existingProgress.filter(
      (existingModule) => !mergedModuleProgress.some((m: any) => m.moduleId === existingModule.moduleId)
    );

    updateSession({ 
      preTestScore: results.preTestScore, 
      learningPath: results.learningPath, 
      preTestDone: true,
      preTestConfidenceByQuestion: confidenceByQuestion,
      preTestSkillMastery: results.moduleSkillMastery,
      preTestRetakeInProgress: false,
      preTestProgress: null,
      preTestFeedback: results.preTestFeedback,
      recommendedStyle: results.recommendedStyle,
      isStruggling: results.overallMastery < 0.45,
      moduleProgress: [...mergedModuleProgress, ...missingExistingModules],
      settings: {
        ...(session?.settings || {}),
        assessmentStyle: prefAssessmentStyle,
        contentMode: prefContentMode,
        assessmentTime: prefAssessmentTime,
        enabledMechanics
      } as any
    });
    navigate('/dashboard');
  };

  const handleConfidenceSelection = (confidence: PreTestConfidence) => {
    if (!pendingAnswer) return;

    const { questionId, isCorrect } = pendingAnswer;

    if (isCorrect) setScore((s) => s + 1);
    setCorrectAnswers((prev) => ({ ...prev, [questionId]: isCorrect }));
    setConfidenceByQuestion((prev) => ({ ...prev, [questionId]: confidence }));

    const confidenceWeighted = getConfidenceWeight(isCorrect, confidence);
    trackEvent({
      type: 'question_attempt',
      timestamp: new Date().toISOString(),
      data: {
        questionId,
        isCorrect,
        confidence,
        confidenceWeighted,
        phase: 'pre-test',
      },
    });

    setShowConfidenceCapture(false);
    setPendingAnswer(null);

    setTimeout(() => {
      if (currentIdx < preTestQuestions.length - 1) {
        setCurrentIdx((i) => i + 1);
      } else {
        prepareResults();
      }
    }, 650);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (pendingAnswer) return;

    setPendingAnswer({ questionId: preTestQuestions[currentIdx].id, isCorrect });
    setShowConfidenceCapture(true);
  };

  if (showRecommendation) {
    return (
      <div className={cn(
        "min-h-screen transition-colors",
        "px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3 lg:px-6 lg:pb-6 lg:pt-4",
        "bg-gradient-to-br from-slate-50 to-blue-50"
      )}>
        <div className="mx-auto w-full max-w-none">
          <div className="mb-3 sm:mb-4">
            <h1 className={cn("font-black text-slate-900", isMobile ? "text-lg" : "text-xl")}>Diagnostic Mission</h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">Mission complete. Finalize your personalized setup below.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "w-full rounded-3xl bg-white p-4 sm:p-5 lg:p-6 shadow-xl",
              "border border-slate-100"
            )}
          >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="mb-1 text-xl text-center font-black text-slate-900">Mission Complete!</h2>
          <p className="mb-3 text-center text-sm text-slate-500">We've personalized your journey based on your results.</p>
          
          <div className="mb-4 rounded-2xl bg-brand/10 p-3 border-2 border-brand/20 text-center">
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Your Learning Profile</p>
            <p className="text-sm sm:text-base font-extrabold text-brand-dark">Recommended: {recommendation}</p>
            <p className="mt-1 text-sm sm:text-base font-extrabold text-slate-700">
              Current: {prefAssessmentStyle === 'gamified' ? 'Gamified' : prefAssessmentStyle === 'traditional' ? 'Traditional' : 'Balanced'}
            </p>
          </div>

          <div className={cn(
            "space-y-4",
            isMobile && "space-y-3"
          )}>
            <section>
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Assessment Style</h3>
              <p className="mb-2 text-xs text-slate-500">How would you like assessment to feel?</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'gamified', icon: '🎮', label: 'Gamified', desc: 'More game-like formats first' },
                  { id: 'traditional', icon: '📚', label: 'Traditional', desc: 'More direct/quiz-like formats first' },
                  { id: 'balanced', icon: '⚖️', label: 'Balanced', desc: 'Mix of both styles' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleAssessmentStyleChange(style.id as 'gamified' | 'traditional' | 'balanced')}
                    className={cn(
                      "rounded-xl border-2 p-2.5 text-center transition-all",
                      prefAssessmentStyle === style.id ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-500"
                    )}
                  >
                    <p className="text-lg">{style.icon}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-wider">{style.label}</p>
                    <p className="mt-1 text-[11px] font-semibold leading-tight">{style.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Which Question Type Do You Prefer?</h3>
              <p className="mb-2 text-xs text-slate-500">Choose one or more. We will prioritize these formats in your journey.</p>
              <p className="mb-2 text-xs font-bold text-emerald-700">
                Auto-selected recommended styles based on your diagnostic. You can change them.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
                {preTestPreferenceOptions.map((option) => {
                  const selected = effectivePreferredQuestionIds.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => togglePreferredQuestion(option.id)}
                      className={cn(
                        "w-full rounded-xl border p-2 text-left transition-all",
                        selected
                          ? "border-brand bg-brand/10"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div>{getFormatPreview(option.format)}</div>
                        <div className={cn('h-4 w-4 rounded-full border-2', selected ? 'border-brand bg-brand' : 'border-slate-300')} />
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-brand">{getFormatLabel(option.format)}</p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] font-semibold text-slate-700">{option.label}</p>
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Selected: {effectivePreferredQuestionIds.length} (minimum 1 required)
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Learning Mode</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrefContentMode('video')}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 sm:p-3 transition-all",
                    prefContentMode === 'video' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-lg sm:text-xl">📺</span>
                  <span className="font-bold text-xs sm:text-sm">Video</span>
                </button>
                <button
                  onClick={() => setPrefContentMode('text')}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 sm:p-3 transition-all",
                    prefContentMode === 'text' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-lg sm:text-xl">📖</span>
                  <span className="font-bold text-xs sm:text-sm">Text</span>
                </button>
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Assessment Timing</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrefAssessmentTime('inModule')}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 sm:p-3 transition-all",
                    prefAssessmentTime === 'inModule' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-lg sm:text-xl">⏱️</span>
                  <span className="font-bold text-xs text-center">After each part</span>
                </button>
                <button
                  onClick={() => setPrefAssessmentTime('endOfModule')}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 sm:p-3 transition-all",
                    prefAssessmentTime === 'endOfModule' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-lg sm:text-xl">🏁</span>
                  <span className="font-bold text-xs text-center">At the end</span>
                </button>
              </div>
            </section>

            <button
              onClick={handleFinish}
              disabled={effectivePreferredQuestionIds.length === 0}
              className="w-full rounded-2xl bg-brand py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start My Journey
              <span>→</span>
            </button>
          </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const q = preTestQuestions[currentIdx];

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      "p-4 sm:p-6 lg:p-8",
      "bg-gradient-to-br from-slate-50 to-blue-50"
    )}>
      <div className={cn(
        "mx-auto w-full",
        "max-w-none"
      )}>
        {/* Header with Profile Details, Logout and Skip Options */}
        <div className="mb-6 sm:mb-8">
          <div className={cn(
            "mb-4 sm:mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
            isMobile && "flex-col items-start"
          )}>
            <div>
              <h1 className={cn(
                "font-black text-slate-900",
                isMobile ? "text-xl" : "text-2xl"
              )}>Diagnostic Mission</h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">Welcome, <span className="font-bold text-brand">{session?.name}</span>! Let's find your perfect learning path.</p>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg bg-white px-3 sm:px-4 py-2 sm:py-3 text-right shadow-sm border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-500">School</p>
                  <p className="font-semibold text-xs sm:text-sm text-slate-800">{session?.school}</p>
                </div>
                <div className="rounded-lg bg-white px-3 sm:px-4 py-2 sm:py-3 text-right shadow-sm border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-500">Class</p>
                  <p className="font-semibold text-xs sm:text-sm text-slate-800">{session?.class}</p>
                </div>
              </div>
            )}
          </div>
          <div className={cn(
            "flex gap-2 sm:gap-3",
            "flex-col-reverse sm:flex-row sm:items-center sm:justify-end"
          )}>
            <button
              onClick={() => setShowSkipConfirm(true)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 sm:px-4 py-2 font-semibold text-amber-700 transition-all hover:bg-amber-100 active:scale-95",
                isMobile && "w-full"
              )}
            >
              Skip for now
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 sm:px-4 py-2 font-semibold text-red-600 transition-all hover:bg-red-100 active:scale-95",
                isMobile && "w-full"
              )}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-slate-500">Question {currentIdx + 1} of {preTestQuestions.length}</span>
          <span className="text-xs sm:text-sm font-bold text-brand">{Math.round(((currentIdx + 1) / preTestQuestions.length) * 100)}%</span>
        </div>

        <div className="mb-6 sm:mb-8 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / preTestQuestions.length) * 100}%` }}
            className="h-full rounded-full bg-gradient-to-r from-brand to-purple-500"
          />
        </div>

        <div className={cn(
          "rounded-3xl bg-white shadow-lg border border-slate-100",
          "p-4 sm:p-6 lg:p-8"
        )}>
          <GameQuestion
            key={q.id}
            questionText={q.text}
            options={q.options}
            correctAnswer={q.correctAnswer}
            format={q.format}
            styles={q.styles}
            image={q.image}
            visual={q.styles?.[q.format]?.visual}
            isPreTest={true}
            onAnswer={handleAnswer}
          />
        </div>

        <AnimatePresence>
          {showConfidenceCapture && pendingAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.92, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 8 }}
                className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
              >
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Confidence Check</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">How sure are you?</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Your confidence helps us pick support mode vs challenge mode more accurately.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {([
                    { key: 'sure', label: 'Sure', style: 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
                    { key: 'maybe', label: 'Maybe', style: 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100' },
                    { key: 'guess', label: 'Guess', style: 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100' },
                  ] as Array<{ key: PreTestConfidence; label: string; style: string }>).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleConfidenceSelection(item.key)}
                      className={cn('rounded-xl border px-3 py-3 text-sm font-black transition', item.style)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Confirmation Modal */}
        <AnimatePresence>
          {showSkipConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
                  ⚠️
                </div>
                <h3 className="mb-3 text-xl font-black text-slate-900">Skip Diagnostic?</h3>
                <p className="mb-6 text-sm text-slate-600">
                  You can go to the dashboard now, but you'll need to complete this diagnostic mission before you can access the learning modules. You can always come back and do it later!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSkipConfirm(false)}
                    className="flex-1 rounded-lg border-2 border-slate-200 py-3 font-bold text-slate-700 transition-all hover:border-slate-300 active:scale-95"
                  >
                    Keep Going
                  </button>
                  <button
                    onClick={handleSkipAndGoDashboard}
                    className="flex-1 rounded-lg bg-amber-500 py-3 font-bold text-white transition-all hover:bg-amber-600 active:scale-95"
                  >
                    Skip for Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
                  👋
                </div>
                <h3 className="mb-3 text-xl font-black text-slate-900">Logout?</h3>
                <p className="mb-6 text-sm text-slate-600">
                  Are you sure you want to logout? You'll be signed out of your account and sent back to the login page.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 rounded-lg border-2 border-slate-200 py-3 font-bold text-slate-700 transition-all hover:border-slate-300 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-1 rounded-lg bg-red-500 py-3 font-bold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
