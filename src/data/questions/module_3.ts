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

export const inline_2_3_1_0 = {
  id: "inline_2_3_1_0",
  text: "In a pie chart, one category is exactly 50% of the whole. What should its sector angle be?",
  options: [
    "90 degrees",
    "120 degrees",
    "180 degrees",
    "240 degrees"
  ],
  correctAnswer: "180 degrees",
  format: GameFormat.RAINDROP,
  hint: "Half of a full circle means half of 360 degrees.",
  hintLevel1: "Half of a full circle means half of 360 degrees.",
  hintLevel2: "Compute 50/100 x 360.",
  correctAnswerExplanation: "(C) 180 degrees. A 50% share is one-half of a circle, so the angle is 180 degrees.",
  incorrectOptionFeedback: {
    "90 degrees": "90 degrees is one-quarter of the circle (25%), not half.",
    "120 degrees": "120 degrees corresponds to one-third (about 33.3%), not 50%.",
    "240 degrees": "240 degrees is two-thirds of the circle (about 66.7%), larger than 50%."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-"
  ],
  remedialBrief: "Correct: 180 degrees.",
  remedialDetail: "Core idea: pie-chart representation of parts of a whole.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Core Concept",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - How To Solve",
      steps: [
        "Confirm data categories are parts of one meaningful whole.",
        "Convert each share into percentage/fraction/angle consistently.",
        "Check that all sectors together equal 360 degrees."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "90 degrees",
      "120 degrees",
      "180 degrees",
      "240 degrees"
    ],
    "180 degrees",
    {
      kind: "pie-sector",
      sharePercent: 50
    }
  )
};

export const inline_2_3_1_0_1 = {
  id: "inline_2_3_1_0_1",
  text: "Which statement best describes a pie chart?",
  options: [
    "A graph that shows each category as a sector of a 360-degree whole.",
    "A graph that tracks change over time using connected points.",
    "A graph that always uses equal bar widths with gaps.",
    "A graph that can only display continuous interval data."
  ],
  correctAnswer: "A graph that shows each category as a sector of a 360-degree whole.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of pie-chart representation of parts of a whole.",
  hintLevel1: "Focus on the exact meaning of pie-chart representation of parts of a whole.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Pie charts focus on proportional shares of one total whole.",
  incorrectOptionFeedback: {
    "A graph that tracks change over time using connected points.": "Review the definition of pie-chart representation of parts of a whole and match the option that states it most accurately.",
    "A graph that always uses equal bar widths with gaps.": "Review the definition of pie-chart representation of parts of a whole and match the option that states it most accurately.",
    "A graph that can only display continuous interval data.": "Review the definition of pie-chart representation of parts of a whole and match the option that states it most accurately."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "definition-check"
  ],
  remedialBrief: "Correct: A graph that shows each category as a sector of a 360-degree whole..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Definition Check",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Definition Strategy",
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
      "A graph that shows each category as a sector of a 360-degree whole.",
      "A graph that tracks change over time using connected points.",
      "A graph that always uses equal bar widths with gaps.",
      "A graph that can only display continuous interval data."
    ],
    "A graph that shows each category as a sector of a 360-degree whole."
  )
};

export const inline_2_3_1_0_2 = {
  id: "inline_2_3_1_0_2",
  text: "A pie chart has sector angles 144 degrees, 108 degrees, and 108 degrees. What percent does the 144-degree sector represent?",
  options: [
    "30%",
    "40%",
    "45%",
    "50%"
  ],
  correctAnswer: "40%",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Percentage = 144/360 x 100 = 40%.",
  incorrectOptionFeedback: {
    "30%": "Use the provided values carefully and apply the relevant rule/formula for pie-chart representation of parts of a whole.",
    "45%": "Use the provided values carefully and apply the relevant rule/formula for pie-chart representation of parts of a whole.",
    "50%": "Use the provided values carefully and apply the relevant rule/formula for pie-chart representation of parts of a whole."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 40%.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Quantitative Check",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Quant Strategy",
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
      "30%",
      "40%",
      "45%",
      "50%"
    ],
    "40%"
  )
};

export const inline_2_3_1_0_3 = {
  id: "inline_2_3_1_0_3",
  text: "A student says: \"Pie charts show exact trends over years better than bar graphs.\" Which response is most accurate?",
  options: [
    "Yes, pie charts are always best whenever years are listed.",
    "No. Pie charts show proportion at one point; trend over time is better shown by bar or line graphs.",
    "Yes, trend analysis is impossible in bar or line graphs.",
    "Pie charts should replace all other graphs because they are colorful."
  ],
  correctAnswer: "No. Pie charts show proportion at one point; trend over time is better shown by bar or line graphs.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with pie-chart representation of parts of a whole.",
  correctAnswerExplanation: "Graph choice depends on question type; trend questions require ordered-time comparisons.",
  incorrectOptionFeedback: {
    "Yes, pie charts are always best whenever years are listed.": "This response does not correctly address the misconception. Re-anchor to the rule for pie-chart representation of parts of a whole.",
    "Yes, trend analysis is impossible in bar or line graphs.": "This response does not correctly address the misconception. Re-anchor to the rule for pie-chart representation of parts of a whole.",
    "Pie charts should replace all other graphs because they are colorful.": "This response does not correctly address the misconception. Re-anchor to the rule for pie-chart representation of parts of a whole."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Pie charts show proportion at one point; trend over time is better shown by bar or line graphs..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Misconception Repair",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Error Correction Flow",
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
      "Yes, pie charts are always best whenever years are listed.",
      "No. Pie charts show proportion at one point; trend over time is better shown by bar or line graphs.",
      "Yes, trend analysis is impossible in bar or line graphs.",
      "Pie charts should replace all other graphs because they are colorful."
    ],
    "No. Pie charts show proportion at one point; trend over time is better shown by bar or line graphs."
  )
};

export const inline_2_3_1_0_4 = {
  id: "inline_2_3_1_0_4",
  text: "You have data on student spending split into Food, Travel, Books, and Savings from one monthly budget. Which graph is best?",
  options: [
    "Pie chart",
    "Histogram",
    "Scatter plot only",
    "No graph required"
  ],
  correctAnswer: "Pie chart",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "These are parts of one monthly total, so a pie chart communicates shares effectively.",
  incorrectOptionFeedback: {
    Histogram: "Choose the method that preserves the data type and question intent for pie-chart representation of parts of a whole.",
    "Scatter plot only": "Choose the method that preserves the data type and question intent for pie-chart representation of parts of a whole.",
    "No graph required": "Choose the method that preserves the data type and question intent for pie-chart representation of parts of a whole."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "method-selection"
  ],
  remedialBrief: "Best method: Pie chart.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Method Selection",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Method Decision Steps",
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
      "Pie chart",
      "Histogram",
      "Scatter plot only",
      "No graph required"
    ],
    "Pie chart"
  )
};

