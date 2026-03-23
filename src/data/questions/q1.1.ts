import { GameFormat } from '../../types';

export const q1_1 = {
  id: 'q1.1',
  text: 'A bar graph shows books read: Anu=4, Raj=7, Mia=5, Tom=3, Sia=6. Who read the MOST books?',
  hint: 'Tallest bar = highest value.',
  remedialBrief: 'Look for the highest number in the list.',
  remedialDetail: 'Raj read 7 books, which is more than anyone else in the group.',
  styles: {
    [GameFormat.HOTSPOT]: {
      options: ['Anu: 4', 'Raj: 7', 'Mia: 5', 'Sia: 6'],
      correctAnswer: 'Raj: 7'
    },
    [GameFormat.RAINDROP]: {
      options: ['Anu', 'Raj', 'Mia', 'Sia'],
      correctAnswer: 'Raj'
    },
    [GameFormat.TALLY_TAP]: {
      options: ['Anu', 'Raj', 'Mia', 'Sia'],
      correctAnswer: 'Raj'
    }
  }
};
