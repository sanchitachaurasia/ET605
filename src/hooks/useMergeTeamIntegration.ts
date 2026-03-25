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
 * - Submits to /api/merge/session-submit
 * - Handles network failures with local retry queue
 * - Prevents duplicate submissions with session_id reuse
 */

import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { MergeTeamSessionPayload, MergeTeamPayloadValidator } from '../backend/mergeTeamPayload';

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

  /**
   * Build Merge Team payload from session metrics
   */
  const buildMergePayload = (): Partial<MergeTeamSessionPayload> | null => {
    if (!session) return null;

    const completed_concepts = session.conceptsCompleted?.length || 0;
    const total_concepts = 20; // From our expanded curriculum

    return {
      student_id: session.student_id || 'anonymous',
      session_id: session.session_id,
      chapter_id: 'grade8_data_handling_probability',
      timestamp: new Date().toISOString(),
      session_status: 'completed',
      
      // Question metrics
      correct_answers: session.correctAnswers || 0,
      wrong_answers: session.wrongAnswers || 0,
      questions_attempted: session.questionsAttempted?.length || 0,
      total_questions: session.totalQuestions || 50, // Approximate for 20 concepts
      
      // Attempt & hint tracking
      retry_count: session.retryCount || 0,
      hints_used: session.hintsUsed || 0,
      total_hints_embedded: session.totalHintsEmbedded || 100, // Approximate

      // Time & progress
      time_spent_seconds: Math.round((session.activeTimeSpent || 0) / 1000), // Convert ms → seconds
      topic_completion_ratio: completed_concepts / total_concepts
    };
  };

  /**
   * Submit payload to Merge Team
   */
  const submitToMergeTeam = async (
    sessionStatus: 'completed' | 'exited_midway' = 'completed'
  ): Promise<boolean> => {
    try {
      const payload = buildMergePayload();
      if (!payload) {
        console.warn('[Merge] No session data available');
        return false;
      }

      // Update status before submission
      payload.session_status = sessionStatus;

      // Validate payload
      const validation = MergeTeamPayloadValidator.validate(payload);
      if (!validation.valid) {
        console.error('[Merge] Validation failed:', validation.errors);
        setStatus({
          submitted: false,
          error: `Validation failed: ${validation.errors.join(', ')}`,
          session_id: payload.session_id || null,
          timestamp: null
        });
        return false;
      }

      console.log(`[Merge] Submitting session ${payload.session_id}...`);

      // Submit to backend
      const response = await fetch('/api/merge/session-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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
        session_id: session?.session_id || null,
        timestamp: new Date().toISOString()
      });

      // Store for local retry queue
      storeForRetry(buildMergePayload());
      return false;
    }
  };

  /**
   * Store failed payload in localStorage for retry
   */
  const storeForRetry = (payload: Partial<MergeTeamSessionPayload> | null) => {
    if (!payload) return;

    try {
      const retryQueue = JSON.parse(
        localStorage.getItem('merge_retry_queue') || '[]'
      );

      retryQueue.push({
        payload,
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
            const response = await fetch('/api/merge/session-submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
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
    payload: buildMergePayload()
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
