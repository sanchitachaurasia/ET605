import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Headphones, Hand, BookOpen } from 'lucide-react';
import { LearningStyle } from '../types';

interface StyleQuestion {
  id: string;
  question: string;
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
}

const LEARNING_STYLE_QUESTIONS: StyleQuestion[] = [
  {
    id: 'q1',
    question: 'When learning something new, I prefer to...',
    visual: 4,
    auditory: 1,
    readWrite: 2,
    kinesthetic: 3
  },
  {
    id: 'q2',
    question: 'I learn best through...',
    visual: 4,
    auditory: 3,
    readWrite: 2,
    kinesthetic: 1
  },
  {
    id: 'q3',
    question: 'During class, I usually...',
    visual: 3,
    auditory: 4,
    readWrite: 2,
    kinesthetic: 1
  },
  {
    id: 'q4',
    question: 'When explaining something, I tend to...',
    visual: 4,
    auditory: 3,
    readWrite: 1,
    kinesthetic: 2
  },
  {
    id: 'q5',
    question: 'I remember things better when I...',
    visual: 4,
    auditory: 3,
    readWrite: 2,
    kinesthetic: 1
  }
];

const STYLE_OPTIONS = [
  { style: 'visual', label: 'Look at diagrams and images', icon: Eye },
  { style: 'auditory', label: 'Listen to explanations', icon: Headphones },
  { style: 'readWrite', label: 'Read and take notes', icon: BookOpen },
  { style: 'kinesthetic', label: 'Do hands-on activities', icon: Hand }
];

interface Props {
  onComplete: (style: LearningStyle, profile: any) => void;
}

export function LearningStyleQuiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    visual: 0,
    auditory: 0,
    readWrite: 0,
    kinesthetic: 0
  });
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (styleScores: Record<string, number>) => {
    setScores(prev => ({
      visual: prev.visual + styleScores.visual,
      auditory: prev.auditory + styleScores.auditory,
      readWrite: prev.readWrite + styleScores.readWrite,
      kinesthetic: prev.kinesthetic + styleScores.kinesthetic
    }));

    if (currentQuestion < LEARNING_STYLE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getDominantStyle = (): LearningStyle => {
    const max = Math.max(scores.visual, scores.auditory, scores.readWrite, scores.kinesthetic);
    if (scores.visual === max) return 'visual';
    if (scores.auditory === max) return 'auditory';
    if (scores.readWrite === max) return 'readWrite';
    return 'kinesthetic';
  };

  const getSecondaryStyle = (): LearningStyle => {
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([style]) => style as LearningStyle);
    
    const dominant = getDominantStyle();
    return sorted.find(s => s !== dominant) || 'mixed';
  };

  if (showResults) {
    const dominant = getDominantStyle();
    const secondary = getSecondaryStyle();
    const isMixed = Math.max(...Object.values(scores)) - Math.min(...Object.values(scores)) < 5;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 p-8 text-center"
      >
        <h2 className="mb-2 text-2xl font-black text-slate-900">Your Learning Style</h2>
        <p className="mb-6 text-slate-600">We've identified how you learn best!</p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm font-bold text-slate-600 uppercase">Main Style</div>
            <div className="text-lg font-black text-brand capitalize">{dominant}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm font-bold text-slate-600 uppercase">Secondary</div>
            <div className="text-lg font-black text-slate-600 capitalize">{secondary}</div>
          </div>
        </div>

        {isMixed && (
          <div className="mb-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700 font-semibold">
            💡 You're a balanced learner! We'll personalize your experience across all styles.
          </div>
        )}

        <div className="mb-8 text-left">
          <p className="mb-3 font-bold text-slate-900">Your personalized features:</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {dominant === 'visual' && (
              <>
                <li>✨ Enhanced infographics and concept diagrams</li>
                <li>✨ Color-coded learning paths and visual progress</li>
                <li>✨ Interactive visual demonstrations</li>
              </>
            )}
            {dominant === 'auditory' && (
              <>
                <li>🎧 Audio narration for all concepts</li>
                <li>🎧 Verbal explanations and discussions</li>
                <li>🎧 Sound-based feedback and rewards</li>
              </>
            )}
            {dominant === 'readWrite' && (
              <>
                <li>📝 Detailed text explanations</li>
                <li>📝 Note-taking opportunities</li>
                <li>📝 Reading-heavy content mode</li>
              </>
            )}
            {dominant === 'kinesthetic' && (
              <>
                <li>👐 Hands-on interactive activities</li>
                <li>👐 Drag-and-drop and simulation games</li>
                <li>👐 Physical interaction focus</li>
              </>
            )}
          </ul>
        </div>

        <button
          onClick={() => onComplete(isMixed ? 'mixed' : dominant, {
            preferredStyle: dominant,
            secondaryStyle: secondary,
            contentPreference: 'mixed',
            feedbackStyle: 'immediate',
            pacePref: 'medium',
            distractionLevel: 'moderate'
          })}
          className="w-full rounded-2xl bg-brand px-6 py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95"
        >
          Personalize My Experience →
        </button>
      </motion.div>
    );
  }

  const question = LEARNING_STYLE_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / LEARNING_STYLE_QUESTIONS.length) * 100;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-600">Question {currentQuestion + 1} of {LEARNING_STYLE_QUESTIONS.length}</span>
          <span className="text-sm font-bold text-brand">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-brand"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <h2 className="mb-6 text-xl font-bold text-slate-900">{question.question}</h2>
        <div className="space-y-3">
          {STYLE_OPTIONS.map(({ style, label, icon: Icon }) => (
            <button
              key={style}
              onClick={() => handleAnswer({
                visual: question.visual * (style === 'visual' ? 1 : 0),
                auditory: question.auditory * (style === 'auditory' ? 1 : 0),
                readWrite: question.readWrite * (style === 'readWrite' ? 1 : 0),
                kinesthetic: question.kinesthetic * (style === 'kinesthetic' ? 1 : 0)
              })}
              className="flex w-full items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-brand hover:bg-brand/5 active:scale-95"
            >
              <Icon className="flex-shrink-0 text-brand" size={24} />
              <span className="font-semibold text-slate-900">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
