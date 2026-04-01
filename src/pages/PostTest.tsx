import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight, Star, CheckCircle2, Clock3, Flag, BarChart3, ListChecks, TrendingUp } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { postTestQuestions } from '../data/Post-Test/questions';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { submitMergePayload } from '../hooks/useMergeIntegration';
import { PostTestAttempt, Question } from '../types';

const TEST_DURATION_SECONDS = 15 * 60;

type ResultsTab = 'analysis' | 'stats' | 'questionwise';

const toEmptySelectedOptions = () => Array.from({ length: postTestQuestions.length }, () => null as string | number | null);
const toEmptyReviewFlags = () => Array.from({ length: postTestQuestions.length }, () => false);

const normalizeSelectedOptions = (value: unknown): (string | number | null)[] => {
  const fallback = toEmptySelectedOptions();
  if (!Array.isArray(value)) return fallback;

  const sanitized = value.map((item) => (typeof item === 'string' || typeof item === 'number' ? item : null));
  while (sanitized.length < postTestQuestions.length) sanitized.push(null);
  return sanitized.slice(0, postTestQuestions.length);
};

const normalizeReviewFlags = (value: unknown): boolean[] => {
  const fallback = toEmptyReviewFlags();
  if (!Array.isArray(value)) return fallback;

  const sanitized = value.map((item) => Boolean(item));
  while (sanitized.length < postTestQuestions.length) sanitized.push(false);
  return sanitized.slice(0, postTestQuestions.length);
};

const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatDateTime = (timestamp?: number) => {
  if (!timestamp || timestamp <= 0) return 'Unknown date';
  return new Date(timestamp).toLocaleString();
};

const isAnswerCorrect = (question: Question, selected: string | number | null) => {
  if (selected === null || selected === undefined) return false;
  if (Array.isArray(question.correctAnswer)) {
    return JSON.stringify(question.correctAnswer) === JSON.stringify(selected);
  }
  return selected === question.correctAnswer;
};

