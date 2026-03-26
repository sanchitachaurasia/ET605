import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Clock, Activity, Download, MonitorSmartphone, MapPin, ArrowDownUp } from 'lucide-react';
import {
  fetchAdminRealtimeAnalytics,
  fetchAdminUserActivity,
  getAdminAnalyticsExportUrl,
} from '../lib/firebaseAuth';
import { gameConfig } from '../config/gameConfig';

type SortKey = 'name' | 'totalEvents' | 'totalDevices' | 'totalLocations' | 'lastActivityAt';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalEvents: 0, activeUsers: 0 });

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>('lastActivityAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadRealtime = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminRealtimeAnalytics(400);
      setEvents(data.events || []);
      setUsers(data.users || []);
      setStats(data.stats || { totalEvents: 0, activeUsers: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to load realtime data');
    } finally {
      setLoading(false);
    }
  };

  const loadUserActivity = async (studentId: string) => {
    if (!studentId) return;
    setActivityLoading(true);
    try {
      const data = await fetchAdminUserActivity(studentId, 2000);
      setSelectedActivity(data);
      setSelectedStudentId(studentId);
    } catch (err: any) {
      setError(err.message || 'Failed to load user activity');
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    loadRealtime();
    const id = autoRefresh ? window.setInterval(loadRealtime, 5000) : null;

    return () => {
      if (id) window.clearInterval(id);
    };
  }, [isLoggedIn, autoRefresh]);

  const sortedUsers = useMemo(() => {
    const rows = [...users];
    rows.sort((a, b) => {
      const aVal = a?.[sortKey];
      const bVal = b?.[sortKey];

      if (sortKey === 'name') {
        const result = String(aVal || '').localeCompare(String(bVal || ''));
        return sortDirection === 'asc' ? result : -result;
      }

      if (sortKey === 'lastActivityAt') {
        const aTs = aVal ? new Date(aVal).getTime() : 0;
        const bTs = bVal ? new Date(bVal).getTime() : 0;
        return sortDirection === 'asc' ? aTs - bTs : bTs - aTs;
      }

      const aNum = Number(aVal || 0);
      const bNum = Number(bVal || 0);
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
    });
    return rows;
  }, [users, sortDirection, sortKey]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('desc');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === gameConfig.admin.username && password === gameConfig.admin.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
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
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black text-slate-900">DataQuest Admin Analytics</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setAutoRefresh(prev => !prev)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">
              {autoRefresh ? 'Auto refresh: ON' : 'Auto refresh: OFF'}
            </button>
            <button onClick={() => loadRealtime()} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">
              Refresh
            </button>
            <a href={getAdminAnalyticsExportUrl(undefined, 15000)} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">
              <Download size={14} /> Export All CSV
            </a>
            <button onClick={() => setIsLoggedIn(false)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">
              Logout
            </button>
          </div>
        </header>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Tracked Users" value={String(users.length)} color="text-blue-600" />
          <StatCard icon={Activity} label="Recent Events" value={String(stats.totalEvents || 0)} color="text-indigo-600" />
          <StatCard icon={Clock} label="Active Users" value={String(stats.activeUsers || 0)} color="text-emerald-600" />
          <StatCard icon={MonitorSmartphone} label="Realtime Poll" value={autoRefresh ? '5s' : 'Manual'} color="text-amber-600" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Users (Click for Deep View)</h2>
              <div className="text-xs font-semibold text-slate-500">Sorted by {sortKey} {sortDirection}</div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <SortButton active={sortKey === 'name'} label="Name" onClick={() => handleSort('name')} />
              <SortButton active={sortKey === 'totalEvents'} label="Events" onClick={() => handleSort('totalEvents')} />
              <SortButton active={sortKey === 'totalDevices'} label="Devices" onClick={() => handleSort('totalDevices')} />
              <SortButton active={sortKey === 'totalLocations'} label="Locations" onClick={() => handleSort('totalLocations')} />
              <SortButton active={sortKey === 'lastActivityAt'} label="Last Active" onClick={() => handleSort('lastActivityAt')} />
            </div>

            <div className="max-h-[560px] space-y-2 overflow-y-auto">
              {sortedUsers.map((user) => (
                <button
                  key={user.studentId}
                  onClick={() => loadUserActivity(user.studentId)}
                  className={`w-full rounded-xl border p-3 text-left transition hover:border-brand ${selectedStudentId === user.studentId ? 'border-brand bg-blue-50' : 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-slate-800">{user.name || user.studentId}</p>
                      <p className="text-xs font-semibold text-slate-500">{user.email || user.studentId}</p>
                    </div>
                    <a
                      href={getAdminAnalyticsExportUrl(user.studentId, 20000)}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
                    >
                      <Download size={12} /> CSV
                    </a>
                  </div>

                  <div className="mt-2 grid grid-cols-4 gap-2 text-[11px] font-semibold text-slate-600">
                    <div>Events: {user.totalEvents || 0}</div>
                    <div>Devices: {user.totalDevices || 0}</div>
                    <div>Locations: {user.totalLocations || 0}</div>
                    <div>IPs: {user.totalIps || 0}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black text-slate-900">Realtime Event Stream</h2>
            {loading ? (
              <p className="py-8 text-center text-sm font-semibold text-slate-500">Loading events...</p>
            ) : (
              <div className="max-h-[560px] space-y-2 overflow-y-auto">
                {events.map((event) => (
                  <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-slate-500">{event.type}</p>
                        <p className="text-[11px] font-semibold text-slate-500">{event.timestamp || ''}</p>
                      </div>
                      <span className="rounded bg-white px-2 py-1 text-[10px] font-bold text-slate-600">{event.student_id || event.uid}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
                      <span>Module: {event.module_id || '-'}</span>
                      <span>Question: {event.question_id || '-'}</span>
                      <span>Device: {event.context?.device_id || '-'}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={12} /> {event.context?.country || 'Unknown'}</span>
                    </div>
                    <pre className="mt-2 max-h-24 overflow-y-auto rounded bg-white p-2 text-[10px] text-slate-600">
                      {JSON.stringify(event.event_data || {}, null, 2)}
                    </pre>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-black text-slate-900">Selected User Activity</h2>
          {!selectedStudentId && <p className="text-sm font-semibold text-slate-500">Select a user to view all tracked activity, devices, locations, and session outcomes.</p>}
          {activityLoading && <p className="text-sm font-semibold text-slate-500">Loading user activity...</p>}
          {selectedActivity && (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-4 text-sm font-semibold text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Total Devices: {selectedActivity.summary?.totalDevices || 0}</div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Total Locations: {selectedActivity.summary?.totalLocations || 0}</div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Total IPs: {selectedActivity.summary?.totalIps || 0}</div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Last Active: {selectedActivity.summary?.lastActivityAt || '-'}</div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-black uppercase tracking-wider text-slate-600">Latest Events</h3>
                  <div className="max-h-[340px] space-y-2 overflow-y-auto">
                    {(selectedActivity.events || []).map((event: any) => (
                      <div key={event.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs">
                        <p className="font-black text-slate-800">{event.type}</p>
                        <p className="text-[10px] font-semibold text-slate-500">{event.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-black uppercase tracking-wider text-slate-600">Session Payloads</h3>
                  <div className="max-h-[340px] space-y-2 overflow-y-auto">
                    {(selectedActivity.sessionPayloads || []).map((payload: any) => (
                      <div key={payload.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs">
                        <p className="font-black text-slate-800">{payload.session_status} | {payload.chapter_id}</p>
                        <p className="text-[10px] font-semibold text-slate-500">{payload.submittedAt}</p>
                        <p className="mt-1 text-[11px] text-slate-600">Correct: {payload.correct_answers || 0}, Wrong: {payload.wrong_answers || 0}, Time: {payload.time_spent_seconds || 0}s</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function SortButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 font-bold ${active ? 'border-brand bg-blue-50 text-brand' : 'border-slate-300 bg-white text-slate-600'}`}
    >
      <ArrowDownUp size={12} />
      {label}
    </button>
  );
}
