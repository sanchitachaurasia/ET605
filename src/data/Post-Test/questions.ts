import { GameFormat, Question } from '../../types';

// Stage 1: The Raw Survey
export const inline_2_1_1_1: Question = {
  id: 'inline_2_1_1_1',
  text: 'What is the technical name for these marks used to count frequency?',
  hintLevel1: 'Think about the tally system used to group items by five.',
  remedialBrief: 'Tally (or Tally Marks)',
  remedialDetail: 'System initialized; the South District responses are now being processed.',
  format: GameFormat.RAINDROP,
  options: ['Tally', 'Bar Marks', 'Frequency Strokes', 'Data Lines'],
  correctAnswer: 'Tally'
};

export const inline_2_1_1_2: Question = {
  id: 'inline_2_1_1_2',
  text: 'In a survey of 20 residents regarding their favorite zone, the responses are: Park, Library, Park, Gym, Park, Library, Gym, Park, Park, Library, Park, Gym, Park, Library, Park, Park, Gym, Park, Library, Park. Calculate the frequency for the "Park" preference?',
  hintLevel1: 'Count how many times "Park" appears in the raw response list.',
  remedialBrief: '11',
  remedialDetail: 'Zone preferences identified; the Parks Department has been notified of high demand.',
  format: GameFormat.RAINDROP,
  options: ['11', '9', '10', '12'],
  correctAnswer: '11'
};

