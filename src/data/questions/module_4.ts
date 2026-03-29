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

export const inline_2_4_1_0 = {
  id: "inline_2_4_1_0",
  text: "A bag has 5 red, 3 blue, and 2 green balls. What is the probability of picking a blue ball?",
  options: [
    "3/10",
    "1/3",
    "3/5",
    "2/10"
  ],
  correctAnswer: "3/10",
  format: GameFormat.RAINDROP,
  hint: "Count total balls first, then favorable blue balls.",
  hintLevel1: "Count total balls first, then favorable blue balls.",
  hintLevel2: "Total is 10 and blue is 3, so use blue over total.",
  correctAnswerExplanation: "(A) 3/10. Probability = favorable/total = 3/10.",
  incorrectOptionFeedback: {
    "1/3": "1/3 would imply equal thirds, but counts are not equally split.",
    "3/5": "3/5 is too large; denominator must be total outcomes (10).",
    "2/10": "2/10 corresponds to green balls, not blue."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-"
  ],
  remedialBrief: "Correct: 3/10.",
  remedialDetail: "Core idea: basic probability as favorable outcomes over total outcomes.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Core Concept",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - How To Solve",
      steps: [
        "List the total number of possible outcomes.",
        "Count outcomes favorable to the event.",
        "Form ratio favorable/total and simplify if needed."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "3/10",
      "1/3",
      "3/5",
      "2/10"
    ],
    "3/10",
    {
      kind: "ball-bag",
      counts: {
        red: 5,
        blue: 3,
        green: 2
      }
    }
  )
};

export const inline_2_4_1_0_1 = {
  id: "inline_2_4_1_0_1",
  text: "Which expression is the correct probability formula?",
  options: [
    "Probability = favorable outcomes / total outcomes",
    "Probability = total outcomes / favorable outcomes",
    "Probability = favorable outcomes + total outcomes",
    "Probability = favorable outcomes x total outcomes"
  ],
  correctAnswer: "Probability = favorable outcomes / total outcomes",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of basic probability as favorable outcomes over total outcomes.",
  hintLevel1: "Focus on the exact meaning of basic probability as favorable outcomes over total outcomes.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Probability is a part-to-whole ratio of favorable outcomes to all outcomes.",
  incorrectOptionFeedback: {
    "Probability = total outcomes / favorable outcomes": "Review the definition of basic probability as favorable outcomes over total outcomes and match the option that states it most accurately.",
    "Probability = favorable outcomes + total outcomes": "Review the definition of basic probability as favorable outcomes over total outcomes and match the option that states it most accurately.",
    "Probability = favorable outcomes x total outcomes": "Review the definition of basic probability as favorable outcomes over total outcomes and match the option that states it most accurately."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "definition-check"
  ],
  remedialBrief: "Correct: Probability = favorable outcomes / total outcomes.",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Definition Check",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Definition Strategy",
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
      "Probability = favorable outcomes / total outcomes",
      "Probability = total outcomes / favorable outcomes",
      "Probability = favorable outcomes + total outcomes",
      "Probability = favorable outcomes x total outcomes"
    ],
    "Probability = favorable outcomes / total outcomes"
  )
};

export const inline_2_4_1_0_2 = {
  id: "inline_2_4_1_0_2",
  text: "A spinner has 4 equal sectors (Red, Blue, Green, Yellow). What is probability of landing on Red?",
  options: [
    "1/2",
    "1/4",
    "1/3",
    "3/4"
  ],
  correctAnswer: "1/4",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "With four equally likely outcomes, each single color has probability 1/4.",
  incorrectOptionFeedback: {
    "1/2": "Use the provided values carefully and apply the relevant rule/formula for basic probability as favorable outcomes over total outcomes.",
    "1/3": "Use the provided values carefully and apply the relevant rule/formula for basic probability as favorable outcomes over total outcomes.",
    "3/4": "Use the provided values carefully and apply the relevant rule/formula for basic probability as favorable outcomes over total outcomes."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 1/4.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Quantitative Check",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Quant Strategy",
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
      "1/2",
      "1/4",
      "1/3",
      "3/4"
    ],
    "1/4"
  )
};

export const inline_2_4_1_0_3 = {
  id: "inline_2_4_1_0_3",
  text: "A student says: \"Probability can be greater than 1 when an event is very likely.\" Which response is most accurate?",
  options: [
    "Yes, very likely events can have probability above 1.",
    "No. Probability is always between 0 and 1 inclusive.",
    "Yes, probability above 1 means guaranteed plus bonus chance.",
    "Probability has no upper bound if outcomes are many."
  ],
  correctAnswer: "No. Probability is always between 0 and 1 inclusive.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with basic probability as favorable outcomes over total outcomes.",
  correctAnswerExplanation: "Probability above 1 is invalid because it would exceed certainty.",
  incorrectOptionFeedback: {
    "Yes, very likely events can have probability above 1.": "This response does not correctly address the misconception. Re-anchor to the rule for basic probability as favorable outcomes over total outcomes.",
    "Yes, probability above 1 means guaranteed plus bonus chance.": "This response does not correctly address the misconception. Re-anchor to the rule for basic probability as favorable outcomes over total outcomes.",
    "Probability has no upper bound if outcomes are many.": "This response does not correctly address the misconception. Re-anchor to the rule for basic probability as favorable outcomes over total outcomes."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Probability is always between 0 and 1 inclusive..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Misconception Repair",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Error Correction Flow",
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
      "Yes, very likely events can have probability above 1.",
      "No. Probability is always between 0 and 1 inclusive.",
      "Yes, probability above 1 means guaranteed plus bonus chance.",
      "Probability has no upper bound if outcomes are many."
    ],
    "No. Probability is always between 0 and 1 inclusive."
  )
};

export const inline_2_4_1_0_4 = {
  id: "inline_2_4_1_0_4",
  text: "Which event is impossible on a standard six-faced die?",
  options: [
    "Getting 7",
    "Getting an even number",
    "Getting a number less than 6",
    "Getting 1 to 6"
  ],
  correctAnswer: "Getting 7",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "A standard die has outcomes 1 through 6 only, so 7 is impossible.",
  incorrectOptionFeedback: {
    "Getting an even number": "Choose the method that preserves the data type and question intent for basic probability as favorable outcomes over total outcomes.",
    "Getting a number less than 6": "Choose the method that preserves the data type and question intent for basic probability as favorable outcomes over total outcomes.",
    "Getting 1 to 6": "Choose the method that preserves the data type and question intent for basic probability as favorable outcomes over total outcomes."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "method-selection"
  ],
  remedialBrief: "Best method: Getting 7.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Method Selection",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Method Decision Steps",
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
      "Getting 7",
      "Getting an even number",
      "Getting a number less than 6",
      "Getting 1 to 6"
    ],
    "Getting 7"
  )
};

