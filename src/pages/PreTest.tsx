import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, ChevronRight } from 'lucide-react';
import { GameQuestion } from '../components/GameQuestion';
import { LearningStyleQuiz } from '../components/LearningStyleQuiz';
import { preTestQuestions } from '../data/chapterData';
import { useSessionStore } from '../store/sessionStore';
import { trackEvent } from '../analytics/tracker';
import { logout } from '../lib/firebaseAuth';
import { GameFormat, LearningStyle, PreTestProgress } from '../types';
import { cn } from '../lib/utils';
import { useResponsive } from '../components/ResponsiveLayout';

export default function PreTest() {
  const isRestoringRef = useRef(false);
  const lastPersistedRef = useRef('');
  const [isProgressInitialized, setIsProgressInitialized] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [preferredQuestionIds, setPreferredQuestionIds] = useState<string[]>([]);
  const [showLearningStyleQuiz, setShowLearningStyleQuiz] = useState(false);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('mixed');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [prefContentMode, setPrefContentMode] = useState<'text' | 'video'>('video');
  const [prefAssessmentTime, setPrefAssessmentTime] = useState<'inModule' | 'endOfModule'>('inModule');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isMobile } = useResponsive();
  
  const { session, updateSession, clearSession } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.preTestDone) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  useEffect(() => {
    if (!session) {
      console.log('[PreTest] Session not yet loaded from storage');
      return;
    }
    
    if (session.preTestDone) {
      console.log('[PreTest] PreTest already done');
      return;
    }

    // Only try to restore if session has been properly initialized from storage
    // (indicated by having a studentId and preTestProgress field exists)
    if (!session.studentId) {
      console.log('[PreTest] Session not yet fully hydrated, waiting...');
      return;
    }

    const saved = session.preTestProgress;
    console.log('[PreTest] Restore effect - session hydrated, saved progress:', saved);
    
    if (!saved) {
      console.log('[PreTest] No saved progress, initializing fresh');
      setIsProgressInitialized(true);
      return;
    }

    console.log('[PreTest] Attempting to restore from saved state at index:', saved.currentIdx);
    isRestoringRef.current = true;

    setCurrentIdx(saved.currentIdx ?? 0);
    setScore(saved.score ?? 0);
    setCorrectAnswers(saved.correctAnswers ?? {});
    setPreferredQuestionIds(saved.preferredQuestionIds ?? []);
    setLearningStyle(saved.learningStyle ?? 'mixed');
    setRecommendation(saved.recommendation ?? '');
    setPrefContentMode(saved.prefContentMode ?? 'video');
    setPrefAssessmentTime(saved.prefAssessmentTime ?? 'inModule');
    setShowLearningStyleQuiz(saved.stage === 'learningStyle');
    setShowRecommendation(saved.stage === 'personalization');

    if (saved.pendingResults) {
      (window as any)._tempPreTestResults = saved.pendingResults;
    }

    window.setTimeout(() => {
      isRestoringRef.current = false;
      setIsProgressInitialized(true);
      console.log('[PreTest] Restore complete, initialization flag set');
    }, 0);
  }, [session]);

  useEffect(() => {
    if (!session || session.preTestDone || isRestoringRef.current || !isProgressInitialized) {
      return;
    }

    const stage: PreTestProgress['stage'] = showRecommendation
      ? 'personalization'
      : showLearningStyleQuiz
        ? 'learningStyle'
        : 'questions';

    const payload: PreTestProgress = {
      stage,
      currentIdx,
      score,
      correctAnswers,
      preferredQuestionIds,
      learningStyle,
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
    console.log('[PreTest] Persisting state at index:', currentIdx, 'stage:', stage);
    updateSession({ preTestProgress: payload });
  }, [
    session,
    isProgressInitialized,
    currentIdx,
    score,
    correctAnswers,
    preferredQuestionIds,
    learningStyle,
    recommendation,
    prefContentMode,
    prefAssessmentTime,
    showLearningStyleQuiz,
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
        phase: 'pre-test'
      }
    });
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

  const handleLearningStyleComplete = (style: LearningStyle, profile: any) => {
    setLearningStyle(style);
    setShowLearningStyleQuiz(false);
    
    // Calculate Final Results after learning style is determined
    const finalScore = Math.round((score / preTestQuestions.length) * 100);
    const avgFeedback = 3;
    
    // Per-Module Path Logic
    const getPath = (correctCount: number, total: number): 'A' | 'B' | 'C' => {
      const ratio = correctCount / total;
      if (ratio < 0.4) return 'A';
      if (ratio < 0.75) return 'B';
      return 'C';
    };

    const m21Correct = [0, 1, 3, 4].filter(i => correctAnswers[preTestQuestions[i].id]).length;
    const m22Correct = [0, 6].filter(i => correctAnswers[preTestQuestions[i].id]).length;
    const m23Correct = [5].filter(i => correctAnswers[preTestQuestions[i].id]).length;
    const m24Correct = [2].filter(i => correctAnswers[preTestQuestions[i].id]).length;

    const path21 = getPath(m21Correct, 4);
    const path22 = getPath(m22Correct, 2);
    const path23 = m23Correct === 1 ? 'C' : 'A';
    const path24 = m24Correct === 1 ? 'C' : 'A';
    const path25 = 'B'; // Real-world applications - intermediate
    const path26 = 'B'; // Data ethics - intermediate

    // Initial Personalization Logic (can be overridden by preferences)
    let assessmentStyle: 'gamified' | 'traditional' | 'balanced' = 'balanced';
    let contentMode: 'text' | 'video' = 'video';
    let assessmentTime: 'inModule' | 'endOfModule' = 'inModule';
    let rec = `${assessmentStyle.charAt(0).toUpperCase() + assessmentStyle.slice(1)} Learner (${finalScore}% Mastery)`;

    if (style === 'kinesthetic') {
      assessmentStyle = 'gamified';
      contentMode = 'video';
      rec = '✨ Gamified & Interactive (Hands-on Learner)';
    } else if (style === 'readWrite') {
      assessmentStyle = 'traditional';
      contentMode = 'text';
      rec = '📖 Traditional & Focused (Reading-first Learner)';
    }

    if (finalScore >= 80) {
      assessmentTime = 'endOfModule';
    } else {
      assessmentTime = 'inModule';
    }
    
    setRecommendation(rec);
    setPrefContentMode(contentMode);
    setPrefAssessmentTime(assessmentTime);
    setShowRecommendation(true);
    
    // Store results for finish handler
    const tempResults = {
      preTestScore: finalScore, 
      learningPath: path21, 
      preTestFeedback: avgFeedback,
      recommendedStyle: rec,
      learnerProfile: {
        preferredStyle: style,
        secondaryStyle: profile.secondaryStyle,
        contentPreference: 'mixed',
        feedbackStyle: 'immediate',
        pacePref: 'medium',
        distractionLevel: 'moderate'
      },
      moduleProgress: [
        { moduleId: '2.1', completed: false, score: 0, stars: 0, learningPath: path21, masteryMap: {}, attemptsCount: {} },
        { moduleId: '2.2', completed: false, score: 0, stars: 0, learningPath: path22, masteryMap: {}, attemptsCount: {} },
        { moduleId: '2.3', completed: false, score: 0, stars: 0, learningPath: path23, masteryMap: {}, attemptsCount: {} },
        { moduleId: '2.4', completed: false, score: 0, stars: 0, learningPath: path24, masteryMap: {}, attemptsCount: {} },
        { moduleId: '2.5', completed: false, score: 0, stars: 0, learningPath: path25, masteryMap: {}, attemptsCount: {} },
        { moduleId: '2.6', completed: false, score: 0, stars: 0, learningPath: path26, masteryMap: {}, attemptsCount: {} }
      ],
      style: assessmentStyle
    };
    (window as any)._tempPreTestResults = tempResults;
  };

  const handleFinish = () => {
    const results = (window as any)._tempPreTestResults;
    if (!results) return;

    if (preferredQuestionIds.length === 0) {
      return;
    }

    const selectedFormats = preTestPreferenceOptions
      .filter((option) => preferredQuestionIds.includes(option.id))
      .map((option) => option.format);

    const enabledMechanics = selectedFormats.length > 0
      ? selectedFormats
      : Object.values(GameFormat);

    updateSession({ 
      preTestScore: results.preTestScore, 
      learningPath: results.learningPath, 
      preTestDone: true,
      preTestProgress: null,
      preTestFeedback: results.preTestFeedback,
      recommendedStyle: results.recommendedStyle,
      learnerProfile: results.learnerProfile,
      moduleProgress: results.moduleProgress,
      settings: {
        ...(session?.settings || {}),
        assessmentStyle: results.style,
        contentMode: prefContentMode,
        assessmentTime: prefAssessmentTime,
        enabledMechanics
      } as any
    });
    navigate('/dashboard');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
    setCorrectAnswers(prev => ({ ...prev, [preTestQuestions[currentIdx].id]: isCorrect }));
    
    trackEvent({
      type: 'question_attempt',
      timestamp: new Date().toISOString(),
      data: {
        questionId: preTestQuestions[currentIdx].id,
        isCorrect,
        phase: 'pre-test'
      }
    });

    setTimeout(() => {
      if (currentIdx < preTestQuestions.length - 1) {
        setCurrentIdx(i => i + 1);
      } else {
        setShowLearningStyleQuiz(true);
      }
    }, 900);
  };

  if (showLearningStyleQuiz) {
    return (
      <div className={cn(
        "min-h-screen flex items-center justify-center transition-colors",
        "p-4 sm:p-6 lg:p-8",
        "bg-gradient-to-br from-slate-50 to-blue-50"
      )}>
        <div className={cn(
          "w-full max-w-2xl"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LearningStyleQuiz onComplete={handleLearningStyleComplete} />
          </motion.div>
        </div>
      </div>
    );
  }

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
            <p className="text-base sm:text-lg font-black text-brand-dark">{recommendation}</p>
          </div>

          <div className={cn(
            "space-y-4",
            isMobile && "space-y-3"
          )}>
            <section>
              <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Which Question Type Do You Prefer?</h3>
              <p className="mb-2 text-xs text-slate-500">Choose one or more. We will prioritize these formats in your journey.</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
                {preTestPreferenceOptions.map((option) => {
                  const selected = preferredQuestionIds.includes(option.id);
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
                Selected: {preferredQuestionIds.length} (minimum 1 required)
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
              disabled={preferredQuestionIds.length === 0}
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