const renderQuestionVisual = (visual: any, darkMode: boolean) => {
  if (!visual || !visual.kind) return null;

  if (visual.kind === 'bar') {
    const max = Math.max(...visual.data.map((d: any) => d.value));
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">Bar Graph</div>
        <div className="flex h-44 items-end justify-between gap-2">
          {visual.data.map((d: any) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="text-[11px] font-bold text-slate-600">{d.value}</div>
              <div
                className={cn('w-full rounded-t-md', darkMode ? 'bg-brand/80' : 'bg-brand')}
                style={{ height: `${Math.max(18, (d.value / max) * 120)}px` }}
              />
              <div className="text-[10px] font-semibold text-slate-600">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'pictograph') {
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Pictograph</div>
        <div className="space-y-2">
          {visual.rows.map((row: any) => (
            <div key={row.label} className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-600">{row.label}</span>
              <span className="text-sm leading-none">{row.symbols}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[11px] font-semibold text-slate-500">{visual.key}</div>
      </div>
    );
  }

  if (visual.kind === 'pie') {
    const value = Math.max(0, Math.min(100, Number(visual.valuePercent) || 0));
    const gradient = `conic-gradient(#0ea5e9 0% ${value}%, #e2e8f0 ${value}% 100%)`;
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Pie Chart</div>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full border-4 border-white shadow" style={{ background: gradient }} />
          <div>
            <p className="text-sm font-black text-slate-800">{visual.highlightLabel}</p>
            <p className="text-xs font-semibold text-slate-500">{value}% of total</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default function PostTest() {
  const { session, updateSession } = useSessionStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedMode = searchParams.get('mode');
  const isReviewMode = requestedMode === 'review';
  const isReattemptMode = requestedMode === 'reattempt';
  const isRestoringRef = useRef(false);
  const lastPersistedRef = useRef('');
  const hasSubmittedRef = useRef(false);
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isProgressInitialized, setIsProgressInitialized] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | number | null)[]>(toEmptySelectedOptions());
  const [reviewFlags, setReviewFlags] = useState<boolean[]>(toEmptyReviewFlags());
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState(TEST_DURATION_SECONDS);
  const [resultsTab, setResultsTab] = useState<ResultsTab>('analysis');
  const [wasAutoSubmitted, setWasAutoSubmitted] = useState(false);
  const [hasDetailedAttemptData, setHasDetailedAttemptData] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.postTestScore !== null && !isReattemptMode) {
      const saved = session.postTestProgress;
      const hasDetailedData = Boolean(saved && Array.isArray(saved.selectedOptions));
      const restoredSelected = normalizeSelectedOptions(saved?.selectedOptions);
      const restoredReviewFlags = normalizeReviewFlags(saved?.reviewFlags);
      const restoredAnswers = Array.isArray(saved?.answers) && saved?.answers.length === postTestQuestions.length
        ? saved.answers
        : restoredSelected.map((selected, idx) => isAnswerCorrect(postTestQuestions[idx], selected));

      setSelectedOptions(restoredSelected);
      setReviewFlags(restoredReviewFlags);
      setAnswers(restoredAnswers);
      setHasDetailedAttemptData(hasDetailedData);
      setStartTime(saved?.startTime || 0);
      if (saved?.startTime) {
        const elapsed = Math.floor((Date.now() - saved.startTime) / 1000);
        setRemainingSeconds(Math.max(0, TEST_DURATION_SECONDS - elapsed));
      } else {
        setRemainingSeconds(TEST_DURATION_SECONDS);
      }
      setWasAutoSubmitted(Boolean(saved?.autoSubmitted));
      setCurrentStep('results');
      setResultsTab('analysis');
      setIsProgressInitialized(true);
      return;
    }

    // Wait for session to be fully hydrated from localStorage
    if (!session.studentId) {
      return;
    }

    const saved = session.postTestProgress;
    if (!saved) {
      if (isReattemptMode) {
        setCurrentStep('intro');
        setCurrentQuestionIdx(0);
        setSelectedOptions(toEmptySelectedOptions());
        setReviewFlags(toEmptyReviewFlags());
        setAnswers([]);
        setHasDetailedAttemptData(false);
        setStartTime(0);
        setRemainingSeconds(TEST_DURATION_SECONDS);
      }
      setIsProgressInitialized(true);
      return;
    }

    if (isReattemptMode) {
      setCurrentStep('intro');
      setCurrentQuestionIdx(0);
      setSelectedOptions(toEmptySelectedOptions());
      setReviewFlags(toEmptyReviewFlags());
      setAnswers([]);
      setHasDetailedAttemptData(false);
      setStartTime(0);
      setRemainingSeconds(TEST_DURATION_SECONDS);
      setIsProgressInitialized(true);
      return;
    }

    isRestoringRef.current = true;
    setCurrentStep(saved.step || 'intro');
    setCurrentQuestionIdx(saved.currentQuestionIdx || 0);
    setSelectedOptions(normalizeSelectedOptions(saved.selectedOptions));
    setReviewFlags(normalizeReviewFlags(saved.reviewFlags));
    setAnswers(saved.answers || []);
    setHasDetailedAttemptData(Boolean(Array.isArray(saved.selectedOptions)));
    setStartTime(saved.startTime || 0);
    if (saved.startTime) {
      const elapsed = Math.floor((Date.now() - saved.startTime) / 1000);
      setRemainingSeconds(Math.max(0, TEST_DURATION_SECONDS - elapsed));
    } else {
      setRemainingSeconds(TEST_DURATION_SECONDS);
    }
    setWasAutoSubmitted(Boolean(saved.autoSubmitted));

    window.setTimeout(() => {
      isRestoringRef.current = false;
      setIsProgressInitialized(true);
    }, 0);
  }, [session, isReattemptMode]);

  useEffect(() => {
    if (!session || isRestoringRef.current || !isProgressInitialized) {
      return;
    }

    if (session.postTestScore !== null && !isReattemptMode) {
      return;
    }

    const payload = {
      step: currentStep,
      currentQuestionIdx,
      answers,
      startTime,
      selectedOptions,
      reviewFlags,
      timeLimitSeconds: TEST_DURATION_SECONDS,
      autoSubmitted: wasAutoSubmitted,
    };

    const serialized = JSON.stringify(payload);
    if (serialized === lastPersistedRef.current) {
      return;
    }
    lastPersistedRef.current = serialized;
    updateSession({ postTestProgress: payload as any });
  }, [
    session,
    currentStep,
    currentQuestionIdx,
    answers,
    startTime,
    selectedOptions,
    reviewFlags,
    isProgressInitialized,
    isReattemptMode,
    wasAutoSubmitted,
    updateSession,
  ]);

  useEffect(() => {
    if (!session) {
      return;
    }

    if (currentStep !== 'questions' || !startTime) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, TEST_DURATION_SECONDS - elapsed);
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        window.clearInterval(intervalId);
        submitTest(true);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, [session, currentStep, startTime, selectedOptions, reviewFlags]);

  if (!session) return null;

  const handleStart = () => {
    hasSubmittedRef.current = false;
    if (session.postTestScore !== null && !isReattemptMode) {
      // Clear completed state so hydration effect does not force results view again.
      updateSession({
        postTestScore: null,
        completed: false,
        journeyComplete: false,
        postTestProgress: null,
      });
    }
    if ((isReattemptMode || isReviewMode) && session.postTestProgress) {
      updateSession({ postTestProgress: null });
    }
    setCurrentStep('questions');
    setStartTime(Date.now());
    setCurrentQuestionIdx(0);
    setSelectedOptions(toEmptySelectedOptions());
    setReviewFlags(toEmptyReviewFlags());
    setAnswers([]);
    setHasDetailedAttemptData(true);
    setRemainingSeconds(TEST_DURATION_SECONDS);
    setWasAutoSubmitted(false);
  };

  const selectOption = (questionIdx: number, option: string | number) => {
    setSelectedOptions((prev) => {
      const next = [...prev];
      next[questionIdx] = option;
      return next;
    });
  };

  const toggleReviewFlag = (questionIdx: number) => {
    setReviewFlags((prev) => {
      const next = [...prev];
      next[questionIdx] = !next[questionIdx];
      return next;
    });
  };

  const scrollToQuestion = (questionIdx: number) => {
    setCurrentQuestionIdx(questionIdx);
    questionRefs.current[questionIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submitTest = (autoSubmitted = false) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const finalAnswers = postTestQuestions.map((question, idx) => isAnswerCorrect(question, selectedOptions[idx]));
    const correctCountNow = finalAnswers.filter(Boolean).length;
    const score = (finalAnswers.filter(a => a).length / postTestQuestions.length) * 100;
    const completedAt = Date.now();
    const answeredCountNow = selectedOptions.filter((option) => option !== null).length;
    const reviewMarkedCountNow = reviewFlags.filter(Boolean).length;
    const durationSeconds = startTime > 0 ? Math.max(0, Math.floor((completedAt - startTime) / 1000)) : null;

    const nextAttempt: PostTestAttempt = {
      id: `post_attempt_${completedAt}`,
      score,
      correctCount: correctCountNow,
      totalQuestions: postTestQuestions.length,
      answeredCount: answeredCountNow,
      reviewMarkedCount: reviewMarkedCountNow,
      startedAt: startTime || undefined,
      submittedAt: completedAt,
      durationSeconds,
      autoSubmitted,
    };

    const updatedAttempts = [...(session.postTestAttempts || []), nextAttempt].slice(-20);

    setAnswers(finalAnswers);
    setWasAutoSubmitted(autoSubmitted);
    setHasDetailedAttemptData(true);

    updateSession({
      postTestScore: score,
      postTestAttempts: updatedAttempts,
      completed: true,
      journeyComplete: true,
      postTestProgress: {
        step: 'results',
        currentQuestionIdx,
        answers: finalAnswers,
        startTime,
        selectedOptions,
        reviewFlags,
        submittedAt: completedAt,
        completedAt,
        timeLimitSeconds: TEST_DURATION_SECONDS,
        autoSubmitted,
      } as any,
    });

    if (session) {
      submitMergePayload(session, 'completed', { chapterId: 'grade8_data_handling' });
    }

    setCurrentStep('results');
    setResultsTab('analysis');
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0ea5e9', '#22c55e', '#f59e0b']
    });
  };

  const handleSubmitTest = () => {
    const unanswered = selectedOptions.filter((option) => option === null).length;
    if (unanswered > 0) {
      const proceed = window.confirm(`You still have ${unanswered} unanswered question(s). Submit anyway?`);
      if (!proceed) return;
    }
    submitTest(false);
  };

  const handleExitTest = () => {
    const confirmExit = window.confirm('Exit test now? Your progress will be saved so you can continue later.');
    if (!confirmExit) return;
    navigate('/dashboard');
  };

  const computedScore = (answers.filter(a => a).length / postTestQuestions.length) * 100;
  const score = session.postTestScore !== null && currentStep === 'results' && !isReattemptMode
    ? session.postTestScore
    : computedScore;
  const attemptsHistory = [...(session.postTestAttempts || [])].sort((a, b) => b.submittedAt - a.submittedAt);
  const fallbackAttempt: PostTestAttempt | null =
    attemptsHistory.length === 0 && session.postTestScore !== null && currentStep === 'results'
      ? {
          id: 'legacy_attempt',
          score: session.postTestScore,
          correctCount: Math.round((session.postTestScore / 100) * postTestQuestions.length),
          totalQuestions: postTestQuestions.length,
          answeredCount: postTestQuestions.length,
          reviewMarkedCount: 0,
          submittedAt: 0,
          durationSeconds: null,
          autoSubmitted: false,
        }
      : null;
  const attemptsToDisplay = fallbackAttempt ? [fallbackAttempt] : attemptsHistory;
  const latestAttempt = attemptsToDisplay[0];
  const correctCount = session.postTestScore !== null && currentStep === 'results' && !isReattemptMode
    ? Math.round((session.postTestScore / 100) * postTestQuestions.length)
    : answers.filter(a => a).length;
  const learningGain = Math.round(score - (session?.preTestScore || 0));
  const rawAnsweredCount = selectedOptions.filter((opt) => opt !== null).length;
  const answeredCount = !hasDetailedAttemptData && currentStep === 'results' && session.postTestScore !== null
    ? (latestAttempt?.answeredCount ?? postTestQuestions.length)
    : rawAnsweredCount;
  const rawReviewMarkedCount = reviewFlags.filter(Boolean).length;
  const reviewMarkedCount = !hasDetailedAttemptData && currentStep === 'results' && session.postTestScore !== null
    ? (latestAttempt?.reviewMarkedCount ?? 0)
    : rawReviewMarkedCount;
  const incorrectCount = postTestQuestions.length - correctCount;
  const completedAt = (session.postTestProgress as any)?.completedAt;
  const elapsedSeconds = startTime
    ? Math.min(
        TEST_DURATION_SECONDS,
        Math.max(
          0,
          Math.floor((((currentStep === 'results' && completedAt) ? completedAt : Date.now()) - startTime) / 1000)
        )
      )
    : (latestAttempt?.durationSeconds ?? null);
  const elapsedLabel = elapsedSeconds === null ? 'N/A' : formatTimer(elapsedSeconds);
  const accuracy = postTestQuestions.length > 0 ? Math.round((correctCount / postTestQuestions.length) * 100) : 0;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      session.settings.darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8 flex justify-center">
                <div className="rounded-full bg-brand/10 p-6 text-brand">
                  <Trophy size={64} />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-black">Final Mission: Post-Test</h1>
              <p className="mb-12 text-xl text-slate-500">
                {session.postTestScore !== null && !isReattemptMode
                  ? 'You have already completed this mission. Review your latest result or reattempt anytime.'
                  : "You've completed all the modules! Now it's time to show what you've learned."}
                {session.postTestScore === null || isReattemptMode
                  ? ' This test covers everything from data organisation to probability.'
                  : ''}
              </p>
              <div className="grid gap-6 md:grid-cols-3 mb-12">
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <CheckCircle2 className="mx-auto mb-2 text-green-500" />
                  <p className="font-bold text-slate-800">15 Questions</p>
                  <p className="text-xs text-slate-400">Comprehensive coverage</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <Clock3 className="mx-auto mb-2 text-blue-500" />
                  <p className="font-bold text-slate-800">15 Minute Timer</p>
                  <p className="text-xs text-slate-400">Auto-submit on timeout</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <Star className="mx-auto mb-2 text-amber-500" />
                  <p className="font-bold text-slate-800">Review + Navigation Grid</p>
                  <p className="text-xs text-slate-400">Jump and mark for review</p>
                </div>
              </div>
              <button
                onClick={handleStart}
                className="group flex items-center gap-3 rounded-2xl bg-brand px-12 py-5 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-brand/20 active:scale-95"
              >
                {session.postTestScore !== null && !isReattemptMode ? 'Reattempt Post-Test' : 'Start Final Mission'}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}

          {currentStep === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-brand">Final Mission In Progress</p>
                    <p className="text-sm font-semibold text-slate-600">Answer all questions. Correct/incorrect appears only after submit.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black',
                      remainingSeconds <= 60 ? 'border-red-300 bg-red-50 text-red-700' : 'border-blue-200 bg-blue-50 text-blue-700'
                    )}>
                      <Clock3 size={16} />
                      Time Left: {formatTimer(remainingSeconds)}
                    </div>
                    <button
                      type="button"
                      onClick={handleExitTest}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Exit Test
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitTest}
                      className="rounded-full bg-brand px-4 py-2 text-sm font-black text-white transition hover:opacity-90"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-4">
                  {postTestQuestions.map((question, idx) => {
                    const selected = selectedOptions[idx];
                    const isFocused = idx === currentQuestionIdx;
                    const questionVisual = (question as any).visual;
                    const questionWithComprehension = question as Question & {
                      comprehensionId?: string;
                      comprehensionTitle?: string;
                      comprehensionText?: string;
                    };
                    const previousQuestionWithComprehension = idx > 0
                      ? (postTestQuestions[idx - 1] as Question & { comprehensionId?: string })
                      : null;
                    const showComprehension = Boolean(
                      questionWithComprehension.comprehensionId
                      && (
                        idx === 0
                        || previousQuestionWithComprehension?.comprehensionId !== questionWithComprehension.comprehensionId
                      )
                    );

                    return (
                      <section
                        key={question.id}
                        ref={(node) => { questionRefs.current[idx] = node; }}
                        className={cn(
                          'rounded-3xl border bg-white p-5 shadow-sm transition',
                          isFocused ? 'border-brand ring-2 ring-brand/20' : 'border-slate-200'
                        )}
                      >
                        {showComprehension && (
                          <div className="mb-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-700">
                              {questionWithComprehension.comprehensionTitle || 'Comprehension'}
                            </p>
                            {questionWithComprehension.comprehensionText && (
                              <p className="mt-2 text-sm font-semibold leading-relaxed text-indigo-900">
                                {questionWithComprehension.comprehensionText}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs font-black uppercase tracking-widest text-brand">Question {idx + 1}</p>
                          <button
                            type="button"
                            onClick={() => toggleReviewFlag(idx)}
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-black transition',
                              reviewFlags[idx]
                                ? 'border-amber-300 bg-amber-50 text-amber-700'
                                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                            )}
                          >
                            <Flag size={12} />
                            {reviewFlags[idx] ? 'Marked for Review' : 'Mark for Review'}
                          </button>
                        </div>

                        <p className="mb-4 text-base font-bold leading-relaxed text-slate-800">{question.text}</p>

                        {questionVisual && (
                          <div className="mb-4">
                            {renderQuestionVisual(questionVisual, Boolean(session.settings.darkMode))}
                          </div>
                        )}

                        {!questionVisual && question.image && (
                          <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                            <img
                              src={question.image}
                              alt="Question reference"
                              className="h-auto w-full rounded-xl object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div className="grid gap-2">
                          {(question.options || []).map((option) => {
                            const isSelected = selected === option;
                            return (
                              <button
                                key={`${question.id}-${String(option)}`}
                                type="button"
                                onClick={() => selectOption(idx, option)}
                                className={cn(
                                  'rounded-2xl border px-4 py-3 text-left text-sm font-bold transition',
                                  isSelected
                                    ? 'border-brand bg-brand/10 text-brand'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                )}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>

                <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Question Navigator</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {postTestQuestions.map((_, idx) => {
                      const isAnswered = selectedOptions[idx] !== null;
                      const isMarked = reviewFlags[idx];
                      const isCurrent = idx === currentQuestionIdx;

                      return (
                        <div key={`nav-${idx}`} className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => scrollToQuestion(idx)}
                            className={cn(
                              'h-10 flex-1 rounded-xl border text-sm font-black transition',
                              isCurrent
                                ? 'border-brand bg-brand text-white'
                                : isMarked
                                  ? 'border-amber-300 bg-amber-50 text-amber-700'
                                  : isAnswered
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                            )}
                          >
                            {idx + 1}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleReviewFlag(idx)}
                            className={cn(
                              'h-10 w-10 rounded-xl border text-xs font-black transition',
                              reviewFlags[idx]
                                ? 'border-amber-300 bg-amber-50 text-amber-700'
                                : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'
                            )}
                            aria-label={`Toggle review for question ${idx + 1}`}
                          >
                            R
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600">
                    <p>Answered: {answeredCount}/{postTestQuestions.length}</p>
                    <p>Marked for Review: {reviewMarkedCount}</p>
                    <p>Time Left: {formatTimer(remainingSeconds)}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      onClick={handleSubmitTest}
                      className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-black text-white transition hover:opacity-90"
                    >
                      Submit Test
                    </button>
                    <button
                      type="button"
                      onClick={handleExitTest}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Exit Test
                    </button>
                  </div>
                </aside>
              </div>
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand">Post-Test Complete</p>
                    <h1 className="mt-1 text-3xl font-black text-slate-900">Analysis Dashboard</h1>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {wasAutoSubmitted
                        ? 'Time expired, so your test was auto-submitted.'
                        : 'Submission complete. Review your analysis, stats, and question-wise performance.'}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-white">
                    <Trophy size={18} />
                    <span className="text-lg font-black">{Math.round(score)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setResultsTab('analysis')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition',
                    resultsTab === 'analysis'
                      ? 'border-brand bg-brand text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <TrendingUp size={14} />
                  Analysis
                </button>
                <button
                  type="button"
                  onClick={() => setResultsTab('stats')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition',
                    resultsTab === 'stats'
                      ? 'border-brand bg-brand text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <BarChart3 size={14} />
                  Stats
                </button>
                <button
                  type="button"
                  onClick={() => setResultsTab('questionwise')}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition',
                    resultsTab === 'questionwise'
                      ? 'border-brand bg-brand text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <ListChecks size={14} />
                  Question-Wise
                </button>
              </div>

              {resultsTab === 'analysis' && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Pre-Test</p>
                    <p className="mt-2 text-3xl font-black text-slate-700">{Math.round(session.preTestScore || 0)}%</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Post-Test</p>
                    <p className="mt-2 text-3xl font-black text-brand">{Math.round(score)}%</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Learning Gain</p>
                    <p className={cn('mt-2 text-3xl font-black', learningGain > 0 ? 'text-green-600' : 'text-slate-500')}>
                      +{Math.max(0, Math.round(learningGain))}%
                    </p>
                  </div>

                  <div className="md:col-span-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">
                      You got {correctCount} out of {postTestQuestions.length} correct. Accuracy is {accuracy}%.
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Focus on the question-wise view to revisit mistakes and marked-for-review items.
                    </p>
                    {!hasDetailedAttemptData && (
                      <p className="mt-2 text-xs font-semibold text-amber-700">
                        Detailed question-level history is unavailable for this older attempt. Reattempt once to unlock full granular analysis.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {resultsTab === 'stats' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Answered</p>
                      <p className="mt-1 text-2xl font-black text-slate-800">{answeredCount}/{postTestQuestions.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Correct</p>
                      <p className="mt-1 text-2xl font-black text-green-600">{correctCount}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Incorrect</p>
                      <p className="mt-1 text-2xl font-black text-red-600">{incorrectCount}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Marked for Review</p>
                      <p className="mt-1 text-2xl font-black text-amber-600">{reviewMarkedCount}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Time Taken</p>
                      <p className="mt-1 text-2xl font-black text-blue-700">{elapsedLabel}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Accuracy</p>
                      <p className="mt-1 text-2xl font-black text-slate-800">{accuracy}%</p>
                    </div>
                  </div>
                </div>
              )}

              {resultsTab === 'questionwise' && (
                <div className="space-y-3">
                  {!hasDetailedAttemptData ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
                      Question-wise answer detail is unavailable for this older attempt because it was completed before detailed tracking was introduced.
                      Reattempt once to see full per-question response history.
                    </div>
                  ) : (
                    postTestQuestions.map((question, idx) => {
                      const selected = selectedOptions[idx];
                      const isCorrect = answers[idx];
                      const statusLabel = selected === null ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect';

                      return (
                        <div key={`result-${question.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-black text-slate-800">Q{idx + 1}. {question.text}</p>
                            <div className="flex items-center gap-2">
                              {reviewFlags[idx] && (
                                <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-amber-700">
                                  Marked Review
                                </span>
                              )}
                              <span className={cn(
                                'rounded-full px-2 py-1 text-[11px] font-black uppercase tracking-wide',
                                statusLabel === 'Correct'
                                  ? 'bg-green-50 text-green-700'
                                  : statusLabel === 'Incorrect'
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-slate-100 text-slate-600'
                              )}>
                                {statusLabel}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700">
                            Your Answer: <span className="font-bold">{selected === null ? 'Not answered' : String(selected)}</span>
                          </p>
                          <p className="mt-1 text-sm text-slate-700">
                            Correct Answer: <span className="font-bold text-brand">{Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : String(question.correctAnswer)}</span>
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Attempt History</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {attemptsToDisplay.length > 0 ? `${attemptsToDisplay.length} total` : 'No attempts'}
                  </p>
                </div>

                {attemptsToDisplay.length === 0 ? (
                  <p className="mt-3 text-sm font-semibold text-slate-600">No attempt history available yet.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {attemptsToDisplay.map((attempt, idx) => (
                      <div key={attempt.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-black text-slate-800">
                            Attempt {Math.max(1, attemptsToDisplay.length - idx)}
                          </p>
                          <div className="flex items-center gap-2">
                            {idx === 0 && (
                              <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-blue-700">
                                Latest
                              </span>
                            )}
                            {attempt.autoSubmitted && (
                              <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-amber-700">
                                Auto Submitted
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 grid gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                          <p>Score: {Math.round(attempt.score)}%</p>
                          <p>Correct: {attempt.correctCount}/{attempt.totalQuestions}</p>
                          <p>Answered: {attempt.answeredCount}/{attempt.totalQuestions}</p>
                          <p>Time: {attempt.durationSeconds == null ? 'N/A' : formatTimer(attempt.durationSeconds)}</p>
                        </div>
                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                          Submitted: {formatDateTime(attempt.submittedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate('/post-test?mode=reattempt')}
                  className="rounded-2xl border border-emerald-300 bg-emerald-50 px-8 py-4 text-base font-black text-emerald-800 shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Reattempt Post-Test
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-2xl bg-brand px-8 py-4 text-base font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
