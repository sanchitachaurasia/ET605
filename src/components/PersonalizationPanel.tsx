import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Eye, Users, Volume2, Zap, Palette } from 'lucide-react';
import { LearningStyle, AccessibilityLevel } from '../types';
import { cn } from '../lib/utils';

interface AccessibilityOption {
  id: AccessibilityLevel;
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
  accessibility: AccessibilityLevel;
  pacePref: 'slow' | 'medium' | 'fast';
  contentType: 'images' | 'videos' | 'text' | 'interactive' | 'mixed';
  feedbackStyle: 'immediate' | 'summary' | 'delayed';
}

interface Props {
  onSave: (options: PersonalizationOptions) => void;
  initialOptions?: Partial<PersonalizationOptions>;
}

const ACCESSIBILITY_OPTIONS: AccessibilityOption[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Normal colors and contrast',
    icon: <Palette size={20} />
  },
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
    icon: <Users size={20} />
  },
  {
    id: 'colorblind',
    label: 'Color-Blind Mode',
    description: 'Color palette adjusted for color blindness',
    icon: <Zap size={20} />
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

export function PersonalizationPanel({ onSave, initialOptions }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [options, setOptions] = useState<PersonalizationOptions>({
    learningStyle: initialOptions?.learningStyle || 'visual',
    accessibility: initialOptions?.accessibility || 'standard',
    pacePref: initialOptions?.pacePref || 'medium',
    contentType: initialOptions?.contentType || 'mixed',
    feedbackStyle: initialOptions?.feedbackStyle || 'immediate'
  });

  const handleSave = () => {
    onSave(options);
    setExpanded(false);
  };

  return (
    <div className="space-y-4">
      {/* Panel Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'flex w-full items-center justify-between rounded-2xl p-4 transition-all',
          expanded
            ? 'bg-gradient-to-r from-brand/10 to-purple-100 border-2 border-brand'
            : 'bg-slate-100 border-2 border-slate-200 hover:border-brand'
        )}
      >
        <div className="flex items-center gap-3">
          <Settings className={cn(
            'transition-transform',
            expanded && 'rotate-180'
          )} size={24} />
          <div className="text-left">
            <div className="font-bold text-slate-900">Personalization Settings</div>
            <div className="text-xs text-slate-600">Adapt your learning experience</div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 border border-slate-200"
          >
            {/* Learning Style */}
            <div>
              <label className="mb-3 block font-bold text-slate-900">
                📚 Preferred Learning Style
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LEARNING_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setOptions({ ...options, learningStyle: style as LearningStyle })}
                    className={cn(
                      'rounded-xl py-2 px-3 text-sm font-semibold transition-all',
                      options.learningStyle === style
                        ? 'bg-brand text-white shadow-lg'
                        : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-brand'
                    )}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <label className="mb-3 block font-bold text-slate-900">
                ♿ Accessibility Mode
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {ACCESSIBILITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setOptions({ ...options, accessibility: opt.id })}
                    className={cn(
                      'rounded-xl p-3 text-left transition-all border-2',
                      options.accessibility === opt.id
                        ? 'bg-brand text-white border-brand shadow-lg'
                        : 'bg-white text-slate-900 border-slate-200 hover:border-brand'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{opt.icon}</span>
                      <div>
                        <div className="font-semibold">{opt.label}</div>
                        <div className={cn(
                          'text-xs',
                          options.accessibility === opt.id ? 'text-white/80' : 'text-slate-600'
                        )}>
                          {opt.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pace Preference */}
            <div>
              <label className="mb-3 block font-bold text-slate-900">
                🚀 Learning Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PACE_OPTIONS.map((pace) => (
                  <button
                    key={pace.id}
                    onClick={() => setOptions({ ...options, pacePref: pace.id })}
                    className={cn(
                      'rounded-xl py-3 px-2 text-center transition-all border-2',
                      options.pacePref === pace.id
                        ? 'bg-brand text-white border-brand shadow-lg'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand'
                    )}
                  >
                    <div className="font-semibold text-sm">{pace.label}</div>
                    <div className="text-xs text-slate-600">{pace.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Type */}
            <div>
              <label className="mb-3 block font-bold text-slate-900">
                🎨 Content Preference
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {CONTENT_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setOptions({ ...options, contentType: type as any })}
                    className={cn(
                      'rounded-xl py-2 px-2 text-xs font-semibold transition-all border-2',
                      options.contentType === type
                        ? 'bg-brand text-white border-brand'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand'
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Style */}
            <div>
              <label className="mb-3 block font-bold text-slate-900">
                💬 Feedback Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FEEDBACK_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setOptions({ ...options, feedbackStyle: style as any })}
                    className={cn(
                      'rounded-xl py-2 px-2 text-center text-sm font-semibold transition-all border-2',
                      options.feedbackStyle === style
                        ? 'bg-brand text-white border-brand'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand'
                    )}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 rounded-xl bg-brand py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setExpanded(false)}
                className="rounded-xl border-2 border-slate-200 py-3 px-4 font-bold text-slate-700 transition-all hover:border-slate-400"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
