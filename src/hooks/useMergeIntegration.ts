import { useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { mergePayloadFormatter, MergeSessionPayload } from '../integration/mergePayload';
import { chapterData } from '../data/chapterData';

export const submitMergePayload = (session: any, status: 'completed' | 'exited_midway', isSync = false) => {
  if (!session || !session.chapterSessionId || !session.chapterMetrics) return;

  // Compute total questions by tallying from chapterData
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

  const completionRatio = session.moduleProgress ? 
      Math.min(session.moduleProgress.filter((m: any) => m.completed).length / Math.max(Object.keys(chapterData).length, 1), 1) : 0;

  const m = session.chapterMetrics;
  const timeSpent = Math.floor((Date.now() - m.startTime) / 1000);

  const payload: MergeSessionPayload = mergePayloadFormatter(
    session,
    session.chapterSessionId,
    status,
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

  const endpoint = 'https://merge.dataquest.local/api/session';
  
  if (isSync && navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  } else {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(err => {
      const stored = JSON.parse(localStorage.getItem('merge_failed') || '[]');
      stored.push(payload);
      localStorage.setItem('merge_failed', JSON.stringify(stored));
    });
  }
};

export const useMergeIntegration = () => {
  const { session, updateSession } = useSessionStore();

  useEffect(() => {
    if (session && !session.chapterSessionId) {
      updateSession({
        chapterSessionId: 's_' + session.studentId + '_g8data_' + Date.now(),
        chapterMetrics: {
          startTime: Date.now(),
          correctAnswers: 0,
          wrongAnswers: 0,
          questionsAttempted: [],
          retryCount: 0,
          hintsUsed: 0
        }
      });
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleUnload = () => {
      if (session) {
        submitMergePayload(session, 'exited_midway', true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [session]);

  return { session };
};