import { GameFormat } from '../../types';

const SUPPORTED_GAME_FORMATS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
];

function buildUniversalStyles(options: string[], correctAnswer: string, visual?: any): Record<string, any> {
  return SUPPORTED_GAME_FORMATS.reduce((acc, gameFormat) => {
    acc[gameFormat] = {
      ...(visual ? { visual } : {}),
      options: [...options],
      correctAnswer,
    };
    return acc;
  }, {} as Record<string, any>);
}

// TOPIC 1 

export const inline_2_1_1_0 = {
  id: 'inline_2_1_1_0',
  text: 'Pictograph of cars: one symbol = 50 cars. September shows 4 full symbols and 1 half symbol. How many cars?',
  options: ['200', '225', '250', '175'],
  correctAnswer: '225',
  format: GameFormat.RAINDROP,
  hint: 'Read the key first, then separate full symbols and partial symbols before calculating.',
  hintLevel1: 'Read the key first, then separate full symbols and partial symbols before calculating.',
  hintLevel2: 'Find the full-symbol total first, then convert the half symbol using scale ÷ 2 and add it.',
  correctAnswerExplanation: '(B) 225 cars = [4 × 50] + [1/2 × 50] = 200 + 25 = 225.',
  incorrectOptionFeedback: {
    '250': 'You counted the half symbol as a full symbol (5 × 50 = 250). A half symbol is only HALF the scale value.',
    '200': 'You ignored the half symbol entirely (4 × 50 = 200 only). The half symbol still contributes 25 cars.',
    '175': 'You likely missed one full symbol and then counted the half correctly (3 × 50 + 25 = 175). Recount: there are 4 full symbols and 1 half symbol.'
  },
  questionTags: ['data-organization', 'frequency-analysis', 'graph-selection', 'pictograph-scaling'],
  remedialBrief: 'Correct answer: (B) 225 cars. Compute full symbols first, then add the half-symbol value.',
  remedialDetail: 'Core Concept: Always read the key. In pictographs, value = number of symbols × scale value. Step-by-step: 4 × 50 = 200, half symbol = 25, total = 225.',
  remedialContent: {
    coreConcept: {
      title: 'Pictograph Scale and Partial Symbols',
      points: [
        'Always read the key first.',
        'A pictograph symbol represents real units based on the key value.',
        'Value = number of symbols × scale value.',
        'Partial symbols are fractions of the scale value.',
        '1/2 symbol = scale value ÷ 2.',
        '1/4 symbol = scale value ÷ 4.',
        'If scale = 50 cars, then 1/2 symbol = 25 cars.'
      ]
    },
    stepByStep: {
      title: 'Step-by-Step Solution',
      steps: [
        'Read the key: 1 symbol = 50 cars.',
        'Count full symbols in September: 4 full symbols.',
        'Multiply: 4 × 50 = 200 cars.',
        'Count partial symbols: 1 half symbol = 50 ÷ 2 = 25 cars.',
        'Add: 200 + 25 = 225 cars.'
      ]
    },
    expandable: {
      buttonLabel: 'Show more examples and background',
      sections: [
        {
          title: 'Think of It Like Pizza Slices',
          points: [
            'If one full pizza = 8 slices, then half a pizza = 4 slices.',
            'A half symbol in a pictograph works the same way: it is exactly half the scale value.',
            'Treat partial symbols mathematically, not just visually.'
          ]
        },
        {
          title: 'More Examples (same key: 1 symbol = 100 cars)',
          points: [
            '2 symbols: 2 × 100 = 200',
            '3.5 symbols: 3 × 100 + 50 = 350',
            '2.75 symbols: 2 × 100 + 75 = 275',
            'Reverse case: 450 cars means 450 ÷ 100 = 4.5 symbols to draw'
          ]
        },
        {
          title: 'Limitation of Pictographs',
          points: [
            'When values are not exact multiples of the scale, fractional symbols are required.',
            'Too many fractional symbols can make pictographs less precise and harder to read.',
            'Bar graphs are often better for unusual or highly precise values.'
          ]
        }
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    ['200', '225', '250', '175'],
    '225',
    {
      kind: 'pictograph',
      rows: [{ label: 'September', symbols: '🚗🚗🚗🚗◐' }],
      key: 'Key: 1 symbol = 50 cars (half = 25)',
    }
  )
};

export const inline_2_1_1_0_1 = {
  id: 'inline_2_1_1_0_1',
  text: 'What is the PRIMARY reason we convert raw data into an organised format like a table or graph?',
  options: [
    'To add more information',
    'To make the list longer',
    'To reveal patterns and make comparisons possible at a glance',
    'To prove the data is correct',
  ],
  correctAnswer: 'To reveal patterns and make comparisons possible at a glance',
  format: GameFormat.RAINDROP,
  hint: 'Consider what you can do with a table that you cannot easily do with a long, random list.',
  hintLevel1: 'Consider what you can do with a table that you cannot easily do with a long, random list.',
  hintLevel2: 'It involves finding patterns and making comparisons almost instantly.',
  correctAnswerExplanation: '(C) To reveal patterns and make comparisons possible at a glance.',
  incorrectOptionFeedback: {
    'To add more information': 'Organisation does not add new data; it only rearranges what we already have.',
    'To make the list longer': 'Tables usually make information more compact, not longer.',
    'To prove the data is correct': 'Organisation helps checking, but the primary purpose is readability and comparison.'
  },
  questionTags: ['data-organization', 'frequency-analysis'],
  remedialBrief: 'Correct: (C). Organisation reveals patterns.',
  remedialDetail: 'Organising data helps us SEE patterns instead of searching for them.',
  remedialContent: {
    coreConcept: {
      title: 'Why We Organise Data',
      points: [
        'Organisation reveals frequency patterns quickly.',
        'It supports comparisons across categories.',
        'It reduces counting errors and repeated work.'
      ]
    },
    stepByStep: {
      title: 'Why Organisation Matters',
      steps: [
        'Find repeated items.',
        'Group them.',
        'Count frequency.',
        'Compare values.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'To add more information',
      'To make the list longer',
      'To reveal patterns and make comparisons possible at a glance',
      'To prove the data is correct',
    ],
    'To reveal patterns and make comparisons possible at a glance'
  )
};

export const inline_2_1_1_0_2 = {
  id: 'inline_2_1_1_0_2',
  text: 'In a list of 20 favorite fruits, "Mango" appears 9 times and "Apple" appears 5 times. In an organised table, how much more popular is Mango than Apple?',
  options: ['14', '4', '9', '5'],
  correctAnswer: '4',
  format: GameFormat.RAINDROP,
  hint: 'Use subtraction to find the difference between the two counts.',
  hintLevel1: 'Use subtraction to find the difference between the two counts.',
  hintLevel2: 'Perform the calculation: 9 - 5.',
  correctAnswerExplanation: '(B) 4. By looking at the counts (9 and 5), we can compare directly: 9 - 5 = 4.',
  incorrectOptionFeedback: {
    '14': 'You added the counts. To find how much more popular one is, subtract.',
    '9': '9 is Mango\'s count, not the difference.',
    '5': '5 is Apple\'s count, not the difference.'
  },
  questionTags: ['data-organization', 'frequency-analysis', 'applied-problem-solving'],
  remedialBrief: 'Correct: (B) 4. We compare by subtracting.',
  remedialDetail: 'Difference means subtraction. 9 - 5 = 4.',
  adaptiveVariant: true,
  styles: buildUniversalStyles(['14', '4', '9', '5'], '4')
};

export const inline_2_1_1_0_3 = {
  id: 'inline_2_1_1_0_3',
  text: 'Which of the following describes "Organised Data"?',
  options: [
    'Information arranged to make it easy to read, count, and compare',
    'Random list',
    'A list of names',
    'Data that is deleted',
  ],
  correctAnswer: 'Information arranged to make it easy to read, count, and compare',
  format: GameFormat.RAINDROP,
  hint: 'Think about words like arranged, easy to read, and patterns.',
  hintLevel1: 'Think about words like arranged, easy to read, and patterns.',
  hintLevel2: 'It is the opposite of a messy, random list.',
  correctAnswerExplanation: '(A) Information arranged to make it easy to read, count, and compare.',
  incorrectOptionFeedback: {
    'Random list': 'A random list is raw data, not organised data.',
    'A list of names': 'A list can still be raw if it is not grouped or sorted.',
    'Data that is deleted': 'Organisation rearranges data, it does not delete values.'
  },
  questionTags: ['data-organization'],
  remedialBrief: 'Correct: (A). Organised data is arranged data.',
  remedialDetail: 'Organised data is structured so interpretation becomes easier.',
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'Information arranged to make it easy to read, count, and compare',
      'Random list',
      'A list of names',
      'Data that is deleted',
    ],
    'Information arranged to make it easy to read, count, and compare'
  )
};

export const inline_2_1_1_0_4 = {
  id: 'inline_2_1_1_0_4',
  text: 'If you have a random list of 50 student marks, why is it hard to find the average mark immediately?',
  options: [
    'Marks are too high',
    'Numbers are incorrect',
    'Too much data',
    'There is no pattern or grouping, so you must process the whole list repeatedly',
  ],
  correctAnswer: 'There is no pattern or grouping, so you must process the whole list repeatedly',
  format: GameFormat.RAINDROP,
  hint: 'Is there any grouping or order in a random list?',
  hintLevel1: 'Is there any grouping or order in a random list?',
  hintLevel2: 'Without grouping, you keep scanning repeatedly to calculate.',
  correctAnswerExplanation: '(D) There is no pattern or grouping, so you have to process the whole list repeatedly.',
  incorrectOptionFeedback: {
    'Marks are too high': 'Value size is not the issue. Disorder is the issue.',
    'Numbers are incorrect': 'The values may be correct, but they are not structured.',
    'Too much data': 'Even a smaller raw list is harder than an organised one.'
  },
  questionTags: ['data-organization', 'applied-problem-solving'],
  remedialBrief: 'Correct: (D). No pattern means more effort.',
  remedialDetail: 'Disordered data increases cognitive load and repeated computation.',
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'Marks are too high',
      'Numbers are incorrect',
      'Too much data',
      'There is no pattern or grouping, so you must process the whole list repeatedly',
    ],
    'There is no pattern or grouping, so you must process the whole list repeatedly'
  )
};

