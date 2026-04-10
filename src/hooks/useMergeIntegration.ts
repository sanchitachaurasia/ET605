import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { mergePayloadFormatter, MergeSessionPayload } from '../integration/mergePayload';
import {
  submitPayloadWithRetry,
  processRetryQueue,
  markSessionAsSubmitted,
  isDuplicateSubmission
} from '../integration/payloadRetryManager';
import { getChapterDataForPath } from '../data/Standard/pathData';
import { SessionMetrics } from '../types';
import { saveSessionPayload } from '../lib/firebaseAuth';
import {
  flushTrackingEvents,
  setTrackingSession,
  trackTelemetryEvent,
  updateTrackingModule
} from '../analytics/telemetry';

export interface SubmitMergePayloadOptions {
  chapterId?: string;
  isSync?: boolean;
}

export const submitMergePayload = async (
  session: any,
  status: 'completed' | 'exited_midway',
  options: SubmitMergePayloadOptions = {}
) => {
  const { chapterId = 'grade8_data_handling', isSync = false } = options;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || sessionStorage.getItem('token') || '';
  const redirectStudentId = params.get('student_id') || session?.studentId || '';
  const redirectSessionId = params.get('session_id') || session?.chapterSessionId || '';

  if (token) sessionStorage.setItem('token', token);
  if (params.get('student_id')) sessionStorage.setItem('student_id', params.get('student_id') as string);
  if (redirectSessionId) sessionStorage.setItem('session_id', redirectSessionId);

  if (!session || !session.chapterSessionId || !session.chapterMetrics) {
    console.warn('Invalid session or metrics for payload submission');
    return;
  }

  const finalSessionId = redirectSessionId || session.chapterSessionId;
  if (!finalSessionId) {
    console.warn('Missing session_id from redirect URL');
    return;
  }

  // Enforce one payload submit per session. Retries are handled via retry queue.
  if (isDuplicateSubmission(finalSessionId)) {
    console.warn(`Duplicate submission prevented for session ${finalSessionId}`);
    return;
  }

  const chapterData = getChapterDataForPath(session?.learningPath || 'B');

  // Compute total questions and hints by tallying from chapterData
  let totalHints = 0;
  let totalQuestions = 0;

  Object.values(chapterData).forEach(mod => {
    mod.concepts.forEach(c => {
      totalQuestions += c.questions?.length || 0;
      c.questions?.forEach(q => {
        if (q.hint) totalHints++;
      });
    });
  });

  const completionRatio = session.moduleProgress
    ? Math.min(session.moduleProgress.filter((m: any) => m.completed).length / Math.max(chapterData.length, 1), 1)
    : 0;

  const m = session.chapterMetrics as SessionMetrics;
  const computedTotalTime = Math.floor((Date.now() - m.startTime) / 1000);
  const timeSpent = m.activeTimeSpent > 0 ? m.activeTimeSpent : computedTotalTime;

  const payload: MergeSessionPayload = mergePayloadFormatter(
    {
      ...session,
      studentId: redirectStudentId || session.studentId,
    },
    finalSessionId,
    status,
    chapterId,
    {
      correct: m.correctAnswers,
      wrong: m.wrongAnswers,
      attempted: m.questionsAttempted.length,
      total: totalQuestions > 0 ? totalQuestions : 10,
      retries: m.retryCount,
      hintsUsed: m.hintsUsed,
      totalHints: totalHints > 0 ? totalHints : 10,
      timeSpent,
      completionRatio
    }
  );

  const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://kaushik-dev.online/api/recommend/';

  if (!token) {
    console.warn('Missing redirect token. Cannot call recommendation API without Authorization header.');
    return;
  }

  if (payload.validation_passed === false) {
    console.warn('Payload validation failed:', payload.validation_errors || []);
    return;
  }

  markSessionAsSubmitted(finalSessionId);

  // Attempt submission with retry mechanism
  const result = await submitPayloadWithRetry(payload, endpoint, token);

  // Persist final payload in Firebase for user and admin querying
  await saveSessionPayload(payload);

  if (result.success) {
    console.log('✓ Payload submitted successfully');

    const recommendation = result.data;
    if (!isSync && recommendation?.recommendation) {
      localStorage.setItem('dataquest-last-recommendation', JSON.stringify(recommendation));
      const reason = recommendation?.recommendation?.reason;
      const nextStep = recommendation?.recommendation?.next_steps?.[0];
      if (reason) {
        window.alert(nextStep ? `${reason}\nNext: ${nextStep}` : reason);
      }
    }
  } else {
    console.warn('Payload queued for retry:', result.error);
  }

  // Always store it for Admin Dashboard visibility
  const adminStored = JSON.parse(localStorage.getItem('dataquest-admin-payloads') || '[]');
  adminStored.push({
    ...payload,
    student_name: session.name,
    submission_result: result.success ? 'success' : 'queued_for_retry'
  });
  localStorage.setItem('dataquest-admin-payloads', JSON.stringify(adminStored));

  // Use sendBeacon for sync submissions (e.g., page unload)
  if (isSync) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }
};

