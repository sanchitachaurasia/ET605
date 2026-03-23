import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSessionStore, DEFAULT_SETTINGS, DEMO_USER } from '../store/sessionStore';
import { v4 as uuidv4 } from 'uuid';
import { StudentSession } from '../types';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { setSession, addUser, users } = useSessionStore();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (isLogin) {
      const user = users.find(u => 
        u.name.trim().toLowerCase() === data.name.trim().toLowerCase() && 
        u.pin === data.pin
      );
      if (user) {
        setSession(user);
        navigate(user.preTestDone ? '/dashboard' : '/pre-test');
      } else {
        alert('User not found. Please check your name and PIN or Sign Up.');
      }
    } else {
      const newSession: StudentSession = {
        studentId: uuidv4(),
        pin: data.pin,
        name: data.name,
        school: data.school,
        class: data.class,
        preTestScore: 0,
        preTestDone: false,
        learningPath: 'B',
        settings: DEFAULT_SETTINGS,
        moduleProgress: [],
        badgesEarned: [],
        postTestScore: null,
        journeyComplete: false,
        lives: 5,
        xp: 0,
        coins: 0,
        streak: 0,
      };
      addUser(newSession);
      setSession(newSession);
      navigate('/pre-test');
    }
  };

  const handleDemoLogin = () => {
    let demoUser = users.find(u => u.studentId === 'demo-id');
    if (!demoUser) {
      // If demo user is missing from persisted state, add it back
      addUser(DEMO_USER);
      demoUser = DEMO_USER;
    }
    setSession(demoUser);
    navigate('/pre-test');
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all data? This will clear all accounts and progress.')) {
      useSessionStore.getState().resetAll();
      alert('All data has been reset.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand text-white shadow-lg">
            <span className="text-4xl font-black">DQ</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">DataQuest</h1>
          <p className="text-slate-500">{isLogin ? 'Welcome Back!' : 'Your Math Adventure Begins Here!'}</p>
        </div>

        <div className="mb-8 flex rounded-2xl bg-slate-100 p-1">
          <button
            onClick={() => { setIsLogin(true); reset(); }}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${isLogin ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); reset(); }}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${!isLogin ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-bold text-slate-700">Student Name</label>
                <input
                  {...register('name', { required: true })}
                  className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">School Name</label>
                    <input
                      {...register('school', { required: true })}
                      className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                      placeholder="Enter your school"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Class & Section</label>
                    <input
                      {...register('class', { required: true })}
                      className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                      placeholder="e.g. 8-A"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700">{isLogin ? 'PIN' : 'Create PIN'}</label>
                <input
                  type="password"
                  {...register('pin', { required: true, minLength: 4 })}
                  className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                  placeholder="4-6 digits"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLogin ? 'Login to Mission' : 'Start Your Mission'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-brand hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
          
          {isLogin && (
            <div className="space-y-3">
              <button
                onClick={handleDemoLogin}
                className="block w-full text-xs font-medium text-slate-400 hover:text-brand"
              >
                Try Demo Account (Demo Student / 1234)
              </button>
              <button
                onClick={handleResetAll}
                className="block w-full text-[10px] font-medium text-slate-300 hover:text-red-400"
              >
                Reset All App Data
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
