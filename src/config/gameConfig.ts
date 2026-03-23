export const gameConfig = {
  xp: {
    correctFirstTry: 100,
    correctWithSupport: 50,
    moduleComplete: 500,
    streakBonus: 10,
  },
  lives: {
    max: 5,
    refillTimeSeconds: 3600,
  },
  difficulty: {
    pathA: {
      explanationLength: 'long',
      workedExamples: 3,
      remediationThreshold: 1,
      remediationAutoExpand: true,
      masteryThreshold: 1,
    },
    pathB: {
      explanationLength: 'standard',
      workedExamples: 2,
      remediationThreshold: 1,
      remediationAutoExpand: true,
      masteryThreshold: 1,
    },
    pathC: {
      explanationLength: 'concise',
      workedExamples: 1,
      remediationThreshold: 1,
      remediationAutoExpand: true,
      masteryThreshold: 2,
    },
  },
  admin: {
    username: 'admin',
    password: 'admin',
  }
};
