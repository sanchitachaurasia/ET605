import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { mergePayloadFormatter, MergeSessionPayload } from '../integration/mergePayload';
import {
  submitPayloadWithRetry,
  processRetryQueue,
  markSessionAsSubmitted,
  isDuplicateSubmission
} from '../integration/payloadRetryManager';
import { chapterData } from '../data/chapterData';
import { SessionMetrics } from '../types';

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

  if (!session || !session.chapterSessionId || !session.chapterMetrics) {
    console.warn('Invalid session or metrics for payload submission');
    return;
  }

  // Check for duplicate submission
  if (isDuplicateSubmission(session.chapterSessionId)) {
    console.warn(`Duplicate submission detected for session ${session.chapterSessionId}, reusing same session_id`);
  }

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
    ? Math.min(session.moduleProgress.filter((m: any) => m.completed).length / Math.max(Object.keys(chapterData).length, 1), 1)
    : 0;

  const m = session.chapterMetrics as SessionMetrics;
  const timeSpent = Math.floor((Date.now() - m.startTime) / 1000);

  const payload: MergeSessionPayload = mergePayloadFormatter(
    session,
    session.chapterSessionId,
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

  const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://merge.dataquest.local/api/session';

  // Attempt submission with retry mechanism
  const result = await submitPayloadWithRetry(payload, endpoint);

  if (result.success) {
    markSessionAsSubmitted(session.chapterSessionId);
    console.log('✓ Payload submitted successfully');
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
  if (isSync && navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  }
};

export const useMergeIntegration = (chapterId: string = 'grade8_data_handling') => {
  const { session, updateSession } = useSessionStore();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    // Initialize session metrics if not already done
    if (session && !session.chapterSessionId) {
      updateSession({
        chapterSessionId: `s_${session.studentId}_${chapterId}_${Date.now()}`,
        chapterMetrics: {
          startTime: Date.now(),
          correctAnswers: 0,
          wrongAnswers: 0,
          questionsAttempted: [],
          retryCount: 0,
          hintsUsed: 0,
          totalHintsEmbedded: 0,
          activeTimeSpent: 0,
          lastActivityTime: Date.now()
        } as SessionMetrics,
        sessionStatus: 'in_progress'
      });
    }

    // Handle page unload - submit as exited_midway
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleUnload = () => {
      if (session && session.sessionStatus !== 'completed') {
        submitMergePayload(session, 'exited_midway', { chapterId, isSync: true });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // Periodically process retry queue (check every 30 seconds)
    const retryInterval = setInterval(() => {
      const endpoint = import.meta.env.VITE_MERGE_API_ENDPOINT || 'https://merge.dataquest.local/api/session';
      processRetryQueue(endpoint).catch(err => console.error('Retry queue processing error:', err));
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