export const inline_2_3_1_0_5 = {
  id: "inline_2_3_1_0_5",
  text: "For pie-chart representation of parts of a whole, what should be done first?",
  options: [
    "Convert each share into percentage/fraction/angle consistently.",
    "Confirm data categories are parts of one meaningful whole.",
    "Check that all sectors together equal 360 degrees.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Confirm data categories are parts of one meaningful whole.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Confirm data categories are parts of one meaningful whole.. After that, proceed with Convert each share into percentage/fraction/angle consistently. and then Check that all sectors together equal 360 degrees..",
  incorrectOptionFeedback: {
    "Convert each share into percentage/fraction/angle consistently.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Check that all sectors together equal 360 degrees.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Confirm data categories are parts of one meaningful whole..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Process Order",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Ordered Workflow",
      steps: [
        "Confirm data categories are parts of one meaningful whole.",
        "Convert each share into percentage/fraction/angle consistently.",
        "Check that all sectors together equal 360 degrees."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Convert each share into percentage/fraction/angle consistently.",
      "Confirm data categories are parts of one meaningful whole.",
      "Check that all sectors together equal 360 degrees.",
      "Skip validation and finalize immediately"
    ],
    "Confirm data categories are parts of one meaningful whole."
  )
};

export const inline_2_3_1_0_6 = {
  id: "inline_2_3_1_0_6",
  text: "True or False: In a correct pie chart, the sum of all sector angles must be exactly 360 degrees.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Any deviation from 360 degrees indicates a conversion or plotting error.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "pie-chart",
    "fractions",
    "percentages",
    "module-3",
    "topic-1",
    "what-is-a-pie-chart-",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "What Is a Pie Chart? - Rule Validation",
      points: [
        "A pie chart represents one whole as 360 degrees.",
        "Each sector angle is proportional to category share.",
        "Percent, fraction, and angle are interchangeable views of the same share.",
        "All sector angles must sum to 360 degrees."
      ]
    },
    stepByStep: {
      title: "What Is a Pie Chart? - Validation Steps",
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

export const inline_2_3_2_0 = {
  id: "inline_2_3_2_0",
  text: "A category has value 80 out of total 720. What is its pie-chart sector angle?",
  options: [
    "20 degrees",
    "40 degrees",
    "80 degrees",
    "120 degrees"
  ],
  correctAnswer: "40 degrees",
  format: GameFormat.RAINDROP,
  hint: "Use angle = value/total x 360.",
  hintLevel1: "Use angle = value/total x 360.",
  hintLevel2: "Compute 80/720 first, then multiply by 360.",
  correctAnswerExplanation: "(B) 40 degrees. 80/720 = 1/9 and 1/9 x 360 = 40 degrees.",
  incorrectOptionFeedback: {
    "20 degrees": "This is half the required angle; check multiplication by 360 carefully.",
    "80 degrees": "You likely used value directly as angle, which is incorrect unless total is 360.",
    "120 degrees": "120 degrees corresponds to one-third of total, not one-ninth."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles"
  ],
  remedialBrief: "Correct: 40 degrees.",
  remedialDetail: "Core idea: forward and reverse calculations between value and angle.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Core Concept",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - How To Solve",
      steps: [
        "Identify whether problem is value-to-angle or angle-to-value.",
        "Apply the correct formula with total as the denominator base.",
        "Verify result using total-angle or total-value consistency."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "20 degrees",
      "40 degrees",
      "80 degrees",
      "120 degrees"
    ],
    "40 degrees",
    {
      kind: "formula-card",
      forward: "angle = (value/total) x 360",
      reverse: "value = (angle/360) x total"
    }
  )
};

export const inline_2_3_2_0_1 = {
  id: "inline_2_3_2_0_1",
  text: "Which formula is correct for finding a sector angle from data values?",
  options: [
    "Angle = (Value/Total) x 360",
    "Angle = (Total/Value) x 360",
    "Angle = Value + Total",
    "Angle = Value x Total"
  ],
  correctAnswer: "Angle = (Value/Total) x 360",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of forward and reverse calculations between value and angle.",
  hintLevel1: "Focus on the exact meaning of forward and reverse calculations between value and angle.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Sector angle must be proportional to its share of the total and scaled by 360 degrees.",
  incorrectOptionFeedback: {
    "Angle = (Total/Value) x 360": "Review the definition of forward and reverse calculations between value and angle and match the option that states it most accurately.",
    "Angle = Value + Total": "Review the definition of forward and reverse calculations between value and angle and match the option that states it most accurately.",
    "Angle = Value x Total": "Review the definition of forward and reverse calculations between value and angle and match the option that states it most accurately."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "definition-check"
  ],
  remedialBrief: "Correct: Angle = (Value/Total) x 360.",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Definition Check",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Definition Strategy",
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
      "Angle = (Value/Total) x 360",
      "Angle = (Total/Value) x 360",
      "Angle = Value + Total",
      "Angle = Value x Total"
    ],
    "Angle = (Value/Total) x 360"
  )
};

export const inline_2_3_2_0_2 = {
  id: "inline_2_3_2_0_2",
  text: "A family pie chart shows Savings = 15% and monthly savings amount is 3000. What is Clothes expenditure at 10%?",
  options: [
    "1000",
    "1500",
    "2000",
    "3000"
  ],
  correctAnswer: "2000",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "If 15% = 3000, then 1% = 200 and 10% = 2000.",
  incorrectOptionFeedback: {
    "1000": "Use the provided values carefully and apply the relevant rule/formula for forward and reverse calculations between value and angle.",
    "1500": "Use the provided values carefully and apply the relevant rule/formula for forward and reverse calculations between value and angle.",
    "3000": "Use the provided values carefully and apply the relevant rule/formula for forward and reverse calculations between value and angle."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 2000.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Quantitative Check",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Quant Strategy",
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
      "1000",
      "1500",
      "2000",
      "3000"
    ],
    "2000"
  )
};

export const inline_2_3_2_0_3 = {
  id: "inline_2_3_2_0_3",
  text: "A student says: \"You can use the same denominator for every pie chart without checking total.\" Which response is most accurate?",
  options: [
    "Yes, denominator is always 100 regardless of context.",
    "No. The denominator must be the actual total of that dataset each time.",
    "Yes, denominator is always number of categories.",
    "Pie charts do not require totals because only angles matter."
  ],
  correctAnswer: "No. The denominator must be the actual total of that dataset each time.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with forward and reverse calculations between value and angle.",
  correctAnswerExplanation: "Incorrect denominator leads directly to wrong sector angles and invalid interpretation.",
  incorrectOptionFeedback: {
    "Yes, denominator is always 100 regardless of context.": "This response does not correctly address the misconception. Re-anchor to the rule for forward and reverse calculations between value and angle.",
    "Yes, denominator is always number of categories.": "This response does not correctly address the misconception. Re-anchor to the rule for forward and reverse calculations between value and angle.",
    "Pie charts do not require totals because only angles matter.": "This response does not correctly address the misconception. Re-anchor to the rule for forward and reverse calculations between value and angle."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. The denominator must be the actual total of that dataset each time..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Misconception Repair",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Error Correction Flow",
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
      "Yes, denominator is always 100 regardless of context.",
      "No. The denominator must be the actual total of that dataset each time.",
      "Yes, denominator is always number of categories.",
      "Pie charts do not require totals because only angles matter."
    ],
    "No. The denominator must be the actual total of that dataset each time."
  )
};

