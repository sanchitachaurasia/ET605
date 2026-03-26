import { GameFormat } from '../../types';

export const q_tally_7 = {
  id: 'q_tally_7',
  text: 'Which is the correct tally for 7?',
  hint: 'Groups of 5 are crossed. 7 = 5 + 2.',
  remedialBrief: 'One group of 5 (||||) + 2 singles (||).',
  remedialDetail: 'Tally marks work in sets of 5. For 7, you make one full set of 5 (four vertical and one diagonal) and then 2 extra vertical lines.',
  styles: {
    [GameFormat.TALLY_TAP]: {
      visual: {
        kind: 'tally',
        pattern: '||||/ ||',
        caption: '7 = 5 + 2',
      },
      options: ['|||| ||', '|||| |||', '|||||||', '|||| |'],
      correctAnswer: '|||| ||'
    },
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'tally',
        pattern: '||||/ ||',
        caption: '7 = 5 + 2',
      },
      options: ['|||| ||', '|||| |||', '|||||||', '|||| |'],
      correctAnswer: '|||| ||'
    }
  }
};
