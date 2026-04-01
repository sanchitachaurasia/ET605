import { GameFormat, Question } from '../../types';

type PostTestQuestion = Question & {
  comprehensionId: string;
  comprehensionTitle: string;
  comprehensionText: string;
};

const COMP_1_TITLE = 'Comprehension 1: The Raw Survey';
const COMP_1_TEXT =
  'Datapur collected handwritten responses from residents about their preferred public spaces. The city team is converting the raw responses into tally marks and frequency counts so planners can make decisions based on data, not guesswork.';

const COMP_2_TITLE = 'Comprehension 2: The Age Demographic';
const COMP_2_TEXT =
  'To plan schools, jobs, and senior services, Datapur groups ages into class intervals like 0-10, 10-20, and 20-30. The team uses grouped data visuals to understand continuous trends in age distribution.';

const COMP_3_TITLE = 'Comprehension 3: The Public Opinion';
const COMP_3_TEXT =
  'The Mayor compares city opinion metrics across two years to decide priorities. The team reads bar-based visuals carefully, checks scales, and computes differences between categories.';

const COMP_4_TITLE = 'Comprehension 4: The Budget Allocation';
const COMP_4_TEXT =
  'Datapur uses a pie chart to represent how the full city budget is distributed across sectors. Analysts convert percentages and angles to actual rupee values for policy decisions.';

const COMP_5_TITLE = 'Comprehension 5: The Forecast';
const COMP_5_TEXT =
  'For transport and lottery planning, Datapur applies probability concepts. The team evaluates favorable outcomes, complements, and whether repeated selections are dependent or independent.';

export const inline_2_1_1_1: PostTestQuestion = {
  id: 'inline_2_1_1_1',
  comprehensionId: 'comp_1',
  comprehensionTitle: COMP_1_TITLE,
  comprehensionText: COMP_1_TEXT,
  text: 'What is the technical name for these marks used to count frequency?',
  hintLevel1: 'Think about the tally system used to group items by five.',
  remedialBrief: 'Tally (or Tally Marks)',
  remedialDetail: 'System initialized; the South District responses are now being processed.',
  format: GameFormat.RAINDROP,
  options: ['Tally', 'Bar Marks', 'Frequency Strokes', 'Data Lines'],
  correctAnswer: 'Tally'
};

export const inline_2_1_1_2: PostTestQuestion = {
  id: 'inline_2_1_1_2',
  comprehensionId: 'comp_1',
  comprehensionTitle: COMP_1_TITLE,
  comprehensionText: COMP_1_TEXT,
  text: 'In a survey of 20 residents regarding their favorite zone, the responses are: Park, Library, Park, Gym, Park, Library, Gym, Park, Park, Library, Park, Gym, Park, Library, Park, Park, Gym, Park, Library, Park. Calculate the frequency for the Park preference.',
  hintLevel1: 'Count how many times Park appears in the raw response list.',
  remedialBrief: '11',
  remedialDetail: 'Zone preferences identified; the Parks Department has been notified of high demand.',
  format: GameFormat.RAINDROP,
  options: ['11', '9', '10', '12'],
  correctAnswer: '11'
};

export const inline_2_1_1_3: PostTestQuestion = {
  id: 'inline_2_1_1_3',
  comprehensionId: 'comp_1',
  comprehensionTitle: COMP_1_TITLE,
  comprehensionText: COMP_1_TEXT,
  text: 'The North District data is incomplete. Gym = 15 and Library = 25, with total respondents = 60. What is the correct strategic step to find the missing Park frequency?',
  hintLevel1: 'Consider how to find a remainder when you know the total and other parts.',
  remedialBrief: 'Subtract the sum of Gym and Library from the total respondents.',
  remedialDetail: 'North District data cleared; the full city survey is now organized.',
  format: GameFormat.DRAG_SORT,
  options: [
    'Multiply Gym and Library frequencies.',
    'Subtract the sum of Gym and Library from the total respondents.',
    'Divide the total respondents by two.'
  ],
  correctAnswer: 'Subtract the sum of Gym and Library from the total respondents.'
};

export const inline_2_1_2_1: PostTestQuestion = {
  id: 'inline_2_1_2_1',
  comprehensionId: 'comp_2',
  comprehensionTitle: COMP_2_TITLE,
  comprehensionText: COMP_2_TEXT,
  text: 'For class intervals 0-10, 10-20, and 20-30, what is the class size (width)?',
  hintLevel1: 'Find the difference between upper and lower limits.',
  remedialBrief: '10',
  remedialDetail: 'Demographics calibrated; age brackets are now standardized.',
  format: GameFormat.RAINDROP,
  options: ['10', '5', '15', '20'],
  correctAnswer: '10'
};

