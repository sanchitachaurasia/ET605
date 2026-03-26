import { GameFormat } from '../../types';

export const q_pie_chocolate = {
  id: 'q_pie_chocolate',
  text: 'Pie chart: 50% prefer Chocolate. If 200 students total, how many prefer Chocolate?',
  hint: '50% means half. Half of 200 = ?',
  remedialBrief: '50% of 200 = 100.',
  remedialDetail: '50% is equivalent to 1/2. Half of 200 is 100 students.',
  styles: {
    [GameFormat.PIE_SLICER]: {
      visual: {
        kind: 'pie',
        valuePercent: 50,
        highlightLabel: 'Chocolate',
      },
      options: ['50', '75', '100', '150'],
      correctAnswer: '100'
    }
  }
};