export const inline_2_4_1_0_5 = {
  id: "inline_2_4_1_0_5",
  text: "For basic probability as favorable outcomes over total outcomes, what should be done first?",
  options: [
    "Count outcomes favorable to the event.",
    "List the total number of possible outcomes.",
    "Form ratio favorable/total and simplify if needed.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "List the total number of possible outcomes.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: List the total number of possible outcomes.. After that, proceed with Count outcomes favorable to the event. and then Form ratio favorable/total and simplify if needed..",
  incorrectOptionFeedback: {
    "Count outcomes favorable to the event.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Form ratio favorable/total and simplify if needed.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "process-sequencing"
  ],
  remedialBrief: "Start with: List the total number of possible outcomes..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Process Order",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Ordered Workflow",
      steps: [
        "List the total number of possible outcomes.",
        "Count outcomes favorable to the event.",
        "Form ratio favorable/total and simplify if needed."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Count outcomes favorable to the event.",
      "List the total number of possible outcomes.",
      "Form ratio favorable/total and simplify if needed.",
      "Skip validation and finalize immediately"
    ],
    "List the total number of possible outcomes."
  )
};

export const inline_2_4_1_0_6 = {
  id: "inline_2_4_1_0_6",
  text: "True or False: Every probability value must lie in the interval from 0 to 1.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. 0 represents impossibility and 1 represents certainty.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "probability-basics",
    "formula",
    "random-experiments",
    "module-4",
    "topic-1",
    "what-is-probability-",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "What Is Probability? - Rule Validation",
      points: [
        "Probability measures likelihood of an event.",
        "Formula: favorable outcomes divided by total outcomes.",
        "Probability values lie between 0 and 1.",
        "0 means impossible and 1 means certain."
      ]
    },
    stepByStep: {
      title: "What Is Probability? - Validation Steps",
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

export const inline_2_4_2_0 = {
  id: "inline_2_4_2_0",
  text: "A spinner has 3 red sections and 1 blue section of equal size. Which color is more likely?",
  options: [
    "Blue",
    "Red",
    "Both equally likely",
    "Cannot be determined"
  ],
  correctAnswer: "Red",
  format: GameFormat.RAINDROP,
  hint: "Compare number of favorable sections for each color.",
  hintLevel1: "Compare number of favorable sections for each color.",
  hintLevel2: "Red appears in 3 of 4 equal sections.",
  correctAnswerExplanation: "(B) Red. With 3 out of 4 equal sections, red has higher probability than blue.",
  incorrectOptionFeedback: {
    Blue: "Blue has only 1 favorable section out of 4.",
    "Both equally likely": "Equal likelihood needs equal favorable outcomes in equal-size sections.",
    "Cannot be determined": "Here it can be determined directly from section counts."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely"
  ],
  remedialBrief: "Correct: Red.",
  remedialDetail: "Core idea: fairness and bias in random setups.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Core Concept",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - How To Solve",
      steps: [
        "Identify all possible outcomes.",
        "Check whether each outcome has equal chance.",
        "Classify setup as fair/equally-likely or biased/not-equally-likely."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Blue",
      "Red",
      "Both equally likely",
      "Cannot be determined"
    ],
    "Red",
    {
      kind: "spinner",
      sectors: [
        "Red",
        "Red",
        "Red",
        "Blue"
      ]
    }
  )
};

export const inline_2_4_2_0_1 = {
  id: "inline_2_4_2_0_1",
  text: "Events are equally likely when:",
  options: [
    "Each outcome has the same chance of occurring.",
    "One outcome appears most of the time.",
    "Outcomes are listed alphabetically.",
    "There are exactly two outcomes only."
  ],
  correctAnswer: "Each outcome has the same chance of occurring.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of fairness and bias in random setups.",
  hintLevel1: "Focus on the exact meaning of fairness and bias in random setups.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Equal likelihood is about equal chance, not just number of outcomes or labels.",
  incorrectOptionFeedback: {
    "One outcome appears most of the time.": "Review the definition of fairness and bias in random setups and match the option that states it most accurately.",
    "Outcomes are listed alphabetically.": "Review the definition of fairness and bias in random setups and match the option that states it most accurately.",
    "There are exactly two outcomes only.": "Review the definition of fairness and bias in random setups and match the option that states it most accurately."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "definition-check"
  ],
  remedialBrief: "Correct: Each outcome has the same chance of occurring..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Definition Check",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Definition Strategy",
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
      "Each outcome has the same chance of occurring.",
      "One outcome appears most of the time.",
      "Outcomes are listed alphabetically.",
      "There are exactly two outcomes only."
    ],
    "Each outcome has the same chance of occurring."
  )
};

export const inline_2_4_2_0_2 = {
  id: "inline_2_4_2_0_2",
  text: "A bag has 9 red balls and 1 blue ball. What is probability of blue?",
  options: [
    "1/10",
    "1/2",
    "9/10",
    "10/1"
  ],
  correctAnswer: "1/10",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Blue favorable outcomes = 1, total = 10, so probability is 1/10.",
  incorrectOptionFeedback: {
    "1/2": "Use the provided values carefully and apply the relevant rule/formula for fairness and bias in random setups.",
    "9/10": "Use the provided values carefully and apply the relevant rule/formula for fairness and bias in random setups.",
    "10/1": "Use the provided values carefully and apply the relevant rule/formula for fairness and bias in random setups."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 1/10.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Quantitative Check",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Quant Strategy",
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
      "1/10",
      "1/2",
      "9/10",
      "10/1"
    ],
    "1/10"
  )
};

export const inline_2_4_2_0_3 = {
  id: "inline_2_4_2_0_3",
  text: "A student says: \"If two colors exist in a bag, they are always equally likely.\" Which response is most accurate?",
  options: [
    "Yes, two outcomes always imply 1/2 each.",
    "No. Equal likelihood depends on counts/proportions, not just number of color names.",
    "Yes, probability ignores how many balls each color has.",
    "Color names determine chance more than quantity does."
  ],
  correctAnswer: "No. Equal likelihood depends on counts/proportions, not just number of color names.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with fairness and bias in random setups.",
  correctAnswerExplanation: "Outcome labels do not determine probability; distribution does.",
  incorrectOptionFeedback: {
    "Yes, two outcomes always imply 1/2 each.": "This response does not correctly address the misconception. Re-anchor to the rule for fairness and bias in random setups.",
    "Yes, probability ignores how many balls each color has.": "This response does not correctly address the misconception. Re-anchor to the rule for fairness and bias in random setups.",
    "Color names determine chance more than quantity does.": "This response does not correctly address the misconception. Re-anchor to the rule for fairness and bias in random setups."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Equal likelihood depends on counts/proportions, not just number of color names..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Misconception Repair",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Error Correction Flow",
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
      "Yes, two outcomes always imply 1/2 each.",
      "No. Equal likelihood depends on counts/proportions, not just number of color names.",
      "Yes, probability ignores how many balls each color has.",
      "Color names determine chance more than quantity does."
    ],
    "No. Equal likelihood depends on counts/proportions, not just number of color names."
  )
};

