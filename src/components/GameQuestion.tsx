import React, { useState, useEffect, useRef } from 'react';
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
  GameFormat.PIE_SLICER
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



  return null;
};

const HOTSPOT_LAYOUT: Array<{ left: number; top: number }> = [
  { left: 18, top: 20 },
  { left: 50, top: 14 },
  { left: 82, top: 22 },
  { left: 28, top: 50 },
  { left: 72, top: 52 },
  { left: 16, top: 78 },
  { left: 50, top: 84 },
  { left: 84, top: 76 },
];

const PIE_SEGMENT_COLORS = ['#fb7185', '#60a5fa', '#34d399', '#f59e0b', '#a78bfa', '#f97316'];

function getOrbitPosition(index: number, total: number, radiusPercent = 40, startAngleDeg = -90) {
  if (total <= 0) return { left: 50, top: 50 };
  const angle = ((360 / total) * index + startAngleDeg) * (Math.PI / 180);
  return {
    left: 50 + Math.cos(angle) * radiusPercent,
    top: 50 + Math.sin(angle) * radiusPercent,
  };
}

function getOptionSeed(value: string, index: number): number {
  return Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 31 * (index + 1));
}

function getBarPreviewHeight(value: string, index: number): number {
  const seed = getOptionSeed(value, index);
  return 24 + (seed % 62);
}

function getTallyPattern(value: string, index: number): string {
  const seed = getOptionSeed(value, index);
  const count = 3 + (seed % 17);
  const groups = Math.floor(count / 5);
  const remainder = count % 5;
  const grouped = Array.from({ length: groups }, () => '||||/').join(' ');
  const tail = '|'.repeat(remainder);
  return `${grouped}${grouped && tail ? ' ' : ''}${tail}`.trim();
}

