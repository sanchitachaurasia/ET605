import { GameFormat } from '../../types';

export const q_interval_25 = {
  id: 'q_interval_25',
  text: 'Marks: 12, 18, 25, 31, 14. Intervals: 0–10, 10–20, 20–30, 30–40. Where does 25 go?',
  hint: '25 is between 20 and 30. Boundary belongs to higher class.',
  remedialBrief: '25 falls in 20–30.',
  remedialDetail: 'The number 25 is greater than or equal to 20 and less than 30, so it belongs to the class interval 20-30.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['10–20', '20–30', '30–40', '0–10'],
      correctAnswer: '20–30'
    }
  }
};
