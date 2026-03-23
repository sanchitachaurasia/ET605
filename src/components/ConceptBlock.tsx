import React from 'react';
import { motion } from 'motion/react';
import { Concept, LearningPath } from '../types';
import { GameQuestion } from './GameQuestion';
import { RemediationBlock } from './RemediationBlock';
import { useConstraintEngine } from '../hooks/useConstraintEngine';
import { useAdaptivePath } from '../hooks/useAdaptivePath';
import { useSessionStore } from '../store/sessionStore';

interface ConceptBlockProps {
  concept: Concept;
  path: LearningPath;
  onComplete: () => void;
}

export const ConceptBlock: React.FC<ConceptBlockProps> = ({ concept, path, onComplete }) => {
  const { session } = useSessionStore();
  const settings = session?.settings || { contentMode: 'video', assessmentTime: 'inModule' };
  const { remediationAutoExpand } = useAdaptivePath();
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [isRemediationExpanded, setIsRemediationExpanded] = React.useState(false);
  
  const [isCorrectAnswered, setIsCorrectAnswered] = React.useState(false);
  
  const filteredQuestions = concept.questions.filter(q => !q.path || q.path === path);

  const showQuestionsInBlock = settings.assessmentTime === 'inModule';

  const handleAnswer = (isCorrect: boolean) => {
    const result = onAnswer(isCorrect);
    if (result) {
      setIsCorrectAnswered(true);
    }
  };

  const handleNext = () => {
    setIsCorrectAnswered(false);
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  // If no questions or questions are at end of module, and we are in-module, just show content
  React.useEffect(() => {
    if ((filteredQuestions.length === 0 || !showQuestionsInBlock)) {
       // We need a way to signal completion of the CONTENT part
       // But handleConceptComplete in ModulePage currently handles both
    }
  }, [filteredQuestions.length, showQuestionsInBlock]);

  const currentQuestion = filteredQuestions[currentQuestionIdx];
  const { attempts, showRemediation, onAnswer } = useConstraintEngine(currentQuestion?.id || '');

  const showQuestions = showQuestionsInBlock && filteredQuestions.length > 0;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-8 shadow-xl"
      >
        <h2 className="mb-6 text-3xl font-black text-slate-900">{concept.title}</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-600">{concept.textContent}</p>
        </div>

        {settings.contentMode === 'video' && (
          <div className="mt-8 aspect-video rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border-2 border-slate-200">
             <div className="text-center">
                <p className="text-slate-400 font-bold mb-2">Video Placeholder</p>
                <p className="text-xs text-slate-300">{concept.videoUrl}</p>
             </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-slate-800">Worked Examples:</h3>
          {concept.workedExamples.map((ex, i) => (
            <div key={i} className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
              <p className="font-bold text-blue-800 mb-2">{ex.explanation}</p>
              <ul className="list-inside list-disc space-y-1 text-blue-700">
                {ex.steps.map((step, si) => <li key={si}>{step}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {!showQuestions && (
          <button
            onClick={onComplete}
            className="mt-8 w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
          >
            I've Read This Concept
          </button>
        )}
      </motion.div>

      {showQuestions && (
        <div className="space-y-4">
          <GameQuestion
            key={currentQuestion.id}
            questionText={currentQuestion.text}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            format={currentQuestion.format}
            styles={currentQuestion.styles}
            image={currentQuestion.image}
            onAnswer={handleAnswer}
          />

          {isCorrectAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
            >
              Next
              <span className="text-xl">→</span>
            </motion.button>
          )}

          {showRemediation && (
            <RemediationBlock
              briefText={currentQuestion.remedialBrief}
              detailedContent={
                <div>
                  <p className="mb-4">{currentQuestion.remedialDetail}</p>
                  <p className="font-bold">💡 Hint: {currentQuestion.hint}</p>
                </div>
              }
              autoExpand={remediationAutoExpand}
              isExpanded={isRemediationExpanded}
              onToggle={() => setIsRemediationExpanded(!isRemediationExpanded)}
            />
          )}
        </div>
      )}
    </div>
  );
};
