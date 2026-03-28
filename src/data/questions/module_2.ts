import { GameFormat } from '../../types';

const SUPPORTED_GAME_FORMATS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
  GameFormat.TALLY_TAP,
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

export const inline_2_2_1_0 = {
  id: "inline_2_2_1_0",
  text: "Marks are grouped into 10-20, 20-30, 30-40, and 40-50 using the lower-inclusive and upper-exclusive rule. Where should score 30 be placed?",
  options: [
    "10-20",
    "20-30",
    "30-40",
    "It belongs to both 20-30 and 30-40"
  ],
  correctAnswer: "30-40",
  format: GameFormat.RAINDROP,
  hint: "Check whether the upper limit of an interval is included or excluded.",
  hintLevel1: "Check whether the upper limit of an interval is included or excluded.",
  hintLevel2: "With [20,30), the value 30 is excluded and moves to the next interval.",
  correctAnswerExplanation: "(C) 30-40. Under the lower-inclusive, upper-exclusive convention, 30 does not belong to 20-30; it begins the 30-40 class.",
  incorrectOptionFeedback: {
    "10-20": "10-20 includes values from 10 up to but not including 20, so 30 cannot be there.",
    "20-30": "In grouped-data tables, 20-30 usually means [20,30), so 30 is excluded.",
    "It belongs to both 20-30 and 30-40": "A value must belong to exactly one class interval. The boundary rule prevents overlap."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data"
  ],
  remedialBrief: "Correct: 30-40.",
  remedialDetail: "Core idea: class intervals and grouped frequency tables.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Core Concept",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - How To Solve",
      steps: [
        "Choose equal-width class intervals that cover the full range.",
        "Place each value in exactly one interval using the boundary rule.",
        "Count frequencies and verify the total against original data size."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "10-20",
      "20-30",
      "30-40",
      "It belongs to both 20-30 and 30-40"
    ],
    "30-40",
    {
      kind: "class-interval-boundary",
      intervals: [
        "10-20",
        "20-30",
        "30-40",
        "40-50"
      ],
      targetValue: 30
    }
  )
};

export const inline_2_2_1_0_1 = {
  id: "inline_2_2_1_0_1",
  text: "Which statement best defines a class interval in grouped data?",
  options: [
    "A class interval is an equal-width value range used to group continuous numeric data.",
    "A class interval is the list of all raw data values in random order.",
    "A class interval is the title written above a graph.",
    "A class interval is the same as the frequency of one category."
  ],
  correctAnswer: "A class interval is an equal-width value range used to group continuous numeric data.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of class intervals and grouped frequency tables.",
  hintLevel1: "Focus on the exact meaning of class intervals and grouped frequency tables.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "A class interval is a value range, not a frequency, title, or raw-data list.",
  incorrectOptionFeedback: {
    "A class interval is the list of all raw data values in random order.": "Review the definition of class intervals and grouped frequency tables and match the option that states it most accurately.",
    "A class interval is the title written above a graph.": "Review the definition of class intervals and grouped frequency tables and match the option that states it most accurately.",
    "A class interval is the same as the frequency of one category.": "Review the definition of class intervals and grouped frequency tables and match the option that states it most accurately."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "definition-check"
  ],
  remedialBrief: "Correct: A class interval is an equal-width value range used to group continuous numeric data..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Definition Check",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "A class interval is an equal-width value range used to group continuous numeric data.",
      "A class interval is the list of all raw data values in random order.",
      "A class interval is the title written above a graph.",
      "A class interval is the same as the frequency of one category."
    ],
    "A class interval is an equal-width value range used to group continuous numeric data."
  )
};

export const inline_2_2_1_0_2 = {
  id: "inline_2_2_1_0_2",
  text: "A grouped frequency table has frequencies 7, 8, 8, and 7. What is the total number of observations?",
  options: [
    "22",
    "30",
    "28",
    "14"
  ],
  correctAnswer: "30",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Add all frequencies: 7 + 8 + 8 + 7 = 30 total observations.",
  incorrectOptionFeedback: {
    "14": "Use the provided values carefully and apply the relevant rule/formula for class intervals and grouped frequency tables.",
    "22": "Use the provided values carefully and apply the relevant rule/formula for class intervals and grouped frequency tables.",
    "28": "Use the provided values carefully and apply the relevant rule/formula for class intervals and grouped frequency tables."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 30.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Quantitative Check",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "22",
      "30",
      "28",
      "14"
    ],
    "30"
  )
};

export const inline_2_2_1_0_3 = {
  id: "inline_2_2_1_0_3",
  text: "A student says: \"The upper limit of every class interval is included, so 20 belongs to 10-20.\" Which response is most accurate?",
  options: [
    "Yes, every boundary value should be counted in both neighboring intervals.",
    "No. In the standard convention, lower limit is included and upper limit is excluded, so 20 belongs to 20-30.",
    "Yes, upper limits are always included because they appear in the interval label.",
    "Boundary values should be removed from grouped tables to avoid confusion."
  ],
  correctAnswer: "No. In the standard convention, lower limit is included and upper limit is excluded, so 20 belongs to 20-30.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with class intervals and grouped frequency tables.",
  correctAnswerExplanation: "Boundary consistency avoids overlap. Including upper limits would double-count shared boundaries.",
  incorrectOptionFeedback: {
    "Yes, every boundary value should be counted in both neighboring intervals.": "This response does not correctly address the misconception. Re-anchor to the rule for class intervals and grouped frequency tables.",
    "Yes, upper limits are always included because they appear in the interval label.": "This response does not correctly address the misconception. Re-anchor to the rule for class intervals and grouped frequency tables.",
    "Boundary values should be removed from grouped tables to avoid confusion.": "This response does not correctly address the misconception. Re-anchor to the rule for class intervals and grouped frequency tables."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. In the standard convention, lower limit is included and upper limit is excluded, so 20 belongs to 20-30..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Misconception Repair",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, every boundary value should be counted in both neighboring intervals.",
      "No. In the standard convention, lower limit is included and upper limit is excluded, so 20 belongs to 20-30.",
      "Yes, upper limits are always included because they appear in the interval label.",
      "Boundary values should be removed from grouped tables to avoid confusion."
    ],
    "No. In the standard convention, lower limit is included and upper limit is excluded, so 20 belongs to 20-30."
  )
};

export const inline_2_2_1_0_4 = {
  id: "inline_2_2_1_0_4",
  text: "You receive 60 raw marks and need to identify distribution patterns quickly. What should you do first?",
  options: [
    "Choose equal class intervals and create a grouped frequency table.",
    "Draw a pie chart immediately without grouping.",
    "Delete repeated values so the list becomes shorter.",
    "Sort only the top five scores and ignore the rest."
  ],
  correctAnswer: "Choose equal class intervals and create a grouped frequency table.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Grouping first organizes the full dataset and enables valid graphing and interpretation.",
  incorrectOptionFeedback: {
    "Draw a pie chart immediately without grouping.": "Choose the method that preserves the data type and question intent for class intervals and grouped frequency tables.",
    "Delete repeated values so the list becomes shorter.": "Choose the method that preserves the data type and question intent for class intervals and grouped frequency tables.",
    "Sort only the top five scores and ignore the rest.": "Choose the method that preserves the data type and question intent for class intervals and grouped frequency tables."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "method-selection"
  ],
  remedialBrief: "Best method: Choose equal class intervals and create a grouped frequency table..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Method Selection",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Choose equal class intervals and create a grouped frequency table.",
      "Draw a pie chart immediately without grouping.",
      "Delete repeated values so the list becomes shorter.",
      "Sort only the top five scores and ignore the rest."
    ],
    "Choose equal class intervals and create a grouped frequency table."
  )
};

