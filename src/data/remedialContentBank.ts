export interface RemedialSection {
  heading: string;
  points: string[];
}

export interface RemedialContent {
  brief: string;
  details: RemedialSection[];
  referenceTags?: string[];
}

export const remedialContentBank: Record<string, RemedialContent> = {
  inline_2_1_q1: {
    brief: 'Cat is correct because frequency 10 is the highest value in the table.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Many learners choose Dog because it appears first in the row order.',
          'Most popular depends on the largest frequency, not row position.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Frequency means how many times a category appears.',
          'Most popular category = category with maximum frequency.',
          'Here frequencies are Dog=7, Cat=10, Fish=6, Rabbit=5, so Cat wins.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Read only the frequency column values.',
          'Find the largest number (10).',
          'Map 10 back to its category: Cat.',
        ],
      },
    ],
  },
  inline_2_1_q2: {
    brief: '4 full symbols and 1 half symbol with scale 50 gives 225 cars.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          '250 comes from counting the half symbol as full.',
          '200 comes from ignoring the half symbol completely.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Always read the key first in a pictograph.',
          'Half symbol means scale divided by 2.',
          'Scale 50 means half symbol equals 25.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          '4 full symbols: 4 x 50 = 200.',
          'Half symbol: 50 / 2 = 25.',
          'Total: 200 + 25 = 225.',
        ],
      },
    ],
  },
  inline_2_1_q3: {
    brief: 'Hindi decreased because it changed from 50 to 45, a change of -5.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Some learners compare who has the higher score instead of who decreased.',
          'Decrease means new value is lower than old value.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'In double bar graphs, compare each category across both bars.',
          'Change = New - Old.',
          'Negative change means decrease.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Maths: 70 - 30 = +40 (increased).',
          'Hindi: 45 - 50 = -5 (decreased).',
          'Only Hindi is a decrease.',
        ],
      },
    ],
  },
  inline_2_1_q4: {
    brief: 'Boys outperform girls in exactly 2 subjects: Science and Hindi.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Errors happen when one subject comparison is skipped.',
          'Close differences are often guessed by bar height instead of comparing values.',
        ],
      },
      {
        heading: 'Reliable Strategy',
        points: [
          'Make a scratch table: Subject | Boys | Girls.',
          'Compare row by row and mark who is higher.',
          'Count only boys wins in the end.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Maths: 40 < 55, girls win.',
          'Science: 60 > 50, boys win.',
          'English: 55 < 65, girls win.',
          'Hindi: 70 > 65, boys win.',
          'Art: 45 < 50, girls win.',
        ],
      },
    ],
  },
  inline_2_2_q1: {
    brief: 'Less than 20 includes two classes: 0-10 and 10-20, so total is 12.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Choosing 10 means only taking class 10-20.',
          'Less than 20 includes all values below 20, not a single class.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'For less than X, add all class frequencies with upper limit <= X.',
          'Here those classes are 0-10 and 10-20.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Take 0-10 frequency: 2.',
          'Take 10-20 frequency: 10.',
          'Add: 2 + 10 = 12.',
        ],
      },
    ],
  },
  inline_2_2_q2: {
    brief: 'The modal class is 820-830 because it has the highest frequency (9).',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Learners often stop at the first high bar without scanning all classes.',
          'Modal class requires the maximum frequency across entire table.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Modal class = class interval with highest frequency.',
          'In histogram terms, this corresponds to the tallest bar.',
        ],
      },
      {
        heading: 'Check',
        points: [
          'Frequencies are 6, 3, 9, 8, 2.',
          'Maximum is 9.',
          'So class 820-830 is the answer.',
        ],
      },
    ],
  },
  inline_2_2_q3: {
    brief: 'For 40 or more, add 40-50 and 50-60: 7 + 1 = 8 students.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Common error is stopping at 40-50 and forgetting later classes.',
          'Or more means include all classes to the right as well.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'X or more means classes from X onward until the final class.',
          'Always ask: is there another class on the right?',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          '40-50 frequency is 7.',
          '50-60 frequency is 1.',
          'Total is 8.',
        ],
      },
    ],
  },
  inline_2_2_q4: {
    brief: 'More than 5 hours gives 11 students out of 85, so the fraction is 11/85.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          '11/80 comes from incorrect total counting.',
          'Total must include all groups: 4+8+22+32+8+6+5 = 85.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Favorable outcomes are 6-hour and 7-hour groups only.',
          'Probability fraction is favorable over total.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Favorable: 6 + 5 = 11.',
          'Total: 85.',
          'Fraction: 11/85 (already simplest).',
        ],
      },
    ],
  },
  inline_2_3_q1: {
    brief: 'If 10% is 20 people, then total 100% is 200 people.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Some divide by 10% incorrectly or guess by doubling.',
          'Use unitary method directly for reverse percentage problems.',
        ],
      },
      {
        heading: 'Unitary Method',
        points: [
          'If X% = known value, then 1% = known value / X.',
          'Then 100% = (1%) x 100.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          '10% = 20.',
          '1% = 20 / 10 = 2.',
          '100% = 2 x 100 = 200.',
        ],
      },
    ],
  },
  inline_2_3_q2: {
    brief: 'Central angle for Rainy is 120 degrees.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Some learners guess angle from visual size instead of using formula.',
          'Always apply angle formula for certainty.',
        ],
      },
      {
        heading: 'Core Formula',
        points: [
          'Central angle = (value / total) x 360.',
          'When total is 360, value and angle are numerically equal.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Rainy value is 120 and total is 360.',
          'Angle = (120 / 360) x 360 = 120 degrees.',
        ],
      },
    ],
  },
  inline_2_3_q3: {
    brief: 'Maths marks are 135 because 90/360 of 540 equals 135.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Some treat angle itself as marks.',
          'Others use wrong total marks value in formula.',
        ],
      },
      {
        heading: 'Core Formula',
        points: [
          'Value = (angle / 360) x total.',
          'Use this when angle is given and value is required.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Angle fraction = 90 / 360 = 1/4.',
          'Value = (1/4) x 540 = 135.',
        ],
      },
    ],
  },
  inline_2_3_q4: {
    brief: 'If rent is 25% and equals Rs 5,000, total income is Rs 20,000.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Rs 15,000 comes from calculating only non-rent share.',
          'Question asks total income, not remaining income.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Reverse percentage should use unitary method.',
          'If 25% is known, compute 1% first.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          '25% = Rs 5,000.',
          '1% = 5000 / 25 = 200.',
          '100% = 200 x 100 = Rs 20,000.',
        ],
      },
    ],
  },
  inline_2_4_q1: {
    brief: 'P(Red) = 3/6 = 1/2 because 3 red balls out of 6 total are favorable.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Counting red as one category gives 1/6, which is incorrect.',
          'Count objects, not category names.',
        ],
      },
      {
        heading: 'Core Formula',
        points: [
          'P(event) = favorable outcomes / total outcomes.',
          'Favorable here means red balls count.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Red balls = 3.',
          'Total balls = 3+2+1 = 6.',
          'Probability = 3/6 = 1/2.',
        ],
      },
    ],
  },
  inline_2_4_q2: {
    brief: 'Prime outcomes on a die are 2, 3, and 5, so probability is 3/6 = 1/2.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'A common mistake is counting 1 as prime.',
          'Prime numbers have exactly two factors.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Die outcomes are 1 through 6.',
          'Prime faces among these are 2, 3, and 5 only.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Favorable count = 3.',
          'Total count = 6.',
          'P(prime) = 3/6 = 1/2.',
        ],
      },
    ],
  },
  inline_2_4_q3: {
    brief: 'Numbers greater than 6 are 7, 8, 9, 10, so probability is 4/10 = 2/5.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Including 6 leads to wrong count 5/10.',
          'Greater than 6 means strictly more than 6.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'For strict inequalities, list valid values explicitly.',
          'Do not include boundary value itself for > condition.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Sample space size = 10.',
          'Favorable values are 7, 8, 9, 10 (4 values).',
          'Probability = 4/10 = 2/5.',
        ],
      },
    ],
  },
  inline_2_4_q4: {
    brief: 'At least one Head appears in HH, HT, TH, so probability is 3/4.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Ignoring HH causes undercount.',
          'Two-coin sample space must include all four outcomes.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'List sample space systematically: HH, HT, TH, TT.',
          'At least one Head means one or two Heads.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Favorable outcomes: HH, HT, TH (3).',
          'Total outcomes: 4.',
          'Probability: 3/4.',
        ],
      },
    ],
  },
  inline_2_4_q5: {
    brief: 'Numbers satisfying >3 and <8 are 4, 5, 6, 7, so probability is 4/10 = 2/5.',
    details: [
      {
        heading: 'What Went Wrong',
        points: [
          'Some apply only one condition and miss intersection logic.',
          'AND means both conditions must be true together.',
        ],
      },
      {
        heading: 'Core Concept',
        points: [
          'Use intersection method: values common to both condition sets.',
          'Condition A: >3, Condition B: <8.',
        ],
      },
      {
        heading: 'Step-by-Step',
        points: [
          'Values >3: 4,5,6,7,8,9,10.',
          'Keep only those <8: 4,5,6,7.',
          'Count = 4 out of 10, so 4/10 = 2/5.',
        ],
      },
    ],
  },
};

