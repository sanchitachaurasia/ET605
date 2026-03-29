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

export const inline_2_5_1_0 = {
  id: "inline_2_5_1_0",
  text: "Weather forecast says chance of rain is 0.7 for the evening commute. What is the most sensible decision?",
  options: [
    "Carry rain protection because rain is likely.",
    "Ignore forecast because 0.7 is not 1.",
    "Assume no rain since forecast is uncertain.",
    "Cancel all travel plans automatically."
  ],
  correctAnswer: "Carry rain protection because rain is likely.",
  format: GameFormat.RAINDROP,
  hint: "A probability of 0.7 means rain is more likely than not.",
  hintLevel1: "A probability of 0.7 means rain is more likely than not.",
  hintLevel2: "Decision should reduce downside risk with low extra cost.",
  correctAnswerExplanation: "(A) Carrying rain protection is a risk-aware choice because 0.7 indicates high likelihood of rain.",
  incorrectOptionFeedback: {
    "Ignore forecast because 0.7 is not 1.": "Probability guidance is useful even when not certain.",
    "Assume no rain since forecast is uncertain.": "Uncertainty does not justify ignoring high-likelihood events.",
    "Cancel all travel plans automatically.": "This may be excessive when a simpler risk-control option exists."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability"
  ],
  remedialBrief: "Correct: Carry rain protection because rain is likely..",
  remedialDetail: "Core idea: using probability for daily decision making under uncertainty.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Core Concept",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - How To Solve",
      steps: [
        "Identify the uncertain event and available evidence.",
        "Estimate event probability from data or forecast.",
        "Choose action that balances risk and practicality."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Carry rain protection because rain is likely.",
      "Ignore forecast because 0.7 is not 1.",
      "Assume no rain since forecast is uncertain.",
      "Cancel all travel plans automatically."
    ],
    "Carry rain protection because rain is likely.",
    {
      kind: "forecast-decision",
      probability: 0.7
    }
  )
};

export const inline_2_5_1_0_1 = {
  id: "inline_2_5_1_0_1",
  text: "In daily life, probability-informed decision means:",
  options: [
    "Choosing actions based on likelihood and impact, not guesswork.",
    "Waiting for certainty before every action.",
    "Ignoring all uncertain data because it is not exact.",
    "Using only intuition and no evidence."
  ],
  correctAnswer: "Choosing actions based on likelihood and impact, not guesswork.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of using probability for daily decision making under uncertainty.",
  hintLevel1: "Focus on the exact meaning of using probability for daily decision making under uncertainty.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Good decisions under uncertainty combine evidence with practical judgment.",
  incorrectOptionFeedback: {
    "Waiting for certainty before every action.": "Review the definition of using probability for daily decision making under uncertainty and match the option that states it most accurately.",
    "Ignoring all uncertain data because it is not exact.": "Review the definition of using probability for daily decision making under uncertainty and match the option that states it most accurately.",
    "Using only intuition and no evidence.": "Review the definition of using probability for daily decision making under uncertainty and match the option that states it most accurately."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "definition-check"
  ],
  remedialBrief: "Correct: Choosing actions based on likelihood and impact, not guesswork..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Definition Check",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Definition Strategy",
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
      "Choosing actions based on likelihood and impact, not guesswork.",
      "Waiting for certainty before every action.",
      "Ignoring all uncertain data because it is not exact.",
      "Using only intuition and no evidence."
    ],
    "Choosing actions based on likelihood and impact, not guesswork."
  )
};

export const inline_2_5_1_0_2 = {
  id: "inline_2_5_1_0_2",
  text: "Out of 100 similar days, it rained on 30 days. Experimental probability of rain is:",
  options: [
    "0.3",
    "0.7",
    "3.0",
    "30.0"
  ],
  correctAnswer: "0.3",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Probability = 30/100 = 0.3.",
  incorrectOptionFeedback: {
    "0.7": "Use the provided values carefully and apply the relevant rule/formula for using probability for daily decision making under uncertainty.",
    "3.0": "Use the provided values carefully and apply the relevant rule/formula for using probability for daily decision making under uncertainty.",
    "30.0": "Use the provided values carefully and apply the relevant rule/formula for using probability for daily decision making under uncertainty."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 0.3.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Quantitative Check",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Quant Strategy",
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
      "0.3",
      "0.7",
      "3.0",
      "30.0"
    ],
    "0.3"
  )
};

export const inline_2_5_1_0_3 = {
  id: "inline_2_5_1_0_3",
  text: "A student says: \"If probability is high, the event is guaranteed to happen.\" Which response is most accurate?",
  options: [
    "Yes, any probability above 0.5 means certainty.",
    "No. High probability means likely, not certain.",
    "Yes, probability and certainty are the same concept.",
    "High probability removes need for contingency planning."
  ],
  correctAnswer: "No. High probability means likely, not certain.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with using probability for daily decision making under uncertainty.",
  correctAnswerExplanation: "Probabilities indicate likelihood. Certainty only occurs at probability 1.",
  incorrectOptionFeedback: {
    "Yes, any probability above 0.5 means certainty.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability for daily decision making under uncertainty.",
    "Yes, probability and certainty are the same concept.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability for daily decision making under uncertainty.",
    "High probability removes need for contingency planning.": "This response does not correctly address the misconception. Re-anchor to the rule for using probability for daily decision making under uncertainty."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. High probability means likely, not certain..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Misconception Repair",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Error Correction Flow",
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
      "Yes, any probability above 0.5 means certainty.",
      "No. High probability means likely, not certain.",
      "Yes, probability and certainty are the same concept.",
      "High probability removes need for contingency planning."
    ],
    "No. High probability means likely, not certain."
  )
};

export const inline_2_5_1_0_4 = {
  id: "inline_2_5_1_0_4",
  text: "When deciding whether to carry an umbrella, which is best?",
  options: [
    "Use forecast probability plus trip importance to decide.",
    "Always carry umbrella regardless of weather data.",
    "Never carry umbrella unless rain already started.",
    "Ignore forecast and flip a coin."
  ],
  correctAnswer: "Use forecast probability plus trip importance to decide.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Decision quality improves when probability is combined with context and impact.",
  incorrectOptionFeedback: {
    "Always carry umbrella regardless of weather data.": "Choose the method that preserves the data type and question intent for using probability for daily decision making under uncertainty.",
    "Never carry umbrella unless rain already started.": "Choose the method that preserves the data type and question intent for using probability for daily decision making under uncertainty.",
    "Ignore forecast and flip a coin.": "Choose the method that preserves the data type and question intent for using probability for daily decision making under uncertainty."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "method-selection"
  ],
  remedialBrief: "Best method: Use forecast probability plus trip importance to decide..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Method Selection",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Method Decision Steps",
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
      "Use forecast probability plus trip importance to decide.",
      "Always carry umbrella regardless of weather data.",
      "Never carry umbrella unless rain already started.",
      "Ignore forecast and flip a coin."
    ],
    "Use forecast probability plus trip importance to decide."
  )
};

