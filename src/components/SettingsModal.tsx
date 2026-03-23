import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Volume2, VolumeX, Zap, ZapOff, RotateCcw, LogOut, Palette } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { GameFormat } from '../types';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { session, updateSettings, updateSession, clearSession, resetProgress } = useSessionStore();
  const navigate = useNavigate();

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  if (!session) return null;

  const settings = {
    darkMode: false,
    enabledMechanics: [],
    soundEnabled: true,
    vfxEnabled: true,
    themeColor: '#3b82f6',
    assessmentStyle: 'balanced',
    ...session.settings
  };

  const enabledMechanics = settings.enabledMechanics || [];

  const toggleMechanic = (format: GameFormat) => {
    const current = enabledMechanics;
    const next = current.includes(format)
      ? current.filter(f => f !== format)
      : [...current, format];
    
    if (next.length === 0) return; // Must have at least one
    updateSettings({ enabledMechanics: next });
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

            <div className="max-h-[70vh] overflow-y-auto p-8">
              <div className="grid gap-10 md:grid-cols-2">
                {/* Game Mechanics */}
                <section>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                    Game Mechanics
                  </h3>
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

                <div className="space-y-10">
                  {/* Preferences */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                      Preferences
                    </h3>
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
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${settings.vfxEnabled ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        {settings.vfxEnabled ? <Zap size={24} /> : <ZapOff size={24} />}
                        <span className="text-xs font-bold">Visual FX</span>
                      </button>
                      <button
                        onClick={handleRetakePreTest}
                        className="flex flex-col items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-4 text-slate-500 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <RotateCcw size={24} />
                        <span className="text-xs font-bold">Retake Pre-Test</span>
                      </button>
                    </div>
                  </section>

                  {/* Theme Color */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                      Theme Color
                    </h3>
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
                  </section>

                  {/* Assessment Style */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                      Assessment Style
                    </h3>
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
                  </section>

                  {/* Content Mode */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                      Learning Mode
                    </h3>
                    <div className="flex rounded-2xl bg-slate-100 p-1">
                      {[
                        { id: 'video', label: 'Video First' },
                        { id: 'text', label: 'Text First' }
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
                  </section>

                  {/* Assessment Timing */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                      Assessment Timing
                    </h3>
                    <div className="flex rounded-2xl bg-slate-100 p-1">
                      {[
                        { id: 'inModule', label: 'After each part' },
                        { id: 'endOfModule', label: 'At the end' }
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
                  </section>
                </div>
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
