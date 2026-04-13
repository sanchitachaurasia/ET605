/**
 * useMergeTeamIntegration Hook
 * 
 * Handles sending session data to Merge Team at:
 * 1. Chapter completion (all concepts done)
 * 2. Confirmed exit (user confirms exit modal)
 * 
 * Features:
 * - Collects all session metrics from Zustand store
 * - Formats payload per Merge Team schema
 * - Submits to the recommendation API
 * - Handles network failures with local retry queue
 * - Prevents duplicate submissions with session_id reuse
 */

import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { getChapterDataForPath } from '../data/Standard/pathData';
import { mergePayloadFormatter, MergeSessionPayload } from '../integration/mergePayload';
import { markSessionAsSubmitted, isDuplicateSubmission } from '../integration/payloadRetryManager';
import { SessionMetrics } from '../types';

interface MergeSubmissionStatus {
  submitted: boolean;
  error: string | null;
  session_id: string | null;
  timestamp: string | null;
}

export function useMergeTeamIntegration() {
  const session = useSessionStore((state) => state.session);
  const [status, setStatus] = useState<MergeSubmissionStatus>({
    submitted: false,
    error: null,
    session_id: null,
    timestamp: null
  });

  const getRequestContext = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') || sessionStorage.getItem('token') || '';
    const studentId = params.get('student_id') || session?.studentId || '';
    const sessionId = params.get('session_id') || session?.chapterSessionId || '';

    if (params.get('token')) sessionStorage.setItem('token', params.get('token') as string);
    if (params.get('student_id')) sessionStorage.setItem('student_id', params.get('student_id') as string);
    if (params.get('session_id')) sessionStorage.setItem('session_id', params.get('session_id') as string);

    return { token, studentId, sessionId };
  };

  /**
   * Build recommendation payload from session metrics
   */
  const buildRecommendationPayload = (
    sessionStatus: 'completed' | 'exited_midway'
  ): MergeSessionPayload | null => {
    if (!session) return null;

    const { studentId, sessionId } = getRequestContext();
    if (!studentId || !sessionId) return null;

    const chapterData = getChapterDataForPath(session.learningPath || 'B');
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

    const completedConcepts = session.conceptsCompleted?.length || 0;
    const completionRatio = chapterData.length > 0
      ? Math.min(1, Math.max(0, completedConcepts / chapterData.length))
      : 0;

    const metrics = session.chapterMetrics as SessionMetrics | undefined;
    if (!metrics) return null;

    const totalTime = Math.floor((Date.now() - metrics.startTime) / 1000);
    const timeSpent = metrics.activeTimeSpent > 0 ? metrics.activeTimeSpent : totalTime;

    return mergePayloadFormatter(
      {
        ...session,
        studentId,
      },
      sessionId,
      sessionStatus,
      'grade8_data_handling',
      {
        correct: metrics.correctAnswers,
        wrong: metrics.wrongAnswers,
        attempted: metrics.questionsAttempted.length,
        total: totalQuestions > 0 ? totalQuestions : (session.totalQuestions || 0),
        retries: metrics.retryCount,
        hintsUsed: metrics.hintsUsed,
        totalHints: totalHints > 0 ? totalHints : (session.totalHintsEmbedded || 0),
        timeSpent,
        completionRatio,
      }
    );
  };

  /**
   * Submit payload to Merge Team
   */
  const submitToMergeTeam = async (
    sessionStatus: 'completed' | 'exited_midway' = 'completed'
  ): Promise<boolean> => {
    try {
      const { token } = getRequestContext();
      const payload = buildRecommendationPayload(sessionStatus);
      if (!payload) {
        console.warn('[Merge] No session data available');
        return false;
      }

      if (payload.validation_passed === false) {
        console.error('[Merge] Validation failed:', payload.validation_errors);
        setStatus({
          submitted: false,
          error: `Validation failed: ${(payload.validation_errors || []).join(', ')}`,
          session_id: payload.session_id || null,
          timestamp: null
        });
        return false;
      }

      if (isDuplicateSubmission(payload.session_id)) {
        console.warn(`[Merge] Duplicate submission prevented for session ${payload.session_id}`);
        return true;
      }

      markSessionAsSubmitted(payload.session_id);

      const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://kaushik-dev.online/api/recommend/';

      console.log(`[Merge] Submitting recommendation payload for session ${payload.session_id}...`);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
        keepalive: sessionStatus === 'exited_midway'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${response.status}: ${errorData.error || 'Unknown error'}`
        );
      }

      const result = await response.json();

      setStatus({
        submitted: true,
        error: null,
        session_id: payload.session_id || null,
        timestamp: payload.timestamp || null
      });

      console.log('[Merge] Submission successful:', result);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('[Merge] Submission failed:', errorMessage);

      setStatus({
        submitted: false,
        error: errorMessage,
        session_id: session?.chapterSessionId || null,
        timestamp: new Date().toISOString()
      });

      // Store for local retry queue
      storeForRetry(buildRecommendationPayload(sessionStatus), getRequestContext().token);
      return false;
    }
  };

  /**
   * Store failed payload in localStorage for retry
   */
  const storeForRetry = (payload: Partial<MergeSessionPayload> | null, token?: string) => {
    if (!payload) return;

    try {
      const retryQueue = JSON.parse(
        localStorage.getItem('merge_retry_queue') || '[]'
      );

      retryQueue.push({
        payload,
        token,
        timestamp: Date.now(),
        attempts: 0,
        lastError: null
      });

      localStorage.setItem('merge_retry_queue', JSON.stringify(retryQueue));
      console.log('[Merge] Stored in retry queue for later submission');
    } catch (error) {
      console.error('[Merge] Failed to store retry:', error);
    }
  };

  /**
   * Attempt to submit queued payloads on app startup
   */
  useEffect(() => {
    const retryQueuedSubmissions = async () => {
      try {
        const retryQueue = JSON.parse(
          localStorage.getItem('merge_retry_queue') || '[]'
        );

        if (retryQueue.length === 0) return;

        console.log(`[Merge] Found ${retryQueue.length} queued submissions`);

        for (let i = 0; i < retryQueue.length; i++) {
          const queued = retryQueue[i];
          const backoff = Math.pow(2, queued.attempts) * 1000; // exponential
          const timeSinceLastAttempt = Date.now() - queued.timestamp;

          if (timeSinceLastAttempt < backoff) {
            continue; // Not ready to retry yet
          }

          if (queued.attempts >= 3) {
            console.warn(`[Merge] Max retries reached for session ${queued.payload.session_id}`);
            retryQueue.splice(i, 1);
            localStorage.setItem('merge_retry_queue', JSON.stringify(retryQueue));
            continue;
          }

          // Attempt submission
          try {
            const response = await fetch(import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://kaushik-dev.online/api/recommend/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(queued.token || sessionStorage.getItem('token') ? { Authorization: `Bearer ${queued.token || sessionStorage.getItem('token')}` } : {})
              },
              body: JSON.stringify(queued.payload)
            });

            if (response.ok) {
              console.log(`[Merge] Queued submission succeeded: ${queued.payload.session_id}`);
              retryQueue.splice(i, 1);
              localStorage.setItem('merge_retry_queue', JSON.stringify(retryQueue));
            } else {
              queued.attempts++;
              queued.lastError = `HTTP ${response.status}`;
            }
          } catch (error) {
            queued.attempts++;
            queued.lastError = String(error);
          }
        }

        localStorage.setItem('merge_retry_queue', JSON.stringify(retryQueue));
      } catch (error) {
        console.error('[Merge] Error processing retry queue:', error);
      }
    };

    // Run on mount (to catch queued submissions from previous sessions)
    retryQueuedSubmissions();
  }, []);

  return {
    submitToMergeTeam,
    status,
    payload: buildRecommendationPayload('completed')
  };
}

/**
 * Integration with ExitConfirmationModal
 * 
 * When user clicks "Exit Chapter", modal should:
 * 1. Show confirmation message
 * 2. On confirm: submitToMergeTeam('exited_midway')
 * 3. On cancel: stay in chapter
 * 
 * When user completes all concepts:
 * 1. Show completion screen
 * 2. Auto-submit: submitToMergeTeam('completed')
 */
