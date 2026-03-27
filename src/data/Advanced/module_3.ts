import { Module, GameFormat } from '../../types';

const inline_2_3_q1 = {
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
const inline_2_3_q2 = {
  id: 'inline_2_3_q2',
  text: '360 people chose seasons: Summer=90, Rainy=120, Winter=150. Central angle for RAINY season?',
  hint: 'Angle = (value ÷ total) × 360°. Total = 360.',
  remedialBrief: '(120÷360)×360° = (1/3)×360° = 120°.',
  remedialDetail: 'Formula: (value÷total)×360°. Here total=360 (people), so (120÷360)×360°=120°. When total happens to equal 360, each unit = 1 degree.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pie',
        valuePercent: 33.33,
        highlightLabel: 'Rainy',
      },
      options: ['90°', '100°', '120°', '150°'],
      correctAnswer: '120°'
    }
  }
};
const inline_2_3_q3 = {
  id: 'inline_2_3_q3',
  text: 'Exam pie chart: Mathematics sector = 90°. Total marks in exam = 540. How many marks in Maths?',
  hint: 'Marks = (angle ÷ 360°) × total. Convert angle to fraction first.',
  remedialBrief: '(90÷360)×540 = (1/4)×540 = 135 marks.',
  remedialDetail: 'Step 1 — convert 90° to a fraction of the full circle: 90÷360=1/4. Step 2 — multiply that fraction by the total: (1/4)×540=135.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pie',
        valuePercent: 25,
        highlightLabel: 'Mathematics',
      },
      options: ['90', '120', '135', '150'],
      correctAnswer: '135'
    }
  }
};
const inline_2_3_q4 = {
  id: 'inline_2_3_q4',
  text: 'Family pie chart: Rent=25%. If Rent = Rs 5,000, what is the total monthly income?',
  hint: 'Rent=25% of total. If 25%=Rs5,000, find 100% using unitary method.',
  remedialBrief: 'If 25%=Rs5,000, then 1%=Rs200. Total=100%=100×200=Rs20,000.',
  remedialDetail: '25%=Rs5,000 → 1%=5,000÷25=Rs200 → 100%=200×100=Rs20,000. Always find 1% first in reverse calculation.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'pie',
        valuePercent: 25,
        highlightLabel: 'Rent',
      },
      options: ['Rs 15,000', 'Rs 20,000', 'Rs 25,000', 'Rs 30,000'],
      correctAnswer: 'Rs 20,000'
    }
  }
};

const MODULE_2_1_SHARED_VIDEO_URL = '/Why_Do_We_Need_to_Organise_Data_.mp4';

function filterModuleByPath(module: Module, path: 'A' | 'B' | 'C'): Module {
  return {
    ...module,
    concepts: module.concepts
      .filter((concept) => !concept.path || concept.path === path)
      .map((concept) => ({
        ...concept,
        questions: concept.questions.filter((question) => !question.path || question.path === path),
      })),
  };
}

const moduleData: Module = {
    id: '2.3',
    title: 'Pie Charts / Circle Graphs',
    concepts: [
      {
        id: 'c2_3_1',
        title: 'What Is a Pie Chart?',
        textContent: 'A pie chart is a CIRCLE divided into SECTORS (wedge-shaped pieces). Each sector represents ONE CATEGORY of data. The SIZE of a sector is PROPORTIONAL to the value it represents. The whole circle = 360° = 100% of the data. The CENTRAL ANGLE of a sector is the angle at the centre of the circle for that slice.',
        videoUrl: 'https://www.youtube.com/embed/placeholder6',
        workedExamples: [
          {
            explanation: 'Central Angle Formula',
            steps: [
              'Central Angle = (Value ÷ Total) × 360°',
              'If given as percentage: Central Angle = (Percentage ÷ 100) × 360°',
              'Verify: ALL central angles must SUM to EXACTLY 360°.'
            ]
          },
          {
            explanation: 'Reverse Calculation',
            steps: [
              'You are GIVEN the pie chart (percentages or angles) and asked to find ACTUAL VALUES.',
              'Formula: Value = (Central Angle ÷ 360°) × Total',
              'Or: Value = (Percentage ÷ 100) × Total',
              'Alternative "chain method": find the value of 1%, then scale up.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_3_q1,
            ...inline_2_3_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_3_q2,
            ...inline_2_3_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium'
          },
          {
            ...inline_2_3_q3,
            ...inline_2_3_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'hard'
          },
          {
            ...inline_2_3_q4,
            ...inline_2_3_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          }
        ]
      }
    ]
  };

export const module_3: Module = filterModuleByPath(moduleData, 'C');
