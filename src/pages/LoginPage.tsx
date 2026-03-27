import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useSessionStore, DEFAULT_SETTINGS } from '../store/sessionStore';
import { signUp, login, sendResetPasswordEmail, checkUserIdAvailability } from '../lib/firebaseAuth';
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

  if (raw.includes('user id already taken')) {
    return {
      title: 'User ID Unavailable',
      message: 'This User ID is already in use.',
      hint: 'Choose a different User ID.'
    };
  }

  if (raw.includes('user id must be')) {
    return {
      title: 'Invalid User ID',
      message: 'Use 4-24 characters: letters, numbers, dot, underscore, hyphen.'
    };
  }

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
  const [userIdHint, setUserIdHint] = useState('Choose a unique User ID. You will use it to log in.');
  const [userIdAvailable, setUserIdAvailable] = useState<boolean | null>(null);
  const [checkingUserId, setCheckingUserId] = useState(false);
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
        const result = await login(data.identifier, data.password);
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
        const normalizedUserId = String(data.userId || '').trim().toLowerCase();
        const result = await signUp(data.email, data.password, data.name, normalizedUserId, data.school, data.class);
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

  const validateUserIdAvailability = async () => {
    const raw = String(getValues('userId') || '').trim().toLowerCase();
    if (!raw) {
      setUserIdAvailable(null);
      setUserIdHint('Choose a unique User ID. You will use it to log in.');
      return;
    }

    setCheckingUserId(true);
    const result = await checkUserIdAvailability(raw);
    setCheckingUserId(false);

    if (!result.success) {
      setUserIdAvailable(null);
      setUserIdHint(result.message || 'Could not validate User ID right now.');
      return;
    }

    setUserIdAvailable(result.available);
    setUserIdHint(result.message || (result.available ? 'User ID is available' : 'User ID already taken'));
  };

  const handleForgotPassword = async () => {
    const identifier = String(getValues('identifier') || '').trim();
    setError(null);
    setInfo('');

    if (!identifier) {
      setError({
        title: 'Email Required',
        message: 'Enter your email first, then click Forgot password.'
      });
      return;
    }

    if (!identifier.includes('@')) {
      setError({
        title: 'Email Required',
        message: 'Password reset works with email only.',
        hint: 'Enter your registered email address, not User ID.'
      });
      return;
    }

    const result = await sendResetPasswordEmail(identifier);
    if (result.success) {
      setInfo('Password reset link sent. Please check your inbox.');
    } else {
      setError(mapAuthError(result.error || 'Could not send reset email.', 'reset'));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute left-[-5rem] top-[-6rem] h-52 w-52 rounded-full bg-[var(--theme-color-soft)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] h-56 w-56 rounded-full bg-[#efe6d0] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-shell grid items-stretch gap-5 lg:grid-cols-[1.02fr_1fr]"
      >
        <section className="app-ambient-panel app-grid-bg relative hidden overflow-hidden p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8d3c6] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700">
              <Sparkles size={14} className="text-brand" />
              Adaptive Learning Workspace
            </div>

            <h1 className="app-display text-5xl font-extrabold tracking-tight text-[var(--text-strong)]">DataQuest Learners. Real Wins.</h1>
            <p className="mt-3 max-w-xl text-base font-medium text-slate-600">Your math journey adapts to how you learn best, from pre-test to post-test, with clear progress and smart remediation.</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Personalized learning paths',
                'Live performance insights',
                'Accessible reading modes',
                'Game mechanics by preference',
              ].map((item) => (
                <div key={item} className="chip-pill inline-flex w-fit items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#d9d4c7] bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">"The mission flow keeps students engaged without overwhelming them. We finally see consistency in practice quality."</p>
            <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Learning Coordinator, DataQuest Pilot School</p>
          </div>
        </section>

        <section className="app-float-card rounded-[2rem] p-6 sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-xl font-black text-white shadow-lg shadow-brand/30">DQ</div>
              <h2 className="app-display text-3xl font-extrabold tracking-tight text-[var(--text-strong)]">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">{isLogin ? 'Continue your mission where you left off.' : 'Set up your learner profile in under a minute.'}</p>
            </div>
            <div className="chip-pill hidden items-center gap-2 sm:inline-flex">
              <ShieldCheck size={14} className="text-brand" />
              Secure Access
            </div>
          </div>

          <div className="mb-6 flex rounded-full border border-[#ddd7ca] bg-[#f7f5ef] p-1">
            <button
              onClick={() => { setIsLogin(true); reset(); setError(null); setInfo(''); }}
              className={`flex-1 rounded-full py-2 text-sm font-extrabold transition-all ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                reset();
                setError(null);
                setInfo('');
                setUserIdAvailable(null);
                setUserIdHint('Choose a unique User ID. You will use it to log in.');
              }}
              className={`flex-1 rounded-full py-2 text-sm font-extrabold transition-all ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
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
                  onClick={() => { setIsLogin(true); setError(null); setInfo(''); reset({ identifier: getValues('email') }); }}
                  className="mt-3 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-800"
                >
                  Go to Login
                </button>
              )}

              {error.action === 'go-signup' && isLogin && (
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(null); setInfo(''); reset({ email: getValues('identifier') }); }}
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
              className={isLogin ? 'space-y-4' : 'grid grid-cols-1 gap-4 sm:grid-cols-2'}
            >
              <div>
                <label className="block text-xs font-black uppercase tracking-wide text-slate-600">{isLogin ? 'Email or User ID' : 'Email'}</label>
                {isLogin ? (
                  <>
                    <input
                      type="text"
                      {...register('identifier', { required: true })}
                      className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                      placeholder="your@email.com or your_userid"
                    />
                    {errors.identifier && <span className="text-xs text-red-600">Email or User ID is required</span>}
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="text-xs text-red-600">Email is required</span>}
                  </>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600">Unique User ID</label>
                  <input
                    {...register('userId', {
                      required: !isLogin,
                      minLength: 4,
                      maxLength: 24,
                      pattern: /^[a-zA-Z0-9_.-]+$/,
                    })}
                    onBlur={validateUserIdAvailability}
                    className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                    placeholder="e.g. riya_8a"
                  />
                  {errors.userId && <span className="text-xs text-red-600">Valid User ID is required (4-24 chars, letters/numbers/._-)</span>}
                  {!errors.userId && (
                    <span className={`text-xs ${userIdAvailable === false ? 'text-red-600' : userIdAvailable === true ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {checkingUserId ? 'Checking User ID...' : userIdHint}
                    </span>
                  )}
                </div>
              )}

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide text-slate-600">Student Name</label>
                    <input
                      {...register('name', { required: !isLogin })}
                      className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                      placeholder="Enter your name"
                    />
                    {errors.name && <span className="text-xs text-red-600">Student name is required</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide text-slate-600">School Name (Optional)</label>
                    <input
                      {...register('school')}
                      className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                      placeholder="Enter your school (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide text-slate-600">Class & Section (Optional)</label>
                    <input
                      {...register('class')}
                      className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                      placeholder="e.g. 8-A (optional)"
                    />
                  </div>
                </>
              )}

              <div className={isLogin ? '' : 'sm:col-span-2'}>
                <label className="block text-xs font-black uppercase tracking-wide text-slate-600">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="mt-1 w-full rounded-xl border border-[#dcd7cb] bg-[#fbfaf7] px-4 py-3 font-semibold text-slate-800 outline-none transition-all focus:border-brand focus:bg-white"
                  placeholder="Enter password (min 6 characters)"
                />
                {errors.password && <span className="text-xs text-red-600">Password must be at least 6 characters</span>}
              </div>

              {isLogin && (
                <div className={isLogin ? 'text-right' : 'sm:col-span-2 text-right'}>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-bold text-slate-700 transition-colors hover:text-brand"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || (!isLogin && (checkingUserId || userIdAvailable === false))}
            className="mt-4 w-full rounded-2xl bg-slate-900 py-3.5 text-base font-black text-white shadow-lg shadow-slate-900/20 transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login to Mission' : 'Start Your Mission')}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); reset(); setError(null); setInfo(''); }}
            className="text-sm font-bold text-slate-700 hover:text-brand"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
        </section>
      </motion.div>
    </div>
  );
}
