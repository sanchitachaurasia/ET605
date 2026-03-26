import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSessionStore, DEFAULT_SETTINGS } from '../store/sessionStore';
import { signUp, login, sendResetPasswordEmail } from '../lib/firebaseAuth';
import { StudentSession } from '../types';

type AuthContext = 'login' | 'signup' | 'reset';

type FriendlyError = {
  title: string;
  message: string;
  hint?: string;
  action?: 'go-login' | 'go-signup';
};

const mapAuthError = (rawError: string, context: AuthContext): FriendlyError => {
  const raw = String(rawError || '').toLowerCase();

  if (raw.includes('already in use') || raw.includes('already registered') || raw.includes('already exists')) {
    return {
      title: 'Email Already Registered',
      message: 'This email is already in use.',
      hint: 'Try logging in with the same email.',
      action: 'go-login'
    };
  }

  if (raw.includes('user not found')) {
    return {
      title: 'Account Not Found',
      message: 'No account exists for this email.',
      hint: 'Please sign up first.',
      action: 'go-signup'
    };
  }

  if (raw.includes('invalid email or password')) {
    return {
      title: 'Invalid Credentials',
      message: 'Email or password is incorrect.',
      hint: 'Check your details or use Forgot password.'
    };
  }

  if (raw.includes('invalid email')) {
    return {
      title: 'Invalid Email',
      message: 'Please enter a valid email address.'
    };
  }

  if (raw.includes('at least 6') || raw.includes('invalid-password')) {
    return {
      title: 'Weak Password',
      message: 'Password must be at least 6 characters long.'
    };
  }

  if (raw.includes('failed to fetch') || raw.includes('networkerror') || raw.includes('cors')) {
    return {
      title: 'Server Connection Failed',
      message: 'Could not connect to the backend server.',
      hint: 'Make sure frontend and backend are both running.'
    };
  }

  if (context === 'login') {
    return {
      title: 'Login Failed',
      message: rawError || 'Unable to login right now. Please try again.'
    };
  }

  if (context === 'reset') {
    return {
      title: 'Reset Failed',
      message: rawError || 'Could not send reset email. Please try again.'
    };
  }

  return {
    title: 'Signup Failed',
    message: rawError || 'Could not create your account. Please try again.'
  };
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FriendlyError | null>(null);
  const [info, setInfo] = useState('');
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const { setSession } = useSessionStore();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setInfo('');
    
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
          setError(mapAuthError(result.error || 'Login failed', 'login'));
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
          setError(mapAuthError(result.error || 'Signup failed', 'signup'));
        }
      }
    } catch (err: any) {
      setError(mapAuthError(err.message || 'An error occurred', isLogin ? 'login' : 'signup'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = String(getValues('email') || '').trim();
    setError(null);
    setInfo('');

    if (!email) {
      setError({
        title: 'Email Required',
        message: 'Enter your email first, then click Forgot password.'
      });
      return;
    }

    const result = await sendResetPasswordEmail(email);
    if (result.success) {
      setInfo('Password reset link sent. Please check your inbox.');
    } else {
      setError(mapAuthError(result.error || 'Could not send reset email.', 'reset'));
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
            onClick={() => { setIsLogin(true); reset(); setError(null); setInfo(''); }}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${isLogin ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); reset(); setError(null); setInfo(''); }}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${!isLogin ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="text-sm font-black uppercase tracking-wide text-red-800">{error.title}</p>
              <p className="mt-1 text-sm font-semibold">{error.message}</p>
              {error.hint && <p className="mt-1 text-xs font-semibold text-red-700/90">{error.hint}</p>}

              {error.action === 'go-login' && !isLogin && (
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError(null); setInfo(''); reset({ email: getValues('email') }); }}
                  className="mt-3 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-800"
                >
                  Go to Login
                </button>
              )}

              {error.action === 'go-signup' && isLogin && (
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(null); setInfo(''); reset({ email: getValues('email') }); }}
                  className="mt-3 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-800"
                >
                  Go to Sign Up
                </button>
              )}
            </div>
          )}

          {info && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
              <p className="text-sm font-black uppercase tracking-wide text-emerald-800">Success</p>
              <p className="mt-1 text-sm font-semibold">{info}</p>
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
                  {errors.name && <span className="text-xs text-red-600">Student name is required</span>}
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
                    {errors.school && <span className="text-xs text-red-600">School name is required</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Class & Section</label>
                    <input
                      {...register('class', { required: !isLogin })}
                      className="mt-1 w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 focus:border-brand focus:outline-none"
                      placeholder="e.g. 8-A"
                    />
                    {errors.class && <span className="text-xs text-red-600">Class & section is required</span>}
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

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-bold text-brand hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
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
            onClick={() => { setIsLogin(!isLogin); reset(); setError(null); setInfo(''); }}
            className="text-sm font-bold text-brand hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
