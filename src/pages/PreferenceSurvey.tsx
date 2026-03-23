import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSessionStore } from '../store/sessionStore';
import { GameFormat } from '../types';
import { Check } from 'lucide-react';

const SURVEY_STEPS = [
  {
    field: 'preferredGameFormat',
    question: 'Which question style did you enjoy most?',
    options: [
      { label: 'Raindrop Catch', value: GameFormat.RAINDROP, icon: '💧' },
      { label: 'Drag & Drop', value: GameFormat.DRAG_SORT, icon: '🖐️' },
      { label: 'Spin the Wheel', value: GameFormat.SPIN_WHEEL, icon: '🎡' },
    ]
  },
  {
    field: 'preferredContentMode',
    question: 'How do you like to learn new things?',
    options: [
      { label: 'Reading & Diagrams', value: 'text', icon: '📖' },
      { label: 'Videos & Animations', value: 'video', icon: '🎬' },
    ]
  },
  {
    field: 'preferredAssessmentTime',
    question: 'When would you like to be tested?',
    options: [
      { label: 'After I finish a module', value: 'endOfModule', icon: '🏁' },
      { label: 'In small bursts while I learn', value: 'inModule', icon: '⚡' },
    ]
  }
];

export default function PreferenceSurvey() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const updateSession = useSessionStore(state => state.updateSession);
  const navigate = useNavigate();

  const handleSelect = (val: any) => {
    const newSelections = { ...selections, [SURVEY_STEPS[step].field]: val };
    setSelections(newSelections);
    
    setTimeout(() => {
      if (step < SURVEY_STEPS.length - 1) {
        setStep(s => s + 1);
      } else {
        updateSession(newSelections);
        navigate('/path-assignment');
      }
    }, 600);
  };

  const current = SURVEY_STEPS[step];

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-600 p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-2xl text-center"
        >
          <h2 className="mb-12 text-4xl font-black text-white">{current.question}</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {current.options.map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(opt.value)}
                className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-2xl transition-colors hover:bg-blue-50"
              >
                <span className="mb-4 text-6xl">{opt.icon}</span>
                <span className="text-xl font-bold text-slate-800">{opt.label}</span>
                {selections[current.field] === opt.value && (
                  <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <Check size={20} />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