export const inline_2_3_2_0_4 = {
  id: "inline_2_3_2_0_4",
  text: "You know sector angle and total amount, and must find category value. Which method should be used?",
  options: [
    "Use reverse formula value = angle/360 x total.",
    "Subtract angle from total amount directly.",
    "Multiply total by number of categories.",
    "Use histogram frequency method."
  ],
  correctAnswer: "Use reverse formula value = angle/360 x total.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Reverse conversion from angle share to quantity requires angle/360 scaling.",
  incorrectOptionFeedback: {
    "Subtract angle from total amount directly.": "Choose the method that preserves the data type and question intent for forward and reverse calculations between value and angle.",
    "Multiply total by number of categories.": "Choose the method that preserves the data type and question intent for forward and reverse calculations between value and angle.",
    "Use histogram frequency method.": "Choose the method that preserves the data type and question intent for forward and reverse calculations between value and angle."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "method-selection"
  ],
  remedialBrief: "Best method: Use reverse formula value = angle/360 x total..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Method Selection",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Method Decision Steps",
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
      "Use reverse formula value = angle/360 x total.",
      "Subtract angle from total amount directly.",
      "Multiply total by number of categories.",
      "Use histogram frequency method."
    ],
    "Use reverse formula value = angle/360 x total."
  )
};

export const inline_2_3_2_0_5 = {
  id: "inline_2_3_2_0_5",
  text: "For forward and reverse calculations between value and angle, what should be done first?",
  options: [
    "Apply the correct formula with total as the denominator base.",
    "Identify whether problem is value-to-angle or angle-to-value.",
    "Verify result using total-angle or total-value consistency.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Identify whether problem is value-to-angle or angle-to-value.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Identify whether problem is value-to-angle or angle-to-value.. After that, proceed with Apply the correct formula with total as the denominator base. and then Verify result using total-angle or total-value consistency..",
  incorrectOptionFeedback: {
    "Apply the correct formula with total as the denominator base.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Verify result using total-angle or total-value consistency.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Identify whether problem is value-to-angle or angle-to-value..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Process Order",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Ordered Workflow",
      steps: [
        "Identify whether problem is value-to-angle or angle-to-value.",
        "Apply the correct formula with total as the denominator base.",
        "Verify result using total-angle or total-value consistency."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Apply the correct formula with total as the denominator base.",
      "Identify whether problem is value-to-angle or angle-to-value.",
      "Verify result using total-angle or total-value consistency.",
      "Skip validation and finalize immediately"
    ],
    "Identify whether problem is value-to-angle or angle-to-value."
  )
};

export const inline_2_3_2_0_6 = {
  id: "inline_2_3_2_0_6",
  text: "True or False: If sector angles add up to 359 or 361 degrees, the pie chart is mathematically acceptable.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "False",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "False. A valid pie chart must total exactly 360 degrees.",
  incorrectOptionFeedback: {
    True: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "sector-angle",
    "formula",
    "reverse-calculation",
    "module-3",
    "topic-2",
    "calculating-sector-angles",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: False.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Calculating Sector Angles - Rule Validation",
      points: [
        "Forward formula: angle = (value/total) x 360.",
        "Reverse formula: value = (angle/360) x total.",
        "Verification step: all angles should total 360.",
        "Reverse reasoning is useful in budget and survey interpretation."
      ]
    },
    stepByStep: {
      title: "Calculating Sector Angles - Validation Steps",
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

export const inline_2_3_3_0 = {
  id: "inline_2_3_3_0",
  text: "Which graph is best for yearly rainfall from 2019 to 2024?",
  options: [
    "Pie chart",
    "Bar graph",
    "Only pictograph",
    "No graph can represent it"
  ],
  correctAnswer: "Bar graph",
  format: GameFormat.RAINDROP,
  hint: "Ask whether this question is about trend over time or parts of one whole.",
  hintLevel1: "Ask whether this question is about trend over time or parts of one whole.",
  hintLevel2: "Years are ordered in time; comparison across years is key.",
  correctAnswerExplanation: "(B) Bar graph. Time-series comparison is better shown with bars or lines, not pie sectors.",
  incorrectOptionFeedback: {
    "Pie chart": "Pie chart is for one whole split into parts, not multi-year trend.",
    "Only pictograph": "Pictographs are possible but usually less precise for year-by-year analysis.",
    "No graph can represent it": "Time data is commonly represented with bar or line graphs."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts"
  ],
  remedialBrief: "Correct: Bar graph.",
  remedialDetail: "Core idea: graph selection for proportion, trend, and distribution tasks.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Core Concept",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - How To Solve",
      steps: [
        "Identify whether data is part-to-whole, time-based, or grouped continuous.",
        "Match dataset type with graph purpose.",
        "Validate choice by checking what question the graph must answer."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Pie chart",
      "Bar graph",
      "Only pictograph",
      "No graph can represent it"
    ],
    "Bar graph",
    {
      kind: "graph-decision",
      options: [
        "part-to-whole",
        "time-series",
        "grouped-continuous"
      ]
    }
  )
};

export const inline_2_3_3_0_1 = {
  id: "inline_2_3_3_0_1",
  text: "A pie chart is most appropriate when data represents:",
  options: [
    "Shares of one whole at a given time.",
    "Continuous intervals like 10-20, 20-30.",
    "A sequence of monthly trend values over years.",
    "Only data with exactly four categories."
  ],
  correctAnswer: "Shares of one whole at a given time.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of graph selection for proportion, trend, and distribution tasks.",
  hintLevel1: "Focus on the exact meaning of graph selection for proportion, trend, and distribution tasks.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Part-to-whole framing is the defining condition for pie-chart use.",
  incorrectOptionFeedback: {
    "Continuous intervals like 10-20, 20-30.": "Review the definition of graph selection for proportion, trend, and distribution tasks and match the option that states it most accurately.",
    "A sequence of monthly trend values over years.": "Review the definition of graph selection for proportion, trend, and distribution tasks and match the option that states it most accurately.",
    "Only data with exactly four categories.": "Review the definition of graph selection for proportion, trend, and distribution tasks and match the option that states it most accurately."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "definition-check"
  ],
  remedialBrief: "Correct: Shares of one whole at a given time..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Definition Check",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Definition Strategy",
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
      "Shares of one whole at a given time.",
      "Continuous intervals like 10-20, 20-30.",
      "A sequence of monthly trend values over years.",
      "Only data with exactly four categories."
    ],
    "Shares of one whole at a given time."
  )
};