export const inline_2_4_2_0_4 = {
  id: "inline_2_4_2_0_4",
  text: "Which setup is most likely to be fair for winning on one trial?",
  options: [
    "Spinner with four equal winning/losing sections split 2 and 2",
    "Bag with 9 winning tokens and 1 losing token",
    "Die where 6 appears on three faces",
    "Spinner with one tiny winning section and large losing sections"
  ],
  correctAnswer: "Spinner with four equal winning/losing sections split 2 and 2",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "A balanced setup with equal favorable and unfavorable sections is fairer.",
  incorrectOptionFeedback: {
    "Bag with 9 winning tokens and 1 losing token": "Choose the method that preserves the data type and question intent for fairness and bias in random setups.",
    "Die where 6 appears on three faces": "Choose the method that preserves the data type and question intent for fairness and bias in random setups.",
    "Spinner with one tiny winning section and large losing sections": "Choose the method that preserves the data type and question intent for fairness and bias in random setups."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "method-selection"
  ],
  remedialBrief: "Best method: Spinner with four equal winning/losing sections split 2 and 2.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Method Selection",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Method Decision Steps",
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
      "Spinner with four equal winning/losing sections split 2 and 2",
      "Bag with 9 winning tokens and 1 losing token",
      "Die where 6 appears on three faces",
      "Spinner with one tiny winning section and large losing sections"
    ],
    "Spinner with four equal winning/losing sections split 2 and 2"
  )
};

export const inline_2_4_2_0_5 = {
  id: "inline_2_4_2_0_5",
  text: "For fairness and bias in random setups, what should be done first?",
  options: [
    "Check whether each outcome has equal chance.",
    "Identify all possible outcomes.",
    "Classify setup as fair/equally-likely or biased/not-equally-likely.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Identify all possible outcomes.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Identify all possible outcomes.. After that, proceed with Check whether each outcome has equal chance. and then Classify setup as fair/equally-likely or biased/not-equally-likely..",
  incorrectOptionFeedback: {
    "Check whether each outcome has equal chance.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Classify setup as fair/equally-likely or biased/not-equally-likely.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Identify all possible outcomes..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Process Order",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Ordered Workflow",
      steps: [
        "Identify all possible outcomes.",
        "Check whether each outcome has equal chance.",
        "Classify setup as fair/equally-likely or biased/not-equally-likely."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Check whether each outcome has equal chance.",
      "Identify all possible outcomes.",
      "Classify setup as fair/equally-likely or biased/not-equally-likely.",
      "Skip validation and finalize immediately"
    ],
    "Identify all possible outcomes."
  )
};

export const inline_2_4_2_0_6 = {
  id: "inline_2_4_2_0_6",
  text: "True or False: In a biased setup, outcomes can still be random but not equally likely.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Randomness does not guarantee equal outcome probabilities.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "equally-likely",
    "bias",
    "fairness",
    "module-4",
    "topic-2",
    "equally-likely-vs-not-equally-likely",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Equally Likely vs Not Equally Likely - Rule Validation",
      points: [
        "Equally likely means all outcomes have same chance.",
        "Biased setups make some outcomes more likely than others.",
        "Fair games require balanced outcome chances.",
        "Outcome count and outcome probability are not always the same in biased systems."
      ]
    },
    stepByStep: {
      title: "Equally Likely vs Not Equally Likely - Validation Steps",
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

// TOPIC 3

export const inline_2_4_3_0 = {
  id: "inline_2_4_3_0",
  text: "A coin is tossed 20 times and Head appears 12 times. What is experimental probability of Head?",
  options: [
    "12/20",
    "1/2",
    "8/20",
    "20/12"
  ],
  correctAnswer: "12/20",
  format: GameFormat.RAINDROP,
  hint: "Experimental probability uses observed count over total trials.",
  hintLevel1: "Experimental probability uses observed count over total trials.",
  hintLevel2: "Head observed 12 times out of 20 tosses.",
  correctAnswerExplanation: "(A) 12/20 (or 3/5). Use observed frequency over total trials.",
  incorrectOptionFeedback: {
    "1/2": "1/2 is theoretical for a fair coin, not experimental from this dataset.",
    "8/20": "8/20 is Tail probability here, not Head.",
    "20/12": "Probability ratio should be favorable over total, not inverted."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability"
  ],
  remedialBrief: "Correct: 12/20.",
  remedialDetail: "Core idea: comparing expected probability with observed outcomes.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Core Concept",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - How To Solve",
      steps: [
        "Compute theoretical probability from outcome space.",
        "Compute experimental probability from observed data.",
        "Compare both and interpret difference using trial size."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "12/20",
      "1/2",
      "8/20",
      "20/12"
    ],
    "12/20",
    {
      kind: "coin-trials",
      heads: 12,
      tails: 8
    }
  )
};

export const inline_2_4_3_0_1 = {
  id: "inline_2_4_3_0_1",
  text: "Which statement is correct?",
  options: [
    "Theoretical probability is expected mathematically; experimental probability is observed from trials.",
    "Experimental probability is always exactly equal to theoretical probability.",
    "Theoretical probability requires real-life trials every time.",
    "Experimental probability cannot be expressed as a ratio."
  ],
  correctAnswer: "Theoretical probability is expected mathematically; experimental probability is observed from trials.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of comparing expected probability with observed outcomes.",
  hintLevel1: "Focus on the exact meaning of comparing expected probability with observed outcomes.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Theoretical comes from model, experimental from data.",
  incorrectOptionFeedback: {
    "Experimental probability is always exactly equal to theoretical probability.": "Review the definition of comparing expected probability with observed outcomes and match the option that states it most accurately.",
    "Theoretical probability requires real-life trials every time.": "Review the definition of comparing expected probability with observed outcomes and match the option that states it most accurately.",
    "Experimental probability cannot be expressed as a ratio.": "Review the definition of comparing expected probability with observed outcomes and match the option that states it most accurately."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "definition-check"
  ],
  remedialBrief: "Correct: Theoretical probability is expected mathematically; experimental probability is observed from trials..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Definition Check",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Definition Strategy",
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
      "Theoretical probability is expected mathematically; experimental probability is observed from trials.",
      "Experimental probability is always exactly equal to theoretical probability.",
      "Theoretical probability requires real-life trials every time.",
      "Experimental probability cannot be expressed as a ratio."
    ],
    "Theoretical probability is expected mathematically; experimental probability is observed from trials."
  )
};

