import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Concept, LearningPath } from '../types';
import { GameQuestion } from './GameQuestion';
import { RemediationBlock } from './RemediationBlock';
import { useConstraintEngine } from '../hooks/useConstraintEngine';
import { useSessionStore } from '../store/sessionStore';
import { remedialContentBank, getReferenceTagsForQuestion } from '../data/Standard/remedialContentBank';
import { trackTelemetryEvent } from '../analytics/telemetry';
import { AdaptiveContent } from './LearnerTypeComponents';

function buildSegmentedVideoUrl(concept: Concept): string {
  const url = concept.videoUrl;
  const hasYouTubeEmbed = url.includes('youtube.com/embed/');

  if (!hasYouTubeEmbed) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  const params: string[] = ['rel=0', 'modestbranding=1'];

  return `${url}${separator}${params.join('&')}`;
}

interface ConceptBlockProps {
  moduleId: string;
  concept: Concept;
  path: LearningPath;
  onComplete: () => void;
  onStageChange?: (stage: 'content' | 'examples' | 'questions') => void;
  onPreviousPage?: () => void;
  entryStage?: 'content' | 'examples' | 'questions';
  entryQuestionMode?: 'first' | 'last';
}

export const ConceptBlock: React.FC<ConceptBlockProps> = ({
  moduleId,
  concept,
  path,
  onComplete,
  onStageChange,
  onPreviousPage,
  entryStage = 'content',
  entryQuestionMode = 'first',
}) => {
  const { session, updateMetrics } = useSessionStore();
  const rawSettings = session?.settings || ({} as any);
  const settings = {
    ...rawSettings,
    contentMode: rawSettings.contentMode || 'video',
    assessmentTime: rawSettings.assessmentTime || 'inModule',
  };
  const learnerStyle = session?.learnerProfile?.preferredStyle || 'mixed';
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [isRemediationExpanded, setIsRemediationExpanded] = React.useState(false);
  
  const [isCorrectAnswered, setIsCorrectAnswered] = React.useState(false);
  const trackedHintQuestionRef = React.useRef<string | null>(null);
  const trackedRemediationQuestionRef = React.useRef<string | null>(null);
  
  const filteredQuestions = concept.questions.filter(q => !q.path || q.path === path);

  const showQuestionsInBlock = settings.assessmentTime === 'inModule';

  const [startTime, setStartTime] = React.useState(Date.now());
  const [showRushingPrompt, setShowRushingPrompt] = React.useState(false);
  const [contentReviewed, setContentReviewed] = React.useState(false);
  const [showSecondaryContent, setShowSecondaryContent] = React.useState(false);
  const [practiceCountdowns, setPracticeCountdowns] = React.useState<Record<number, number>>({});
  const [practiceStarted, setPracticeStarted] = React.useState<Record<number, boolean>>({});
  const [practiceAnswerVisible, setPracticeAnswerVisible] = React.useState<Record<number, boolean>>({});
  const [practiceCompleted, setPracticeCompleted] = React.useState<Record<number, boolean>>({});
  const [practiceSkipped, setPracticeSkipped] = React.useState<Record<number, boolean>>({});
  const [showSkipAllConfirm, setShowSkipAllConfirm] = React.useState(false);
  const [conceptStage, setConceptStage] = React.useState<'content' | 'examples' | 'questions'>('content');
  const checkpointRef = React.useRef<HTMLDivElement | null>(null);
  const rushingPromptRef = React.useRef<HTMLDivElement | null>(null);
  const lessonContentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setStartTime(Date.now());
    setContentReviewed(false);
    setShowRushingPrompt(false);
    setShowSecondaryContent(false);
    setPracticeCountdowns({});
    setPracticeStarted({});
    setPracticeAnswerVisible({});
    setPracticeCompleted({});
    setPracticeSkipped({});
    setShowSkipAllConfirm(false);
  }, [concept.id, settings.contentMode]);

  React.useEffect(() => {
    const hasRunningTimer = Object.values(practiceCountdowns as Record<number, number>).some((value) => value > 0);
    if (!hasRunningTimer) {
      return;
    }

    const timerId = window.setInterval(() => {
      setPracticeCountdowns((prev) => {
        const next: Record<number, number> = { ...prev };
        Object.keys(next).forEach((key) => {
          const idx = Number(key);
          if (next[idx] > 0) {
            next[idx] -= 1;
          }
        });
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [practiceCountdowns]);

  React.useEffect(() => {
    setConceptStage(entryStage);
    setIsCorrectAnswered(false);
    setIsRemediationExpanded(false);

    if (entryStage === 'questions' && filteredQuestions.length > 0 && entryQuestionMode === 'last') {
      setCurrentQuestionIdx(filteredQuestions.length - 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  }, [concept.id, entryStage, entryQuestionMode, filteredQuestions.length]);

  React.useEffect(() => {
    onStageChange?.(conceptStage);
  }, [conceptStage, onStageChange]);

  React.useEffect(() => {
    trackTelemetryEvent('stage_change', {
      module_id: moduleId,
      event_data: {
        concept_id: concept.id,
        stage: conceptStage,
      }
    });
  }, [concept.id, conceptStage, moduleId]);

  React.useEffect(() => {
    if (!showRushingPrompt) return;

    const id = window.setTimeout(() => {
      const el = rushingPromptRef.current;
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top - 90;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 50);

    return () => window.clearTimeout(id);
  }, [showRushingPrompt]);

  const checkRushing = (): boolean => {
    if (settings.contentMode === 'video') return false;
    if (contentReviewed) return false;
    const actualTime = Date.now() - startTime;
    const expectedTime = Math.max(10000, (concept.textContent.length / 100) * 10000);
    const timeRatio = actualTime / expectedTime;
    
    if (timeRatio < 0.3) {
      setShowRushingPrompt(true);
      return true;
    }
    setContentReviewed(true);
    return false;
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (checkRushing()) return;
    const result = onAnswer(isCorrect);
    if (result) {
      setIsCorrectAnswered(true);
    }
  };

  const handleNext = () => {
    setIsCorrectAnswered(false);
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      question_id: currentQuestion?.id,
      event_data: {
        action: 'next_question',
      }
    });
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleReadConcept = () => {
    if (checkRushing()) return;
    onComplete();
  };

  const handleContinueToExamples = () => {
    if (checkRushing()) return;
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'content_to_examples',
        concept_id: concept.id,
      }
    });
    setConceptStage('examples');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuestions = () => {
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'examples_to_questions',
        concept_id: concept.id,
        guided_practice_total: concept.guidedPracticeItems?.length || 0,
        guided_practice_completed: guidedPracticeCompletedCount,
        guided_practice_skipped: guidedPracticeSkippedCount,
      }
    });
    setConceptStage('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If no questions or questions are at end of module, and we are in-module, just show content
  React.useEffect(() => {
    if ((filteredQuestions.length === 0 || !showQuestionsInBlock)) {
       // We need a way to signal completion of the CONTENT part
       // But handleConceptComplete in ModulePage currently handles both
    }
  }, [filteredQuestions.length, showQuestionsInBlock]);

  const currentQuestion = filteredQuestions[currentQuestionIdx];
  const { attempts, showHint, showRemediation, onAnswer } = useConstraintEngine(currentQuestion?.id || '', moduleId);
    React.useEffect(() => {
      if (!currentQuestion?.id || !showHint) return;
      if (trackedHintQuestionRef.current === currentQuestion.id) return;
      trackedHintQuestionRef.current = currentQuestion.id;

      trackTelemetryEvent('hint_opened', {
        module_id: moduleId,
        question_id: currentQuestion.id,
        event_data: {
          attempts,
        }
      });
    }, [attempts, currentQuestion?.id, moduleId, showHint]);

    React.useEffect(() => {
      if (!currentQuestion?.id || !showRemediation) return;
      if (trackedRemediationQuestionRef.current === currentQuestion.id) return;
      trackedRemediationQuestionRef.current = currentQuestion.id;

      updateMetrics({ remedialClicks: (session?.chapterMetrics?.remedialClicks || 0) + 1 });
      trackTelemetryEvent('remedial_opened', {
        module_id: moduleId,
        question_id: currentQuestion.id,
        event_data: {
          attempts,
        }
      });
    }, [attempts, currentQuestion?.id, moduleId, session?.chapterMetrics?.remedialClicks, showRemediation, updateMetrics]);

  const remediationEntry = currentQuestion ? remedialContentBank[currentQuestion.id] : undefined;
  const referenceTags = currentQuestion ? getReferenceTagsForQuestion(currentQuestion.id) : [];
  const segmentedVideoUrl = buildSegmentedVideoUrl(concept);
  const hasYouTubeEmbed = concept.videoUrl.includes('youtube.com/embed/');
  const isLocalVideoFile = /\.mp4($|\?)/i.test(concept.videoUrl) || concept.videoUrl.startsWith('/');

  const showQuestions = showQuestionsInBlock && filteredQuestions.length > 0;
  const showExampleStage = conceptStage === 'examples';
  const showQuestionStage = conceptStage === 'questions';

  const pathMeta = path === 'A'
    ? {
        label: 'Foundational Path Examples',
        tone: 'Guided walkthroughs with concrete checkpoints.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      }
    : path === 'C'
      ? {
          label: 'Advanced Path Examples',
          tone: 'Challenge-first examples with deeper reasoning.',
          badgeClass: 'bg-violet-100 text-violet-800 border-violet-200',
        }
      : {
          label: 'Standard Path Examples',
          tone: 'Balanced examples for understanding and application.',
          badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
        };

  const pathSpecificExamples = concept.workedExamples.map((ex, i) => {
    if (path === 'A') {
      return {
        title: `Guided ${i + 1}: ${ex.explanation.replace(/^Example\s*\d+:\s*/i, '')}`,
        steps: [
          ...ex.steps.map((step, idx) => `Step ${idx + 1}: ${step}`),
          'Checkpoint: Say the rule in your own words before moving ahead.',
        ],
      };
    }

    if (path === 'C') {
      return {
        title: `Challenge ${i + 1}: ${ex.explanation.replace(/^Example\s*\d+:\s*/i, '')}`,
        steps: [
          ...ex.steps.map((step, idx) => `Reasoning ${idx + 1}: ${step}`),
          'Extension: Change one value and predict how the final result changes.',
        ],
      };
    }

    return {
      title: `Applied ${i + 1}: ${ex.explanation.replace(/^Example\s*\d+:\s*/i, '')}`,
      steps: [
        ...ex.steps,
        'Use-it-now: Where would you apply this in school or daily life?',
      ],
    };
  });

  const renderedLessonHtml = React.useMemo(() => {
    // Strip inline event handlers from authored HTML content before rendering.
    return concept.textContent.replace(/\son\w+="[^"]*"/g, '');
  }, [concept.textContent]);

  React.useEffect(() => {
    const container = lessonContentRef.current;
    if (!container) return;

    const handleLessonContentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const button = target.closest('.show-ans-btn') as HTMLButtonElement | null;
      if (!button || !container.contains(button)) return;

      const practiceBox = button.closest('.practice-box');
      const answerInPractice = practiceBox?.querySelector('.practice-ans') as HTMLElement | null;
      const nextSibling = button.nextElementSibling as HTMLElement | null;
      const adjacentAnswer = nextSibling?.classList.contains('practice-ans') ? nextSibling : null;
      const answer = answerInPractice ?? adjacentAnswer;
      if (!answer) return;

      event.preventDefault();
      const isVisible = answer.classList.toggle('is-visible');
      button.textContent = isVisible ? 'Hide Answer' : 'Show Answer';
    };

    container.addEventListener('click', handleLessonContentClick);
    return () => {
      container.removeEventListener('click', handleLessonContentClick);
    };
  }, [renderedLessonHtml]);

  const primaryContentMode = settings.contentMode === 'video' ? 'video' : 'text';
  const secondaryContentMode = primaryContentMode === 'video' ? 'text' : 'video';

  const renderLessonText = () => (
    <motion.div
      key={`${concept.id}-text`}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="lesson-content-shell"
    >
      {(() => {
        const lessonNode = (
          <div
            ref={lessonContentRef}
            className="lesson-rich-content"
            dangerouslySetInnerHTML={{ __html: renderedLessonHtml }}
          />
        );

        return (
      <AdaptiveContent
        learnerStyle={learnerStyle}
        visual={lessonNode}
        auditory={learnerStyle === 'auditory' ? lessonNode : undefined}
        readWrite={learnerStyle === 'readWrite' ? lessonNode : undefined}
        kinesthetic={learnerStyle === 'kinesthetic' ? lessonNode : undefined}
      />
        );
      })()}
    </motion.div>
  );

  const renderLessonVideo = () => (
    <motion.div
      key={`${concept.id}-video`}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="mx-auto mt-1 max-w-6xl space-y-4"
    >
      <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden border-2 border-slate-200 shadow-md">
        {hasYouTubeEmbed ? (
          <iframe
            title={`${concept.title} video`}
            src={segmentedVideoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : isLocalVideoFile ? (
          <video
            controls
            className="h-full w-full bg-black"
            src={concept.videoUrl}
            preload="metadata"
          />
        ) : (
          <iframe
            title={`${concept.title} video`}
            src={concept.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>

      {concept.videoCheckpointPrompt && (
        <motion.div
          ref={checkpointRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="rounded-2xl border border-blue-200 bg-blue-50 p-4"
        >
          <p className="text-xs font-black uppercase tracking-wider text-blue-700">Think & reflect</p>
          <p className="mt-1 text-sm font-semibold text-blue-900">{concept.videoCheckpointPrompt}</p>
        </motion.div>
      )}
    </motion.div>
  );

  const startGuidedPractice = (idx: number) => {
    setPracticeStarted((prev) => ({ ...prev, [idx]: true }));
    setPracticeCountdowns((prev) => ({ ...prev, [idx]: 10 }));
    setPracticeAnswerVisible((prev) => ({ ...prev, [idx]: false }));
    setPracticeSkipped((prev) => ({ ...prev, [idx]: false }));
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'guided_practice_started',
        concept_id: concept.id,
        question_index: idx + 1,
      },
    });
  };

  const showGuidedAnswer = (idx: number) => {
    if ((practiceCountdowns[idx] || 0) > 0) return;
    if (!practiceAnswerVisible[idx]) {
      setPracticeCompleted((prev) => ({ ...prev, [idx]: true }));
      setPracticeSkipped((prev) => ({ ...prev, [idx]: false }));
      trackTelemetryEvent('navigation', {
        module_id: moduleId,
        event_data: {
          action: 'guided_practice_answer_revealed',
          concept_id: concept.id,
          question_index: idx + 1,
        },
      });
    }
    setPracticeAnswerVisible((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const openSkipAllGuidedPracticePrompt = () => {
    if (!hasGuidedPractice || guidedPracticeResolvedCount >= guidedPracticeTotal) return;
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'guided_practice_skip_all_prompted',
        concept_id: concept.id,
      },
    });
    setShowSkipAllConfirm(true);
  };

  const cancelSkipAllGuidedPractice = () => {
    setShowSkipAllConfirm(false);
    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'guided_practice_skip_all_cancelled',
        concept_id: concept.id,
      },
    });
  };

  const confirmSkipAllGuidedPractice = () => {
    const skippedMap: Record<number, boolean> = {};
    for (let idx = 0; idx < guidedPracticeTotal; idx += 1) {
      skippedMap[idx] = true;
    }

    setPracticeSkipped(skippedMap);
    setPracticeCompleted({});
    setPracticeAnswerVisible({});
    setPracticeStarted({});
    setPracticeCountdowns({});
    setShowSkipAllConfirm(false);

    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'guided_practice_skipped_all',
        concept_id: concept.id,
        guided_practice_total: guidedPracticeTotal,
      },
    });

    if (showQuestions) {
      trackTelemetryEvent('navigation', {
        module_id: moduleId,
        event_data: {
          action: 'guided_practice_skip_all_auto_advance',
          concept_id: concept.id,
          target_stage: 'questions',
        },
      });
      setConceptStage('questions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    trackTelemetryEvent('navigation', {
      module_id: moduleId,
      event_data: {
        action: 'guided_practice_skip_all_auto_advance',
        concept_id: concept.id,
        target_stage: 'complete_concept',
      },
    });
    onComplete();
  };

  const hasGuidedPractice = !!concept.guidedPracticeItems?.length;
  const guidedPracticeTotal = concept.guidedPracticeItems?.length || 0;
  const guidedPracticeCompletedCount = React.useMemo(
    () => Object.values(practiceCompleted).filter(Boolean).length,
    [practiceCompleted]
  );
  const guidedPracticeSkippedCount = React.useMemo(
    () => Object.values(practiceSkipped).filter(Boolean).length,
    [practiceSkipped]
  );
  const guidedPracticeResolvedCount = guidedPracticeCompletedCount + guidedPracticeSkippedCount;
  const isGuidedPracticeComplete = !hasGuidedPractice || guidedPracticeResolvedCount >= guidedPracticeTotal;

  return (
    <div className="space-y-8">
      {conceptStage === 'content' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >
          {onPreviousPage && (
            <button
              onClick={onPreviousPage}
              className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              <span aria-hidden>←</span>
              Previous Page
            </button>
          )}
          <h2 className="mb-4 text-3xl font-black text-slate-900">{concept.title}</h2>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 170, damping: 22 }}
            className="space-y-4"
          >
            <div className="learning-flow-card rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Learning Flow</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {primaryContentMode === 'video' ? 'Video first is enabled in Settings.' : 'Text first is enabled in Settings.'}
              </p>
            </div>

            {primaryContentMode === 'video' ? renderLessonVideo() : renderLessonText()}

            <motion.div layout className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-slate-800">
                {secondaryContentMode === 'video' ? 'Would you like to see video as well?' : 'Would you like to see text as well?'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowSecondaryContent((prev) => !prev)}
                  className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-bold text-brand transition-all hover:bg-brand/20"
                >
                  {showSecondaryContent ? (secondaryContentMode === 'video' ? 'Hide Video' : 'Hide Text') : (secondaryContentMode === 'video' ? 'Show Video' : 'Show Text')}
                </button>
                <span className="self-center text-xs font-semibold text-slate-500">This follows your live Settings preference automatically.</span>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {showSecondaryContent && (
                <motion.div
                  key={`${concept.id}-secondary-${secondaryContentMode}`}
                  initial={{ opacity: 0, y: 14, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  {secondaryContentMode === 'video' ? renderLessonVideo() : renderLessonText()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <button
            onClick={handleContinueToExamples}
            className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
          >
            Next: Guided Practice →
          </button>
        </motion.div>
      )}

      {showExampleStage && !showRushingPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <button
              onClick={() => setConceptStage('content')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              <span aria-hidden>←</span>
              Previous Page
            </button>
            <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${pathMeta.badgeClass}`}>
              {pathMeta.label}
            </span>
          </div>

          <p className="mb-5 text-sm font-semibold text-slate-600">{pathMeta.tone}</p>

          <div className="space-y-4">
            {pathSpecificExamples.map((ex, i) => (
              <div key={i} className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="mb-2 font-black text-blue-900">{ex.title}</p>
                <ul className="list-inside list-disc space-y-1 text-blue-800">
                  {ex.steps.map((step, si) => (
                    <li key={si}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {concept.guidedPracticeItems && concept.guidedPracticeItems.length > 0 && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-black text-emerald-900">
                {concept.guidedPracticeTitle || 'Guided Practice'}
              </h3>
              <div className="mt-3 rounded-xl border border-emerald-200 bg-white/80 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Required</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-900">
                      Complete all guided practice items to continue.
                    </p>
                    <p className="mt-1 text-xs font-bold text-emerald-700">
                      Progress: {guidedPracticeResolvedCount}/{guidedPracticeTotal}
                    </p>
                  </div>
                  <button
                    onClick={openSkipAllGuidedPracticePrompt}
                    disabled={isGuidedPracticeComplete}
                    className="rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 text-xs font-black uppercase tracking-wider text-amber-800 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Skip all guided practice
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {concept.guidedPracticeItems.map((item, idx) => {
                  const countdown = practiceCountdowns[idx] || 0;
                  const started = !!practiceStarted[idx];
                  const canShowAnswer = started && countdown === 0;
                  const completed = !!practiceCompleted[idx];
                  const skipped = !!practiceSkipped[idx];

                  return (
                    <div key={`${concept.id}-practice-${idx}`} className="rounded-xl border border-emerald-300 bg-white p-4">
                      <p className="text-sm font-bold text-emerald-900">Q{idx + 1}. {item.question}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => startGuidedPractice(idx)}
                          className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                        >
                          Start Question {idx + 1}
                        </button>
                        <span className="text-xs font-semibold text-emerald-700">
                          {started ? (countdown > 0 ? `Answer unlocks in ${countdown}s` : 'Answer unlocked') : 'Start to begin 10s timer'}
                        </span>
                        {completed && (
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-800">
                            Completed
                          </span>
                        )}
                          {skipped && (
                            <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-black uppercase tracking-wider text-amber-800">
                              Skipped
                            </span>
                          )}
                      </div>
                      <button
                        onClick={() => showGuidedAnswer(idx)}
                        disabled={!canShowAnswer}
                        className="mt-3 rounded-lg border border-emerald-400 px-3 py-2 text-xs font-bold text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {practiceAnswerVisible[idx] ? 'Hide Answer' : 'Show Answer'}
                      </button>
                      {practiceAnswerVisible[idx] && (
                        <p className="mt-3 text-sm text-emerald-900">{item.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showQuestions ? (
            <button
              onClick={handleStartQuestions}
              disabled={!isGuidedPracticeComplete}
              className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isGuidedPracticeComplete ? 'Start Practice Questions' : `Resolve Guided Practice (${guidedPracticeResolvedCount}/${guidedPracticeTotal})`}
            </button>
          ) : (
            <button
              onClick={handleReadConcept}
              disabled={!isGuidedPracticeComplete}
              className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGuidedPracticeComplete ? 'Complete Concept' : `Complete Guided Practice (${guidedPracticeResolvedCount}/${guidedPracticeTotal})`}
            </button>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {showSkipAllConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <h4 className="text-lg font-black text-slate-900">Skip all guided practice?</h4>
              <p className="mt-2 text-sm font-medium text-slate-600">
                You are about to skip all {guidedPracticeTotal} guided practice item{guidedPracticeTotal === 1 ? '' : 's'} for this topic.
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                You can still continue, and this action will be recorded in analytics.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={cancelSkipAllGuidedPractice}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSkipAllGuidedPractice}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-amber-600"
                >
                  Yes, skip all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showRushingPrompt && (
        <motion.div
          ref={rushingPromptRef}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="rounded-3xl bg-amber-50 p-8 shadow-xl border-2 border-amber-200"
        >
           <h3 className="text-2xl font-black text-amber-900 mb-4">Hold on! 🛑</h3>
           <p className="text-amber-800 text-lg mb-6">
             It looks like you went through that very quickly. Please take a moment to review the concept and worked examples carefully before continuing.
           </p>
           <button
             onClick={() => {
                setShowRushingPrompt(false);
                setContentReviewed(true);
             }}
             className="w-full rounded-2xl bg-amber-600 py-4 text-white font-bold text-lg hover:bg-amber-700"
           >
             I have reviewed this rule
           </button>
        </motion.div>
      )}

      {showQuestions && showQuestionStage && !showRushingPrompt && (
        <div className="space-y-4">
          <button
            onClick={() => setConceptStage('examples')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <span aria-hidden>←</span>
            Back to Examples
          </button>

          <GameQuestion
            key={currentQuestion.id}
            questionId={currentQuestion.id}
            moduleId={moduleId}
            questionText={currentQuestion.text}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            format={currentQuestion.format}
            styles={currentQuestion.styles}
            image={currentQuestion.image}
            onAnswer={handleAnswer}
          />

          {isCorrectAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
            >
              Next
              <span className="text-xl">→</span>
            </motion.button>
          )}

          {showHint && !showRemediation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-amber-50 p-6 border border-amber-200"
            >
              <p className="font-bold text-amber-800 flex items-center gap-2">
                <span className="text-xl">💡</span> Hint
              </p>
              <p className="mt-2 text-amber-700">{currentQuestion.hint}</p>
            </motion.div>
          )}

          {showRemediation && (
            <RemediationBlock
              briefText={remediationEntry?.brief || currentQuestion.remedialBrief}
              detailedContent={
                <div className="space-y-4">
                  {referenceTags.length > 0 && (
                    <div className="rounded-xl border border-amber-300 bg-amber-100/60 p-3">
                      <p className="mb-2 text-xs font-black uppercase tracking-wider text-amber-700">Refer Content Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {referenceTags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-amber-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-xs font-semibold text-amber-700">Review the module content sections matching these tags, then retry.</p>
                    </div>
                  )}

                  {remediationEntry ? (
                    remediationEntry.details.map((section) => (
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
                    <p>{currentQuestion.remedialDetail}</p>
                  )}
                  <p className="font-bold">Hint: {currentQuestion.hint}</p>
                </div>
              }
              autoExpand={false}
              isExpanded={isRemediationExpanded}
              onToggle={() => setIsRemediationExpanded(!isRemediationExpanded)}
              onExpandedChange={(expanded) => {
                if (!expanded) return;
                updateMetrics({ remedialClicks: (session?.chapterMetrics?.remedialClicks || 0) + 1 });
                trackTelemetryEvent('remedial_expanded', {
                  module_id: moduleId,
                  question_id: currentQuestion.id,
                });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