export const inline_2_2_1_0_5 = {
  id: "inline_2_2_1_0_5",
  text: "For class intervals and grouped frequency tables, what should be done first?",
  options: [
    "Place each value in exactly one interval using the boundary rule.",
    "Choose equal-width class intervals that cover the full range.",
    "Count frequencies and verify the total against original data size.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Choose equal-width class intervals that cover the full range.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Choose equal-width class intervals that cover the full range.. After that, proceed with Place each value in exactly one interval using the boundary rule. and then Count frequencies and verify the total against original data size..",
  incorrectOptionFeedback: {
    "Place each value in exactly one interval using the boundary rule.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Count frequencies and verify the total against original data size.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Choose equal-width class intervals that cover the full range..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Process Order",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Ordered Workflow",
      steps: [
        "Choose equal-width class intervals that cover the full range.",
        "Place each value in exactly one interval using the boundary rule.",
        "Count frequencies and verify the total against original data size."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Place each value in exactly one interval using the boundary rule.",
      "Choose equal-width class intervals that cover the full range.",
      "Count frequencies and verify the total against original data size.",
      "Skip validation and finalize immediately"
    ],
    "Choose equal-width class intervals that cover the full range."
  )
};

export const inline_2_2_1_0_6 = {
  id: "inline_2_2_1_0_6",
  text: "True or False: After grouping data, the sum of frequencies must equal the number of original observations.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. If totals do not match, at least one value was missed or double-counted.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "grouped-data",
    "class-intervals",
    "frequency-table",
    "module-2",
    "topic-1",
    "class-intervals-grouping-large-data",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Class Intervals - Grouping Large Data - Rule Validation",
      points: [
        "Class intervals group large raw data into manageable ranges.",
        "Use equal class width for clear comparison.",
        "Apply lower-inclusive and upper-exclusive boundary rule consistently.",
        "Total frequency must match original data count."
      ]
    },
    stepByStep: {
      title: "Class Intervals - Grouping Large Data - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "True"
  )
};

// TOPIC 2

export const inline_2_2_2_0 = {
  id: "inline_2_2_2_0",
  text: "In a histogram for intervals 0-10, 10-20, 20-30, and 30-40, what should the bars look like?",
  options: [
    "Bars should touch each other because intervals are continuous.",
    "Bars should have equal gaps like category bar graphs.",
    "Only the tallest bar should be drawn for the modal class.",
    "Bars should be replaced by points connected with a line."
  ],
  correctAnswer: "Bars should touch each other because intervals are continuous.",
  format: GameFormat.RAINDROP,
  hint: "Think about whether intervals share boundaries on a number line.",
  hintLevel1: "Think about whether intervals share boundaries on a number line.",
  hintLevel2: "If one interval ends at 10 and the next starts at 10, there is no conceptual gap.",
  correctAnswerExplanation: "(A) Histogram bars touch because grouped intervals are contiguous ranges of a continuous variable.",
  incorrectOptionFeedback: {
    "Bars should have equal gaps like category bar graphs.": "Gaps are used for discrete categories, not continuous intervals.",
    "Only the tallest bar should be drawn for the modal class.": "A histogram represents all intervals, not just the mode.",
    "Bars should be replaced by points connected with a line.": "That would be a line graph, not a histogram."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-"
  ],
  remedialBrief: "Correct: Bars should touch each other because intervals are continuous..",
  remedialDetail: "Core idea: histogram structure and interpretation for grouped continuous data.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Core Concept",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - How To Solve",
      steps: [
        "Confirm that data is continuous and already grouped into intervals.",
        "Plot adjacent bars with heights equal to frequencies.",
        "Read distribution shape, modal class, and unusual tails."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Bars should touch each other because intervals are continuous.",
      "Bars should have equal gaps like category bar graphs.",
      "Only the tallest bar should be drawn for the modal class.",
      "Bars should be replaced by points connected with a line."
    ],
    "Bars should touch each other because intervals are continuous.",
    {
      kind: "histogram-layout",
      intervals: [
        "0-10",
        "10-20",
        "20-30",
        "30-40"
      ]
    }
  )
};

export const inline_2_2_2_0_1 = {
  id: "inline_2_2_2_0_1",
  text: "Which statement correctly distinguishes a histogram from a bar graph?",
  options: [
    "Histograms represent grouped continuous data with touching bars; bar graphs compare discrete categories with gaps.",
    "Histograms are only for percentages while bar graphs are only for counts.",
    "Histograms never use the y-axis.",
    "Bar graphs and histograms are identical and interchangeable in all cases."
  ],
  correctAnswer: "Histograms represent grouped continuous data with touching bars; bar graphs compare discrete categories with gaps.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of histogram structure and interpretation for grouped continuous data.",
  hintLevel1: "Focus on the exact meaning of histogram structure and interpretation for grouped continuous data.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Data type determines graph choice: continuous grouped ranges use histograms, categories use bar graphs.",
  incorrectOptionFeedback: {
    "Histograms are only for percentages while bar graphs are only for counts.": "Review the definition of histogram structure and interpretation for grouped continuous data and match the option that states it most accurately.",
    "Histograms never use the y-axis.": "Review the definition of histogram structure and interpretation for grouped continuous data and match the option that states it most accurately.",
    "Bar graphs and histograms are identical and interchangeable in all cases.": "Review the definition of histogram structure and interpretation for grouped continuous data and match the option that states it most accurately."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "definition-check"
  ],
  remedialBrief: "Correct: Histograms represent grouped continuous data with touching bars; bar graphs compare discrete categories with gaps..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Definition Check",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Histograms represent grouped continuous data with touching bars; bar graphs compare discrete categories with gaps.",
      "Histograms are only for percentages while bar graphs are only for counts.",
      "Histograms never use the y-axis.",
      "Bar graphs and histograms are identical and interchangeable in all cases."
    ],
    "Histograms represent grouped continuous data with touching bars; bar graphs compare discrete categories with gaps."
  )
};

export const inline_2_2_2_0_2 = {
  id: "inline_2_2_2_0_2",
  text: "Frequency table: 0-10: 3, 10-20: 7, 20-30: 9, 30-40: 5, 40-50: 1. Which is the modal class?",
  options: [
    "0-10",
    "10-20",
    "20-30",
    "40-50"
  ],
  correctAnswer: "20-30",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "The modal class has highest frequency. Here, 9 is highest, so 20-30 is modal class.",
  incorrectOptionFeedback: {
    "0-10": "Use the provided values carefully and apply the relevant rule/formula for histogram structure and interpretation for grouped continuous data.",
    "10-20": "Use the provided values carefully and apply the relevant rule/formula for histogram structure and interpretation for grouped continuous data.",
    "40-50": "Use the provided values carefully and apply the relevant rule/formula for histogram structure and interpretation for grouped continuous data."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 20-30.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Quantitative Check",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "0-10",
      "10-20",
      "20-30",
      "40-50"
    ],
    "20-30"
  )
};