export const inline_2_1_1_0_5 = {
  id: 'inline_2_1_1_0_5',
  text: 'Which daily-life example best represents turning raw data into organised data?',
  options: [
    'Buying groceries',
    'Throwing toys in a box',
    'Sorting a messy pile of laundry into shirts, pants, and socks',
    'Writing a story',
  ],
  correctAnswer: 'Sorting a messy pile of laundry into shirts, pants, and socks',
  format: GameFormat.RAINDROP,
  hint: 'Look for an example where items are grouped by type.',
  hintLevel1: 'Look for an example where items are grouped by type.',
  hintLevel2: 'Think about sorting things so finding them becomes faster.',
  correctAnswerExplanation: '(C) Sorting a messy pile of laundry into shirts, pants, and socks.',
  incorrectOptionFeedback: {
    'Buying groceries': 'This is collection, not organisation.',
    'Throwing toys in a box': 'That keeps items mixed, so it remains unorganised.',
    'Writing a story': 'That creates new content rather than organising existing data.'
  },
  questionTags: ['data-organization'],
  remedialBrief: 'Correct: (C). Sorting is organising.',
  remedialDetail: 'Grouping similar items is the same core idea used in data tables.',
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'Buying groceries',
      'Throwing toys in a box',
      'Sorting a messy pile of laundry into shirts, pants, and socks',
      'Writing a story',
    ],
    'Sorting a messy pile of laundry into shirts, pants, and socks'
  )
};

export const inline_2_1_1_0_6 = {
  id: 'inline_2_1_1_0_6',
  text: 'True or False: When we organise data into a table, the original values must change.',
  options: ['True', 'False'],
  correctAnswer: 'False',
  format: GameFormat.RAINDROP,
  hint: 'Does sorting books change their page counts?',
  hintLevel1: 'Does sorting books change their page counts?',
  hintLevel2: 'Organisation changes arrangement, not the underlying values.',
  correctAnswerExplanation: '(B) False. Organisation only arranges the same facts so they are easier to read; values stay the same.',
  incorrectOptionFeedback: {
    'True': 'If values changed, the data would become inaccurate.'
  },
  questionTags: ['data-organization'],
  remedialBrief: 'Correct: (B) False. Values remain the same.',
  remedialDetail: 'Organising data never deletes or alters the original facts.',
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'False')
};

// TOPIC 2 

