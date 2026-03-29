import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getChapterDataForPath } from '../data/Standard/pathData';
import { ConceptBlock } from '../components/ConceptBlock';
import { GameQuestion } from '../components/GameQuestion';
import { RemediationBlock } from '../components/RemediationBlock';
import { RocketProgress } from '../components/RocketProgress';
import { useSessionStore } from '../store/sessionStore';
import { ChevronLeft, CheckCircle, Settings } from 'lucide-react';
import { SettingsModal } from '../components/SettingsModal';
import ExitConfirmationModal from '../components/ExitConfirmationModal';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { useMergeIntegration, submitMergePayload } from '../hooks/useMergeIntegration';
import { remedialContentBank, getReferenceTagsForQuestion } from '../data/Standard/remedialContentBank';
import { trackTelemetryEvent, updateTrackingModule, flushTrackingEvents } from '../analytics/telemetry';
import type { ConfidenceRating, ModuleProgress } from '../types';
import type { LearningPath } from '../types';

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDurationBadgeText(textContent?: string): string | null {
  if (!textContent) return null;
  const match = textContent.match(/<div class="duration-badge"[^>]*>([\s\S]*?)<\/div>/i);
  if (!match?.[1]) return null;
  const plain = match[1].replace(/<[^>]+>/g, '');
  return decodeHtmlEntities(plain);
}

type ConceptPerformanceSummary = {
  conceptId: string;
  mastery: number;
  accuracy: number;
  attempts: number;
  hintsUsed: number;
  remediationUsed: number;
  timeSpentSec: number;
};

function getPathForMastery(mastery: number): 'A' | 'B' | 'C' {
  if (mastery < 0.4) return 'A';
  if (mastery <= 0.75) return 'B';
  return 'C';
}

function toPathLabel(path: 'A' | 'B' | 'C'): string {
  if (path === 'A') return 'Foundational';
  if (path === 'C') return 'Advanced';
  return 'Standard';
}

function toConfidenceLabel(value?: ConfidenceRating) {
  if (value === 'low') return 'Low';
  if (value === 'med') return 'Medium';
  if (value === 'high') return 'High';
  return null;
}

type PendingCompletionPayload = {
  moduleProgressOverride?: ModuleProgress[];
  learningPathOverride?: LearningPath;
};

type ReattemptNavigationSnapshot = {
  currentConceptIdx: number;
  currentConceptStage: 'content' | 'examples' | 'questions';
  showFinalAssessment: boolean;
  finalAssessmentIdx: number;
};

const REATTEMPT_SNAPSHOT_PREFIX = 'dataquest:reattempt:';

function getReattemptSnapshotKey(moduleId?: string): string | null {
  if (!moduleId) return null;
  return `${REATTEMPT_SNAPSHOT_PREFIX}${moduleId}`;
}

function readReattemptSnapshot(moduleId?: string): ReattemptNavigationSnapshot | null {
  if (typeof window === 'undefined') return null;
  const key = getReattemptSnapshotKey(moduleId);
  if (!key) return null;

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ReattemptNavigationSnapshot>;
    const stage = parsed.currentConceptStage;

    if (stage !== 'content' && stage !== 'examples' && stage !== 'questions') {
      return null;
    }

    return {
      currentConceptIdx: Math.max(0, Number(parsed.currentConceptIdx || 0)),
      currentConceptStage: stage,
      showFinalAssessment: Boolean(parsed.showFinalAssessment),
      finalAssessmentIdx: Math.max(0, Number(parsed.finalAssessmentIdx || 0)),
    };
  } catch {
    return null;
  }
}