export const inline_2_3_3_0_2 = {
  id: "inline_2_3_3_0_2",
  text: "Heights of 50 students are grouped into 5 cm intervals. Which graph type should be chosen?",
  options: [
    "Histogram",
    "Pie chart",
    "Unscaled sketch",
    "Category bar graph with random gaps"
  ],
  correctAnswer: "Histogram",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Grouped continuous interval data is represented by histograms.",
  incorrectOptionFeedback: {
    "Pie chart": "Use the provided values carefully and apply the relevant rule/formula for graph selection for proportion, trend, and distribution tasks.",
    "Unscaled sketch": "Use the provided values carefully and apply the relevant rule/formula for graph selection for proportion, trend, and distribution tasks.",
    "Category bar graph with random gaps": "Use the provided values carefully and apply the relevant rule/formula for graph selection for proportion, trend, and distribution tasks."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Histogram.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Quantitative Check",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Quant Strategy",
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
      "Pie chart",
      "Unscaled sketch",
      "Category bar graph with random gaps"
    ],
    "Histogram"
  )
};

export const inline_2_3_3_0_3 = {
  id: "inline_2_3_3_0_3",
  text: "A student says: \"Pie charts are best for every dataset because percentages can always be computed.\" Which response is most accurate?",
  options: [
    "Yes, convert all data to percentages and always use pie charts.",
    "No. Percentages alone do not make pie charts appropriate; question type and structure matter.",
    "Yes, graph type does not affect interpretation quality.",
    "Any graph is equally suitable if labels are colorful."
  ],
  correctAnswer: "No. Percentages alone do not make pie charts appropriate; question type and structure matter.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with graph selection for proportion, trend, and distribution tasks.",
  correctAnswerExplanation: "Graph misuse can hide trends or distort distribution interpretation.",
  incorrectOptionFeedback: {
    "Yes, convert all data to percentages and always use pie charts.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection for proportion, trend, and distribution tasks.",
    "Yes, graph type does not affect interpretation quality.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection for proportion, trend, and distribution tasks.",
    "Any graph is equally suitable if labels are colorful.": "This response does not correctly address the misconception. Re-anchor to the rule for graph selection for proportion, trend, and distribution tasks."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Percentages alone do not make pie charts appropriate; question type and structure matter..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Misconception Repair",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Error Correction Flow",
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
      "Yes, convert all data to percentages and always use pie charts.",
      "No. Percentages alone do not make pie charts appropriate; question type and structure matter.",
      "Yes, graph type does not affect interpretation quality.",
      "Any graph is equally suitable if labels are colorful."
    ],
    "No. Percentages alone do not make pie charts appropriate; question type and structure matter."
  )
};

export const inline_2_3_3_0_4 = {
  id: "inline_2_3_3_0_4",
  text: "Dataset: club participation percentages in one class snapshot. Best graph?",
  options: [
    "Pie chart",
    "Histogram",
    "Line graph over years",
    "Scatter plot without axes"
  ],
  correctAnswer: "Pie chart",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Participation percentages are part-to-whole shares in a single snapshot.",
  incorrectOptionFeedback: {
    Histogram: "Choose the method that preserves the data type and question intent for graph selection for proportion, trend, and distribution tasks.",
    "Line graph over years": "Choose the method that preserves the data type and question intent for graph selection for proportion, trend, and distribution tasks.",
    "Scatter plot without axes": "Choose the method that preserves the data type and question intent for graph selection for proportion, trend, and distribution tasks."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "method-selection"
  ],
  remedialBrief: "Best method: Pie chart.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Method Selection",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Method Decision Steps",
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
      "Pie chart",
      "Histogram",
      "Line graph over years",
      "Scatter plot without axes"
    ],
    "Pie chart"
  )
};

export const inline_2_3_3_0_5 = {
  id: "inline_2_3_3_0_5",
  text: "For graph selection for proportion, trend, and distribution tasks, what should be done first?",
  options: [
    "Match dataset type with graph purpose.",
    "Identify whether data is part-to-whole, time-based, or grouped continuous.",
    "Validate choice by checking what question the graph must answer.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Identify whether data is part-to-whole, time-based, or grouped continuous.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Identify whether data is part-to-whole, time-based, or grouped continuous.. After that, proceed with Match dataset type with graph purpose. and then Validate choice by checking what question the graph must answer..",
  incorrectOptionFeedback: {
    "Match dataset type with graph purpose.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Validate choice by checking what question the graph must answer.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Identify whether data is part-to-whole, time-based, or grouped continuous..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Process Order",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Ordered Workflow",
      steps: [
        "Identify whether data is part-to-whole, time-based, or grouped continuous.",
        "Match dataset type with graph purpose.",
        "Validate choice by checking what question the graph must answer."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Match dataset type with graph purpose.",
      "Identify whether data is part-to-whole, time-based, or grouped continuous.",
      "Validate choice by checking what question the graph must answer.",
      "Skip validation and finalize immediately"
    ],
    "Identify whether data is part-to-whole, time-based, or grouped continuous."
  )
};

export const inline_2_3_3_0_6 = {
  id: "inline_2_3_3_0_6",
  text: "True or False: Pie charts are the best default for showing trends across multiple years.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "False",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "False. Trend analysis is generally clearer with bar or line graphs.",
  incorrectOptionFeedback: {
    True: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "graph-selection",
    "pie-chart-use",
    "critical-thinking",
    "module-3",
    "topic-3",
    "when-to-use-pie-charts",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: False.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "When to Use Pie Charts - Rule Validation",
      points: [
        "Use pie charts for part-to-whole comparisons at one snapshot.",
        "Use bar or line graphs for time trends.",
        "Use histograms for grouped continuous distributions.",
        "Correct graph choice is a reasoning skill, not decoration choice."
      ]
    },
    stepByStep: {
      title: "When to Use Pie Charts - Validation Steps",
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

// TOPIC 4

export const inline_2_3_4_0 = {
  id: "inline_2_3_4_0",
  text: "In a music survey of 200 people, Light music is 40%. How many people prefer Light music?",
  options: [
    "60",
    "70",
    "80",
    "90"
  ],
  correctAnswer: "80",
  format: GameFormat.RAINDROP,
  hint: "Convert 40% of 200 into a count.",
  hintLevel1: "Convert 40% of 200 into a count.",
  hintLevel2: "Compute 40/100 x 200.",
  correctAnswerExplanation: "(C) 80. Forty percent of 200 equals 80 people.",
  incorrectOptionFeedback: {
    "60": "60 corresponds to 30%, not 40%.",
    "70": "70 corresponds to 35%, not 40%.",
    "90": "90 corresponds to 45%, not 40%."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis"
  ],
  remedialBrief: "Correct: 80.",
  remedialDetail: "Core idea: interpreting sector shares and converting them into real quantities.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Core Concept",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - How To Solve",
      steps: [
        "Read category shares and verify percentage totals.",
        "Convert required sectors into actual counts or amounts.",
        "State interpretation and allocation decisions clearly."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "60",
      "70",
      "80",
      "90"
    ],
    "80",
    {
      kind: "percent-to-count",
      total: 200,
      percent: 40
    }
  )
};

export const inline_2_3_4_0_1 = {
  id: "inline_2_3_4_0_1",
  text: "In pie-chart project analysis, what does proportional allocation mean?",
  options: [
    "Distributing total quantity according to each sector percentage.",
    "Giving equal quantity to every category regardless of share.",
    "Allocating only to the largest category and ignoring others.",
    "Converting all angles to 100 degrees each."
  ],
  correctAnswer: "Distributing total quantity according to each sector percentage.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of interpreting sector shares and converting them into real quantities.",
  hintLevel1: "Focus on the exact meaning of interpreting sector shares and converting them into real quantities.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Allocation should preserve the original share relationships shown in the chart.",
  incorrectOptionFeedback: {
    "Giving equal quantity to every category regardless of share.": "Review the definition of interpreting sector shares and converting them into real quantities and match the option that states it most accurately.",
    "Allocating only to the largest category and ignoring others.": "Review the definition of interpreting sector shares and converting them into real quantities and match the option that states it most accurately.",
    "Converting all angles to 100 degrees each.": "Review the definition of interpreting sector shares and converting them into real quantities and match the option that states it most accurately."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "definition-check"
  ],
  remedialBrief: "Correct: Distributing total quantity according to each sector percentage..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Definition Check",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Definition Strategy",
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
      "Distributing total quantity according to each sector percentage.",
      "Giving equal quantity to every category regardless of share.",
      "Allocating only to the largest category and ignoring others.",
      "Converting all angles to 100 degrees each."
    ],
    "Distributing total quantity according to each sector percentage."
  )
};