export const inline_2_4_3_0_2 = {
  id: "inline_2_4_3_0_2",
  text: "For a fair coin, theoretical P(Head) is 1/2. After many trials, experimental P(Head) is expected to:",
  options: [
    "Move closer to 1/2",
    "Always become exactly 0",
    "Always become exactly 1",
    "Move further away from 1/2 every time"
  ],
  correctAnswer: "Move closer to 1/2",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "With increasing trials, observed proportion typically stabilizes near theoretical probability.",
  incorrectOptionFeedback: {
    "Always become exactly 0": "Use the provided values carefully and apply the relevant rule/formula for comparing expected probability with observed outcomes.",
    "Always become exactly 1": "Use the provided values carefully and apply the relevant rule/formula for comparing expected probability with observed outcomes.",
    "Move further away from 1/2 every time": "Use the provided values carefully and apply the relevant rule/formula for comparing expected probability with observed outcomes."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Move closer to 1/2.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Quantitative Check",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Quant Strategy",
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
      "Move closer to 1/2",
      "Always become exactly 0",
      "Always become exactly 1",
      "Move further away from 1/2 every time"
    ],
    "Move closer to 1/2"
  )
};

export const inline_2_4_3_0_3 = {
  id: "inline_2_4_3_0_3",
  text: "A student says: \"If experimental result is not exactly 1/2 in small trials, the coin must be unfair.\" Which response is most accurate?",
  options: [
    "Yes, any deviation from 1/2 proves the coin is biased.",
    "No. Small-sample variation is normal; fairness is judged with larger evidence.",
    "Yes, experimental and theoretical must match exactly in all trial counts.",
    "Theoretical probability becomes invalid after real experimentation."
  ],
  correctAnswer: "No. Small-sample variation is normal; fairness is judged with larger evidence.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with comparing expected probability with observed outcomes.",
  correctAnswerExplanation: "Random fluctuation in limited trials is expected and does not automatically imply bias.",
  incorrectOptionFeedback: {
    "Yes, any deviation from 1/2 proves the coin is biased.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing expected probability with observed outcomes.",
    "Yes, experimental and theoretical must match exactly in all trial counts.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing expected probability with observed outcomes.",
    "Theoretical probability becomes invalid after real experimentation.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing expected probability with observed outcomes."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Small-sample variation is normal; fairness is judged with larger evidence..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Misconception Repair",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Error Correction Flow",
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
      "Yes, any deviation from 1/2 proves the coin is biased.",
      "No. Small-sample variation is normal; fairness is judged with larger evidence.",
      "Yes, experimental and theoretical must match exactly in all trial counts.",
      "Theoretical probability becomes invalid after real experimentation."
    ],
    "No. Small-sample variation is normal; fairness is judged with larger evidence."
  )
};

export const inline_2_4_3_0_4 = {
  id: "inline_2_4_3_0_4",
  text: "To evaluate fairness of a game token, what is the strongest approach?",
  options: [
    "Run many trials, compute experimental probability, and compare with theoretical expectation.",
    "Run one trial and make final conclusion.",
    "Ignore data and trust intuition only.",
    "Use only theoretical probability and never test."
  ],
  correctAnswer: "Run many trials, compute experimental probability, and compare with theoretical expectation.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Large-sample evidence gives more reliable fairness assessment.",
  incorrectOptionFeedback: {
    "Run one trial and make final conclusion.": "Choose the method that preserves the data type and question intent for comparing expected probability with observed outcomes.",
    "Ignore data and trust intuition only.": "Choose the method that preserves the data type and question intent for comparing expected probability with observed outcomes.",
    "Use only theoretical probability and never test.": "Choose the method that preserves the data type and question intent for comparing expected probability with observed outcomes."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "method-selection"
  ],
  remedialBrief: "Best method: Run many trials, compute experimental probability, and compare with theoretical expectation..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Method Selection",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Method Decision Steps",
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
      "Run many trials, compute experimental probability, and compare with theoretical expectation.",
      "Run one trial and make final conclusion.",
      "Ignore data and trust intuition only.",
      "Use only theoretical probability and never test."
    ],
    "Run many trials, compute experimental probability, and compare with theoretical expectation."
  )
};