export const inline_2_5_1_0_5 = {
  id: "inline_2_5_1_0_5",
  text: "For using probability for daily decision making under uncertainty, what should be done first?",
  options: [
    "Estimate event probability from data or forecast.",
    "Identify the uncertain event and available evidence.",
    "Choose action that balances risk and practicality.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Identify the uncertain event and available evidence.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Identify the uncertain event and available evidence.. After that, proceed with Estimate event probability from data or forecast. and then Choose action that balances risk and practicality..",
  incorrectOptionFeedback: {
    "Estimate event probability from data or forecast.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Choose action that balances risk and practicality.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Identify the uncertain event and available evidence..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Process Order",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Ordered Workflow",
      steps: [
        "Identify the uncertain event and available evidence.",
        "Estimate event probability from data or forecast.",
        "Choose action that balances risk and practicality."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Estimate event probability from data or forecast.",
      "Identify the uncertain event and available evidence.",
      "Choose action that balances risk and practicality.",
      "Skip validation and finalize immediately"
    ],
    "Identify the uncertain event and available evidence."
  )
};

export const inline_2_5_1_0_6 = {
  id: "inline_2_5_1_0_6",
  text: "True or False: Probability can guide better choices even when outcomes are not guaranteed.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Probabilistic reasoning improves planning under uncertainty.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "daily-life",
    "decision-making",
    "uncertainty",
    "module-5",
    "topic-1",
    "everyday-decisions-with-probability",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Everyday Decisions with Probability - Rule Validation",
      points: [
        "Probability supports practical decisions in uncertain situations.",
        "Higher probability suggests stronger caution, not certainty.",
        "Decisions should weigh probability and consequence together.",
        "Evidence-based choices improve outcomes over guesses."
      ]
    },
    stepByStep: {
      title: "Everyday Decisions with Probability - Validation Steps",
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

export const inline_2_5_2_0 = {
  id: "inline_2_5_2_0",
  text: "A store faced stockout on 18 of the last 30 days for a product. Which statement is correct?",
  options: [
    "Estimated stockout probability is 0.6, so reorder planning should be strengthened.",
    "Stockout probability is 0.06, so no action is needed.",
    "Stockout probability is 1.8, so model is invalid and useless.",
    "Stockout risk cannot be estimated from frequency data."
  ],
  correctAnswer: "Estimated stockout probability is 0.6, so reorder planning should be strengthened.",
  format: GameFormat.RAINDROP,
  hint: "Convert frequency to ratio: stockout days over total days.",
  hintLevel1: "Convert frequency to ratio: stockout days over total days.",
  hintLevel2: "18/30 = 0.6, which is high enough to influence planning.",
  correctAnswerExplanation: "(A) 18/30 = 0.6. A 60% stockout rate indicates strong need for inventory intervention.",
  incorrectOptionFeedback: {
    "Stockout probability is 0.06, so no action is needed.": "0.06 misplaces decimal; 18/30 is 0.6.",
    "Stockout probability is 1.8, so model is invalid and useless.": "Probability cannot exceed 1; correct ratio is 0.6.",
    "Stockout risk cannot be estimated from frequency data.": "Frequency data is a valid basis for empirical probability estimates."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions"
  ],
  remedialBrief: "Correct: Estimated stockout probability is 0.6, so reorder planning should be strengthened..",
  remedialDetail: "Core idea: probability-based planning for stock and demand.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Core Concept",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - How To Solve",
      steps: [
        "Estimate demand probability using past records.",
        "Compare risk of shortage against risk of overstock.",
        "Set inventory action and monitor outcomes for update."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Estimated stockout probability is 0.6, so reorder planning should be strengthened.",
      "Stockout probability is 0.06, so no action is needed.",
      "Stockout probability is 1.8, so model is invalid and useless.",
      "Stockout risk cannot be estimated from frequency data."
    ],
    "Estimated stockout probability is 0.6, so reorder planning should be strengthened.",
    {
      kind: "inventory-risk",
      stockoutDays: 18,
      totalDays: 30
    }
  )
};

export const inline_2_5_2_0_1 = {
  id: "inline_2_5_2_0_1",
  text: "In inventory planning, empirical probability is mainly used to:",
  options: [
    "Estimate likely demand/stockout patterns from historical observations.",
    "Guarantee exact sales every day.",
    "Eliminate all uncertainty from business operations.",
    "Replace all financial constraints automatically."
  ],
  correctAnswer: "Estimate likely demand/stockout patterns from historical observations.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of probability-based planning for stock and demand.",
  hintLevel1: "Focus on the exact meaning of probability-based planning for stock and demand.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Probability estimates inform planning but do not guarantee exact future outcomes.",
  incorrectOptionFeedback: {
    "Guarantee exact sales every day.": "Review the definition of probability-based planning for stock and demand and match the option that states it most accurately.",
    "Eliminate all uncertainty from business operations.": "Review the definition of probability-based planning for stock and demand and match the option that states it most accurately.",
    "Replace all financial constraints automatically.": "Review the definition of probability-based planning for stock and demand and match the option that states it most accurately."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "definition-check"
  ],
  remedialBrief: "Correct: Estimate likely demand/stockout patterns from historical observations..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Definition Check",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Definition Strategy",
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
      "Estimate likely demand/stockout patterns from historical observations.",
      "Guarantee exact sales every day.",
      "Eliminate all uncertainty from business operations.",
      "Replace all financial constraints automatically."
    ],
    "Estimate likely demand/stockout patterns from historical observations."
  )
};

export const inline_2_5_2_0_2 = {
  id: "inline_2_5_2_0_2",
  text: "A product sold out in 12 of 20 days. Empirical probability of stockout is:",
  options: [
    "0.2",
    "0.4",
    "0.6",
    "1.2"
  ],
  correctAnswer: "0.6",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "12/20 = 0.6.",
  incorrectOptionFeedback: {
    "0.2": "Use the provided values carefully and apply the relevant rule/formula for probability-based planning for stock and demand.",
    "0.4": "Use the provided values carefully and apply the relevant rule/formula for probability-based planning for stock and demand.",
    "1.2": "Use the provided values carefully and apply the relevant rule/formula for probability-based planning for stock and demand."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 0.6.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Quantitative Check",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Quant Strategy",
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
      "0.2",
      "0.4",
      "0.6",
      "1.2"
    ],
    "0.6"
  )
};

