import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GameQuestion } from '../components/GameQuestion';
import { preTestQuestions } from '../data/chapterData';
import { useSessionStore } from '../store/sessionStore';
import { trackEvent } from '../analytics/tracker';
import { GameFormat } from '../types';
import { cn } from '../lib/utils';

export default function PreTest() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [formatFeedbacks, setFormatFeedbacks] = useState<Record<string, number>>({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [prefContentMode, setPrefContentMode] = useState<'text' | 'video'>('video');
  const [prefAssessmentTime, setPrefAssessmentTime] = useState<'inModule' | 'endOfModule'>('inModule');
  
  const { session, updateSession } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.preTestDone) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const handleFeedback = (val: number) => {
    const currentFormat = preTestQuestions[currentIdx].format;
    const newFormatFeedbacks = { ...formatFeedbacks, [currentFormat]: val };
    setFormatFeedbacks(newFormatFeedbacks);
    
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentIdx < preTestQuestions.length - 1) {
        setCurrentIdx(i => i + 1);
      } else {
        // Calculate Final Results
        const finalScore = Math.round((score / preTestQuestions.length) * 100);
        const feedbacks = Object.values(newFormatFeedbacks) as number[];
        const avgFeedback = feedbacks.length > 0 ? feedbacks.reduce((a, b) => a + b, 0) / feedbacks.length : 3;
        
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

        // Initial Personalization Logic (can be overridden by preferences)
        let style: 'gamified' | 'traditional' | 'balanced' = 'balanced';
        let contentMode: 'text' | 'video' = 'video';
        let assessmentTime: 'inModule' | 'endOfModule' = 'inModule';
        let rec = 'Balanced & Adaptive (Mixed Style)';
        
        // Disable mechanics with low feedback (<= 2)
        const enabledMechanics = Object.values(GameFormat).filter(f => {
          const fbk = newFormatFeedbacks[f];
          return fbk === undefined || fbk > 2;
        });

        if (avgFeedback >= 4) {
          style = 'gamified';
          contentMode = 'video';
          rec = 'Gamified & Interactive (High Engagement)';
        } else if (avgFeedback <= 2.5) {
          style = 'traditional';
          contentMode = 'text';
          rec = 'Traditional & Focused (Minimal Distractions)';
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
        
        // We don't updateSession yet, we wait for preferences
        const tempResults = {
          preTestScore: finalScore, 
          learningPath: path21, 
          preTestFeedback: avgFeedback,
          recommendedStyle: rec,
          moduleProgress: [
            { moduleId: '2.1', completed: false, score: 0, stars: 0, learningPath: path21, masteryMap: {}, attemptsCount: {} },
            { moduleId: '2.2', completed: false, score: 0, stars: 0, learningPath: path22, masteryMap: {}, attemptsCount: {} },
            { moduleId: '2.3', completed: false, score: 0, stars: 0, learningPath: path23, masteryMap: {}, attemptsCount: {} },
            { moduleId: '2.4', completed: false, score: 0, stars: 0, learningPath: path24, masteryMap: {}, attemptsCount: {} }
          ],
          enabledMechanics,
          style
        };
        (window as any)._tempPreTestResults = tempResults;
      }
    }, 800);
  };

  const handleFinish = () => {
    const results = (window as any)._tempPreTestResults;
    if (!results) return;

    updateSession({ 
      preTestScore: results.preTestScore, 
      learningPath: results.learningPath, 
      preTestDone: true,
      preTestFeedback: results.preTestFeedback,
      recommendedStyle: results.recommendedStyle,
      moduleProgress: results.moduleProgress,
      settings: {
        ...(session?.settings || {}),
        assessmentStyle: results.style,
        contentMode: prefContentMode,
        assessmentTime: prefAssessmentTime,
        enabledMechanics: results.enabledMechanics
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
      setShowFeedback(true);
    }, 1000);
  };

  if (showRecommendation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="mb-2 text-2xl text-center font-black text-slate-900">Mission Complete!</h2>
          <p className="mb-6 text-center text-slate-500">We've personalized your journey based on your results.</p>
          
          <div className="mb-8 rounded-2xl bg-brand/10 p-4 border-2 border-brand/20 text-center">
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Your Learning Profile</p>
            <p className="text-lg font-black text-brand-dark">{recommendation}</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Learning Mode</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrefContentMode('video')}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    prefContentMode === 'video' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-xl">📺</span>
                  <span className="font-bold text-sm">Video</span>
                </button>
                <button
                  onClick={() => setPrefContentMode('text')}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    prefContentMode === 'text' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-xl">📖</span>
                  <span className="font-bold text-sm">Text</span>
                </button>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Assessment Timing</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrefAssessmentTime('inModule')}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    prefAssessmentTime === 'inModule' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-xl">⏱️</span>
                  <span className="font-bold text-xs">After each part</span>
                </button>
                <button
                  onClick={() => setPrefAssessmentTime('endOfModule')}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    prefAssessmentTime === 'endOfModule' ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-400"
                  )}
                >
                  <span className="text-xl">🏁</span>
                  <span className="font-bold text-xs">At the end</span>
                </button>
              </div>
            </section>

            <button
              onClick={handleFinish}
              className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
            >
              Start My Journey
              <span className="text-xl">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = preTestQuestions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-black text-slate-900">Diagnostic Mission</h1>
          <span className="font-bold text-slate-500">Question {currentIdx + 1} of {preTestQuestions.length}</span>
        </div>

        <div className="mb-8 h-2 w-full rounded-full bg-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / preTestQuestions.length) * 100}%` }}
            className="h-full rounded-full bg-brand"
          />
        </div>

        <GameQuestion
          key={q.id}
          questionText={q.text}
          options={q.options}
          correctAnswer={q.correctAnswer}
          format={q.format}
          styles={q.styles}
          image={q.image}
          isPreTest={true}
          onAnswer={handleAnswer}
        />

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
              >
                <h3 className="mb-6 text-xl font-black text-slate-900">How do you like this game style?</h3>
                <div className="flex justify-between gap-2 mb-6">
                    { [
                      { val: 1, emoji: '😫' },
                      { val: 2, emoji: '😕' },
                      { val: 3, emoji: '😐' },
                      { val: 4, emoji: '🙂' },
                      { val: 5, emoji: '🤩' }
                    ].map((f) => (
                      <button
                        key={f.val}
                        onClick={() => handleFeedback(f.val)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl transition-all hover:scale-110 hover:bg-brand/10 active:scale-95"
                      >
                        {f.emoji}
                      </button>
                    ))}
                </div>
                <button
                  onClick={() => handleFeedback(3)}
                  className="text-sm font-bold text-slate-400 hover:text-brand transition-colors"
                >
                  Skip Feedback
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