export const inline_2_2_2_0_3 = {
  id: "inline_2_2_2_0_3",
  text: "A student says: \"A histogram is just a bar graph with bars pushed together, so data type does not matter.\" Which response is most accurate?",
  options: [
    "Yes, touching bars are only a design preference and do not carry meaning.",
    "No. Histogram choice depends on continuous grouped intervals, not visual style alone.",
    "Yes, any dataset can be turned into a histogram without checking type.",
    "Histograms should be used only when there are exactly five intervals."
  ],
  correctAnswer: "No. Histogram choice depends on continuous grouped intervals, not visual style alone.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with histogram structure and interpretation for grouped continuous data.",
  correctAnswerExplanation: "Histogram structure communicates continuous intervals. Ignoring data type can misrepresent conclusions.",
  incorrectOptionFeedback: {
    "Yes, touching bars are only a design preference and do not carry meaning.": "This response does not correctly address the misconception. Re-anchor to the rule for histogram structure and interpretation for grouped continuous data.",
    "Yes, any dataset can be turned into a histogram without checking type.": "This response does not correctly address the misconception. Re-anchor to the rule for histogram structure and interpretation for grouped continuous data.",
    "Histograms should be used only when there are exactly five intervals.": "This response does not correctly address the misconception. Re-anchor to the rule for histogram structure and interpretation for grouped continuous data."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Histogram choice depends on continuous grouped intervals, not visual style alone..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Misconception Repair",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, touching bars are only a design preference and do not carry meaning.",
      "No. Histogram choice depends on continuous grouped intervals, not visual style alone.",
      "Yes, any dataset can be turned into a histogram without checking type.",
      "Histograms should be used only when there are exactly five intervals."
    ],
    "No. Histogram choice depends on continuous grouped intervals, not visual style alone."
  )
};

export const inline_2_2_2_0_4 = {
  id: "inline_2_2_2_0_4",
  text: "You have student heights grouped into 140-150, 150-160, and 160-170 cm. Which graph is most appropriate?",
  options: [
    "Histogram",
    "Pie chart",
    "Pictograph with icons only",
    "Unordered list without graph"
  ],
  correctAnswer: "Histogram",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Grouped continuous ranges like height intervals are best represented by a histogram.",
  incorrectOptionFeedback: {
    "Pie chart": "Choose the method that preserves the data type and question intent for histogram structure and interpretation for grouped continuous data.",
    "Pictograph with icons only": "Choose the method that preserves the data type and question intent for histogram structure and interpretation for grouped continuous data.",
    "Unordered list without graph": "Choose the method that preserves the data type and question intent for histogram structure and interpretation for grouped continuous data."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "method-selection"
  ],
  remedialBrief: "Best method: Histogram.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Method Selection",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Histogram",
      "Pie chart",
      "Pictograph with icons only",
      "Unordered list without graph"
    ],
    "Histogram"
  )
};

export const inline_2_2_2_0_5 = {
  id: "inline_2_2_2_0_5",
  text: "For histogram structure and interpretation for grouped continuous data, what should be done first?",
  options: [
    "Plot adjacent bars with heights equal to frequencies.",
    "Confirm that data is continuous and already grouped into intervals.",
    "Read distribution shape, modal class, and unusual tails.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Confirm that data is continuous and already grouped into intervals.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Confirm that data is continuous and already grouped into intervals.. After that, proceed with Plot adjacent bars with heights equal to frequencies. and then Read distribution shape, modal class, and unusual tails..",
  incorrectOptionFeedback: {
    "Plot adjacent bars with heights equal to frequencies.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Read distribution shape, modal class, and unusual tails.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Confirm that data is continuous and already grouped into intervals..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Process Order",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Ordered Workflow",
      steps: [
        "Confirm that data is continuous and already grouped into intervals.",
        "Plot adjacent bars with heights equal to frequencies.",
        "Read distribution shape, modal class, and unusual tails."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Plot adjacent bars with heights equal to frequencies.",
      "Confirm that data is continuous and already grouped into intervals.",
      "Read distribution shape, modal class, and unusual tails.",
      "Skip validation and finalize immediately"
    ],
    "Confirm that data is continuous and already grouped into intervals."
  )
};

export const inline_2_2_2_0_6 = {
  id: "inline_2_2_2_0_6",
  text: "True or False: In a correctly drawn histogram, visible gaps between adjacent class-interval bars are expected.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "False",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "False. Gaps suggest discrete categories, while histogram intervals are adjacent and should touch.",
  incorrectOptionFeedback: {
    True: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "histogram",
    "continuous-data",
    "distribution-shape",
    "module-2",
    "topic-2",
    "what-is-a-histogram-",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: False.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Histogram? - Rule Validation",
      points: [
        "Histograms are used for grouped continuous numeric data.",
        "Bars touch because class intervals are adjacent ranges.",
        "X-axis is a number line of intervals; y-axis is frequency.",
        "Histogram shape reveals concentration and spread."
      ]
    },
    stepByStep: {
      title: "What Is a Histogram? - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "False"
  )
};

// TOPIC 3

export const inline_2_2_3_0 = {
  id: "inline_2_2_3_0",
  text: "Pulse rates range from 84 to 128 for 24 students. You want about 5 classes. Which bin size is most practical?",
  options: [
    "1",
    "2",
    "10",
    "25"
  ],
  correctAnswer: "10",
  format: GameFormat.RAINDROP,
  hint: "Use range divided by desired class count as a starting estimate.",
  hintLevel1: "Use range divided by desired class count as a starting estimate.",
  hintLevel2: "Range is 44. 44/5 is about 8.8, so choose a nearby convenient width.",
  correctAnswerExplanation: "(C) 10. A bin size near 9 to 10 gives about five classes and readable grouping.",
  incorrectOptionFeedback: {
    "1": "Bin size 1 creates too many bars and over-fragments the data.",
    "2": "Bin size 2 still produces too many classes for quick interpretation here.",
    "25": "Bin size 25 is too wide and hides meaningful variation."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size"
  ],
  remedialBrief: "Correct: 10.",
  remedialDetail: "Core idea: bin-size selection and its effect on histogram readability.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Core Concept",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - How To Solve",
      steps: [
        "Compute the data range (maximum minus minimum).",
        "Estimate a practical number of classes and choose bin width.",
        "Recheck whether the resulting histogram is interpretable."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "1",
      "2",
      "10",
      "25"
    ],
    "10",
    {
      kind: "bin-size-comparison",
      range: "84-128",
      suggestedBins: [
        "1",
        "2",
        "10",
        "25"
      ]
    }
  )
};

export const inline_2_2_3_0_1 = {
  id: "inline_2_2_3_0_1",
  text: "What is the main goal when choosing histogram bin size?",
  options: [
    "Balance detail and clarity so real patterns are visible.",
    "Always choose the smallest possible bin for precision.",
    "Always choose the largest possible bin for simplicity.",
    "Use random bin size so no pattern is obvious."
  ],
  correctAnswer: "Balance detail and clarity so real patterns are visible.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of bin-size selection and its effect on histogram readability.",
  hintLevel1: "Focus on the exact meaning of bin-size selection and its effect on histogram readability.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Good bin size reveals structure without introducing noise or masking key variation.",
  incorrectOptionFeedback: {
    "Always choose the smallest possible bin for precision.": "Review the definition of bin-size selection and its effect on histogram readability and match the option that states it most accurately.",
    "Always choose the largest possible bin for simplicity.": "Review the definition of bin-size selection and its effect on histogram readability and match the option that states it most accurately.",
    "Use random bin size so no pattern is obvious.": "Review the definition of bin-size selection and its effect on histogram readability and match the option that states it most accurately."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "definition-check"
  ],
  remedialBrief: "Correct: Balance detail and clarity so real patterns are visible..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Definition Check",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Balance detail and clarity so real patterns are visible.",
      "Always choose the smallest possible bin for precision.",
      "Always choose the largest possible bin for simplicity.",
      "Use random bin size so no pattern is obvious."
    ],
    "Balance detail and clarity so real patterns are visible."
  )
};