export const inline_2_5_2_0_3 = {
  id: "inline_2_5_2_0_3",
  text: "A student says: \"To avoid all risk, stores should always order the maximum possible stock.\" Which response is most accurate?",
  options: [
    "Yes, maximum stock is always optimal regardless demand pattern.",
    "No. Overstock has cost; planning should balance shortage and holding risk.",
    "Yes, demand probability is irrelevant if warehouse is large.",
    "Profit is always highest when inventory is unlimited."
  ],
  correctAnswer: "No. Overstock has cost; planning should balance shortage and holding risk.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with probability-based planning for stock and demand.",
  correctAnswerExplanation: "Balanced probabilistic planning avoids both shortage losses and excess holding costs.",
  incorrectOptionFeedback: {
    "Yes, maximum stock is always optimal regardless demand pattern.": "This response does not correctly address the misconception. Re-anchor to the rule for probability-based planning for stock and demand.",
    "Yes, demand probability is irrelevant if warehouse is large.": "This response does not correctly address the misconception. Re-anchor to the rule for probability-based planning for stock and demand.",
    "Profit is always highest when inventory is unlimited.": "This response does not correctly address the misconception. Re-anchor to the rule for probability-based planning for stock and demand."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Overstock has cost; planning should balance shortage and holding risk..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Misconception Repair",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Error Correction Flow",
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
      "Yes, maximum stock is always optimal regardless demand pattern.",
      "No. Overstock has cost; planning should balance shortage and holding risk.",
      "Yes, demand probability is irrelevant if warehouse is large.",
      "Profit is always highest when inventory is unlimited."
    ],
    "No. Overstock has cost; planning should balance shortage and holding risk."
  )
};

export const inline_2_5_2_0_4 = {
  id: "inline_2_5_2_0_4",
  text: "Which approach best supports reorder decision?",
  options: [
    "Use demand probabilities, lead time, and safety margin together.",
    "Reorder only when shelves are completely empty.",
    "Set one fixed reorder quantity forever without review.",
    "Choose reorder amount by random guess each week."
  ],
  correctAnswer: "Use demand probabilities, lead time, and safety margin together.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Integrated risk-aware method is more robust than threshold-only or random methods.",
  incorrectOptionFeedback: {
    "Reorder only when shelves are completely empty.": "Choose the method that preserves the data type and question intent for probability-based planning for stock and demand.",
    "Set one fixed reorder quantity forever without review.": "Choose the method that preserves the data type and question intent for probability-based planning for stock and demand.",
    "Choose reorder amount by random guess each week.": "Choose the method that preserves the data type and question intent for probability-based planning for stock and demand."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "method-selection"
  ],
  remedialBrief: "Best method: Use demand probabilities, lead time, and safety margin together..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Method Selection",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Method Decision Steps",
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
      "Use demand probabilities, lead time, and safety margin together.",
      "Reorder only when shelves are completely empty.",
      "Set one fixed reorder quantity forever without review.",
      "Choose reorder amount by random guess each week."
    ],
    "Use demand probabilities, lead time, and safety margin together."
  )
};

export const inline_2_5_2_0_5 = {
  id: "inline_2_5_2_0_5",
  text: "For probability-based planning for stock and demand, what should be done first?",
  options: [
    "Compare risk of shortage against risk of overstock.",
    "Estimate demand probability using past records.",
    "Set inventory action and monitor outcomes for update.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Estimate demand probability using past records.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Estimate demand probability using past records.. After that, proceed with Compare risk of shortage against risk of overstock. and then Set inventory action and monitor outcomes for update..",
  incorrectOptionFeedback: {
    "Compare risk of shortage against risk of overstock.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Set inventory action and monitor outcomes for update.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Estimate demand probability using past records..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Process Order",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Ordered Workflow",
      steps: [
        "Estimate demand probability using past records.",
        "Compare risk of shortage against risk of overstock.",
        "Set inventory action and monitor outcomes for update."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compare risk of shortage against risk of overstock.",
      "Estimate demand probability using past records.",
      "Set inventory action and monitor outcomes for update.",
      "Skip validation and finalize immediately"
    ],
    "Estimate demand probability using past records."
  )
};

export const inline_2_5_2_0_6 = {
  id: "inline_2_5_2_0_6",
  text: "True or False: Probability-based inventory planning can improve service levels while controlling cost risk.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. It helps align stock decisions with observed demand uncertainty.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "business",
    "inventory",
    "forecasting",
    "module-5",
    "topic-2",
    "business-and-inventory-decisions",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Business and Inventory Decisions - Rule Validation",
      points: [
        "Demand uncertainty can be managed through probability estimates.",
        "Stockout and overstock risks should be balanced.",
        "Historical frequencies provide initial decision evidence.",
        "Business decisions should be reviewed with updated data."
      ]
    },
    stepByStep: {
      title: "Business and Inventory Decisions - Validation Steps",
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

export const inline_2_5_3_0 = {
  id: "inline_2_5_3_0",
  text: "A batter scored above 30 runs in 3 of last 5 matches. What is estimated probability of scoring above 30 next match?",
  options: [
    "3/5",
    "2/5",
    "1/5",
    "5/3"
  ],
  correctAnswer: "3/5",
  format: GameFormat.RAINDROP,
  hint: "Use observed successful matches over total matches.",
  hintLevel1: "Use observed successful matches over total matches.",
  hintLevel2: "Favorable outcomes = 3, total = 5.",
  correctAnswerExplanation: "(A) 3/5 based on empirical frequency from recent matches.",
  incorrectOptionFeedback: {
    "2/5": "2/5 would mean only two successful matches, but data says three.",
    "1/5": "1/5 underestimates favorable count from given record.",
    "5/3": "Probability must be favorable/total and cannot exceed 1."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics"
  ],
  remedialBrief: "Correct: 3/5.",
  remedialDetail: "Core idea: estimating likely performance from match data.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Core Concept",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - How To Solve",
      steps: [
        "Collect relevant recent performance observations.",
        "Compute event probability from favorable/total matches.",
        "Use estimate for strategy while acknowledging uncertainty."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "3/5",
      "2/5",
      "1/5",
      "5/3"
    ],
    "3/5",
    {
      kind: "sports-record",
      successes: 3,
      trials: 5
    }
  )
};

export const inline_2_5_3_0_1 = {
  id: "inline_2_5_3_0_1",
  text: "What is the best interpretation of probability in sports analytics?",
  options: [
    "It estimates likelihood based on evidence, not guaranteed outcome.",
    "It predicts exact score with certainty every match.",
    "It removes all role of skill and training.",
    "It works only in coin toss and not in sports data."
  ],
  correctAnswer: "It estimates likelihood based on evidence, not guaranteed outcome.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of estimating likely performance from match data.",
  hintLevel1: "Focus on the exact meaning of estimating likely performance from match data.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Sports probabilities support expectation and planning, not certainty.",
  incorrectOptionFeedback: {
    "It predicts exact score with certainty every match.": "Review the definition of estimating likely performance from match data and match the option that states it most accurately.",
    "It removes all role of skill and training.": "Review the definition of estimating likely performance from match data and match the option that states it most accurately.",
    "It works only in coin toss and not in sports data.": "Review the definition of estimating likely performance from match data and match the option that states it most accurately."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "definition-check"
  ],
  remedialBrief: "Correct: It estimates likelihood based on evidence, not guaranteed outcome..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Definition Check",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Definition Strategy",
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
      "It estimates likelihood based on evidence, not guaranteed outcome.",
      "It predicts exact score with certainty every match.",
      "It removes all role of skill and training.",
      "It works only in coin toss and not in sports data."
    ],
    "It estimates likelihood based on evidence, not guaranteed outcome."
  )
};

