import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Eye, Type, Palette, AlignJustify } from 'lucide-react';
import { LearningStyle, AccessibilityMode } from '../types';
import { cn } from '../lib/utils';

interface AccessibilityOption {
  id: AccessibilityMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface PaceOption {
  id: 'slow' | 'medium' | 'fast';
  label: string;
  description: string;
}

interface PersonalizationOptions {
  learningStyle: LearningStyle;
  accessibilityModes: AccessibilityMode[];
  pacePref: 'slow' | 'medium' | 'fast';
  contentType: 'images' | 'videos' | 'text' | 'interactive' | 'mixed';
  feedbackStyle: 'immediate' | 'summary' | 'delayed';
  textSize: 'small' | 'medium' | 'large' | 'xLarge';
  lineSpacing: 'normal' | 'relaxed' | 'wide';
}

interface Props {
  onChange: (options: PersonalizationOptions) => void;
  initialOptions?: Partial<PersonalizationOptions>;
}

const ACCESSIBILITY_OPTIONS: AccessibilityOption[] = [
  {
    id: 'highContrast',
    label: 'High Contrast',
    description: 'Increased color contrast for better visibility',
    icon: <Eye size={20} />
  },
  {
    id: 'dyslexia',
    label: 'Dyslexia Mode',
    description: 'Special fonts and spacing for dyslexic readers',
    icon: <Type size={20} />
  },
  {
    id: 'colorblind',
    label: 'Color-Blind Mode',
    description: 'Color palette adjusted for color blindness',
    icon: <Palette size={20} />
  },
  {
    id: 'reducedMotion',
    label: 'Reduced Motion',
    description: 'Minimizes animations and transitions',
    icon: <span className="text-base">🐢</span>
  },
  {
    id: 'boldText',
    label: 'Bold Text',
    description: 'Makes text heavier and easier to scan',
    icon: <span className="text-base font-black">B</span>
  },
  {
    id: 'underlineLinks',
    label: 'Underline Links',
    description: 'Underlines links for clear discoverability',
    icon: <span className="text-base">🔗</span>
  },
  {
    id: 'sepia',
    label: 'Sepia Reading',
    description: 'Warmer reading tone for visual comfort',
    icon: <span className="text-base">📜</span>
  }
];

const PACE_OPTIONS: PaceOption[] = [
  {
    id: 'slow',
    label: 'Slow',
    description: 'Take your time, no rush'
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Balanced, steady pace'
  },
  {
    id: 'fast',
    label: 'Fast',
    description: 'Move quickly through content'
  }
];

const LEARNING_STYLES = ['visual', 'auditory', 'readWrite', 'kinesthetic'];
const CONTENT_TYPES = ['images', 'videos', 'text', 'interactive', 'mixed'];
const FEEDBACK_STYLES = ['immediate', 'summary', 'delayed'];

export function PersonalizationPanel({ onChange, initialOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<PersonalizationOptions>({
    learningStyle: initialOptions?.learningStyle || 'visual',
    accessibilityModes: initialOptions?.accessibilityModes || [],
    pacePref: initialOptions?.pacePref || 'medium',
    contentType: initialOptions?.contentType || 'mixed',
    feedbackStyle: initialOptions?.feedbackStyle || 'immediate',
    textSize: initialOptions?.textSize || 'medium',
    lineSpacing: initialOptions?.lineSpacing || 'normal',
  });

  useEffect(() => {
    if (initialOptions) {
      setOptions((prev) => ({
        ...prev,
        ...initialOptions,
      }));
    }
  }, [initialOptions]);

  const updateOption = <K extends keyof PersonalizationOptions>(key: K, value: PersonalizationOptions[K]) => {
    const next = { ...options, [key]: value };
    setOptions(next);
    onChange(next);
  };

  const toggleAccessibility = (mode: AccessibilityMode) => {
    const nextModes = options.accessibilityModes.includes(mode)
      ? options.accessibilityModes.filter((m) => m !== mode)
      : [...options.accessibilityModes, mode];
    updateOption('accessibilityModes', nextModes);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex w-full items-center justify-between rounded-2xl p-4 transition-all',
          'bg-slate-100 border-2 border-slate-200 hover:border-brand'
        )}
      >
        <div className="flex items-center gap-3">
          <Settings size={24} />
          <div className="text-left">
            <div className="font-bold text-slate-900">Personalization Settings</div>
            <div className="text-xs text-slate-600">Opens mission-style settings modal. Changes apply instantly.</div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              className="w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white/95 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-5 sm:px-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Personalization Settings</h3>
                  <p className="text-xs text-slate-500">Click any option to apply immediately. No save needed.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[72vh] space-y-6 overflow-y-auto p-5 sm:p-8">
                <div>
                  <label className="mb-3 block font-bold text-slate-900">📚 Preferred Learning Style</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {LEARNING_STYLES.map((style) => (
                      <button
                        key={style}
                        onClick={() => updateOption('learningStyle', style as LearningStyle)}
                        className={cn(
                          'rounded-xl border-2 py-2 px-3 text-sm font-semibold transition-all',
                          options.learningStyle === style
                            ? 'border-brand bg-brand text-white shadow-lg'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">♿ Accessibility Modes (Multi-select)</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ACCESSIBILITY_OPTIONS.map((opt) => {
                      const selected = options.accessibilityModes.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleAccessibility(opt.id)}
                          className={cn(
                            'rounded-xl border-2 p-3 text-left transition-all',
                            selected
                              ? 'border-brand bg-brand text-white shadow-lg'
                              : 'border-slate-200 bg-white text-slate-900 hover:border-brand'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>{opt.icon}</span>
                            <div>
                              <div className="font-semibold">{opt.label}</div>
                              <div className={cn('text-xs', selected ? 'text-white/85' : 'text-slate-600')}>
                                {opt.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">🔠 Text Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'small', label: 'S' },
                      { id: 'medium', label: 'M' },
                      { id: 'large', label: 'L' },
                      { id: 'xLarge', label: 'XL' },
                    ].map((size) => (
                      <button
                        key={size.id}
                        onClick={() => updateOption('textSize', size.id as PersonalizationOptions['textSize'])}
                        className={cn(
                          'rounded-xl border-2 py-2 text-sm font-bold transition-all',
                          options.textSize === size.id
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">↕ Line Spacing</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'normal', label: 'Normal' },
                      { id: 'relaxed', label: 'Relaxed' },
                      { id: 'wide', label: 'Wide' },
                    ].map((spacing) => (
                      <button
                        key={spacing.id}
                        onClick={() => updateOption('lineSpacing', spacing.id as PersonalizationOptions['lineSpacing'])}
                        className={cn(
                          'flex items-center justify-center gap-1 rounded-xl border-2 py-2 text-sm font-bold transition-all',
                          options.lineSpacing === spacing.id
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        <AlignJustify size={14} />
                        {spacing.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">🚀 Learning Pace</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PACE_OPTIONS.map((pace) => (
                      <button
                        key={pace.id}
                        onClick={() => updateOption('pacePref', pace.id)}
                        className={cn(
                          'rounded-xl border-2 py-3 px-2 text-center transition-all',
                          options.pacePref === pace.id
                            ? 'border-brand bg-brand text-white shadow-lg'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        <div className="font-semibold text-sm">{pace.label}</div>
                        <div className={cn('text-xs', options.pacePref === pace.id ? 'text-white/85' : 'text-slate-600')}>
                          {pace.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">🎨 Content Preference</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateOption('contentType', type as PersonalizationOptions['contentType'])}
                        className={cn(
                          'rounded-xl border-2 py-2 px-2 text-xs font-semibold transition-all',
                          options.contentType === type
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-bold text-slate-900">💬 Feedback Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FEEDBACK_STYLES.map((style) => (
                      <button
                        key={style}
                        onClick={() => updateOption('feedbackStyle', style as PersonalizationOptions['feedbackStyle'])}
                        className={cn(
                          'rounded-xl border-2 py-2 px-2 text-center text-sm font-semibold transition-all',
                          options.feedbackStyle === style
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        )}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200/70 px-6 py-4 sm:px-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