const questionReferenceTagMap: Record<string, string[]> = {
  inline_2_1_q1: ['M2.1_FREQ_TABLE_HIGHEST_FREQUENCY', 'M2.1_TALLY_TO_FREQUENCY'],
  inline_2_1_q2: ['M2.1_PICTOGRAPH_SCALE', 'M2.1_PARTIAL_SYMBOLS'],
  inline_2_1_q3: ['M2.1_DOUBLE_BAR_CHANGE', 'M2.1_DECREASE_VS_HIGHER_SCORE'],
  inline_2_1_q4: ['M2.1_DOUBLE_BAR_COMPARE_CATEGORY_WISE'],

  inline_2_2_q1: ['M2.2_GROUPED_DATA_LESS_THAN'],
  inline_2_2_q2: ['M2.2_MODAL_CLASS_MAX_FREQUENCY'],
  inline_2_2_q3: ['M2.2_GROUPED_DATA_X_OR_MORE'],
  inline_2_2_q4: ['M2.2_GROUPED_DATA_FRACTION_FROM_TABLE', 'M2.2_SIMPLIFY_FRACTION'],

  inline_2_3_q1: ['M2.3_UNITARY_METHOD_FIND_TOTAL'],
  inline_2_3_q2: ['M2.3_CENTRAL_ANGLE_FORMULA'],
  inline_2_3_q3: ['M2.3_ANGLE_TO_VALUE_REVERSE'],
  inline_2_3_q4: ['M2.3_UNITARY_METHOD_PERCENT_TO_TOTAL'],

  inline_2_4_q1: ['M2.4_PROBABILITY_FORMULA_BAG'],
  inline_2_4_q2: ['M2.4_PRIME_ON_DIE'],
  inline_2_4_q3: ['M2.4_STRICT_INEQUALITY_PROBABILITY'],
  inline_2_4_q4: ['M2.4_TWO_COIN_SAMPLE_SPACE', 'M2.4_COMPLEMENT_RULE'],
  inline_2_4_q5: ['M2.4_AND_CONDITION_INTERSECTION'],
};

const inferReferenceTagsFromQuestionId = (questionId: string): string[] => {
  if (questionId.startsWith('inline_2_1_')) {
    return ['M2.1_DATA_ORGANISATION_AND_GRAPHS'];
  }
  if (questionId.startsWith('inline_2_2_')) {
    return ['M2.2_GROUPING_DATA_AND_HISTOGRAMS'];
  }
  if (questionId.startsWith('inline_2_3_')) {
    return ['M2.3_PIE_CHARTS_AND_CIRCLE_GRAPHS'];
  }
  if (questionId.startsWith('inline_2_4_')) {
    return ['M2.4_CHANCE_AND_PROBABILITY'];
  }
  if (questionId.startsWith('post_')) {
    return ['POST_TEST_RECAP_CONTENT'];
  }
  return ['GENERAL_REVIEW'];
};

export const getReferenceTagsForQuestion = (questionId: string): string[] => {
  const bankTags = remedialContentBank[questionId]?.referenceTags;
  if (bankTags && bankTags.length > 0) {
    return bankTags;
  }

  if (questionReferenceTagMap[questionId]) {
    return questionReferenceTagMap[questionId];
  }

  return inferReferenceTagsFromQuestionId(questionId);
};