export const inline_2_5_3_0_2 = {
  id: "inline_2_5_3_0_2",
  text: "A player converts penalty kicks in 12 out of 20 attempts. Conversion probability estimate is:",
  options: [
    "0.3",
    "0.6",
    "0.8",
    "1.2"
  ],
  correctAnswer: "0.6",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "12/20 = 0.6 estimated conversion probability.",
  incorrectOptionFeedback: {
    "0.3": "Use the provided values carefully and apply the relevant rule/formula for estimating likely performance from match data.",
    "0.8": "Use the provided values carefully and apply the relevant rule/formula for estimating likely performance from match data.",
    "1.2": "Use the provided values carefully and apply the relevant rule/formula for estimating likely performance from match data."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 0.6.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Quantitative Check",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Quant Strategy",
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
      "0.3",
      "0.6",
      "0.8",
      "1.2"
    ],
    "0.6"
  )
};

export const inline_2_5_3_0_3 = {
  id: "inline_2_5_3_0_3",
  text: "A student says: \"One bad game proves the player has permanently low probability of success.\" Which response is most accurate?",
  options: [
    "Yes, one match is always enough for final probability conclusion.",
    "No. Single events do not define long-term probability; use broader evidence.",
    "Yes, latest match should replace all previous data.",
    "Probability should never be updated as new data arrives."
  ],
  correctAnswer: "No. Single events do not define long-term probability; use broader evidence.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with estimating likely performance from match data.",
  correctAnswerExplanation: "Reliable estimates come from sufficient and relevant sample size.",
  incorrectOptionFeedback: {
    "Yes, one match is always enough for final probability conclusion.": "This response does not correctly address the misconception. Re-anchor to the rule for estimating likely performance from match data.",
    "Yes, latest match should replace all previous data.": "This response does not correctly address the misconception. Re-anchor to the rule for estimating likely performance from match data.",
    "Probability should never be updated as new data arrives.": "This response does not correctly address the misconception. Re-anchor to the rule for estimating likely performance from match data."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Single events do not define long-term probability; use broader evidence..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Misconception Repair",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Error Correction Flow",
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
      "Yes, one match is always enough for final probability conclusion.",
      "No. Single events do not define long-term probability; use broader evidence.",
      "Yes, latest match should replace all previous data.",
      "Probability should never be updated as new data arrives."
    ],
    "No. Single events do not define long-term probability; use broader evidence."
  )
};

export const inline_2_5_3_0_4 = {
  id: "inline_2_5_3_0_4",
  text: "When selecting between two players with similar averages, what is useful?",
  options: [
    "Compare consistency probabilities across recent matches.",
    "Choose randomly because probabilities are unnecessary.",
    "Use only one highlight clip as evidence.",
    "Ignore all data and rely on jersey number."
  ],
  correctAnswer: "Compare consistency probabilities across recent matches.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Consistency-oriented probability view can improve selection quality.",
  incorrectOptionFeedback: {
    "Choose randomly because probabilities are unnecessary.": "Choose the method that preserves the data type and question intent for estimating likely performance from match data.",
    "Use only one highlight clip as evidence.": "Choose the method that preserves the data type and question intent for estimating likely performance from match data.",
    "Ignore all data and rely on jersey number.": "Choose the method that preserves the data type and question intent for estimating likely performance from match data."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "method-selection"
  ],
  remedialBrief: "Best method: Compare consistency probabilities across recent matches..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Method Selection",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Method Decision Steps",
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
      "Compare consistency probabilities across recent matches.",
      "Choose randomly because probabilities are unnecessary.",
      "Use only one highlight clip as evidence.",
      "Ignore all data and rely on jersey number."
    ],
    "Compare consistency probabilities across recent matches."
  )
};

