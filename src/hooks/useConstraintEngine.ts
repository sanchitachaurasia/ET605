import { useState, useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { useAdaptivePath } from './useAdaptivePath';

export const useConstraintEngine = (conceptId: string) => {
  const { session, updateSession } = useSessionStore();
  const { remediationThreshold } = useAdaptivePath();
  
  const [attempts, setAttempts] = useState(0);
  const [showRemediation, setShowRemediation] = useState(false);

  useEffect(() => {
    setAttempts(0);
    setShowRemediation(false);
  }, [conceptId]);

  const onAnswer = (isCorrect: boolean) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (!isCorrect) {
      if (newAttempts >= remediationThreshold) {
        setShowRemediation(true);
      }
    }

    return isCorrect;
  };

  return {
    attempts,
    showRemediation,
    onAnswer,
  };
};
