import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSessionStore } from '../store/sessionStore';

interface RemediationBlockProps {
  briefText: string;
  detailedContent: ReactNode;
  autoExpand: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export const RemediationBlock = ({
  briefText,
  detailedContent,
  autoExpand,
  isExpanded,
  onToggle,
}: RemediationBlockProps) => {
  const { session } = useSessionStore();
  const darkMode = session?.settings?.darkMode;
  const expanded = autoExpand || isExpanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mt-6 overflow-hidden rounded-2xl border-l-8 p-6 shadow-lg transition-colors",
        darkMode 
          ? "border-amber-500 bg-amber-950/20 text-amber-200" 
          : "border-amber-400 bg-amber-50 text-amber-900"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            darkMode ? "bg-amber-900/40 text-amber-400" : "bg-amber-200 text-amber-700"
          )}>
            <Lightbulb size={18} />
          </div>
          <p className="text-base font-bold leading-tight">{briefText}</p>
        </div>
        {!autoExpand && (
          <button
            onClick={onToggle}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90",
              darkMode ? "bg-amber-900/40 text-amber-400 hover:bg-amber-900/60" : "bg-amber-200 text-amber-700 hover:bg-amber-300"
            )}
            aria-expanded={expanded}
          >
            {expanded ? <Minus size={20} /> : <Plus size={20} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={cn(
              "mt-6 border-t pt-6 text-sm leading-relaxed",
              darkMode ? "border-amber-900/40 text-amber-300/80" : "border-amber-200 text-amber-800/80"
            )}>
              {detailedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
