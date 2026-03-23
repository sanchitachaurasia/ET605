import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

interface RocketProgressProps {
  progress: number; // 0 to 100
}

export const RocketProgress = ({ progress }: RocketProgressProps) => {
  return (
    <div className="relative h-4 w-full rounded-full bg-slate-200">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark"
      />
      <motion.div
        animate={{ left: `${progress}%` }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
          <Rocket className="text-brand" size={20} />
        </div>
      </motion.div>
    </div>
  );
};