export const inline_2_2_3_0_2 = {
  id: "inline_2_2_3_0_2",
  text: "If range is 60 and you choose bin size 1, what is the biggest issue?",
  options: [
    "Too many narrow classes make interpretation noisy.",
    "Data cannot be plotted on a histogram.",
    "Total frequency will always become zero.",
    "Modal class cannot exist in this setup."
  ],
  correctAnswer: "Too many narrow classes make interpretation noisy.",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Extremely small bins create visual clutter and unstable shape interpretations.",
  incorrectOptionFeedback: {
    "Data cannot be plotted on a histogram.": "Use the provided values carefully and apply the relevant rule/formula for bin-size selection and its effect on histogram readability.",
    "Total frequency will always become zero.": "Use the provided values carefully and apply the relevant rule/formula for bin-size selection and its effect on histogram readability.",
    "Modal class cannot exist in this setup.": "Use the provided values carefully and apply the relevant rule/formula for bin-size selection and its effect on histogram readability."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Too many narrow classes make interpretation noisy..",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Quantitative Check",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Too many narrow classes make interpretation noisy.",
      "Data cannot be plotted on a histogram.",
      "Total frequency will always become zero.",
      "Modal class cannot exist in this setup."
    ],
    "Too many narrow classes make interpretation noisy."
  )
};

export const inline_2_2_3_0_3 = {
  id: "inline_2_2_3_0_3",
  text: "A student says: \"Smaller bins are always better because they are more accurate.\" Which response is most accurate?",
  options: [
    "Yes, smallest bin size is always mathematically best regardless of context.",
    "No. Very small bins can create noise and hide the broader distribution trend.",
    "Yes, bin size only changes color and not interpretation.",
    "Bin size can be ignored because frequency tables are unaffected."
  ],
  correctAnswer: "No. Very small bins can create noise and hide the broader distribution trend.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with bin-size selection and its effect on histogram readability.",
  correctAnswerExplanation: "Accuracy includes interpretability. Useful analysis needs a stable and readable pattern.",
  incorrectOptionFeedback: {
    "Yes, smallest bin size is always mathematically best regardless of context.": "This response does not correctly address the misconception. Re-anchor to the rule for bin-size selection and its effect on histogram readability.",
    "Yes, bin size only changes color and not interpretation.": "This response does not correctly address the misconception. Re-anchor to the rule for bin-size selection and its effect on histogram readability.",
    "Bin size can be ignored because frequency tables are unaffected.": "This response does not correctly address the misconception. Re-anchor to the rule for bin-size selection and its effect on histogram readability."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Very small bins can create noise and hide the broader distribution trend..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Misconception Repair",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, smallest bin size is always mathematically best regardless of context.",
      "No. Very small bins can create noise and hide the broader distribution trend.",
      "Yes, bin size only changes color and not interpretation.",
      "Bin size can be ignored because frequency tables are unaffected."
    ],
    "No. Very small bins can create noise and hide the broader distribution trend."
  )
};

export const inline_2_2_3_0_4 = {
  id: "inline_2_2_3_0_4",
  text: "Which process is best for selecting bin size in a new dataset?",
  options: [
    "Use range and target classes, then validate readability of the resulting histogram.",
    "Copy the previous worksheet bin size without checking range.",
    "Pick any odd number to avoid equal bars.",
    "Use one giant class interval to avoid calculation."
  ],
  correctAnswer: "Use range and target classes, then validate readability of the resulting histogram.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Range-informed bin choice with readability check gives consistent and defensible grouping.",
  incorrectOptionFeedback: {
    "Copy the previous worksheet bin size without checking range.": "Choose the method that preserves the data type and question intent for bin-size selection and its effect on histogram readability.",
    "Pick any odd number to avoid equal bars.": "Choose the method that preserves the data type and question intent for bin-size selection and its effect on histogram readability.",
    "Use one giant class interval to avoid calculation.": "Choose the method that preserves the data type and question intent for bin-size selection and its effect on histogram readability."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "method-selection"
  ],
  remedialBrief: "Best method: Use range and target classes, then validate readability of the resulting histogram..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Method Selection",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Use range and target classes, then validate readability of the resulting histogram.",
      "Copy the previous worksheet bin size without checking range.",
      "Pick any odd number to avoid equal bars.",
      "Use one giant class interval to avoid calculation."
    ],
    "Use range and target classes, then validate readability of the resulting histogram."
  )
};

export const inline_2_2_3_0_5 = {
  id: "inline_2_2_3_0_5",
  text: "For bin-size selection and its effect on histogram readability, what should be done first?",
  options: [
    "Estimate a practical number of classes and choose bin width.",
    "Compute the data range (maximum minus minimum).",
    "Recheck whether the resulting histogram is interpretable.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Compute the data range (maximum minus minimum).",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Compute the data range (maximum minus minimum).. After that, proceed with Estimate a practical number of classes and choose bin width. and then Recheck whether the resulting histogram is interpretable..",
  incorrectOptionFeedback: {
    "Estimate a practical number of classes and choose bin width.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Recheck whether the resulting histogram is interpretable.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Compute the data range (maximum minus minimum)..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Process Order",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Ordered Workflow",
      steps: [
        "Compute the data range (maximum minus minimum).",
        "Estimate a practical number of classes and choose bin width.",
        "Recheck whether the resulting histogram is interpretable."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Estimate a practical number of classes and choose bin width.",
      "Compute the data range (maximum minus minimum).",
      "Recheck whether the resulting histogram is interpretable.",
      "Skip validation and finalize immediately"
    ],
    "Compute the data range (maximum minus minimum)."
  )
};

export const inline_2_2_3_0_6 = {
  id: "inline_2_2_3_0_6",
  text: "True or False: Changing bin size can change the visible shape of a histogram and therefore interpretation.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Different bin widths can emphasize or hide local patterns and affect conclusions.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "bin-size",
    "range-analysis",
    "histogram-design",
    "module-2",
    "topic-3",
    "choosing-the-right-bin-size",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Choosing the Right Bin Size - Rule Validation",
      points: [
        "Bin size controls detail level in histogram view.",
        "Too small bins create noisy patterns; too large bins hide structure.",
        "Choose bin size using range and target interval count.",
        "Bin size should support interpretation, not distortion."
      ]
    },
    stepByStep: {
      title: "Choosing the Right Bin Size - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "True"
  )
};

// TOPIC 4

