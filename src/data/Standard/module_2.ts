import { Module, GameFormat } from '../../types';

const inline_2_2_q1 = {
  id: 'inline_2_2_q1',
  text: 'Using the table (0-10=2, 10-20=10, 20-30=21, 30-40=19, 40-50=7, 50-60=1), how many students scored LESS THAN 20 marks?',
  hint: 'Less than 20 = ALL classes whose upper limit ≤ 20. Find which classes those are and add their frequencies.',
  remedialBrief: '0–10 (freq=2) and 10–20 (freq=10). Total = 2+10 = 12 students.',
  remedialDetail: '"Less than 20" means every class whose values are below 20. That is 0–10 AND 10–20. You must ADD BOTH: 2+10=12.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '0-10', value: 2 },
          { label: '10-20', value: 10 },
          { label: '20-30', value: 21 },
          { label: '30-40', value: 19 },
          { label: '40-50', value: 7 },
          { label: '50-60', value: 1 },
        ],
      },
      options: ['2', '10', '12', '21'],
      correctAnswer: '12'
    }
  }
};
const inline_2_2_q2 = {
  id: 'inline_2_2_q2',
  text: 'Workers wages grouped: 800–810=6, 810–820=3, 820–830=9, 830–840=8, 840–850=2. Which class has the MOST workers?',
  hint: 'Most workers = highest frequency. Find the biggest number.',
  remedialBrief: '820–830 has frequency 9 — the highest. Most workers earn in 820–830.',
  remedialDetail: 'Scan the frequency column for the LARGEST number. Values are: 6, 3, 9, 8, 2. Largest=9. That is class 820–830.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '800-810', value: 6 },
          { label: '810-820', value: 3 },
          { label: '820-830', value: 9 },
          { label: '830-840', value: 8 },
          { label: '840-850', value: 2 },
        ],
      },
      options: ['800–810', '810–820', '820–830', '830–840'],
      correctAnswer: '820–830'
    }
  }
};
const inline_2_2_q3 = {
  id: 'inline_2_2_q3',
  text: 'From the marks histogram (0-10=2, 10-20=10, 20-30=21, 30-40=19, 40-50=7, 50-60=1), how many students scored 40 marks or MORE?',
  hint: '40 or more = classes 40–50 AND 50–60. Add both.',
  remedialBrief: '40–50: 7 + 50–60: 1 = 8 students scored 40 or more.',
  remedialDetail: '"40 or more" includes BOTH 40–50 (freq=7) AND 50–60 (freq=1). Do NOT forget the last class. 7+1=8.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '0-10', value: 2 },
          { label: '10-20', value: 10 },
          { label: '20-30', value: 21 },
          { label: '30-40', value: 19 },
          { label: '40-50', value: 7 },
          { label: '50-60', value: 1 },
        ],
      },
      options: ['7', '8', '9', '6'],
      correctAnswer: '8'
    }
  }
};
const inline_2_2_q4 = {
  id: 'inline_2_2_q4',
  text: 'TV hours watched: 1hr=4, 2hr=8, 3hr=22, 4hr=32, 5hr=8, 6hr=6, 7hr=5. Total=85 students. What fraction watched MORE than 5 hours? Give in simplest form.',
  hint: 'More than 5 hours = 6-hour group + 7-hour group. Then divide by total. Simplify.',
  remedialBrief: 'More than 5 hrs: 6+5=11. Total=85. Fraction=11/85. GCD(11,85)=1. Already simplest.',
  remedialDetail: 'Step 1: list which classes are "more than 5 hours": 6-hour (freq=6) and 7-hour (freq=5). Step 2: add: 6+5=11. Step 3: total students = 4+8+22+32+8+6+5=85. Step 4: fraction = 11/85.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: '1h', value: 4 },
          { label: '2h', value: 8 },
          { label: '3h', value: 22 },
          { label: '4h', value: 32 },
          { label: '5h', value: 8 },
          { label: '6h', value: 6 },
          { label: '7h', value: 5 },
        ],
      },
      options: ['11/85', '6/85', '5/85', '11/80'],
      correctAnswer: '11/85'
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
    id: '2.2',
    title: 'Grouping Data & Histograms',
    concepts: [
      {
        id: 'c2_2_1',
        title: 'Class Intervals',
        textContent: 'When we have a large amount of data, we group it into intervals like 0-10, 10-20, etc. These are called class intervals. The smaller number is the Lower Class Limit, and the larger is the Upper Class Limit. Class Width = Upper Limit - Lower Limit. Class Mark (Midpoint) = (Lower Limit + Upper Limit) / 2.',
        videoUrl: 'https://www.youtube.com/embed/placeholder4',
        workedExamples: [
          {
            explanation: 'The Boundary Convention',
            steps: [
              'A value equal to the upper limit belongs to the NEXT (higher) class.',
              'Suppose a student scored exactly 20. Class intervals are 10–20 and 20–30.',
              '→ 20 belongs to 20–30 (the higher class), NOT 10–20.',
              'This is a RULE, not a choice. It prevents any value from being counted twice.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_2_q1,
            ...inline_2_2_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'c2_2_2',
        title: 'What Is a Histogram?',
        textContent: 'A histogram is a bar graph for GROUPED NUMERICAL data (class intervals). The most important rule: bars in a histogram have NO GAPS. They touch each other because class intervals are continuous. The horizontal axis shows the CLASS INTERVAL SCALE, and the vertical axis shows FREQUENCY.',
        videoUrl: 'https://www.youtube.com/embed/placeholder5',
        workedExamples: [
          {
            explanation: 'How to Draw a Histogram',
            steps: [
              'Draw the horizontal (x) axis and mark the class interval boundaries.',
              'Draw the vertical (y) axis and mark frequency values.',
              'Draw bars for each class with height equal to frequency.',
              'Ensure all bars touch — NO gaps.',
              'If the x-axis does not start from 0, draw a BREAK MARK (∧).'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_2_q2,
            ...inline_2_2_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium'
          },
          {
            ...inline_2_2_q3,
            ...inline_2_2_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_2_q4,
            ...inline_2_2_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          }
        ]
      }
    ]
  };

export const module_2: Module = filterModuleByPath(moduleData, 'B');
