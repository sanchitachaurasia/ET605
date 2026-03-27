import { Module, GameFormat } from '../../types';

const inline_2_4_q1 = {
  id: 'inline_2_4_q1',
  text: 'Bag contains 3 Red, 2 Blue, 1 Green. One ball drawn at random. What is P(Red)?',
  hint: 'Count red balls (favourable). Count all balls (total). Apply formula.',
  remedialBrief: '3 red out of 6 total. P(Red) = 3/6 = 1/2.',
  remedialDetail: 'Count only the RED balls for favourable: 3. Count ALL balls for total: 3+2+1=6. P=3/6.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Bag', symbols: '🔴🔴🔴🔵🔵🟢' }],
        key: '3 Red, 2 Blue, 1 Green',
      },
      options: ['1/6', '2/6', '3/6', '4/6'],
      correctAnswer: '3/6'
    }
  }
};
const inline_2_4_q2 = {
  id: 'inline_2_4_q2',
  text: 'A die is thrown once. What is P(prime number)?',
  hint: 'List ALL numbers on a die. Which ones are prime (exactly 2 factors)?',
  remedialBrief: 'Primes on die: {2,3,5} = 3. P(prime) = 3/6 = 1/2.',
  remedialDetail: 'List die faces: 1,2,3,4,5,6. Is 1 prime? NO (1 factor only). Is 4 prime? NO (4=2×2). Is 6 prime? NO (6=2×3). Primes: {2,3,5} = 3. P=3/6=1/2.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Die', symbols: '1 2 3 4 5 6' }],
        key: 'Prime faces: 2, 3, 5',
      },
      options: ['1/6', '2/6', '3/6', '4/6'],
      correctAnswer: '3/6'
    }
  }
};
const inline_2_4_q3 = {
  id: 'inline_2_4_q3',
  text: 'Slips numbered 1–10. One drawn. What is P(number greater than 6)?',
  hint: 'List all numbers from 1–10 that are STRICTLY greater than 6.',
  remedialBrief: 'Numbers > 6: {7,8,9,10} = 4 favourable. P = 4/10 = 2/5.',
  remedialDetail: '"Greater than 6" is STRICTLY greater — does NOT include 6 itself. Numbers: 7,8,9,10. Count=4. P=4/10.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Slips 1-10', symbols: '1 2 3 4 5 6 7 8 9 10' }],
        key: 'Favourable (>6): 7, 8, 9, 10',
      },
      options: ['3/10', '4/10', '5/10', '6/10'],
      correctAnswer: '4/10'
    }
  }
};
const inline_2_4_q4 = {
  id: 'inline_2_4_q4',
  text: 'Two coins tossed. Sample space: {HH, HT, TH, TT}. What is P(at least one Head)?',
  hint: '"At least one" means 1 OR more. List which outcomes have at least 1 Head.',
  remedialBrief: 'HH, HT, TH, TT. 3 favourable out of 4. P = 3/4.',
  remedialDetail: 'Write sample space: {HH,HT,TH,TT}. Mark each: HH has 2 heads, HT has 1, TH has 1, TT has 0. Count ticks = 3. P=3/4.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Outcomes', symbols: 'HH HT TH TT' }],
        key: 'At least one Head: HH, HT, TH',
      },
      options: ['1/4', '2/4', '3/4', '4/4'],
      correctAnswer: '3/4'
    }
  }
};
const inline_2_4_q5 = {
  id: 'inline_2_4_q5',
  text: 'Slips 1–10. P(number > 3 AND number < 8) = ?',
  hint: 'List numbers satisfying BOTH conditions: greater than 3 AND less than 8.',
  remedialBrief: '{4,5,6,7} = 4 numbers. P = 4/10 = 2/5.',
  remedialDetail: 'You need BOTH conditions: >3 AND <8. List numbers > 3: {4,5,6,7,8,9,10}. Then remove those that are NOT < 8: remove 8,9,10. Remaining: {4,5,6,7}. Count=4. P=4/10.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Slips 1-10', symbols: '1 2 3 4 5 6 7 8 9 10' }],
        key: 'Numbers >3 and <8: 4, 5, 6, 7',
      },
      options: ['3/10', '4/10', '5/10', '2/10'],
      correctAnswer: '4/10'
    }
  }
};

const MODULE_2_1_SHARED_VIDEO_URL = '/Why_Do_We_Need_to_Organise_Data_.mp4';

function filterModuleByPath(module: Module, path: 'A' | 'B' | 'C'): Module {
  return {
    ...module,
    concepts: module.concepts
      .filter((concept) => !concept.path || concept.path === path)
      .map((concept) => ({
        ...concept,
        questions: concept.questions.filter((question) => !question.path || question.path === path),
      })),
  };
}

const moduleData: Module = {
    id: '2.4',
    title: 'Chance & Probability',
    concepts: [
      {
        id: 'c2_4_1',
        title: 'Probability Formula',
        textContent: 'Probability is the mathematics of CHANCE. It gives us a way to measure and compare how likely events are. A Random Experiment is an experiment whose outcome CANNOT be predicted in advance. Sample Space (S) is the COMPLETE SET of all equally likely outcomes. An Event (E) is one or more outcomes from the sample space.',
        videoUrl: 'https://www.youtube.com/embed/placeholder7',
        workedExamples: [
          {
            explanation: 'The Probability Formula',
            steps: [
              'P(Event) = Number of Favourable Outcomes / Total Number of Equally Likely Outcomes',
              'Range: P is ALWAYS between 0 and 1 (0 ≤ P ≤ 1).',
              'P=0 → Impossible. P=1 → Certain. P=0.5 → Equally likely to happen or not.',
              'Complement Rule: P(E) + P(not E) = 1, therefore P(not E) = 1 − P(E)'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_4_q1,
            ...inline_2_4_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q2,
            ...inline_2_4_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q3,
            ...inline_2_4_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_4_q4,
            ...inline_2_4_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          },
          {
            ...inline_2_4_q5,
            ...inline_2_4_q5.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'hard'
          }
        ]
      }
    ]
  };

export const module_4: Module = filterModuleByPath(moduleData, 'A');
