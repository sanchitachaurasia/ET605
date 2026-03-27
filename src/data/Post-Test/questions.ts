import { GameFormat, Question } from '../../types';

const post_q1 = {
  id: 'post_q1',
  text: 'Frequency table: Dog=7, Cat=10, Fish=6, Rabbit=5, Cow=2 (Total=30). What FRACTION prefer Fish?',
  hint: 'Fraction = Fish frequency ÷ total.',
  remedialBrief: '6 out of 30 → 6/30.',
  remedialDetail: 'The frequency for Fish is 6. The total number of animals is 30. So the fraction is 6/30.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['5/30', '6/30', '7/30', '10/30'],
      correctAnswer: '6/30'
    }
  }
};
const post_q2 = {
  id: 'post_q2',
  text: 'Bar graph enrolment: 2007-08=325, 2003-04=100. By how much did enrolment increase?',
  hint: 'Increase = final − starting value.',
  remedialBrief: '325 − 100 = 225 students.',
  remedialDetail: 'To find the increase, subtract the starting value (100) from the final value (325). 325 - 100 = 225.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '2003-04', value: 100 },
          { label: '2007-08', value: 325 },
        ],
      },
      options: ['100', '225', '325', '200'],
      correctAnswer: '225'
    }
  }
};
const post_q3 = {
  id: 'post_q3',
  text: 'Class interval 20–30 in a frequency table. What is the width of this class interval?',
  hint: 'Width = upper limit − lower limit.',
  remedialBrief: '30 − 20 = 10.',
  remedialDetail: 'The class width is the difference between the upper limit (30) and the lower limit (20). 30 - 20 = 10.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['5', '10', '20', '30'],
      correctAnswer: '10'
    }
  }
};
const post_q4 = {
  id: 'post_q4',
  text: 'A student scores exactly 30. Intervals: 20–30 and 30–40. Which interval does 30 belong to?',
  hint: 'Boundary convention: belongs to the HIGHER class.',
  remedialBrief: '30 belongs to 30–40.',
  remedialDetail: 'According to the boundary convention, a value equal to the upper limit of one class belongs to the next (higher) class. So 30 belongs to 30-40.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['20–30', '30–40', 'Both intervals', 'Neither interval'],
      correctAnswer: '30–40'
    }
  }
};
const post_q5 = {
  id: 'post_q5',
  text: 'A histogram has no gaps between bars because:',
  hint: 'Think: what makes class intervals continuous?',
  remedialBrief: 'Class intervals are continuous — one ends exactly where the next begins.',
  remedialDetail: 'Histograms represent continuous data grouped into intervals. Since the intervals are continuous (e.g., 10-20, 20-30), the bars must touch.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['Data has no gaps', 'Class intervals are continuous', 'Drawn with a ruler', 'Each bar = different category'],
      correctAnswer: 'Class intervals are continuous'
    }
  }
};
const post_q6 = {
  id: 'post_q6',
  text: '36 students: Blue=18, Green=9, Red=6, Yellow=3. Central angle for YELLOW?',
  hint: 'Angle = (3 ÷ 36) × 360°.',
  remedialBrief: '(3/36)×360° = (1/12)×360° = 30°.',
  remedialDetail: 'The central angle is calculated as (Value / Total) * 360. Here, (3 / 36) * 360 = 30 degrees.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pie',
        valuePercent: 8.33,
        highlightLabel: 'Yellow',
      },
      options: ['15°', '30°', '45°', '60°'],
      correctAnswer: '30°'
    }
  }
};
const post_q7 = {
  id: 'post_q7',
  text: 'Pie chart: Education=15%. Monthly income = Rs 20,000. Amount on Education?',
  hint: 'Education = 15% of Rs 20,000.',
  remedialBrief: '(15/100)×20,000 = Rs 3,000.',
  remedialDetail: 'To find the amount, multiply the percentage (15%) by the total income (20,000). 0.15 * 20,000 = 3,000.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pie',
        valuePercent: 15,
        highlightLabel: 'Education',
      },
      options: ['Rs 2,000', 'Rs 3,000', 'Rs 4,000', 'Rs 5,000'],
      correctAnswer: 'Rs 3,000'
    }
  }
};
const post_q8 = {
  id: 'post_q8',
  text: 'Hostel: Hindi=40, English=12, Marathi=9, Tamil=7, Bengali=4 (Total=72). Central angle for HINDI?',
  hint: '(40 ÷ 72) × 360°. Simplify first.',
  remedialBrief: '(40/72)×360° = (5/9)×360° = 200°.',
  remedialDetail: 'The central angle is (Value / Total) * 360. Here, (40 / 72) * 360 = (5/9) * 360 = 200 degrees.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pie',
        valuePercent: 55.56,
        highlightLabel: 'Hindi',
      },
      options: ['160°', '180°', '200°', '220°'],
      correctAnswer: '200°'
    }
  }
};
const post_q9 = {
  id: 'post_q9',
  text: 'Slips 1–10. P(number BOTH > 3 AND < 8)?',
  hint: 'List: greater than 3 AND less than 8.',
  remedialBrief: 'Numbers: {4,5,6,7} = 4. P = 4/10.',
  remedialDetail: 'The numbers greater than 3 and less than 8 are 4, 5, 6, and 7. There are 4 such numbers out of 10 total slips.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Slips 1-10', symbols: '1 2 3 4 5 6 7 8 9 10' }],
        key: 'Favourable: 4, 5, 6, 7',
      },
      options: ['4/10', '3/10', '5/10', '2/10'],
      correctAnswer: '4/10'
    }
  }
};
const post_q10 = {
  id: 'post_q10',
  text: 'Bag: 4 Red, 2 Yellow. E1=P(red), E2=P(yellow). Which is correct?',
  hint: 'E1 and E2 cover all outcomes — they are complementary.',
  remedialBrief: 'P(red)=4/6, P(yellow)=2/6. Sum=1.',
  remedialDetail: 'Since Red and Yellow are the only possible outcomes, the sum of their probabilities must be 1. P(E1) + P(E2) = 4/6 + 2/6 = 1.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'Bag', symbols: '🔴🔴🔴🔴🟡🟡' }],
        key: 'Red = 4/6, Yellow = 2/6',
      },
      options: ['P(E1)+P(E2)=2', 'P(E1)+P(E2)=1', 'P(E1)=P(E2)', 'P(E1)<P(E2)'],
      correctAnswer: 'P(E1)+P(E2)=1'
    }
  }
};

export const postTestQuestions: Question[] = [
  { ...post_q1, ...post_q1.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q2, ...post_q2.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q3, ...post_q3.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q4, ...post_q4.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q5, ...post_q5.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q6, ...post_q6.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q7, ...post_q7.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q8, ...post_q8.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q9, ...post_q9.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q10, ...post_q10.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
];
