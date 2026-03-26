import { GameFormat } from '../../types';

export const q_pictograph_300 = {
  id: 'q_pictograph_300',
  text: 'Pictograph: one symbol = 100 cars. August shows 3 full symbols. How many cars?',
  hint: 'Multiply symbols by the value each symbol represents.',
  remedialBrief: '3 × 100 = 300 cars.',
  remedialDetail: 'Since each symbol represents 100 cars, 3 symbols represent 100 + 100 + 100 = 300 cars.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'August', symbols: '🚗🚗🚗' }],
        key: 'Key: 1 symbol = 100 cars',
      },
      options: ['30 cars', '300 cars', '3 cars', '3,000 cars'],
      correctAnswer: '300 cars'
    },
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'August', symbols: '🚗🚗🚗' }],
        key: 'Key: 1 symbol = 100 cars',
      },
      options: ['30 cars', '300 cars', '3 cars', '3,000 cars'],
      correctAnswer: '300 cars'
    }
  }
};
