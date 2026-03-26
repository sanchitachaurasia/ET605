import { GameFormat } from '../../types';

export const q_science_fraction = {
  id: 'q_science_fraction',
  text: 'In a pictograph, 1 🧪 = 10 students. If Science has 3 full 🧪 and one half 🧪, how many students like Science?',
  hint: '3 full = 30. Half = 5.',
  remedialBrief: '35 students.',
  remedialDetail: 'Each full symbol is 10, so 3 symbols = 30. A half symbol is 5. Total = 30 + 5 = 35.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Science', symbols: '🧪🧪🧪◐' }],
        key: 'Key: 1 🧪 = 10 students (half = 5)',
      },
      options: ['30', '35', '40', '45'],
      correctAnswer: '35'
    }
  }
};