export const inline_2_4_3_0_5 = {
  id: "inline_2_4_3_0_5",
  text: "For comparing expected probability with observed outcomes, what should be done first?",
  options: [
    "Compute experimental probability from observed data.",
    "Compute theoretical probability from outcome space.",
    "Compare both and interpret difference using trial size.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Compute theoretical probability from outcome space.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Compute theoretical probability from outcome space.. After that, proceed with Compute experimental probability from observed data. and then Compare both and interpret difference using trial size..",
  incorrectOptionFeedback: {
    "Compute experimental probability from observed data.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Compare both and interpret difference using trial size.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Compute theoretical probability from outcome space..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Process Order",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Ordered Workflow",
      steps: [
        "Compute theoretical probability from outcome space.",
        "Compute experimental probability from observed data.",
        "Compare both and interpret difference using trial size."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compute experimental probability from observed data.",
      "Compute theoretical probability from outcome space.",
      "Compare both and interpret difference using trial size.",
      "Skip validation and finalize immediately"
    ],
    "Compute theoretical probability from outcome space."
  )
};

export const inline_2_4_3_0_6 = {
  id: "inline_2_4_3_0_6",
  text: "True or False: As number of trials increases, experimental probability often gets closer to theoretical probability.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. This convergence behavior is a key principle in repeated random experiments.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "experimental-probability",
    "theoretical-probability",
    "law-of-large-numbers",
    "module-4",
    "topic-3",
    "experimental-vs-theoretical-probability",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Experimental vs Theoretical Probability - Rule Validation",
      points: [
        "Theoretical probability is model-based expected value.",
        "Experimental probability is observed ratio from trials.",
        "Small samples can deviate from theoretical expectation.",
        "With larger trials, experimental probability tends to move closer to theoretical value."
      ]
    },
    stepByStep: {
      title: "Experimental vs Theoretical Probability - Validation Steps",
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

export const inline_2_4_4_0 = {
  id: "inline_2_4_4_0",
  text: "In a standard deck of 52 cards, what is probability of drawing a king?",
  options: [
    "1/13",
    "1/4",
    "4/13",
    "1/52"
  ],
  correctAnswer: "1/13",
  format: GameFormat.RAINDROP,
  hint: "Count favorable cards first, then divide by total cards.",
  hintLevel1: "Count favorable cards first, then divide by total cards.",
  hintLevel2: "There are 4 kings in 52 cards, simplify 4/52.",
  correctAnswerExplanation: "(A) 1/13. Since 4 kings exist in 52 cards, probability is 4/52 = 1/13.",
  incorrectOptionFeedback: {
    "1/4": "1/4 corresponds to a suit probability (like hearts), not kings.",
    "4/13": "4/13 is too large; denominator must be total outcomes 52 before simplification.",
    "1/52": "There are 4 favorable kings, not one."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports"
  ],
  remedialBrief: "Correct: 1/13.",
  remedialDetail: "Core idea: using probability to analyze fairness and performance outcomes.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Core Concept",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - How To Solve",
      steps: [
        "Model the game outcome space clearly.",
        "Compute target event probability.",
        "Use result for fair-choice or strategy decision."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "1/13",
      "1/4",
      "4/13",
      "1/52"
    ],
    "1/13",
    {
      kind: "card-deck",
      favorable: 4,
      total: 52
    }
  )
};

export const inline_2_4_4_0_1 = {
  id: "inline_2_4_4_0_1",
  text: "Why is probability useful in sports analysis?",
  options: [
    "It helps estimate likelihood of outcomes from past performance data.",
    "It guarantees exact score in next match.",
    "It removes uncertainty completely from games.",
    "It replaces all need for practice and strategy."
  ],
  correctAnswer: "It helps estimate likelihood of outcomes from past performance data.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of using probability to analyze fairness and performance outcomes.",
  hintLevel1: "Focus on the exact meaning of using probability to analyze fairness and performance outcomes.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Probability informs decisions and expectations but does not guarantee results.",
  incorrectOptionFeedback: {
    "It guarantees exact score in next match.": "Review the definition of using probability to analyze fairness and performance outcomes and match the option that states it most accurately.",
    "It removes uncertainty completely from games.": "Review the definition of using probability to analyze fairness and performance outcomes and match the option that states it most accurately.",
    "It replaces all need for practice and strategy.": "Review the definition of using probability to analyze fairness and performance outcomes and match the option that states it most accurately."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "definition-check"
  ],
  remedialBrief: "Correct: It helps estimate likelihood of outcomes from past performance data..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Definition Check",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Definition Strategy",
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
      "It helps estimate likelihood of outcomes from past performance data.",
      "It guarantees exact score in next match.",
      "It removes uncertainty completely from games.",
      "It replaces all need for practice and strategy."
    ],
    "It helps estimate likelihood of outcomes from past performance data."
  )
};

export const inline_2_4_4_0_2 = {
  id: "inline_2_4_4_0_2",
  text: "A batsman scored above 30 in 3 out of 5 recent matches. Estimated probability for scoring above 30 is:",
  options: [
    "3/5",
    "2/5",
    "1/5",
    "5/3"
  ],
  correctAnswer: "3/5",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Estimated probability from observed performance is favorable/total = 3/5.",
  incorrectOptionFeedback: {
    "2/5": "Use the provided values carefully and apply the relevant rule/formula for using probability to analyze fairness and performance outcomes.",
    "1/5": "Use the provided values carefully and apply the relevant rule/formula for using probability to analyze fairness and performance outcomes.",
    "5/3": "Use the provided values carefully and apply the relevant rule/formula for using probability to analyze fairness and performance outcomes."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 3/5.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Quantitative Check",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Quant Strategy",
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
      "3/5",
      "2/5",
      "1/5",
      "5/3"
    ],
    "3/5"
  )
};

export const inline_2_4_4_0_3 = {
  id: "inline_2_4_4_0_3",
  text: "A student says: \"If a player scored low in the last game, high score is now guaranteed next game.\" Which response is most accurate?",
  options: [
    "Yes, probabilities guarantee opposite outcome in next trial.",
    "No. Past outcomes inform probability but do not force guaranteed reversal.",
    "Yes, one previous score determines all future scores.",
    "Probability rules do not apply in sports performance data."
  ],
  correctAnswer: "No. Past outcomes inform probability but do not force guaranteed reversal.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with using probability to analyze fairness and performance outcomes.",
  correctAnswerExplanation: "Probability gives likelihood, not certainty, in performance forecasting.",
  incorrectOptionFeedback: {
    "Yes, probabilities guarantee opposite outcome in next trial.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability to analyze fairness and performance outcomes.",
    "Yes, one previous score determines all future scores.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability to analyze fairness and performance outcomes.",
    "Probability rules do not apply in sports performance data.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability to analyze fairness and performance outcomes."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Past outcomes inform probability but do not force guaranteed reversal..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Misconception Repair",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Error Correction Flow",
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
      "Yes, probabilities guarantee opposite outcome in next trial.",
      "No. Past outcomes inform probability but do not force guaranteed reversal.",
      "Yes, one previous score determines all future scores.",
      "Probability rules do not apply in sports performance data."
    ],
    "No. Past outcomes inform probability but do not force guaranteed reversal."
  )
};

export const inline_2_4_4_0_4 = {
  id: "inline_2_4_4_0_4",
  text: "To test fairness of coin toss before a match, what is valid?",
  options: [
    "Use a balanced coin where Head and Tail are equally likely.",
    "Use a coin weighted toward one side for excitement.",
    "Use coin toss only when one team requests it.",
    "Skip toss and decide randomly by crowd noise."
  ],
  correctAnswer: "Use a balanced coin where Head and Tail are equally likely.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Fairness requires equal chance for both teams in toss-based decisions.",
  incorrectOptionFeedback: {
    "Use a coin weighted toward one side for excitement.": "Choose the method that preserves the data type and question intent for using probability to analyze fairness and performance outcomes.",
    "Use coin toss only when one team requests it.": "Choose the method that preserves the data type and question intent for using probability to analyze fairness and performance outcomes.",
    "Skip toss and decide randomly by crowd noise.": "Choose the method that preserves the data type and question intent for using probability to analyze fairness and performance outcomes."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "method-selection"
  ],
  remedialBrief: "Best method: Use a balanced coin where Head and Tail are equally likely..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Method Selection",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Method Decision Steps",
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
      "Use a balanced coin where Head and Tail are equally likely.",
      "Use a coin weighted toward one side for excitement.",
      "Use coin toss only when one team requests it.",
      "Skip toss and decide randomly by crowd noise."
    ],
    "Use a balanced coin where Head and Tail are equally likely."
  )
};