export const inline_2_2_4_0 = {
  id: "inline_2_2_4_0",
  text: "A survey lists favorite fruits: Mango 12, Apple 9, Banana 7, Orange 6. Which graph is most suitable?",
  options: [
    "Histogram",
    "Bar graph",
    "Line graph only",
    "Pie chart without labels"
  ],
  correctAnswer: "Bar graph",
  format: GameFormat.RAINDROP,
  hint: "Ask whether the x-axis values are separate categories or numeric intervals.",
  hintLevel1: "Ask whether the x-axis values are separate categories or numeric intervals.",
  hintLevel2: "Fruit names are discrete categories, so bars should have gaps.",
  correctAnswerExplanation: "(B) Bar graph. Fruit types are categories, not continuous numeric ranges.",
  incorrectOptionFeedback: {
    Histogram: "Histogram is for grouped continuous intervals like 10-20, 20-30, etc.",
    "Line graph only": "Line graphs are for trend over ordered time or sequence, not category comparison by default.",
    "Pie chart without labels": "An unlabeled pie chart weakens category-level comparison and precision."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs"
  ],
  remedialBrief: "Correct: Bar graph.",
  remedialDetail: "Core idea: graph selection based on data type.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Core Concept",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - How To Solve",
      steps: [
        "Classify the data as categorical or continuous grouped.",
        "Select bar graph for categories or histogram for grouped ranges.",
        "Check axis labels and spacing to confirm correct representation."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Histogram",
      "Bar graph",
      "Line graph only",
      "Pie chart without labels"
    ],
    "Bar graph",
    {
      kind: "graph-choice",
      dataType: "categorical"
    }
  )
};

export const inline_2_2_4_0_1 = {
  id: "inline_2_2_4_0_1",
  text: "When should you prefer a histogram over a bar graph?",
  options: [
    "When data is grouped into adjacent numeric intervals on a continuous scale.",
    "When data consists of named categories like sports teams.",
    "When there are exactly four categories and one legend.",
    "When values are written alphabetically."
  ],
  correctAnswer: "When data is grouped into adjacent numeric intervals on a continuous scale.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of graph selection based on data type.",
  hintLevel1: "Focus on the exact meaning of graph selection based on data type.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Histograms represent continuous grouped data, not discrete named categories.",
  incorrectOptionFeedback: {
    "When data consists of named categories like sports teams.": "Review the definition of graph selection based on data type and match the option that states it most accurately.",
    "When there are exactly four categories and one legend.": "Review the definition of graph selection based on data type and match the option that states it most accurately.",
    "When values are written alphabetically.": "Review the definition of graph selection based on data type and match the option that states it most accurately."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "definition-check"
  ],
  remedialBrief: "Correct: When data is grouped into adjacent numeric intervals on a continuous scale..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Definition Check",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "When data is grouped into adjacent numeric intervals on a continuous scale.",
      "When data consists of named categories like sports teams.",
      "When there are exactly four categories and one legend.",
      "When values are written alphabetically."
    ],
    "When data is grouped into adjacent numeric intervals on a continuous scale."
  )
};

export const inline_2_2_4_0_2 = {
  id: "inline_2_2_4_0_2",
  text: "Heights are grouped as 140-150, 150-160, 160-170 cm with frequencies. Which graph type is correct?",
  options: [
    "Histogram",
    "Bar graph with separated bars",
    "Pie chart",
    "Pictograph only"
  ],
  correctAnswer: "Histogram",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Grouped height ranges are continuous intervals, so histogram is the correct choice.",
  incorrectOptionFeedback: {
    "Bar graph with separated bars": "Use the provided values carefully and apply the relevant rule/formula for graph selection based on data type.",
    "Pie chart": "Use the provided values carefully and apply the relevant rule/formula for graph selection based on data type.",
    "Pictograph only": "Use the provided values carefully and apply the relevant rule/formula for graph selection based on data type."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Histogram.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Quantitative Check",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Histogram",
      "Bar graph with separated bars",
      "Pie chart",
      "Pictograph only"
    ],
    "Histogram"
  )
};

export const inline_2_2_4_0_3 = {
  id: "inline_2_2_4_0_3",
  text: "A student says: \"If bars touch, the graph is automatically correct even for category data.\" Which response is most accurate?",
  options: [
    "Yes, touching bars always improves every graph regardless of data type.",
    "No. Touching bars are meaningful only for continuous intervals, not for category labels.",
    "Yes, category names should be converted into touching bars for consistency.",
    "Graph spacing does not influence interpretation at all."
  ],
  correctAnswer: "No. Touching bars are meaningful only for continuous intervals, not for category labels.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with graph selection based on data type.",
  correctAnswerExplanation: "Spacing communicates structure. Category data should show separation between bars.",
  incorrectOptionFeedback: {
    "Yes, touching bars always improves every graph regardless of data type.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection based on data type.",
    "Yes, category names should be converted into touching bars for consistency.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection based on data type.",
    "Graph spacing does not influence interpretation at all.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection based on data type."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Touching bars are meaningful only for continuous intervals, not for category labels..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Misconception Repair",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, touching bars always improves every graph regardless of data type.",
      "No. Touching bars are meaningful only for continuous intervals, not for category labels.",
      "Yes, category names should be converted into touching bars for consistency.",
      "Graph spacing does not influence interpretation at all."
    ],
    "No. Touching bars are meaningful only for continuous intervals, not for category labels."
  )
};

export const inline_2_2_4_0_4 = {
  id: "inline_2_2_4_0_4",
  text: "You must compare monthly rainfall amounts (Jan-Dec). Which representation is most appropriate?",
  options: [
    "Bar graph with months as categories",
    "Histogram with touching bars by month name",
    "Pie chart without percentages",
    "No graph, only paragraph"
  ],
  correctAnswer: "Bar graph with months as categories",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Months are discrete time categories here, so bar graph supports clean comparison.",
  incorrectOptionFeedback: {
    "Histogram with touching bars by month name": "Choose the method that preserves the data type and question intent for graph selection based on data type.",
    "Pie chart without percentages": "Choose the method that preserves the data type and question intent for graph selection based on data type.",
    "No graph, only paragraph": "Choose the method that preserves the data type and question intent for graph selection based on data type."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "method-selection"
  ],
  remedialBrief: "Best method: Bar graph with months as categories.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Method Selection",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Bar graph with months as categories",
      "Histogram with touching bars by month name",
      "Pie chart without percentages",
      "No graph, only paragraph"
    ],
    "Bar graph with months as categories"
  )
};

export const inline_2_2_4_0_5 = {
  id: "inline_2_2_4_0_5",
  text: "For graph selection based on data type, what should be done first?",
  options: [
    "Select bar graph for categories or histogram for grouped ranges.",
    "Classify the data as categorical or continuous grouped.",
    "Check axis labels and spacing to confirm correct representation.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Classify the data as categorical or continuous grouped.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Classify the data as categorical or continuous grouped.. After that, proceed with Select bar graph for categories or histogram for grouped ranges. and then Check axis labels and spacing to confirm correct representation..",
  incorrectOptionFeedback: {
    "Select bar graph for categories or histogram for grouped ranges.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Check axis labels and spacing to confirm correct representation.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Classify the data as categorical or continuous grouped..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Process Order",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Ordered Workflow",
      steps: [
        "Classify the data as categorical or continuous grouped.",
        "Select bar graph for categories or histogram for grouped ranges.",
        "Check axis labels and spacing to confirm correct representation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Select bar graph for categories or histogram for grouped ranges.",
      "Classify the data as categorical or continuous grouped.",
      "Check axis labels and spacing to confirm correct representation.",
      "Skip validation and finalize immediately"
    ],
    "Classify the data as categorical or continuous grouped."
  )
};

export const inline_2_2_4_0_6 = {
  id: "inline_2_2_4_0_6",
  text: "True or False: Bar graphs typically have gaps because categories are separate and non-continuous.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Gaps in bar graphs indicate distinct categories rather than adjacent numeric intervals.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "graph-selection",
    "bar-graph",
    "histogram",
    "module-2",
    "topic-4",
    "histograms-vs-bar-graphs",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Histograms vs Bar Graphs - Rule Validation",
      points: [
        "Choose graph type based on variable type and question.",
        "Bar graphs compare discrete categories.",
        "Histograms summarize grouped continuous ranges.",
        "Wrong graph choice can produce wrong interpretation."
      ]
    },
    stepByStep: {
      title: "Histograms vs Bar Graphs - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "True"
  )
};