export const useMergeIntegration = (chapterId: string = 'grade8_data_handling') => {
  const { session, updateSession } = useSessionStore();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    // Initialize session metrics if not already done
    if (session && !session.chapterSessionId) {
      const params = new URLSearchParams(window.location.search);
      const redirectStudentId = params.get('student_id') || session.studentId;
      const redirectSessionId = params.get('session_id') || session.chapterSessionId;
      const token = params.get('token') || sessionStorage.getItem('token');

      if (token) sessionStorage.setItem('token', token);
      if (params.get('student_id')) sessionStorage.setItem('student_id', params.get('student_id') as string);
      if (redirectSessionId) sessionStorage.setItem('session_id', redirectSessionId);

      if (!redirectSessionId) {
        console.warn('Missing redirect session_id. Merge payload submission will be disabled for this run.');
      }

      updateSession({
        studentId: redirectStudentId || session.studentId,
        ...(redirectSessionId ? { chapterSessionId: redirectSessionId } : {}),
        chapterMetrics: {
          startTime: Date.now(),
          correctAnswers: 0,
          wrongAnswers: 0,
          questionsAttempted: [],
          questionAttemptCounts: {},
          retryCount: 0,
          hintsUsed: 0,
          totalHintsEmbedded: 0,
          activeTimeSpent: 0,
          idleTimeSpent: 0,
          lastActivityTime: Date.now(),
          optionMarkedCount: 0,
          optionChangedCount: 0,
          remedialClicks: 0,
          settingsChanges: 0,
        } as SessionMetrics,
        sessionStatus: 'in_progress'
      });

      setTrackingSession({
        studentId: redirectStudentId || session.studentId,
        sessionId: redirectSessionId || `app_${session.studentId}`,
        chapterId,
      });
      trackTelemetryEvent('session_start', {
        event_data: {
          source: 'useMergeIntegration',
        }
      });
    } else if (session?.studentId && session?.chapterSessionId) {
      setTrackingSession({
        studentId: session.studentId,
        sessionId: session.chapterSessionId,
        chapterId,
      });
    }

    // Handle page unload - submit as exited_midway
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleUnload = () => {
      if (session && session.sessionStatus !== 'completed') {
        trackTelemetryEvent('session_end', {
          event_data: {
            status: 'exited_midway',
            reason: 'window_unload',
          }
        });
        flushTrackingEvents();
        submitMergePayload(session, 'exited_midway', { chapterId, isSync: true });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // Periodically process retry queue (check every 30 seconds)
    const retryInterval = setInterval(() => {
      const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://merge.dataquest.local/api/session';
      processRetryQueue(endpoint).catch(err => console.error('Retry queue processing error:', err));
      flushTrackingEvents().catch(err => console.error('Telemetry flush error:', err));
    }, 30000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      clearInterval(retryInterval);
    };
  }, [session, updateSession, chapterId]);

  const handleExitAttempt = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = async () => {
    if (session) {
      updateTrackingModule(undefined);
      trackTelemetryEvent('session_end', {
        event_data: {
          status: 'exited_midway',
          reason: 'manual_exit',
        }
      });
      await flushTrackingEvents();
      await submitMergePayload(session, 'exited_midway', { chapterId });
      updateSession({ sessionStatus: 'exited_midway', exitConfirmed: true });
    }
    setShowExitConfirm(false);
    // Navigate away or close
    window.location.href = '/';
  };

  const handleResume = () => {
    setShowExitConfirm(false);
  };

  return {
    session,
    showExitConfirm,
    handleExitAttempt,
    handleConfirmExit,
    handleResume,
    submitMergePayload
  };
};