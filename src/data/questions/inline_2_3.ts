import { GameFormat } from '../../types';

export const inline_2_3_q1 = {
  id: 'inline_2_3_q1',
  text: 'Music survey: Classical=10%. If 20 people liked Classical, how many were surveyed in TOTAL?',
  hint: '10% of total = 20 people. Use unitary method: if 10% = 20, what is 100%?',
  remedialBrief: 'If 10%=20, then 1%=2, so 100%=200 people surveyed total.',
  remedialDetail: 'Classical = 10% of total. We are TOLD 10% = 20 people. Step 1: 10%=20 → 1%=20÷10=2. Step 2: Total=100%=100×2=200.',
  styles: {
    [GameFormat.RAINDROP]: {
      options: ['100', '150', '200', '250'],
      correctAnswer: '200'
    }
  }
};

export const inline_2_3_q2 = {
  id: 'inline_2_3_q2',
  text: '360 people chose seasons: Summer=90, Rainy=120, Winter=150. Central angle for RAINY season?',
  hint: 'Angle = (value ÷ total) × 360°. Total = 360.',
  remedialBrief: '(120÷360)×360° = (1/3)×360° = 120°.',
  remedialDetail: 'Formula: (value÷total)×360°. Here total=360 (people), so (120÷360)×360°=120°. When total happens to equal 360, each unit = 1 degree.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['90°', '100°', '120°', '150°'],
      correctAnswer: '120°'
    }
  }
};

export const inline_2_3_q3 = {
  id: 'inline_2_3_q3',
  text: 'Exam pie chart: Mathematics sector = 90°. Total marks in exam = 540. How many marks in Maths?',
  hint: 'Marks = (angle ÷ 360°) × total. Convert angle to fraction first.',
  remedialBrief: '(90÷360)×540 = (1/4)×540 = 135 marks.',
  remedialDetail: 'Step 1 — convert 90° to a fraction of the full circle: 90÷360=1/4. Step 2 — multiply that fraction by the total: (1/4)×540=135.',
  styles: {
    [GameFormat.RAINDROP]: {
      options: ['90', '120', '135', '150'],
      correctAnswer: '135'
    }
  }
};

export const inline_2_3_q4 = {
  id: 'inline_2_3_q4',
  text: 'Family pie chart: Rent=25%. If Rent = Rs 5,000, what is the total monthly income?',
  hint: 'Rent=25% of total. If 25%=Rs5,000, find 100% using unitary method.',
  remedialBrief: 'If 25%=Rs5,000, then 1%=Rs200. Total=100%=100×200=Rs20,000.',
  remedialDetail: '25%=Rs5,000 → 1%=5,000÷25=Rs200 → 100%=200×100=Rs20,000. Always find 1% first in reverse calculation.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['Rs 15,000', 'Rs 20,000', 'Rs 25,000', 'Rs 30,000'],
      correctAnswer: 'Rs 20,000'
    }
  }
};