// TOPIC 5

export const inline_2_2_5_0 = {
  id: "inline_2_2_5_0",
  text: "Sleep-hour frequencies for 30 students are: 5-6:4, 6-7:7, 7-8:9, 8-9:6, 9-10:4. What is the modal class?",
  options: [
    "5-6",
    "6-7",
    "7-8",
    "9-10"
  ],
  correctAnswer: "7-8",
  format: GameFormat.RAINDROP,
  hint: "Modal class is the interval with highest frequency.",
  hintLevel1: "Modal class is the interval with highest frequency.",
  hintLevel2: "Compare all frequencies: 4, 7, 9, 6, 4.",
  correctAnswerExplanation: "(C) 7-8 because frequency 9 is the highest among all classes.",
  incorrectOptionFeedback: {
    "5-6": "Frequency 4 is not the highest.",
    "6-7": "Frequency 7 is high, but still below 9.",
    "9-10": "Frequency 4 is tied for low, not modal."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project"
  ],
  remedialBrief: "Correct: 7-8.",
  remedialDetail: "Core idea: end-to-end grouped-data interpretation for decision making.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Core Concept",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - How To Solve",
      steps: [
        "Build a clean grouped frequency table and histogram.",
        "Extract key metrics such as modal class and percentages.",
        "Translate findings into one actionable recommendation."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "5-6",
      "6-7",
      "7-8",
      "9-10"
    ],
    "7-8",
    {
      kind: "frequency-table",
      rows: [
        {
          interval: "5-6",
          frequency: 4
        },
        {
          interval: "6-7",
          frequency: 7
        },
        {
          interval: "7-8",
          frequency: 9
        },
        {
          interval: "8-9",
          frequency: 6
        },
        {
          interval: "9-10",
          frequency: 4
        }
      ]
    }
  )
};

export const inline_2_2_5_0_1 = {
  id: "inline_2_2_5_0_1",
  text: "In a real analysis project, what does the modal class represent?",
  options: [
    "The class interval that occurs most frequently in the dataset.",
    "The class interval with the widest width.",
    "The class interval drawn last in the graph.",
    "The class interval with zero frequency only."
  ],
  correctAnswer: "The class interval that occurs most frequently in the dataset.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of end-to-end grouped-data interpretation for decision making.",
  hintLevel1: "Focus on the exact meaning of end-to-end grouped-data interpretation for decision making.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Mode in grouped data is identified by maximum frequency, not interval width or order.",
  incorrectOptionFeedback: {
    "The class interval with the widest width.": "Review the definition of end-to-end grouped-data interpretation for decision making and match the option that states it most accurately.",
    "The class interval drawn last in the graph.": "Review the definition of end-to-end grouped-data interpretation for decision making and match the option that states it most accurately.",
    "The class interval with zero frequency only.": "Review the definition of end-to-end grouped-data interpretation for decision making and match the option that states it most accurately."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "definition-check"
  ],
  remedialBrief: "Correct: The class interval that occurs most frequently in the dataset..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Definition Check",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "The class interval that occurs most frequently in the dataset.",
      "The class interval with the widest width.",
      "The class interval drawn last in the graph.",
      "The class interval with zero frequency only."
    ],
    "The class interval that occurs most frequently in the dataset."
  )
};

export const inline_2_2_5_0_2 = {
  id: "inline_2_2_5_0_2",
  text: "Using the same sleep data, what percent of students sleep less than 7 hours?",
  options: [
    "36.7%",
    "23.3%",
    "63.3%",
    "70%"
  ],
  correctAnswer: "36.7%",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Less than 7 hours = 4 + 7 = 11 students. 11/30 x 100 = 36.7% (approx).",
  incorrectOptionFeedback: {
    "23.3%": "Use the provided values carefully and apply the relevant rule/formula for end-to-end grouped-data interpretation for decision making.",
    "63.3%": "Use the provided values carefully and apply the relevant rule/formula for end-to-end grouped-data interpretation for decision making.",
    "70%": "Use the provided values carefully and apply the relevant rule/formula for end-to-end grouped-data interpretation for decision making."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 36.7%.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Quantitative Check",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "36.7%",
      "23.3%",
      "63.3%",
      "70%"
    ],
    "36.7%"
  )
};

export const inline_2_2_5_0_3 = {
  id: "inline_2_2_5_0_3",
  text: "A student says: \"The tallest bar only means it was drawn first; it does not indicate anything about data concentration.\" Which response is most accurate?",
  options: [
    "Yes, bar height in histograms is decorative and not tied to frequency.",
    "No. The tallest bar indicates the highest frequency and therefore strongest concentration in that interval.",
    "Tall bars should be ignored because only interval labels matter.",
    "Tall bars indicate larger class width, not larger count."
  ],
  correctAnswer: "No. The tallest bar indicates the highest frequency and therefore strongest concentration in that interval.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with end-to-end grouped-data interpretation for decision making.",
  correctAnswerExplanation: "Histogram bar height encodes frequency (for equal-width classes), so it directly supports interpretation.",
  incorrectOptionFeedback: {
    "Yes, bar height in histograms is decorative and not tied to frequency.": "This response does not correctly address the misconception. Re-anchor to the rule for end-to-end grouped-data interpretation for decision making.",
    "Tall bars should be ignored because only interval labels matter.": "This response does not correctly address the misconception. Re-anchor to the rule for end-to-end grouped-data interpretation for decision making.",
    "Tall bars indicate larger class width, not larger count.": "This response does not correctly address the misconception. Re-anchor to the rule for end-to-end grouped-data interpretation for decision making."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. The tallest bar indicates the highest frequency and therefore strongest concentration in that interval..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Misconception Repair",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, bar height in histograms is decorative and not tied to frequency.",
      "No. The tallest bar indicates the highest frequency and therefore strongest concentration in that interval.",
      "Tall bars should be ignored because only interval labels matter.",
      "Tall bars indicate larger class width, not larger count."
    ],
    "No. The tallest bar indicates the highest frequency and therefore strongest concentration in that interval."
  )
};