export const inline_2_5_3_0_5 = {
  id: "inline_2_5_3_0_5",
  text: "For estimating likely performance from match data, what should be done first?",
  options: [
    "Compute event probability from favorable/total matches.",
    "Collect relevant recent performance observations.",
    "Use estimate for strategy while acknowledging uncertainty.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Collect relevant recent performance observations.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Collect relevant recent performance observations.. After that, proceed with Compute event probability from favorable/total matches. and then Use estimate for strategy while acknowledging uncertainty..",
  incorrectOptionFeedback: {
    "Compute event probability from favorable/total matches.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Use estimate for strategy while acknowledging uncertainty.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Collect relevant recent performance observations..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Process Order",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Ordered Workflow",
      steps: [
        "Collect relevant recent performance observations.",
        "Compute event probability from favorable/total matches.",
        "Use estimate for strategy while acknowledging uncertainty."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compute event probability from favorable/total matches.",
      "Collect relevant recent performance observations.",
      "Use estimate for strategy while acknowledging uncertainty.",
      "Skip validation and finalize immediately"
    ],
    "Collect relevant recent performance observations."
  )
};

export const inline_2_5_3_0_6 = {
  id: "inline_2_5_3_0_6",
  text: "True or False: Past performance probabilities can inform strategy, but cannot guarantee next-match output.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. The next match still has uncertainty.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "sports",
    "performance",
    "empirical-probability",
    "module-5",
    "topic-3",
    "sports-performance-and-statistics",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Sports Performance and Statistics - Rule Validation",
      points: [
        "Past performance frequencies can estimate likely outcomes.",
        "Small samples should be interpreted carefully.",
        "Probability supports strategy but does not guarantee result.",
        "Consistency and context matter in player evaluation."
      ]
    },
    stepByStep: {
      title: "Sports Performance and Statistics - Validation Steps",
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

export const inline_2_5_4_0 = {
  id: "inline_2_5_4_0",
  text: "Forecast says 20% chance of rain tomorrow. Which interpretation is most accurate?",
  options: [
    "Rain is less likely than no rain, but still possible.",
    "It will rain for exactly 20% of the day.",
    "Rainfall amount will be exactly 20 mm.",
    "Rain is impossible tomorrow."
  ],
  correctAnswer: "Rain is less likely than no rain, but still possible.",
  format: GameFormat.RAINDROP,
  hint: "Probability refers to likelihood of event occurrence, not duration or amount.",
  hintLevel1: "Probability refers to likelihood of event occurrence, not duration or amount.",
  hintLevel2: "20% means event can happen but is less likely than not happening.",
  correctAnswerExplanation: "(A) Correct interpretation: 20% indicates lower likelihood, not zero likelihood or duration amount.",
  incorrectOptionFeedback: {
    "It will rain for exactly 20% of the day.": "Probability does not directly indicate duration.",
    "Rainfall amount will be exactly 20 mm.": "Probability does not directly specify rainfall quantity.",
    "Rain is impossible tomorrow.": "Impossible corresponds to 0%, not 20%."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning"
  ],
  remedialBrief: "Correct: Rain is less likely than no rain, but still possible..",
  remedialDetail: "Core idea: interpreting weather probability statements for practical planning.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Core Concept",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - How To Solve",
      steps: [
        "Interpret forecast probability correctly as event likelihood.",
        "Assess consequence if event occurs.",
        "Choose proportional preparation action."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Rain is less likely than no rain, but still possible.",
      "It will rain for exactly 20% of the day.",
      "Rainfall amount will be exactly 20 mm.",
      "Rain is impossible tomorrow."
    ],
    "Rain is less likely than no rain, but still possible.",
    {
      kind: "weather-probability",
      probabilityPercent: 20
    }
  )
};

export const inline_2_5_4_0_1 = {
  id: "inline_2_5_4_0_1",
  text: "A forecast probability is best understood as:",
  options: [
    "Estimated likelihood that the event occurs under similar conditions.",
    "Guaranteed exact weather timeline.",
    "A fixed amount of rain to be received.",
    "A random number with no data basis."
  ],
  correctAnswer: "Estimated likelihood that the event occurs under similar conditions.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of interpreting weather probability statements for practical planning.",
  hintLevel1: "Focus on the exact meaning of interpreting weather probability statements for practical planning.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Forecast probability quantifies risk using model/data context.",
  incorrectOptionFeedback: {
    "Guaranteed exact weather timeline.": "Review the definition of interpreting weather probability statements for practical planning and match the option that states it most accurately.",
    "A fixed amount of rain to be received.": "Review the definition of interpreting weather probability statements for practical planning and match the option that states it most accurately.",
    "A random number with no data basis.": "Review the definition of interpreting weather probability statements for practical planning and match the option that states it most accurately."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "definition-check"
  ],
  remedialBrief: "Correct: Estimated likelihood that the event occurs under similar conditions..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Definition Check",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Definition Strategy",
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
      "Estimated likelihood that the event occurs under similar conditions.",
      "Guaranteed exact weather timeline.",
      "A fixed amount of rain to be received.",
      "A random number with no data basis."
    ],
    "Estimated likelihood that the event occurs under similar conditions."
  )
};

export const inline_2_5_4_0_2 = {
  id: "inline_2_5_4_0_2",
  text: "If heavy rain occurred on 9 of last 15 similar-condition days, empirical probability is:",
  options: [
    "0.2",
    "0.4",
    "0.6",
    "0.9"
  ],
  correctAnswer: "0.6",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "9/15 = 0.6.",
  incorrectOptionFeedback: {
    "0.2": "Use the provided values carefully and apply the relevant rule/formula for interpreting weather probability statements for practical planning.",
    "0.4": "Use the provided values carefully and apply the relevant rule/formula for interpreting weather probability statements for practical planning.",
    "0.9": "Use the provided values carefully and apply the relevant rule/formula for interpreting weather probability statements for practical planning."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 0.6.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Quantitative Check",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Quant Strategy",
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
      "0.2",
      "0.4",
      "0.6",
      "0.9"
    ],
    "0.6"
  )
};

export const inline_2_5_4_0_3 = {
  id: "inline_2_5_4_0_3",
  text: "A student says: \"A 20% rain chance means rain cannot happen and planning is unnecessary.\" Which response is most accurate?",
  options: [
    "Yes, all non-majority probabilities are ignorable.",
    "No. Low probability still allows occurrence, so context-sensitive preparation may be needed.",
    "Yes, only probabilities above 90% matter for planning.",
    "Probability and risk impact are unrelated in planning."
  ],
  correctAnswer: "No. Low probability still allows occurrence, so context-sensitive preparation may be needed.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with interpreting weather probability statements for practical planning.",
  correctAnswerExplanation: "Good planning considers both likelihood and consequence severity.",
  incorrectOptionFeedback: {
    "Yes, all non-majority probabilities are ignorable.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting weather probability statements for practical planning.",
    "Yes, only probabilities above 90% matter for planning.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting weather probability statements for practical planning.",
    "Probability and risk impact are unrelated in planning.": "This response does not correctly address the misconception. Re-anchor to the rule for interpreting weather probability statements for practical planning."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Low probability still allows occurrence, so context-sensitive preparation may be needed..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Misconception Repair",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Error Correction Flow",
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
      "Yes, all non-majority probabilities are ignorable.",
      "No. Low probability still allows occurrence, so context-sensitive preparation may be needed.",
      "Yes, only probabilities above 90% matter for planning.",
      "Probability and risk impact are unrelated in planning."
    ],
    "No. Low probability still allows occurrence, so context-sensitive preparation may be needed."
  )
};

export const inline_2_5_4_0_4 = {
  id: "inline_2_5_4_0_4",
  text: "For an outdoor school event with expensive equipment, what is best with 40% rain chance?",
  options: [
    "Prepare contingency (covers/backup venue) instead of ignoring forecast.",
    "Ignore forecast completely and proceed unchanged.",
    "Cancel permanently with no review.",
    "Change event goal to avoid all uncertainty forever."
  ],
  correctAnswer: "Prepare contingency (covers/backup venue) instead of ignoring forecast.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Contingency planning balances uncertainty and operational needs.",
  incorrectOptionFeedback: {
    "Ignore forecast completely and proceed unchanged.": "Choose the method that preserves the data type and question intent for interpreting weather probability statements for practical planning.",
    "Cancel permanently with no review.": "Choose the method that preserves the data type and question intent for interpreting weather probability statements for practical planning.",
    "Change event goal to avoid all uncertainty forever.": "Choose the method that preserves the data type and question intent for interpreting weather probability statements for practical planning."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "method-selection"
  ],
  remedialBrief: "Best method: Prepare contingency (covers/backup venue) instead of ignoring forecast..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Method Selection",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Method Decision Steps",
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
      "Prepare contingency (covers/backup venue) instead of ignoring forecast.",
      "Ignore forecast completely and proceed unchanged.",
      "Cancel permanently with no review.",
      "Change event goal to avoid all uncertainty forever."
    ],
    "Prepare contingency (covers/backup venue) instead of ignoring forecast."
  )
};