export const inline_2_1_2_2: PostTestQuestion = {
  id: 'inline_2_1_2_2',
  comprehensionId: 'comp_2',
  comprehensionTitle: COMP_2_TITLE,
  comprehensionText: COMP_2_TEXT,
  text: 'Which graph should be used when bars touch each other to represent grouped continuous numerical data?',
  hintLevel1: 'This graph uses touching bars to show continuity.',
  remedialBrief: 'Histogram',
  remedialDetail: 'Blueprint generated; the age distribution is now visible.',
  format: GameFormat.RAINDROP,
  options: ['Histogram', 'Bar Graph', 'Pie Chart', 'Pictograph'],
  correctAnswer: 'Histogram'
};

export const inline_2_1_2_3: PostTestQuestion = {
  id: 'inline_2_1_2_3',
  comprehensionId: 'comp_2',
  comprehensionTitle: COMP_2_TITLE,
  comprehensionText: COMP_2_TEXT,
  text: 'For the class interval 30-40, where should a resident exactly 40 years old be counted?',
  hintLevel1: 'In exclusive class intervals, upper limit is excluded and lower limit is included.',
  remedialBrief: '40-50',
  remedialDetail: 'Strategic accuracy confirmed; resident 40 has been correctly filed in the 40-50 bracket.',
  format: GameFormat.DRAG_SORT,
  options: ['30-40', '40-50', 'Both 30-40 and 40-50'],
  correctAnswer: '40-50'
};

export const inline_2_1_3_1: PostTestQuestion = {
  id: 'inline_2_1_3_1',
  comprehensionId: 'comp_3',
  comprehensionTitle: COMP_3_TITLE,
  comprehensionText: COMP_3_TEXT,
  text: 'What is the graph called when two bars are shown side-by-side for each category to compare datasets?',
  hintLevel1: 'It compares two datasets using paired bars.',
  remedialBrief: 'Double Bar Graph',
  remedialDetail: 'Comparison mode active; transport trends are now appearing.',
  format: GameFormat.DRAG_SORT,
  options: ['Pictograph', 'Double Bar Graph', 'Histogram'],
  correctAnswer: 'Double Bar Graph'
};

export const inline_2_1_3_2: PostTestQuestion = {
  id: 'inline_2_1_3_2',
  comprehensionId: 'comp_3',
  comprehensionTitle: COMP_3_TITLE,
  comprehensionText: COMP_3_TEXT,
  text: 'If 150 residents want more Bus Routes and 250 want a New Metro Line, how many more prefer Metro?',
  hintLevel1: 'Subtract Bus Route preference from Metro preference.',
  remedialBrief: '100',
  remedialDetail: 'Transport priority set; Metro expansion is now the lead project.',
  format: GameFormat.RAINDROP,
  options: ['100', '50', '150', '400'],
  correctAnswer: '100'
};

export const inline_2_1_3_3: PostTestQuestion = {
  id: 'inline_2_1_3_3',
  comprehensionId: 'comp_3',
  comprehensionTitle: COMP_3_TITLE,
  comprehensionText: COMP_3_TEXT,
  text: 'In a bar graph, each vertical unit = 25 satisfied residents. If East Zone bar height is 7 units, how many satisfied residents are there?',
  hintLevel1: 'Multiply the number of units by value per unit.',
  remedialBrief: '175',
  remedialDetail: 'Sanitation report verified; East Zone satisfaction is higher than projected.',
  format: GameFormat.RAINDROP,
  options: ['175', '150', '200', '225'],
  correctAnswer: '175'
};

export const inline_2_1_4_1: PostTestQuestion = {
  id: 'inline_2_1_4_1',
  comprehensionId: 'comp_4',
  comprehensionTitle: COMP_4_TITLE,
  comprehensionText: COMP_4_TEXT,
  text: 'What is the sum of all central angles in a complete pie chart?',
  hintLevel1: 'Think about total degrees in a full circle.',
  remedialBrief: '360',
  remedialDetail: 'Budget circle initialized; all sectors are ready for calculation.',
  format: GameFormat.RAINDROP,
  options: ['360', '90', '180', '270'],
  correctAnswer: '360'
};

export const inline_2_1_4_2: PostTestQuestion = {
  id: 'inline_2_1_4_2',
  comprehensionId: 'comp_4',
  comprehensionTitle: COMP_4_TITLE,
  comprehensionText: COMP_4_TEXT,
  text: 'If Education gets exactly 25% of the annual budget, what central angle should its pie-chart sector have?',
  hintLevel1: 'Use (Percentage / 100) x 360.',
  remedialBrief: '90',
  remedialDetail: 'Education funding mapped; the school sector is correctly sized.',
  format: GameFormat.RAINDROP,
  options: ['90', '45', '60', '120'],
  correctAnswer: '90'
};

