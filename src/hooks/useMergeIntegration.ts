import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { mergePayloadFormatter, MergeSessionPayload } from '../integration/mergePayload';
import {
  submitPayloadWithRetry,
  processRetryQueue,
  markSessionAsSubmitted,
  isDuplicateSubmission,
  queueSubmissionForRetry
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
  const liveSession = useSessionStore.getState().session;
  const effectiveSession = liveSession || session;

  const { chapterId = 'grade8_data_handling', isSync = false } = options;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || sessionStorage.getItem('token') || '';
  const redirectStudentId = params.get('student_id') || effectiveSession?.studentId || '';
  const redirectSessionId = params.get('session_id') || effectiveSession?.chapterSessionId || '';

  if (token) sessionStorage.setItem('token', token);
  if (params.get('student_id')) sessionStorage.setItem('student_id', params.get('student_id') as string);
  if (redirectSessionId) sessionStorage.setItem('session_id', redirectSessionId);

  if (!effectiveSession || !effectiveSession.chapterSessionId || !effectiveSession.chapterMetrics) {
    console.warn('Invalid session or metrics for payload submission');
    return;
  }

  const finalSessionId = redirectSessionId || effectiveSession.chapterSessionId;
  if (!finalSessionId) {
    console.warn('Missing session_id from redirect URL');
    return;
  }

  // Enforce one payload submit per session. Retries are handled via retry queue.
  if (isDuplicateSubmission(finalSessionId)) {
    console.warn(`Duplicate submission prevented for session ${finalSessionId}`);
    return;
  }

  const chapterData = getChapterDataForPath(effectiveSession?.learningPath || 'B');

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

  const completionRatio = effectiveSession.moduleProgress
    ? Math.min(effectiveSession.moduleProgress.filter((m: any) => m.completed).length / Math.max(chapterData.length, 1), 1)
    : 0;

  const m = effectiveSession.chapterMetrics as SessionMetrics;
  const computedTotalTime = Math.floor((Date.now() - m.startTime) / 1000);
  const timeSpent = m.activeTimeSpent > 0 ? m.activeTimeSpent : computedTotalTime;

  const payload: MergeSessionPayload = mergePayloadFormatter(
    {
      ...effectiveSession,
      studentId: redirectStudentId || effectiveSession.studentId,
    },
    finalSessionId,
    status,
    chapterId,
    {
      correct: m.correctAnswers,
      wrong: m.wrongAnswers,
      attempted: m.questionsAttempted.length,
      total: totalQuestions > 0 ? totalQuestions : null,
      retries: m.retryCount,
      hintsUsed: m.hintsUsed,
      totalHints: totalHints > 0 ? totalHints : null,
      timeSpent,
      completionRatio
    }
  );

  const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://kaushik-dev.online/api/recommend/';

  console.log('[Merge][Submit] Preparing recommendation payload', {
    status,
    isSync,
    endpoint,
    studentId: redirectStudentId,
    sessionId: redirectSessionId || session?.chapterSessionId,
    tokenPresent: Boolean(token),
  });

  if (!token) {
    console.warn('[Merge][Submit] Missing redirect token. Cannot call recommendation API without Authorization header.', {
      search: window.location.search,
        sessionId: redirectSessionId || effectiveSession?.chapterSessionId,
    });
    return;
  }

  if (payload.validation_passed === false) {
    console.warn('Payload validation failed:', payload.validation_errors || []);
    return;
  }

  markSessionAsSubmitted(finalSessionId);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  if (isSync) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        keepalive: true,
      });

      console.log('[Merge][Submit] Sync response received', {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      await saveSessionPayload(payload).catch(() => undefined);
      return;
    } catch (error) {
      console.warn('Sync recommendation submission failed:', error);
      queueSubmissionForRetry(payload, token);
      return;
    }
  }

  // Attempt submission with retry mechanism
  const result = await submitPayloadWithRetry(payload, endpoint, token);

  // Persist final payload in Firebase for user and admin querying
  await saveSessionPayload(payload);

  if (result.success) {
    console.log('[Merge][Submit] Payload submitted successfully', {
      status,
      sessionId: finalSessionId,
      hasResponse: Boolean(result.data),
      response: result.data,
    });

    const recommendation = result.data;
    if (!isSync && recommendation?.recommendation) {
      localStorage.setItem('dataquest-last-recommendation', JSON.stringify(recommendation));
      window.dispatchEvent(new CustomEvent('dataquest:recommendation', {
        detail: recommendation,
      }));
    } else if (!isSync) {
      console.warn('[Merge][Submit] API response missing recommendation object', {
        response: recommendation,
      });
    }
  } else {
    console.warn('[Merge][Submit] Payload queued for retry', {
      error: result.error,
      sessionId: finalSessionId,
    });
  }

  // Always store it for Admin Dashboard visibility
  const adminStored = JSON.parse(localStorage.getItem('dataquest-admin-payloads') || '[]');
  adminStored.push({
    ...payload,
    student_name: effectiveSession.name,
    submission_result: result.success ? 'success' : 'queued_for_retry'
  });
  localStorage.setItem('dataquest-admin-payloads', JSON.stringify(adminStored));

};

export const useMergeIntegration = (chapterId: string = 'grade8_data_handling') => {
  const { session, updateSession } = useSessionStore();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    // Initialize session metrics if not already done
    if (session) {
      const params = new URLSearchParams(window.location.search);
      const redirectStudentId = params.get('student_id') || session.studentId;
      const redirectSessionId = params.get('session_id') || session.chapterSessionId;
      const token = params.get('token') || sessionStorage.getItem('token');

      const shouldStartNewChapterSession = Boolean(
        redirectSessionId && redirectSessionId !== session.chapterSessionId
      );
      const shouldInitMetrics = !session.chapterMetrics || shouldStartNewChapterSession;

      if (token) sessionStorage.setItem('token', token);
      if (params.get('student_id')) sessionStorage.setItem('student_id', params.get('student_id') as string);
      if (redirectSessionId) sessionStorage.setItem('session_id', redirectSessionId);

      if (!redirectSessionId) {
        console.warn('Missing redirect session_id. Merge payload submission will be disabled for this run.');
      }

      if (!session.chapterSessionId || shouldStartNewChapterSession) {
        updateSession({
          studentId: redirectStudentId || session.studentId,
          ...(redirectSessionId ? { chapterSessionId: redirectSessionId } : {}),
          ...(shouldInitMetrics
            ? {
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
              }
            : {}),
          sessionStatus: 'in_progress'
        });
      }

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

    const handleUnload = () => {
      if (session && session.sessionStatus !== 'completed') {
        trackTelemetryEvent('session_end', {
          event_data: {
            status: 'exited_midway',
            reason: 'window_unload',
          }
        });
        flushTrackingEvents();
        
        submitMergePayload(session, 'exited_midway', { chapterId, isSync: true }).catch(() => undefined);
      }
    };

    window.addEventListener('pagehide', handleUnload);

    // Periodically process retry queue (check every 30 seconds)
    const retryInterval = setInterval(() => {
      const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://kaushik-dev.online/api/recommend/';
      processRetryQueue(endpoint).catch(err => console.error('Retry queue processing error:', err));
      flushTrackingEvents().catch(err => console.error('Telemetry flush error:', err));
    }, 30000);

    return () => {
      window.removeEventListener('pagehide', handleUnload);
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
      const result = await submitMergePayload(session, 'exited_midway', { chapterId });
      
      // Show alert that session has been saved
      window.alert('Session saved. Your progress has been recorded with status: exited_midway');
      
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