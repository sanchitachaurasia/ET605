import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSessionStore } from '../store/sessionStore';
import confetti from 'canvas-confetti';
import { Compass, Map, Zap } from 'lucide-react';

export default function PathAssignment() {
  const session = useSessionStore(state => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!session) return null;

  const pathInfo = {
    A: { label: 'Explorer Path', desc: 'We will build your skills step by step!', icon: Compass, color: 'bg-emerald-500' },
    B: { label: 'Adventurer Path', desc: 'You have a solid base; let\'s go further!', icon: Map, color: 'bg-blue-500' },
    C: { label: 'Pioneer Path', desc: 'You are ready to move fast and go deep!', icon: Zap, color: 'bg-indigo-600' },
  }[session.learningPath];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        <div className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl ${pathInfo.color} shadow-2xl`}>
          <pathInfo.icon size={48} />
        </div>
        
        <h1 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">Path Assigned</h1>
        <h2 className="mb-4 text-5xl font-black">{pathInfo.label}</h2>
        <p className="text-xl text-slate-300">{pathInfo.desc}</p>

        <div className="mt-12 rounded-2xl bg-slate-800 p-6 text-left">
          <h3 className="mb-4 font-bold text-slate-400">Your Mission Loadout:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Personalized {session.learningPath === 'A' ? 'Step-by-Step' : session.learningPath === 'C' ? 'Advanced' : 'Balanced'} lessons</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>{session.recommendedStyle || 'Adaptive'} challenge style</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Adaptive difficulty scaling</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-12 w-full rounded-2xl bg-white py-5 text-xl font-black text-slate-900 shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          Begin Adventure
        </button>
      </motion.div>
    </div>
  );
}
