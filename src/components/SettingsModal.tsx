import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Volume2, VolumeX, Zap, ZapOff, RotateCcw, LogOut, Palette, Eye, Type, AlignJustify } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { AccessibilityMode, GameFormat } from '../types';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsCategory =
  | 'mechanics'
  | 'preferences'
  | 'accessibility'
  | 'display'
  | 'assessment'
  | 'account';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { session, updateSettings, updateSession, clearSession, resetProgress } = useSessionStore();
  const navigate = useNavigate();

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<SettingsCategory>('mechanics');

  if (!session) return null;

  const rawSettings = session.settings || ({} as any);
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
    soundEnabled: rawSettings.soundEnabled ?? true,
    vfxEnabled: rawSettings.vfxEnabled ?? true,
    themeColor: rawSettings.themeColor || '#3b82f6',
    assessmentStyle: rawSettings.assessmentStyle || 'balanced',
    contentMode: rawSettings.contentMode || 'video',
    assessmentTime: rawSettings.assessmentTime || 'inModule',
    accessibilityModes: rawSettings.accessibilityModes || [],
    textSize: rawSettings.textSize || 'medium',
    lineSpacing: rawSettings.lineSpacing || 'normal',
  };

  const enabledMechanics = settings.enabledMechanics || [];
  const accessibilityModes = settings.accessibilityModes || [];

  const toggleMechanic = (format: GameFormat) => {
    const current = enabledMechanics;
    const next = current.includes(format)
      ? current.filter(f => f !== format)
      : [...current, format];
    
    if (next.length === 0) return; // Must have at least one
    updateSettings({ enabledMechanics: next });
  };

  const toggleAccessibilityMode = (mode: AccessibilityMode) => {
    const next = accessibilityModes.includes(mode)
      ? accessibilityModes.filter((m: string) => m !== mode)
      : [...accessibilityModes, mode];
    updateSettings({ accessibilityModes: next as any });
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    onClose();
    navigate('/pre-test');
  };

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const handleRetakePreTest = () => {
    updateSession({ preTestDone: false });
    onClose();
    navigate('/pre-test');
  };

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Green', value: '#22c55e' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white/90 shadow-2xl backdrop-blur-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200/50 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Mission Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[220px,1fr] md:gap-8">
              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
                {[
                  { id: 'mechanics', label: 'Game Mechanics' },
                  { id: 'preferences', label: 'Preferences' },
                  { id: 'accessibility', label: 'Accessibility' },
                  { id: 'display', label: 'Display' },
                  { id: 'assessment', label: 'Assessment' },
                  { id: 'account', label: 'Account' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCategory(item.id as SettingsCategory)}
                    className={`mb-1 w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition-all ${activeCategory === item.id ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </aside>

              <div className="min-h-[420px] rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                {activeCategory === 'mechanics' && (
                  <section>
                    <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Game Mechanics</h3>
                    <div className="space-y-2">
                      {Object.values(GameFormat).map((format) => (
                        <label
                          key={format}
                          className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-slate-100 bg-white p-4 transition-all hover:border-blue-200"
                        >
                          <span className="font-bold capitalize text-slate-700">{format.replace('_', ' ')}</span>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={enabledMechanics.includes(format)}
                              onChange={() => toggleMechanic(format)}
                            />
                            <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-brand peer-checked:after:translate-x-full" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                )}

                {activeCategory === 'preferences' && (
                  <section>
                    <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Preferences</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${settings.darkMode ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        {settings.darkMode ? <Moon size={24} /> : <Sun size={24} />}
                        <span className="text-xs font-bold">Dark Mode</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${settings.soundEnabled ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        {settings.soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        <span className="text-xs font-bold">Sound FX</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ vfxEnabled: !settings.vfxEnabled })}
                        className={`col-span-2 flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${settings.vfxEnabled ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        {settings.vfxEnabled ? <Zap size={24} /> : <ZapOff size={24} />}
                        <span className="text-xs font-bold">Visual FX</span>
                      </button>
                    </div>
                  </section>
                )}

                {activeCategory === 'accessibility' && (
                  <section>
                    <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Accessibility</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'highContrast', label: 'High Contrast', icon: <Eye size={18} /> },
                        { id: 'dyslexia', label: 'Dyslexia Mode', icon: <Type size={18} /> },
                        { id: 'colorblind', label: 'Color-Blind Mode', icon: <Palette size={18} /> },
                        { id: 'reducedMotion', label: 'Reduced Motion', icon: <span className="text-base">🐢</span> },
                        { id: 'boldText', label: 'Bold Text', icon: <span className="text-base font-black">B</span> },
                        { id: 'underlineLinks', label: 'Underline Links', icon: <span className="text-base">🔗</span> },
                        { id: 'sepia', label: 'Sepia Reading', icon: <span className="text-base">📜</span> },
                      ].map((mode) => {
                        const selected = accessibilityModes.includes(mode.id);
                        return (
                          <button
                            key={mode.id}
                            onClick={() => toggleAccessibilityMode(mode.id as AccessibilityMode)}
                            className={`flex items-center justify-between rounded-2xl border-2 p-3 transition-all ${selected ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-white text-slate-600'}`}
                          >
                            <span className="flex items-center gap-2 text-sm font-bold">
                              {mode.icon}
                              {mode.label}
                            </span>
                            <span className={`h-5 w-5 rounded-full border-2 ${selected ? 'border-brand bg-brand' : 'border-slate-300'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {activeCategory === 'display' && (
                  <section className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Theme Color</h3>
                      <div className="flex flex-wrap gap-3">
                        {colors.map((c) => (
                          <button
                            key={c.value}
                            onClick={() => updateSettings({ themeColor: c.value })}
                            className={`h-10 w-10 rounded-full border-4 transition-all hover:scale-110 ${settings.themeColor === c.value ? 'border-white ring-2 ring-slate-900' : 'border-transparent'}`}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Text Size</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {[
                          { id: 'small', label: 'S' },
                          { id: 'medium', label: 'M' },
                          { id: 'large', label: 'L' },
                          { id: 'xLarge', label: 'XL' },
                        ].map((size) => (
                          <button
                            key={size.id}
                            onClick={() => updateSettings({ textSize: size.id as any })}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${settings.textSize === size.id ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Line Spacing</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {[
                          { id: 'normal', label: 'Normal', icon: <AlignJustify size={14} /> },
                          { id: 'relaxed', label: 'Relaxed', icon: <AlignJustify size={14} /> },
                          { id: 'wide', label: 'Wide', icon: <AlignJustify size={14} /> },
                        ].map((spacing) => (
                          <button
                            key={spacing.id}
                            onClick={() => updateSettings({ lineSpacing: spacing.id as any })}
                            className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition-all ${settings.lineSpacing === spacing.id ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {spacing.icon}
                            {spacing.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {activeCategory === 'assessment' && (
                  <section className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Assessment Style</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {['gamified', 'traditional', 'balanced'].map((style) => (
                          <button
                            key={style}
                            onClick={() => updateSettings({ assessmentStyle: style as any })}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize transition-all ${settings.assessmentStyle === style ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Learning Mode</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {[
                          { id: 'video', label: 'Video First' },
                          { id: 'text', label: 'Text First' },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => updateSettings({ contentMode: mode.id as any })}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${settings.contentMode === mode.id ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Assessment Timing</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {[
                          { id: 'inModule', label: 'After each part' },
                          { id: 'endOfModule', label: 'At the end' },
                        ].map((time) => (
                          <button
                            key={time.id}
                            onClick={() => updateSettings({ assessmentTime: time.id as any })}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${settings.assessmentTime === time.id ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {time.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {activeCategory === 'account' && (
                  <section>
                    <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Account Actions</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        onClick={handleRetakePreTest}
                        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-4 text-slate-600 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <RotateCcw size={20} />
                        <span className="text-sm font-bold">Retake Pre-Test</span>
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-600 transition-all hover:bg-amber-100"
                      >
                        <RotateCcw size={20} />
                        <span className="text-sm font-bold">Reset Progress</span>
                      </button>
                    </div>
                  </section>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/50 bg-slate-50/50 px-8 py-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-bold text-red-500 hover:text-red-600"
                >
                  <LogOut size={20} />
                  Logout
                </button>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 font-bold text-amber-500 hover:text-amber-600"
                >
                  <RotateCcw size={20} />
                  Reset Progress
                </button>
              </div>
              <button
                onClick={onClose}
                className="rounded-2xl bg-slate-900 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95"
              >
                Done
              </button>
            </div>

            <AnimatePresence>
              {showResetConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-8 text-center backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="max-w-xs rounded-3xl bg-white p-8 shadow-2xl"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <RotateCcw size={32} />
                    </div>
                    <h3 className="mb-2 text-xl font-black text-slate-900">Reset Progress?</h3>
                    <p className="mb-6 text-sm text-slate-500">This will clear all your scores and mission progress. You'll start from the pre-test again.</p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleResetProgress}
                        className="w-full rounded-2xl bg-amber-500 py-3 font-bold text-white shadow-lg hover:bg-amber-600"
                      >
                        Yes, Reset Everything
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
