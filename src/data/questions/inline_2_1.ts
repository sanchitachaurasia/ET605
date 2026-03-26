import { GameFormat } from '../../types';

export const inline_2_1_q1 = {
  id: 'inline_2_1_q1',
  text: 'A frequency table: Dog=7, Cat=10, Fish=6, Rabbit=5. Which animal is MOST popular?',
  hint: 'Most popular = highest frequency. Find the biggest number in the Frequency column.',
  remedialBrief: 'Cat has frequency 10 — the largest value. Most popular = Cat.',
  remedialDetail: 'Scan the frequency column. The values are 7, 10, 6, and 5. The largest number is 10, which corresponds to Cat.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Dog', value: 7 },
          { label: 'Cat', value: 10 },
          { label: 'Fish', value: 6 },
          { label: 'Rabbit', value: 5 },
        ],
      },
      options: ['Dog', 'Cat', 'Fish', 'Rabbit'],
      correctAnswer: 'Cat'
    }
  }
};

export const inline_2_1_q2 = {
  id: 'inline_2_1_q2',
  text: 'Pictograph of cars: one symbol = 50 cars. September shows 4 full symbols and 1 half symbol. How many cars?',
  hint: 'Full symbols × value. Half symbol = half the value. Then add both.',
  remedialBrief: '4 × 50 = 200. Half symbol = 25. Total = 200 + 25 = 225 cars.',
  remedialDetail: 'Step 1: Count full symbols and multiply: 4 × 50 = 200. Step 2: Half symbol = scale ÷ 2 = 50 ÷ 2 = 25. Step 3: Add: 200 + 25 = 225.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'September', symbols: '🚗🚗🚗🚗◐' }],
        key: 'Key: 1 symbol = 50 cars (half = 25)',
      },
      options: ['200', '225', '250', '175'],
      correctAnswer: '225'
    }
  }
};

export const inline_2_1_q3 = {
  id: 'inline_2_1_q3',
  text: 'Double bar graph: Hindi 2005-06=50, 2006-07=45. Maths 2005-06=30, 2006-07=70. Which subject showed a DECREASE in performance?',
  hint: 'Decrease = later value is LOWER than earlier value. Check each subject.',
  remedialBrief: 'Hindi: 50 → 45 = decreased (−5). Maths: 30 → 70 = increased (+40). Answer: Hindi.',
  remedialDetail: 'Decrease means the second (later) value is SMALLER than the first. Hindi went from 50 to 45, so it decreased. Maths went from 30 to 70, so it increased.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Hindi 05-06', value: 50 },
          { label: 'Hindi 06-07', value: 45 },
          { label: 'Maths 05-06', value: 30 },
          { label: 'Maths 06-07', value: 70 },
        ],
      },
      options: ['Maths', 'Hindi', 'Both subjects', 'Neither subject'],
      correctAnswer: 'Hindi'
    }
  }
};

export const inline_2_1_q4 = {
  id: 'inline_2_1_q4',
  text: 'A double bar graph shows boys vs girls marks in 5 subjects. Boys scores: Maths=40, Science=60, English=55, Hindi=70, Art=45. Girls scores: Maths=55, Science=50, English=65, Hindi=65, Art=50. In how many subjects did BOYS outperform GIRLS?',
  hint: 'Outperform means score HIGHER. Compare boys vs girls in each subject one by one.',
  remedialBrief: 'Science: 60 > 50 (boys win). Hindi: 70 > 65 (boys win). All others: girls scored higher. Count = 2 subjects.',
  remedialDetail: 'Go subject by subject: Maths: B40 < G55. Science: B60 > G50 (Win). English: B55 < G65. Hindi: B70 > G65 (Win). Art: B45 < G50. Total wins = 2.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Maths B', value: 40 },
          { label: 'Maths G', value: 55 },
          { label: 'Science B', value: 60 },
          { label: 'Science G', value: 50 },
          { label: 'English B', value: 55 },
          { label: 'English G', value: 65 },
          { label: 'Hindi B', value: 70 },
          { label: 'Hindi G', value: 65 },
          { label: 'Art B', value: 45 },
          { label: 'Art G', value: 50 },
        ],
      },
      options: ['1 subject', '2 subjects', '3 subjects', '4 subjects'],
      correctAnswer: '2 subjects'
    }
  }
};
