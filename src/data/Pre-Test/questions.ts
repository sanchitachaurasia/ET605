import { GameFormat, Question } from '../../types';

const q_tally_7 = {
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
const q_pictograph_300 = {
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
const q_improvement_40 = {
  id: 'q_improvement_40',
  text: 'Double bar graph: Maths 2005-06=30, 2006-07=70. What is the improvement?',
  hint: 'Improvement = new score − old score.',
  remedialBrief: '70 − 30 = 40 marks.',
  remedialDetail: 'To find the improvement, subtract the previous year\'s score from the current year\'s score: 70 - 30 = 40.',
  styles: {
    [GameFormat.BAR_BUILDER]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '2005-06', value: 30 },
          { label: '2006-07', value: 70 },
        ],
      },
      options: ['30 marks', '40 marks', '50 marks', '70 marks'],
      correctAnswer: '40 marks'
    }
  }
};
const q_interval_25 = {
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
const q_books_raj = {
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
const q_science_fraction = {
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
const q_spinner_blue = {
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
const q_pie_chocolate = {
  id: 'q_pie_chocolate',
  text: 'Pie chart: 50% prefer Chocolate. If 200 students total, how many prefer Chocolate?',
  hint: '50% means half. Half of 200 = ?',
  remedialBrief: '50% of 200 = 100.',
  remedialDetail: '50% is equivalent to 1/2. Half of 200 is 100 students.',
  styles: {
    [GameFormat.PIE_SLICER]: {
      visual: {
        kind: 'pie',
        valuePercent: 50,
        highlightLabel: 'Chocolate',
      },
      options: ['50', '75', '100', '150'],
      correctAnswer: '100'
    }
  }
};

export const preTestQuestions: Question[] = [
  {
    ...q_books_raj,
    ...q_books_raj.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  },
  {
    ...q_pictograph_300,
    ...q_pictograph_300.styles[GameFormat.RAINDROP],
    format: GameFormat.RAINDROP
  },
  {
    ...q_improvement_40,
    ...q_improvement_40.styles[GameFormat.BAR_BUILDER],
    format: GameFormat.BAR_BUILDER
  },
  {
    ...q_science_fraction,
    ...q_science_fraction.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  },
  {
    ...q_tally_7,
    ...q_tally_7.styles[GameFormat.TALLY_TAP],
    format: GameFormat.TALLY_TAP
  },
  {
    ...q_spinner_blue,
    ...q_spinner_blue.styles[GameFormat.SPIN_WHEEL],
    format: GameFormat.SPIN_WHEEL
  },
  {
    ...q_pie_chocolate,
    ...q_pie_chocolate.styles[GameFormat.PIE_SLICER],
    format: GameFormat.PIE_SLICER
  },
  {
    ...q_interval_25,
    ...q_interval_25.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  }
];
