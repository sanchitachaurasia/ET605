import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSessionStore, DEFAULT_SETTINGS } from '../store/sessionStore';
import { signUp, login } from '../lib/firebaseAuth';
import { StudentSession } from '../types';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { setSession } = useSessionStore();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        // Login with Firebase
        const result = await login(data.email, data.password);
        if (result.success && result.student) {
          // Convert to StudentSession format
          const session: StudentSession = {
            ...result.student,
            settings: result.student.settings || DEFAULT_SETTINGS,
            moduleProgress: result.student.moduleProgress || [],
            badgesEarned: result.student.badgesEarned || [],
          };
          setSession(session);
          navigate(result.student.preTestDone ? '/dashboard' : '/pre-test');
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Sign up with Firebase
        const result = await signUp(data.email, data.password, data.name, data.school, data.class);
        if (result.success && result.student) {
          const session: StudentSession = {
            ...result.student,
            settings: result.student.settings || DEFAULT_SETTINGS,
            moduleProgress: result.student.moduleProgress || [],
            badgesEarned: result.student.badgesEarned || [],
          };
          setSession(session);
          navigate('/pre-test');
        } else {
          setError(result.error || 'Signup failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
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
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-xs text-red-600">Email is required</span>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-slate-700">Student Name</label>
                  <input
                    {...register('name', { required: !isLogin })}
                    className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">School Name</label>
                    <input
                      {...register('school', { required: !isLogin })}
                      className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                      placeholder="Enter your school"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Class & Section</label>
                    <input
                      {...register('class', { required: !isLogin })}
                      className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                      placeholder="e.g. 8-A"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                  placeholder="Enter password (min 6 characters)"
                />
                {errors.password && <span className="text-xs text-red-600">Password must be at least 6 characters</span>}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login to Mission' : 'Start Your Mission')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); reset(); setError(''); }}
            className="text-sm font-bold text-brand hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