export const inline_2_2_5_0_4 = {
  id: "inline_2_2_5_0_4",
  text: "After identifying that 36.7% sleep less than 7 hours, what is the best next step?",
  options: [
    "Recommend targeted support such as sleep-habit awareness for the low-sleep group.",
    "Delete the low-sleep values so the class average improves.",
    "Avoid sharing the analysis because results are uneven.",
    "Claim all students are healthy without additional reasoning."
  ],
  correctAnswer: "Recommend targeted support such as sleep-habit awareness for the low-sleep group.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "A valid analysis should lead to a specific, data-backed action.",
  incorrectOptionFeedback: {
    "Delete the low-sleep values so the class average improves.": "Choose the method that preserves the data type and question intent for end-to-end grouped-data interpretation for decision making.",
    "Avoid sharing the analysis because results are uneven.": "Choose the method that preserves the data type and question intent for end-to-end grouped-data interpretation for decision making.",
    "Claim all students are healthy without additional reasoning.": "Choose the method that preserves the data type and question intent for end-to-end grouped-data interpretation for decision making."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "method-selection"
  ],
  remedialBrief: "Best method: Recommend targeted support such as sleep-habit awareness for the low-sleep group..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Method Selection",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Recommend targeted support such as sleep-habit awareness for the low-sleep group.",
      "Delete the low-sleep values so the class average improves.",
      "Avoid sharing the analysis because results are uneven.",
      "Claim all students are healthy without additional reasoning."
    ],
    "Recommend targeted support such as sleep-habit awareness for the low-sleep group."
  )
};

export const inline_2_2_5_0_5 = {
  id: "inline_2_2_5_0_5",
  text: "For end-to-end grouped-data interpretation for decision making, what should be done first?",
  options: [
    "Extract key metrics such as modal class and percentages.",
    "Build a clean grouped frequency table and histogram.",
    "Translate findings into one actionable recommendation.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Build a clean grouped frequency table and histogram.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Build a clean grouped frequency table and histogram.. After that, proceed with Extract key metrics such as modal class and percentages. and then Translate findings into one actionable recommendation..",
  incorrectOptionFeedback: {
    "Extract key metrics such as modal class and percentages.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Translate findings into one actionable recommendation.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Build a clean grouped frequency table and histogram..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Process Order",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Ordered Workflow",
      steps: [
        "Build a clean grouped frequency table and histogram.",
        "Extract key metrics such as modal class and percentages.",
        "Translate findings into one actionable recommendation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Extract key metrics such as modal class and percentages.",
      "Build a clean grouped frequency table and histogram.",
      "Translate findings into one actionable recommendation.",
      "Skip validation and finalize immediately"
    ],
    "Build a clean grouped frequency table and histogram."
  )
};

export const inline_2_2_5_0_6 = {
  id: "inline_2_2_5_0_6",
  text: "True or False: A complete data project should end with an evidence-backed recommendation, not just a graph.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Interpretation and action are key outcomes of meaningful data analysis.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "data-analysis",
    "interpretation",
    "decision-making",
    "module-2",
    "topic-5",
    "real-data-analysis-project",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Real Data Analysis Project - Rule Validation",
      points: [
        "Real analysis includes grouping, graphing, and interpretation.",
        "Modal class identifies most common interval.",
        "Percent-based reasoning supports actionable conclusions.",
        "Recommendations should be evidence-linked and specific."
      ]
    },
    stepByStep: {
      title: "Real Data Analysis Project - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "True"
  )
};

// TOPIC 6

export const inline_2_2_6_0 = {
  id: "inline_2_2_6_0",
  text: "Before presenting a grouped-data report, which checkpoint is most important?",
  options: [
    "Verify frequencies, labels, and scale consistency against original data.",
    "Increase one frequency so the graph looks balanced.",
    "Hide class intervals that have low frequency.",
    "Remove axis labels to make the chart cleaner."
  ],
  correctAnswer: "Verify frequencies, labels, and scale consistency against original data.",
  format: GameFormat.RAINDROP,
  hint: "A report is only reliable when representation matches source data.",
  hintLevel1: "A report is only reliable when representation matches source data.",
  hintLevel2: "Think accuracy first: totals, class labels, and scale must all be correct.",
  correctAnswerExplanation: "(A) Validation is essential before communication; otherwise conclusions may be invalid.",
  incorrectOptionFeedback: {
    "Increase one frequency so the graph looks balanced.": "Changing values breaks data integrity and invalidates analysis.",
    "Hide class intervals that have low frequency.": "Low-frequency intervals can be important and must not be hidden.",
    "Remove axis labels to make the chart cleaner.": "Without labels, interpretation becomes ambiguous and unreliable."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up"
  ],
  remedialBrief: "Correct: Verify frequencies, labels, and scale consistency against original data..",
  remedialDetail: "Core idea: verification and communication in grouped-data reporting.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Core Concept",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - How To Solve",
      steps: [
        "Verify totals, boundaries, and axis labels.",
        "Summarize key findings in clear mathematical language.",
        "State one justified recommendation based on evidence."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Verify frequencies, labels, and scale consistency against original data.",
      "Increase one frequency so the graph looks balanced.",
      "Hide class intervals that have low frequency.",
      "Remove axis labels to make the chart cleaner."
    ],
    "Verify frequencies, labels, and scale consistency against original data.",
    {
      kind: "final-checklist",
      items: [
        "total-frequency-check",
        "axis-label-check",
        "scale-check",
        "boundary-rule-check"
      ]
    }
  )
};

export const inline_2_2_6_0_1 = {
  id: "inline_2_2_6_0_1",
  text: "What does a strong wrap-up statement include?",
  options: [
    "A concise summary of pattern, evidence, and one justified action.",
    "Only decorative comments about graph color and shape.",
    "Only the highest value, without context or method.",
    "No conclusion, because graphs speak completely on their own."
  ],
  correctAnswer: "A concise summary of pattern, evidence, and one justified action.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of verification and communication in grouped-data reporting.",
  hintLevel1: "Focus on the exact meaning of verification and communication in grouped-data reporting.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Good communication links observed pattern to evidence and a practical recommendation.",
  incorrectOptionFeedback: {
    "Only decorative comments about graph color and shape.": "Review the definition of verification and communication in grouped-data reporting and match the option that states it most accurately.",
    "Only the highest value, without context or method.": "Review the definition of verification and communication in grouped-data reporting and match the option that states it most accurately.",
    "No conclusion, because graphs speak completely on their own.": "Review the definition of verification and communication in grouped-data reporting and match the option that states it most accurately."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "definition-check"
  ],
  remedialBrief: "Correct: A concise summary of pattern, evidence, and one justified action..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Definition Check",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Definition Strategy",
      steps: [
        "Read all options fully.",
        "Discard options that change key terms.",
        "Select the precise mathematical statement."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "A concise summary of pattern, evidence, and one justified action.",
      "Only decorative comments about graph color and shape.",
      "Only the highest value, without context or method.",
      "No conclusion, because graphs speak completely on their own."
    ],
    "A concise summary of pattern, evidence, and one justified action."
  )
};