export const inline_2_4_4_0_5 = {
  id: "inline_2_4_4_0_5",
  text: "For using probability to analyze fairness and performance outcomes, what should be done first?",
  options: [
    "Compute target event probability.",
    "Model the game outcome space clearly.",
    "Use result for fair-choice or strategy decision.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Model the game outcome space clearly.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Model the game outcome space clearly.. After that, proceed with Compute target event probability. and then Use result for fair-choice or strategy decision..",
  incorrectOptionFeedback: {
    "Compute target event probability.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Use result for fair-choice or strategy decision.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Model the game outcome space clearly..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Process Order",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Ordered Workflow",
      steps: [
        "Model the game outcome space clearly.",
        "Compute target event probability.",
        "Use result for fair-choice or strategy decision."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compute target event probability.",
      "Model the game outcome space clearly.",
      "Use result for fair-choice or strategy decision.",
      "Skip validation and finalize immediately"
    ],
    "Model the game outcome space clearly."
  )
};

export const inline_2_4_4_0_6 = {
  id: "inline_2_4_4_0_6",
  text: "True or False: Probability-based sports predictions are useful, but they are not guaranteed outcomes.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Probabilistic forecasts estimate likelihood, not certainties.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "games",
    "sports",
    "applied-probability",
    "module-4",
    "topic-4",
    "probability-in-games-and-sports",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Probability in Games and Sports - Rule Validation",
      points: [
        "Probability supports fairness checks in games.",
        "Sports analytics uses frequencies to estimate likely outcomes.",
        "Card and dice probabilities rely on known outcome spaces.",
        "Predictions are probabilistic, not guaranteed."
      ]
    },
    stepByStep: {
      title: "Probability in Games and Sports - Validation Steps",
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

export const inline_2_4_5_0 = {
  id: "inline_2_4_5_0",
  text: "You draw one card from a deck and do NOT replace it. Is the second draw independent of the first?",
  options: [
    "Yes, always independent",
    "No, it is dependent",
    "Independent only if first card is red",
    "Cannot be classified"
  ],
  correctAnswer: "No, it is dependent",
  format: GameFormat.RAINDROP,
  hint: "Ask if total cards remain same before second draw.",
  hintLevel1: "Ask if total cards remain same before second draw.",
  hintLevel2: "Without replacement, total changes from 52 to 51.",
  correctAnswerExplanation: "(B) Dependent. First draw changes available cards, so second probability changes.",
  incorrectOptionFeedback: {
    "Yes, always independent": "Independence fails when sample space changes.",
    "Independent only if first card is red": "Dependence comes from non-replacement, not card color alone.",
    "Cannot be classified": "This situation has a clear classification: dependent."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events"
  ],
  remedialBrief: "Correct: No, it is dependent.",
  remedialDetail: "Core idea: effect of prior outcomes on subsequent probability.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Core Concept",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - How To Solve",
      steps: [
        "Check whether first event changes the second event sample space.",
        "Classify event pair as independent or dependent.",
        "Recompute second-event probability using updated totals if dependent."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Yes, always independent",
      "No, it is dependent",
      "Independent only if first card is red",
      "Cannot be classified"
    ],
    "No, it is dependent",
    {
      kind: "without-replacement",
      totalBefore: 52,
      totalAfter: 51
    }
  )
};

export const inline_2_4_5_0_1 = {
  id: "inline_2_4_5_0_1",
  text: "Events are independent when:",
  options: [
    "Outcome of one event does not change probability of the other.",
    "Both events happen on different days only.",
    "Both events have the same name.",
    "One event has probability greater than 1."
  ],
  correctAnswer: "Outcome of one event does not change probability of the other.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of effect of prior outcomes on subsequent probability.",
  hintLevel1: "Focus on the exact meaning of effect of prior outcomes on subsequent probability.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Independence is about unchanged probability, not time gap or labels.",
  incorrectOptionFeedback: {
    "Both events happen on different days only.": "Review the definition of effect of prior outcomes on subsequent probability and match the option that states it most accurately.",
    "Both events have the same name.": "Review the definition of effect of prior outcomes on subsequent probability and match the option that states it most accurately.",
    "One event has probability greater than 1.": "Review the definition of effect of prior outcomes on subsequent probability and match the option that states it most accurately."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "definition-check"
  ],
  remedialBrief: "Correct: Outcome of one event does not change probability of the other..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Definition Check",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Definition Strategy",
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
      "Outcome of one event does not change probability of the other.",
      "Both events happen on different days only.",
      "Both events have the same name.",
      "One event has probability greater than 1."
    ],
    "Outcome of one event does not change probability of the other."
  )
};

export const inline_2_4_5_0_2 = {
  id: "inline_2_4_5_0_2",
  text: "A bag has 5 red and 5 blue balls. If first draw is red and not replaced, probability of red on second draw is:",
  options: [
    "5/10",
    "4/9",
    "1/2 exactly always",
    "5/9"
  ],
  correctAnswer: "4/9",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "After one red removed, red left = 4 and total left = 9, so probability is 4/9.",
  incorrectOptionFeedback: {
    "5/10": "Use the provided values carefully and apply the relevant rule/formula for effect of prior outcomes on subsequent probability.",
    "1/2 exactly always": "Use the provided values carefully and apply the relevant rule/formula for effect of prior outcomes on subsequent probability.",
    "5/9": "Use the provided values carefully and apply the relevant rule/formula for effect of prior outcomes on subsequent probability."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 4/9.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Quantitative Check",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Quant Strategy",
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
      "5/10",
      "4/9",
      "1/2 exactly always",
      "5/9"
    ],
    "4/9"
  )
};

export const inline_2_4_5_0_3 = {
  id: "inline_2_4_5_0_3",
  text: "A student says: \"Replacement or non-replacement does not affect second-draw probability.\" Which response is most accurate?",
  options: [
    "Yes, second draw probability is fixed forever.",
    "No. Without replacement, counts and denominator change, so probability changes.",
    "Yes, only color names matter, not remaining totals.",
    "Dependence is relevant only in weather forecasting, not draws."
  ],
  correctAnswer: "No. Without replacement, counts and denominator change, so probability changes.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with effect of prior outcomes on subsequent probability.",
  correctAnswerExplanation: "Dependence is a sample-space update concept and is central in sequential draws.",
  incorrectOptionFeedback: {
    "Yes, second draw probability is fixed forever.": "This response does not correctly address the misconception. Re-anchor to the rule for effect of prior outcomes on subsequent probability.",
    "Yes, only color names matter, not remaining totals.": "This response does not correctly address the misconception. Re-anchor to the rule for effect of prior outcomes on subsequent probability.",
    "Dependence is relevant only in weather forecasting, not draws.": "This response does not correctly address the misconception. Re-anchor to the rule for effect of prior outcomes on subsequent probability."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Without replacement, counts and denominator change, so probability changes..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Misconception Repair",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Error Correction Flow",
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
      "Yes, second draw probability is fixed forever.",
      "No. Without replacement, counts and denominator change, so probability changes.",
      "Yes, only color names matter, not remaining totals.",
      "Dependence is relevant only in weather forecasting, not draws."
    ],
    "No. Without replacement, counts and denominator change, so probability changes."
  )
};