export default function ModulePage() {
  useMergeIntegration();
  const { moduleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { session, updateSession, updateMetrics } = useSessionStore();

  const isReattemptMode = searchParams.get('mode') === 'reattempt';
  const moduleProgress = session?.moduleProgress?.find((p) => p.moduleId === moduleId);
  const reviewedPath = moduleProgress?.completedPathSnapshot || moduleProgress?.learningPath;
  const isReviewMode = !!moduleProgress?.completed && !isReattemptMode;
  const reattemptSnapshot = isReattemptMode ? readReattemptSnapshot(moduleId) : null;
  const reattemptSnapshotKey = getReattemptSnapshotKey(moduleId);
  const path = isReattemptMode
    ? (session?.learningPath || 'B')
    : (isReviewMode ? reviewedPath : moduleProgress?.learningPath) || session?.learningPath || 'B';

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentConceptIdx, setCurrentConceptIdx] = useState(() => (isReattemptMode ? (reattemptSnapshot?.currentConceptIdx || 0) : moduleProgress?.currentConceptIdx || 0));
  const [showFinalAssessment, setShowFinalAssessment] = useState(() => (isReattemptMode ? (reattemptSnapshot?.showFinalAssessment || false) : moduleProgress?.showFinalAssessment || false));
  const [finalAssessmentIdx, setFinalAssessmentIdx] = useState(() => (isReattemptMode ? (reattemptSnapshot?.finalAssessmentIdx || 0) : moduleProgress?.finalAssessmentIdx || 0));
  const [conceptStage, setConceptStage] = useState<'content' | 'examples' | 'questions'>(() => (isReattemptMode ? (reattemptSnapshot?.currentConceptStage || 'content') : moduleProgress?.currentConceptStage || 'content'));
  const [conceptEntryStage, setConceptEntryStage] = useState<'content' | 'examples' | 'questions'>(() => (isReattemptMode ? (reattemptSnapshot?.currentConceptStage || 'content') : moduleProgress?.currentConceptStage || 'content'));
  const [conceptEntryQuestionMode, setConceptEntryQuestionMode] = useState<'first' | 'last'>('first');
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showReviewSnapshotPopup, setShowReviewSnapshotPopup] = useState(false);
  const [showConfidencePrompt, setShowConfidencePrompt] = useState(false);
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceRating | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinalizingCompletion, setIsFinalizingCompletion] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const lastPersistedModuleStateRef = useRef('');
  const pendingCompletionRef = useRef<PendingCompletionPayload | null>(null);
  const lastInteractionRef = useRef(Date.now());
  const activeSecondsRef = useRef(0);
  const idleSecondsRef = useRef(0);

  useEffect(() => {
    if (!showCompletionCelebration) return;

    const timer = window.setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setRedirectToDashboard(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showCompletionCelebration]);

  useEffect(() => {
    if (redirectToDashboard) {
      navigate('/dashboard');
    }
  }, [redirectToDashboard, navigate]);

  useEffect(() => {
    if (!session || !session.studentId) {
      return;
    }

    if (isReattemptMode) {
      return;
    }

    const prog = session.moduleProgress?.find((p) => p.moduleId === moduleId);
    if (prog) {
      setCurrentConceptIdx(prog.currentConceptIdx || 0);
      setShowFinalAssessment(prog.showFinalAssessment || false);
      setFinalAssessmentIdx(prog.finalAssessmentIdx || 0);
      const restoredStage = prog.currentConceptStage || 'content';
      setConceptStage(restoredStage);
      setConceptEntryStage(restoredStage);
    }
  }, [moduleId, session?.studentId, session?.moduleProgress, isReattemptMode]);

  useEffect(() => {
    if (!isReattemptMode) return;

    const snapshot = readReattemptSnapshot(moduleId);
    const restoredStage = snapshot?.currentConceptStage || 'content';

    setCurrentConceptIdx(snapshot?.currentConceptIdx || 0);
    setShowFinalAssessment(snapshot?.showFinalAssessment || false);
    setFinalAssessmentIdx(snapshot?.finalAssessmentIdx || 0);
    setConceptStage(restoredStage);
    setConceptEntryStage(restoredStage);
    setConceptEntryQuestionMode('first');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isReattemptMode, moduleId]);

  useEffect(() => {
    if (!isReattemptMode || !reattemptSnapshotKey) return;
    if (typeof window === 'undefined') return;

    const snapshot: ReattemptNavigationSnapshot = {
      currentConceptIdx,
      currentConceptStage: conceptStage,
      showFinalAssessment,
      finalAssessmentIdx,
    };

    window.sessionStorage.setItem(reattemptSnapshotKey, JSON.stringify(snapshot));
  }, [isReattemptMode, reattemptSnapshotKey, currentConceptIdx, conceptStage, showFinalAssessment, finalAssessmentIdx]);

  useEffect(() => {
    if (!session || !moduleId || !moduleProgress?.completed || moduleProgress.completedPathSnapshot) {
      return;
    }

    updateSession({
      moduleProgress: session.moduleProgress.map((p) =>
        p.moduleId === moduleId ? { ...p, completedPathSnapshot: p.learningPath } : p
      ),
    });
  }, [session, moduleId, moduleProgress?.completed, moduleProgress?.completedPathSnapshot, updateSession]);

  useEffect(() => {
    if (!session || !moduleId) return;

    updateTrackingModule(moduleId);
    trackTelemetryEvent('module_open', {
      module_id: moduleId,
      event_data: {
        concept_index: currentConceptIdx,
      }
    });

    const markInteraction = () => {
      lastInteractionRef.current = Date.now();
      updateMetrics({ lastActivityTime: Date.now() });
    };

    const interactions: Array<keyof WindowEventMap> = ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'];
    interactions.forEach((evt) => window.addEventListener(evt, markInteraction, { passive: true }));

    const timeTicker = window.setInterval(() => {
      const idleMs = Date.now() - lastInteractionRef.current;
      if (idleMs < 45000) {
        activeSecondsRef.current += 1;
      } else {
        idleSecondsRef.current += 1;
      }

      if ((activeSecondsRef.current + idleSecondsRef.current) % 10 === 0) {
        updateMetrics({
          activeTimeSpent: (session.chapterMetrics?.activeTimeSpent || 0) + activeSecondsRef.current,
          idleTimeSpent: (session.chapterMetrics?.idleTimeSpent || 0) + idleSecondsRef.current,
          lastActivityTime: lastInteractionRef.current,
        });
        activeSecondsRef.current = 0;
        idleSecondsRef.current = 0;
      }
    }, 1000);

    return () => {
      interactions.forEach((evt) => window.removeEventListener(evt, markInteraction));
      window.clearInterval(timeTicker);
      trackTelemetryEvent('module_exit', {
        module_id: moduleId,
        event_data: {
          concept_index: currentConceptIdx,
        }
      });
      if (activeSecondsRef.current || idleSecondsRef.current) {
        updateMetrics({
          activeTimeSpent: (session.chapterMetrics?.activeTimeSpent || 0) + activeSecondsRef.current,
          idleTimeSpent: (session.chapterMetrics?.idleTimeSpent || 0) + idleSecondsRef.current,
          lastActivityTime: lastInteractionRef.current,
        });
        activeSecondsRef.current = 0;
        idleSecondsRef.current = 0;
      }
      flushTrackingEvents().catch(() => undefined);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, session?.studentId]);

  useEffect(() => {
    if (!moduleId) return;
    trackTelemetryEvent('stage_change', {
      module_id: moduleId,
      event_data: {
        concept_index: currentConceptIdx,
        concept_stage: conceptStage,
      }
    });
  }, [conceptStage, currentConceptIdx, moduleId]);

  useEffect(() => {
    if (!session || !moduleId) return;

    const serialized = JSON.stringify({
      moduleId,
      currentConceptIdx,
      conceptStage,
      showFinalAssessment,
      finalAssessmentIdx,
    });

    if (serialized === lastPersistedModuleStateRef.current) return;
    lastPersistedModuleStateRef.current = serialized;

    const newProgress = [...(session.moduleProgress || [])];
    const modIdx = newProgress.findIndex((p) => p.moduleId === moduleId);

    if (modIdx >= 0) {
      newProgress[modIdx] = {
        ...newProgress[modIdx],
        currentConceptIdx,
        currentConceptStage: conceptStage,
        showFinalAssessment,
        finalAssessmentIdx,
      };
    } else {
      newProgress.push({
        moduleId,
        completed: false,
        score: 0,
        stars: 0,
        learningPath: path,
        masteryMap: {},
        attemptsCount: {},
        currentConceptIdx,
        currentConceptStage: conceptStage,
        showFinalAssessment,
        finalAssessmentIdx,
      });
    }

    updateSession({ moduleProgress: newProgress });
  }, [session, moduleId, currentConceptIdx, conceptStage, showFinalAssessment, finalAssessmentIdx, path, updateSession]);


  // Defensive: get module and session, fallback UI if missing
  const moduleCatalog = getChapterDataForPath(path);
  const module = moduleCatalog.find((m) => m.id === moduleId);
  if (!module || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-2xl border p-8 text-center shadow-lg bg-white">
          <h2 className="text-2xl font-black">Module or session not found</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">We could not load the module or session data. Please return to the dashboard and try again.</p>
          <button
            onClick={() => window.location.assign('/dashboard')}
            className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const filteredConcepts = module.concepts.filter((c) => !c.path || c.path === path);
  const safeConceptIdx = Math.min(currentConceptIdx, Math.max(filteredConcepts.length - 1, 0));
  const rawSettings = session.settings || ({} as any);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    assessmentTime: rawSettings.assessmentTime || 'inModule',
  };

  const currentConcept = filteredConcepts[safeConceptIdx];
  const moduleDurationBadge = extractDurationBadgeText(currentConcept?.textContent);
  const conceptStageWeight = conceptStage === 'content' ? 0.33 : conceptStage === 'examples' ? 0.66 : 1;
  const progress = showFinalAssessment
    ? 100
    : Math.min(((safeConceptIdx + conceptStageWeight) / Math.max(filteredConcepts.length, 1)) * 100, 100);

  const allQuestions = filteredConcepts
    .flatMap((c) => c.questions.filter((q) => !q.path || q.path === path))
    .filter((q) => !q.adaptiveVariant);

  // Defensive: fallback UI if no concepts or currentConcept is undefined
  if (filteredConcepts.length === 0 || !currentConcept) {
    return (
      <div className={cn('min-h-screen pb-20 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
        <main className="mx-auto mt-12 max-w-3xl px-4">
          <div className={cn('rounded-3xl border p-8 text-center shadow-lg', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white')}>
            <h2 className="text-2xl font-black">No concepts found</h2>
            <p className={cn('mt-2 text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
              We could not load the concepts for this module. Please try resetting to the first concept or return to the dashboard.
            </p>
            <button
              onClick={() => {
                setCurrentConceptIdx(0);
                setConceptStage('content');
                setConceptEntryStage('content');
                setConceptEntryQuestionMode('first');
              }}
              className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
            >
              Reset to first concept
            </button>
            <button
              onClick={() => window.location.assign('/dashboard')}
              className="mt-4 ml-2 rounded-xl bg-slate-500 px-4 py-2 text-sm font-bold text-white"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Defensive: fallback UI if showFinalAssessment but no questions
  if (showFinalAssessment && allQuestions.length === 0) {
    return (
      <div className={cn('min-h-screen pb-20 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
        <main className="mx-auto mt-12 max-w-3xl px-4">
          <div className={cn('rounded-3xl border p-8 text-center shadow-lg', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white')}>
            <h2 className="text-2xl font-black">No assessment questions found</h2>
            <p className={cn('mt-2 text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
              We could not load the assessment questions for this module. Please return to the concept flow or dashboard.
            </p>
            <button
              onClick={() => {
                setShowFinalAssessment(false);
                setFinalAssessmentIdx(0);
              }}
              className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
            >
              Return to concept flow
            </button>
            <button
              onClick={() => window.location.assign('/dashboard')}
              className="mt-4 ml-2 rounded-xl bg-slate-500 px-4 py-2 text-sm font-bold text-white"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  useEffect(() => {
    if (filteredConcepts.length === 0) {
      if (showFinalAssessment) {
        setShowFinalAssessment(false);
      }
      return;
    }

    if (currentConceptIdx > filteredConcepts.length - 1) {
      setCurrentConceptIdx(filteredConcepts.length - 1);
      setConceptStage('content');
      setConceptEntryStage('content');
      setConceptEntryQuestionMode('first');
    }
  }, [filteredConcepts.length, currentConceptIdx, showFinalAssessment]);

  useEffect(() => {
    if (!showFinalAssessment) return;

    if (allQuestions.length === 0) {
      setShowFinalAssessment(false);
      setFinalAssessmentIdx(0);
      return;
    }

    if (finalAssessmentIdx > allQuestions.length - 1) {
      setFinalAssessmentIdx(Math.max(0, allQuestions.length - 1));
    }
  }, [showFinalAssessment, allQuestions.length, finalAssessmentIdx]);
  const reviewConceptSummary = isReviewMode
    ? filteredConcepts.map((concept) => {
        const attempts = moduleProgress?.attemptsCount?.[concept.id] || 0;
        const hintsUsed = moduleProgress?.attemptsCount?.[`hints_${concept.id}`] || 0;
        const timeSpentSec = moduleProgress?.attemptsCount?.[`time_${concept.id}`] || 0;
        const questionCount = concept.questions.filter((q) => (!q.path || q.path === path) && !q.adaptiveVariant).length;
        const skipped = questionCount > 0 && attempts === 0;
        const mastery = moduleProgress?.masteryMap?.[concept.id] || 'untried';

        return {
          conceptId: concept.id,
          title: concept.title,
          questionCount,
          attempts,
          hintsUsed,
          timeSpentSec,
          skipped,
          mastery,
        };
      })
    : [];
  const reviewedPathLabel = toPathLabel((reviewedPath || 'B') as 'A' | 'B' | 'C');
  const currentPathLabel = toPathLabel((session.learningPath || 'B') as 'A' | 'B' | 'C');
  const moduleConfidenceLabel = toConfidenceLabel(moduleProgress?.confidenceRating);

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const jumpToConceptQuestions = (conceptIndex: number) => {
    setShowReviewSnapshotPopup(false);
    setShowFinalAssessment(false);
    setCurrentConceptIdx(conceptIndex);
    setConceptStage('questions');
    setConceptEntryStage('questions');
    setConceptEntryQuestionMode('first');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exit confirmation using ExitConfirmationModal and useMergeTeamIntegration
  // Removed useMergeTeamIntegration, use useMergeIntegration and submitMergePayload instead
  const handleConfirmExit = async () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      await submitToMergeTeam('exited_midway');
    } catch (e) {
      // Optionally handle/log error
    } finally {
      setShowExitConfirm(false);
      navigate('/dashboard');
      setIsExiting(false);
    }
  };

  const finalizeModuleCompletion = async (
    confidenceRating?: ConfidenceRating,
    moduleProgressOverride?: ModuleProgress[],
    learningPathOverride?: LearningPath
  ) => {
    setIsFinalizingCompletion(true);
    setShowCompletionCelebration(true);
    setRedirectCountdown(3);
    setRedirectToDashboard(false);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });

    window.setTimeout(() => {
      confetti({ particleCount: 140, spread: 120, origin: { y: 0.58 } });
    }, 350);

    const newProgress = [...(moduleProgressOverride || session.moduleProgress || [])];
    const modIdx = newProgress.findIndex((p) => p.moduleId === moduleId);
    const finalPath =
      learningPathOverride ||
      (modIdx >= 0 ? newProgress[modIdx].learningPath : undefined) ||
      (moduleProgress?.learningPath as LearningPath | undefined) ||
      (session.learningPath as LearningPath | undefined) ||
      (path as LearningPath);

    if (modIdx >= 0) {
      const priorAttemptsCount = newProgress[modIdx].attemptsCount || {};
      const moduleAttemptCount = (priorAttemptsCount._moduleAttempts || 0) + 1;
      const moduleReattemptCount = (priorAttemptsCount._moduleReattempts || 0) + (isReattemptMode ? 1 : 0);

      newProgress[modIdx] = {
        ...newProgress[modIdx],
        completed: true,
        learningPath: finalPath,
        completedPathSnapshot: finalPath,
        confidenceRating: confidenceRating || newProgress[modIdx].confidenceRating,
        confidenceUpdatedAt: confidenceRating ? Date.now() : newProgress[modIdx].confidenceUpdatedAt,
        attemptsCount: {
          ...priorAttemptsCount,
          _moduleAttempts: moduleAttemptCount,
          _moduleReattempts: moduleReattemptCount,
        },
        showFinalAssessment: false,
        finalAssessmentIdx: 0,
      };
    } else {
      newProgress.push({
        moduleId: moduleId!,
        completed: true,
        score: 100,
        stars: 3,
        learningPath: finalPath,
        completedPathSnapshot: finalPath,
        confidenceRating,
        confidenceUpdatedAt: confidenceRating ? Date.now() : undefined,
        masteryMap: {},
        attemptsCount: {
          _moduleAttempts: 1,
          _moduleReattempts: isReattemptMode ? 1 : 0,
        },
        showFinalAssessment: false,
        finalAssessmentIdx: 0,
      });
    }

    updateSession({ moduleProgress: newProgress, learningPath: finalPath, xp: (session.xp || 0) + 500, sessionStatus: 'completed' });

    if (isReattemptMode && reattemptSnapshotKey && typeof window !== 'undefined') {
      window.sessionStorage.removeItem(reattemptSnapshotKey);
    }

    trackTelemetryEvent('module_complete', {
      module_id: moduleId,
      event_data: {
        xp_after: (session.xp || 0) + 500,
        confidence_rating: confidenceRating || null,
      }
    });
    trackTelemetryEvent('session_end', {
      module_id: moduleId,
      event_data: {
        status: 'completed',
      }
    });

    try {
      await flushTrackingEvents();
      await submitMergePayload(session, 'completed', { isSync: false });
    } catch (error) {
      console.error('Error submitting completion payload:', error);
    } finally {
      setIsFinalizingCompletion(false);
    }
  };

  const handleModuleComplete = (moduleProgressOverride?: ModuleProgress[], learningPathOverride?: LearningPath) => {
    if (isReviewMode) {
      navigate('/dashboard');
      return;
    }

    pendingCompletionRef.current = { moduleProgressOverride, learningPathOverride };
    setSelectedConfidence(null);
    setShowConfidencePrompt(true);
  };

  const handleConfidenceDecision = async (rating?: ConfidenceRating) => {
    const pending = pendingCompletionRef.current;
    pendingCompletionRef.current = null;
    setShowConfidencePrompt(false);

    if (rating) {
      trackTelemetryEvent('profile_updated', {
        module_id: moduleId,
        event_data: {
          confidence_rating: rating,
          scope: 'module_completion',
        }
      });
    }

    await finalizeModuleCompletion(rating, pending?.moduleProgressOverride, pending?.learningPathOverride);
  };

  const handleConceptComplete = (performance?: ConceptPerformanceSummary) => {
    const activeConceptIdx = Math.min(currentConceptIdx, Math.max(filteredConcepts.length - 1, 0));
    const existingProgress = [...(session.moduleProgress || [])];
    const existingModIdx = existingProgress.findIndex((p) => p.moduleId === moduleId);
    const existingModule = existingModIdx >= 0 ? existingProgress[existingModIdx] : null;
    const isReviewingCompletedModule = !!existingModule?.completed && !isReattemptMode;
    const shouldUpdateGlobalPath = !isReviewingCompletedModule;
    const currentModuleIndex = moduleCatalog.findIndex((m) => m.id === moduleId);
    const nextModuleId = currentModuleIndex >= 0 ? moduleCatalog[currentModuleIndex + 1]?.id : undefined;

    let nextPath = path;
    let nextAdaptiveMode: 'support' | 'standard' | 'challenge' = existingModule?.adaptiveMode || 'standard';
    let nextConceptStage: 'content' | 'questions' = nextAdaptiveMode === 'challenge' ? 'questions' : 'content';
    let strugglingSignal = session.isStruggling || false;
    let updatedMasteryMap = existingModule?.masteryMap || {};
    let updatedAttemptsCount = existingModule?.attemptsCount || {};

    if (performance && !isReviewingCompletedModule) {
      const roundedMastery = Math.round(performance.mastery * 100);
      const priorAttemptsForConcept = updatedAttemptsCount[performance.conceptId] || 0;
      const priorHintsForConcept = updatedAttemptsCount[`hints_${performance.conceptId}`] || 0;
      const priorTimeForConcept = updatedAttemptsCount[`time_${performance.conceptId}`] || 0;
      updatedAttemptsCount = {
        ...updatedAttemptsCount,
        [performance.conceptId]: isReattemptMode ? priorAttemptsForConcept + performance.attempts : performance.attempts,
        [`mastery_${performance.conceptId}`]: roundedMastery,
        [`hints_${performance.conceptId}`]: isReattemptMode ? priorHintsForConcept + performance.hintsUsed : performance.hintsUsed,
        [`time_${performance.conceptId}`]: isReattemptMode ? priorTimeForConcept + performance.timeSpentSec : performance.timeSpentSec,
      };

      const masteryStatus =
        performance.mastery >= 0.75
          ? 'mastered'
          : performance.mastery >= 0.4
            ? 'attempted'
            : 'struggling';

      updatedMasteryMap = {
        ...updatedMasteryMap,
        [performance.conceptId]: masteryStatus,
      };

      const conceptIdsSoFar = filteredConcepts
        .slice(0, activeConceptIdx + 1)
        .map((c) => c.id)
        .filter(Boolean);

      const masteryTrail = conceptIdsSoFar
        .map((id) => {
          if (id === performance.conceptId) return performance.mastery;
          const stored = updatedAttemptsCount[`mastery_${id}`];
          return typeof stored === 'number' ? stored / 100 : null;
        })
        .filter((value): value is number => typeof value === 'number');

      const rollingWindow = masteryTrail.slice(-3);
      const rollingMastery = rollingWindow.length
        ? rollingWindow.reduce((sum, value) => sum + value, 0) / rollingWindow.length
        : performance.mastery;

      const baselinePath = getPathForMastery(rollingMastery);

      const conceptQuestionCount = Math.max(
        1,
        filteredConcepts[activeConceptIdx]?.questions.filter((q) => !q.path || q.path === path).length || 1
      );
      const expectedConceptTime =
        filteredConcepts[activeConceptIdx]?.estimatedTimeSeconds || Math.max(60, conceptQuestionCount * 45);

      const isTelemetryStruggling =
        performance.mastery < 0.4 ||
        performance.accuracy < 0.45 ||
        performance.remediationUsed > 0 ||
        performance.hintsUsed >= Math.max(1, Math.ceil(conceptQuestionCount / 2)) ||
        performance.attempts >= Math.max(3, conceptQuestionCount * 2) ||
        performance.timeSpentSec > Math.round(expectedConceptTime * 1.45);

      const isTelemetryFast =
        performance.mastery >= 0.82 &&
        performance.accuracy >= 0.85 &&
        performance.hintsUsed === 0 &&
        performance.remediationUsed === 0 &&
        performance.attempts <= Math.max(1, conceptQuestionCount) &&
        performance.timeSpentSec <= Math.max(35, Math.round(expectedConceptTime * 0.6));

      if (isTelemetryStruggling) {
        nextPath = 'A';
        nextAdaptiveMode = 'support';
        nextConceptStage = 'content';
        strugglingSignal = true;
      } else if (isTelemetryFast) {
        nextPath = 'C';
        nextAdaptiveMode = 'challenge';
        nextConceptStage = 'questions';
        strugglingSignal = false;
      } else {
        nextPath = baselinePath;
        nextAdaptiveMode = rollingMastery <= 0.45 ? 'support' : rollingMastery >= 0.82 ? 'challenge' : 'standard';
        nextConceptStage = nextAdaptiveMode === 'challenge' ? 'questions' : 'content';
        if (nextAdaptiveMode === 'support') strugglingSignal = true;
        if (nextAdaptiveMode === 'challenge') strugglingSignal = false;
      }

      trackTelemetryEvent('profile_updated', {
        module_id: moduleId,
        event_data: {
          adaptive_mode: nextAdaptiveMode,
          adaptive_path: nextPath,
          concept_id: performance.conceptId,
          mastery: Number(performance.mastery.toFixed(3)),
          accuracy: Number(performance.accuracy.toFixed(3)),
          attempts: performance.attempts,
          hints_used: performance.hintsUsed,
          remediation_used: performance.remediationUsed,
          time_spent_sec: performance.timeSpentSec,
          source: 'concept_telemetry',
        }
      });
    }

    const applyPathToCurrentModule = (includeStage?: { currentConceptIdx: number; currentConceptStage: 'content' | 'examples' | 'questions' }) => {
      if (existingModIdx >= 0) {
        existingProgress[existingModIdx] = {
          ...existingProgress[existingModIdx],
          learningPath: isReviewingCompletedModule
            ? existingProgress[existingModIdx].learningPath
            : nextPath,
          adaptiveMode: nextAdaptiveMode,
          masteryMap: updatedMasteryMap,
          attemptsCount: updatedAttemptsCount,
          ...(includeStage || {}),
        };
      } else {
        existingProgress.push({
          moduleId: moduleId!,
          completed: false,
          score: 0,
          stars: 0,
          learningPath: nextPath,
          adaptiveMode: nextAdaptiveMode,
          masteryMap: updatedMasteryMap,
          attemptsCount: updatedAttemptsCount,
          ...(includeStage || {}),
        });
      }
    };

    const applyPathToNextModule = () => {
      if (isReviewingCompletedModule) return;
      if (!nextModuleId) return;
      const nextIdx = existingProgress.findIndex((p) => p.moduleId === nextModuleId);
      if (nextIdx >= 0) {
        if (existingProgress[nextIdx].completed) return;
        existingProgress[nextIdx] = {
          ...existingProgress[nextIdx],
          learningPath: nextPath,
          adaptiveMode: nextAdaptiveMode,
        };
      }
    };

    if (activeConceptIdx < filteredConcepts.length - 1) {
      // Advance to next concept
      const nextIdx = activeConceptIdx + 1;
      setCurrentConceptIdx(nextIdx);
      setConceptStage(nextConceptStage);
      setConceptEntryStage(nextConceptStage);
      setConceptEntryQuestionMode('first');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      applyPathToCurrentModule({ currentConceptIdx: nextIdx, currentConceptStage: nextConceptStage });
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath, isStruggling: strugglingSignal });
      } else {
        updateSession({ moduleProgress: existingProgress, isStruggling: strugglingSignal });
      }
    } else if (settings.assessmentTime === 'endOfModule' && allQuestions.length > 0) {
      // Show final assessment if in end-of-module mode
      applyPathToCurrentModule();
      applyPathToNextModule();
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath, isStruggling: strugglingSignal });
      } else {
        updateSession({ moduleProgress: existingProgress, isStruggling: strugglingSignal });
      }
      setShowFinalAssessment(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // No more concepts in this module, try to advance to next module or dashboard
      applyPathToCurrentModule();
      applyPathToNextModule();
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath, isStruggling: strugglingSignal });
      } else {
        updateSession({ moduleProgress: existingProgress, isStruggling: strugglingSignal });
      }
      // If there is a next module, navigate to it, else go to dashboard
      if (nextModuleId) {
        navigate(`/module/${nextModuleId}`);
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handlePreviousConcept = () => {
    if (currentConceptIdx <= 0) return;

    const previousIdx = currentConceptIdx - 1;
    const previousConcept = filteredConcepts[previousIdx];
    const hasInModuleQuestions =
      settings.assessmentTime === 'inModule' &&
      !!previousConcept?.questions?.some((q) => !q.path || q.path === path);

    const targetStage: 'content' | 'examples' | 'questions' = hasInModuleQuestions ? 'questions' : 'examples';

    setCurrentConceptIdx(previousIdx);
    setConceptEntryStage(targetStage);
    setConceptEntryQuestionMode(hasInModuleQuestions ? 'last' : 'first');
    setConceptStage(targetStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isFinalCorrect, setIsFinalCorrect] = useState(false);
  const [isRemediationExpanded, setIsRemediationExpanded] = useState(false);
  const [finalAttemptCount, setFinalAttemptCount] = useState(0);
  const [finalHintLevel, setFinalHintLevel] = useState(0);
  const [finalIncorrectFeedback, setFinalIncorrectFeedback] = useState<string | null>(null);
  const [finalIncorrectOption, setFinalIncorrectOption] = useState<string | null>(null);
  const [showFinalRemediation, setShowFinalRemediation] = useState(false);
  const [isFinalExpandableRemedialOpen, setIsFinalExpandableRemedialOpen] = useState(false);
  const finalHintPanelRef = useRef<HTMLDivElement | null>(null);
  const MAX_FINAL_ATTEMPTS = 2;

  const safeFinalAssessmentIdx = Math.min(finalAssessmentIdx, Math.max(allQuestions.length - 1, 0));
  const currentFinalQuestion = allQuestions[safeFinalAssessmentIdx];
  const finalRemediationEntry = currentFinalQuestion ? remedialContentBank[currentFinalQuestion.id] : undefined;
  const finalReferenceTags = currentFinalQuestion ? getReferenceTagsForQuestion(currentFinalQuestion.id) : [];
  const finalQuestionTags = currentFinalQuestion?.questionTags || [];
  const finalTagsToShow = finalReferenceTags.length > 0 ? finalReferenceTags : finalQuestionTags;

  const getFinalHints = (): Array<{ level: 1 | 2; text: string }> => {
    if (!currentFinalQuestion || finalHintLevel <= 0) return [];

    const level1 = currentFinalQuestion.hintLevel1 || currentFinalQuestion.hint;
    const level2 = currentFinalQuestion.hintLevel2 || level1;
    const hints: Array<{ level: 1 | 2; text: string }> = [];

    if (level1) {
      hints.push({ level: 1, text: level1 });
    }
    if (finalHintLevel >= 2 && level2) {
      hints.push({ level: 2, text: level2 });
    }

    return hints;
  };

  const visibleFinalHints = getFinalHints();

  const scrollFinalHintPanelIntoView = () => {
    window.setTimeout(() => {
      const panel = finalHintPanelRef.current;
      if (!panel) return;

      const top = window.scrollY + panel.getBoundingClientRect().top - 100;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 40);
  };

  useEffect(() => {
    if (finalHintLevel <= 0) return;
    scrollFinalHintPanelIntoView();
  }, [finalHintLevel, currentFinalQuestion?.id]);

  const handleFinalHintRequest = () => {
    if (!currentFinalQuestion) return;

    const nextLevel = Math.min(2, finalHintLevel + 1);
    if (nextLevel === finalHintLevel) {
      scrollFinalHintPanelIntoView();
      return;
    }

    setFinalHintLevel(nextLevel);
    updateMetrics({ hintsUsed: (session.chapterMetrics?.hintsUsed || 0) + 1 });
    trackTelemetryEvent('hint_opened', {
      module_id: moduleId,
      question_id: currentFinalQuestion.id,
      event_data: {
        level: nextLevel,
      }
    });
  };

  const handleFinalAnswer = (isCorrect: boolean, selectedValue?: string | number | string[]) => {
    if (!currentFinalQuestion || isFinalCorrect) return;

    const nextAttempts = finalAttemptCount + 1;
    setFinalAttemptCount(nextAttempts);

    if (isCorrect) {
      setIsFinalCorrect(true);
      setFinalIncorrectFeedback(null);
      return;
    }

    const selectedText = Array.isArray(selectedValue)
      ? selectedValue.join(', ')
      : (selectedValue !== undefined && selectedValue !== null ? String(selectedValue) : null);
    setFinalIncorrectOption(selectedText);

    const feedbackMap = currentFinalQuestion.incorrectOptionFeedback || {};
    const feedbackText = selectedText && feedbackMap[selectedText]
      ? feedbackMap[selectedText]
      : 'Not quite. Try one more time carefully.';
    setFinalIncorrectFeedback(feedbackText);

    if (nextAttempts >= MAX_FINAL_ATTEMPTS) {
      setShowFinalRemediation(true);
      setIsFinalCorrect(true);
      updateMetrics({ remedialClicks: (session.chapterMetrics?.remedialClicks || 0) + 1 });
      trackTelemetryEvent('remedial_opened', {
        module_id: moduleId,
        question_id: currentFinalQuestion.id,
        event_data: {
          attempt: nextAttempts,
        }
      });
    }
  };

  const handleFinalQuestionComplete = () => {
    setIsFinalCorrect(false);
    setIsRemediationExpanded(false);
    setIsFinalExpandableRemedialOpen(false);
    setFinalAttemptCount(0);
    setFinalHintLevel(0);
    setFinalIncorrectFeedback(null);
    setFinalIncorrectOption(null);
    setShowFinalRemediation(false);
    if (finalAssessmentIdx < allQuestions.length - 1) {
      setFinalAssessmentIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleModuleComplete();
    }
  };

  useEffect(() => {
    setIsFinalCorrect(false);
    setIsRemediationExpanded(false);
    setIsFinalExpandableRemedialOpen(false);
    setFinalAttemptCount(0);
    setFinalHintLevel(0);
    setFinalIncorrectFeedback(null);
    setFinalIncorrectOption(null);
    setShowFinalRemediation(false);
  }, [currentFinalQuestion?.id]);

  if (showFinalAssessment && !currentFinalQuestion) {
    return (
      <div className={cn('min-h-screen pb-20 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
        <main className="mx-auto mt-12 max-w-3xl px-4">
          <div className={cn('rounded-3xl border p-8 text-center shadow-lg', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white')}>
            <h2 className="text-2xl font-black">Refreshing assessment state...</h2>
            <p className={cn('mt-2 text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
              We could not load the current final question after navigation.
            </p>
            <button
              onClick={() => {
                setShowFinalAssessment(false);
                setFinalAssessmentIdx(0);
              }}
              className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
            >
              Return to concept flow
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!showFinalAssessment && !currentConcept) {
    return (
      <div className={cn('min-h-screen pb-20 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
        <main className="mx-auto mt-12 max-w-3xl px-4">
          <div className={cn('rounded-3xl border p-8 text-center shadow-lg', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white')}>
            <h2 className="text-2xl font-black">Loading concept content...</h2>
            <p className={cn('mt-2 text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
              We are re-aligning your module position after navigation.
            </p>
            <button
              onClick={() => {
                setCurrentConceptIdx(0);
                setConceptStage('content');
                setConceptEntryStage('content');
                setConceptEntryQuestionMode('first');
              }}
              className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
            >
              Reset to first concept
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen pb-20 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
      <header
        className={cn(
          'sticky top-3 z-20 mx-auto mb-6 w-[calc(100%-2.5rem)] max-w-[84rem] rounded-full border px-5 py-3 shadow-sm backdrop-blur-md transition-colors sm:px-7',
          settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-[#d8d2c5] bg-white/85'
        )}
      >
          <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-5">
          <button
            onClick={handleExitClick}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
              settings.darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-[#f3f1eb] text-slate-700 hover:bg-[#ece8de]'
            )}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-xs font-black uppercase tracking-widest text-slate-500">{showFinalAssessment ? 'Module Assessment' : `Module ${module.id}: ${module.title}`}</span>
                {!showFinalAssessment && moduleDurationBadge && (
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-800">
                    {moduleDurationBadge}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-brand">{showFinalAssessment ? `${safeFinalAssessmentIdx + 1} / ${allQuestions.length}` : `${safeConceptIdx + 1} / ${filteredConcepts.length}`}</span>
            </div>
            <RocketProgress progress={progress} />
          </div>

          <div className="flex items-center gap-2">
            {isReviewMode && (
              <button
                onClick={() => setShowReviewSnapshotPopup(true)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition',
                  settings.darkMode ? 'bg-blue-900/70 text-blue-100 hover:bg-blue-900' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                )}
              >
                Review Snapshot
              </button>
            )}

            <button
              onClick={() => setIsSettingsOpen(true)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95',
                settings.darkMode ? 'bg-slate-800 text-slate-300' : 'bg-[#f3f1eb] text-slate-700'
              )}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-5 max-w-[84rem] px-4 sm:px-7">
        {isReattemptMode && (
          <div className={cn('mb-5 rounded-2xl border p-4', settings.darkMode ? 'border-emerald-700 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50/70')}>
            <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-emerald-300' : 'text-emerald-700')}>
              Reattempt Mode
            </p>
            <p className={cn('mt-1 text-sm font-semibold', settings.darkMode ? 'text-slate-200' : 'text-slate-700')}>
              Attempting this module on your current path: {currentPathLabel}.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showFinalAssessment ? (
            <motion.div key={currentConcept.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <ConceptBlock
                moduleId={moduleId!}
                concept={currentConcept}
                path={path}
                onComplete={handleConceptComplete}
                onStageChange={setConceptStage}
                onPreviousPage={safeConceptIdx > 0 ? handlePreviousConcept : undefined}
                entryStage={conceptEntryStage}
                entryQuestionMode={conceptEntryQuestionMode}
              />
            </motion.div>
          ) : (
            <motion.div key="final-assessment" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className={cn('app-float-card rounded-[2rem] p-8', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-[#ddd7ca] bg-white/85')}>
                <h2 className="app-display mb-2 text-3xl font-extrabold text-[var(--text-strong)]">Module Assessment</h2>
                <p className="text-slate-600">Great job reading through the concepts. Test your understanding with this final challenge.</p>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleFinalHintRequest}
                  className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-amber-800 transition hover:bg-amber-100"
                >
                  Hint {finalHintLevel > 0 ? `(${finalHintLevel}/2)` : ''}
                </button>
              </div>

              <GameQuestion
                key={currentFinalQuestion.id}
                questionId={currentFinalQuestion.id}
                moduleId={moduleId}
                questionText={currentFinalQuestion.text}
                options={currentFinalQuestion.options}
                correctAnswer={currentFinalQuestion.correctAnswer}
                format={currentFinalQuestion.format}
                styles={currentFinalQuestion.styles}
                image={currentFinalQuestion.image}
                onAnswer={handleFinalAnswer}
              />

              {finalIncorrectFeedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-black uppercase tracking-wider text-rose-700">What went wrong</p>
                  <p className="mt-1 text-sm font-semibold text-rose-900">{finalIncorrectFeedback}</p>
                  {finalIncorrectOption && <p className="mt-1 text-xs font-semibold text-rose-700">Your choice: {finalIncorrectOption}</p>}
                </motion.div>
              )}

              {visibleFinalHints.length > 0 && (
                <motion.div ref={finalHintPanelRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50/90 p-6">
                  <p className="flex items-center gap-2 font-bold text-amber-800">
                    <span className="text-xl">💡</span> Hints ({Math.min(finalHintLevel, 2)}/2)
                  </p>
                  <div className="mt-3 space-y-3">
                    {visibleFinalHints.map((hintItem) => (
                      <div key={`final-hint-${hintItem.level}`} className="rounded-xl border border-amber-300/70 bg-amber-100/60 p-3">
                        <p className="text-xs font-black uppercase tracking-wider text-amber-700">Hint {hintItem.level}</p>
                        <p className="mt-1 text-amber-800">{hintItem.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showFinalRemediation && (
                <RemediationBlock
                  briefText={currentFinalQuestion.remedialBrief || finalRemediationEntry?.brief || 'Review the concept and continue.'}
                  detailedContent={
                    <div className="space-y-4">
                      {finalTagsToShow.length > 0 && (
                        <div className="rounded-xl border border-amber-300 bg-amber-100/60 p-3">
                          <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-700">Refer Content Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {finalTagsToShow.map((tag) => (
                              <span key={tag} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-amber-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-xs font-semibold text-amber-700">Review the module content sections matching these tags, then retry.</p>
                        </div>
                      )}

                      {currentFinalQuestion.remedialContent ? (
                        <>
                          {currentFinalQuestion.remedialContent?.coreConcept && (
                            <div>
                              <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-600">
                                {currentFinalQuestion.remedialContent?.coreConcept?.title || 'Core Concept'}
                              </p>
                              <ul className="list-disc space-y-1 pl-5">
                                {(currentFinalQuestion.remedialContent?.coreConcept?.points || []).map((point) => (
                                  <li key={point}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {currentFinalQuestion.remedialContent?.stepByStep && (
                            <div>
                              <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-600">
                                {currentFinalQuestion.remedialContent?.stepByStep?.title || 'Step-by-Step'}
                              </p>
                              <ol className="list-decimal space-y-1 pl-5">
                                {(currentFinalQuestion.remedialContent?.stepByStep?.steps || []).map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {currentFinalQuestion.remedialContent?.expandable && (
                            <div className="rounded-xl border border-amber-300 bg-amber-100/60 p-3">
                              <button
                                onClick={() => setIsFinalExpandableRemedialOpen((prev) => !prev)}
                                className="flex w-full items-center justify-between rounded-lg border border-amber-400 bg-white px-3 py-2 text-left text-xs font-black uppercase tracking-wider text-amber-800 hover:bg-amber-50"
                              >
                                <span>{currentFinalQuestion.remedialContent?.expandable?.buttonLabel || 'Show more examples and background'}</span>
                                <span aria-hidden>{isFinalExpandableRemedialOpen ? '−' : '+'}</span>
                              </button>
                              {isFinalExpandableRemedialOpen && (
                                <div className="mt-3 space-y-3">
                                  {(currentFinalQuestion.remedialContent?.expandable?.sections || []).map((section) => (
                                    <div key={section.title}>
                                      <p className="text-xs font-black uppercase tracking-wider text-amber-700">{section.title}</p>
                                      <ul className="mt-1 list-disc space-y-1 pl-5">
                                        {section.points.map((point) => (
                                          <li key={point}>{point}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : finalRemediationEntry ? (
                        finalRemediationEntry.details.map((section) => (
                          <div key={section.heading}>
                            <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-600">{section.heading}</p>
                            <ul className="list-disc space-y-1 pl-5">
                              {section.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p>{currentFinalQuestion.remedialDetail || 'Review and continue.'}</p>
                      )}
                      {visibleFinalHints.length > 0 && (
                        <div className="space-y-1">
                          <p className="font-bold">Hints used:</p>
                          {visibleFinalHints.map((hintItem) => (
                            <p key={`final-used-hint-${hintItem.level}`} className="text-sm">
                              Hint {hintItem.level}: {hintItem.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                  autoExpand={true}
                  isExpanded={isRemediationExpanded}
                  onToggle={() => setIsRemediationExpanded(!isRemediationExpanded)}
                  onExpandedChange={(expanded) => {
                    if (expanded) {
                      updateMetrics({ remedialClicks: (session.chapterMetrics?.remedialClicks || 0) + 1 });
                      trackTelemetryEvent('remedial_expanded', {
                        module_id: moduleId,
                        question_id: currentFinalQuestion.id,
                      });
                    }
                  }}
                />
              )}

              {isFinalCorrect && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleFinalQuestionComplete}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-3.5 text-base font-black text-white shadow-lg transition-all hover:opacity-90"
                >
                  Next Question
                  <span className="text-xl">→</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <AnimatePresence>
        {showReviewSnapshotPopup && isReviewMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setShowReviewSnapshotPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full max-w-3xl rounded-[2rem] border p-6 shadow-2xl',
                settings.darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-[#ddd7ca] bg-white text-slate-900'
              )}
            >
              <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-blue-300' : 'text-blue-700')}>
                Review Snapshot
              </p>
              <p className={cn('mt-1 text-sm font-semibold', settings.darkMode ? 'text-slate-200' : 'text-slate-700')}>
                Showing your saved attempt on {reviewedPathLabel} path.
              </p>
              {moduleConfidenceLabel && (
                <p className={cn('mt-1 text-xs font-black uppercase tracking-wide', settings.darkMode ? 'text-emerald-300' : 'text-emerald-700')}>
                  Saved Confidence: {moduleConfidenceLabel}
                </p>
              )}

              <div className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto pr-1">
                {reviewConceptSummary.map((item, index) => (
                  <div
                    key={item.conceptId}
                    className={cn('rounded-xl border px-3 py-2 text-xs font-semibold', settings.darkMode ? 'border-slate-700 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700')}
                  >
                    <p className="font-black">{item.title}</p>
                    <p className="mt-1">
                      Questions: {item.questionCount} | Attempts: {item.attempts} | Hints: {item.hintsUsed} | Time: {item.timeSpentSec}s | {item.skipped ? 'Skipped' : `Status: ${item.mastery}`}
                    </p>
                    <button
                      type="button"
                      onClick={() => jumpToConceptQuestions(index)}
                      disabled={item.questionCount === 0}
                      className={cn(
                        'mt-2 text-xs font-black underline underline-offset-2',
                        item.questionCount === 0
                          ? 'cursor-not-allowed opacity-50'
                          : (settings.darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-800')
                      )}
                    >
                      Go to Questions
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setShowReviewSnapshotPopup(false);
                    navigate(`/module/${moduleId}?mode=reattempt`);
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white"
                >
                  Reattempt Module (Current Path: {currentPathLabel})
                </button>

                <button
                  onClick={() => setShowReviewSnapshotPopup(false)}
                  className={cn(
                    'rounded-xl px-4 py-2 text-sm font-black',
                    settings.darkMode ? 'border border-slate-600 text-slate-200 hover:bg-slate-800' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                  )}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showExitConfirm && (
          <ExitConfirmationModal
            isOpen={showExitConfirm}
            onConfirmExit={handleConfirmExit}
            onResume={() => setShowExitConfirm(false)}
            currentProgress={{
              completed: currentConceptIdx,
              total: filteredConcepts.length
            }}
          />
        )}

        {showConfidencePrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              className="w-full max-w-md rounded-[2rem] border border-[#ddd7ca] bg-white p-6 shadow-2xl"
            >
              <p className="text-xs font-black uppercase tracking-widest text-blue-700">Confidence Check</p>
              <h3 className="app-display mt-1 text-2xl font-extrabold text-slate-900">How confident are you now?</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Rate your confidence after completing this module.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {([
                  { key: 'low', label: 'Low', active: 'border-rose-400 bg-rose-50 text-rose-700' },
                  { key: 'med', label: 'Med', active: 'border-amber-400 bg-amber-50 text-amber-700' },
                  { key: 'high', label: 'High', active: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
                ] as Array<{ key: ConfidenceRating; label: string; active: string }>).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedConfidence(item.key)}
                    className={cn(
                      'rounded-xl border px-3 py-3 text-sm font-black transition',
                      selectedConfidence === item.key
                        ? item.active
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleConfidenceDecision(undefined)}
                  disabled={isFinalizingCompletion}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Skip
                </button>
                <button
                  onClick={() => handleConfidenceDecision(selectedConfidence || undefined)}
                  disabled={isFinalizingCompletion}
                  className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isFinalizingCompletion ? 'Saving...' : 'Complete Module'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCompletionCelebration && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-md rounded-[2rem] border border-[#ddd7ca] bg-white p-7 text-center shadow-2xl">
              <motion.div
                initial={{ scale: 0.7, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
              >
                <CheckCircle size={34} className="text-emerald-600" />
              </motion.div>

              <h3 className="app-display text-2xl font-extrabold text-slate-900">Module Completed!</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">Awesome work. Your progress has been saved.</p>

              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} className="mt-5 h-2 rounded-full bg-emerald-500" />

              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">Returning to dashboard in {redirectCountdown}s</p>

              <button onClick={() => navigate('/dashboard')} className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                Go now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
