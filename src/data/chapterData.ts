import { Module, GameFormat, Question } from '../types';
import { q_tally_7 } from './questions/q_tally_7';
import { q_pictograph_300 } from './questions/q_pictograph_300';
import { q_chance_blue } from './questions/q_chance_blue';
import { q_improvement_40 } from './questions/q_improvement_40';
import { q_pie_chocolate } from './questions/q_pie_chocolate';
import { q_interval_25 } from './questions/q_interval_25';
import { q_books_raj } from './questions/q_books_raj';
import { q_science_fraction } from './questions/q_science_fraction';
import { q_spinner_blue } from './questions/q_spinner_blue';
import { inline_2_1_q1, inline_2_1_q2, inline_2_1_q3, inline_2_1_q4 } from './questions/inline_2_1';
import { inline_2_2_q1, inline_2_2_q2, inline_2_2_q3, inline_2_2_q4 } from './questions/inline_2_2';
import { inline_2_3_q1, inline_2_3_q2, inline_2_3_q3, inline_2_3_q4 } from './questions/inline_2_3';
import { inline_2_4_q1, inline_2_4_q2, inline_2_4_q3, inline_2_4_q4, inline_2_4_q5 } from './questions/inline_2_4';
import { post_q1, post_q2, post_q3, post_q4, post_q5, post_q6, post_q7, post_q8, post_q9, post_q10 } from './questions/post_test';

export const chapterData: Module[] = [
  {
    id: '2.1',
    title: 'Data Organisation & Types of Graphs',
    concepts: [
      {
        id: 'c2_1_1',
        title: 'Why Do We Need to Organise Data?',
        textContent: 'Your teacher asks: "Which sport is most popular in Class 8?" Every student calls out at the same time. You hear: Cricket, Football, Cricket, Badminton, Cricket, Football, Tennis, Cricket … Can you tell which sport is most popular? No — it is noise. You need to COLLECT, ORGANISE, and COUNT responses systematically. That is exactly what Data Handling teaches you to do.',
        videoUrl: 'https://www.youtube.com/embed/placeholder1',
        workedExamples: [
          {
            explanation: 'The Problem That Graphs Solve',
            steps: [
              'Imagine you have collected 50 responses to "What is your favourite sport?" as a raw list.',
              'Reading it takes 2 minutes and you still cannot answer: "Which sport is most popular?"',
              'Frequency tables, pictographs, and bar graphs exist to solve this exact problem — to turn a messy list into instant, readable information.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_1_q1,
            ...inline_2_1_q1.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'c2_1_2',
        title: 'Tally Marks & Frequency Tables',
        textContent: 'A Frequency Distribution Table organises data by listing every category with its tally marks and frequency. Every time a value appears, make ONE stroke: |. After 4 strokes (||||), the 5th stroke crosses them diagonally: |||| — this completes a group of 5. Tally marks in groups of 5 make counting fast and error-free.',
        videoUrl: 'https://www.youtube.com/embed/placeholder2',
        workedExamples: [
          {
            explanation: 'How to Make a Frequency Table',
            steps: [
              'List all categories in a column.',
              'Create two more columns: "Tally Marks" and "Frequency".',
              'Go through the raw data ONE item at a time, left to right.',
              'For each item, add one tally mark in the correct row.',
              'Once all data is processed, count the tally marks in each row and write the frequency.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_1_q2,
            ...inline_2_1_q2.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'c2_1_3',
        title: 'Types of Graphs',
        textContent: 'A pictograph represents data using pictures or symbols. Each symbol stands for a fixed number of items. A bar graph represents data using rectangular bars of equal width. GAPS must exist between bars. A double bar graph shows TWO datasets side-by-side for the same categories.',
        videoUrl: 'https://www.youtube.com/embed/placeholder3',
        workedExamples: [
          {
            explanation: 'Reading a Pictograph',
            steps: [
              'Choose a clear, relevant symbol.',
              'Decide the SCALE: how many items does one symbol represent? (e.g., 1 symbol = 100 cars)',
              'For values that are not exact multiples, draw a FRACTION of the symbol.',
              'Always include a KEY / LEGEND showing what one full symbol represents.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_1_q3,
            ...inline_2_1_q3.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium'
          },
          {
            ...inline_2_1_q4,
            ...inline_2_1_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          }
        ]
      }
    ]
  },
  {
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
  },
  {
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
  },
  {
    id: '2.4',
    title: 'Chance & Probability',
    concepts: [
      {
        id: 'c2_4_1',
        title: 'Probability Formula',
        textContent: 'Probability is the mathematics of CHANCE. It gives us a way to measure and compare how likely events are. A Random Experiment is an experiment whose outcome CANNOT be predicted in advance. Sample Space (S) is the COMPLETE SET of all equally likely outcomes. An Event (E) is one or more outcomes from the sample space.',
        videoUrl: 'https://www.youtube.com/embed/placeholder7',
        workedExamples: [
          {
            explanation: 'The Probability Formula',
            steps: [
              'P(Event) = Number of Favourable Outcomes / Total Number of Equally Likely Outcomes',
              'Range: P is ALWAYS between 0 and 1 (0 ≤ P ≤ 1).',
              'P=0 → Impossible. P=1 → Certain. P=0.5 → Equally likely to happen or not.',
              'Complement Rule: P(E) + P(not E) = 1, therefore P(not E) = 1 − P(E)'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_4_q1,
            ...inline_2_4_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q2,
            ...inline_2_4_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q3,
            ...inline_2_4_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_4_q4,
            ...inline_2_4_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          },
          {
            ...inline_2_4_q5,
            ...inline_2_4_q5.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'hard'
          }
        ]
      }
    ]
  }
];

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
