import { GameFormat } from '../../types';

export const q_chance_blue = {
  id: 'q_chance_blue',
  text: 'Spinner: 4 equal sections (Red, Blue, Green, Yellow). Chance of landing on Blue?',
  hint: 'Count total sections and blue sections.',
  remedialBrief: '1 blue out of 4 equal → 1 out of 4.',
  remedialDetail: 'There are 4 possible outcomes in total. Only 1 of those outcomes is "Blue". So the probability is 1/4.',
  styles: {
    [GameFormat.SPIN_WHEEL]: {
      visual: {
        kind: 'spinner',
      },
      options: ['1 out of 2', '1 out of 4', '2 out of 4', '4 out of 4'],
      correctAnswer: '1 out of 4'
    }
  }
};
