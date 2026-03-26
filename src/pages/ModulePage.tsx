import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { chapterData } from '../data/chapterData';
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
import { remedialContentBank, getReferenceTagsForQuestion } from '../data/remedialContentBank';
import { trackTelemetryEvent, updateTrackingModule, flushTrackingEvents } from '../analytics/telemetry';

export default function ModulePage() {
  useMergeIntegration();
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { session, updateSession, updateMetrics } = useSessionStore();
  const moduleProgress = session?.moduleProgress?.find((p) => p.moduleId === moduleId);
  const path = moduleProgress?.learningPath || session?.learningPath || 'B';

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentConceptIdx, setCurrentConceptIdx] = useState(() => moduleProgress?.currentConceptIdx || 0);
  const [showFinalAssessment, setShowFinalAssessment] = useState(() => moduleProgress?.showFinalAssessment || false);
  const [finalAssessmentIdx, setFinalAssessmentIdx] = useState(() => moduleProgress?.finalAssessmentIdx || 0);
  const [conceptStage, setConceptStage] = useState<'content' | 'examples' | 'questions'>('content');
  const [conceptEntryStage, setConceptEntryStage] = useState<'content' | 'examples' | 'questions'>('content');
  const [conceptEntryQuestionMode, setConceptEntryQuestionMode] = useState<'first' | 'last'>('first');
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const lastPersistedModuleStateRef = useRef('');
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

    const prog = session.moduleProgress?.find((p) => p.moduleId === moduleId);
    if (prog) {
      setCurrentConceptIdx(prog.currentConceptIdx || 0);
      setShowFinalAssessment(prog.showFinalAssessment || false);
      setFinalAssessmentIdx(prog.finalAssessmentIdx || 0);
    }
  }, [moduleId, session?.studentId, session?.moduleProgress]);

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
        showFinalAssessment,
        finalAssessmentIdx,
      });
    }

    updateSession({ moduleProgress: newProgress });
  }, [session, moduleId, currentConceptIdx, showFinalAssessment, finalAssessmentIdx, path, updateSession]);

  const module = chapterData.find((m) => m.id === moduleId);

  if (!module || !session) return <div>Module not found</div>;

  const filteredConcepts = module.concepts.filter((c) => !c.path || c.path === path);
  const rawSettings = session.settings || ({} as any);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    assessmentTime: rawSettings.assessmentTime || 'inModule',
  };

  const currentConcept = filteredConcepts[currentConceptIdx];
  const conceptStageWeight = conceptStage === 'content' ? 0.33 : conceptStage === 'examples' ? 0.66 : 1;
  const progress = showFinalAssessment
    ? 100
    : Math.min(((currentConceptIdx + conceptStageWeight) / Math.max(filteredConcepts.length, 1)) * 100, 100);

  const allQuestions = filteredConcepts.flatMap((c) => c.questions.filter((q) => !q.path || q.path === path));

  const handleExitClick = () => {
    setShowExitConfirm(true);
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

  const handleModuleComplete = async () => {
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

    const newProgress = [...(session.moduleProgress || [])];
    const modIdx = newProgress.findIndex((p) => p.moduleId === moduleId);
    if (modIdx >= 0) {
      newProgress[modIdx].completed = true;
      newProgress[modIdx].showFinalAssessment = false;
      newProgress[modIdx].finalAssessmentIdx = 0;
    } else {
      newProgress.push({
        moduleId: moduleId!,
        completed: true,
        score: 100,
        stars: 3,
        learningPath: path,
        masteryMap: {},
        attemptsCount: {},
        showFinalAssessment: false,
        finalAssessmentIdx: 0,
      });
    }

    updateSession({ moduleProgress: newProgress, xp: (session.xp || 0) + 500, sessionStatus: 'completed' });
    trackTelemetryEvent('module_complete', {
      module_id: moduleId,
      event_data: {
        xp_after: (session.xp || 0) + 500,
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
    }
  };

  const handleConceptComplete = () => {
    if (currentConceptIdx < filteredConcepts.length - 1) {
      const nextIdx = currentConceptIdx + 1;
      setCurrentConceptIdx(nextIdx);
      setConceptEntryStage('content');
      setConceptEntryQuestionMode('first');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const newProgress = [...(session.moduleProgress || [])];
      const modIdx = newProgress.findIndex((p) => p.moduleId === moduleId);
      if (modIdx >= 0) {
        newProgress[modIdx] = { ...newProgress[modIdx], currentConceptIdx: nextIdx };
      } else {
        newProgress.push({
          moduleId: moduleId!,
          completed: false,
          score: 0,
          stars: 0,
          learningPath: path,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: nextIdx,
        });
      }
      updateSession({ moduleProgress: newProgress });
    } else if (settings.assessmentTime === 'endOfModule' && allQuestions.length > 0) {
      setShowFinalAssessment(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleModuleComplete();
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
    <div className={cn('min-h-screen pb-20 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <header
        className={cn(
          'sticky top-0 z-10 px-6 py-4 shadow-sm backdrop-blur-md transition-colors',
          settings.darkMode ? 'border-b border-slate-800 bg-slate-900/80' : 'bg-white/80'
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
          <button
            onClick={handleExitClick}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
              settings.darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">{showFinalAssessment ? 'Module Assessment' : `Module ${module.id}: ${module.title}`}</span>
              <span className="text-sm font-bold text-brand">{showFinalAssessment ? `${finalAssessmentIdx + 1} / ${allQuestions.length}` : `${currentConceptIdx + 1} / ${filteredConcepts.length}`}</span>
            </div>
            <RocketProgress progress={progress} />
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95',
              settings.darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
            )}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">

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
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-4 text-3xl font-black text-slate-900">Module Assessment</h2>
                <p className="text-slate-600">Great job reading through the concepts! Now, let&apos;s test your knowledge with a final assessment.</p>
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
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
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
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
        {showExitConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-slate-900">Exit Module?</h3>
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

        {showCompletionCelebration && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-6 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
              <motion.div
                initial={{ scale: 0.7, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
              >
                <CheckCircle size={34} className="text-emerald-600" />
              </motion.div>

              <h3 className="text-2xl font-black text-slate-900">Module Completed!</h3>
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
