import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Volume2, VolumeX, Zap, ZapOff, RotateCcw, LogOut, Palette, Eye, Type, AlignJustify, Gamepad2, SlidersHorizontal, ShieldCheck, Monitor, ClipboardCheck, UserCog, Download } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { AccessibilityMode, GameFormat } from '../types';
import { useNavigate } from 'react-router-dom';
import { checkUserIdAvailability, changeMyUserId, firebaseAuth, sendResetPasswordEmail } from '../lib/firebaseAuth';
import { trackTelemetryEvent } from '../analytics/telemetry';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityExportUrl?: string;
}

type SettingsCategory =
  | 'mechanics'
  | 'preferences'
  | 'accessibility'
  | 'display'
  | 'assessment'
  | 'account';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, activityExportUrl }) => {
  const { session, updateSettings, updateSession, clearSession, resetProgress } = useSessionStore();
  const navigate = useNavigate();

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<SettingsCategory>('mechanics');
  const [profileName, setProfileName] = React.useState('');
  const [profileSchool, setProfileSchool] = React.useState('');
  const [profileClass, setProfileClass] = React.useState('');
  const [profileUserId, setProfileUserId] = React.useState('');
  const [userIdHint, setUserIdHint] = React.useState('Choose a unique User ID (4-24 chars: letters, numbers, . _ -).');
  const [userIdAvailable, setUserIdAvailable] = React.useState<boolean | null>(null);
  const [checkingUserId, setCheckingUserId] = React.useState(false);
  const [savingUserId, setSavingUserId] = React.useState(false);
  const [accountMessage, setAccountMessage] = React.useState('');
  const [accountError, setAccountError] = React.useState('');
  const firstControlRef = React.useRef<HTMLElement | null>(null);
  const contentPanelRef = React.useRef<HTMLDivElement | null>(null);
  const lastCategoryScrollSwitchAtRef = React.useRef(0);

  const categoryOrder: SettingsCategory[] = [
    'mechanics',
    'preferences',
    'accessibility',
    'display',
    'assessment',
    'account',
  ];

  React.useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => {
      firstControlRef.current?.focus();
    }, 40);
    return () => window.clearTimeout(id);
  }, [activeCategory, isOpen]);

  React.useEffect(() => {
    if (!isOpen || !session) return;
    setProfileName(session.name || '');
    setProfileSchool(session.school || '');
    setProfileClass(session.class || '');
    setProfileUserId(String((session as any).userId || session.studentId || '').trim().toLowerCase());
    setUserIdHint('Choose a unique User ID (4-24 chars: letters, numbers, . _ -).');
    setUserIdAvailable(null);
    setCheckingUserId(false);
    setSavingUserId(false);
    setAccountMessage('');
    setAccountError('');
  }, [isOpen, session]);

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
    updateSession({
      preTestRetakeInProgress: true,
      preTestProgress: null,
    });
    onClose();
    navigate('/pre-test');
  };

  const handleProfileSave = () => {
    setAccountError('');
    setAccountMessage('');

    const trimmedName = profileName.trim();
    const trimmedSchool = profileSchool.trim();
    const trimmedClass = profileClass.trim();
    const previousName = String(session.name || '').trim();
    const previousSchool = String(session.school || '').trim();
    const previousClass = String(session.class || '').trim();

    if (!trimmedName) {
      setAccountError('Name is required.');
      return;
    }

    updateSession({
      name: trimmedName,
      school: trimmedSchool,
      class: trimmedClass,
    });

    const changedFields: string[] = [];
    if (trimmedName !== previousName) changedFields.push('name');
    if (trimmedSchool !== previousSchool) changedFields.push('school');
    if (trimmedClass !== previousClass) changedFields.push('class');

    if (changedFields.length > 0) {
      trackTelemetryEvent('profile_updated', {
        event_data: {
          changed_fields: changedFields,
          previous: {
            name: previousName,
            school: previousSchool,
            class: previousClass,
          },
          next: {
            name: trimmedName,
            school: trimmedSchool,
            class: trimmedClass,
          },
          source: 'settings_account',
        },
      });
    }

    setAccountMessage('Profile updated successfully.');
  };

  const handlePasswordChange = async () => {
    setAccountError('');
    setAccountMessage('');

    const email = firebaseAuth.currentUser?.email || (session as any)?.email;
    if (!email) {
      setAccountError('No account email found. Please login again and try.');
      return;
    }

    const result = await sendResetPasswordEmail(email);
    if (result.success) {
      trackTelemetryEvent('password_reset_requested', {
        event_data: {
          source: 'settings_account',
          email_present: Boolean(email),
        },
      });
      setAccountMessage('Password reset link sent to your email.');
    } else {
      setAccountError(result.error || 'Could not send reset link.');
    }
  };

  const handleCheckUserId = async () => {
    const normalized = profileUserId.trim().toLowerCase();
    const currentUserId = String((session as any)?.userId || '').trim().toLowerCase();

    if (!normalized) {
      setUserIdAvailable(null);
      setUserIdHint('User ID is required.');
      return;
    }

    if (!/^[a-z0-9_.-]{4,24}$/.test(normalized)) {
      setUserIdAvailable(false);
      setUserIdHint('User ID must be 4-24 chars: letters, numbers, . _ -');
      return;
    }

    if (normalized === currentUserId) {
      setUserIdAvailable(true);
      setUserIdHint('This is your current User ID.');
      return;
    }

    setCheckingUserId(true);
    const result = await checkUserIdAvailability(normalized);
    setCheckingUserId(false);

    if (!result.success) {
      setUserIdAvailable(null);
      setUserIdHint(result.message || 'Could not validate User ID right now.');
      return;
    }

    setUserIdAvailable(result.available);
    setUserIdHint(result.message || (result.available ? 'User ID is available' : 'User ID already taken'));
  };

  const handleUserIdSave = async () => {
    setAccountError('');
    setAccountMessage('');

    const normalized = profileUserId.trim().toLowerCase();
    const currentUserId = String((session as any)?.userId || '').trim().toLowerCase();

    if (!normalized) {
      setAccountError('User ID is required.');
      return;
    }

    if (!/^[a-z0-9_.-]{4,24}$/.test(normalized)) {
      setAccountError('User ID must be 4-24 chars: letters, numbers, . _ -');
      return;
    }

    if (normalized !== currentUserId && userIdAvailable === false) {
      setAccountError('User ID already taken. Choose another one.');
      return;
    }

    setSavingUserId(true);
    const result = await changeMyUserId(normalized);
    setSavingUserId(false);

    if (!result.success) {
      setAccountError(result.error || 'Failed to update User ID.');
      return;
    }

    updateSession({ userId: result.userId || normalized } as any);
    setUserIdAvailable(true);
    setUserIdHint('User ID updated successfully.');
    setAccountMessage(result.message || 'User ID updated successfully.');
  };

  const handleCategoryWheelNavigation = (e: React.WheelEvent<HTMLDivElement>) => {
    const panel = contentPanelRef.current;
    if (!panel) return;

    const isScrollingDown = e.deltaY > 8;
    const isScrollingUp = e.deltaY < -8;
    if (!isScrollingDown && !isScrollingUp) return;

    const atTop = panel.scrollTop <= 2;
    const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;
    if (!(isScrollingDown && atBottom) && !(isScrollingUp && atTop)) {
      return;
    }

    const now = Date.now();
    if (now - lastCategoryScrollSwitchAtRef.current < 420) {
      return;
    }

    const currentIndex = categoryOrder.indexOf(activeCategory);
    if (currentIndex === -1) return;

    const nextIndex = isScrollingDown
      ? Math.min(currentIndex + 1, categoryOrder.length - 1)
      : Math.max(currentIndex - 1, 0);

    if (nextIndex === currentIndex) return;

    e.preventDefault();
    lastCategoryScrollSwitchAtRef.current = now;
    setActiveCategory(categoryOrder[nextIndex]);
    panel.scrollTo({ top: 0 });
  };

  const themePalettes = [
    { name: 'Blue', value: '#3b82f6', tone: 'vivid' },
    { name: 'Indigo', value: '#6366f1', tone: 'vivid' },
    { name: 'Purple', value: '#a855f7', tone: 'vivid' },
    { name: 'Rose', value: '#f43f5e', tone: 'vivid' },
    { name: 'Orange', value: '#f97316', tone: 'vivid' },
    { name: 'Green', value: '#22c55e', tone: 'vivid' },
    { name: 'Mist Blue', value: '#89a7c7', tone: 'soft' },
    { name: 'Sage', value: '#8bb7a8', tone: 'soft' },
    { name: 'Blush', value: '#d7a0a7', tone: 'soft' },
    { name: 'Lavender', value: '#b3addf', tone: 'soft' },
    { name: 'Sand', value: '#c9b28f', tone: 'soft' },
    { name: 'Peach', value: '#d9ad92', tone: 'soft' },
  ] as const;

  const vividPalettes = themePalettes.filter((color) => color.tone === 'vivid');
  const softPalettes = themePalettes.filter((color) => color.tone === 'soft');

  const mechanicMeta: Record<GameFormat, { label: string; description: string }> = {
    [GameFormat.RAINDROP]: {
      label: 'Raindrop Catch',
      description: 'Catch correct falling options quickly.',
    },
    [GameFormat.DRAG_SORT]: {
      label: 'Drag & Sort',
      description: 'Drag items into the right group.',
    },
    [GameFormat.SPIN_WHEEL]: {
      label: 'Spin Wheel',
      description: 'Spin and answer based on outcomes.',
    },
    [GameFormat.BAR_BUILDER]: {
      label: 'Bar Builder',
      description: 'Read and compare bar values.',
    },
    [GameFormat.HOTSPOT]: {
      label: 'Hotspot',
      description: 'Tap the correct value hotspot.',
    },
    [GameFormat.PIE_SLICER]: {
      label: 'Pie Slicer',
      description: 'Interpret pie slices and percentages.',
    },
    [GameFormat.TALLY_TAP]: {
      label: 'Tally Tap',
      description: 'Count tally marks correctly.',
    },
  };

  const renderMechanicPreview = (format: GameFormat) => {
    if (format === GameFormat.RAINDROP) {
      return (
        <div className="relative h-10 w-14 overflow-hidden rounded-lg bg-sky-50">
          <span className="absolute left-1 top-0 text-xs">💧</span>
          <span className="absolute left-6 top-1 text-xs">💧</span>
          <span className="absolute right-1 top-0.5 text-xs">💧</span>
        </div>
      );
    }
    if (format === GameFormat.DRAG_SORT) {
      return (
        <div className="flex h-10 w-14 items-center justify-center gap-1 rounded-lg bg-slate-100 px-1">
          <span className="rounded bg-white px-1 text-[10px] font-bold text-slate-500">3</span>
          <span className="text-[10px] text-slate-400">→</span>
          <span className="rounded bg-white px-1 text-[10px] font-bold text-slate-500">A</span>
        </div>
      );
    }
    if (format === GameFormat.SPIN_WHEEL) {
      return <div className="h-9 w-9 rounded-full bg-[conic-gradient(#ef4444_0deg_120deg,#3b82f6_120deg_290deg,#22c55e_290deg_360deg)]" />;
    }
    if (format === GameFormat.BAR_BUILDER) {
      return (
        <div className="flex h-10 items-end gap-1">
          <span className="w-2 rounded-t bg-brand/50" style={{ height: '35%' }} />
          <span className="w-2 rounded-t bg-brand/70" style={{ height: '65%' }} />
          <span className="w-2 rounded-t bg-brand" style={{ height: '90%' }} />
        </div>
      );
    }
    if (format === GameFormat.HOTSPOT) {
      return (
        <div className="relative h-9 w-14 rounded-lg border border-slate-200 bg-white">
          <span className="absolute left-1 top-1 text-[9px] font-bold text-slate-400">4</span>
          <span className="absolute right-1 top-1 rounded-full bg-brand px-1 text-[8px] font-black text-white">7</span>
          <span className="absolute left-1 bottom-1 text-[9px] font-bold text-slate-400">5</span>
        </div>
      );
    }
    if (format === GameFormat.PIE_SLICER) {
      return <div className="h-9 w-9 rounded-full bg-[conic-gradient(#3b82f6_0deg_180deg,#e2e8f0_180deg_360deg)]" />;
    }
    return <div className="font-mono text-xs tracking-widest text-slate-700">|||| /</div>;
  };

  const categoryConfig: Record<
    SettingsCategory,
    {
      label: string;
      icon: React.ReactNode;
      panelClass: string;
      headingClass: string;
    }
  > = {
    mechanics: {
      label: 'Game Mechanics',
      icon: <Gamepad2 size={16} />,
      panelClass: 'border-blue-100 bg-blue-50/40',
      headingClass: 'text-blue-500',
    },
    preferences: {
      label: 'Preferences',
      icon: <SlidersHorizontal size={16} />,
      panelClass: 'border-violet-100 bg-violet-50/40',
      headingClass: 'text-violet-500',
    },
    accessibility: {
      label: 'Accessibility',
      icon: <ShieldCheck size={16} />,
      panelClass: 'border-emerald-100 bg-emerald-50/40',
      headingClass: 'text-emerald-500',
    },
    display: {
      label: 'Display',
      icon: <Monitor size={16} />,
      panelClass: 'border-amber-100 bg-amber-50/40',
      headingClass: 'text-amber-500',
    },
    assessment: {
      label: 'Assessment',
      icon: <ClipboardCheck size={16} />,
      panelClass: 'border-indigo-100 bg-indigo-50/40',
      headingClass: 'text-indigo-500',
    },
    account: {
      label: 'Account',
      icon: <UserCog size={16} />,
      panelClass: 'border-rose-100 bg-rose-50/40',
      headingClass: 'text-rose-500',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="flex h-[86vh] max-h-[860px] w-full max-w-5xl flex-col overflow-hidden rounded-[2.2rem] border border-[#ddd7ca] bg-white/95 shadow-2xl backdrop-blur-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e2dccf] px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h2 className="app-display text-2xl font-extrabold text-slate-900">Mission Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f1eb] text-slate-700 hover:bg-[#ebe7dc]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-hidden p-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <aside className="rounded-2xl border border-[#ddd7ca] bg-[#f7f5ef] p-2 sm:h-full sm:overflow-y-auto">
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
                    aria-current={activeCategory === item.id ? 'page' : undefined}
                    className={`mb-2 flex h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-bold transition-all ${activeCategory === item.id ? 'bg-slate-900 text-white shadow-sm' : 'border border-transparent text-slate-600 hover:border-[#ddd7ca] hover:bg-white'}`}
                  >
                    <span>{categoryConfig[item.id as SettingsCategory].icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </aside>

              <div
                ref={contentPanelRef}
                onWheel={handleCategoryWheelNavigation}
                className={`h-full min-h-[420px] rounded-2xl border p-4 sm:overflow-y-auto sm:p-5 ${categoryConfig[activeCategory].panelClass}`}
              >
                {activeCategory === 'mechanics' && (
                  <section>
                    <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.mechanics.headingClass}`}>Game Mechanics</h3>
                    <p className="mb-3 text-xs font-semibold text-slate-500">Choose preferred question formats. We use these styles during your journey.</p>
                    <div className="mb-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                      Selected: {enabledMechanics.length} (minimum 1 required)
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {Object.values(GameFormat).map((format, idx) => (
                        <button
                          key={format}
                          ref={(el) => {
                            if (activeCategory === 'mechanics' && idx === 0 && el) {
                              firstControlRef.current = el;
                            }
                          }}
                          onClick={() => toggleMechanic(format)}
                          className={`rounded-2xl border-2 p-3 text-left transition-all ${enabledMechanics.includes(format) ? 'border-brand bg-brand/10 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                        >
                          <div className="mb-2 flex items-start gap-3">
                            <div className="flex items-center gap-2">
                              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${enabledMechanics.includes(format) ? 'bg-brand/20 text-brand' : 'bg-slate-100 text-slate-500'}`}>
                                {renderMechanicPreview(format)}
                              </span>
                              <div>
                                <p className="text-sm font-black text-slate-800">{mechanicMeta[format].label}</p>
                                <p className="text-xs font-medium text-slate-500">{mechanicMeta[format].description}</p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {activeCategory === 'preferences' && (
                  <section>
                    <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.preferences.headingClass}`}>Preferences</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        ref={(el) => {
                          if (activeCategory === 'preferences' && el) {
                            firstControlRef.current = el;
                          }
                        }}
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
                    <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.accessibility.headingClass}`}>Accessibility</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { id: 'highContrast', label: 'High Contrast', icon: <Eye size={18} />, description: 'Increases contrast for better readability.' },
                        { id: 'dyslexia', label: 'Dyslexia Mode', icon: <Type size={18} />, description: 'Uses easier-to-read spacing and typography.' },
                        { id: 'colorblind', label: 'Color-Blind Mode', icon: <Palette size={18} />, description: 'Adjusts colors for better distinguishability.' },
                        { id: 'reducedMotion', label: 'Reduced Motion', icon: <span className="text-base">🐢</span>, description: 'Minimizes animations and motion effects.' },
                        { id: 'boldText', label: 'Bold Text', icon: <span className="text-base font-black">B</span>, description: 'Makes text weight stronger for clarity.' },
                        { id: 'underlineLinks', label: 'Underline Links', icon: <span className="text-base">🔗</span>, description: 'Always underlines links to spot them quickly.' },
                        { id: 'sepia', label: 'Sepia Reading', icon: <span className="text-base">📜</span>, description: 'Applies a warm tone for eye comfort.' },
                      ].map((mode, idx) => {
                        const selected = accessibilityModes.includes(mode.id);
                        return (
                          <button
                            key={mode.id}
                            ref={(el) => {
                              if (activeCategory === 'accessibility' && idx === 0 && el) {
                                firstControlRef.current = el;
                              }
                            }}
                            onClick={() => toggleAccessibilityMode(mode.id as AccessibilityMode)}
                            className={`flex min-h-[104px] items-center justify-center rounded-2xl border-2 p-3 text-center transition-all ${selected ? 'border-brand bg-brand/10 text-brand shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                          >
                            <span className="flex flex-col items-center justify-center gap-2">
                              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${selected ? 'bg-brand/20' : 'bg-slate-100'}`}>
                                {mode.icon}
                              </span>
                              <span className="text-sm font-bold">{mode.label}</span>
                              <span className="text-xs font-medium text-slate-500">{mode.description}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {activeCategory === 'display' && (
                  <section className="space-y-6">
                    <div>
                      <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.display.headingClass}`}>Theme Color</h3>
                      <p className="mb-3 text-xs font-semibold text-slate-500">Choose a vibrant accent or switch to a softer palette for calmer visuals.</p>

                      <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-slate-500">Vivid</p>
                      <div className="mb-4 flex flex-wrap gap-3">
                        {vividPalettes.map((c, idx) => (
                          <button
                            key={c.value}
                            ref={(el) => {
                              if (activeCategory === 'display' && idx === 0 && el) {
                                firstControlRef.current = el;
                              }
                            }}
                            onClick={() => updateSettings({ themeColor: c.value })}
                            className={`h-10 w-10 rounded-full border-4 transition-all hover:scale-110 ${settings.themeColor === c.value ? 'border-white ring-2 ring-slate-900' : 'border-transparent'}`}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-slate-500">Soft</p>
                      <div className="flex flex-wrap gap-3">
                        {softPalettes.map((c) => (
                          <button
                            key={c.value}
                            onClick={() => updateSettings({ themeColor: c.value })}
                            className={`h-10 w-10 rounded-full border-4 transition-all hover:scale-110 ${settings.themeColor === c.value ? 'border-white ring-2 ring-slate-900' : 'border-transparent'}`}
                            style={{ backgroundColor: c.value }}
                            title={`${c.name} (Soft)`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Text Size</h3>
                      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2">
                        {[
                          { id: 'small', label: 'Small', px: 14 },
                          { id: 'medium', label: 'Medium', px: 16 },
                          { id: 'large', label: 'Large', px: 18 },
                          { id: 'xLarge', label: 'Extra Large', px: 19 },
                        ].map((size) => (
                          <button
                            key={size.id}
                            onClick={() => updateSettings({ textSize: size.id as any })}
                            className={`rounded-xl px-3 py-2 text-left transition-all ${settings.textSize === size.id ? 'bg-white text-brand shadow-sm' : 'bg-white/60 text-slate-600 hover:bg-white'}`}
                          >
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">{size.label} ({size.px}px)</p>
                            <p className="font-bold leading-tight" style={{ fontSize: `${size.px}px` }}>Aa 123</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Line Spacing</h3>
                      <div className="grid grid-cols-1 gap-2 rounded-2xl bg-slate-100 p-2 sm:grid-cols-3">
                        {[
                          { id: 'normal', label: 'Normal', value: 1.5, icon: <AlignJustify size={14} /> },
                          { id: 'relaxed', label: 'Relaxed', value: 1.7, icon: <AlignJustify size={14} /> },
                          { id: 'wide', label: 'Wide', value: 1.9, icon: <AlignJustify size={14} /> },
                        ].map((spacing) => (
                          <button
                            key={spacing.id}
                            onClick={() => updateSettings({ lineSpacing: spacing.id as any })}
                            className={`rounded-xl px-3 py-2 text-left transition-all ${settings.lineSpacing === spacing.id ? 'bg-white text-brand shadow-sm' : 'bg-white/60 text-slate-600 hover:bg-white'}`}
                          >
                            <p className="mb-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                              {spacing.icon}
                              {spacing.label} ({spacing.value}x)
                            </p>
                            <div className="text-[12px] font-semibold text-slate-700" style={{ lineHeight: spacing.value }}>
                              <p>How this text looks</p>
                              <p>with selected spacing.</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {activeCategory === 'assessment' && (
                  <section className="space-y-6">
                    <div>
                      <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.assessment.headingClass}`}>Assessment Style</h3>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {['gamified', 'traditional', 'balanced'].map((style, idx) => (
                          <button
                            key={style}
                            ref={(el) => {
                              if (activeCategory === 'assessment' && idx === 0 && el) {
                                firstControlRef.current = el;
                              }
                            }}
                            onClick={() => updateSettings({ assessmentStyle: style as any })}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize transition-all ${settings.assessmentStyle === style ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-black uppercase tracking-widest text-slate-400">Content Order</h3>
                      <p className="mb-4 text-xs font-semibold text-slate-500">
                        Choose what appears first in each concept. Learners can optionally reveal the other format inside the lesson.
                      </p>
                      <div className="flex rounded-2xl bg-slate-100 p-1">
                        {[
                          { id: 'video', label: 'Video First (Optional Text)' },
                          { id: 'text', label: 'Text First (Optional Video)' },
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
                      <p className="mt-2 text-[11px] font-semibold text-slate-500">
                        Changes apply immediately to the current lesson view.
                      </p>
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
                  <section className="space-y-4">
                    <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${categoryConfig.account.headingClass}`}>Account Actions</h3>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Profile</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-bold text-slate-600">User ID</label>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                              value={profileUserId}
                              onChange={(e) => {
                                setProfileUserId(e.target.value.toLowerCase());
                                setUserIdAvailable(null);
                                setUserIdHint('Choose a unique User ID (4-24 chars: letters, numbers, . _ -).');
                              }}
                              onBlur={handleCheckUserId}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-brand"
                              placeholder="e.g. riya_8a"
                            />
                            <button
                              onClick={handleUserIdSave}
                              disabled={checkingUserId || savingUserId || userIdAvailable === false}
                              className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {savingUserId ? 'Saving...' : 'Save User ID'}
                            </button>
                          </div>
                          <p className={`mt-1 text-xs font-semibold ${userIdAvailable === false ? 'text-red-600' : userIdAvailable ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {checkingUserId ? 'Checking User ID...' : userIdHint}
                          </p>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-bold text-slate-600">Name</label>
                          <input
                            ref={(el) => {
                              if (activeCategory === 'account' && el) {
                                firstControlRef.current = el;
                              }
                            }}
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-brand"
                            placeholder="Student name"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-600">School</label>
                          <input
                            value={profileSchool}
                            onChange={(e) => setProfileSchool(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-brand"
                            placeholder="School"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-600">Class</label>
                          <input
                            value={profileClass}
                            onChange={(e) => setProfileClass(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-brand"
                            placeholder="Class"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleProfileSave}
                        className="mt-3 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white"
                      >
                        Save Profile
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Security</p>
                      <button
                        onClick={handlePasswordChange}
                        className="rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-brand"
                      >
                        Change Password
                      </button>
                      <p className="mt-2 text-xs text-slate-500">We will send a secure reset link to your registered email.</p>
                    </div>

                    {activityExportUrl && (
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Activity</p>
                        <a
                          href={activityExportUrl}
                          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-brand"
                        >
                          <Download size={16} />
                          Download Activity Report
                        </a>
                        <p className="mt-2 text-xs text-slate-500">Export your latest activity and progress data.</p>
                      </div>
                    )}

                    {accountMessage && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                        {accountMessage}
                      </div>
                    )}

                    {accountError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                        {accountError}
                      </div>
                    )}

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