export const inline_2_3_4_0_2 = {
  id: "inline_2_3_4_0_2",
  text: "If 1000 CDs are produced from survey shares where Folk music is 30%, how many Folk CDs should be produced?",
  options: [
    "100",
    "200",
    "300",
    "400"
  ],
  correctAnswer: "300",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "30% of 1000 = 300 CDs.",
  incorrectOptionFeedback: {
    "100": "Use the provided values carefully and apply the relevant rule/formula for interpreting sector shares and converting them into real quantities.",
    "200": "Use the provided values carefully and apply the relevant rule/formula for interpreting sector shares and converting them into real quantities.",
    "400": "Use the provided values carefully and apply the relevant rule/formula for interpreting sector shares and converting them into real quantities."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 300.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Quantitative Check",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Quant Strategy",
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
      "100",
      "200",
      "300",
      "400"
    ],
    "300"
  )
};

export const inline_2_3_4_0_3 = {
  id: "inline_2_3_4_0_3",
  text: "A student says: \"The largest sector always means more than half of the total.\" Which response is most accurate?",
  options: [
    "Yes, largest slice always implies strict majority.",
    "No. A sector can be largest but still less than 50% if all categories are closer in share.",
    "Largest sector means exactly 50% every time.",
    "Largest sector can be ignored because all sectors are equivalent."
  ],
  correctAnswer: "No. A sector can be largest but still less than 50% if all categories are closer in share.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with interpreting sector shares and converting them into real quantities.",
  correctAnswerExplanation: "Largest means greatest relative to others, not necessarily majority threshold.",
  incorrectOptionFeedback: {
    "Yes, largest slice always implies strict majority.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting sector shares and converting them into real quantities.",
    "Largest sector means exactly 50% every time.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting sector shares and converting them into real quantities.",
    "Largest sector can be ignored because all sectors are equivalent.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting sector shares and converting them into real quantities."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. A sector can be largest but still less than 50% if all categories are closer in share..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Misconception Repair",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Error Correction Flow",
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
      "Yes, largest slice always implies strict majority.",
      "No. A sector can be largest but still less than 50% if all categories are closer in share.",
      "Largest sector means exactly 50% every time.",
      "Largest sector can be ignored because all sectors are equivalent."
    ],
    "No. A sector can be largest but still less than 50% if all categories are closer in share."
  )
};

export const inline_2_3_4_0_4 = {
  id: "inline_2_3_4_0_4",
  text: "A pie chart shows News = 15% and Informative = 10%. Sports = 25%. Which statement is correct?",
  options: [
    "News + Informative equals Sports.",
    "Sports equals only Informative.",
    "Sports is less than News alone.",
    "No comparison is possible with percentages."
  ],
  correctAnswer: "News + Informative equals Sports.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "15% + 10% = 25%, so News and Informative together match Sports share.",
  incorrectOptionFeedback: {
    "Sports equals only Informative.": "Choose the method that preserves the data type and question intent for interpreting sector shares and converting them into real quantities.",
    "Sports is less than News alone.": "Choose the method that preserves the data type and question intent for interpreting sector shares and converting them into real quantities.",
    "No comparison is possible with percentages.": "Choose the method that preserves the data type and question intent for interpreting sector shares and converting them into real quantities."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "method-selection"
  ],
  remedialBrief: "Best method: News + Informative equals Sports..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Method Selection",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Method Decision Steps",
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
      "News + Informative equals Sports.",
      "Sports equals only Informative.",
      "Sports is less than News alone.",
      "No comparison is possible with percentages."
    ],
    "News + Informative equals Sports."
  )
};