export const inline_2_5_4_0_5 = {
  id: "inline_2_5_4_0_5",
  text: "For interpreting weather probability statements for practical planning, what should be done first?",
  options: [
    "Assess consequence if event occurs.",
    "Interpret forecast probability correctly as event likelihood.",
    "Choose proportional preparation action.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Interpret forecast probability correctly as event likelihood.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Interpret forecast probability correctly as event likelihood.. After that, proceed with Assess consequence if event occurs. and then Choose proportional preparation action..",
  incorrectOptionFeedback: {
    "Assess consequence if event occurs.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Choose proportional preparation action.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Interpret forecast probability correctly as event likelihood..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Process Order",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Ordered Workflow",
      steps: [
        "Interpret forecast probability correctly as event likelihood.",
        "Assess consequence if event occurs.",
        "Choose proportional preparation action."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Assess consequence if event occurs.",
      "Interpret forecast probability correctly as event likelihood.",
      "Choose proportional preparation action.",
      "Skip validation and finalize immediately"
    ],
    "Interpret forecast probability correctly as event likelihood."
  )
};

export const inline_2_5_4_0_6 = {
  id: "inline_2_5_4_0_6",
  text: "True or False: Forecast probabilities should be used with impact assessment to make practical decisions.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Decision quality improves when likelihood and consequence are considered together.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "weather",
    "forecasting",
    "public-decisions",
    "module-5",
    "topic-4",
    "weather-and-public-planning",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Weather and Public Planning - Rule Validation",
      points: [
        "Weather probabilities come from model and historical pattern analysis.",
        "Probability statements describe likelihood, not exact timing or amount.",
        "Preparedness decisions should scale with risk level.",
        "Communication of forecast uncertainty is part of data literacy."
      ]
    },
    stepByStep: {
      title: "Weather and Public Planning - Validation Steps",
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

export const inline_2_5_5_0 = {
  id: "inline_2_5_5_0",
  text: "Route A has 5% accident risk, Route B has 12% accident risk under similar conditions. Which route is safer by probability?",
  options: [
    "Route A",
    "Route B",
    "Both equally safe",
    "Cannot compare probabilities"
  ],
  correctAnswer: "Route A",
  format: GameFormat.RAINDROP,
  hint: "Lower probability of harmful event indicates safer option, all else equal.",
  hintLevel1: "Lower probability of harmful event indicates safer option, all else equal.",
  hintLevel2: "Compare 0.05 and 0.12 directly.",
  correctAnswerExplanation: "(A) Route A is safer because 5% risk is lower than 12% risk.",
  incorrectOptionFeedback: {
    "Route B": "12% is higher risk than 5%.",
    "Both equally safe": "Probabilities are clearly different.",
    "Cannot compare probabilities": "Same risk metric allows direct comparison."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up"
  ],
  remedialBrief: "Correct: Route A.",
  remedialDetail: "Core idea: comparing options by probability and consequence.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Core Concept",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - How To Solve",
      steps: [
        "Estimate likelihood for each option-specific risk.",
        "Compare likely impact and required resources.",
        "Select option with best overall risk-benefit balance."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Route A",
      "Route B",
      "Both equally safe",
      "Cannot compare probabilities"
    ],
    "Route A",
    {
      kind: "risk-compare",
      routeA: 0.05,
      routeB: 0.12
    }
  )
};

export const inline_2_5_5_0_1 = {
  id: "inline_2_5_5_0_1",
  text: "In risk comparison, a lower probability harmful event usually means:",
  options: [
    "Lower likelihood of that harm, though impact should still be checked.",
    "The event is impossible and can be ignored fully.",
    "The event has no cost if it occurs.",
    "Probability does not matter if one option is faster."
  ],
  correctAnswer: "Lower likelihood of that harm, though impact should still be checked.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of comparing options by probability and consequence.",
  hintLevel1: "Focus on the exact meaning of comparing options by probability and consequence.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Likelihood and impact should both guide final choice.",
  incorrectOptionFeedback: {
    "The event is impossible and can be ignored fully.": "Review the definition of comparing options by probability and consequence and match the option that states it most accurately.",
    "The event has no cost if it occurs.": "Review the definition of comparing options by probability and consequence and match the option that states it most accurately.",
    "Probability does not matter if one option is faster.": "Review the definition of comparing options by probability and consequence and match the option that states it most accurately."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "definition-check"
  ],
  remedialBrief: "Correct: Lower likelihood of that harm, though impact should still be checked..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Definition Check",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Definition Strategy",
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
      "Lower likelihood of that harm, though impact should still be checked.",
      "The event is impossible and can be ignored fully.",
      "The event has no cost if it occurs.",
      "Probability does not matter if one option is faster."
    ],
    "Lower likelihood of that harm, though impact should still be checked."
  )
};

export const inline_2_5_5_0_2 = {
  id: "inline_2_5_5_0_2",
  text: "Option X fails in 2 of 50 trials; Option Y fails in 6 of 50 trials. Which has lower failure probability?",
  options: [
    "Option X",
    "Option Y",
    "Both equal",
    "Need impossible extra data"
  ],
  correctAnswer: "Option X",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "2/50 is lower than 6/50, so X has lower failure probability.",
  incorrectOptionFeedback: {
    "Option Y": "Use the provided values carefully and apply the relevant rule/formula for comparing options by probability and consequence.",
    "Both equal": "Use the provided values carefully and apply the relevant rule/formula for comparing options by probability and consequence.",
    "Need impossible extra data": "Use the provided values carefully and apply the relevant rule/formula for comparing options by probability and consequence."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Option X.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Quantitative Check",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Quant Strategy",
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
      "Option X",
      "Option Y",
      "Both equal",
      "Need impossible extra data"
    ],
    "Option X"
  )
};

export const inline_2_5_5_0_3 = {
  id: "inline_2_5_5_0_3",
  text: "A student says: \"Any low-probability risk can be ignored without thinking about consequence.\" Which response is most accurate?",
  options: [
    "Yes, low probability always means zero planning needed.",
    "No. Rare events with high impact may still require mitigation.",
    "Yes, only high-frequency risks matter in policy.",
    "Consequence analysis is unrelated to probability decisions."
  ],
  correctAnswer: "No. Rare events with high impact may still require mitigation.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with comparing options by probability and consequence.",
  correctAnswerExplanation: "Risk management combines likelihood and severity.",
  incorrectOptionFeedback: {
    "Yes, low probability always means zero planning needed.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing options by probability and consequence.",
    "Yes, only high-frequency risks matter in policy.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing options by probability and consequence.",
    "Consequence analysis is unrelated to probability decisions.": "This response does not correctly address the misconception. Re-anchor to the rule for comparing options by probability and consequence."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Rare events with high impact may still require mitigation..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Misconception Repair",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Error Correction Flow",
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
      "Yes, low probability always means zero planning needed.",
      "No. Rare events with high impact may still require mitigation.",
      "Yes, only high-frequency risks matter in policy.",
      "Consequence analysis is unrelated to probability decisions."
    ],
    "No. Rare events with high impact may still require mitigation."
  )
};