export const inline_2_1_1_3: Question = {
  id: 'inline_2_1_1_3',
  text: 'The North District data is a mess. We have the frequencies for Gym (15) and Library (25), but the "Park" frequency is missing. We know there were 60 total respondents in this district. Which of the following is the correct strategic step to find the missing "Park" frequency?',
  hintLevel1: 'Consider how to find a remainder when you know the total and the other parts.',
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

// Stage 2: The Age Demographic
export const inline_2_1_2_1: Question = {
  id: 'inline_2_1_2_1',
  text: 'We are grouping residents into age brackets to plan school and retirement zones. We have chosen the interval 0–10, 10–20, and 20–30.What is the "class size" (width) of these intervals?',
  hintLevel1: 'Find the difference between the upper and lower limit of an interval.',
  remedialBrief: '10',
  remedialDetail: 'Demographics calibrated; age brackets are now standardized.',
  format: GameFormat.RAINDROP,
  options: ['10', '5', '15', '20'],
  correctAnswer: '10'
};

export const inline_2_1_2_2: Question = {
  id: 'inline_2_1_2_2',
  text: 'We need a visual representation where the bars touch each other to show that age is a continuous scale, not separate categories. What specific type of graph should we use for this grouped numerical data?',
  hintLevel1: 'This graph features bars that touch to show continuity.',
  remedialBrief: 'Histogram',
  remedialDetail: 'Blueprint generated; the age distribution is now visible.',
  format: GameFormat.RAINDROP,
  options: ['Histogram', 'Bar Graph', 'Pie Chart', 'Pictograph'],
  correctAnswer: 'Histogram'
};

export const inline_2_1_2_3: Question = {
  id: 'inline_2_1_2_3',
  text: 'You are looking at the class interval 30–40 for the "Working Professional" group. A resident exactly 40 years old just submitted their form. In which class interval should this 40-year-old resident be counted?',
  hintLevel1: 'In class intervals, the upper limit is excluded and the lower limit is included.',
  remedialBrief: '40–50',
  remedialDetail: 'Strategic accuracy confirmed; resident 40 has been correctly filed in the 40–50 bracket.',
  format: GameFormat.DRAG_SORT,
  options: ['30–40', '40–50', 'Both 30–40 and 40–50'],
  correctAnswer: '40–50'
};

// Stage 3: The Public Opinion
export const inline_2_1_3_1: Question = {
  id: 'inline_2_1_3_1',
  text: 'What is the name of this specific graphical tool used for comparison?',
  hintLevel1: 'It shows two sets of data side-by-side using rectangular bars.',
  remedialBrief: 'Double Bar Graph',
  remedialDetail: 'Comparison mode active; transport trends are now appearing.',
  format: GameFormat.DRAG_SORT,
  options: ['Pictograph', 'Double Bar Graph', 'Histogram'],
  correctAnswer: 'Double Bar Graph'
};

export const inline_2_1_3_2: Question = {
  id: 'inline_2_1_3_2',
  text: 'A bar graph shows that 150 people want more Bus Routes and 250 people want a New Metro Line. How many more residents prefer the Metro Line over Bus Routes?',
  hintLevel1: 'Subtract the Bus Route preference count from the Metro Line count.',
  remedialBrief: '100',
  remedialDetail: 'Transport priority set; Metro expansion is now the lead project.',
  format: GameFormat.RAINDROP,
  options: ['100', '50', '150', '400'],
  correctAnswer: '100'
};

export const inline_2_1_3_3: Question = {
  id: 'inline_2_1_3_3',
  text: 'In our "City Cleanliness" bar graph, each unit on the vertical axis represents 25 "Satisfied Residents." The bar for the "East Zone" reaches a height of 7 units. Calculate the total number of satisfied residents in the East Zone.',
  hintLevel1: 'Multiply the height in units by the value each unit represents.',
  remedialBrief: '175',
  remedialDetail: 'Sanitation report verified; East Zone satisfaction is higher than projected.',
  format: GameFormat.RAINDROP,
  options: ['175', '150', '200', '225'],
  correctAnswer: '175'
};

// Stage 4: The Budget Allocation
export const inline_2_1_4_1: Question = {
  id: 'inline_2_1_4_1',
  text: 'What is the sum of the central angles of all the sectors in this circular budget map?',
  hintLevel1: 'Think about the total degrees in a full circle.',
  remedialBrief: '360',
  remedialDetail: 'Budget circle initialized; all sectors are ready for calculation.',
  format: GameFormat.RAINDROP,
  options: ['360', '90', '180', '270'],
  correctAnswer: '360'
};

export const inline_2_1_4_2: Question = {
  id: 'inline_2_1_4_2',
  text: 'The Mayor has decided that exactly 25% of the annual budget will go to "Education. Calculate the central angle needed to represent the Education sector on our pie chart.',
  hintLevel1: 'The formula is (Percentage / 100) * 360.',
  remedialBrief: '90',
  remedialDetail: 'Education funding mapped; the school sector is correctly sized.',
  format: GameFormat.RAINDROP,
  options: ['90', '45', '60', '120'],
  correctAnswer: '90'
};

export const inline_2_1_4_3: Question = {
  id: 'inline_2_1_4_3',
  text: 'The total City Budget is ₹5,00,000. On the pie chart, the "Emergency Services" sector has a central angle of 36°. How much money in Rupees is allocated to Emergency Services?',
  hintLevel1: 'Use the angle (36°) to find the fraction of the total budget (5,00,000).',
  remedialBrief: '50,000',
  remedialDetail: 'Emergency funds secured; Datapur is now prepared for any crisis.',
  format: GameFormat.RAINDROP,
  options: ['50,000', '40,000', '60,000', '10,000'],
  correctAnswer: '50,000'
};

// Stage 5: The Forecast
export const inline_2_1_5_1: Question = {
  id: 'inline_2_1_5_1',
  text: 'What is the probability of your ticket being drawn?',
  hintLevel1: 'Probability = (Favorable outcomes) / (Total outcomes).',
  remedialBrief: '1/1000',
  remedialDetail: 'Lottery parameters set; fair chance distribution confirmed.',
  format: GameFormat.DRAG_SORT,
  options: ['1/10', '1/1000', '1/100'],
  correctAnswer: '1/1000'
};

export const inline_2_1_5_2: Question = {
  id: 'inline_2_1_5_2',
  text: 'The city fleet has 7 Electric Buses and 3 Diesel Buses. A bus is dispatched at random. What is the probability that the dispatched bus is NOT a Diesel Bus?',
  hintLevel1: 'Calculate the probability for Electric Buses.',
  remedialBrief: '0.7',
  remedialDetail: 'Green energy forecast complete; high probability of eco-friendly transport today.',
  format: GameFormat.RAINDROP,
  options: ['0.7', '0.3', '0.5', '1.0'],
  correctAnswer: '0.7'
};

export const inline_2_1_5_3: Question = {
  id: 'inline_2_1_5_3',
  text: 'You are drawing two planning files from a cabinet of 10. You take the first file and keep it on your desk. Then, you reach in for a second file. Does the probability of picking a specific file the second time change? Use the technical term.',
  hintLevel1: 'Think about whether the outcome of the second draw relies on the first.',
  remedialBrief: 'Dependent',
  remedialDetail: 'Logic check passed; the sequence of planning events is understood.',
  format: GameFormat.RAINDROP,
  options: ['Dependent', 'Independent', 'Random', 'Equal'],
  correctAnswer: 'Dependent'
};