export const inline_2_3_4_0_5 = {
  id: "inline_2_3_4_0_5",
  text: "For interpreting sector shares and converting them into real quantities, what should be done first?",
  options: [
    "Convert required sectors into actual counts or amounts.",
    "Read category shares and verify percentage totals.",
    "State interpretation and allocation decisions clearly.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Read category shares and verify percentage totals.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Read category shares and verify percentage totals.. After that, proceed with Convert required sectors into actual counts or amounts. and then State interpretation and allocation decisions clearly..",
  incorrectOptionFeedback: {
    "Convert required sectors into actual counts or amounts.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "State interpretation and allocation decisions clearly.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Read category shares and verify percentage totals..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Process Order",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Ordered Workflow",
      steps: [
        "Read category shares and verify percentage totals.",
        "Convert required sectors into actual counts or amounts.",
        "State interpretation and allocation decisions clearly."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Convert required sectors into actual counts or amounts.",
      "Read category shares and verify percentage totals.",
      "State interpretation and allocation decisions clearly.",
      "Skip validation and finalize immediately"
    ],
    "Read category shares and verify percentage totals."
  )
};

export const inline_2_3_4_0_6 = {
  id: "inline_2_3_4_0_6",
  text: "True or False: Reverse calculations from known sector and known value can be used to infer total population.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. If one sector value and its percent are known, total can be recovered by proportion.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "applied-analysis",
    "reverse-calculation",
    "allocation",
    "module-3",
    "topic-4",
    "real-world-pie-chart-analysis",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Real-World Pie Chart Analysis - Rule Validation",
      points: [
        "Real-world interpretation combines percent reading and quantity conversion.",
        "Sector comparison can reveal equivalence across categories.",
        "Allocation tasks require precise proportional conversion.",
        "Interpretation quality depends on arithmetic accuracy and context."
      ]
    },
    stepByStep: {
      title: "Real-World Pie Chart Analysis - Validation Steps",
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

export const inline_2_3_5_0 = {
  id: "inline_2_3_5_0",
  text: "A bar graph starts y-axis at 100 instead of 0, making a small difference appear huge. This is mainly:",
  options: [
    "Misleading scaling",
    "A mandatory bar-graph rule",
    "A way to increase data accuracy",
    "Only a legend issue"
  ],
  correctAnswer: "Misleading scaling",
  format: GameFormat.RAINDROP,
  hint: "Compare visual impression against actual numeric difference.",
  hintLevel1: "Compare visual impression against actual numeric difference.",
  hintLevel2: "Truncating baseline can exaggerate bar-height contrast.",
  correctAnswerExplanation: "(A) Misleading scaling. Axis truncation can distort perceived differences and bias interpretation.",
  incorrectOptionFeedback: {
    "A mandatory bar-graph rule": "Bar graphs are typically expected to start from zero for fair comparison.",
    "A way to increase data accuracy": "It often reduces interpretive fairness rather than improving accuracy.",
    "Only a legend issue": "The issue is axis scaling, not legend labeling."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs"
  ],
  remedialBrief: "Correct: Misleading scaling.",
  remedialDetail: "Core idea: critical graph reading using labels, scale, trend, and anomaly checks.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Core Concept",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - How To Solve",
      steps: [
        "Read title, labels, and axis scale carefully.",
        "Extract pattern: highest, lowest, trend, and anomalies.",
        "Form conclusion and prediction with evidence support."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Misleading scaling",
      "A mandatory bar-graph rule",
      "A way to increase data accuracy",
      "Only a legend issue"
    ],
    "Misleading scaling",
    {
      kind: "axis-check",
      startsAt: 100
    }
  )
};

export const inline_2_3_5_0_1 = {
  id: "inline_2_3_5_0_1",
  text: "What is the best first habit in graph interpretation?",
  options: [
    "Check title, axes labels, and scale before interpreting values.",
    "Find the tallest bar and stop there.",
    "Ignore the axis if bars look proportional.",
    "Use color intensity to estimate exact values."
  ],
  correctAnswer: "Check title, axes labels, and scale before interpreting values.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of critical graph reading using labels, scale, trend, and anomaly checks.",
  hintLevel1: "Focus on the exact meaning of critical graph reading using labels, scale, trend, and anomaly checks.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Context and scale define what visual differences actually mean.",
  incorrectOptionFeedback: {
    "Find the tallest bar and stop there.": "Review the definition of critical graph reading using labels, scale, trend, and anomaly checks and match the option that states it most accurately.",
    "Ignore the axis if bars look proportional.": "Review the definition of critical graph reading using labels, scale, trend, and anomaly checks and match the option that states it most accurately.",
    "Use color intensity to estimate exact values.": "Review the definition of critical graph reading using labels, scale, trend, and anomaly checks and match the option that states it most accurately."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "definition-check"
  ],
  remedialBrief: "Correct: Check title, axes labels, and scale before interpreting values..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Definition Check",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Definition Strategy",
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
      "Check title, axes labels, and scale before interpreting values.",
      "Find the tallest bar and stop there.",
      "Ignore the axis if bars look proportional.",
      "Use color intensity to estimate exact values."
    ],
    "Check title, axes labels, and scale before interpreting values."
  )
};

export const inline_2_3_5_0_2 = {
  id: "inline_2_3_5_0_2",
  text: "Scores are 55, 62, 58, 70, 75. How much did score improve from Test 3 to Test 5?",
  options: [
    "12",
    "15",
    "17",
    "20"
  ],
  correctAnswer: "17",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Improvement = 75 - 58 = 17.",
  incorrectOptionFeedback: {
    "12": "Use the provided values carefully and apply the relevant rule/formula for critical graph reading using labels, scale, trend, and anomaly checks.",
    "15": "Use the provided values carefully and apply the relevant rule/formula for critical graph reading using labels, scale, trend, and anomaly checks.",
    "20": "Use the provided values carefully and apply the relevant rule/formula for critical graph reading using labels, scale, trend, and anomaly checks."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 17.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Quantitative Check",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Quant Strategy",
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
      "12",
      "15",
      "17",
      "20"
    ],
    "17"
  )
};

export const inline_2_3_5_0_3 = {
  id: "inline_2_3_5_0_3",
  text: "A student says: \"Graph interpretation only means reading the highest and lowest values.\" Which response is most accurate?",
  options: [
    "Yes, trend and scale checks are optional extras.",
    "No. Strong interpretation includes trend, anomalies, and possible inferences.",
    "Yes, labels are not needed if bars are visible.",
    "Interpretation should avoid any comparison to prevent bias."
  ],
  correctAnswer: "No. Strong interpretation includes trend, anomalies, and possible inferences.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with critical graph reading using labels, scale, trend, and anomaly checks.",
  correctAnswerExplanation: "Comprehensive interpretation combines descriptive, analytical, and inferential reading.",
  incorrectOptionFeedback: {
    "Yes, trend and scale checks are optional extras.": "This response does not correctly address the misconception. Re-anchor to the rule for critical graph reading using labels, scale, trend, and anomaly checks.",
    "Yes, labels are not needed if bars are visible.": "This response does not correctly address the misconception. Re-anchor to the rule for critical graph reading using labels, scale, trend, and anomaly checks.",
    "Interpretation should avoid any comparison to prevent bias.": "This response does not correctly address the misconception. Re-anchor to the rule for critical graph reading using labels, scale, trend, and anomaly checks."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Strong interpretation includes trend, anomalies, and possible inferences..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Misconception Repair",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Error Correction Flow",
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
      "Yes, trend and scale checks are optional extras.",
      "No. Strong interpretation includes trend, anomalies, and possible inferences.",
      "Yes, labels are not needed if bars are visible.",
      "Interpretation should avoid any comparison to prevent bias."
    ],
    "No. Strong interpretation includes trend, anomalies, and possible inferences."
  )
};

