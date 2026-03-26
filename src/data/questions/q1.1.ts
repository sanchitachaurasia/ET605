import { GameFormat } from '../../types';

export const q1_1 = {
  id: 'q1.1',
  text: 'A bar graph shows books read: Anu=4, Raj=7, Mia=5, Tom=3, Sia=6. Who read the MOST books?',
  hint: 'Tallest bar = highest value.',
  remedialBrief: 'Look for the highest number in the list.',
  remedialDetail: 'Raj read 7 books, which is more than anyone else in the group.',
  styles: {
    [GameFormat.HOTSPOT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Anu', value: 4 },
          { label: 'Raj', value: 7 },
          { label: 'Mia', value: 5 },
          { label: 'Tom', value: 3 },
          { label: 'Sia', value: 6 },
        ],
      },
      options: ['Anu: 4', 'Raj: 7', 'Mia: 5', 'Sia: 6'],
      correctAnswer: 'Raj: 7'
    },
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Anu', value: 4 },
          { label: 'Raj', value: 7 },
          { label: 'Mia', value: 5 },
          { label: 'Tom', value: 3 },
          { label: 'Sia', value: 6 },
        ],
      },
      options: ['Anu', 'Raj', 'Mia', 'Sia'],
      correctAnswer: 'Raj'
    },
    [GameFormat.TALLY_TAP]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Anu', value: 4 },
          { label: 'Raj', value: 7 },
          { label: 'Mia', value: 5 },
          { label: 'Tom', value: 3 },
          { label: 'Sia', value: 6 },
        ],
      },
      options: ['Anu', 'Raj', 'Mia', 'Sia'],
      correctAnswer: 'Raj'
    }
  }
};
