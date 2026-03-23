import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Trophy, Play, Lock, Settings } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { chapterData } from '../data/chapterData';
import { RocketProgress } from '../components/RocketProgress';
import { SettingsModal } from '../components/SettingsModal';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { session } = useSessionStore();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!session) return null;

  const settings = session.settings || { darkMode: false };

  const modules = chapterData;

  const isModuleLocked = (index: number) => {
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

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 pb-20",
      settings.darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <header className={cn(
        "px-6 py-8 shadow-sm transition-colors",
        settings.darkMode ? "bg-slate-900" : "bg-white"
      )}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn(
                "text-2xl font-black",
                settings.darkMode ? "text-white" : "text-slate-900"
              )}>Welcome back, {session.name}!</h1>
              <p className="text-slate-500">You're on the <span className="font-bold text-brand">{session.learningPath === 'A' ? 'Explorer' : session.learningPath === 'C' ? 'Pioneer' : 'Adventurer'} Path</span></p>
              {session.recommendedStyle && (
                <p className="mt-1 text-xs font-bold text-brand uppercase tracking-wider">Recommended: {session.recommendedStyle}</p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700">
                <Star size={18} fill="currentColor" />
                <span className="font-bold">{session.xp} XP</span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95",
                  settings.darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                )}
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-2 text-sm font-bold text-slate-600">Mission Progress</p>
            <RocketProgress progress={(session.moduleProgress.filter(p => p.completed).length / modules.length) * 100} />
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-4xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className={cn(
            "text-xl font-bold",
            settings.darkMode ? "text-slate-200" : "text-slate-800"
          )}>Your Journey</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => {
            const locked = isModuleLocked(i);
            const completed = isModuleCompleted(mod.id);
            const stars = getModuleStars(mod.id);

            return (
              <motion.div
                key={mod.id}
                whileHover={!locked ? { y: -5 } : {}}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-6 transition-all",
                  locked 
                    ? (settings.darkMode ? "bg-slate-900 opacity-50" : "bg-slate-200 opacity-75") 
                    : (settings.darkMode ? "bg-slate-900 shadow-xl hover:bg-slate-800" : "bg-white shadow-md hover:shadow-xl"),
                  completed && "border-2 border-green-500"
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                    locked 
                      ? (settings.darkMode ? "bg-slate-800 text-slate-600" : "bg-slate-100 text-slate-400") 
                      : "bg-brand/10 text-brand"
                  )}>
                    {locked ? <Lock size={24} /> : <span className="text-xl font-black">{i + 1}</span>}
                  </div>
                  {completed && (
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, si) => (
                        <Star key={si} size={16} className={cn(si < stars ? "text-amber-500 fill-amber-500" : "text-slate-300")} />
                      ))}
                    </div>
                  )}
                </div>
                <h3 className={cn(
                  "text-lg font-bold",
                  settings.darkMode ? "text-white" : "text-slate-800"
                )}>{mod.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {locked ? 'Unlock by completing previous' : completed ? 'Module Mastered!' : 'Ready to explore!'}
                </p>
                
                {!locked && (
                  <button 
                    onClick={() => navigate(`/module/${mod.id}`)}
                    className="mt-6 flex items-center gap-2 font-bold text-brand"
                  >
                    <Play size={16} fill="currentColor" />
                    {completed ? 'Review Module' : 'Start Module'}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className={cn(
          "mt-12 rounded-3xl p-8 text-white shadow-2xl transition-all",
          settings.darkMode ? "bg-gradient-to-br from-brand/80 to-brand" : "bg-gradient-to-br from-brand to-brand-dark"
        )}>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-3xl font-black">Ready for the Final Challenge?</h2>
              <p className="mt-2 text-white/80">Complete all modules to unlock the Post-Test Mission.</p>
            </div>
            <button 
              onClick={() => navigate('/post-test')}
              disabled={session.moduleProgress.filter(p => p.completed).length < modules.length}
              className={cn(
                "rounded-2xl px-8 py-4 font-black shadow-xl transition-transform active:scale-95",
                session.moduleProgress.filter(p => p.completed).length < modules.length
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-white text-brand hover:scale-105"
              )}
            >
              Unlock Post-Test
            </button>
          </div>
        </div>
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