export const inline_2_4_5_0_4 = {
  id: "inline_2_4_5_0_4",
  text: "Which pair is independent?",
  options: [
    "Tossing a coin twice with no shared physical dependence",
    "Drawing two cards without replacement",
    "Picking two balls from bag without replacement",
    "Selecting students where first selection removes one student from pool"
  ],
  correctAnswer: "Tossing a coin twice with no shared physical dependence",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Coin tosses are modeled as independent because one toss does not alter next toss probability.",
  incorrectOptionFeedback: {
    "Drawing two cards without replacement": "Choose the method that preserves the data type and question intent for effect of prior outcomes on subsequent probability.",
    "Picking two balls from bag without replacement": "Choose the method that preserves the data type and question intent for effect of prior outcomes on subsequent probability.",
    "Selecting students where first selection removes one student from pool": "Choose the method that preserves the data type and question intent for effect of prior outcomes on subsequent probability."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "method-selection"
  ],
  remedialBrief: "Best method: Tossing a coin twice with no shared physical dependence.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Method Selection",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Method Decision Steps",
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
      "Tossing a coin twice with no shared physical dependence",
      "Drawing two cards without replacement",
      "Picking two balls from bag without replacement",
      "Selecting students where first selection removes one student from pool"
    ],
    "Tossing a coin twice with no shared physical dependence"
  )
};

export const inline_2_4_5_0_5 = {
  id: "inline_2_4_5_0_5",
  text: "For effect of prior outcomes on subsequent probability, what should be done first?",
  options: [
    "Classify event pair as independent or dependent.",
    "Check whether first event changes the second event sample space.",
    "Recompute second-event probability using updated totals if dependent.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Check whether first event changes the second event sample space.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Check whether first event changes the second event sample space.. After that, proceed with Classify event pair as independent or dependent. and then Recompute second-event probability using updated totals if dependent..",
  incorrectOptionFeedback: {
    "Classify event pair as independent or dependent.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Recompute second-event probability using updated totals if dependent.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Check whether first event changes the second event sample space..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Process Order",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Ordered Workflow",
      steps: [
        "Check whether first event changes the second event sample space.",
        "Classify event pair as independent or dependent.",
        "Recompute second-event probability using updated totals if dependent."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Classify event pair as independent or dependent.",
      "Check whether first event changes the second event sample space.",
      "Recompute second-event probability using updated totals if dependent.",
      "Skip validation and finalize immediately"
    ],
    "Check whether first event changes the second event sample space."
  )
};

export const inline_2_4_5_0_6 = {
  id: "inline_2_4_5_0_6",
  text: "True or False: If sample space changes after first event, the next event is typically dependent.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Changing denominator/outcome set implies dependence.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "independent-events",
    "dependent-events",
    "conditional-thinking",
    "module-4",
    "topic-5",
    "independent-vs-dependent-events",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Independent vs Dependent Events - Rule Validation",
      points: [
        "Independent events do not affect each other.",
        "Dependent events change probability based on earlier outcomes.",
        "Replacement often preserves independence in repeated draws.",
        "Without replacement, sample space changes after each draw."
      ]
    },
    stepByStep: {
      title: "Independent vs Dependent Events - Validation Steps",
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

export const inline_2_4_6_0 = {
  id: "inline_2_4_6_0",
  text: "A school fair game has two possible outcomes for a spin: Win and Lose. If spinner sections are equal (2 Win, 2 Lose), what is probability of winning?",
  options: [
    "1/4",
    "1/2",
    "3/4",
    "1"
  ],
  correctAnswer: "1/2",
  format: GameFormat.RAINDROP,
  hint: "Count favorable win sections over total sections.",
  hintLevel1: "Count favorable win sections over total sections.",
  hintLevel2: "2 wins out of 4 total sections simplify to 1/2.",
  correctAnswerExplanation: "(B) 1/2. The setup is balanced with equal win and lose shares.",
  incorrectOptionFeedback: {
    "1": "Probability 1 means certain win, which is not true here.",
    "1/4": "1/4 would mean only one win section out of four.",
    "3/4": "3/4 would require three win sections."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity"
  ],
  remedialBrief: "Correct: 1/2.",
  remedialDetail: "Core idea: using probability evidence for fair and practical decisions.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Core Concept",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - How To Solve",
      steps: [
        "Define decision question and relevant event probabilities.",
        "Compute and compare probabilities using valid data.",
        "Choose action and justify it with evidence and fairness criteria."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "1/4",
      "1/2",
      "3/4",
      "1"
    ],
    "1/2",
    {
      kind: "fair-spinner",
      sectors: {
        win: 2,
        lose: 2
      }
    }
  )
};

export const inline_2_4_6_0_1 = {
  id: "inline_2_4_6_0_1",
  text: "In a probability-based data-detective task, a fair decision means:",
  options: [
    "Decision uses equal-chance logic or clearly justified probability differences.",
    "Decision favors one group regardless of outcomes.",
    "Decision ignores computed probabilities.",
    "Decision changes once graph colors are updated."
  ],
  correctAnswer: "Decision uses equal-chance logic or clearly justified probability differences.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of using probability evidence for fair and practical decisions.",
  hintLevel1: "Focus on the exact meaning of using probability evidence for fair and practical decisions.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Fairness in probabilistic contexts must be transparent and mathematically defensible.",
  incorrectOptionFeedback: {
    "Decision favors one group regardless of outcomes.": "Review the definition of using probability evidence for fair and practical decisions and match the option that states it most accurately.",
    "Decision ignores computed probabilities.": "Review the definition of using probability evidence for fair and practical decisions and match the option that states it most accurately.",
    "Decision changes once graph colors are updated.": "Review the definition of using probability evidence for fair and practical decisions and match the option that states it most accurately."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "definition-check"
  ],
  remedialBrief: "Correct: Decision uses equal-chance logic or clearly justified probability differences..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Definition Check",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Definition Strategy",
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
      "Decision uses equal-chance logic or clearly justified probability differences.",
      "Decision favors one group regardless of outcomes.",
      "Decision ignores computed probabilities.",
      "Decision changes once graph colors are updated."
    ],
    "Decision uses equal-chance logic or clearly justified probability differences."
  )
};