export const inline_2_3_5_0_4 = {
  id: "inline_2_3_5_0_4",
  text: "What is the best approach for interpreting a 5-test performance graph?",
  options: [
    "Read values, detect trend/anomaly, then infer next-step recommendation.",
    "Only memorize one score and ignore sequence.",
    "Compare bar colors and ignore numerical scale.",
    "Use random prediction without pattern check."
  ],
  correctAnswer: "Read values, detect trend/anomaly, then infer next-step recommendation.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "This process captures full interpretation depth from descriptive to inferential level.",
  incorrectOptionFeedback: {
    "Only memorize one score and ignore sequence.": "Choose the method that preserves the data type and question intent for critical graph reading using labels, scale, trend, and anomaly checks.",
    "Compare bar colors and ignore numerical scale.": "Choose the method that preserves the data type and question intent for critical graph reading using labels, scale, trend, and anomaly checks.",
    "Use random prediction without pattern check.": "Choose the method that preserves the data type and question intent for critical graph reading using labels, scale, trend, and anomaly checks."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "method-selection"
  ],
  remedialBrief: "Best method: Read values, detect trend/anomaly, then infer next-step recommendation..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Method Selection",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Method Decision Steps",
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
      "Read values, detect trend/anomaly, then infer next-step recommendation.",
      "Only memorize one score and ignore sequence.",
      "Compare bar colors and ignore numerical scale.",
      "Use random prediction without pattern check."
    ],
    "Read values, detect trend/anomaly, then infer next-step recommendation."
  )
};

export const inline_2_3_5_0_5 = {
  id: "inline_2_3_5_0_5",
  text: "For critical graph reading using labels, scale, trend, and anomaly checks, what should be done first?",
  options: [
    "Extract pattern: highest, lowest, trend, and anomalies.",
    "Read title, labels, and axis scale carefully.",
    "Form conclusion and prediction with evidence support.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Read title, labels, and axis scale carefully.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Read title, labels, and axis scale carefully.. After that, proceed with Extract pattern: highest, lowest, trend, and anomalies. and then Form conclusion and prediction with evidence support..",
  incorrectOptionFeedback: {
    "Extract pattern: highest, lowest, trend, and anomalies.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Form conclusion and prediction with evidence support.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Read title, labels, and axis scale carefully..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Process Order",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Ordered Workflow",
      steps: [
        "Read title, labels, and axis scale carefully.",
        "Extract pattern: highest, lowest, trend, and anomalies.",
        "Form conclusion and prediction with evidence support."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Extract pattern: highest, lowest, trend, and anomalies.",
      "Read title, labels, and axis scale carefully.",
      "Form conclusion and prediction with evidence support.",
      "Skip validation and finalize immediately"
    ],
    "Read title, labels, and axis scale carefully."
  )
};

export const inline_2_3_5_0_6 = {
  id: "inline_2_3_5_0_6",
  text: "True or False: Checking axis labels and scale is necessary before making graph-based conclusions.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Without scale context, visual comparisons can be misleading.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "graph-interpretation",
    "critical-reading",
    "trend-analysis",
    "module-3",
    "topic-5",
    "reading-and-interpreting-graphs",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Reading and Interpreting Graphs - Rule Validation",
      points: [
        "Interpretation goes beyond reading single values.",
        "Check title, axes, and scale before drawing conclusions.",
        "Look for trend, anomaly, and comparative change.",
        "Truncated axes can exaggerate differences."
      ]
    },
    stepByStep: {
      title: "Reading and Interpreting Graphs - Validation Steps",
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

export const inline_2_3_6_0 = {
  id: "inline_2_3_6_0",
  text: "Class 8B grouped scores are Below 30: 7, 30-39: 11, 40 and above: 12 (total 30). What is the best first teacher action?",
  options: [
    "Target support for the 7 students below 30 while sustaining class-wide progress.",
    "Ignore low scores because majority scored 30 or above.",
    "Retest only the top-scoring group.",
    "Alter scores to reduce performance gap."
  ],
  correctAnswer: "Target support for the 7 students below 30 while sustaining class-wide progress.",
  format: GameFormat.RAINDROP,
  hint: "Data-driven action should prioritize the highest-need group first.",
  hintLevel1: "Data-driven action should prioritize the highest-need group first.",
  hintLevel2: "Below-30 segment indicates immediate remediation need.",
  correctAnswerExplanation: "(A) Prioritized intervention is both fair and effective because it targets the most vulnerable segment first.",
  incorrectOptionFeedback: {
    "Ignore low scores because majority scored 30 or above.": "Ignoring minority struggle contradicts evidence-based teaching.",
    "Retest only the top-scoring group.": "This does not address the group needing support.",
    "Alter scores to reduce performance gap.": "Changing values is unethical and invalidates decisions."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective"
  ],
  remedialBrief: "Correct: Target support for the 7 students below 30 while sustaining class-wide progress..",
  remedialDetail: "Core idea: turning grouped evidence into fair and targeted decisions.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Core Concept",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - How To Solve",
      steps: [
        "Group data and identify major and priority segments.",
        "Quantify each segment using counts or percentages.",
        "Propose an actionable and evidence-based intervention."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Target support for the 7 students below 30 while sustaining class-wide progress.",
      "Ignore low scores because majority scored 30 or above.",
      "Retest only the top-scoring group.",
      "Alter scores to reduce performance gap."
    ],
    "Target support for the 7 students below 30 while sustaining class-wide progress.",
    {
      kind: "grouped-performance",
      rows: [
        {
          band: "Below 30",
          count: 7
        },
        {
          band: "30-39",
          count: 11
        },
        {
          band: "40+",
          count: 12
        }
      ]
    }
  )
};

export const inline_2_3_6_0_1 = {
  id: "inline_2_3_6_0_1",
  text: "In a data-detective classroom task, what does evidence-based decision mean?",
  options: [
    "Actions are chosen using verified data patterns, not guesswork.",
    "Actions are chosen by convenience only.",
    "Actions are chosen by changing data until it fits expectation.",
    "Actions are chosen without checking totals or categories."
  ],
  correctAnswer: "Actions are chosen using verified data patterns, not guesswork.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of turning grouped evidence into fair and targeted decisions.",
  hintLevel1: "Focus on the exact meaning of turning grouped evidence into fair and targeted decisions.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Evidence-based decisions must remain anchored to valid, unaltered data.",
  incorrectOptionFeedback: {
    "Actions are chosen by convenience only.": "Review the definition of turning grouped evidence into fair and targeted decisions and match the option that states it most accurately.",
    "Actions are chosen by changing data until it fits expectation.": "Review the definition of turning grouped evidence into fair and targeted decisions and match the option that states it most accurately.",
    "Actions are chosen without checking totals or categories.": "Review the definition of turning grouped evidence into fair and targeted decisions and match the option that states it most accurately."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "definition-check"
  ],
  remedialBrief: "Correct: Actions are chosen using verified data patterns, not guesswork..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Definition Check",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Definition Strategy",
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
      "Actions are chosen using verified data patterns, not guesswork.",
      "Actions are chosen by convenience only.",
      "Actions are chosen by changing data until it fits expectation.",
      "Actions are chosen without checking totals or categories."
    ],
    "Actions are chosen using verified data patterns, not guesswork."
  )
};