export const inline_2_5_5_0_4 = {
  id: "inline_2_5_5_0_4",
  text: "Which strategy best reflects probability-based risk management?",
  options: [
    "Prioritize controls for risks with high probability or high consequence.",
    "Treat all risks as identical regardless evidence.",
    "Focus only on easiest risk to discuss publicly.",
    "Never update risk priorities after new data."
  ],
  correctAnswer: "Prioritize controls for risks with high probability or high consequence.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Resource allocation should follow quantitative and impact-aware prioritization.",
  incorrectOptionFeedback: {
    "Treat all risks as identical regardless evidence.": "Choose the method that preserves the data type and question intent for comparing options by probability and consequence.",
    "Focus only on easiest risk to discuss publicly.": "Choose the method that preserves the data type and question intent for comparing options by probability and consequence.",
    "Never update risk priorities after new data.": "Choose the method that preserves the data type and question intent for comparing options by probability and consequence."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "method-selection"
  ],
  remedialBrief: "Best method: Prioritize controls for risks with high probability or high consequence..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Method Selection",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Method Decision Steps",
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
      "Prioritize controls for risks with high probability or high consequence.",
      "Treat all risks as identical regardless evidence.",
      "Focus only on easiest risk to discuss publicly.",
      "Never update risk priorities after new data."
    ],
    "Prioritize controls for risks with high probability or high consequence."
  )
};

export const inline_2_5_5_0_5 = {
  id: "inline_2_5_5_0_5",
  text: "For comparing options by probability and consequence, what should be done first?",
  options: [
    "Compare likely impact and required resources.",
    "Estimate likelihood for each option-specific risk.",
    "Select option with best overall risk-benefit balance.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Estimate likelihood for each option-specific risk.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Estimate likelihood for each option-specific risk.. After that, proceed with Compare likely impact and required resources. and then Select option with best overall risk-benefit balance..",
  incorrectOptionFeedback: {
    "Compare likely impact and required resources.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Select option with best overall risk-benefit balance.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Estimate likelihood for each option-specific risk..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Process Order",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Ordered Workflow",
      steps: [
        "Estimate likelihood for each option-specific risk.",
        "Compare likely impact and required resources.",
        "Select option with best overall risk-benefit balance."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compare likely impact and required resources.",
      "Estimate likelihood for each option-specific risk.",
      "Select option with best overall risk-benefit balance.",
      "Skip validation and finalize immediately"
    ],
    "Estimate likelihood for each option-specific risk."
  )
};

export const inline_2_5_5_0_6 = {
  id: "inline_2_5_5_0_6",
  text: "True or False: A lower probability does not always mean a risk can be ignored entirely.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. High-impact low-likelihood events may still require preparation.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "risk-analysis",
    "comparison",
    "wrap-up",
    "module-5",
    "topic-5",
    "risk-comparison-and-wrap-up",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Risk Comparison and Wrap-Up - Rule Validation",
      points: [
        "Risk-informed decisions compare alternatives quantitatively.",
        "Low-probability events can still matter if impact is high.",
        "Probability supports prioritization of limited resources.",
        "Reasoned comparison is stronger than intuition-only choice."
      ]
    },
    stepByStep: {
      title: "Risk Comparison and Wrap-Up - Validation Steps",
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

export const inline_2_5_6_0 = {
  id: "inline_2_5_6_0",
  text: "A school event expected attendance has 0.75 chance of high turnout based on past records. What is best planning approach?",
  options: [
    "Prepare resources for high turnout while keeping flexible backup for lower turnout.",
    "Assume exact attendance and avoid contingency.",
    "Ignore data and plan for minimum attendance only.",
    "Claim turnout is guaranteed so no review is needed."
  ],
  correctAnswer: "Prepare resources for high turnout while keeping flexible backup for lower turnout.",
  format: GameFormat.RAINDROP,
  hint: "High probability supports strong preparation, not overconfidence.",
  hintLevel1: "High probability supports strong preparation, not overconfidence.",
  hintLevel2: "A robust plan includes likely-case setup plus contingency for uncertainty.",
  correctAnswerExplanation: "(A) This approach uses evidence while respecting remaining uncertainty.",
  incorrectOptionFeedback: {
    "Assume exact attendance and avoid contingency.": "Probability is not certainty; contingency still matters.",
    "Ignore data and plan for minimum attendance only.": "Ignoring strong evidence risks under-preparation.",
    "Claim turnout is guaranteed so no review is needed.": "Guarantee requires probability 1, not 0.75."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions"
  ],
  remedialBrief: "Correct: Prepare resources for high turnout while keeping flexible backup for lower turnout..",
  remedialDetail: "Core idea: integrating probability evidence with judgment and review.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Core Concept",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - How To Solve",
      steps: [
        "Frame decision goal and uncertainty clearly.",
        "Use available probability evidence to choose action.",
        "Review outcomes and update plan with new observations."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Prepare resources for high turnout while keeping flexible backup for lower turnout.",
      "Assume exact attendance and avoid contingency.",
      "Ignore data and plan for minimum attendance only.",
      "Claim turnout is guaranteed so no review is needed."
    ],
    "Prepare resources for high turnout while keeping flexible backup for lower turnout.",
    {
      kind: "planning-probability",
      highTurnoutProbability: 0.75
    }
  )
};

export const inline_2_5_6_0_1 = {
  id: "inline_2_5_6_0_1",
  text: "What makes a probability-based decision mature and responsible?",
  options: [
    "It uses evidence, explains uncertainty, and includes review/update cycle.",
    "It treats probability as a guarantee and stops monitoring.",
    "It avoids documenting assumptions to remain flexible.",
    "It works only when outcomes are certain."
  ],
  correctAnswer: "It uses evidence, explains uncertainty, and includes review/update cycle.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of integrating probability evidence with judgment and review.",
  hintLevel1: "Focus on the exact meaning of integrating probability evidence with judgment and review.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Robust decisions are transparent, evidence-linked, and adaptive.",
  incorrectOptionFeedback: {
    "It treats probability as a guarantee and stops monitoring.": "Review the definition of integrating probability evidence with judgment and review and match the option that states it most accurately.",
    "It avoids documenting assumptions to remain flexible.": "Review the definition of integrating probability evidence with judgment and review and match the option that states it most accurately.",
    "It works only when outcomes are certain.": "Review the definition of integrating probability evidence with judgment and review and match the option that states it most accurately."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "definition-check"
  ],
  remedialBrief: "Correct: It uses evidence, explains uncertainty, and includes review/update cycle..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Definition Check",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Definition Strategy",
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
      "It uses evidence, explains uncertainty, and includes review/update cycle.",
      "It treats probability as a guarantee and stops monitoring.",
      "It avoids documenting assumptions to remain flexible.",
      "It works only when outcomes are certain."
    ],
    "It uses evidence, explains uncertainty, and includes review/update cycle."
  )
};

