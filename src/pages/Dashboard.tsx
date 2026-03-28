import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Lock, LogOut, Play, Settings, Star } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { getChapterDataForPath } from '../data/Standard/pathData';
import { RocketProgress } from '../components/RocketProgress';
import { SettingsModal } from '../components/SettingsModal';
import { useResponsive, ResponsiveContainer } from '../components/ResponsiveLayout';
import { cn } from '../lib/utils';
import { getAdminAnalyticsExportUrl } from '../lib/firebaseAuth';

export default function Dashboard() {
  const { session, clearSession } = useSessionStore();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showPathTimeline, setShowPathTimeline] = useState(false);
  const { isMobile } = useResponsive();

  if (!session) return null;

  const settings = session.settings || { darkMode: false };
  const modules = getChapterDataForPath(session.learningPath || 'B');
  const toPathLabel = (value: 'A' | 'B' | 'C') =>
    value === 'A' ? 'Foundational' : value === 'C' ? 'Advanced' : 'Standard';
  const currentAssessmentStyleLabel =
    settings.assessmentStyle === 'gamified'
      ? 'Gamified'
      : settings.assessmentStyle === 'traditional'
        ? 'Traditional'
        : 'Balanced';

  const isModuleLocked = (index: number) => {
    if (!session.preTestDone) return true;
    if (index === 0) return false;
    const prevModule = modules[index - 1];
    return !session.moduleProgress.some((p) => p.moduleId === prevModule.id && p.completed);
  };

  const isModuleCompleted = (moduleId: string) => {
    return session.moduleProgress.some((p) => p.moduleId === moduleId && p.completed);
  };

  const completedCount = session.moduleProgress.filter((p) => p.completed).length;
  const currentDynamicPath = (() => {
    const moduleOrder = modules.map((mod) => mod.id);
    const lastCompleted = [...session.moduleProgress]
      .filter((p) => p.completed)
      .sort((a, b) => moduleOrder.indexOf(a.moduleId) - moduleOrder.indexOf(b.moduleId))
      .pop();

    if (lastCompleted?.learningPath) return lastCompleted.learningPath;

    const firstIncompleteModule = modules.find((mod) => !isModuleCompleted(mod.id));
    if (firstIncompleteModule) {
      const progress = session.moduleProgress.find((p) => p.moduleId === firstIncompleteModule.id);
      if (progress?.learningPath) return progress.learningPath;
    }

    return session.learningPath || 'B';
  })();

  const pathLabel = toPathLabel(currentDynamicPath);

  const pathTimeline = [
    {
      id: 'pretest',
      title: 'Pretest',
      path: session.learningPath || 'B',
    },
    ...modules
      .map((mod) => {
        const progress = session.moduleProgress.find((p) => p.moduleId === mod.id);
        if (!progress?.learningPath || !progress.completed) return null;
        return {
          id: mod.id,
          title: `Module ${mod.id}`,
          path: progress.learningPath,
        };
      })
      .filter((item): item is { id: string; title: string; path: 'A' | 'B' | 'C' } => Boolean(item)),
  ];

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <div className={cn('min-h-screen pb-16 pt-5 transition-colors duration-500', settings.darkMode ? 'bg-slate-950 text-white' : '')}>
      <ResponsiveContainer>
        <header
          className={cn(
            'app-float-card mx-auto flex w-full max-w-none items-center justify-between gap-3 rounded-full px-5 py-3',
            settings.darkMode ? 'border-slate-700 bg-slate-900/85' : ''
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">DQ</div>
            <p className="app-display text-3xl font-black tracking-tight text-[var(--text-strong)] sm:text-4xl">DataQuest</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white', settings.darkMode ? 'bg-brand' : 'bg-slate-900')}
              title="Settings"
            >
              <Settings size={14} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-2 py-2 text-lg font-extrabold text-red-500 transition-colors hover:text-red-600"
              title="Logout"
            >
              <LogOut size={28} />
              Logout
            </button>
          </div>
        </header>

        <main className="mx-auto mt-5">
          <section className="mt-1">
            <div className={cn('app-ambient-panel p-5 sm:p-6', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : '')}>
              <div className="mb-4">
                <p className={cn('text-sm font-bold sm:text-base', settings.darkMode ? 'text-slate-100' : 'text-slate-700')}>Welcome, {session.name || 'Learner'}.</p>
              </div>

              <p className={cn('mb-2 text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Mission Progress</p>
              <RocketProgress progress={(completedCount / modules.length) * 100} />

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setShowPathTimeline(true)}
                  className={cn('rounded-2xl border p-3 text-left transition-all', settings.darkMode ? 'border-slate-700 bg-slate-900/70 hover:border-slate-500' : 'border-[#dbd6ca] bg-white/75 hover:border-slate-400')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn('text-xs font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Learner Profile</p>
                    <span className={cn('text-xs font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-400' : 'text-slate-500')}>
                      View Path History
                    </span>
                  </div>
                  <p className={cn('mt-2 text-lg font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>Path: {pathLabel}</p>
                  <p className={cn('text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>Adaptive difficulty enabled</p>
                </button>

                <div className={cn('rounded-2xl border p-3', settings.darkMode ? 'border-slate-700 bg-slate-900/70' : 'border-[#dbd6ca] bg-white/75')}>
                  <p className={cn('text-xs font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Progress Snapshot</p>
                  <div className="mt-2 flex flex-wrap items-center gap-5">
                    <div>
                      <p className={cn('text-[11px] font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Modules Done</p>
                      <p className={cn('text-2xl font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>{completedCount}/{modules.length}</p>
                    </div>
                    <div>
                      <p className={cn('text-[11px] font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>XP Earned</p>
                      <p className={cn('inline-flex items-center gap-1 text-2xl font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>
                        <Star size={20} className="text-amber-500" fill="currentColor" />
                        {session.xp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={cn('rounded-2xl border p-3', settings.darkMode ? 'border-slate-700 bg-slate-900/70' : 'border-[#dbd6ca] bg-white/75')}>
                  <p className={cn('text-xs font-black uppercase tracking-wide', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Recommended</p>
                  <p className={cn('mt-1 text-lg font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>{session.recommendedStyle || 'Balanced'}</p>
                  <p className={cn('mt-1 text-sm font-semibold', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
                    Current: {currentAssessmentStyleLabel}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {session.preTestRetakeInProgress && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('mt-4 rounded-2xl border p-4', settings.darkMode ? 'border-amber-700 bg-amber-900/20' : 'border-amber-200 bg-amber-50/70')}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-amber-300' : 'text-amber-700')}>Retake In Progress</p>
                  <p className={cn('mt-1 text-sm font-semibold', settings.darkMode ? 'text-slate-100' : 'text-slate-700')}>
                    Your previous pre-test results are still active. Continue whenever you are ready.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/pre-test')}
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-black text-white"
                >
                  Continue Pre-Test
                </button>
              </div>
            </motion.div>
          )}

          {!session.preTestDone && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('mt-6 rounded-3xl border p-4 sm:p-5', settings.darkMode ? 'border-blue-700 bg-blue-900/20' : 'border-blue-200 bg-white/70')}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-700">Step 1 Required</p>
                  <h3 className={cn('mt-1 app-display text-xl font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>Diagnostic Mission Awaits</h3>
                  <p className={cn('text-sm font-medium', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>Complete it to unlock personalized modules and recommendations.</p>
                </div>
                <button onClick={() => navigate('/pre-test')} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-black text-white">
                  Start Now
                </button>
              </div>
            </motion.div>
          )}

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className={cn('app-display font-extrabold text-[var(--text-strong)]', isMobile ? 'text-2xl' : 'text-3xl')}>Your Journey</h2>
              <div className="chip-pill">{completedCount} of {modules.length} completed</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((mod, i) => {
                const locked = isModuleLocked(i);
                const completed = isModuleCompleted(mod.id);

                return (
                  <motion.div
                    key={mod.id}
                    whileHover={!locked ? { y: -5 } : {}}
                    className={cn(
                      'app-float-card flex h-[200px] flex-col rounded-[1.8rem] p-5 transition-all',
                      locked ? 'opacity-70' : 'hover:shadow-xl',
                      settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-[#dbd6ca] bg-white/85',
                      completed && 'ring-1 ring-emerald-400'
                    )}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black', locked ? 'bg-slate-200 text-slate-500' : 'bg-[var(--theme-color-soft)] text-brand')}>
                          {locked ? <Lock size={18} /> : <span>{i + 1}</span>}
                        </div>
                        <h3 className="app-display text-2xl font-extrabold leading-tight text-[var(--text-strong)]">{mod.title}</h3>
                      </div>
                    </div>

                    <p className={cn('mt-1 text-sm font-medium', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>
                      {locked ? 'Complete the previous module to unlock this one.' : completed ? 'Completed. Review anytime.' : 'Ready to begin this mission now.'}
                    </p>

                    {!locked && (
                      <button
                        onClick={() => navigate(`/module/${mod.id}`)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d6d1c5] bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:gap-3"
                      >
                        {completed ? <BookOpen size={15} /> : <Play size={15} fill="currentColor" />}
                        {completed ? 'Review Module' : 'Start Module'}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className={cn('mt-10 rounded-[2rem] border p-6 sm:p-8', settings.darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-[#ddd7ca] bg-white/80')}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>Final Milestone</p>
                <h3 className={cn('app-display mt-1 text-3xl font-extrabold', settings.darkMode ? 'text-slate-100' : 'text-[var(--text-strong)]')}>Ready for the Post-Test?</h3>
                <p className={cn('mt-2 text-sm font-medium', settings.darkMode ? 'text-slate-300' : 'text-slate-600')}>Complete all modules to unlock the final challenge and compare your growth.</p>
              </div>
              <button
                onClick={() => navigate('/post-test')}
                disabled={completedCount < modules.length}
                className={cn(
                  'rounded-full px-6 py-3 text-sm font-black transition',
                  completedCount < modules.length ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-slate-900 text-white'
                )}
              >
                Unlock Post-Test
              </button>
            </div>
          </section>
        </main>
      </ResponsiveContainer>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activityExportUrl={getAdminAnalyticsExportUrl(session.studentId, 10000)}
      />

      <AnimatePresence>
        {showPathTimeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4"
            onClick={() => setShowPathTimeline(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full max-w-2xl rounded-3xl border p-6 shadow-2xl',
                settings.darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
              )}
            >
              <p className={cn('text-xs font-black uppercase tracking-widest', settings.darkMode ? 'text-slate-300' : 'text-slate-500')}>
                Path Progression
              </p>
              <p className={cn('mt-3 text-sm font-semibold leading-relaxed', settings.darkMode ? 'text-slate-200' : 'text-slate-700')}>
                {pathTimeline.map((step) => `${step.title}: ${toPathLabel(step.path)}`).join(' -> ')}
              </p>
              <p className={cn('mt-3 text-xs font-semibold', settings.darkMode ? 'text-slate-400' : 'text-slate-500')}>
                Showing pretest and completed modules only.
              </p>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPathTimeline(false)}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-black text-white transition-opacity hover:opacity-90"
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
