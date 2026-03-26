import { TrackingEvent, TrackingEventType } from '../types';
import { firebaseAuth, API_BASE } from '../lib/firebaseAuth';

const EVENT_BUFFER_KEY = 'dataquest-event-buffer';
const DEVICE_ID_KEY = 'dataquest-device-id';
const CHAPTER_ID_DEFAULT = 'grade8_data_handling';
const IDLE_WINDOW_MS = 45_000;

let activeSession: {
  studentId: string;
  sessionId: string;
  chapterId: string;
  moduleId?: string;
} | null = null;

const getNowIso = () => new Date().toISOString();

const randomId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const readBuffer = (): TrackingEvent[] => {
  try {
    return JSON.parse(localStorage.getItem(EVENT_BUFFER_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeBuffer = (events: TrackingEvent[]) => {
  localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(events.slice(-5000)));
};

export const getOrCreateDeviceId = () => {
  const existing = localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const newId = `dv_${randomId()}`;
  localStorage.setItem(DEVICE_ID_KEY, newId);
  return newId;
};

export const setTrackingSession = (params: {
  studentId: string;
  sessionId: string;
  chapterId?: string;
  moduleId?: string;
}) => {
  activeSession = {
    studentId: params.studentId,
    sessionId: params.sessionId,
    chapterId: params.chapterId || CHAPTER_ID_DEFAULT,
    moduleId: params.moduleId,
  };
};

export const updateTrackingModule = (moduleId?: string) => {
  if (!activeSession) return;
  activeSession = { ...activeSession, moduleId };
};

const buildContext = () => {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = nav.language || '';
  const inferredCountry = language.includes('-') ? language.split('-')[1].toUpperCase() : '';
  const inferredCity = timezone.includes('/') ? timezone.split('/').slice(1).join('_') : timezone;
  return {
    url: window.location.href,
    referrer: document.referrer || '',
    userAgent: nav.userAgent,
    language,
    timezone,
    platform: nav.userAgentData?.platform || nav.platform,
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    city: inferredCity,
    country: inferredCountry,
    device_id: getOrCreateDeviceId(),
    online: navigator.onLine,
  };
};

export const trackTelemetryEvent = (
  type: TrackingEventType,
  data: {
    module_id?: string;
    question_id?: string;
    event_data?: Record<string, any>;
  } = {}
) => {
  if (!activeSession) return;

  const event: TrackingEvent = {
    id: randomId(),
    type,
    timestamp: getNowIso(),
    student_id: activeSession.studentId,
    session_id: activeSession.sessionId,
    chapter_id: activeSession.chapterId,
    module_id: data.module_id || activeSession.moduleId,
    question_id: data.question_id,
    event_data: data.event_data || {},
    context: buildContext(),
  };

  const events = readBuffer();
  events.push(event);
  writeBuffer(events);
};

export const getBufferedTrackingEvents = () => readBuffer();

export const clearBufferedTrackingEvents = () => writeBuffer([]);

export const flushTrackingEvents = async () => {
  const events = readBuffer();
  if (!events.length) return { success: true, sent: 0 };

  try {
    const user = firebaseAuth.currentUser;
    if (!user) {
      return { success: false, sent: 0, error: 'Not authenticated' };
    }

    const idToken = await user.getIdToken();
    const response = await fetch(`${API_BASE}/api/session/telemetry/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ events }),
    });

    const data = await response.json();

    if (!response.ok || !data?.success) {
      throw new Error(data?.error || 'Failed to flush telemetry events');
    }

    clearBufferedTrackingEvents();
    return { success: true, sent: events.length };
  } catch (error: any) {
    return { success: false, sent: 0, error: error.message };
  }
};

export const setupGlobalClickstream = () => {
  let lastInteraction = Date.now();

  const recordInteraction = (eventType: TrackingEventType, event_data: Record<string, any>) => {
    lastInteraction = Date.now();
    trackTelemetryEvent(eventType, { event_data });
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const meta = {
      tag: target?.tagName || 'unknown',
      id: target?.id || '',
      className: target?.className || '',
      text: (target?.textContent || '').slice(0, 80),
      x: event.clientX,
      y: event.clientY,
    };
    recordInteraction('clickstream', meta);
  };

  const onVisibility = () => {
    recordInteraction('focus_change', { hidden: document.hidden });
  };

  const onFocus = () => recordInteraction('focus_change', { state: 'focus' });
  const onBlur = () => recordInteraction('focus_change', { state: 'blur' });

  const heartbeat = window.setInterval(() => {
    const idleMs = Date.now() - lastInteraction;
    trackTelemetryEvent('heartbeat', {
      event_data: {
        idle_seconds: Math.floor(idleMs / 1000),
        active: idleMs <= IDLE_WINDOW_MS,
      },
    });
  }, 15000);

  window.addEventListener('click', onClick, { passive: true });
  document.addEventListener('visibilitychange', onVisibility, { passive: true });
  window.addEventListener('focus', onFocus, { passive: true });
  window.addEventListener('blur', onBlur, { passive: true });

  return () => {
    window.clearInterval(heartbeat);
    window.removeEventListener('click', onClick);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  };
};
