import { GameFormat } from '../../types';

export const q_books_raj = {
  id: 'q_books_raj',
  text: 'A bar graph shows books read: Anu=4, Raj=7, Mia=5, Tom=3, Sia=6. Who read the MOST books?',
  image: 'https://picsum.photos/seed/bargraph/600/400',
  hint: 'Tallest bar = highest value.',
  remedialBrief: 'Raj read 7 — the highest count.',
  remedialDetail: 'Looking at the data, Raj has the highest number of books read (7). In a bar graph, his bar would be the tallest.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['Anu', 'Raj', 'Mia', 'Tom'],
      correctAnswer: 'Raj'
    }
  }
};