export const inline_2_5_6_0_2 = {
  id: "inline_2_5_6_0_2",
  text: "If a plan succeeded in 16 of 20 similar cases, empirical success probability is:",
  options: [
    "0.2",
    "0.4",
    "0.8",
    "1.6"
  ],
  correctAnswer: "0.8",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "16/20 = 0.8.",
  incorrectOptionFeedback: {
    "0.2": "Use the provided values carefully and apply the relevant rule/formula for integrating probability evidence with judgment and review.",
    "0.4": "Use the provided values carefully and apply the relevant rule/formula for integrating probability evidence with judgment and review.",
    "1.6": "Use the provided values carefully and apply the relevant rule/formula for integrating probability evidence with judgment and review."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 0.8.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Quantitative Check",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Quant Strategy",
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
      "0.2",
      "0.4",
      "0.8",
      "1.6"
    ],
    "0.8"
  )
};

export const inline_2_5_6_0_3 = {
  id: "inline_2_5_6_0_3",
  text: "A student says: \"Once a probability is computed once, decision plans never need revision.\" Which response is most accurate?",
  options: [
    "Yes, initial estimate is permanent and universally valid.",
    "No. New data can change probability estimates and should inform updates.",
    "Yes, reviewing outcomes introduces bias and should be avoided.",
    "Probability tools should not be reused after first decision."
  ],
  correctAnswer: "No. New data can change probability estimates and should inform updates.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with integrating probability evidence with judgment and review.",
  correctAnswerExplanation: "Adaptive review is central to evidence-driven decision quality.",
  incorrectOptionFeedback: {
    "Yes, initial estimate is permanent and universally valid.": "This response does not correctly address the misconception. Re-anchor to the rule for integrating probability evidence with judgment and review.",
    "Yes, reviewing outcomes introduces bias and should be avoided.": "This response does not correctly address the misconception. Re-anchor to the rule for integrating probability evidence with judgment and review.",
    "Probability tools should not be reused after first decision.": "This response does not correctly address the misconception. Re-anchor to the rule for integrating probability evidence with judgment and review."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. New data can change probability estimates and should inform updates..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Misconception Repair",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Error Correction Flow",
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
      "Yes, initial estimate is permanent and universally valid.",
      "No. New data can change probability estimates and should inform updates.",
      "Yes, reviewing outcomes introduces bias and should be avoided.",
      "Probability tools should not be reused after first decision."
    ],
    "No. New data can change probability estimates and should inform updates."
  )
};

export const inline_2_5_6_0_4 = {
  id: "inline_2_5_6_0_4",
  text: "Which final workflow is strongest for uncertain planning?",
  options: [
    "Estimate -> decide -> monitor outcome -> update model",
    "Guess -> decide -> ignore outcome",
    "Decide -> estimate later if needed",
    "Avoid estimating to stay unbiased"
  ],
  correctAnswer: "Estimate -> decide -> monitor outcome -> update model",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Closed-loop learning strengthens long-term decision quality.",
  incorrectOptionFeedback: {
    "Guess -> decide -> ignore outcome": "Choose the method that preserves the data type and question intent for integrating probability evidence with judgment and review.",
    "Decide -> estimate later if needed": "Choose the method that preserves the data type and question intent for integrating probability evidence with judgment and review.",
    "Avoid estimating to stay unbiased": "Choose the method that preserves the data type and question intent for integrating probability evidence with judgment and review."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "method-selection"
  ],
  remedialBrief: "Best method: Estimate -> decide -> monitor outcome -> update model.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Method Selection",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Method Decision Steps",
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
      "Estimate -> decide -> monitor outcome -> update model",
      "Guess -> decide -> ignore outcome",
      "Decide -> estimate later if needed",
      "Avoid estimating to stay unbiased"
    ],
    "Estimate -> decide -> monitor outcome -> update model"
  )
};

export const inline_2_5_6_0_5 = {
  id: "inline_2_5_6_0_5",
  text: "For integrating probability evidence with judgment and review, what should be done first?",
  options: [
    "Use available probability evidence to choose action.",
    "Frame decision goal and uncertainty clearly.",
    "Review outcomes and update plan with new observations.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Frame decision goal and uncertainty clearly.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Frame decision goal and uncertainty clearly.. After that, proceed with Use available probability evidence to choose action. and then Review outcomes and update plan with new observations..",
  incorrectOptionFeedback: {
    "Use available probability evidence to choose action.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Review outcomes and update plan with new observations.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Frame decision goal and uncertainty clearly..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Process Order",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Ordered Workflow",
      steps: [
        "Frame decision goal and uncertainty clearly.",
        "Use available probability evidence to choose action.",
        "Review outcomes and update plan with new observations."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Use available probability evidence to choose action.",
      "Frame decision goal and uncertainty clearly.",
      "Review outcomes and update plan with new observations.",
      "Skip validation and finalize immediately"
    ],
    "Frame decision goal and uncertainty clearly."
  )
};

export const inline_2_5_6_0_6 = {
  id: "inline_2_5_6_0_6",
  text: "True or False: Evidence-based probability decisions should be revisited when new data becomes available.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Updating with fresh evidence keeps decisions accurate and relevant.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "capstone",
    "reflection",
    "integrated-reasoning",
    "module-5",
    "topic-6",
    "capstone-reflection-smart-decisions",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Capstone Reflection: Smart Decisions - Rule Validation",
      points: [
        "Best decisions combine data evidence and contextual judgment.",
        "Probabilistic plans should be reviewed as new data arrives.",
        "Communication should explain both confidence and uncertainty.",
        "Ethical decision making preserves data integrity and transparency."
      ]
    },
    stepByStep: {
      title: "Capstone Reflection: Smart Decisions - Validation Steps",
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

export const inline_2_5_q1 = inline_2_5_1_0;
export const inline_2_5_q2 = inline_2_5_2_0;
export const inline_2_5_q3 = inline_2_5_3_0;
export const inline_2_5_q4 = inline_2_5_4_0;
export const inline_2_5_q5 = inline_2_5_5_0;
export const inline_2_5_q6 = inline_2_5_6_0;

// Compatibility aliases for existing module files that still import inline_2_1_q* names.
export const inline_2_1_q1 = inline_2_5_q1;
export const inline_2_1_q2 = inline_2_5_q2;
export const inline_2_1_q3 = inline_2_5_q3;
export const inline_2_1_q4 = inline_2_5_q4;
export const inline_2_1_q5 = inline_2_5_q5;
export const inline_2_1_q6 = inline_2_5_q6;
