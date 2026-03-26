import { GameFormat } from '../../types';

export const q_books_raj = {
  id: 'q_books_raj',
  text: 'A bar graph shows books read: Anu=4, Raj=7, Mia=5, Tom=3, Sia=6. Who read the MOST books?',
  hint: 'Tallest bar = highest value.',
  remedialBrief: 'Raj read 7 — the highest count.',
  remedialDetail: 'Looking at the data, Raj has the highest number of books read (7). In a bar graph, his bar would be the tallest.',
  styles: {
    [GameFormat.DRAG_SORT]: {
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
      options: ['Anu', 'Raj', 'Mia', 'Tom'],
      correctAnswer: 'Raj'
    }
  }
};
