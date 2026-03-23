import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GameFormat } from '../types';
import { cn } from '../lib/utils';
import { useSessionStore } from '../store/sessionStore';
import { AlertCircle } from 'lucide-react';

interface GameQuestionProps {
  questionText: string;
  options?: string[];
  correctAnswer: string | number | string[];
  format: GameFormat;
  onAnswer: (isCorrect: boolean) => void;
  isPreTest?: boolean;
  styles?: Record<string, any>;
  image?: string;
}

export const GameQuestion: React.FC<GameQuestionProps> = ({
  questionText,
  options = [],
  correctAnswer,
  format,
  onAnswer,
  isPreTest = false,
  styles,
  image,
}) => {
  const { session, updateSettings } = useSessionStore();
  const rawSettings = session?.settings || ({} as any);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    enabledMechanics: rawSettings.enabledMechanics || [
      GameFormat.RAINDROP,
      GameFormat.DRAG_SORT,
      GameFormat.SPIN_WHEEL,
      GameFormat.BAR_BUILDER,
      GameFormat.HOTSPOT,
      GameFormat.PIE_SLICER,
      GameFormat.TALLY_TAP
    ],
  };

  // Determine the active format and data
  const [activeFormat, setActiveFormat] = useState(format);
  const [activeData, setActiveData] = useState({ questionText, options, correctAnswer, image });
  const [selected, setSelected] = useState<any>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    // Reset state when format or data changes
    setSelected(null);
    setFeedback(null);

    if (isPreTest) {
      setActiveFormat(format);
      setActiveData({ questionText, options, correctAnswer, image });
      return;
    }

    let nextFormat = format;
    if (settings.enabledMechanics && settings.enabledMechanics.length > 0) {
      // Pick a random format from enabled mechanics
      nextFormat = settings.enabledMechanics[Math.floor(Math.random() * settings.enabledMechanics.length)];
    }

    setActiveFormat(nextFormat);
    
    if (styles && styles[nextFormat]) {
      setActiveData({
        questionText: styles[nextFormat].text || questionText,
        options: styles[nextFormat].options || options,
        correctAnswer: styles[nextFormat].correctAnswer || correctAnswer,
        image: styles[nextFormat].image || image,
      });
    } else {
      setActiveData({ questionText, options, correctAnswer, image });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, styles, isPreTest, questionText, correctAnswer, image]);

  if (!session) return null;
  const isEnabled = isPreTest || (settings.enabledMechanics?.includes(activeFormat) ?? true);

  const isImmediate = [GameFormat.RAINDROP, GameFormat.DRAG_SORT, GameFormat.SPIN_WHEEL].includes(activeFormat);

  const handleSubmit = (val: any) => {
    if (feedback === 'correct') return;
    
    const isCorrect = Array.isArray(activeData.correctAnswer)
      ? JSON.stringify(val) === JSON.stringify(activeData.correctAnswer)
      : val === activeData.correctAnswer;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onAnswer(isCorrect);
  };

  if (!isEnabled) {
    const currentMechanics = settings.enabledMechanics || [];
    return (
      <div className={cn(
        "flex flex-col items-center justify-center gap-6 rounded-3xl p-12 text-center shadow-xl transition-colors",
        settings.darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      )}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <AlertCircle size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-black">Mechanic Disabled</h3>
          <p className="mt-2 text-slate-500">The "{activeFormat.replace('_', ' ')}" format is currently turned off in your settings.</p>
        </div>
        <button
          onClick={() => updateSettings({ enabledMechanics: [...currentMechanics, activeFormat] })}
          className="rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Enable & Play
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col gap-6 rounded-3xl p-8 shadow-xl transition-colors",
      settings.darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
    )}>
      {activeData.image && (
        <div className="mb-4 overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 p-2">
          <img 
            src={activeData.image} 
            alt="Question reference" 
            className="h-auto w-full rounded-xl object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <h3 className={cn(
        "text-xl font-black leading-tight",
        settings.darkMode ? "text-white" : "text-slate-800"
      )}>{activeData.questionText}</h3>

      {activeFormat === GameFormat.RAINDROP && (
        <div className={cn(
          "relative h-64 overflow-hidden rounded-2xl",
          settings.darkMode ? "bg-slate-800" : "bg-brand/10"
        )}>
          {activeData.options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, x: 20 + i * 60 }}
              animate={{ y: 300 }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'linear' }}
              onClick={() => handleSubmit(opt)}
              className="absolute cursor-pointer rounded-full bg-brand px-4 py-2 text-white shadow-md hover:opacity-90"
            >
              {opt}
            </motion.div>
          ))}
        </div>
      )}

      {activeFormat === GameFormat.DRAG_SORT && (
        <div className="flex flex-wrap gap-4">
          {activeData.options.map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubmit(opt)}
              className={cn(
                "cursor-pointer rounded-2xl border-2 px-6 py-4 font-bold transition-all",
                settings.darkMode 
                  ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-brand hover:bg-slate-700" 
                  : "border-slate-100 bg-slate-50 text-slate-700 hover:border-brand hover:bg-brand/10"
              )}
            >
              {opt}
            </motion.div>
          ))}
        </div>
      )}

      {activeFormat === GameFormat.SPIN_WHEEL && (
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ rotate: feedback === 'correct' ? 360 : 0 }}
            className={cn(
              "h-48 w-48 rounded-full border-8 shadow-inner",
              settings.darkMode ? "border-slate-800 bg-gradient-to-tr from-brand/80 to-brand" : "border-slate-100 bg-gradient-to-tr from-brand/40 to-brand/60"
            )}
          />
          <div className="flex flex-wrap justify-center gap-3">
            {activeData.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(opt)}
                className={cn(
                  "rounded-xl px-6 py-3 font-bold transition-all",
                  settings.darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFormat === GameFormat.BAR_BUILDER && (
        <div className={cn(
          "flex items-end justify-around gap-4 h-64 border-b-2 pb-2",
          settings.darkMode ? "border-slate-700" : "border-slate-300"
        )}>
          {activeData.options.map((opt, i) => {
            const isArrayTarget = Array.isArray(activeData.correctAnswer);
            return (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div 
                  className={cn(
                    "relative w-full rounded-t-xl overflow-hidden h-48 transition-all",
                    settings.darkMode ? "bg-slate-800" : "bg-slate-100",
                    !isArrayTarget && "cursor-pointer hover:bg-slate-200",
                    !isArrayTarget && selected === opt && (settings.darkMode ? "ring-4 ring-brand bg-slate-700" : "ring-4 ring-brand bg-slate-200")
                  )}
                  onClick={() => !isArrayTarget && setSelected(opt)}
                >
                  {isArrayTarget ? (
                    <motion.div
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      onDrag={(_, info) => {
                        const newHeight = Math.max(0, Math.min(100, (selected?.[i] || 0) - info.delta.y / 2));
                        const newSelected = [...(selected || activeData.options.map(() => 0))];
                        newSelected[i] = newHeight;
                        setSelected(newSelected);
                      }}
                      className="absolute bottom-0 w-full bg-brand cursor-ns-resize"
                      style={{ height: `${selected?.[i] || 20}%` }}
                    />
                  ) : (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${20 + ((i % 3) * 20)}%` }} // decorative height 
                      className={cn("absolute bottom-0 w-full transition-colors", selected === opt ? "bg-brand" : "bg-brand/40")}
                    />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-500 text-center">{opt}</span>
              </div>
            );
          })}
        </div>
      )}

      {activeFormat === GameFormat.HOTSPOT && (
        <div className={cn(
          "relative aspect-video rounded-2xl overflow-hidden border-2",
          settings.darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
        )}>
          <div className="grid grid-cols-3 gap-4 p-4 h-full">
            {activeData.options.map((opt, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(opt)}
                className={cn(
                  "flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all font-black",
                  selected === opt 
                    ? "border-brand bg-brand text-white shadow-lg" 
                    : (settings.darkMode ? "border-slate-700 bg-slate-900 text-slate-500" : "border-slate-200 bg-white text-slate-400")
                )}
              >
                {opt}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeFormat === GameFormat.PIE_SLICER && (
        <div className="flex flex-col items-center gap-8">
          <div className={cn(
            "relative h-48 w-48 rounded-full border-4 overflow-hidden shadow-inner",
            settings.darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
          )}>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn("h-full w-1 absolute rotate-45", settings.darkMode ? "bg-slate-700" : "bg-slate-200")} />
                <div className={cn("h-full w-1 absolute -rotate-45", settings.darkMode ? "bg-slate-700" : "bg-slate-200")} />
             </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {activeData.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(opt)}
                className={cn(
                  "px-6 py-3 rounded-2xl border-2 font-black transition-all",
                  selected === opt 
                    ? "border-brand bg-brand text-white shadow-lg" 
                    : (settings.darkMode ? "border-slate-700 bg-slate-800 text-slate-400" : "border-slate-200 bg-white text-slate-500")
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFormat === GameFormat.TALLY_TAP && (
        <div className="grid grid-cols-2 gap-4">
          {activeData.options.map((opt, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(opt)}
              className={cn(
                "p-8 rounded-3xl border-2 text-3xl font-mono transition-all",
                selected === opt 
                  ? "border-brand bg-brand text-white shadow-xl" 
                  : (settings.darkMode ? "border-slate-700 bg-slate-800 text-slate-500" : "border-slate-200 bg-white text-slate-400")
              )}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      )}

      {!isImmediate && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handleSubmit(selected)}
            disabled={!selected || feedback === 'correct'}
            className={cn(
              "px-16 py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all",
              selected && feedback !== 'correct'
                ? "bg-brand text-white hover:opacity-90 hover:scale-105 active:scale-95" 
                : (settings.darkMode ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-slate-200 text-slate-400 cursor-not-allowed")
            )}
          >
            Check Answer
          </button>
        </div>
      )}

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "rounded-2xl p-6 text-center font-black text-lg shadow-inner",
            feedback === 'correct' 
              ? (settings.darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700") 
              : (settings.darkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700")
          )}
        >
          {feedback === 'correct' ? "🎉 Awesome! You got it!" : "😅 Not quite, try again!"}
        </motion.div>
      )}
    </div>
  );
};
