import React from 'react';
import { motion } from 'motion/react';
import { Concept, LearningPath } from '../types';
import { GameQuestion } from './GameQuestion';
import { RemediationBlock } from './RemediationBlock';
import { useConstraintEngine } from '../hooks/useConstraintEngine';
import { useSessionStore } from '../store/sessionStore';
import { remedialContentBank, getReferenceTagsForQuestion } from '../data/remedialContentBank';
import { trackTelemetryEvent } from '../analytics/telemetry';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function buildSegmentedVideoUrl(concept: Concept): string {
  const url = concept.videoUrl;
  const hasYouTubeEmbed = url.includes('youtube.com/embed/');

  if (!hasYouTubeEmbed) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  const params: string[] = ['rel=0', 'modestbranding=1'];

  if (typeof concept.videoStartSeconds === 'number') {
    params.push(`start=${concept.videoStartSeconds}`);
  }

  if (typeof concept.videoEndSeconds === 'number') {
    params.push(`end=${concept.videoEndSeconds}`);
  }

  return `${url}${separator}${params.join('&')}`;
}

function extractYouTubeVideoId(url: string): string | null {
  const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
  return match?.[1] || null;
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
  const [segmentComplete, setSegmentComplete] = React.useState(false);
  const [conceptStage, setConceptStage] = React.useState<'content' | 'examples' | 'questions'>('content');
  const checkpointRef = React.useRef<HTMLDivElement | null>(null);
  const rushingPromptRef = React.useRef<HTMLDivElement | null>(null);
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const ytPlayerRef = React.useRef<any>(null);
  const ytPollRef = React.useRef<number | null>(null);
  const youtubeContainerId = React.useMemo(() => `yt-segment-${concept.id}`, [concept.id]);

  React.useEffect(() => {
    setStartTime(Date.now());
    setContentReviewed(false);
    setShowRushingPrompt(false);
    setSegmentComplete(false);
  }, [concept.id]);

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

  const stopSegmentPoll = React.useCallback(() => {
    if (ytPollRef.current !== null) {
      window.clearInterval(ytPollRef.current);
      ytPollRef.current = null;
    }
  }, []);

  const markSegmentComplete = React.useCallback(() => {
    if (segmentComplete) return;
    setSegmentComplete(true);
    window.setTimeout(() => {
      checkpointRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }, [segmentComplete]);

  const checkRushing = (): boolean => {
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
  const youtubeVideoId = React.useMemo(() => extractYouTubeVideoId(concept.videoUrl), [concept.videoUrl]);

  React.useEffect(() => {
    if (settings.contentMode !== 'video' || hasYouTubeEmbed || !isLocalVideoFile) {
      return;
    }

    const video = localVideoRef.current;
    if (!video) {
      return;
    }

    const startAt = typeof concept.videoStartSeconds === 'number' ? concept.videoStartSeconds : 0;
    const endAt = concept.videoEndSeconds;

    const onLoadedMetadata = () => {
      if (startAt > 0) {
        video.currentTime = startAt;
      }
    };

    const onTimeUpdate = () => {
      if (typeof endAt === 'number' && video.currentTime >= endAt) {
        video.pause();
        markSegmentComplete();
      }
    };

    const onEnded = () => {
      markSegmentComplete();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [
    concept.id,
    concept.videoEndSeconds,
    concept.videoStartSeconds,
    hasYouTubeEmbed,
    isLocalVideoFile,
    markSegmentComplete,
    settings.contentMode,
  ]);

  React.useEffect(() => {
    if (settings.contentMode !== 'video' || !hasYouTubeEmbed || !youtubeVideoId) {
      return;
    }

    const setupPlayer = () => {
      if (!window.YT?.Player) {
        return;
      }

      if (ytPlayerRef.current?.destroy) {
        ytPlayerRef.current.destroy();
      }

      ytPlayerRef.current = new window.YT.Player(youtubeContainerId, {
        videoId: youtubeVideoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          start: concept.videoStartSeconds,
          end: concept.videoEndSeconds,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event: any) => {
            const state = event.data;
            const playerState = window.YT?.PlayerState;

            if (state === playerState?.PLAYING && typeof concept.videoEndSeconds === 'number') {
              stopSegmentPoll();
              ytPollRef.current = window.setInterval(() => {
                const player = ytPlayerRef.current;
                if (!player?.getCurrentTime) return;

                const currentTime = player.getCurrentTime();
                if (currentTime >= concept.videoEndSeconds! - 0.2) {
                  stopSegmentPoll();
                  if (player.stopVideo) {
                    player.stopVideo();
                  }
                  markSegmentComplete();
                }
              }, 500);
              return;
            }

            stopSegmentPoll();

            if (state === playerState?.ENDED) {
              markSegmentComplete();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      setupPlayer();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousReady === 'function') {
          previousReady();
        }
        setupPlayer();
      };
    }

    return () => {
      stopSegmentPoll();
      if (ytPlayerRef.current?.destroy) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, [
    concept.id,
    concept.videoEndSeconds,
    concept.videoStartSeconds,
    hasYouTubeEmbed,
    markSegmentComplete,
    settings.contentMode,
    stopSegmentPoll,
    youtubeContainerId,
    youtubeVideoId,
  ]);

  const showQuestions = showQuestionsInBlock && filteredQuestions.length > 0;
  const showExampleStage = conceptStage === 'examples';
  const showQuestionStage = conceptStage === 'questions';

  const pathMeta = path === 'A'
    ? {
        label: 'Explorer Path Examples',
        tone: 'Guided walkthroughs with concrete checkpoints.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      }
    : path === 'C'
      ? {
          label: 'Pioneer Path Examples',
          tone: 'Challenge-first examples with deeper reasoning.',
          badgeClass: 'bg-violet-100 text-violet-800 border-violet-200',
        }
      : {
          label: 'Adventurer Path Examples',
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

          <h2 className="mb-6 text-3xl font-black text-slate-900">{concept.title}</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-600">{concept.textContent}</p>
          </div>

          {settings.contentMode === 'video' && (
            <div className="mt-8 space-y-4">
              <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden border-2 border-slate-200">
                {hasYouTubeEmbed && youtubeVideoId ? (
                  <div id={youtubeContainerId} className="h-full w-full" />
                ) : isLocalVideoFile ? (
                  <video
                    ref={localVideoRef}
                    controls
                    className="h-full w-full bg-black"
                    src={concept.videoUrl}
                    preload="metadata"
                  />
                ) : (
                  <iframe
                    title={`${concept.title} video segment`}
                    src={segmentedVideoUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}
              </div>

              {concept.videoCheckpointPrompt && (
                <div
                  ref={checkpointRef}
                  className="rounded-2xl border border-blue-200 bg-blue-50 p-4"
                >
                  <p className="text-xs font-black uppercase tracking-wider text-blue-700">In-video checkpoint</p>
                  <p className="mt-1 text-sm font-semibold text-blue-900">{concept.videoCheckpointPrompt}</p>
                  {segmentComplete && (
                    <p className="mt-2 text-xs font-bold text-emerald-700">Segment complete. Answer this before moving ahead.</p>
                  )}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleContinueToExamples}
            className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
          >
            Next: Path-Specific Examples →
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

          {showQuestions ? (
            <button
              onClick={handleStartQuestions}
              className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
            >
              Start Practice Questions
            </button>
          ) : (
            <button
              onClick={handleReadConcept}
              className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
            >
              Complete Concept
            </button>
          )}
        </motion.div>
      )}

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
