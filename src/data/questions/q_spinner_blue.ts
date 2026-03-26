import { GameFormat } from '../../types';

export const q_spinner_blue = {
  id: 'q_spinner_blue',
  text: 'A spinner has 8 equal sections: 3 Red, 4 Blue, 1 Green. What is the probability of landing on Blue?',
  hint: 'P = Favourable / Total.',
  remedialBrief: '4/8 or 1/2.',
  remedialDetail: 'There are 4 blue sections out of 8 total sections. So the probability is 4/8, which simplifies to 1/2.',
  styles: {
    [GameFormat.SPIN_WHEEL]: {
      visual: {
        kind: 'spinner'
      },
      options: ['1/8', '3/8', '4/8', '1/2'],
      correctAnswer: '4/8'
    }
  }
};
