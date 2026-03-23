import { useState, useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { useAdaptivePath } from './useAdaptivePath';

export const useConstraintEngine = (conceptId: string, moduleId?: string) => {
  const { session, updateSession, updateMetrics } = useSessionStore();
  const { remediationThreshold } = useAdaptivePath();
  
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(session?.isStruggling || false);
  const [showRemediation, setShowRemediation] = useState(false);

  useEffect(() => {
    setAttempts(0);
    setShowHint(session?.isStruggling || false);
    setShowRemediation(false);
  }, [conceptId, session?.isStruggling]);

  const onAnswer = (isCorrect: boolean) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const wasAttempted = session?.chapterMetrics?.questionsAttempted?.includes(conceptId);
    
    updateMetrics({
      correctAnswers: isCorrect ? (session?.chapterMetrics?.correctAnswers || 0) + 1 : (session?.chapterMetrics?.correctAnswers || 0),
      wrongAnswers: !isCorrect ? (session?.chapterMetrics?.wrongAnswers || 0) + 1 : (session?.chapterMetrics?.wrongAnswers || 0),
      retryCount: wasAttempted || newAttempts > 1 ? (session?.chapterMetrics?.retryCount || 0) + 1 : (session?.chapterMetrics?.retryCount || 0),
      questionsAttempted: Array.from(new Set([...(session?.chapterMetrics?.questionsAttempted || []), conceptId]))
    });

    if (!isCorrect) {
      if (newAttempts === 1) {
        if (!showHint) {
          updateMetrics({ hintsUsed: (session?.chapterMetrics?.hintsUsed || 0) + 1 });
        }
        setShowHint(true);
      } else if (newAttempts >= 2) {
        setShowHint(false);
        setShowRemediation(true);
        if (moduleId && session) {
          const prog = session.moduleProgress.find(p => p.moduleId === moduleId);
          if (prog) {
            const key = conceptId + '_struggle';
            const newAttemptsCount = { ...prog.attemptsCount, [key]: (prog.attemptsCount[key] || 0) + 1 };
            const struggles = Object.keys(newAttemptsCount).filter(k => k.endsWith('_struggle')).length;
            
            updateSession({
              isStruggling: session.isStruggling || struggles >= 2,
              moduleProgress: session.moduleProgress.map(p => 
                p.moduleId === moduleId ? { ...p, attemptsCount: newAttemptsCount } : p
              )
            });
          }
        }
      }
    }

    return isCorrect;
  };

  return {
    attempts,
    showHint,
    showRemediation,
    onAnswer,
  };
};