export const inline_2_1_2_0 = {
  id: 'inline_2_1_2_0',
  text: 'In a frequency table, Maths has tally marks |||| ||. What is the frequency of Maths?',
  options: ['7', '6', '5', '4'],
  correctAnswer: '7',
  format: GameFormat.RAINDROP,
  hint: 'Each full tally line counts as 1, and there are 7 total marks.',
  hintLevel1: 'Each full tally line counts as 1, and there are 7 total marks.',
  hintLevel2: 'Count the first bundle of 5, then add the extra 2 lines: 5 + 2 = 7.',
  correctAnswerExplanation: '(A) 7. Tally |||| || means a group of 5 plus 2 more, so frequency = 7.',
  incorrectOptionFeedback: {
    '6': 'You undercounted by 1. Recount after grouping: 5 + 2.',
    '5': 'You counted only the first bundle and ignored the extra two tally marks.',
    '4': 'You may have confused this with a different row. Count all marks in the Maths row only.'
  },
  questionTags: ['tally-marks', 'frequency-table', 'data-organization'],
  remedialBrief: 'Correct answer: (A) 7. Read tally marks as grouped counts.',
  remedialDetail: 'A standard tally system uses one crossed bundle for 5. Add remaining marks to get total frequency.',
  remedialContent: {
    coreConcept: {
      title: 'Reading Tally Marks',
      points: [
        'Tally marks record count quickly while scanning data.',
        'A bundle of five helps avoid miscounting.',
        'Frequency is the total count for one category.'
      ]
    },
    stepByStep: {
      title: 'Solve It Fast',
      steps: [
        'Identify tally bundle(s) of 5.',
        'Count remaining single marks.',
        'Add: 5 + 2 = 7.'
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    ['7', '6', '5', '4'],
    '7',
    {
      kind: 'frequency-table',
      rows: [
        { category: 'Maths', tally: '|||| ||' },
        { category: 'Science', tally: '||||' },
        { category: 'English', tally: '||||' },
        { category: 'Art', tally: '|||| |' }
      ]
    }
  )
};

export const inline_2_1_2_0_1 = {
  id: 'inline_2_1_2_0_1',
  text: 'Why do tally marks usually get grouped in fives?',
  options: [
    'To make counting faster and reduce mistakes',
    'To make the table look longer',
    'Because frequencies cannot exceed 5',
    'To avoid writing category names'
  ],
  correctAnswer: 'To make counting faster and reduce mistakes',
  format: GameFormat.RAINDROP,
  hint: 'Think about what helps when counts become large.',
  hintLevel1: 'Think about what helps when counts become large.',
  hintLevel2: 'Grouping into 5s improves speed and accuracy while reading totals.',
  correctAnswerExplanation: '(A) Grouping in fives makes counting efficient and reliable.',
  incorrectOptionFeedback: {
    'To make the table look longer': 'Tally grouping is functional, not decorative.',
    'Because frequencies cannot exceed 5': 'Frequencies can be any number; groups of 5 are just a counting aid.',
    'To avoid writing category names': 'Category labels are still required in frequency tables.'
  },
  questionTags: ['tally-marks', 'counting-strategy'],
  remedialBrief: 'Correct: grouping in fives improves counting speed and accuracy.',
  remedialDetail: 'Bundles of five are easier to scan than long runs of single marks.',
  remedialContent: {
    coreConcept: {
      title: 'Why Group in Five',
      points: [
        'Bundles reduce mental load.',
        'You can add counts rapidly: 5 + 5 + 3, etc.',
        'It lowers the chance of recount errors.'
      ]
    },
    stepByStep: {
      title: 'Quick Reading Pattern',
      steps: [
        'Count complete groups of 5.',
        'Count leftover single tallies.',
        'Add both results.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'To make counting faster and reduce mistakes',
      'To make the table look longer',
      'Because frequencies cannot exceed 5',
      'To avoid writing category names'
    ],
    'To make counting faster and reduce mistakes'
  )
};

export const inline_2_1_2_0_2 = {
  id: 'inline_2_1_2_0_2',
  text: 'A table shows frequencies 5, 7, 4, and 4. How many total observations are there?',
  options: ['20', '16', '12', '24'],
  correctAnswer: '20',
  format: GameFormat.RAINDROP,
  hint: 'Add all frequencies to get total data points.',
  hintLevel1: 'Add all frequencies to get total data points.',
  hintLevel2: 'Compute: 5 + 7 + 4 + 4.',
  correctAnswerExplanation: '(A) 20. Total observations = sum of all category frequencies.',
  incorrectOptionFeedback: {
    '16': 'You likely skipped one category while summing.',
    '12': 'This is too small; check all four categories.',
    '24': 'You overcounted. Add exactly: 5 + 7 + 4 + 4 = 20.'
  },
  questionTags: ['frequency-table', 'verification', 'totals'],
  remedialBrief: 'Correct: total observations = 20.',
  remedialDetail: 'In a frequency table, total data points always equal the sum of frequencies.',
  remedialContent: {
    coreConcept: {
      title: 'Frequency Total Check',
      points: [
        'Every observation belongs to one category.',
        'So category frequencies must add to the dataset size.',
        'This is a built-in accuracy check.'
      ]
    },
    stepByStep: {
      title: 'Compute Total',
      steps: [
        'List frequencies: 5, 7, 4, 4.',
        'Add carefully from left to right.',
        'Result: 20.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['20', '16', '12', '24'], '20')
};

export const inline_2_1_2_0_3 = {
  id: 'inline_2_1_2_0_3',
  text: 'Given this frequency table: Dog=10, Cat=6, Fish=4, None=5. Which category is most common?',
  options: ['Dog', 'Cat', 'Fish', 'None'],
  correctAnswer: 'Dog',
  format: GameFormat.RAINDROP,
  hint: 'Most common means highest frequency.',
  hintLevel1: 'Most common means highest frequency.',
  hintLevel2: 'Compare values: 10, 6, 4, 5. Pick the largest.',
  correctAnswerExplanation: '(A) Dog, because frequency 10 is the maximum.',
  incorrectOptionFeedback: {
    'Cat': 'Cat has frequency 6, which is lower than 10.',
    'Fish': 'Fish has the lowest frequency here (4).',
    'None': 'None has frequency 5, not the highest.'
  },
  questionTags: ['frequency-comparison', 'data-interpretation'],
  remedialBrief: 'Correct: Dog has highest count.',
  remedialDetail: 'To identify most common category, scan frequency column and choose the maximum value.',
  remedialContent: {
    coreConcept: {
      title: 'Highest Frequency Rule',
      points: [
        'Most common category corresponds to maximum frequency.',
        'Do not use row order as a clue.',
        'Always compare all values before deciding.'
      ]
    },
    stepByStep: {
      title: 'Decision Steps',
      steps: [
        'Read all frequencies.',
        'Find maximum value (10).',
        'Map it to category: Dog.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['Dog', 'Cat', 'Fish', 'None'], 'Dog')
};

export const inline_2_1_2_0_4 = {
  id: 'inline_2_1_2_0_4',
  text: 'Marks grouped as 10-20:7, 20-30:8, 30-40:8, 40-50:7. Which is/are the modal class(es)?',
  options: ['20-30 and 30-40', '10-20 only', '40-50 only', 'All classes equally modal'],
  correctAnswer: '20-30 and 30-40',
  format: GameFormat.RAINDROP,
  hint: 'Modal class means class interval with highest frequency.',
  hintLevel1: 'Modal class means class interval with highest frequency.',
  hintLevel2: 'The largest frequency is 8, and it appears in two intervals.',
  correctAnswerExplanation: '(A) Both 20-30 and 30-40 are modal classes since both have frequency 8.',
  incorrectOptionFeedback: {
    '10-20 only': '10-20 has frequency 7, not the maximum.',
    '40-50 only': '40-50 also has frequency 7, not the maximum.',
    'All classes equally modal': 'Frequencies are not all equal; two are 8 and two are 7.'
  },
  questionTags: ['grouped-data', 'class-intervals', 'modal-class'],
  remedialBrief: 'Correct: two intervals tie for highest frequency.',
  remedialDetail: 'When the highest frequency repeats, the dataset has multiple modal classes.',
  remedialContent: {
    coreConcept: {
      title: 'Modal Class in Grouped Data',
      points: [
        'Modal class is the interval with maximum frequency.',
        'Ties are possible.',
        'All tied maximum intervals are modal.'
      ]
    },
    stepByStep: {
      title: 'Find Modal Class',
      steps: [
        'List frequencies: 7, 8, 8, 7.',
        'Identify maximum: 8.',
        'Select all intervals with 8.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['20-30 and 30-40', '10-20 only', '40-50 only', 'All classes equally modal'],
    '20-30 and 30-40'
  )
};

export const inline_2_1_2_0_5 = {
  id: 'inline_2_1_2_0_5',
  text: 'Why do histogram bars touch while bar graph bars usually have gaps?',
  options: [
    'Histogram intervals are continuous and adjacent on a number line',
    'Histograms always use more colors',
    'Bar graphs cannot show numerical data',
    'Gaps are added only for decoration'
  ],
  correctAnswer: 'Histogram intervals are continuous and adjacent on a number line',
  format: GameFormat.RAINDROP,
  hint: 'Think about continuous ranges versus separate categories.',
  hintLevel1: 'Think about continuous ranges versus separate categories.',
  hintLevel2: 'Adjacent intervals share boundaries, so no visual gap should appear.',
  correctAnswerExplanation: '(A) Histogram intervals are connected ranges, so bars touch.',
  incorrectOptionFeedback: {
    'Histograms always use more colors': 'Color choice does not define histogram structure.',
    'Bar graphs cannot show numerical data': 'Bar graphs do show numbers, but for discrete categories.',
    'Gaps are added only for decoration': 'Gaps convey mathematical meaning in categorical data.'
  },
  questionTags: ['histogram', 'bar-graph', 'graph-selection'],
  remedialBrief: 'Correct: touching bars represent continuous grouped data.',
  remedialDetail: 'Histograms represent intervals on a number line; bar graphs represent separate categories.',
  remedialContent: {
    coreConcept: {
      title: 'Histogram vs Bar Graph',
      points: [
        'Histogram: grouped continuous data, bars touch.',
        'Bar graph: categorical data, bars separated by gaps.',
        'Gap/no-gap communicates data structure.'
      ]
    },
    stepByStep: {
      title: 'Choose Graph Type',
      steps: [
        'Ask if data is interval-based or category-based.',
        'If intervals: use histogram.',
        'If categories: use bar graph.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'Histogram intervals are continuous and adjacent on a number line',
      'Histograms always use more colors',
      'Bar graphs cannot show numerical data',
      'Gaps are added only for decoration'
    ],
    'Histogram intervals are continuous and adjacent on a number line'
  )
};

export const inline_2_1_2_0_6 = {
  id: 'inline_2_1_2_0_6',
  text: 'True or False: The sum of all frequencies in a complete frequency table must equal total data points.',
  options: ['True', 'False'],
  correctAnswer: 'True',
  format: GameFormat.RAINDROP,
  hint: 'Each observation is counted once in exactly one category.',
  hintLevel1: 'Each observation is counted once in exactly one category.',
  hintLevel2: 'If totals do not match, the table has a counting or grouping error.',
  correctAnswerExplanation: '(A) True. This is a core verification rule for frequency tables.',
  incorrectOptionFeedback: {
    'False': 'If frequencies do not add to total observations, the table is incomplete or incorrect.'
  },
  questionTags: ['frequency-table', 'verification'],
  remedialBrief: 'Correct: total frequency equals dataset size.',
  remedialDetail: 'The frequency total check is the most reliable way to validate table accuracy.',
  remedialContent: {
    coreConcept: {
      title: 'Verification Rule',
      points: [
        'Every data value contributes to exactly one category count.',
        'Adding all category counts reconstructs the dataset size.',
        'Mismatch indicates an error.'
      ]
    },
    stepByStep: {
      title: 'Check Procedure',
      steps: [
        'Add all frequencies.',
        'Compare with original number of observations.',
        'If unequal, recheck tallying.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'True')
};

// TOPIC 3 

export const inline_2_1_3_0 = {
  id: 'inline_2_1_3_0',
  text: 'A pictograph key says 1 symbol = 20 books. Shelf A has 3 full symbols and 1 half symbol. How many books is that?',
  options: ['70', '60', '80', '50'],
  correctAnswer: '70',
  format: GameFormat.RAINDROP,
  hint: 'Compute full symbols first, then add half-symbol value.',
  hintLevel1: 'Compute full symbols first, then add half-symbol value.',
  hintLevel2: '3 × 20 = 60 and half of 20 is 10, so total is 70.',
  correctAnswerExplanation: '(A) 70 books = (3 × 20) + (1/2 × 20) = 60 + 10.',
  incorrectOptionFeedback: {
    '60': 'You ignored the half symbol.',
    '80': 'You counted the half symbol as a full symbol.',
    '50': 'You undercounted full symbols and/or ignored the key.'
  },
  questionTags: ['pictograph', 'scale', 'partial-symbols'],
  remedialBrief: 'Correct answer: (A) 70. Include both full and partial symbols.',
  remedialDetail: 'Pictograph value = number of symbols × scale, with partial symbols as fractions of the scale.',
  remedialContent: {
    coreConcept: {
      title: 'Pictograph with Half Symbols',
      points: [
        'Always start by reading the key.',
        'Half symbol means half the scale value.',
        'Add full-symbol value and partial-symbol value.'
      ]
    },
    stepByStep: {
      title: 'Step-by-Step',
      steps: [
        'Read scale: 1 symbol = 20 books.',
        'Compute full part: 3 × 20 = 60.',
        'Compute half part: 20 ÷ 2 = 10.',
        'Add: 60 + 10 = 70.'
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    ['70', '60', '80', '50'],
    '70',
    {
      kind: 'pictograph',
      rows: [{ label: 'Shelf A', symbols: '📚📚📚◐' }],
      key: 'Key: 1 symbol = 20 books (half = 10)'
    }
  )
};

export const inline_2_1_3_0_1 = {
  id: 'inline_2_1_3_0_1',
  text: 'In a pictograph, what does the key tell you?',
  options: [
    'How many real units one symbol represents',
    'The color of each symbol only',
    'The order in which categories must be read',
    'The title font size of the graph'
  ],
  correctAnswer: 'How many real units one symbol represents',
  format: GameFormat.RAINDROP,
  hint: 'Without the key, symbol counts cannot be converted to actual values.',
  hintLevel1: 'Without the key, symbol counts cannot be converted to actual values.',
  hintLevel2: 'The key defines symbol-to-value mapping, like 1 icon = 50 units.',
  correctAnswerExplanation: '(A) The key defines the scale of the pictograph.',
  incorrectOptionFeedback: {
    'The color of each symbol only': 'Color may help visually, but the key is primarily about value mapping.',
    'The order in which categories must be read': 'Order is not the main purpose of the key.',
    'The title font size of the graph': 'Title styling is unrelated to data value interpretation.'
  },
  questionTags: ['pictograph', 'key', 'graph-reading'],
  remedialBrief: 'Correct: key = symbol value mapping.',
  remedialDetail: 'The key is essential because symbol count alone does not reveal real quantity.',
  remedialContent: {
    coreConcept: {
      title: 'Role of the Key',
      points: [
        'Key is the scale definition.',
        'It converts icons to numerical quantities.',
        'Ignoring key leads to wrong answers.'
      ]
    },
    stepByStep: {
      title: 'Reading Workflow',
      steps: [
        'Read key first.',
        'Count symbols per category.',
        'Multiply by key value.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'How many real units one symbol represents',
      'The color of each symbol only',
      'The order in which categories must be read',
      'The title font size of the graph'
    ],
    'How many real units one symbol represents'
  )
};

export const inline_2_1_3_0_2 = {
  id: 'inline_2_1_3_0_2',
  text: 'If the key is 1 symbol = 100 cars, what does a half symbol represent?',
  options: ['50 cars', '100 cars', '25 cars', '10 cars'],
  correctAnswer: '50 cars',
  format: GameFormat.RAINDROP,
  hint: 'Half symbol means half of the scale value.',
  hintLevel1: 'Half symbol means half of the scale value.',
  hintLevel2: 'Compute 100 ÷ 2.',
  correctAnswerExplanation: '(A) 50 cars. Half of 100 is 50.',
  incorrectOptionFeedback: {
    '100 cars': 'That is a full symbol, not a half symbol.',
    '25 cars': 'That would be one-fourth of 100.',
    '10 cars': 'This does not match half of the scale.'
  },
  questionTags: ['pictograph', 'partial-symbols', 'scale'],
  remedialBrief: 'Correct: half symbol = scale/2 = 50.',
  remedialDetail: 'Partial symbols always represent proportional fractions of the key value.',
  remedialContent: {
    coreConcept: {
      title: 'Fractional Symbols',
      points: [
        '1/2 symbol = scale ÷ 2.',
        '1/4 symbol = scale ÷ 4.',
        'Apply exact fractions, not visual guesses.'
      ]
    },
    stepByStep: {
      title: 'Compute Partial Value',
      steps: [
        'Identify scale: 100.',
        'Take half: 100 ÷ 2.',
        'Result: 50.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['50 cars', '100 cars', '25 cars', '10 cars'], '50 cars')
};

export const inline_2_1_3_0_3 = {
  id: 'inline_2_1_3_0_3',
  text: 'For values up to 450, which key is most practical for a pictograph with readable symbol counts?',
  options: ['1 symbol = 50', '1 symbol = 1', '1 symbol = 3', '1 symbol = 7'],
  correctAnswer: '1 symbol = 50',
  format: GameFormat.RAINDROP,
  hint: 'Choose a scale that avoids too many symbols while keeping accuracy manageable.',
  hintLevel1: 'Choose a scale that avoids too many symbols while keeping accuracy manageable.',
  hintLevel2: '450/50 = 9 symbols, which is readable. Very small scales create clutter.',
  correctAnswerExplanation: '(A) 1 symbol = 50 gives at most 9 symbols for 450, which is clear and practical.',
  incorrectOptionFeedback: {
    '1 symbol = 1': 'That would require hundreds of symbols and is impractical.',
    '1 symbol = 3': 'This still creates too many symbols for large values.',
    '1 symbol = 7': 'This scale causes awkward fractional symbols for many values and poor readability.'
  },
  questionTags: ['pictograph', 'scale-selection', 'graph-design'],
  remedialBrief: 'Correct: choose a practical scale such as 50 for data in hundreds.',
  remedialDetail: 'A good scale balances readability and precision, usually keeping symbol count moderate.',
  remedialContent: {
    coreConcept: {
      title: 'Choosing a Scale',
      points: [
        'Too small a scale creates clutter.',
        'Too large a scale may force excessive fractions.',
        'Aim for manageable symbol counts in the largest category.'
      ]
    },
    stepByStep: {
      title: 'Scale Check',
      steps: [
        'Estimate max symbols = max value / scale.',
        'Keep max symbols around 6-10.',
        'Pick the cleanest practical scale.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['1 symbol = 50', '1 symbol = 1', '1 symbol = 3', '1 symbol = 7'],
    '1 symbol = 50'
  )
};

export const inline_2_1_3_0_4 = {
  id: 'inline_2_1_3_0_4',
  text: 'A pictograph has key 1 symbol = 10. Rows show A: 4 symbols, B: 2.5 symbols, C: 3 symbols. What is total value?',
  options: ['95', '90', '85', '100'],
  correctAnswer: '95',
  format: GameFormat.RAINDROP,
  hint: 'Convert each row first, then add all values.',
  hintLevel1: 'Convert each row first, then add all values.',
  hintLevel2: 'A=40, B=25, C=30. Then total = 40+25+30.',
  correctAnswerExplanation: '(A) 95. Converted values are 40, 25, and 30.',
  incorrectOptionFeedback: {
    '90': 'You likely rounded 2.5 symbols to 2 symbols.',
    '85': 'You may have miscalculated one row conversion.',
    '100': 'You likely treated 2.5 as 3 full symbols.'
  },
  questionTags: ['pictograph', 'totaling', 'fractional-symbols'],
  remedialBrief: 'Correct total is 95 after proper row-wise conversion.',
  remedialDetail: 'Always convert symbol counts into actual values before making totals/comparisons.',
  remedialContent: {
    coreConcept: {
      title: 'Convert Then Compare',
      points: [
        'Symbol counts are not final values until key is applied.',
        'Fractional symbols must be multiplied correctly.',
        'Total is sum of converted row values.'
      ]
    },
    stepByStep: {
      title: 'Row Conversion',
      steps: [
        'A: 4 × 10 = 40.',
        'B: 2.5 × 10 = 25.',
        'C: 3 × 10 = 30.',
        'Total: 95.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['95', '90', '85', '100'], '95')
};

export const inline_2_1_3_0_5 = {
  id: 'inline_2_1_3_0_5',
  text: 'For very precise values like 487, 493, and 501, which graph is usually better than a pictograph?',
  options: ['Bar graph', 'Line with no scale', 'Random sketch', 'Pie chart without labels'],
  correctAnswer: 'Bar graph',
  format: GameFormat.RAINDROP,
  hint: 'Think about precision and readability with many fractional symbols.',
  hintLevel1: 'Think about precision and readability with many fractional symbols.',
  hintLevel2: 'Pictographs can become messy with fine-grained values; bars show exact heights clearly.',
  correctAnswerExplanation: '(A) Bar graph. It handles precise and uneven values more cleanly than pictographs.',
  incorrectOptionFeedback: {
    'Line with no scale': 'A graph without scale cannot communicate exact quantities.',
    'Random sketch': 'Unstructured visuals are not valid data representations.',
    'Pie chart without labels': 'Without labels/percentages, interpretation is ambiguous and less suitable here.'
  },
  questionTags: ['graph-selection', 'pictograph-limits', 'bar-graph'],
  remedialBrief: 'Correct: bar graphs are better for precise non-multiple values.',
  remedialDetail: 'Pictographs are intuitive, but precision-heavy data is often clearer in bar graphs.',
  remedialContent: {
    coreConcept: {
      title: 'When to Prefer Bar Graphs',
      points: [
        'Bar graphs represent exact values without symbolic rounding.',
        'They avoid excessive fractional symbols.',
        'They scale better for detailed comparisons.'
      ]
    },
    stepByStep: {
      title: 'Graph Choice Logic',
      steps: [
        'Check if data has awkward/non-multiple values.',
        'Assess whether pictograph would require many fractions.',
        'If yes, use bar graph.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Bar graph', 'Line with no scale', 'Random sketch', 'Pie chart without labels'],
    'Bar graph'
  )
};

export const inline_2_1_3_0_6 = {
  id: 'inline_2_1_3_0_6',
  text: 'True or False: If two pictographs use different keys, you can compare symbol counts directly without conversion.',
  options: ['True', 'False'],
  correctAnswer: 'False',
  format: GameFormat.RAINDROP,
  hint: 'Different keys mean each symbol has a different numeric value.',
  hintLevel1: 'Different keys mean each symbol has a different numeric value.',
  hintLevel2: 'Convert each symbol count using its own key before comparing.',
  correctAnswerExplanation: '(B) False. Direct icon count comparison is invalid when keys differ.',
  incorrectOptionFeedback: {
    'True': 'You must first convert each pictograph into actual values using its own key.'
  },
  questionTags: ['pictograph', 'comparison', 'scale-awareness'],
  remedialBrief: 'Correct: key mismatch requires value conversion before comparison.',
  remedialDetail: 'Symbol count alone has meaning only under a known key.',
  remedialContent: {
    coreConcept: {
      title: 'Key Consistency',
      points: [
        'Same symbol count can represent different values under different keys.',
        'Never compare across pictographs without scale normalization.',
        'Convert first, then compare.'
      ]
    },
    stepByStep: {
      title: 'Safe Comparison',
      steps: [
        'Read each key.',
        'Compute actual values for each row.',
        'Compare computed numbers.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'False')
};

// TOPIC 4

export const inline_2_1_4_0 = {
  id: 'inline_2_1_4_0',
  text: 'In a double bar graph for 2023 enrolment, Boys = 250 and Girls = 240. How many more boys are enrolled?',
  options: ['10', '20', '5', '490'],
  correctAnswer: '10',
  format: GameFormat.RAINDROP,
  hint: 'Difference means subtraction between the two bars in the same category.',
  hintLevel1: 'Difference means subtraction between the two bars in the same category.',
  hintLevel2: 'Compute 250 - 240.',
  correctAnswerExplanation: '(A) 10. The within-category difference is 250 - 240 = 10.',
  incorrectOptionFeedback: {
    '20': 'Recheck subtraction; the bars differ by 10, not 20.',
    '5': 'You may have estimated visually instead of using exact values.',
    '490': 'That is the sum, not the difference.'
  },
  questionTags: ['double-bar-graph', 'comparison', 'difference'],
  remedialBrief: 'Correct answer: (A) 10.',
  remedialDetail: 'In double bar graphs, compare paired bars category-wise using subtraction for gap.',
  remedialContent: {
    coreConcept: {
      title: 'Category-Wise Comparison',
      points: [
        'Double bar graphs compare two groups per category.',
        'Use subtraction to find gap.',
        'Do not mix values across different categories.'
      ]
    },
    stepByStep: {
      title: 'Compute Gap',
      steps: [
        'Read both group values for the same year/category.',
        'Subtract smaller from larger.',
        'State the difference with context.'
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    ['10', '20', '5', '490'],
    '10',
    {
      kind: 'double-bar',
      rows: [{ category: '2023', boys: 250, girls: 240 }],
      legend: { seriesA: 'Boys', seriesB: 'Girls' }
    }
  )
};

export const inline_2_1_4_0_1 = {
  id: 'inline_2_1_4_0_1',
  text: 'In a standard vertical bar graph, what does the Y-axis usually represent?',
  options: ['Numerical values/frequencies', 'Category names only', 'Graph title', 'Legend colors'],
  correctAnswer: 'Numerical values/frequencies',
  format: GameFormat.RAINDROP,
  hint: 'Think about where bar heights are measured against scale marks.',
  hintLevel1: 'Think about where bar heights are measured against scale marks.',
  hintLevel2: 'The vertical axis holds the numeric scale used to read bar heights.',
  correctAnswerExplanation: '(A) Y-axis represents numeric values (counts, scores, etc.).',
  incorrectOptionFeedback: {
    'Category names only': 'Categories are usually placed on the X-axis in vertical bar graphs.',
    'Graph title': 'Title is separate text, not an axis role.',
    'Legend colors': 'Legend explains series, not axis values.'
  },
  questionTags: ['bar-graph', 'axis-labeling'],
  remedialBrief: 'Correct: Y-axis carries the numeric scale.',
  remedialDetail: 'Bar height must be read against numerical ticks on the Y-axis.',
  remedialContent: {
    coreConcept: {
      title: 'Axis Roles',
      points: [
        'X-axis: categories or intervals.',
        'Y-axis: numerical values/frequencies.',
        'Clear labeling prevents misreading.'
      ]
    },
    stepByStep: {
      title: 'Read a Bar Graph',
      steps: [
        'Locate category on X-axis.',
        'Move up to bar top.',
        'Read corresponding value on Y-axis.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Numerical values/frequencies', 'Category names only', 'Graph title', 'Legend colors'],
    'Numerical values/frequencies'
  )
};

export const inline_2_1_4_0_2 = {
  id: 'inline_2_1_4_0_2',
  text: 'Year-wise enrolment: 2019=420, 2020=380, 2021=450, 2022=510, 2023=490. Which year has the highest enrolment?',
  options: ['2022', '2023', '2021', '2019'],
  correctAnswer: '2022',
  format: GameFormat.RAINDROP,
  hint: 'Identify the maximum value in the list.',
  hintLevel1: 'Identify the maximum value in the list.',
  hintLevel2: 'Compare all values and select the largest number (510).',
  correctAnswerExplanation: '(A) 2022, with enrolment of 510.',
  incorrectOptionFeedback: {
    '2023': '2023 is high (490), but still less than 510.',
    '2021': '2021 is 450, not the highest.',
    '2019': '2019 is 420, significantly below the maximum.'
  },
  questionTags: ['bar-graph', 'peak-identification', 'trend'],
  remedialBrief: 'Correct: 2022 is the peak year.',
  remedialDetail: 'Peak value in a time-series bar graph corresponds to the tallest bar.',
  remedialContent: {
    coreConcept: {
      title: 'Highest Value Detection',
      points: [
        'Scan for maximum frequency/value.',
        'Map it to corresponding category/time.',
        'Peak helps identify strongest period.'
      ]
    },
    stepByStep: {
      title: 'Peak Scan',
      steps: [
        'List values in order.',
        'Find largest value.',
        'Return matching year/category.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['2022', '2023', '2021', '2019'], '2022')
};

export const inline_2_1_4_0_3 = {
  id: 'inline_2_1_4_0_3',
  text: 'From 2019 to 2020 enrolment changed from 420 to 380. This is a:',
  options: ['Decrease of 40', 'Increase of 40', 'Decrease of 20', 'No change'],
  correctAnswer: 'Decrease of 40',
  format: GameFormat.RAINDROP,
  hint: 'When later value is smaller, the change is a decrease.',
  hintLevel1: 'When later value is smaller, the change is a decrease.',
  hintLevel2: 'Compute difference: 420 - 380 = 40.',
  correctAnswerExplanation: '(A) Decrease of 40 because value dropped from 420 to 380.',
  incorrectOptionFeedback: {
    'Increase of 40': 'Direction is wrong. 380 is less than 420.',
    'Decrease of 20': 'Magnitude is wrong; the actual gap is 40.',
    'No change': 'Values are clearly different.'
  },
  questionTags: ['bar-graph', 'change-analysis', 'increase-decrease'],
  remedialBrief: 'Correct: decrease by 40.',
  remedialDetail: 'For time comparison, change = new - old. Negative result indicates decrease.',
  remedialContent: {
    coreConcept: {
      title: 'Change Over Time',
      points: [
        'Compare same metric across two points.',
        'Sign indicates direction of change.',
        'Magnitude indicates size of change.'
      ]
    },
    stepByStep: {
      title: 'Change Formula',
      steps: [
        'Old = 420, New = 380.',
        'New - Old = -40.',
        'Interpret as decrease of 40.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Decrease of 40', 'Increase of 40', 'Decrease of 20', 'No change'],
    'Decrease of 40'
  )
};

export const inline_2_1_4_0_4 = {
  id: 'inline_2_1_4_0_4',
  text: 'When is a double bar graph most useful?',
  options: [
    'When comparing two related groups across the same categories',
    'When showing only one value',
    'When no categories exist',
    'When all values are exactly equal'
  ],
  correctAnswer: 'When comparing two related groups across the same categories',
  format: GameFormat.RAINDROP,
  hint: 'Double bars imply two series that must be compared side by side.',
  hintLevel1: 'Double bars imply two series that must be compared side by side.',
  hintLevel2: 'Examples: boys vs girls, online vs offline, year-on-year for two groups.',
  correctAnswerExplanation: '(A) A double bar graph is designed for side-by-side comparison of two groups.',
  incorrectOptionFeedback: {
    'When showing only one value': 'A single value does not need a graph with paired bars.',
    'When no categories exist': 'Graphs require categories or intervals on an axis.',
    'When all values are exactly equal': 'While possible, equality is not the reason to choose this graph type.'
  },
  questionTags: ['double-bar-graph', 'graph-selection'],
  remedialBrief: 'Correct: use double bar for two-group category comparison.',
  remedialDetail: 'It helps compare groups within each category and track both trends at once.',
  remedialContent: {
    coreConcept: {
      title: 'Use Case of Double Bar Graph',
      points: [
        'Two datasets, same categories.',
        'Paired bars support direct comparison.',
        'Legend distinguishes the two groups.'
      ]
    },
    stepByStep: {
      title: 'Selection Checklist',
      steps: [
        'Do you have exactly two groups?',
        'Are categories shared across both groups?',
        'If yes, use double bar graph.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      'When comparing two related groups across the same categories',
      'When showing only one value',
      'When no categories exist',
      'When all values are exactly equal'
    ],
    'When comparing two related groups across the same categories'
  )
};

export const inline_2_1_4_0_5 = {
  id: 'inline_2_1_4_0_5',
  text: 'A student draws bars starting from 50 instead of 0 to make differences look bigger. This is:',
  options: ['Misleading scaling', 'Best practice', 'Required for all bar graphs', 'A legend issue only'],
  correctAnswer: 'Misleading scaling',
  format: GameFormat.RAINDROP,
  hint: 'Bar lengths should reflect true proportion from a consistent baseline.',
  hintLevel1: 'Bar lengths should reflect true proportion from a consistent baseline.',
  hintLevel2: 'Starting above zero exaggerates visual gaps and can distort interpretation.',
  correctAnswerExplanation: '(A) Misleading scaling. Non-zero baseline can visually exaggerate differences.',
  incorrectOptionFeedback: {
    'Best practice': 'Standard bar graph interpretation expects a zero baseline.',
    'Required for all bar graphs': 'This is not required and often discouraged.',
    'A legend issue only': 'Legend is unrelated; this is an axis-scale distortion.'
  },
  questionTags: ['graph-interpretation', 'misleading-graphs', 'scale'],
  remedialBrief: 'Correct: non-zero baseline can mislead viewers.',
  remedialDetail: 'Graph ethics requires scales that preserve proportional visual meaning.',
  remedialContent: {
    coreConcept: {
      title: 'Scale Integrity',
      points: [
        'Axis scale choice affects visual perception.',
        'Bar graphs generally should start at zero.',
        'Manipulated baselines can distort conclusions.'
      ]
    },
    stepByStep: {
      title: 'Detect Distortion',
      steps: [
        'Check Y-axis start value.',
        'Compare visual impression vs numeric difference.',
        'Flag graph if exaggeration exists.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Misleading scaling', 'Best practice', 'Required for all bar graphs', 'A legend issue only'],
    'Misleading scaling'
  )
};

export const inline_2_1_4_0_6 = {
  id: 'inline_2_1_4_0_6',
  text: 'True or False: In a properly drawn bar graph, all bars should have equal width and equal spacing.',
  options: ['True', 'False'],
  correctAnswer: 'True',
  format: GameFormat.RAINDROP,
  hint: 'Uniform visual design ensures fair comparison.',
  hintLevel1: 'Uniform visual design ensures fair comparison.',
  hintLevel2: 'Changing width or spacing can create false visual emphasis.',
  correctAnswerExplanation: '(A) True. Equal width and spacing improve readability and fairness.',
  incorrectOptionFeedback: {
    'False': 'Unequal widths/spaces can mislead and reduce comparability.'
  },
  questionTags: ['bar-graph', 'visual-standards'],
  remedialBrief: 'Correct: visual consistency is essential.',
  remedialDetail: 'Equal width and spacing avoid unintentional bias in graph reading.',
  remedialContent: {
    coreConcept: {
      title: 'Graph Construction Quality',
      points: [
        'Consistency supports accurate comparison.',
        'Irregular bar widths can imply false weight.',
        'Good graph design is part of data literacy.'
      ]
    },
    stepByStep: {
      title: 'Construction Check',
      steps: [
        'Use a single bar width setting.',
        'Maintain equal gaps.',
        'Verify scale labels are clear.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'True')
};

// TOPIC 5

export const inline_2_1_5_0 = {
  id: 'inline_2_1_5_0',
  text: 'A student scores 55, 62, 58, 70, 75 in five tests. Which statement best describes the overall trend?',
  options: [
    'Overall increasing with one temporary dip',
    'Overall decreasing steadily',
    'Completely constant',
    'Always alternating up and down equally'
  ],
  correctAnswer: 'Overall increasing with one temporary dip',
  format: GameFormat.RAINDROP,
  hint: 'Compare first score to last score, then check middle behavior.',
  hintLevel1: 'Compare first score to last score, then check middle behavior.',
  hintLevel2: 'It rises overall from 55 to 75, but drops once from 62 to 58.',
  correctAnswerExplanation: '(A) The pattern is generally upward, with a dip at Test 3.',
  incorrectOptionFeedback: {
    'Overall decreasing steadily': 'The final score is much higher than the first.',
    'Completely constant': 'Scores clearly change across tests.',
    'Always alternating up and down equally': 'There is not a strict equal alternation pattern.'
  },
  questionTags: ['graph-interpretation', 'trend-analysis', 'assessment-data'],
  remedialBrief: 'Correct: overall improvement with one dip.',
  remedialDetail: 'Trend interpretation looks at the full sequence, not a single pair of points.',
  remedialContent: {
    coreConcept: {
      title: 'Trend Reading',
      points: [
        'Trend describes general direction over time.',
        'Local dips can occur inside an upward trend.',
        'Use first-to-last and intermediate checks together.'
      ]
    },
    stepByStep: {
      title: 'Interpret Sequence',
      steps: [
        'Read all values in order.',
        'Compare start and end values.',
        'Note any anomalies (temporary drops/spikes).'
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      'Overall increasing with one temporary dip',
      'Overall decreasing steadily',
      'Completely constant',
      'Always alternating up and down equally'
    ],
    'Overall increasing with one temporary dip',
    {
      kind: 'score-trend',
      points: [55, 62, 58, 70, 75],
      labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5']
    }
  )
};

export const inline_2_1_5_0_1 = {
  id: 'inline_2_1_5_0_1',
  text: 'From scores 55, 62, 58, 70, 75, which test has the highest score?',
  options: ['Test 5', 'Test 2', 'Test 3', 'Test 1'],
  correctAnswer: 'Test 5',
  format: GameFormat.RAINDROP,
  hint: 'Find the maximum value in the sequence.',
  hintLevel1: 'Find the maximum value in the sequence.',
  hintLevel2: 'The highest number is 75, corresponding to Test 5.',
  correctAnswerExplanation: '(A) Test 5 has the highest score: 75.',
  incorrectOptionFeedback: {
    'Test 2': 'Test 2 is 62, not the maximum.',
    'Test 3': 'Test 3 is 58, below several other scores.',
    'Test 1': 'Test 1 is the starting value (55), not the highest.'
  },
  questionTags: ['graph-reading', 'maximum-value'],
  remedialBrief: 'Correct: Test 5 is highest.',
  remedialDetail: 'Highest point/peak corresponds to maximum value in a graph or table.',
  remedialContent: {
    coreConcept: {
      title: 'Peak Identification',
      points: [
        'Peak equals largest value.',
        'Peak can occur at beginning, middle, or end.',
        'Always compare all points, not just neighbors.'
      ]
    },
    stepByStep: {
      title: 'Find the Peak',
      steps: [
        'List all values.',
        'Select maximum value.',
        'Map to test/category label.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['Test 5', 'Test 2', 'Test 3', 'Test 1'], 'Test 5')
};

export const inline_2_1_5_0_2 = {
  id: 'inline_2_1_5_0_2',
  text: 'How much did the score improve from Test 3 (58) to Test 5 (75)?',
  options: ['17', '13', '15', '12'],
  correctAnswer: '17',
  format: GameFormat.RAINDROP,
  hint: 'Improvement = later score - earlier score.',
  hintLevel1: 'Improvement = later score - earlier score.',
  hintLevel2: 'Compute 75 - 58.',
  correctAnswerExplanation: '(A) 17 points of improvement.',
  incorrectOptionFeedback: {
    '13': 'Check subtraction carefully: 75 - 58 is larger.',
    '15': 'This is a common arithmetic slip. Recalculate accurately.',
    '12': 'You may have compared wrong tests.'
  },
  questionTags: ['difference', 'trend-analysis', 'score-comparison'],
  remedialBrief: 'Correct: improvement is 17.',
  remedialDetail: 'Comparative graph interpretation often requires exact subtraction across selected points.',
  remedialContent: {
    coreConcept: {
      title: 'Point-to-Point Change',
      points: [
        'Choose correct start and end points.',
        'Use subtraction in the correct direction.',
        'Positive difference indicates improvement.'
      ]
    },
    stepByStep: {
      title: 'Compute Improvement',
      steps: [
        'Identify values: 58 and 75.',
        'Subtract: 75 - 58.',
        'Result: 17.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['17', '13', '15', '12'], '17')
};

export const inline_2_1_5_0_3 = {
  id: 'inline_2_1_5_0_3',
  text: 'Which point in the sequence 55, 62, 58, 70, 75 is an anomaly relative to the rising trend?',
  options: ['Test 3 (58)', 'Test 5 (75)', 'Test 2 (62)', 'Test 1 (55)'],
  correctAnswer: 'Test 3 (58)',
  format: GameFormat.RAINDROP,
  hint: 'An anomaly is a point that temporarily breaks the expected direction.',
  hintLevel1: 'An anomaly is a point that temporarily breaks the expected direction.',
  hintLevel2: 'Scores rise from Test 1 to 2, then dip at Test 3 before rising again.',
  correctAnswerExplanation: '(A) Test 3 is the temporary dip against an otherwise upward path.',
  incorrectOptionFeedback: {
    'Test 5 (75)': 'This is the trend peak, not an anomaly.',
    'Test 2 (62)': 'This point supports the early rise.',
    'Test 1 (55)': 'This is the baseline start, not an outlier behavior.'
  },
  questionTags: ['anomaly-detection', 'trend-interpretation'],
  remedialBrief: 'Correct: Test 3 is the anomaly (dip).',
  remedialDetail: 'An anomaly is identified relative to surrounding trend behavior.',
  remedialContent: {
    coreConcept: {
      title: 'Anomaly in Time Series',
      points: [
        'An anomaly departs from the local pattern.',
        'Temporary dips/spikes are common anomalies.',
        'Context matters when labeling anomalies.'
      ]
    },
    stepByStep: {
      title: 'Locate Anomaly',
      steps: [
        'Determine general trend.',
        'Find points that oppose nearby direction.',
        'Confirm if pattern resumes after that point.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Test 3 (58)', 'Test 5 (75)', 'Test 2 (62)', 'Test 1 (55)'],
    'Test 3 (58)'
  )
};

export const inline_2_1_5_0_4 = {
  id: 'inline_2_1_5_0_4',
  text: 'A bar graph starts Y-axis at 100 instead of 0, making small differences look huge. This is mainly a:',
  options: ['Misleading representation', 'Necessary requirement', 'Better accuracy method', 'Legend correction'],
  correctAnswer: 'Misleading representation',
  format: GameFormat.RAINDROP,
  hint: 'Check whether visual lengths remain proportional to true differences.',
  hintLevel1: 'Check whether visual lengths remain proportional to true differences.',
  hintLevel2: 'A truncated baseline can exaggerate differences to influence interpretation.',
  correctAnswerExplanation: '(A) Misleading representation due to distorted visual proportion.',
  incorrectOptionFeedback: {
    'Necessary requirement': 'Starting at non-zero is not generally required for bar graphs.',
    'Better accuracy method': 'It usually reduces interpretive accuracy for comparisons.',
    'Legend correction': 'Legends explain groups; this issue is about axis scaling.'
  },
  questionTags: ['critical-graph-reading', 'scale-distortion'],
  remedialBrief: 'Correct: axis truncation can mislead readers.',
  remedialDetail: 'Responsible interpretation requires checking axis ranges before conclusions.',
  remedialContent: {
    coreConcept: {
      title: 'Detecting Misleading Graphs',
      points: [
        'Always inspect axis start/end values.',
        'Visual impact can be manipulated by scale choices.',
        'Evaluate numbers, not only bar appearance.'
      ]
    },
    stepByStep: {
      title: 'Credibility Check',
      steps: [
        'Read axis limits first.',
        'Compare actual numeric differences.',
        'Judge if visual effect is exaggerated.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Misleading representation', 'Necessary requirement', 'Better accuracy method', 'Legend correction'],
    'Misleading representation'
  )
};

export const inline_2_1_5_0_5 = {
  id: 'inline_2_1_5_0_5',
  text: 'If scores moved 55 to 62 to 58 to 70 to 75, what is a reasonable prediction for Test 6?',
  options: ['Around 76-80 if improvement continues', 'Definitely below 50', 'Exactly 58', 'Cannot ever be estimated'],
  correctAnswer: 'Around 76-80 if improvement continues',
  format: GameFormat.RAINDROP,
  hint: 'Predictions from graphs are approximate and based on trend direction.',
  hintLevel1: 'Predictions from graphs are approximate and based on trend direction.',
  hintLevel2: 'After the dip, the sequence rises strongly; a slightly higher next value is plausible.',
  correctAnswerExplanation: '(A) A modest increase beyond 75 is a reasonable trend-based estimate.',
  incorrectOptionFeedback: {
    'Definitely below 50': 'This contradicts the recent upward trend.',
    'Exactly 58': 'Prediction should not copy an old anomaly point without reason.',
    'Cannot ever be estimated': 'Graphs support approximate inference, though not certainty.'
  },
  questionTags: ['inference', 'prediction', 'trend'],
  remedialBrief: 'Correct: trend-based prediction suggests a slightly higher next score.',
  remedialDetail: 'Inference is probabilistic, not exact; use direction and momentum in recent points.',
  remedialContent: {
    coreConcept: {
      title: 'Graph-Based Prediction',
      points: [
        'Predictions are estimates, not guarantees.',
        'Recent trend carries more predictive weight.',
        'Outliers should be considered but not overemphasized.'
      ]
    },
    stepByStep: {
      title: 'Make an Estimate',
      steps: [
        'Identify recent direction.',
        'Check if rise/fall is sustained.',
        'Propose a plausible range, not a fixed certainty.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Around 76-80 if improvement continues', 'Definitely below 50', 'Exactly 58', 'Cannot ever be estimated'],
    'Around 76-80 if improvement continues'
  )
};

export const inline_2_1_5_0_6 = {
  id: 'inline_2_1_5_0_6',
  text: 'True or False: To interpret a graph correctly, you should check title, axes labels, and scale before drawing conclusions.',
  options: ['True', 'False'],
  correctAnswer: 'True',
  format: GameFormat.RAINDROP,
  hint: 'Context and scale determine what graph values actually mean.',
  hintLevel1: 'Context and scale determine what graph values actually mean.',
  hintLevel2: 'Skipping labels/scale can lead to wrong comparisons or conclusions.',
  correctAnswerExplanation: '(A) True. Proper interpretation begins with context and scale checks.',
  incorrectOptionFeedback: {
    'False': 'Without title/axes/scale, visual reading can be incomplete or incorrect.'
  },
  questionTags: ['graph-literacy', 'interpretation-process'],
  remedialBrief: 'Correct: always read title, axes, and scale first.',
  remedialDetail: 'Accurate interpretation depends on understanding what and how quantities are represented.',
  remedialContent: {
    coreConcept: {
      title: 'Interpretation Protocol',
      points: [
        'Title gives context.',
        'Axes define variables.',
        'Scale calibrates comparisons.'
      ]
    },
    stepByStep: {
      title: 'Before You Conclude',
      steps: [
        'Read title and units.',
        'Check axis labels.',
        'Inspect scale, then compare values.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'True')
};

// TOPIC 6

export const inline_2_1_6_0 = {
  id: 'inline_2_1_6_0',
  text: 'Class 8B score groups are: Below 30 = 7, 30-39 = 11, 40 and above = 12 (total 30). What is the best first action for the teacher?',
  options: [
    'Plan focused support for the 7 students below 30 while continuing regular practice for others',
    'Ignore the data because most students passed',
    'Retest only the top 12 students',
    'Change all marks before analysis'
  ],
  correctAnswer: 'Plan focused support for the 7 students below 30 while continuing regular practice for others',
  format: GameFormat.RAINDROP,
  hint: 'Use data to target intervention where need is highest.',
  hintLevel1: 'Use data to target intervention where need is highest.',
  hintLevel2: 'The struggling subgroup is clearly identified as the Below 30 category.',
  correctAnswerExplanation: '(A) Data-guided teaching should prioritize students needing support while sustaining class-wide progress.',
  incorrectOptionFeedback: {
    'Ignore the data because most students passed': 'Ignoring minority needs defeats the purpose of data-driven decisions.',
    'Retest only the top 12 students': 'This does not address the group needing intervention.',
    'Change all marks before analysis': 'Data should be analyzed accurately, not altered.'
  },
  questionTags: ['data-detective', 'decision-making', 'intervention-planning'],
  remedialBrief: 'Correct: target support to below-30 group using evidence.',
  remedialDetail: 'Data analysis is useful when it drives actionable, fair, and focused instructional decisions.',
  remedialContent: {
    coreConcept: {
      title: 'Data to Action',
      points: [
        'Identify performance bands.',
        'Prioritize support for lowest-performing group.',
        'Maintain momentum for rest of class.'
      ]
    },
    stepByStep: {
      title: 'Teacher Action Plan',
      steps: [
        'Read grouped frequencies.',
        'Find highest-need segment.',
        'Design targeted remediation for that segment.'
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      'Plan focused support for the 7 students below 30 while continuing regular practice for others',
      'Ignore the data because most students passed',
      'Retest only the top 12 students',
      'Change all marks before analysis'
    ],
    'Plan focused support for the 7 students below 30 while continuing regular practice for others',
    {
      kind: 'grouped-performance',
      rows: [
        { band: 'Below 30', count: 7 },
        { band: '30-39', count: 11 },
        { band: '40+', count: 12 }
      ]
    }
  )
};

export const inline_2_1_6_0_1 = {
  id: 'inline_2_1_6_0_1',
  text: 'In the same class data (Below 30=7, 30-39=11, 40+=12; total=30), what percent scored 40 and above?',
  options: ['40%', '30%', '12%', '70%'],
  correctAnswer: '40%',
  format: GameFormat.RAINDROP,
  hint: 'Use percentage = (part/total) × 100.',
  hintLevel1: 'Use percentage = (part/total) × 100.',
  hintLevel2: 'Compute (12/30) × 100.',
  correctAnswerExplanation: '(A) 40%. Since 12/30 = 0.4, percentage is 40%.',
  incorrectOptionFeedback: {
    '30%': '30% would correspond to 9 out of 30, not 12.',
    '12%': '12 is a count, not percentage in this context.',
    '70%': '70% corresponds to 21 out of 30, which is not this category.'
  },
  questionTags: ['percentage', 'data-interpretation', 'class-performance'],
  remedialBrief: 'Correct: 40% scored 40+.',
  remedialDetail: 'Converting counts to percentages helps compare groups more fairly.',
  remedialContent: {
    coreConcept: {
      title: 'Count to Percentage',
      points: [
        'Percentage standardizes comparisons.',
        'Formula: (part/whole) × 100.',
        'Whole must be total observations.'
      ]
    },
    stepByStep: {
      title: 'Calculate 40+ Percentage',
      steps: [
        'Part = 12, Whole = 30.',
        '12/30 = 0.4.',
        '0.4 × 100 = 40%.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['40%', '30%', '12%', '70%'], '40%')
};

export const inline_2_1_6_0_2 = {
  id: 'inline_2_1_6_0_2',
  text: 'Using the same data, what percent scored below 30?',
  options: ['23.3%', '17.5%', '33.3%', '7%'],
  correctAnswer: '23.3%',
  format: GameFormat.RAINDROP,
  hint: 'Below 30 count is 7 out of total 30.',
  hintLevel1: 'Below 30 count is 7 out of total 30.',
  hintLevel2: '(7/30) × 100 ≈ 23.3%.',
  correctAnswerExplanation: '(A) About 23.3%.',
  incorrectOptionFeedback: {
    '17.5%': 'This does not match 7 out of 30.',
    '33.3%': 'One-third would be 10 out of 30, not 7.',
    '7%': 'You used raw count as percentage without dividing by total.'
  },
  questionTags: ['percentage', 'support-group-analysis'],
  remedialBrief: 'Correct: approximately 23.3% are in below-30 group.',
  remedialDetail: 'Small but important groups can be identified clearly through percentage analysis.',
  remedialContent: {
    coreConcept: {
      title: 'Support Group Share',
      points: [
        'Percent helps estimate intervention scale.',
        '7 out of 30 is less than one-fourth but significant.',
        'Use rounded values when needed.'
      ]
    },
    stepByStep: {
      title: 'Compute Below-30 Share',
      steps: [
        'Part = 7, total = 30.',
        'Divide: 7/30 = 0.2333...',
        'Convert to percent: 23.3%.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['23.3%', '17.5%', '33.3%', '7%'], '23.3%')
};

export const inline_2_1_6_0_3 = {
  id: 'inline_2_1_6_0_3',
  text: 'If the teacher can run one remedial batch first, which batch size should be chosen from this data?',
  options: ['7 students (Below 30 group)', '12 students (40+ group)', '11 students (30-39 group)', 'All 30 equally'],
  correctAnswer: '7 students (Below 30 group)',
  format: GameFormat.RAINDROP,
  hint: 'Remedial priority should target highest academic need.',
  hintLevel1: 'Remedial priority should target highest academic need.',
  hintLevel2: 'Below 30 indicates the most urgent learning support requirement.',
  correctAnswerExplanation: '(A) Start with the 7-student below-30 batch for focused support.',
  incorrectOptionFeedback: {
    '12 students (40+ group)': 'This group is already comparatively strong.',
    '11 students (30-39 group)': 'This group may need support later, but below-30 is higher priority.',
    'All 30 equally': 'A targeted first intervention is more efficient and evidence-based.'
  },
  questionTags: ['instructional-planning', 'data-driven-decisions'],
  remedialBrief: 'Correct: first remedial batch should be below-30 group (7 students).',
  remedialDetail: 'Prioritization is a key data-detective skill: act first where need is most critical.',
  remedialContent: {
    coreConcept: {
      title: 'Intervention Prioritization',
      points: [
        'Use data bands to assign priority.',
        'Most at-risk learners get first support cycle.',
        'Then move to next band as resources permit.'
      ]
    },
    stepByStep: {
      title: 'Pick First Batch',
      steps: [
        'Identify weakest band.',
        'Read that band frequency.',
        'Set first remedial batch to that size.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['7 students (Below 30 group)', '12 students (40+ group)', '11 students (30-39 group)', 'All 30 equally'],
    '7 students (Below 30 group)'
  )
};

export const inline_2_1_6_0_4 = {
  id: 'inline_2_1_6_0_4',
  text: 'For library borrowing by classes (Class 6 to Class 11), which graph is most suitable for comparing class-wise counts?',
  options: ['Bar graph', 'Histogram', 'Unlabeled pie chart', 'No graph needed ever'],
  correctAnswer: 'Bar graph',
  format: GameFormat.RAINDROP,
  hint: 'Classes are separate categories, not continuous intervals.',
  hintLevel1: 'Classes are separate categories, not continuous intervals.',
  hintLevel2: 'Categorical comparison across class labels is best shown with bars and gaps.',
  correctAnswerExplanation: '(A) Bar graph is correct for discrete class categories.',
  incorrectOptionFeedback: {
    'Histogram': 'Histograms are for continuous grouped intervals, not class labels.',
    'Unlabeled pie chart': 'Without labels, comparison clarity is poor.',
    'No graph needed ever': 'Graphs are useful for quick comparison and communication.'
  },
  questionTags: ['graph-selection', 'categorical-data'],
  remedialBrief: 'Correct: use bar graph for class-wise categorical data.',
  remedialDetail: 'Matching graph type to data type is essential for correct interpretation.',
  remedialContent: {
    coreConcept: {
      title: 'Category vs Interval Data',
      points: [
        'Class labels are categories.',
        'Bar graph compares category counts clearly.',
        'Histogram is inappropriate for non-continuous categories.'
      ]
    },
    stepByStep: {
      title: 'Graph Type Decision',
      steps: [
        'Check whether labels are categories or intervals.',
        'If categories: choose bar graph.',
        'Use clear axis labels for each class.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    ['Bar graph', 'Histogram', 'Unlabeled pie chart', 'No graph needed ever'],
    'Bar graph'
  )
};

export const inline_2_1_6_0_5 = {
  id: 'inline_2_1_6_0_5',
  text: 'Library data: Class 6=45, Class 7=38, Class 8=62, Class 9=29, Class 10=18, Class 11=52. Which class borrowed the least books?',
  options: ['Class 10', 'Class 9', 'Class 7', 'Class 6'],
  correctAnswer: 'Class 10',
  format: GameFormat.RAINDROP,
  hint: 'Find the smallest value in the list.',
  hintLevel1: 'Find the smallest value in the list.',
  hintLevel2: 'Minimum count is 18, corresponding to Class 10.',
  correctAnswerExplanation: '(A) Class 10, with 18 books.',
  incorrectOptionFeedback: {
    'Class 9': 'Class 9 has 29, which is larger than 18.',
    'Class 7': 'Class 7 has 38, not the minimum.',
    'Class 6': 'Class 6 has 45, much higher than minimum.'
  },
  questionTags: ['minimum-value', 'data-interpretation', 'class-activity'],
  remedialBrief: 'Correct: Class 10 borrowed the least.',
  remedialDetail: 'Identifying least/highest categories supports targeted recommendations.',
  remedialContent: {
    coreConcept: {
      title: 'Least Category Identification',
      points: [
        'Least borrowed = minimum frequency/value.',
        'Check all categories before conclusion.',
        'Use this for targeted improvement actions.'
      ]
    },
    stepByStep: {
      title: 'Find Minimum',
      steps: [
        'List class-wise values.',
        'Locate smallest numeric value.',
        'Map value to class label.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['Class 10', 'Class 9', 'Class 7', 'Class 6'], 'Class 10')
};

export const inline_2_1_6_0_6 = {
  id: 'inline_2_1_6_0_6',
  text: 'True or False: A data detective should alter original values to make graph patterns look cleaner.',
  options: ['True', 'False'],
  correctAnswer: 'False',
  format: GameFormat.RAINDROP,
  hint: 'Data integrity means preserving original observations.',
  hintLevel1: 'Data integrity means preserving original observations.',
  hintLevel2: 'We may organize and visualize data, but we must not manipulate underlying values.',
  correctAnswerExplanation: '(B) False. Ethical data handling requires preserving original data.',
  incorrectOptionFeedback: {
    'True': 'Changing values breaks validity and can lead to wrong decisions.'
  },
  questionTags: ['data-ethics', 'data-detective', 'integrity'],
  remedialBrief: 'Correct: do not alter original data.',
  remedialDetail: 'Organization is about arrangement and interpretation, not value manipulation.',
  remedialContent: {
    coreConcept: {
      title: 'Data Integrity Principle',
      points: [
        'Original values must remain unchanged.',
        'Only representation may change (tables, graphs).',
        'Reliable decisions depend on faithful data.'
      ]
    },
    stepByStep: {
      title: 'Ethical Workflow',
      steps: [
        'Collect values accurately.',
        'Organize and visualize without altering values.',
        'Draw conclusions based on true data.'
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(['True', 'False'], 'False')
};

export const inline_2_1_q1 = inline_2_1_1_0;
export const inline_2_1_q2 = inline_2_1_2_0;
export const inline_2_1_q3 = inline_2_1_3_0;
export const inline_2_1_q4 = inline_2_1_4_0;
export const inline_2_1_q5 = inline_2_1_5_0;
export const inline_2_1_q6 = inline_2_1_6_0;