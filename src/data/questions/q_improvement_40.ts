import { GameFormat } from '../../types';

export const q_improvement_40 = {
  id: 'q_improvement_40',
  text: 'Double bar graph: Maths 2005-06=30, 2006-07=70. What is the improvement?',
  hint: 'Improvement = new score − old score.',
  remedialBrief: '70 − 30 = 40 marks.',
  remedialDetail: 'To find the improvement, subtract the previous year\'s score from the current year\'s score: 70 - 30 = 40.',
  styles: {
    [GameFormat.BAR_BUILDER]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '2005-06', value: 30 },
          { label: '2006-07', value: 70 },
        ],
      },
      options: ['30 marks', '40 marks', '50 marks', '70 marks'],
      correctAnswer: '40 marks'
    }
  }
};