export const inline_2_3_6_0_2 = {
  id: "inline_2_3_6_0_2",
  text: "Using the same grouped score data, what percent of students scored 40 and above?",
  options: [
    "30%",
    "35%",
    "40%",
    "45%"
  ],
  correctAnswer: "40%",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "12 out of 30 equals 0.4, or 40%.",
  incorrectOptionFeedback: {
    "30%": "Use the provided values carefully and apply the relevant rule/formula for turning grouped evidence into fair and targeted decisions.",
    "35%": "Use the provided values carefully and apply the relevant rule/formula for turning grouped evidence into fair and targeted decisions.",
    "45%": "Use the provided values carefully and apply the relevant rule/formula for turning grouped evidence into fair and targeted decisions."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 40%.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Quantitative Check",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Quant Strategy",
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
      "30%",
      "35%",
      "40%",
      "45%"
    ],
    "40%"
  )
};

export const inline_2_3_6_0_3 = {
  id: "inline_2_3_6_0_3",
  text: "A student says: \"To make intervention plans look better, it is okay to modify a few original values.\" Which response is most accurate?",
  options: [
    "Yes, minor changes are acceptable when purpose is positive.",
    "No. Data must remain unchanged; only analysis and representation should be adjusted.",
    "Yes, changing values saves time in planning.",
    "Data integrity matters only in board exams, not classroom tasks."
  ],
  correctAnswer: "No. Data must remain unchanged; only analysis and representation should be adjusted.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with turning grouped evidence into fair and targeted decisions.",
  correctAnswerExplanation: "Ethical and valid analytics require preserving original observations.",
  incorrectOptionFeedback: {
    "Yes, minor changes are acceptable when purpose is positive.": "This response does not correctly address the misconception. Re-anchor to the rule for turning grouped evidence into fair and targeted decisions.",
    "Yes, changing values saves time in planning.": "This response does not correctly address the misconception. Re-anchor to the rule for turning grouped evidence into fair and targeted decisions.",
    "Data integrity matters only in board exams, not classroom tasks.": "This response does not correctly address the misconception. Re-anchor to the rule for turning grouped evidence into fair and targeted decisions."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Data must remain unchanged; only analysis and representation should be adjusted..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Misconception Repair",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Error Correction Flow",
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
      "Yes, minor changes are acceptable when purpose is positive.",
      "No. Data must remain unchanged; only analysis and representation should be adjusted.",
      "Yes, changing values saves time in planning.",
      "Data integrity matters only in board exams, not classroom tasks."
    ],
    "No. Data must remain unchanged; only analysis and representation should be adjusted."
  )
};

export const inline_2_3_6_0_4 = {
  id: "inline_2_3_6_0_4",
  text: "You must compare book borrowing by Class 6, 7, 8, 9, 10, and 11. Best graph?",
  options: [
    "Bar graph",
    "Histogram",
    "Pie chart without labels",
    "No visual representation"
  ],
  correctAnswer: "Bar graph",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Class labels are discrete categories, so bar graph is the correct representation.",
  incorrectOptionFeedback: {
    Histogram: "Choose the method that preserves the data type and question intent for turning grouped evidence into fair and targeted decisions.",
    "Pie chart without labels": "Choose the method that preserves the data type and question intent for turning grouped evidence into fair and targeted decisions.",
    "No visual representation": "Choose the method that preserves the data type and question intent for turning grouped evidence into fair and targeted decisions."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "method-selection"
  ],
  remedialBrief: "Best method: Bar graph.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Method Selection",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Method Decision Steps",
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
      "Bar graph",
      "Histogram",
      "Pie chart without labels",
      "No visual representation"
    ],
    "Bar graph"
  )
};

export const inline_2_3_6_0_5 = {
  id: "inline_2_3_6_0_5",
  text: "For turning grouped evidence into fair and targeted decisions, what should be done first?",
  options: [
    "Quantify each segment using counts or percentages.",
    "Group data and identify major and priority segments.",
    "Propose an actionable and evidence-based intervention.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Group data and identify major and priority segments.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Group data and identify major and priority segments.. After that, proceed with Quantify each segment using counts or percentages. and then Propose an actionable and evidence-based intervention..",
  incorrectOptionFeedback: {
    "Quantify each segment using counts or percentages.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Propose an actionable and evidence-based intervention.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Group data and identify major and priority segments..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Process Order",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Ordered Workflow",
      steps: [
        "Group data and identify major and priority segments.",
        "Quantify each segment using counts or percentages.",
        "Propose an actionable and evidence-based intervention."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Quantify each segment using counts or percentages.",
      "Group data and identify major and priority segments.",
      "Propose an actionable and evidence-based intervention.",
      "Skip validation and finalize immediately"
    ],
    "Group data and identify major and priority segments."
  )
};

export const inline_2_3_6_0_6 = {
  id: "inline_2_3_6_0_6",
  text: "True or False: A data-detective conclusion should combine numerical evidence with a clear actionable recommendation.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Data literacy is complete only when analysis informs responsible action.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "data-detective",
    "class-activity",
    "evidence-action",
    "module-3",
    "topic-6",
    "class-activity-data-detective",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Class Activity: Data Detective - Rule Validation",
      points: [
        "Data detective workflow: organize, represent, interpret, decide.",
        "Decision quality depends on identifying priority groups correctly.",
        "Percent conversion improves fairness in comparison.",
        "Ethical handling means preserving original data values."
      ]
    },
    stepByStep: {
      title: "Class Activity: Data Detective - Validation Steps",
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

export const inline_2_3_q1 = inline_2_3_1_0;
export const inline_2_3_q2 = inline_2_3_2_0;
export const inline_2_3_q3 = inline_2_3_3_0;
export const inline_2_3_q4 = inline_2_3_4_0;
export const inline_2_3_q5 = inline_2_3_5_0;
export const inline_2_3_q6 = inline_2_3_6_0;

// Compatibility aliases for existing module files that still import inline_2_1_q* names.
export const inline_2_1_q1 = inline_2_3_q1;
export const inline_2_1_q2 = inline_2_3_q2;
export const inline_2_1_q3 = inline_2_3_q3;
export const inline_2_1_q4 = inline_2_3_q4;
export const inline_2_1_q5 = inline_2_3_q5;
export const inline_2_1_q6 = inline_2_3_q6;
