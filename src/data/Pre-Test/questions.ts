import { GameFormat, Question } from '../../types';


const q_pictograph_300 = {
  id: 'q_pictograph_300',
  text: 'In a pictograph, one symbol represents 100 cars. How many cars are represented by 2.5 symbols?',
  hint: '2.5 symbols means 2 full symbols and one half symbol.',
  remedialBrief: '2.5 × 100 = 250 cars.',
  remedialDetail: 'Multiply the symbol count by the key value: 2.5 × 100 = 250.',
  styles: {
    [GameFormat.RAINDROP]: {
      options: ['100', '150', '200', '250'],
      correctAnswer: '250'
    }
  }
};

const q_improvement_40 = {
  id: 'q_bar_house',
  text: 'A bar graph shows students in houses: Red = 30, Blue = 45, Green = 25, Yellow = 40. Which house has the second highest number of students?',
  hint: 'Find the highest first, then the next highest.',
  remedialBrief: 'Blue is highest at 45, Yellow is second at 40.',
  remedialDetail: 'Order the values: Blue 45, Yellow 40, Red 30, Green 25. Second highest is Yellow.',
  styles: {
    [GameFormat.BAR_BUILDER]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Red', value: 30 },
          { label: 'Blue', value: 45 },
          { label: 'Green', value: 25 },
          { label: 'Yellow', value: 40 },
        ],
      },
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      correctAnswer: 'Yellow'
    }
  }
};

const q_interval_25 = {
  id: 'q_interval_25',
  text: 'In a frequency table with intervals 20–30 and 30–40, where should the value 30 be placed?',
  hint: 'Boundary value goes to the higher interval in continuous grouping.',
  remedialBrief: '30 belongs to 30–40.',
  remedialDetail: 'With grouped continuous intervals, the upper boundary belongs to the next class. So 30 is counted in 30–40.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['10-20','20–30', '30–40', '40-50'],
      correctAnswer: '30–40'
    }
  }
};

const q_books_raj = {
  id: 'q_histogram_data',
  text: 'Which type of data is best represented using a histogram?',
  hint: 'Histograms are for continuous numerical data grouped into intervals.',
  remedialBrief: 'Heights of students are continuous and suited for histograms.',
  remedialDetail: 'Histogram bars represent grouped continuous values (like height ranges), not categories such as names or colors.',
  styles: {
    [GameFormat.HOTSPOT]: {
      options: ['Favorite subjects', 'Heights of students', 'Names', 'Colors'],
      correctAnswer: 'Heights of students'
    }
  }
};

const q_science_fraction = {
  id: 'q_histogram_gap',
  text: 'What type of data does a histogram represent?',
  hint: 'Think grouped values on a number scale.',
  remedialBrief: 'Histograms represent continuous grouped data.',
  remedialDetail: 'Histograms are used for grouped intervals of continuous numerical data, not separate categories.',
  styles: {
    [GameFormat.HOTSPOT]: {
      options: ['Categories', 'Continuous grouped data', 'Fractions', 'Events'],
      correctAnswer: 'Continuous grouped data'
    }
  }
};

const q_spinner_blue = {
  id: 'q_spinner_blue',
  text: 'If you spin a wheel with 3 green, 1 blue, and 1 red sector, what is the probability of not getting blue?',
  hint: 'Not blue means green or red outcomes.',
  remedialBrief: 'Not blue outcomes = 4 out of 5, so probability is 4/5.',
  remedialDetail: 'Total sectors = 5. Blue sectors = 1. Not blue sectors = 5 - 1 = 4. So P(not blue) = 4/5.',
  styles: {
    [GameFormat.SPIN_WHEEL]: {
      options: ['1/5', '2/5', '3/5', '4/5'],
      correctAnswer: '4/5'
    }
  }
};

const q_pie_chocolate = {
  id: 'q_pie_chocolate',
  text: 'Calculate the central angle for a category that represents 25% of the total data.',
  hint: 'Central angle = percentage × 360°.',
  remedialBrief: '25% of 360° is 90°.',
  remedialDetail: 'Convert 25% to decimal 0.25 and multiply by 360: 0.25 × 360 = 90°.',
  styles: {
    [GameFormat.PIE_SLICER]: {
      visual: {
        kind: 'pie',
        valuePercent: 25,
        highlightLabel: 'Category',
      },
      options: [],
      correctAnswer: '90'
    }
  }
};

const q_pie_fraction = {
  id: 'q_pie_fraction',
  text: 'If 8 hours of a 24-hour day are spent sleeping, what fraction of a pie chart does this sector represent?',
  hint: 'Fraction = part/whole = 8/24. Simplify it.',
  remedialBrief: '8/24 simplifies to 1/3.',
  remedialDetail: 'Divide numerator and denominator by 8: 8/24 = 1/3. So the sector is one-third of the pie chart.',
  styles: {
    [GameFormat.PIE_SLICER]: {
      options: ['1/2', '1/3', '1/4', '2/3'],
      correctAnswer: '1/3'
    }
  }
};

const q_probability_dependence = {
  id: 'q_probability_dependence',
  text: 'If you draw a card from a deck and do NOT replace it, what type of event is the second draw?',
  hint: 'After no replacement, the sample space changes.',
  remedialBrief: 'Second draw is dependent because the first draw changes the deck.',
  remedialDetail: 'Without replacement, probabilities on the second draw depend on what happened first. That is a dependent event.',
  styles: {
    [GameFormat.SPIN_WHEEL]: {
      options: ['Independent', 'Dependent', 'Certain', 'Impossible'],
      correctAnswer: 'Dependent'
    }
  }
};

export const preTestQuestions: Question[] = [
  {
    ...q_pictograph_300,
    ...q_pictograph_300.styles[GameFormat.RAINDROP],
    format: GameFormat.RAINDROP
  },
  {
    ...q_interval_25,
    ...q_interval_25.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  },
  {
    ...q_pie_chocolate,
    ...q_pie_chocolate.styles[GameFormat.PIE_SLICER],
    format: GameFormat.PIE_SLICER
  },
  {
    ...q_pie_fraction,
    ...q_pie_fraction.styles[GameFormat.PIE_SLICER],
    format: GameFormat.PIE_SLICER
  },
  {
    ...q_spinner_blue,
    ...q_spinner_blue.styles[GameFormat.SPIN_WHEEL],
    format: GameFormat.SPIN_WHEEL
  },
  {
    ...q_probability_dependence,
    ...q_probability_dependence.styles[GameFormat.SPIN_WHEEL],
    format: GameFormat.SPIN_WHEEL
  },
  {
    ...q_books_raj,
    ...q_books_raj.styles[GameFormat.HOTSPOT],
    format: GameFormat.HOTSPOT
  },
  {
    ...q_science_fraction,
    ...q_science_fraction.styles[GameFormat.HOTSPOT],
    format: GameFormat.HOTSPOT
  },
  {
    ...q_improvement_40,
    ...q_improvement_40.styles[GameFormat.BAR_BUILDER],
    format: GameFormat.BAR_BUILDER
  },
];