function buildPieGradient(total: number): string {
  if (total <= 0) return 'conic-gradient(#e2e8f0 0% 100%)';
  const stops = Array.from({ length: total }, (_, index) => {
    const start = (index / total) * 100;
    const end = ((index + 1) / total) * 100;
    const color = PIE_SEGMENT_COLORS[index % PIE_SEGMENT_COLORS.length];
    return `${color} ${start}% ${end}%`;
  });
  return `conic-gradient(${stops.join(',')})`;
}

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
  const [activeData, setActiveData] = useState({ questionText, options, correctAnswer, image, visual, remedialBrief: (null as string | undefined), remedialDetail: (null as string | undefined), remedialContent: (null as any) });
  const [selected, setSelected] = useState<any>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const [showRemedial, setShowRemedial] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);

  useEffect(() => {
    // Reset state when question payload changes
    setSelected(null);
    setTypedAnswer('');
    setFeedback(null);
    setSpinRotation(0);

    if (isPreTest) {
      setActiveFormat(format);
      setActiveData({ questionText, options, correctAnswer, image, visual, remedialBrief, remedialDetail, remedialContent });
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
        remedialBrief,
        remedialDetail,
        remedialContent,
      });
    } else {
      setActiveData({ questionText, options, correctAnswer, image, visual, remedialBrief, remedialDetail, remedialContent });
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

  const handleSubmit = (val: any) => {
    if (feedback === 'correct') return;
    const isCorrect = isAnswerMatch(val, activeData.correctAnswer);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowRemedial(true); // Always show remedial content after answer
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

  const handleSelectOption = (value: any, optionIndex?: number) => {
    const changed = selected !== null && selected !== value;
    setSelected(value);

    if (activeFormat === GameFormat.SPIN_WHEEL) {
      const optionSeed = getOptionSeed(String(value), optionIndex ?? 0);
      const extraSpin = 540 + (optionSeed % 180);
      setSpinRotation((prev) => prev + extraSpin);
    }

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

  // Auto-scroll to feedback/remedial when shown
  useEffect(() => {
    if (feedback && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [feedback]);

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
          "relative h-72 overflow-hidden rounded-2xl border",
          settings.darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-sky-50"
        )}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/60 to-transparent" />
          <div
            className={cn(
              "pointer-events-none absolute inset-x-6 bottom-3 border-t-2 border-dashed",
              settings.darkMode ? "border-slate-600" : "border-sky-300"
            )}
          />
          {activeData.options.map((opt, i) => (
            <motion.button
              key={i}
              style={{
                left: `${activeData.options.length <= 1 ? 50 : 8 + (i * 84) / (activeData.options.length - 1)}%`,
              }}
              initial={{ y: -120 - (i % 2) * 48 }}
              animate={{ y: 320 - (i % 3) * 16 }}
              transition={{ duration: 6 + (i % 3) * 0.9, repeat: Infinity, ease: 'linear', delay: i * 0.55 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectOption(opt)}
              className={cn(
                "absolute -translate-x-1/2 cursor-pointer rounded-full px-4 py-2 text-xs font-black shadow-lg transition-all sm:px-5 sm:text-sm",
                selected === opt
                  ? "scale-105 bg-brand text-white ring-4 ring-brand/30"
                  : settings.darkMode
                    ? "border border-slate-500/70 bg-slate-700 text-slate-100 hover:bg-slate-600"
                    : "border border-slate-200 bg-white/95 text-slate-700 hover:bg-white"
              )}
            >
              <span className="block max-w-[11rem] whitespace-normal text-center leading-tight">{opt}</span>
            </motion.button>
          ))}
        </div>
      )}

      {activeFormat === GameFormat.DRAG_SORT && (
        <div className="grid gap-4 sm:grid-cols-2">
          {activeData.options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -4, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectOption(opt)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all",
                selected === opt
                  ? "border-brand bg-brand/15 ring-2 ring-brand/30"
                  : settings.darkMode
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-brand/60"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand/60"
              )}
            >
              <div className="mb-2 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                <span>Tile {i + 1}</span>
                <span className="font-mono text-sm opacity-70">:::</span>
              </div>
              <p className="text-sm font-bold leading-snug">{opt}</p>
            </motion.button>
          ))}
        </div>
      )}

      {activeFormat === GameFormat.SPIN_WHEEL && (
        <div className="relative mx-auto h-[22rem] w-full max-w-2xl flex items-center justify-center">
          {/* Rotating pointer */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[16%] z-20 -translate-x-1/2 origin-bottom"
            animate={{ rotate: selected !== null ? (360 / activeData.options.length) * activeData.options.findIndex((o) => o === selected) : 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.85, 0.2, 1] }}
            style={{ width: 0, height: 0 }}
          >
            <div className="h-0 w-0 border-x-[11px] border-b-[16px] border-x-transparent border-b-brand drop-shadow-sm" />
          </motion.div>

          {/* SVG Wheel */}
          <motion.svg
            width={340}
            height={340}
            viewBox="0 0 340 340"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: spinRotation }}
            transition={{ duration: 1.15, ease: [0.2, 0.85, 0.2, 1] }}
          >
            {activeData.options.map((opt, i) => {
              const total = activeData.options.length;
              const angle = 360 / total;
              const startAngle = i * angle - 90;
              const endAngle = (i + 1) * angle - 90;
              const largeArc = angle > 180 ? 1 : 0;
              const r = 160;
              const x1 = 170 + r * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 170 + r * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 170 + r * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 170 + r * Math.sin((Math.PI * endAngle) / 180);
              const color = PIE_SEGMENT_COLORS[i % PIE_SEGMENT_COLORS.length];
              // Pop out effect for selected
              const isSelected = selected === opt;
              const popDist = isSelected ? 18 : 0;
              const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
              const dx = Math.cos(midAngle) * popDist;
              const dy = Math.sin(midAngle) * popDist;
              return (
                <motion.path
                  key={i}
                  d={`M${170 + dx},${170 + dy} L${x1 + dx},${y1 + dy} A${r},${r} 0 ${largeArc} 1 ${x2 + dx},${y2 + dy} Z`}
                  fill={color}
                  stroke={isSelected ? '#2563eb' : '#fff'}
                  strokeWidth={isSelected ? 7 : 3}
                  animate={{
                    scale: isSelected ? 1.06 : 1,
                    filter: isSelected ? 'brightness(1.1) drop-shadow(0 0 8px #2563eb88)' : 'none',
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelectOption(opt, i)}
                />
              );
            })}
            {/* Center circle */}
            <circle cx={170} cy={170} r={70} fill={settings.darkMode ? '#0f172a' : '#fff'} stroke="#e5e7eb" strokeWidth={2} />
            {(() => {
              const centerText = selected ? 'Choice locked' : 'Pick a slice';
              const fillColor = settings.darkMode ? '#e0e7ef' : '#334155';
              return (
                <text x={170} y={170} textAnchor="middle" dominantBaseline="middle" fontSize={18} fontWeight="bold" fill={fillColor}>
                  {centerText}
                </text>
              );
            })()}
          </motion.svg>

          {/* Option labels around the wheel */}
          {activeData.options.map((opt, i) => {
            const total = activeData.options.length;
            const angle = (360 / total) * i - 90;
            const rad = (angle * Math.PI) / 180;
            const labelRadius = 150;
            const left = 170 + Math.cos(rad) * labelRadius;
            const top = 170 + Math.sin(rad) * labelRadius;
            return (
              <motion.button
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${left - 170}px)`,
                  top: `calc(50% + ${top - 170}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: selected === opt ? 12 : 11,
                }}
                animate={{ scale: selected === opt ? 1.13 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleSelectOption(opt, i)}
                className={cn(
                  "rounded-xl px-3 py-2 text-xs font-bold shadow-md transition-all",
                  selected === opt
                    ? "bg-brand text-white ring-4 ring-brand/30"
                    : settings.darkMode
                      ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                <span className="block max-w-[11rem] whitespace-normal text-center leading-tight">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {activeFormat === GameFormat.BAR_BUILDER && (
        <div className="space-y-3">
          <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-slate-400' : 'text-slate-500')}>
            Tap a column to select your answer
          </p>
          <div className={cn(
            "flex h-64 items-end justify-around gap-4 border-b-2 pb-2",
            settings.darkMode ? "border-slate-700" : "border-slate-300"
          )}>
            {(() => {
              // Check if all options are integers
              const intOptions = activeData.options.map((opt: any) => Number(opt));
              const allInts = intOptions.every((v) => Number.isInteger(v));
              const min = allInts ? Math.min(...intOptions) : 0;
              const max = allInts ? Math.max(...intOptions) : 0;
              return activeData.options.map((opt, i) => {
                const isArrayTarget = Array.isArray(activeData.correctAnswer);
                let barHeight;
                if (allInts && max > min) {
                  // Proportional height for integer values
                  const val = Number(opt);
                  barHeight = 32 + ((val - min) / (max - min)) * (160);
                } else {
                  // Fallback to preview height
                  barHeight = getBarPreviewHeight(String(opt), i);
                }
                return (
                  <div key={i} className="flex w-full flex-col items-center gap-2">
                    <div
                      className={cn(
                        "relative h-48 w-full overflow-hidden rounded-t-xl transition-all",
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
                            const newHeight = Math.max(0, Math.min(100, (selected?.[i] || 25) - info.delta.y / 2));
                            const newSelected = [...(selected || activeData.options.map(() => 25))];
                            newSelected[i] = newHeight;
                            setSelected(newSelected);
                          }}
                          className="absolute bottom-0 w-full cursor-ns-resize bg-brand"
                          style={{ height: `${selected?.[i] || 25}%` }}
                        />
                      ) : (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${barHeight}px` }}
                          className={cn("absolute bottom-0 w-full transition-colors", selected === opt ? "bg-brand" : "bg-brand/45")}
                        />
                      )}
                    </div>
                    <span className="text-center text-xs font-bold text-slate-500">{opt}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {activeFormat === GameFormat.HOTSPOT && (
        <div className="space-y-4">
          <div className={cn(
            "relative h-72 overflow-hidden rounded-2xl border-2",
            settings.darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"
          )}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200/40 via-transparent to-blue-200/40" />
            {activeData.options.map((opt, i) => {
              const position = HOTSPOT_LAYOUT[i % HOTSPOT_LAYOUT.length];
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  onClick={() => handleSelectOption(opt)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-4 py-3 text-sm font-black shadow-lg transition-all",
                    selected === opt
                      ? "border-brand bg-brand text-white"
                      : settings.darkMode
                        ? "border-slate-600 bg-slate-900 text-slate-200 hover:border-brand/60"
                        : "border-white bg-white/95 text-slate-700 hover:border-brand/60"
                  )}
                >
                  {i + 1}
                </motion.button>
              );
            })}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {activeData.options.map((opt, i) => (
              <button
                key={`hotspot-label-${i}`}
                onClick={() => handleSelectOption(opt)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-bold transition-all",
                  selected === opt
                    ? "border-brand bg-brand/10 text-brand"
                    : settings.darkMode
                      ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-brand/60"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand/60"
                )}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-700">
                  {i + 1}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFormat === GameFormat.PIE_SLICER && (
        <div className="flex flex-col items-center gap-6">
          <div className={cn(
            "relative h-56 w-56 rounded-full border-4 shadow-inner",
            settings.darkMode ? "border-slate-700" : "border-slate-200"
          )} style={{ backgroundImage: buildPieGradient(Math.max(activeData.options.length, 2)) }}>
            <div
              className={cn(
                "absolute inset-[30%] flex items-center justify-center rounded-full text-center text-xs font-black",
                settings.darkMode ? "bg-slate-900 text-slate-200" : "bg-white text-slate-700"
              )}
            >
              {selected ? 'Slice selected' : 'Pick a slice'}
            </div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            {activeData.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-black transition-all",
                  selected === opt 
                    ? "border-brand bg-brand text-white shadow-lg" 
                    : (settings.darkMode ? "border-slate-700 bg-slate-800 text-slate-400" : "border-slate-200 bg-white text-slate-500")
                )}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: PIE_SEGMENT_COLORS[i % PIE_SEGMENT_COLORS.length] }}
                />
                <span className="leading-snug">{opt}</span>
              </button>
            ))}
          </div>
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

      {feedback && (
        <div ref={feedbackRef}>
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
        </div>
      )}

      {/* Always show remedial content after feedback, before navigation */}
      {feedback && (
        <div className={cn(
          "mt-6 rounded-2xl p-5 shadow-inner",
          settings.darkMode ? "bg-slate-800 text-white" : "bg-slate-50 text-slate-900"
        )}>
          {/* Brief explanation */}
          {activeData.remedialBrief && (
            <div className="mb-2 font-bold text-base">
              {activeData.remedialBrief}
            </div>
          )}
          {/* Detailed explanation */}
          {activeData.remedialDetail && (
            <div className="mb-2 text-sm">
              {activeData.remedialDetail}
            </div>
          )}
          {/* Structured remedial content */}
          {activeData.remedialContent && (
            <div className="mt-2">
              {/* Core Concept */}
              {activeData.remedialContent.coreConcept && (
                <div className="mb-2">
                  <div className="font-semibold">{activeData.remedialContent.coreConcept.title || 'Core Concept'}</div>
                  <ul className="list-disc ml-5">
                    {(activeData.remedialContent.coreConcept.points || []).map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Step-by-Step */}
              {activeData.remedialContent.stepByStep && (
                <div className="mb-2">
                  <div className="font-semibold">{activeData.remedialContent.stepByStep.title || 'Step-by-Step'}</div>
                  <ol className="list-decimal ml-5">
                    {(activeData.remedialContent.stepByStep.steps || []).map((step: string, idx: number) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {/* Expandable sections */}
              {activeData.remedialContent.expandable && (
                <details className="mt-2">
                  <summary className="cursor-pointer font-semibold">{activeData.remedialContent.expandable.buttonLabel || 'Show more examples and background'}</summary>
                  {(activeData.remedialContent.expandable.sections || []).map((section: any, idx: number) => (
                    <div key={idx} className="mt-2">
                      <div className="font-semibold">{section.title}</div>
                      <ul className="list-disc ml-5">
                        {(section.points || []).map((point: string, j: number) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
