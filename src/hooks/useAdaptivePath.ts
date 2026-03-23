import { useSessionStore } from '../store/sessionStore';
import { gameConfig } from '../config/gameConfig';

export const useAdaptivePath = () => {
  const session = useSessionStore((state) => state.session);
  const path = session?.learningPath || 'B';

  const config = path === 'A' 
    ? gameConfig.difficulty.pathA 
    : path === 'C' 
    ? gameConfig.difficulty.pathC 
    : gameConfig.difficulty.pathB;

  return {
    path,
    ...config
  };
};
