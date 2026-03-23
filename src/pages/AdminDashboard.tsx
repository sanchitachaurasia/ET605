import React, { useState, useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { gameConfig } from '../config/gameConfig';
import { getInternalAnalytics } from '../analytics/tracker';
import { motion } from 'motion/react';
import { Users, Clock, AlertTriangle, Award, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { users } = useSessionStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [analytics, setAnalytics] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        setAnalytics(getInternalAnalytics());
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === gameConfig.admin.username && password === gameConfig.admin.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      localStorage.removeItem('dataquest-analytics');
      setAnalytics([]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="mb-6 text-2xl font-black text-slate-900">Admin Login</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900">DataQuest Control Center</h1>
          <div className="flex gap-4">
            <button onClick={handleClearData} className="font-bold text-red-500 hover:text-red-700">Clear Data</button>
            <button onClick={() => setIsLoggedIn(false)} className="font-bold text-slate-500 hover:text-slate-700">Logout</button>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Active Students" value="1" color="text-blue-600" />
          <StatCard icon={Clock} label="Avg. Session Time" value="12m" color="text-emerald-600" />
          <StatCard icon={AlertTriangle} label="Remediation Triggers" value="4" color="text-amber-600" />
          <StatCard icon={Award} label="Badges Awarded" value="2" color="text-indigo-600" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Activity className="text-slate-400" />
              <h2 className="text-xl font-bold">Real-time Event Stream</h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {analytics.length === 0 ? (
                <p className="py-8 text-center text-slate-400">No events recorded yet.</p>
              ) : (
                analytics.map((ev, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{ev.timestamp}</span>
                      <p className="font-bold text-slate-800">{ev.type}</p>
                    </div>
                    <pre className="rounded bg-slate-50 p-2 text-xs text-slate-600">
                      {JSON.stringify(ev.data, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Users className="text-slate-400" />
              <h2 className="text-xl font-bold">Registered Students</h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {users.length === 0 ? (
                <p className="py-8 text-center text-slate-400">No students registered yet.</p>
              ) : (
                users.map((u, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.school} • {u.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-brand">PIN: {u.pin}</p>
                      <p className="text-[10px] text-slate-400">ID: {u.studentId.slice(0, 8)}...</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