export const inline_2_2_6_0_2 = {
  id: "inline_2_2_6_0_2",
  text: "A grouped table was built from 30 observations, but frequency sum is 29. What should be done?",
  options: [
    "Recount class placements and boundary handling to find the missing value.",
    "Ignore the mismatch because one-value error is acceptable.",
    "Round all frequencies up so total becomes 30.",
    "Delete one interval to remove inconsistency."
  ],
  correctAnswer: "Recount class placements and boundary handling to find the missing value.",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "A mismatch means procedural error. Rechecking assignment and counting is mandatory.",
  incorrectOptionFeedback: {
    "Ignore the mismatch because one-value error is acceptable.": "Use the provided values carefully and apply the relevant rule/formula for verification and communication in grouped-data reporting.",
    "Round all frequencies up so total becomes 30.": "Use the provided values carefully and apply the relevant rule/formula for verification and communication in grouped-data reporting.",
    "Delete one interval to remove inconsistency.": "Use the provided values carefully and apply the relevant rule/formula for verification and communication in grouped-data reporting."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Recount class placements and boundary handling to find the missing value..",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Quantitative Check",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Quant Strategy",
      steps: [
        "Identify known values.",
        "Apply the right rule/formula.",
        "Validate the result against context."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Recount class placements and boundary handling to find the missing value.",
      "Ignore the mismatch because one-value error is acceptable.",
      "Round all frequencies up so total becomes 30.",
      "Delete one interval to remove inconsistency."
    ],
    "Recount class placements and boundary handling to find the missing value."
  )
};

export const inline_2_2_6_0_3 = {
  id: "inline_2_2_6_0_3",
  text: "A student says: \"If the graph looks neat, small counting mismatches do not matter.\" Which response is most accurate?",
  options: [
    "Yes, visual clarity is more important than arithmetic accuracy.",
    "No. Visual neatness cannot replace numerical correctness; totals must match exactly.",
    "Yes, mismatch is acceptable when bars are proportional.",
    "Neat formatting automatically guarantees correct data interpretation."
  ],
  correctAnswer: "No. Visual neatness cannot replace numerical correctness; totals must match exactly.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with verification and communication in grouped-data reporting.",
  correctAnswerExplanation: "Mathematical validity depends on correct values, not visual appearance.",
  incorrectOptionFeedback: {
    "Yes, visual clarity is more important than arithmetic accuracy.": "This response does not correctly address the misconception. Re-anchor to the rule for verification and communication in grouped-data reporting.",
    "Yes, mismatch is acceptable when bars are proportional.": "This response does not correctly address the misconception. Re-anchor to the rule for verification and communication in grouped-data reporting.",
    "Neat formatting automatically guarantees correct data interpretation.": "This response does not correctly address the misconception. Re-anchor to the rule for verification and communication in grouped-data reporting."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Visual neatness cannot replace numerical correctness; totals must match exactly..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Misconception Repair",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Error Correction Flow",
      steps: [
        "Identify the faulty assumption.",
        "State the correct rule clearly.",
        "Apply it to the given situation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Yes, visual clarity is more important than arithmetic accuracy.",
      "No. Visual neatness cannot replace numerical correctness; totals must match exactly.",
      "Yes, mismatch is acceptable when bars are proportional.",
      "Neat formatting automatically guarantees correct data interpretation."
    ],
    "No. Visual neatness cannot replace numerical correctness; totals must match exactly."
  )
};

export const inline_2_2_6_0_4 = {
  id: "inline_2_2_6_0_4",
  text: "Which final statement best reflects a valid grouped-data conclusion?",
  options: [
    "Most values cluster in middle intervals; support should target low-frequency extreme groups where needed.",
    "Since one bar is tallest, all other intervals are irrelevant.",
    "Because the graph has five bars, the data is certainly normal.",
    "No interpretation is possible from grouped data."
  ],
  correctAnswer: "Most values cluster in middle intervals; support should target low-frequency extreme groups where needed.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "This statement uses pattern evidence and translates it into actionable planning.",
  incorrectOptionFeedback: {
    "Since one bar is tallest, all other intervals are irrelevant.": "Choose the method that preserves the data type and question intent for verification and communication in grouped-data reporting.",
    "Because the graph has five bars, the data is certainly normal.": "Choose the method that preserves the data type and question intent for verification and communication in grouped-data reporting.",
    "No interpretation is possible from grouped data.": "Choose the method that preserves the data type and question intent for verification and communication in grouped-data reporting."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "method-selection"
  ],
  remedialBrief: "Best method: Most values cluster in middle intervals; support should target low-frequency extreme groups where needed..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Method Selection",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Method Decision Steps",
      steps: [
        "Classify the data/task.",
        "Choose the mathematically valid method.",
        "Execute and verify output."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Most values cluster in middle intervals; support should target low-frequency extreme groups where needed.",
      "Since one bar is tallest, all other intervals are irrelevant.",
      "Because the graph has five bars, the data is certainly normal.",
      "No interpretation is possible from grouped data."
    ],
    "Most values cluster in middle intervals; support should target low-frequency extreme groups where needed."
  )
};

export const inline_2_2_6_0_5 = {
  id: "inline_2_2_6_0_5",
  text: "For verification and communication in grouped-data reporting, what should be done first?",
  options: [
    "Summarize key findings in clear mathematical language.",
    "Verify totals, boundaries, and axis labels.",
    "State one justified recommendation based on evidence.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Verify totals, boundaries, and axis labels.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Verify totals, boundaries, and axis labels.. After that, proceed with Summarize key findings in clear mathematical language. and then State one justified recommendation based on evidence..",
  incorrectOptionFeedback: {
    "Summarize key findings in clear mathematical language.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "State one justified recommendation based on evidence.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Verify totals, boundaries, and axis labels..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Process Order",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Ordered Workflow",
      steps: [
        "Verify totals, boundaries, and axis labels.",
        "Summarize key findings in clear mathematical language.",
        "State one justified recommendation based on evidence."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Summarize key findings in clear mathematical language.",
      "Verify totals, boundaries, and axis labels.",
      "State one justified recommendation based on evidence.",
      "Skip validation and finalize immediately"
    ],
    "Verify totals, boundaries, and axis labels."
  )
};

export const inline_2_2_6_0_6 = {
  id: "inline_2_2_6_0_6",
  text: "True or False: It is acceptable to alter original values slightly if that makes the final histogram easier to explain.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "False",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "False. Data integrity is non-negotiable; representation may change, underlying values may not.",
  incorrectOptionFeedback: {
    True: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "wrap-up",
    "verification",
    "communication",
    "module-2",
    "topic-6",
    "module-2-2-wrap-up",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: False.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Module 2.2 Wrap Up - Rule Validation",
      points: [
        "Final review checks totals, labels, scales, and graph type.",
        "Clear communication includes method and conclusion.",
        "Verification prevents avoidable interpretation errors.",
        "Ethical reporting preserves original data integrity."
      ]
    },
    stepByStep: {
      title: "Module 2.2 Wrap Up - Validation Steps",
      steps: [
        "Recall the governing rule.",
        "Test the statement against that rule.",
        "Decide true/false with justification."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "True",
      "False"
    ],
    "False"
  )
};

export const inline_2_2_q1 = inline_2_2_1_0;
export const inline_2_2_q2 = inline_2_2_2_0;
export const inline_2_2_q3 = inline_2_2_3_0;
export const inline_2_2_q4 = inline_2_2_4_0;
export const inline_2_2_q5 = inline_2_2_5_0;
export const inline_2_2_q6 = inline_2_2_6_0;

// Compatibility aliases for existing module files that still import inline_2_1_q* names.
export const inline_2_1_q1 = inline_2_2_q1;
export const inline_2_1_q2 = inline_2_2_q2;
export const inline_2_1_q3 = inline_2_2_q3;
export const inline_2_1_q4 = inline_2_2_q4;
export const inline_2_1_q5 = inline_2_2_q5;
export const inline_2_1_q6 = inline_2_2_q6;
