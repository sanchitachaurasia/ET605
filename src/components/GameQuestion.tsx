import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GameFormat } from '../types';
import { cn } from '../lib/utils';
import { useSessionStore } from '../store/sessionStore';
import { AlertCircle } from 'lucide-react';
import { trackTelemetryEvent } from '../analytics/telemetry';

interface GameQuestionProps {
  questionId?: string;
  moduleId?: string;
  questionText: string;
  options?: string[];
  correctAnswer: string | number | string[];
  format: GameFormat;
  onAnswer: (isCorrect: boolean, selectedValue?: string | number | string[]) => void;
  isPreTest?: boolean;
  styles?: Record<string, any>;
  image?: string;
  visual?: any;
}

const DEFAULT_ENABLED_MECHANICS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
  GameFormat.TALLY_TAP,
];

const renderQuestionVisual = (visual: any, darkMode: boolean) => {
  if (!visual || !visual.kind) return null;

  if (visual.kind === 'bar') {
    const max = Math.max(...visual.data.map((d: any) => d.value));
    return (
      <div className={cn('rounded-2xl border p-6', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-4 text-xs font-black uppercase tracking-wide text-slate-500">Bar Graph</div>
        <div className="flex h-56 items-end justify-between gap-3">
          {visual.data.map((d: any) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-bold text-slate-600">{d.value}</div>
              <div 
                className={cn('w-full rounded-t-lg', darkMode ? 'bg-brand/80' : 'bg-brand')}
                style={{ height: `${Math.max(20, (d.value / max) * 160)}px` }}
              />
              <div className="text-sm font-bold text-slate-700">{d.label}</div>
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
              <span className="text-lg leading-none">{row.symbols}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[11px] font-semibold text-slate-500">{visual.key}</div>
      </div>
    );
  }

  if (visual.kind === 'pie') {
    const value = Math.max(0, Math.min(100, Number(visual.valuePercent) || 0));
    const gradient = `conic-gradient(#3b82f6 0% ${value}%, #e2e8f0 ${value}% 100%)`;
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Pie Chart</div>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 rounded-full border-4 border-white shadow" style={{ background: gradient }} />
          <div>
            <p className="text-sm font-black text-slate-800">{visual.highlightLabel}</p>
            <p className="text-xs font-semibold text-slate-500">{value}% of total</p>
          </div>
        </div>
      </div>
    );
  }

  if (visual.kind === 'spinner') {
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Spinner</div>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 rounded-full border-4 border-slate-200 bg-[conic-gradient(#ef4444_0deg_135deg,#3b82f6_135deg_315deg,#22c55e_315deg_360deg)]" />
          <div className="text-xs font-semibold text-slate-600">
            <div>Red: 3 parts</div>
            <div>Blue: 4 parts</div>
            <div>Green: 1 part</div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.kind === 'tally') {
    return (
      <div className={cn('rounded-2xl border p-4', darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
        <div className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Tally</div>
        <div className="font-mono text-2xl tracking-widest text-slate-700">{visual.pattern}</div>
        <div className="mt-1 text-xs font-semibold text-slate-500">{visual.caption}</div>
      </div>
    );
  }

  return null;
};

export const GameQuestion: React.FC<GameQuestionProps> = ({
  questionId,
  moduleId,
  questionText,
  options = [],
  correctAnswer,
  format,
  onAnswer,
  isPreTest = false,
  styles,
  image,
  visual,
}) => {
  const { session, updateSettings, updateMetrics } = useSessionStore();

  const normalizeText = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[°º]/g, '');

  const isAnswerMatch = (value: any, expected: any): boolean => {
    if (Array.isArray(expected)) {
      if (!Array.isArray(value) || value.length !== expected.length) return false;
      return value.every((item, index) => isAnswerMatch(item, expected[index]));
    }

    if (Array.isArray(value)) return false;

    if (typeof value === 'string' && typeof expected === 'string') {
      return normalizeText(value) === normalizeText(expected);
    }

    const parsedValue = typeof value === 'string' ? Number(value.trim()) : value;
    const parsedExpected = typeof expected === 'string' ? Number(expected.trim()) : expected;

    if (
      typeof parsedValue === 'number' &&
      typeof parsedExpected === 'number' &&
      !Number.isNaN(parsedValue) &&
      !Number.isNaN(parsedExpected)
    ) {
      return parsedValue === parsedExpected;
    }

    return normalizeText(String(value ?? '')) === normalizeText(String(expected ?? ''));
  };

  const rawSettings = session?.settings || ({} as any);
  const enabledMechanics = React.useMemo(() => {
    const configured = Array.isArray(rawSettings.enabledMechanics) ? rawSettings.enabledMechanics : [];
    return configured.length > 0 ? configured : DEFAULT_ENABLED_MECHANICS;
  }, [rawSettings.enabledMechanics]);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    enabledMechanics,
  };

  // Determine the active format and data
  const [activeFormat, setActiveFormat] = useState(format);
  const [activeData, setActiveData] = useState({ questionText, options, correctAnswer, image, visual });
  const [selected, setSelected] = useState<any>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    // Reset state when question payload changes
    setSelected(null);
    setTypedAnswer('');
    setFeedback(null);

    if (isPreTest) {
      setActiveFormat(format);
      setActiveData({ questionText, options, correctAnswer, image, visual });
      return;
    }

    const candidateFormats = enabledMechanics.filter((mechanic) => {
      if (!styles) return true;
      return Boolean(styles[mechanic]);
    });

    const randomPool = candidateFormats.length > 0 ? candidateFormats : enabledMechanics;
    const nextFormat = randomPool[Math.floor(Math.random() * randomPool.length)] || format;

    setActiveFormat(nextFormat);

    const fallbackStyle = styles ? Object.values(styles)[0] : undefined;
    const selectedStyle = (styles && (styles[nextFormat] || styles[format])) || fallbackStyle;

    if (selectedStyle) {
      setActiveData({
        questionText: selectedStyle.text || questionText,
        options: selectedStyle.options || options,
        correctAnswer: selectedStyle.correctAnswer || correctAnswer,
        image: selectedStyle.image || image,
        visual: selectedStyle.visual || visual,
      });
    } else {
      setActiveData({ questionText, options, correctAnswer, image, visual });
    }
  }, [questionId, format, styles, isPreTest, questionText, options, correctAnswer, image, visual, enabledMechanics]);

  useEffect(() => {
    if (!questionId) return;
    trackTelemetryEvent('question_view', {
      module_id: moduleId,
      question_id: questionId,
      event_data: {
        format: activeFormat,
      }
    });
  }, [activeFormat, moduleId, questionId]);

  if (!session) return null;
  const isEnabled = isPreTest || (enabledMechanics.includes(activeFormat) ?? true);
  const requiresTypedInput = (activeData.options?.length || 0) === 0;

  const isImmediate = !requiresTypedInput && [GameFormat.RAINDROP, GameFormat.DRAG_SORT, GameFormat.SPIN_WHEEL].includes(activeFormat);

  const handleSubmit = (val: any) => {
    if (feedback === 'correct') return;
    
    const isCorrect = isAnswerMatch(val, activeData.correctAnswer);

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    trackTelemetryEvent('question_attempt', {
      module_id: moduleId,
      question_id: questionId,
      event_data: {
        selected: val,
        is_correct: isCorrect,
        format: activeFormat,
      }
    });
    trackTelemetryEvent(isCorrect ? 'question_correct' : 'question_wrong', {
      module_id: moduleId,
      question_id: questionId,
    });

    onAnswer(isCorrect, val);
  };

  const handleSelectOption = (value: any) => {
    const changed = selected !== null && selected !== value;
    setSelected(value);

    if (questionId) {
      trackTelemetryEvent(changed ? 'option_changed' : 'option_marked', {
        module_id: moduleId,
        question_id: questionId,
        event_data: {
          selected: value,
          previous: selected,
        }
      });
    }

    if (session?.chapterMetrics) {
      updateMetrics({
        optionMarkedCount: (session.chapterMetrics.optionMarkedCount || 0) + 1,
        optionChangedCount: changed
          ? (session.chapterMetrics.optionChangedCount || 0) + 1
          : (session.chapterMetrics.optionChangedCount || 0),
      });
    }
  };

  const submissionValue = requiresTypedInput ? typedAnswer : selected;
  const hasSubmissionValue = requiresTypedInput
    ? typedAnswer.trim().length > 0
    : selected !== null && selected !== undefined;

  if (!isEnabled) {
    const currentMechanics = enabledMechanics || [];
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
      {activeData.visual && renderQuestionVisual(activeData.visual, settings.darkMode)}

      {!activeData.visual && activeData.image && (
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
                  onClick={() => !isArrayTarget && handleSelectOption(opt)}
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
                onClick={() => handleSelectOption(opt)}
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
                onClick={() => handleSelectOption(opt)}
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
              onClick={() => handleSelectOption(opt)}
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

      {requiresTypedInput && (
        <div className="space-y-3">
          <label
            htmlFor="typed-answer"
            className={cn(
              "block text-sm font-black uppercase tracking-wider",
              settings.darkMode ? "text-slate-300" : "text-slate-600"
            )}
          >
            Type Your Answer
          </label>
          <input
            id="typed-answer"
            type="text"
            inputMode="text"
            value={typedAnswer}
            onChange={(e) => {
              setTypedAnswer(e.target.value);
              if (feedback === 'incorrect') setFeedback(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && typedAnswer.trim() && feedback !== 'correct') {
                handleSubmit(typedAnswer);
              }
            }}
            placeholder="Enter your answer"
            className={cn(
              "w-full rounded-2xl border-2 px-5 py-4 text-lg font-bold outline-none transition",
              settings.darkMode
                ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-brand"
                : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-brand"
            )}
          />
        </div>
      )}

      {!isImmediate && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handleSubmit(submissionValue)}
            disabled={!hasSubmissionValue || feedback === 'correct'}
            className={cn(
              "px-16 py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all",
              hasSubmissionValue && feedback !== 'correct'
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
