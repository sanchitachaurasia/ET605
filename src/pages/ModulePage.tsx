import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getChapterDataForPath } from '../data/Standard/pathData';
import { ConceptBlock } from '../components/ConceptBlock';
import { GameQuestion } from '../components/GameQuestion';
import { RemediationBlock } from '../components/RemediationBlock';
import { RocketProgress } from '../components/RocketProgress';
import { useSessionStore } from '../store/sessionStore';
import { useConstraintEngine } from '../hooks/useConstraintEngine';
import { ChevronLeft, CheckCircle, Settings } from 'lucide-react';
import { SettingsModal } from '../components/SettingsModal';
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
  const path = isReattemptMode
    ? (session?.learningPath || 'B')
    : (isReviewMode ? reviewedPath : moduleProgress?.learningPath) || session?.learningPath || 'B';

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentConceptIdx, setCurrentConceptIdx] = useState(() => (isReattemptMode ? 0 : moduleProgress?.currentConceptIdx || 0));
  const [showFinalAssessment, setShowFinalAssessment] = useState(() => (isReattemptMode ? false : moduleProgress?.showFinalAssessment || false));
  const [finalAssessmentIdx, setFinalAssessmentIdx] = useState(() => (isReattemptMode ? 0 : moduleProgress?.finalAssessmentIdx || 0));
  const [conceptStage, setConceptStage] = useState<'content' | 'examples' | 'questions'>(() => (isReattemptMode ? 'content' : moduleProgress?.currentConceptStage || 'content'));
  const [conceptEntryStage, setConceptEntryStage] = useState<'content' | 'examples' | 'questions'>(() => (isReattemptMode ? 'content' : moduleProgress?.currentConceptStage || 'content'));
  const [conceptEntryQuestionMode, setConceptEntryQuestionMode] = useState<'first' | 'last'>('first');
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
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
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showCompletionCelebration, navigate]);

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

    setCurrentConceptIdx(0);
    setShowFinalAssessment(false);
    setFinalAssessmentIdx(0);
    setConceptStage('content');
    setConceptEntryStage('content');
    setConceptEntryQuestionMode('first');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isReattemptMode, moduleId]);

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

  const moduleCatalog = getChapterDataForPath(path);
  const module = moduleCatalog.find((m) => m.id === moduleId);

  if (!module || !session) return <div>Module not found</div>;

  const filteredConcepts = module.concepts.filter((c) => !c.path || c.path === path);
  const rawSettings = session.settings || ({} as any);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    assessmentTime: rawSettings.assessmentTime || 'inModule',
  };

  const currentConcept = filteredConcepts[currentConceptIdx];
  const moduleDurationBadge = extractDurationBadgeText(currentConcept?.textContent);
  const conceptStageWeight = conceptStage === 'content' ? 0.33 : conceptStage === 'examples' ? 0.66 : 1;
  const progress = showFinalAssessment
    ? 100
    : Math.min(((currentConceptIdx + conceptStageWeight) / Math.max(filteredConcepts.length, 1)) * 100, 100);

  const allQuestions = filteredConcepts.flatMap((c) => c.questions.filter((q) => !q.path || q.path === path));
  const reviewConceptSummary = isReviewMode
    ? filteredConcepts.map((concept) => {
        const attempts = moduleProgress?.attemptsCount?.[concept.id] || 0;
        const hintsUsed = moduleProgress?.attemptsCount?.[`hints_${concept.id}`] || 0;
        const timeSpentSec = moduleProgress?.attemptsCount?.[`time_${concept.id}`] || 0;
        const questionCount = concept.questions.filter((q) => !q.path || q.path === path).length;
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

  const handleConfirmExit = async () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      trackTelemetryEvent('session_end', {
        module_id: moduleId,
        event_data: {
          status: 'exited_midway',
          trigger: 'exit_button',
        }
      });
      await flushTrackingEvents();
      await submitMergePayload(session, 'exited_midway', { isSync: false });
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
    const existingProgress = [...(session.moduleProgress || [])];
    const existingModIdx = existingProgress.findIndex((p) => p.moduleId === moduleId);
    const existingModule = existingModIdx >= 0 ? existingProgress[existingModIdx] : null;
    const isReviewingCompletedModule = !!existingModule?.completed && !isReattemptMode;
    const shouldUpdateGlobalPath = !isReviewingCompletedModule;
    const currentModuleIndex = moduleCatalog.findIndex((m) => m.id === moduleId);
    const nextModuleId = currentModuleIndex >= 0 ? moduleCatalog[currentModuleIndex + 1]?.id : undefined;

    let nextPath = path;
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
        .slice(0, currentConceptIdx + 1)
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

      nextPath = getPathForMastery(rollingMastery);
    }

    const applyPathToCurrentModule = (includeStage?: { currentConceptIdx: number; currentConceptStage: 'content' | 'examples' | 'questions' }) => {
      if (existingModIdx >= 0) {
        existingProgress[existingModIdx] = {
          ...existingProgress[existingModIdx],
          learningPath: isReviewingCompletedModule
            ? existingProgress[existingModIdx].learningPath
            : nextPath,
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
        };
      }
    };

    if (currentConceptIdx < filteredConcepts.length - 1) {
      const nextIdx = currentConceptIdx + 1;
      setCurrentConceptIdx(nextIdx);
      setConceptStage('content');
      setConceptEntryStage('content');
      setConceptEntryQuestionMode('first');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      applyPathToCurrentModule({ currentConceptIdx: nextIdx, currentConceptStage: 'content' });
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath });
      } else {
        updateSession({ moduleProgress: existingProgress });
      }
    } else if (settings.assessmentTime === 'endOfModule' && allQuestions.length > 0) {
      applyPathToCurrentModule();
      applyPathToNextModule();
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath });
      } else {
        updateSession({ moduleProgress: existingProgress });
      }
      setShowFinalAssessment(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      applyPathToCurrentModule();
      applyPathToNextModule();
      if (shouldUpdateGlobalPath) {
        updateSession({ moduleProgress: existingProgress, learningPath: nextPath });
      } else {
        updateSession({ moduleProgress: existingProgress });
      }
      handleModuleComplete(existingProgress, nextPath);
    }
  };

  const handlePreviousConcept = () => {
    if (currentConceptIdx <= 0) return;
    setCurrentConceptIdx((prev) => prev - 1);
    setConceptEntryStage('questions');
    setConceptEntryQuestionMode('last');
    setConceptStage('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isFinalCorrect, setIsFinalCorrect] = useState(false);
  const [isRemediationExpanded, setIsRemediationExpanded] = useState(false);
  const hintTrackedForQuestionRef = useRef<string | null>(null);
  const remediationTrackedForQuestionRef = useRef<string | null>(null);

  const currentFinalQuestion = allQuestions[finalAssessmentIdx];
  const { showHint, showRemediation, onAnswer: onFinalAnswer } = useConstraintEngine(currentFinalQuestion?.id || 'final', moduleId);
  const finalRemediationEntry = currentFinalQuestion ? remedialContentBank[currentFinalQuestion.id] : undefined;
  const finalReferenceTags = currentFinalQuestion ? getReferenceTagsForQuestion(currentFinalQuestion.id) : [];

  const handleFinalQuestionComplete = () => {
    setIsFinalCorrect(false);
    setIsRemediationExpanded(false);
    if (finalAssessmentIdx < allQuestions.length - 1) {
      setFinalAssessmentIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleModuleComplete();
    }
  };

  useEffect(() => {
    if (!moduleId || !currentFinalQuestion?.id) return;
    if (!showHint) return;
    if (hintTrackedForQuestionRef.current === currentFinalQuestion.id) return;

    hintTrackedForQuestionRef.current = currentFinalQuestion.id;
    trackTelemetryEvent('hint_opened', {
      module_id: moduleId,
      question_id: currentFinalQuestion.id,
    });
  }, [showHint, moduleId, currentFinalQuestion?.id]);

  useEffect(() => {
    if (!moduleId || !currentFinalQuestion?.id) return;
    if (!showRemediation) return;
    if (remediationTrackedForQuestionRef.current === currentFinalQuestion.id) return;

    remediationTrackedForQuestionRef.current = currentFinalQuestion.id;
    updateMetrics({ remedialClicks: (session.chapterMetrics?.remedialClicks || 0) + 1 });
    trackTelemetryEvent('remedial_opened', {
      module_id: moduleId,
      question_id: currentFinalQuestion.id,
    });
  }, [showRemediation, moduleId, currentFinalQuestion?.id, session?.chapterMetrics?.remedialClicks, updateMetrics]);

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
              <span className="text-sm font-bold text-brand">{showFinalAssessment ? `${finalAssessmentIdx + 1} / ${allQuestions.length}` : `${currentConceptIdx + 1} / ${filteredConcepts.length}`}</span>
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
                onPreviousPage={currentConceptIdx > 0 ? handlePreviousConcept : undefined}
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

              <GameQuestion
                key={allQuestions[finalAssessmentIdx].id}
                questionId={allQuestions[finalAssessmentIdx].id}
                moduleId={moduleId}
                questionText={allQuestions[finalAssessmentIdx].text}
                options={allQuestions[finalAssessmentIdx].options}
                correctAnswer={allQuestions[finalAssessmentIdx].correctAnswer}
                format={allQuestions[finalAssessmentIdx].format}
                styles={allQuestions[finalAssessmentIdx].styles}
                image={allQuestions[finalAssessmentIdx].image}
                onAnswer={(isCorrect) => {
                  const result = onFinalAnswer(isCorrect);
                  if (result) {
                    setIsFinalCorrect(true);
                  }
                }}
              />

              {showHint && !showRemediation && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50/90 p-6">
                  <p className="flex items-center gap-2 font-bold text-amber-800">
                    <span className="text-xl">💡</span> Hint
                  </p>
                  <p className="mt-2 text-amber-700">{allQuestions[finalAssessmentIdx].hint}</p>
                </motion.div>
              )}

              {showRemediation && (
                <RemediationBlock
                  briefText={finalRemediationEntry?.brief || allQuestions[finalAssessmentIdx].remedialBrief}
                  detailedContent={
                    <div className="space-y-4">
                      {finalReferenceTags.length > 0 && (
                        <div className="rounded-xl border border-amber-300 bg-amber-100/60 p-3">
                          <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-700">Refer Content Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {finalReferenceTags.map((tag) => (
                              <span key={tag} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-amber-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-xs font-semibold text-amber-700">Review the module content sections matching these tags, then retry.</p>
                        </div>
                      )}

                      {finalRemediationEntry ? (
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
                        <p>{allQuestions[finalAssessmentIdx].remedialDetail}</p>
                      )}
                      <p className="font-bold">Hint: {allQuestions[finalAssessmentIdx].hint}</p>
                    </div>
                  }
                  autoExpand={false}
                  isExpanded={isRemediationExpanded}
                  onToggle={() => setIsRemediationExpanded(!isRemediationExpanded)}
                  onExpandedChange={(expanded) => {
                    if (expanded) {
                      updateMetrics({ remedialClicks: (session.chapterMetrics?.remedialClicks || 0) + 1 });
                      trackTelemetryEvent('remedial_expanded', {
                        module_id: moduleId,
                        question_id: allQuestions[finalAssessmentIdx].id,
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              className="w-full max-w-md rounded-[2rem] border border-[#ddd7ca] bg-white p-6 shadow-2xl"
            >
              <h3 className="app-display text-2xl font-extrabold text-slate-900">Exit Module?</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">Are you sure you want to exit? Your session progress will be recorded.</p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  disabled={isExiting}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmExit}
                  disabled={isExiting}
                  className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isExiting ? 'Saving...' : 'Exit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
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
