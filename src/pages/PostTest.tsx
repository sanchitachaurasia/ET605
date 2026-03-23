import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { postTestQuestions } from '../data/chapterData';
import { GameQuestion } from '../components/GameQuestion';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { submitMergePayload } from '../hooks/useMergeIntegration';

export default function PostTest() {
  const { session, updateSession } = useSessionStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  if (!session) return null;

  const handleStart = () => {
    setCurrentStep('questions');
    setStartTime(Date.now());
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestionIdx < postTestQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        handleComplete(newAnswers);
      }, 1000);
    }
  };

  const handleComplete = (finalAnswers: boolean[]) => {
    const score = (finalAnswers.filter(a => a).length / postTestQuestions.length) * 100;
    
    // Update session with post-test results
    updateSession({
      postTestScore: score,
      completed: true
    });
    
    if (session) {
      submitMergePayload(session, 'completed', false);
    }

    setCurrentStep('results');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#8b5cf6', '#d946ef']
    });
  };

  const score = (answers.filter(a => a).length / postTestQuestions.length) * 100;
  const correctCount = answers.filter(a => a).length;
  const learningGain = Math.round(score - (session?.preTestScore || 0));

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      session.settings.darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <div className="mx-auto max-w-4xl px-6 py-12">
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
                You've completed all the modules! Now it's time to show what you've learned.
                This test covers everything from data organisation to probability.
              </p>
              <div className="grid gap-6 md:grid-cols-3 mb-12">
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <CheckCircle2 className="mx-auto mb-2 text-green-500" />
                  <p className="font-bold text-slate-800">10 Questions</p>
                  <p className="text-xs text-slate-400">Comprehensive coverage</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <Star className="mx-auto mb-2 text-amber-500" />
                  <p className="font-bold text-slate-800">Mastery Check</p>
                  <p className="text-xs text-slate-400">Validate your skills</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <Trophy className="mx-auto mb-2 text-brand" />
                  <p className="font-bold text-slate-800">Final Badge</p>
                  <p className="text-xs text-slate-400">Complete your journey</p>
                </div>
              </div>
              <button
                onClick={handleStart}
                className="group flex items-center gap-3 rounded-2xl bg-brand px-12 py-5 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-brand/20 active:scale-95"
              >
                Start Final Mission
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
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand">Question {currentQuestionIdx + 1} of {postTestQuestions.length}</p>
                  <div className="mt-2 flex h-2 w-64 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      className="bg-brand"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / postTestQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span className="font-bold text-slate-700">{correctCount} Correct</span>
                </div>
              </div>

              <GameQuestion
                key={postTestQuestions[currentQuestionIdx].id}
                questionText={postTestQuestions[currentQuestionIdx].text}
                options={postTestQuestions[currentQuestionIdx].options}
                correctAnswer={postTestQuestions[currentQuestionIdx].correctAnswer}
                format={postTestQuestions[currentQuestionIdx].format}
                styles={postTestQuestions[currentQuestionIdx].styles}
                image={postTestQuestions[currentQuestionIdx].image}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <Trophy size={120} className="text-amber-500" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-black text-white shadow-xl"
                  >
                    {Math.round(score)}%
                  </motion.div>
                </div>
              </div>
              <h1 className="mb-2 text-4xl font-black">Mission Accomplished!</h1>
              <p className="mb-12 text-xl text-slate-500">
                You've completed the Data Handling module with a score of {correctCount} out of {postTestQuestions.length}.
              </p>

              <div className="mx-auto mb-12 max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between border-b pb-4">
                  <span className="font-bold text-slate-600">Pre-Test Score</span>
                  <span className="font-black text-slate-400">{Math.round(session.preTestScore || 0)}%</span>
                </div>
                <div className="mb-6 flex items-center justify-between border-b pb-4">
                  <span className="font-bold text-slate-600">Post-Test Score</span>
                  <span className="font-black text-brand">{Math.round(score)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-600">Learning Gain</span>
                  <span className={cn(
                    "font-black",
                    learningGain > 0 ? "text-green-500" : "text-slate-400"
                  )}>
                    +{Math.round(Math.max(0, learningGain))}%
                  </span>
                </div>
              </div>

              {learningGain < 10 && (
                <div className="mx-auto mb-12 max-w-md rounded-2xl bg-amber-50 p-6 text-center shadow-lg border-2 border-amber-200">
                  <h3 className="mb-2 text-xl font-black text-amber-700">Needs Review</h3>
                  <p className="font-medium text-amber-600">
                    Your learning gain is a bit low. We recommend revisiting the module for a quick review!
                  </p>
                </div>
              )}
              {learningGain >= 10 && learningGain < 30 && (
                <div className="mx-auto mb-12 max-w-md rounded-2xl bg-blue-50 p-6 text-center shadow-lg border-2 border-blue-200">
                  <h3 className="mb-2 text-xl font-black text-blue-700">Good Progress</h3>
                  <p className="font-medium text-blue-600">
                    Solid effort! Keep it up.
                  </p>
                </div>
              )}
              {learningGain >= 30 && (
                <div className="mx-auto mb-12 max-w-md rounded-2xl bg-green-50 p-6 text-center shadow-lg border-2 border-green-200">
                  <h3 className="mb-2 text-xl font-black text-green-700">Excellent Progress</h3>
                  <p className="font-medium text-green-600">
                    Amazing job! You've mastered this topic.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-2xl bg-brand px-12 py-5 text-xl font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95"
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