export const inline_2_4_6_0_2 = {
  id: "inline_2_4_6_0_2",
  text: "In attendance data, 18 of 30 students met the target. What is empirical probability that a randomly selected student met target?",
  options: [
    "18/30",
    "12/30",
    "1/3",
    "30/18"
  ],
  correctAnswer: "18/30",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Empirical probability uses observed favorable count over total observations.",
  incorrectOptionFeedback: {
    "12/30": "Use the provided values carefully and apply the relevant rule/formula for using probability evidence for fair and practical decisions.",
    "1/3": "Use the provided values carefully and apply the relevant rule/formula for using probability evidence for fair and practical decisions.",
    "30/18": "Use the provided values carefully and apply the relevant rule/formula for using probability evidence for fair and practical decisions."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 18/30.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Quantitative Check",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Quant Strategy",
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
      "18/30",
      "12/30",
      "1/3",
      "30/18"
    ],
    "18/30"
  )
};

export const inline_2_4_6_0_3 = {
  id: "inline_2_4_6_0_3",
  text: "A student says: \"If computed probability is low, we can ignore that event entirely in planning.\" Which response is most accurate?",
  options: [
    "Yes, only high probability events matter in real decisions.",
    "No. Low probability events may still need planning if impact is significant.",
    "Yes, low probability means impossible.",
    "Probability can replace all judgment about consequences."
  ],
  correctAnswer: "No. Low probability events may still need planning if impact is significant.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with using probability evidence for fair and practical decisions.",
  correctAnswerExplanation: "Decision quality depends on both likelihood and consequence, not likelihood alone.",
  incorrectOptionFeedback: {
    "Yes, only high probability events matter in real decisions.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability evidence for fair and practical decisions.",
    "Yes, low probability means impossible.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability evidence for fair and practical decisions.",
    "Probability can replace all judgment about consequences.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability evidence for fair and practical decisions."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Low probability events may still need planning if impact is significant..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Misconception Repair",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Error Correction Flow",
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
      "Yes, only high probability events matter in real decisions.",
      "No. Low probability events may still need planning if impact is significant.",
      "Yes, low probability means impossible.",
      "Probability can replace all judgment about consequences."
    ],
    "No. Low probability events may still need planning if impact is significant."
  )
};

export const inline_2_4_6_0_4 = {
  id: "inline_2_4_6_0_4",
  text: "What is the best final step after computing probabilities for two game designs?",
  options: [
    "Select the design and justify fairness using calculated evidence.",
    "Pick design by visual appeal only.",
    "Hide calculations and announce a random choice.",
    "Adjust probabilities to make both designs equal on paper."
  ],
  correctAnswer: "Select the design and justify fairness using calculated evidence.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Transparent evidence-based justification is required in a data-detective workflow.",
  incorrectOptionFeedback: {
    "Pick design by visual appeal only.": "Choose the method that preserves the data type and question intent for using probability evidence for fair and practical decisions.",
    "Hide calculations and announce a random choice.": "Choose the method that preserves the data type and question intent for using probability evidence for fair and practical decisions.",
    "Adjust probabilities to make both designs equal on paper.": "Choose the method that preserves the data type and question intent for using probability evidence for fair and practical decisions."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "method-selection"
  ],
  remedialBrief: "Best method: Select the design and justify fairness using calculated evidence..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Method Selection",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Method Decision Steps",
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
      "Select the design and justify fairness using calculated evidence.",
      "Pick design by visual appeal only.",
      "Hide calculations and announce a random choice.",
      "Adjust probabilities to make both designs equal on paper."
    ],
    "Select the design and justify fairness using calculated evidence."
  )
};

export const inline_2_4_6_0_5 = {
  id: "inline_2_4_6_0_5",
  text: "For using probability evidence for fair and practical decisions, what should be done first?",
  options: [
    "Compute and compare probabilities using valid data.",
    "Define decision question and relevant event probabilities.",
    "Choose action and justify it with evidence and fairness criteria.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Define decision question and relevant event probabilities.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Define decision question and relevant event probabilities.. After that, proceed with Compute and compare probabilities using valid data. and then Choose action and justify it with evidence and fairness criteria..",
  incorrectOptionFeedback: {
    "Compute and compare probabilities using valid data.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Choose action and justify it with evidence and fairness criteria.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Define decision question and relevant event probabilities..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Process Order",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Ordered Workflow",
      steps: [
        "Define decision question and relevant event probabilities.",
        "Compute and compare probabilities using valid data.",
        "Choose action and justify it with evidence and fairness criteria."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compute and compare probabilities using valid data.",
      "Define decision question and relevant event probabilities.",
      "Choose action and justify it with evidence and fairness criteria.",
      "Skip validation and finalize immediately"
    ],
    "Define decision question and relevant event probabilities."
  )
};

export const inline_2_4_6_0_6 = {
  id: "inline_2_4_6_0_6",
  text: "True or False: Probability helps make informed decisions but does not provide absolute certainty for one trial.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Probability quantifies likelihood, not guaranteed single-event outcomes.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "decision-making",
    "fairness-check",
    "data-detective",
    "module-4",
    "topic-6",
    "probability-data-detective-activity",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Probability Data Detective Activity - Rule Validation",
      points: [
        "Probability supports transparent and fair decisions.",
        "Data-driven choices should be explainable and verifiable.",
        "Uncertainty remains, so plans should include risk awareness.",
        "Ethical analysis never alters data to fit expectations."
      ]
    },
    stepByStep: {
      title: "Probability Data Detective Activity - Validation Steps",
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

export const inline_2_4_q1 = inline_2_4_1_0;
export const inline_2_4_q2 = inline_2_4_2_0;
export const inline_2_4_q3 = inline_2_4_3_0;
export const inline_2_4_q4 = inline_2_4_4_0;
export const inline_2_4_q5 = inline_2_4_5_0;
export const inline_2_4_q6 = inline_2_4_6_0;

// Compatibility aliases for existing module files that still import inline_2_1_q* names.
export const inline_2_1_q1 = inline_2_4_q1;
export const inline_2_1_q2 = inline_2_4_q2;
export const inline_2_1_q3 = inline_2_4_q3;
export const inline_2_1_q4 = inline_2_4_q4;
export const inline_2_1_q5 = inline_2_4_q5;
export const inline_2_1_q6 = inline_2_4_q6;
