import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { chapterData } from '../data/chapterData';
import { ConceptBlock } from '../components/ConceptBlock';
import { GameQuestion } from '../components/GameQuestion';
import { RemediationBlock } from '../components/RemediationBlock';
import { RocketProgress } from '../components/RocketProgress';
import { useSessionStore } from '../store/sessionStore';
import { useConstraintEngine } from '../hooks/useConstraintEngine';
import { ChevronLeft, ChevronRight, CheckCircle, Settings } from 'lucide-react';
import { SettingsModal } from '../components/SettingsModal';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { useMergeIntegration, submitMergePayload } from '../hooks/useMergeIntegration';

export default function ModulePage() {
  useMergeIntegration();
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { session, updateSession } = useSessionStore();
  const moduleProgress = session?.moduleProgress?.find(p => p.moduleId === moduleId);
  const path = moduleProgress?.learningPath || session?.learningPath || 'B';

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentConceptIdx, setCurrentConceptIdx] = useState(() => moduleProgress?.currentConceptIdx || 0);
  const [showFinalAssessment, setShowFinalAssessment] = useState(false);
  const [finalAssessmentIdx, setFinalAssessmentIdx] = useState(0);

  useEffect(() => {
    setCurrentConceptIdx(moduleProgress?.currentConceptIdx || 0);
  }, [moduleId]);
  
  const module = chapterData.find(m => m.id === moduleId);

  if (!module || !session) return <div>Module not found</div>;

  const filteredConcepts = module.concepts.filter(c => !c.path || c.path === path);
  const rawSettings = session?.settings || ({} as any);
  const settings = {
    ...rawSettings,
    darkMode: rawSettings.darkMode || false,
    assessmentTime: rawSettings.assessmentTime || 'inModule',
  };
  const currentConcept = filteredConcepts[currentConceptIdx];
  const progress = showFinalAssessment 
    ? 100 
    : ((currentConceptIdx + 1) / filteredConcepts.length) * 100;

  const allQuestions = filteredConcepts.flatMap(c => c.questions.filter(q => !q.path || q.path === path));

  const handleExitClick = () => {
    if (window.confirm("Are you sure you want to exit? Your session progress will be recorded.")) {
      if (session) {
        submitMergePayload(session, 'exited_midway', false);
      }
      navigate('/dashboard');
    }
  };

  const handleModuleComplete = async () => {
    // Module Complete
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });
    
    // Update progress in session
    const newProgress = [...(session?.moduleProgress || [])];
    const modIdx = newProgress.findIndex(p => p.moduleId === moduleId);
    if (modIdx >= 0) {
      newProgress[modIdx].completed = true;
    } else {
      newProgress.push({
        moduleId: moduleId!,
        completed: true,
        score: 100,
        stars: 3,
        learningPath: path,
        masteryMap: {},
        attemptsCount: {}
      });
    }
    
    updateSession({ moduleProgress: newProgress, xp: (session?.xp || 0) + 500, sessionStatus: 'completed' });
    
    // Submit completion payload to Merge Team
    if (session) {
      try {
        await submitMergePayload(session, 'completed', { isSync: false });
        console.log('✓ Completion payload submitted to Merge Team');
      } catch (error) {
        console.error('Error submitting completion payload:', error);
        // Continue to dashboard even if submission fails (retry will be handled)
      }
    }
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleConceptComplete = () => {
    if (currentConceptIdx < filteredConcepts.length - 1) {
      const nextIdx = currentConceptIdx + 1;
      setCurrentConceptIdx(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const newProgress = [...(session?.moduleProgress || [])];
      const modIdx = newProgress.findIndex(p => p.moduleId === moduleId);
      if (modIdx >= 0) {
        newProgress[modIdx] = { ...newProgress[modIdx], currentConceptIdx: nextIdx };
      } else {
        newProgress.push({
          moduleId: moduleId!,
          completed: false,
          score: 0,
          stars: 0,
          learningPath: path,
          masteryMap: {},
          attemptsCount: {},
          currentConceptIdx: nextIdx
        });
      }
      updateSession({ moduleProgress: newProgress });
    } else {
      if (settings.assessmentTime === 'endOfModule' && allQuestions.length > 0) {
        setShowFinalAssessment(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleModuleComplete();
      }
    }
  };

  const [isFinalCorrect, setIsFinalCorrect] = useState(false);
  const [isRemediationExpanded, setIsRemediationExpanded] = useState(false);

  const currentFinalQuestion = allQuestions[finalAssessmentIdx];
  const { attempts, showHint, showRemediation, onAnswer: onFinalAnswer } = useConstraintEngine(currentFinalQuestion?.id || 'final', moduleId);

  const handleFinalQuestionComplete = () => {
    setIsFinalCorrect(false);
    setIsRemediationExpanded(false);
    if (finalAssessmentIdx < allQuestions.length - 1) {
      setFinalAssessmentIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleModuleComplete();
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 pb-20",
      settings.darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <header className={cn(
        "sticky top-0 z-10 px-6 py-4 shadow-sm backdrop-blur-md transition-colors",
        settings.darkMode ? "bg-slate-900/80 border-b border-slate-800" : "bg-white/80"
      )}>
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-8">
          <button 
            onClick={handleExitClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              settings.darkMode ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">
                {showFinalAssessment ? "Module Assessment" : `Module ${module.id}: ${module.title}`}
              </span>
              <span className="text-sm font-bold text-brand">
                {showFinalAssessment 
                  ? `${finalAssessmentIdx + 1} / ${allQuestions.length}`
                  : `${currentConceptIdx + 1} / ${filteredConcepts.length}`}
              </span>
            </div>
            <RocketProgress progress={progress} />
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95",
              settings.darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
            )}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-4xl px-6">
        <AnimatePresence mode="wait">
          {!showFinalAssessment ? (
            <motion.div
              key={currentConcept.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ConceptBlock 
                moduleId={moduleId!}
                concept={currentConcept} 
                path={path}
                onComplete={handleConceptComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="final-assessment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Module Assessment</h2>
                <p className="text-slate-600">Great job reading through the concepts! Now, let's test your knowledge with a final assessment.</p>
              </div>
              
              <GameQuestion
                key={allQuestions[finalAssessmentIdx].id}
                questionText={allQuestions[finalAssessmentIdx].text}
                options={allQuestions[finalAssessmentIdx].options}
                correctAnswer={allQuestions[finalAssessmentIdx].correctAnswer}
                format={allQuestions[finalAssessmentIdx].format}
                styles={allQuestions[finalAssessmentIdx].styles}
                image={allQuestions[finalAssessmentIdx].image}
                onAnswer={(isCorrect) => {
                  const result = onFinalAnswer(isCorrect);
                  if (result) {
                    setIsFinalCorrect(true);
                  }
                }}
              />

              {showHint && !showRemediation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-amber-50 p-6 border border-amber-200"
                >
                  <p className="font-bold text-amber-800 flex items-center gap-2">
                    <span className="text-xl">💡</span> Hint
                  </p>
                  <p className="mt-2 text-amber-700">{allQuestions[finalAssessmentIdx].hint}</p>
                </motion.div>
              )}

              {showRemediation && (
                <RemediationBlock
                  briefText={allQuestions[finalAssessmentIdx].remedialBrief}
                  detailedContent={
                    <div>
                      <p className="mb-4">{allQuestions[finalAssessmentIdx].remedialDetail}</p>
                      <p className="font-bold">💡 Hint: {allQuestions[finalAssessmentIdx].hint}</p>
                    </div>
                  }
                  autoExpand={true}
                  isExpanded={isRemediationExpanded}
                  onToggle={() => setIsRemediationExpanded(!isRemediationExpanded)}
                />
              )}

              {isFinalCorrect && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleFinalQuestionComplete}
                  className="w-full rounded-2xl bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
                >
                  Next Question
                  <span className="text-xl">→</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
