import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Trophy, Play, Lock, Settings } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { chapterData } from '../data/chapterData';
import { RocketProgress } from '../components/RocketProgress';
import { SettingsModal } from '../components/SettingsModal';
import { useResponsive, ResponsiveContainer } from '../components/ResponsiveLayout';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { session } = useSessionStore();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  if (!session) return null;

  const settings = session.settings || { darkMode: false };
  const learnerProfile = session.learnerProfile;
  const modules = chapterData;

  const isModuleLocked = (index: number) => {
    if (!session.preTestDone) return true;
    if (index === 0) return false;
    const prevModule = modules[index - 1];
    return !session.moduleProgress.some(p => p.moduleId === prevModule.id && p.completed);
  };

  const getModuleStars = (moduleId: string) => {
    return session.moduleProgress.find(p => p.moduleId === moduleId)?.stars || 0;
  };

  const isModuleCompleted = (moduleId: string) => {
    return session.moduleProgress.some(p => p.moduleId === moduleId && p.completed);
  };

  const gridCols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 pb-20",
      settings.darkMode ? "bg-slate-950 text-white" : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900"
    )}>
      <header className={cn(
        "px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-sm transition-colors sticky top-0 z-40 backdrop-blur-sm",
        settings.darkMode ? "bg-slate-900/90" : "bg-white/80"
      )}>
        <ResponsiveContainer>
          <div className={cn(
            "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6"
          )}>
            <div className="flex-1">
              <h1 className={cn(
                "font-black",
                isMobile ? "text-xl" : "text-2xl",
                settings.darkMode ? "text-white" : "text-slate-900"
              )}>Welcome back, {session.name}!</h1>
              <div className="mt-2 space-y-1 text-xs sm:text-sm">
                <p className="text-slate-600">You're on the <span className="font-bold text-brand">{session.learningPath === 'A' ? 'Explorer' : session.learningPath === 'C' ? 'Pioneer' : 'Adventurer'} Path</span></p>
                {learnerProfile && (
                  <p className={cn(
                    "font-semibold uppercase tracking-wider",
                    settings.darkMode ? "text-purple-400" : "text-purple-600"
                  )}>📚 {learnerProfile.preferredStyle.charAt(0).toUpperCase() + learnerProfile.preferredStyle.slice(1)} Learner</p>
                )}
                {session.recommendedStyle && (
                  <p className="text-xs font-bold text-brand uppercase tracking-wider">{session.recommendedStyle}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 items-center flex-shrink-0">
              <div className={cn(
                "flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-amber-700",
                settings.darkMode ? "bg-amber-900/30" : "bg-amber-100"
              )}>
                <Star size={18} fill="currentColor" />
                <span className="font-bold text-sm">{session.xp} XP</span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95",
                  settings.darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                )}
                title="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs sm:text-sm font-bold text-slate-600">Mission Progress</p>
            <RocketProgress progress={(session.moduleProgress.filter(p => p.completed).length / modules.length) * 100} />
          </div>
        </ResponsiveContainer>
      </header>

      <main className="mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
        <ResponsiveContainer>
          {/* Pre-test Required Banner */}
          {!session.preTestDone && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mb-8 rounded-2xl border-2 p-4 sm:p-6",
                settings.darkMode
                  ? "bg-blue-900/20 border-blue-800"
                  : "bg-gradient-to-r from-blue-500/10 to-brand/10 border-blue-500/30"
              )}
            >
              <div className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              )}>
                <div>
                  <h3 className="mb-1 text-base sm:text-lg font-black text-slate-900">🎯 Diagnostic Mission Awaits!</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Complete the diagnostic mission to unlock all learning modules and get personalized recommendations.</p>
                </div>
                <button
                  onClick={() => navigate('/pre-test')}
                  className="flex-shrink-0 rounded-lg bg-brand px-4 sm:px-6 py-2 font-bold text-white transition-all hover:opacity-90 active:scale-95 whitespace-nowrap text-sm sm:text-base"
                >
                  Take Now →
                </button>
              </div>
            </motion.div>
          )}
          
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className={cn(
              "font-bold",
              isMobile ? "text-lg" : "text-xl",
              settings.darkMode ? "text-slate-200" : "text-slate-800"
            )}>Your Journey</h2>
            <div className={cn(
              "text-xs sm:text-sm font-semibold px-3 py-1 rounded-full",
              settings.darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
            )}>
              {session.moduleProgress.filter(p => p.completed).length} of {modules.length} completed
            </div>
          </div>

          <div className={cn(
            "grid gap-3 sm:gap-4 lg:gap-6",
            `sm:grid-cols-2 lg:grid-cols-${gridCols}`
          )}>
            {modules.map((mod, i) => {
              const locked = isModuleLocked(i);
              const completed = isModuleCompleted(mod.id);
              const stars = getModuleStars(mod.id);

              return (
                <motion.div
                  key={mod.id}
                  whileHover={!locked ? { y: -5 } : {}}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl p-4 sm:p-6 transition-all h-fit",
                    locked 
                      ? (settings.darkMode ? "bg-slate-900 opacity-50" : "bg-slate-200 opacity-75") 
                      : (settings.darkMode ? "bg-slate-900 shadow-xl hover:bg-slate-800" : "bg-white shadow-md hover:shadow-xl"),
                    completed && "border-2 border-green-500"
                  )}
                >
                  <div className="mb-3 sm:mb-4 flex items-center justify-between">
                    <div className={cn(
                      "flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-2xl transition-colors text-sm sm:text-lg font-black",
                      locked 
                        ? (settings.darkMode ? "bg-slate-800 text-slate-600" : "bg-slate-100 text-slate-400") 
                        : "bg-brand/10 text-brand"
                    )}>
                      {locked ? <Lock size={isMobile ? 18 : 24} /> : <span>{i + 1}</span>}
                    </div>
                    {completed && (
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, si) => (
                          <Star key={si} size={isMobile ? 12 : 16} className={cn(si < stars ? "text-amber-500 fill-amber-500" : "text-slate-300")} />
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className={cn(
                    "font-bold mb-1",
                    isMobile ? "text-base" : "text-lg",
                    settings.darkMode ? "text-white" : "text-slate-800"
                  )}>{mod.title}</h3>
                  <p className="mb-4 text-xs sm:text-sm text-slate-500">
                    {locked ? 'Unlock by completing previous' : completed ? '✅ Module Mastered!' : '🚀 Ready to explore!'}
                  </p>
                  
                  {!locked && (
                    <button 
                      onClick={() => navigate(`/module/${mod.id}`)}
                      className="inline-flex items-center gap-2 font-bold text-brand text-sm hover:gap-3 transition-all"
                    >
                      <Play size={isMobile ? 14 : 16} fill="currentColor" />
                      {completed ? 'Review Module' : 'Start Module'}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className={cn(
            "mt-12 sm:mt-16 rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl transition-all",
            settings.darkMode ? "bg-gradient-to-br from-brand/80 to-brand" : "bg-gradient-to-br from-brand to-brand-dark"
          )}>
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className={cn(
                  "font-black",
                  isMobile ? "text-2xl" : "text-3xl"
                )}>Ready for the Final Challenge?</h2>
                <p className="mt-2 text-white/80 text-sm sm:text-base">Complete all modules to unlock the Post-Test Mission.</p>
              </div>
              <button 
                onClick={() => navigate('/post-test')}
                disabled={session.moduleProgress.filter(p => p.completed).length < modules.length}
                className={cn(
                  "rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-black shadow-xl transition-transform active:scale-95 whitespace-nowrap text-sm sm:text-base",
                  session.moduleProgress.filter(p => p.completed).length < modules.length
                    ? "bg-white/20 text-white/50 cursor-not-allowed"
                    : "bg-white text-brand hover:scale-105"
                )}
              >
                Unlock Post-Test
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