export const inline_2_1_4_3: PostTestQuestion = {
  id: 'inline_2_1_4_3',
  comprehensionId: 'comp_4',
  comprehensionTitle: COMP_4_TITLE,
  comprehensionText: COMP_4_TEXT,
  text: 'Total city budget is 5,00,000 rupees. If Emergency Services has a central angle of 36 degrees, how much budget is allocated?',
  hintLevel1: 'Use angle fraction: 36/360 of total budget.',
  remedialBrief: '50,000',
  remedialDetail: 'Emergency funds secured; Datapur is now prepared for any crisis.',
  format: GameFormat.RAINDROP,
  options: ['50,000', '40,000', '60,000', '10,000'],
  correctAnswer: '50,000'
};

export const inline_2_1_5_1: PostTestQuestion = {
  id: 'inline_2_1_5_1',
  comprehensionId: 'comp_5',
  comprehensionTitle: COMP_5_TITLE,
  comprehensionText: COMP_5_TEXT,
  text: 'If a citizen lottery has 1000 tickets and you hold one ticket, what is the probability of your ticket being drawn?',
  hintLevel1: 'Probability = favorable outcomes / total outcomes.',
  remedialBrief: '1/1000',
  remedialDetail: 'Lottery parameters set; fair chance distribution confirmed.',
  format: GameFormat.DRAG_SORT,
  options: ['1/10', '1/1000', '1/100'],
  correctAnswer: '1/1000'
};

export const inline_2_1_5_2: PostTestQuestion = {
  id: 'inline_2_1_5_2',
  comprehensionId: 'comp_5',
  comprehensionTitle: COMP_5_TITLE,
  comprehensionText: COMP_5_TEXT,
  text: 'A fleet has 7 Electric Buses and 3 Diesel Buses. If one bus is dispatched at random, what is the probability it is NOT Diesel?',
  hintLevel1: 'Not Diesel means selecting an Electric Bus.',
  remedialBrief: '0.7',
  remedialDetail: 'Green energy forecast complete; high probability of eco-friendly transport today.',
  format: GameFormat.RAINDROP,
  options: ['0.7', '0.3', '0.5', '1.0'],
  correctAnswer: '0.7'
};

export const inline_2_1_5_3: PostTestQuestion = {
  id: 'inline_2_1_5_3',
  comprehensionId: 'comp_5',
  comprehensionTitle: COMP_5_TITLE,
  comprehensionText: COMP_5_TEXT,
  text: 'You draw one file from 10 and keep it out before drawing the second. Does the second probability change? Name the event type.',
  hintLevel1: 'Check whether second draw depends on first draw outcome.',
  remedialBrief: 'Dependent',
  remedialDetail: 'Logic check passed; the sequence of planning events is understood.',
  format: GameFormat.RAINDROP,
  options: ['Dependent', 'Independent', 'Random', 'Equal'],
  correctAnswer: 'Dependent'
};

export const postTestQuestions: Question[] = [
  inline_2_1_1_1,
  inline_2_1_1_2,
  inline_2_1_1_3,
  inline_2_1_2_1,
  inline_2_1_2_2,
  inline_2_1_2_3,
  inline_2_1_3_1,
  inline_2_1_3_2,
  inline_2_1_3_3,
  inline_2_1_4_1,
  inline_2_1_4_2,
  inline_2_1_4_3,
  inline_2_1_5_1,
  inline_2_1_5_2,
  inline_2_1_5_3,
];

export const postTestComprehensions = [
  {
    id: 'comp_1',
    title: COMP_1_TITLE,
    text: COMP_1_TEXT,
    questionIds: ['inline_2_1_1_1', 'inline_2_1_1_2', 'inline_2_1_1_3']
  },
  {
    id: 'comp_2',
    title: COMP_2_TITLE,
    text: COMP_2_TEXT,
    questionIds: ['inline_2_1_2_1', 'inline_2_1_2_2', 'inline_2_1_2_3']
  },
  {
    id: 'comp_3',
    title: COMP_3_TITLE,
    text: COMP_3_TEXT,
    questionIds: ['inline_2_1_3_1', 'inline_2_1_3_2', 'inline_2_1_3_3']
  },
  {
    id: 'comp_4',
    title: COMP_4_TITLE,
    text: COMP_4_TEXT,
    questionIds: ['inline_2_1_4_1', 'inline_2_1_4_2', 'inline_2_1_4_3']
  },
  {
    id: 'comp_5',
    title: COMP_5_TITLE,
    text: COMP_5_TEXT,
    questionIds: ['inline_2_1_5_1', 'inline_2_1_5_2', 'inline_2_1_5_3']
  }
];
