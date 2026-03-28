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

export const inline_2_6_1_0 = {
  id: "inline_2_6_1_0",
  text: "Heights are grouped in intervals 140-150, 150-160, 160-170 with frequencies. Which graph should be recalled as correct?",
  options: [
    "Histogram",
    "Category bar graph with large gaps",
    "Pie chart",
    "No graph is possible"
  ],
  correctAnswer: "Histogram",
  format: GameFormat.RAINDROP,
  hint: "Grouped continuous intervals indicate histogram use.",
  hintLevel1: "Grouped continuous intervals indicate histogram use.",
  hintLevel2: "Adjacent numeric ranges should be represented with touching bars.",
  correctAnswerExplanation: "(A) Histogram is the correct representation for grouped continuous interval data.",
  incorrectOptionFeedback: {
    "Category bar graph with large gaps": "Large gaps indicate discrete categories, not continuous intervals.",
    "Pie chart": "Pie charts show part-to-whole shares, not grouped distribution shape.",
    "No graph is possible": "A histogram is directly possible and useful here."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall"
  ],
  remedialBrief: "Correct: Histogram.",
  remedialDetail: "Core idea: rapid recall of core data-handling concepts.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Core Concept",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - How To Solve",
      steps: [
        "Read question and identify data type quickly.",
        "Recall the matching rule/formula/graph from memory.",
        "Validate answer with one fast mental check."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Histogram",
      "Category bar graph with large gaps",
      "Pie chart",
      "No graph is possible"
    ],
    "Histogram",
    {
      kind: "revision-card",
      concept: "grouped-continuous -> histogram"
    }
  )
};

export const inline_2_6_1_0_1 = {
  id: "inline_2_6_1_0_1",
  text: "Warm-up recall in revision primarily aims to:",
  options: [
    "Rapidly activate key concepts before deeper problem solving.",
    "Memorize only final answers without understanding.",
    "Skip fundamentals and jump to random hard problems.",
    "Replace all practice with one reading session."
  ],
  correctAnswer: "Rapidly activate key concepts before deeper problem solving.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of rapid recall of core data-handling concepts.",
  hintLevel1: "Focus on the exact meaning of rapid recall of core data-handling concepts.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Warm-up recall primes memory and improves accuracy in later tasks.",
  incorrectOptionFeedback: {
    "Memorize only final answers without understanding.": "Review the definition of rapid recall of core data-handling concepts and match the option that states it most accurately.",
    "Skip fundamentals and jump to random hard problems.": "Review the definition of rapid recall of core data-handling concepts and match the option that states it most accurately.",
    "Replace all practice with one reading session.": "Review the definition of rapid recall of core data-handling concepts and match the option that states it most accurately."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "definition-check"
  ],
  remedialBrief: "Correct: Rapidly activate key concepts before deeper problem solving..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Definition Check",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Definition Strategy",
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
      "Rapidly activate key concepts before deeper problem solving.",
      "Memorize only final answers without understanding.",
      "Skip fundamentals and jump to random hard problems.",
      "Replace all practice with one reading session."
    ],
    "Rapidly activate key concepts before deeper problem solving."
  )
};

export const inline_2_6_1_0_2 = {
  id: "inline_2_6_1_0_2",
  text: "In a pictograph with key 1 symbol = 50 and one half-symbol added, what is value of half-symbol?",
  options: [
    "10",
    "20",
    "25",
    "50"
  ],
  correctAnswer: "25",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Half-symbol value = 50/2 = 25.",
  incorrectOptionFeedback: {
    "10": "Use the provided values carefully and apply the relevant rule/formula for rapid recall of core data-handling concepts.",
    "20": "Use the provided values carefully and apply the relevant rule/formula for rapid recall of core data-handling concepts.",
    "50": "Use the provided values carefully and apply the relevant rule/formula for rapid recall of core data-handling concepts."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 25.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Quantitative Check",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Quant Strategy",
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
      "10",
      "20",
      "25",
      "50"
    ],
    "25"
  )
};

export const inline_2_6_1_0_3 = {
  id: "inline_2_6_1_0_3",
  text: "A student says: \"Revision warm-up should avoid easy concepts because they are a waste of time.\" Which response is most accurate?",
  options: [
    "Yes, only difficult questions should ever be attempted in revision.",
    "No. Quick review of fundamentals reduces basic errors in advanced questions.",
    "Yes, fundamentals never affect performance once learned once.",
    "Warm-up is only for students who are struggling badly."
  ],
  correctAnswer: "No. Quick review of fundamentals reduces basic errors in advanced questions.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with rapid recall of core data-handling concepts.",
  correctAnswerExplanation: "Even strong learners benefit from activating core schemas before complex work.",
  incorrectOptionFeedback: {
    "Yes, only difficult questions should ever be attempted in revision.": "This response does not correctly address the misconception. Re-anchor to the rule for rapid recall of core data-handling concepts.",
    "Yes, fundamentals never affect performance once learned once.": "This response does not correctly address the misconception. Re-anchor to the rule for rapid recall of core data-handling concepts.",
    "Warm-up is only for students who are struggling badly.": "This response does not correctly address the misconception. Re-anchor to the rule for rapid recall of core data-handling concepts."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Quick review of fundamentals reduces basic errors in advanced questions..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Misconception Repair",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Error Correction Flow",
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
      "Yes, only difficult questions should ever be attempted in revision.",
      "No. Quick review of fundamentals reduces basic errors in advanced questions.",
      "Yes, fundamentals never affect performance once learned once.",
      "Warm-up is only for students who are struggling badly."
    ],
    "No. Quick review of fundamentals reduces basic errors in advanced questions."
  )
};

export const inline_2_6_1_0_4 = {
  id: "inline_2_6_1_0_4",
  text: "What is the best first move in any revision question?",
  options: [
    "Classify data/task type before choosing method.",
    "Apply first formula that comes to mind.",
    "Guess quickly to save time.",
    "Ignore units and labels initially."
  ],
  correctAnswer: "Classify data/task type before choosing method.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Correct classification is the gateway to correct method selection.",
  incorrectOptionFeedback: {
    "Apply first formula that comes to mind.": "Choose the method that preserves the data type and question intent for rapid recall of core data-handling concepts.",
    "Guess quickly to save time.": "Choose the method that preserves the data type and question intent for rapid recall of core data-handling concepts.",
    "Ignore units and labels initially.": "Choose the method that preserves the data type and question intent for rapid recall of core data-handling concepts."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "method-selection"
  ],
  remedialBrief: "Best method: Classify data/task type before choosing method..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Method Selection",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Method Decision Steps",
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
      "Classify data/task type before choosing method.",
      "Apply first formula that comes to mind.",
      "Guess quickly to save time.",
      "Ignore units and labels initially."
    ],
    "Classify data/task type before choosing method."
  )
};

export const inline_2_6_1_0_5 = {
  id: "inline_2_6_1_0_5",
  text: "For rapid recall of core data-handling concepts, what should be done first?",
  options: [
    "Recall the matching rule/formula/graph from memory.",
    "Read question and identify data type quickly.",
    "Validate answer with one fast mental check.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Read question and identify data type quickly.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Read question and identify data type quickly.. After that, proceed with Recall the matching rule/formula/graph from memory. and then Validate answer with one fast mental check..",
  incorrectOptionFeedback: {
    "Recall the matching rule/formula/graph from memory.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Validate answer with one fast mental check.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Read question and identify data type quickly..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Process Order",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Ordered Workflow",
      steps: [
        "Read question and identify data type quickly.",
        "Recall the matching rule/formula/graph from memory.",
        "Validate answer with one fast mental check."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Recall the matching rule/formula/graph from memory.",
      "Read question and identify data type quickly.",
      "Validate answer with one fast mental check.",
      "Skip validation and finalize immediately"
    ],
    "Read question and identify data type quickly."
  )
};

export const inline_2_6_1_0_6 = {
  id: "inline_2_6_1_0_6",
  text: "True or False: Strong revision begins with core-concept retrieval before speed-based practice.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Foundational recall improves both speed and correctness.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "revision",
    "warm-up",
    "core-concepts",
    "module-6",
    "topic-1",
    "warm-up-recall",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Warm-Up Recall - Rule Validation",
      points: [
        "Recall starts by identifying data type and objective.",
        "Graph choice depends on structure of data.",
        "Quick checks prevent basic conceptual errors.",
        "Strong foundations accelerate advanced problem solving."
      ]
    },
    stepByStep: {
      title: "Warm-Up Recall - Validation Steps",
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

export const inline_2_6_2_0 = {
  id: "inline_2_6_2_0",
  text: "Which expression should be recalled for basic probability?",
  options: [
    "Favorable outcomes / total outcomes",
    "Total outcomes / favorable outcomes",
    "Favorable outcomes + total outcomes",
    "Favorable outcomes x total outcomes"
  ],
  correctAnswer: "Favorable outcomes / total outcomes",
  format: GameFormat.RAINDROP,
  hint: "Probability compares successful outcomes to all possible outcomes.",
  hintLevel1: "Probability compares successful outcomes to all possible outcomes.",
  hintLevel2: "Think part over whole ratio.",
  correctAnswerExplanation: "(A) Probability = favorable/total is the correct retrieval target.",
  incorrectOptionFeedback: {
    "Total outcomes / favorable outcomes": "This inverts the probability ratio and can exceed 1.",
    "Favorable outcomes + total outcomes": "Addition does not represent likelihood ratio.",
    "Favorable outcomes x total outcomes": "Multiplication is not the probability definition."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2"
  ],
  remedialBrief: "Correct: Favorable outcomes / total outcomes.",
  remedialDetail: "Core idea: retrieving rules and formulas without looking at notes.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Core Concept",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - How To Solve",
      steps: [
        "Attempt retrieval from memory without prompts.",
        "Check against correct rule and identify mismatch.",
        "Reattempt after correction to consolidate learning."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Favorable outcomes / total outcomes",
      "Total outcomes / favorable outcomes",
      "Favorable outcomes + total outcomes",
      "Favorable outcomes x total outcomes"
    ],
    "Favorable outcomes / total outcomes",
    {
      kind: "formula-recall",
      formula: "P(event) = favorable/total"
    }
  )
};

export const inline_2_6_2_0_1 = {
  id: "inline_2_6_2_0_1",
  text: "Active recall means:",
  options: [
    "Trying to remember information from memory before checking notes.",
    "Rereading the same paragraph repeatedly without testing.",
    "Highlighting text in different colors only.",
    "Skipping difficult topics until exam day."
  ],
  correctAnswer: "Trying to remember information from memory before checking notes.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of retrieving rules and formulas without looking at notes.",
  hintLevel1: "Focus on the exact meaning of retrieving rules and formulas without looking at notes.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Retrieval effort drives stronger memory than passive exposure.",
  incorrectOptionFeedback: {
    "Rereading the same paragraph repeatedly without testing.": "Review the definition of retrieving rules and formulas without looking at notes and match the option that states it most accurately.",
    "Highlighting text in different colors only.": "Review the definition of retrieving rules and formulas without looking at notes and match the option that states it most accurately.",
    "Skipping difficult topics until exam day.": "Review the definition of retrieving rules and formulas without looking at notes and match the option that states it most accurately."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "definition-check"
  ],
  remedialBrief: "Correct: Trying to remember information from memory before checking notes..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Definition Check",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Definition Strategy",
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
      "Trying to remember information from memory before checking notes.",
      "Rereading the same paragraph repeatedly without testing.",
      "Highlighting text in different colors only.",
      "Skipping difficult topics until exam day."
    ],
    "Trying to remember information from memory before checking notes."
  )
};

export const inline_2_6_2_0_2 = {
  id: "inline_2_6_2_0_2",
  text: "Using class-interval boundary rule, where does value 20 belong in 10-20 and 20-30?",
  options: [
    "10-20",
    "20-30",
    "Both intervals",
    "Neither interval"
  ],
  correctAnswer: "20-30",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "With lower-inclusive upper-exclusive convention, 20 belongs to 20-30.",
  incorrectOptionFeedback: {
    "10-20": "Use the provided values carefully and apply the relevant rule/formula for retrieving rules and formulas without looking at notes.",
    "Both intervals": "Use the provided values carefully and apply the relevant rule/formula for retrieving rules and formulas without looking at notes.",
    "Neither interval": "Use the provided values carefully and apply the relevant rule/formula for retrieving rules and formulas without looking at notes."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 20-30.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Quantitative Check",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Quant Strategy",
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
      "10-20",
      "20-30",
      "Both intervals",
      "Neither interval"
    ],
    "20-30"
  )
};

export const inline_2_6_2_0_3 = {
  id: "inline_2_6_2_0_3",
  text: "A student says: \"If recall feels hard, it means learning is failing and should be avoided.\" Which response is most accurate?",
  options: [
    "Yes, hard recall always harms learning.",
    "No. Retrieval difficulty often strengthens memory when followed by correction.",
    "Yes, only easy recall should be practiced.",
    "Effort in recall is unrelated to memory growth."
  ],
  correctAnswer: "No. Retrieval difficulty often strengthens memory when followed by correction.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with retrieving rules and formulas without looking at notes.",
  correctAnswerExplanation: "Desirable difficulty in recall improves retention when managed properly.",
  incorrectOptionFeedback: {
    "Yes, hard recall always harms learning.": "This response does not correctly address the misconception. Re-anchor to the rule for retrieving rules and formulas without looking at notes.",
    "Yes, only easy recall should be practiced.": "This response does not correctly address the misconception. Re-anchor to the rule for retrieving rules and formulas without looking at notes.",
    "Effort in recall is unrelated to memory growth.": "This response does not correctly address the misconception. Re-anchor to the rule for retrieving rules and formulas without looking at notes."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Retrieval difficulty often strengthens memory when followed by correction..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Misconception Repair",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Error Correction Flow",
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
      "Yes, hard recall always harms learning.",
      "No. Retrieval difficulty often strengthens memory when followed by correction.",
      "Yes, only easy recall should be practiced.",
      "Effort in recall is unrelated to memory growth."
    ],
    "No. Retrieval difficulty often strengthens memory when followed by correction."
  )
};

export const inline_2_6_2_0_4 = {
  id: "inline_2_6_2_0_4",
  text: "Best cycle for active recall revision is:",
  options: [
    "Recall -> check -> correct -> recall again",
    "Read -> read -> read only",
    "Guess all answers without checking",
    "Skip feedback and move on immediately"
  ],
  correctAnswer: "Recall -> check -> correct -> recall again",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Feedback loop plus re-retrieval consolidates corrected memory traces.",
  incorrectOptionFeedback: {
    "Read -> read -> read only": "Choose the method that preserves the data type and question intent for retrieving rules and formulas without looking at notes.",
    "Guess all answers without checking": "Choose the method that preserves the data type and question intent for retrieving rules and formulas without looking at notes.",
    "Skip feedback and move on immediately": "Choose the method that preserves the data type and question intent for retrieving rules and formulas without looking at notes."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "method-selection"
  ],
  remedialBrief: "Best method: Recall -> check -> correct -> recall again.",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Method Selection",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Method Decision Steps",
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
      "Recall -> check -> correct -> recall again",
      "Read -> read -> read only",
      "Guess all answers without checking",
      "Skip feedback and move on immediately"
    ],
    "Recall -> check -> correct -> recall again"
  )
};

export const inline_2_6_2_0_5 = {
  id: "inline_2_6_2_0_5",
  text: "For retrieving rules and formulas without looking at notes, what should be done first?",
  options: [
    "Check against correct rule and identify mismatch.",
    "Attempt retrieval from memory without prompts.",
    "Reattempt after correction to consolidate learning.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Attempt retrieval from memory without prompts.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Attempt retrieval from memory without prompts.. After that, proceed with Check against correct rule and identify mismatch. and then Reattempt after correction to consolidate learning..",
  incorrectOptionFeedback: {
    "Check against correct rule and identify mismatch.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Reattempt after correction to consolidate learning.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Attempt retrieval from memory without prompts..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Process Order",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Ordered Workflow",
      steps: [
        "Attempt retrieval from memory without prompts.",
        "Check against correct rule and identify mismatch.",
        "Reattempt after correction to consolidate learning."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Check against correct rule and identify mismatch.",
      "Attempt retrieval from memory without prompts.",
      "Reattempt after correction to consolidate learning.",
      "Skip validation and finalize immediately"
    ],
    "Attempt retrieval from memory without prompts."
  )
};

export const inline_2_6_2_0_6 = {
  id: "inline_2_6_2_0_6",
  text: "True or False: Productive struggle during active recall can improve long-term retention.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Retrieval effort followed by correction is a proven learning strategy.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "active-recall",
    "memory",
    "retrieval-practice",
    "module-6",
    "topic-2",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Active Recall - Rule Validation",
      points: [
        "Active recall strengthens long-term retention.",
        "Retrieval practice is more effective than passive rereading.",
        "Errors during recall reveal what needs targeted review.",
        "Short repeated recall cycles improve exam readiness."
      ]
    },
    stepByStep: {
      title: "Active Recall - Validation Steps",
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

export const inline_2_6_3_0 = {
  id: "inline_2_6_3_0",
  text: "Which note style is most effective for exam revision?",
  options: [
    "Short structured notes with definition, rule, and one example.",
    "Long copied textbook paragraphs without highlights.",
    "Only final answers with no method.",
    "Unordered random facts with no headings."
  ],
  correctAnswer: "Short structured notes with definition, rule, and one example.",
  format: GameFormat.RAINDROP,
  hint: "Effective notes should be quickly scannable and test-ready.",
  hintLevel1: "Effective notes should be quickly scannable and test-ready.",
  hintLevel2: "Structure supports fast retrieval under time pressure.",
  correctAnswerExplanation: "(A) Structured concise notes provide maximum revision efficiency.",
  incorrectOptionFeedback: {
    "Long copied textbook paragraphs without highlights.": "Large blocks are harder to retrieve from during revision.",
    "Only final answers with no method.": "Without method, transfer to new questions is weak.",
    "Unordered random facts with no headings.": "Lack of structure increases cognitive load and recall errors."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder"
  ],
  remedialBrief: "Correct: Short structured notes with definition, rule, and one example..",
  remedialDetail: "Core idea: creating concise, high-utility revision notes.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Core Concept",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - How To Solve",
      steps: [
        "Extract core definition/rule from each topic.",
        "Add one minimal worked example or common error note.",
        "Format as quick-check prompts for self-testing."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Short structured notes with definition, rule, and one example.",
      "Long copied textbook paragraphs without highlights.",
      "Only final answers with no method.",
      "Unordered random facts with no headings."
    ],
    "Short structured notes with definition, rule, and one example.",
    {
      kind: "note-template",
      sections: [
        "Definition",
        "Rule",
        "Example",
        "Common Error"
      ]
    }
  )
};

export const inline_2_6_3_0_1 = {
  id: "inline_2_6_3_0_1",
  text: "A smart note should prioritize:",
  options: [
    "Clarity, structure, and recall cues.",
    "Maximum page count.",
    "Decorative formatting over content.",
    "As many unrelated facts as possible."
  ],
  correctAnswer: "Clarity, structure, and recall cues.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of creating concise, high-utility revision notes.",
  hintLevel1: "Focus on the exact meaning of creating concise, high-utility revision notes.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Revision notes are tools for retrieval, not content decoration.",
  incorrectOptionFeedback: {
    "Maximum page count.": "Review the definition of creating concise, high-utility revision notes and match the option that states it most accurately.",
    "Decorative formatting over content.": "Review the definition of creating concise, high-utility revision notes and match the option that states it most accurately.",
    "As many unrelated facts as possible.": "Review the definition of creating concise, high-utility revision notes and match the option that states it most accurately."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "definition-check"
  ],
  remedialBrief: "Correct: Clarity, structure, and recall cues..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Definition Check",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Definition Strategy",
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
      "Clarity, structure, and recall cues.",
      "Maximum page count.",
      "Decorative formatting over content.",
      "As many unrelated facts as possible."
    ],
    "Clarity, structure, and recall cues."
  )
};

export const inline_2_6_3_0_2 = {
  id: "inline_2_6_3_0_2",
  text: "Which line is a strong smart-note entry for pie charts?",
  options: [
    "Sector angle = (value/total) x 360; total angles must be 360.",
    "Pie charts are circles and circles are round.",
    "Always pick the largest sector as answer.",
    "Use pie charts for every data type."
  ],
  correctAnswer: "Sector angle = (value/total) x 360; total angles must be 360.",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "This note captures formula plus verification rule concisely.",
  incorrectOptionFeedback: {
    "Pie charts are circles and circles are round.": "Use the provided values carefully and apply the relevant rule/formula for creating concise, high-utility revision notes.",
    "Always pick the largest sector as answer.": "Use the provided values carefully and apply the relevant rule/formula for creating concise, high-utility revision notes.",
    "Use pie charts for every data type.": "Use the provided values carefully and apply the relevant rule/formula for creating concise, high-utility revision notes."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Sector angle = (value/total) x 360; total angles must be 360..",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Quantitative Check",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Quant Strategy",
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
      "Sector angle = (value/total) x 360; total angles must be 360.",
      "Pie charts are circles and circles are round.",
      "Always pick the largest sector as answer.",
      "Use pie charts for every data type."
    ],
    "Sector angle = (value/total) x 360; total angles must be 360."
  )
};

export const inline_2_6_3_0_3 = {
  id: "inline_2_6_3_0_3",
  text: "A student says: \"Good notes must include everything from textbook word-for-word.\" Which response is most accurate?",
  options: [
    "Yes, longer notes always produce better scores.",
    "No. Good notes compress essentials into retrieval-ready structure.",
    "Yes, copying full text is better than understanding.",
    "Short notes cannot support serious revision."
  ],
  correctAnswer: "No. Good notes compress essentials into retrieval-ready structure.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with creating concise, high-utility revision notes.",
  correctAnswerExplanation: "Selective synthesis improves usable memory and review speed.",
  incorrectOptionFeedback: {
    "Yes, longer notes always produce better scores.": "This response does not correctly address the misconception. Re-anchor to the rule for creating concise, high-utility revision notes.",
    "Yes, copying full text is better than understanding.": "This response does not correctly address the misconception. Re-anchor to the rule for creating concise, high-utility revision notes.",
    "Short notes cannot support serious revision.": "This response does not correctly address the misconception. Re-anchor to the rule for creating concise, high-utility revision notes."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Good notes compress essentials into retrieval-ready structure..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Misconception Repair",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Error Correction Flow",
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
      "Yes, longer notes always produce better scores.",
      "No. Good notes compress essentials into retrieval-ready structure.",
      "Yes, copying full text is better than understanding.",
      "Short notes cannot support serious revision."
    ],
    "No. Good notes compress essentials into retrieval-ready structure."
  )
};

export const inline_2_6_3_0_4 = {
  id: "inline_2_6_3_0_4",
  text: "Which process best builds smart notes?",
  options: [
    "Define key concept -> add rule -> add mini example -> add common error.",
    "Copy random questions only.",
    "Write only topic names and nothing else.",
    "Memorize without writing any notes."
  ],
  correctAnswer: "Define key concept -> add rule -> add mini example -> add common error.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "This process balances conceptual clarity, procedure, and error prevention.",
  incorrectOptionFeedback: {
    "Copy random questions only.": "Choose the method that preserves the data type and question intent for creating concise, high-utility revision notes.",
    "Write only topic names and nothing else.": "Choose the method that preserves the data type and question intent for creating concise, high-utility revision notes.",
    "Memorize without writing any notes.": "Choose the method that preserves the data type and question intent for creating concise, high-utility revision notes."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "method-selection"
  ],
  remedialBrief: "Best method: Define key concept -> add rule -> add mini example -> add common error..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Method Selection",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Method Decision Steps",
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
      "Define key concept -> add rule -> add mini example -> add common error.",
      "Copy random questions only.",
      "Write only topic names and nothing else.",
      "Memorize without writing any notes."
    ],
    "Define key concept -> add rule -> add mini example -> add common error."
  )
};

export const inline_2_6_3_0_5 = {
  id: "inline_2_6_3_0_5",
  text: "For creating concise, high-utility revision notes, what should be done first?",
  options: [
    "Add one minimal worked example or common error note.",
    "Extract core definition/rule from each topic.",
    "Format as quick-check prompts for self-testing.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Extract core definition/rule from each topic.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Extract core definition/rule from each topic.. After that, proceed with Add one minimal worked example or common error note. and then Format as quick-check prompts for self-testing..",
  incorrectOptionFeedback: {
    "Add one minimal worked example or common error note.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Format as quick-check prompts for self-testing.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Extract core definition/rule from each topic..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Process Order",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Ordered Workflow",
      steps: [
        "Extract core definition/rule from each topic.",
        "Add one minimal worked example or common error note.",
        "Format as quick-check prompts for self-testing."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Add one minimal worked example or common error note.",
      "Extract core definition/rule from each topic.",
      "Format as quick-check prompts for self-testing.",
      "Skip validation and finalize immediately"
    ],
    "Extract core definition/rule from each topic."
  )
};

export const inline_2_6_3_0_6 = {
  id: "inline_2_6_3_0_6",
  text: "True or False: Short, structured notes can improve revision speed and retention quality.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Well-structured compression improves retrieval and reduces overload.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "smart-notes",
    "summarization",
    "revision-strategy",
    "module-6",
    "topic-3",
    "smart-notes-builder",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Smart Notes Builder - Rule Validation",
      points: [
        "Smart notes are compact, structured, and retrieval-friendly.",
        "Include definitions, key rules, and one representative example.",
        "Notes should support quick review and self-testing.",
        "Organized notes reduce overload before assessments."
      ]
    },
    stepByStep: {
      title: "Smart Notes Builder - Validation Steps",
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

export const inline_2_6_4_0 = {
  id: "inline_2_6_4_0",
  text: "A mixed problem asks you to group continuous scores, draw graph, and identify most common interval. What should be the first action?",
  options: [
    "Create class intervals and frequency table first.",
    "Write final conclusion before calculations.",
    "Choose random graph without classifying data.",
    "Skip grouping and estimate by eye from raw list."
  ],
  correctAnswer: "Create class intervals and frequency table first.",
  format: GameFormat.RAINDROP,
  hint: "Multi-step tasks need a reliable starting representation.",
  hintLevel1: "Multi-step tasks need a reliable starting representation.",
  hintLevel2: "Grouping first enables valid graphing and later interpretation.",
  correctAnswerExplanation: "(A) Frequency table is foundational for all downstream steps in grouped-data analysis.",
  incorrectOptionFeedback: {
    "Write final conclusion before calculations.": "Conclusion must follow evidence, not precede it.",
    "Choose random graph without classifying data.": "Graph choice must match data type and objective.",
    "Skip grouping and estimate by eye from raw list.": "Unstructured estimation increases error risk."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge"
  ],
  remedialBrief: "Correct: Create class intervals and frequency table first..",
  remedialDetail: "Core idea: solving integrated multi-step data-handling problems.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Core Concept",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - How To Solve",
      steps: [
        "Break problem into sub-steps and choose method for each.",
        "Compute carefully with intermediate checks.",
        "Synthesize numeric result into contextual interpretation."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Create class intervals and frequency table first.",
      "Write final conclusion before calculations.",
      "Choose random graph without classifying data.",
      "Skip grouping and estimate by eye from raw list."
    ],
    "Create class intervals and frequency table first.",
    {
      kind: "workflow",
      steps: [
        "group",
        "graph",
        "interpret"
      ]
    }
  )
};

export const inline_2_6_4_0_1 = {
  id: "inline_2_6_4_0_1",
  text: "Application challenge questions mainly test:",
  options: [
    "Ability to connect concepts and procedures in sequence.",
    "Memory of one isolated formula only.",
    "Handwriting speed under stress.",
    "Ability to avoid all calculations."
  ],
  correctAnswer: "Ability to connect concepts and procedures in sequence.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of solving integrated multi-step data-handling problems.",
  hintLevel1: "Focus on the exact meaning of solving integrated multi-step data-handling problems.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Integration and transfer are core goals of application tasks.",
  incorrectOptionFeedback: {
    "Memory of one isolated formula only.": "Review the definition of solving integrated multi-step data-handling problems and match the option that states it most accurately.",
    "Handwriting speed under stress.": "Review the definition of solving integrated multi-step data-handling problems and match the option that states it most accurately.",
    "Ability to avoid all calculations.": "Review the definition of solving integrated multi-step data-handling problems and match the option that states it most accurately."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "definition-check"
  ],
  remedialBrief: "Correct: Ability to connect concepts and procedures in sequence..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Definition Check",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Definition Strategy",
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
      "Ability to connect concepts and procedures in sequence.",
      "Memory of one isolated formula only.",
      "Handwriting speed under stress.",
      "Ability to avoid all calculations."
    ],
    "Ability to connect concepts and procedures in sequence."
  )
};

export const inline_2_6_4_0_2 = {
  id: "inline_2_6_4_0_2",
  text: "If grouped frequencies are 4, 7, 9, 6, 4, which interval is most common?",
  options: [
    "Frequency 4 interval",
    "Frequency 6 interval",
    "Frequency 7 interval",
    "Frequency 9 interval"
  ],
  correctAnswer: "Frequency 9 interval",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Most common interval (modal class) is the one with highest frequency, 9.",
  incorrectOptionFeedback: {
    "Frequency 4 interval": "Use the provided values carefully and apply the relevant rule/formula for solving integrated multi-step data-handling problems.",
    "Frequency 6 interval": "Use the provided values carefully and apply the relevant rule/formula for solving integrated multi-step data-handling problems.",
    "Frequency 7 interval": "Use the provided values carefully and apply the relevant rule/formula for solving integrated multi-step data-handling problems."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: Frequency 9 interval.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Quantitative Check",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Quant Strategy",
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
      "Frequency 4 interval",
      "Frequency 6 interval",
      "Frequency 7 interval",
      "Frequency 9 interval"
    ],
    "Frequency 9 interval"
  )
};

export const inline_2_6_4_0_3 = {
  id: "inline_2_6_4_0_3",
  text: "A student says: \"In integrated questions, checking intermediate totals is unnecessary if final answer looks reasonable.\" Which response is most accurate?",
  options: [
    "Yes, only final answer format matters.",
    "No. Intermediate verification is essential to ensure final validity.",
    "Yes, checking steps wastes time and lowers marks.",
    "Intermediate errors usually cancel out automatically."
  ],
  correctAnswer: "No. Intermediate verification is essential to ensure final validity.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with solving integrated multi-step data-handling problems.",
  correctAnswerExplanation: "Unchecked intermediate errors often propagate into wrong conclusions.",
  incorrectOptionFeedback: {
    "Yes, only final answer format matters.": "This response does not correctly address the misconception. Re-anchor to the rule for solving integrated multi-step data-handling problems.",
    "Yes, checking steps wastes time and lowers marks.": "This response does not correctly address the misconception. Re-anchor to the rule for solving integrated multi-step data-handling problems.",
    "Intermediate errors usually cancel out automatically.": "This response does not correctly address the misconception. Re-anchor to the rule for solving integrated multi-step data-handling problems."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Intermediate verification is essential to ensure final validity..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Misconception Repair",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Error Correction Flow",
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
      "Yes, only final answer format matters.",
      "No. Intermediate verification is essential to ensure final validity.",
      "Yes, checking steps wastes time and lowers marks.",
      "Intermediate errors usually cancel out automatically."
    ],
    "No. Intermediate verification is essential to ensure final validity."
  )
};

export const inline_2_6_4_0_4 = {
  id: "inline_2_6_4_0_4",
  text: "Best strategy for a blended graph-and-probability application task is:",
  options: [
    "Segment into smaller steps and validate each before moving on.",
    "Attempt all calculations mentally without writing steps.",
    "Start with the hardest formula regardless context.",
    "Ignore units and assumptions to save time."
  ],
  correctAnswer: "Segment into smaller steps and validate each before moving on.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Stepwise decomposition and validation improves reliability in complex tasks.",
  incorrectOptionFeedback: {
    "Attempt all calculations mentally without writing steps.": "Choose the method that preserves the data type and question intent for solving integrated multi-step data-handling problems.",
    "Start with the hardest formula regardless context.": "Choose the method that preserves the data type and question intent for solving integrated multi-step data-handling problems.",
    "Ignore units and assumptions to save time.": "Choose the method that preserves the data type and question intent for solving integrated multi-step data-handling problems."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "method-selection"
  ],
  remedialBrief: "Best method: Segment into smaller steps and validate each before moving on..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Method Selection",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Method Decision Steps",
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
      "Segment into smaller steps and validate each before moving on.",
      "Attempt all calculations mentally without writing steps.",
      "Start with the hardest formula regardless context.",
      "Ignore units and assumptions to save time."
    ],
    "Segment into smaller steps and validate each before moving on."
  )
};

export const inline_2_6_4_0_5 = {
  id: "inline_2_6_4_0_5",
  text: "For solving integrated multi-step data-handling problems, what should be done first?",
  options: [
    "Compute carefully with intermediate checks.",
    "Break problem into sub-steps and choose method for each.",
    "Synthesize numeric result into contextual interpretation.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Break problem into sub-steps and choose method for each.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Break problem into sub-steps and choose method for each.. After that, proceed with Compute carefully with intermediate checks. and then Synthesize numeric result into contextual interpretation..",
  incorrectOptionFeedback: {
    "Compute carefully with intermediate checks.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Synthesize numeric result into contextual interpretation.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Break problem into sub-steps and choose method for each..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Process Order",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Ordered Workflow",
      steps: [
        "Break problem into sub-steps and choose method for each.",
        "Compute carefully with intermediate checks.",
        "Synthesize numeric result into contextual interpretation."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Compute carefully with intermediate checks.",
      "Break problem into sub-steps and choose method for each.",
      "Synthesize numeric result into contextual interpretation.",
      "Skip validation and finalize immediately"
    ],
    "Break problem into sub-steps and choose method for each."
  )
};

export const inline_2_6_4_0_6 = {
  id: "inline_2_6_4_0_6",
  text: "True or False: Application challenges may require combining more than one concept from the chapter.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Integration is the defining feature of challenge-level tasks.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "application",
    "integration",
    "multi-step",
    "module-6",
    "topic-4",
    "application-challenge",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Application Challenge - Rule Validation",
      points: [
        "Real problems may combine graph selection, computation, and interpretation.",
        "Method order matters in multi-step tasks.",
        "Checking intermediate results prevents final-answer errors.",
        "Application skill demonstrates transfer beyond memorization."
      ]
    },
    stepByStep: {
      title: "Application Challenge - Validation Steps",
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

export const inline_2_6_5_0 = {
  id: "inline_2_6_5_0",
  text: "A student repeatedly misreads graph scales. What is the best corrective action?",
  options: [
    "Practice a fixed pre-check: title, axes, scale before solving.",
    "Avoid graph questions entirely.",
    "Guess based on bar height without reading labels.",
    "Memorize final answers from classmates."
  ],
  correctAnswer: "Practice a fixed pre-check: title, axes, scale before solving.",
  format: GameFormat.RAINDROP,
  hint: "Correction should target the root cause of error.",
  hintLevel1: "Correction should target the root cause of error.",
  hintLevel2: "A repeatable checklist prevents the same mistake pattern.",
  correctAnswerExplanation: "(A) Process-level checklist directly addresses scale-reading error source.",
  incorrectOptionFeedback: {
    "Avoid graph questions entirely.": "Avoidance prevents growth and leaves weakness unresolved.",
    "Guess based on bar height without reading labels.": "This repeats the same interpretation error pattern.",
    "Memorize final answers from classmates.": "Without process correction, transfer to new questions fails."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer"
  ],
  remedialBrief: "Correct: Practice a fixed pre-check: title, axes, scale before solving..",
  remedialDetail: "Core idea: learning improvement through error analysis and strategy adjustment.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Core Concept",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - How To Solve",
      steps: [
        "Review incorrect responses and identify error type.",
        "Map each error to concept, process, or arithmetic cause.",
        "Create a focused correction plan for next attempt."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Practice a fixed pre-check: title, axes, scale before solving.",
      "Avoid graph questions entirely.",
      "Guess based on bar height without reading labels.",
      "Memorize final answers from classmates."
    ],
    "Practice a fixed pre-check: title, axes, scale before solving.",
    {
      kind: "reflection-checklist",
      checklist: [
        "title",
        "axis labels",
        "scale",
        "units"
      ]
    }
  )
};

export const inline_2_6_5_0_1 = {
  id: "inline_2_6_5_0_1",
  text: "Reflection in revision means:",
  options: [
    "Analyzing mistakes and improving strategy for future attempts.",
    "Reading only correct answers and skipping mistakes.",
    "Measuring success only by speed.",
    "Ignoring feedback once marks are known."
  ],
  correctAnswer: "Analyzing mistakes and improving strategy for future attempts.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of learning improvement through error analysis and strategy adjustment.",
  hintLevel1: "Focus on the exact meaning of learning improvement through error analysis and strategy adjustment.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Reflection converts errors into actionable improvement plans.",
  incorrectOptionFeedback: {
    "Reading only correct answers and skipping mistakes.": "Review the definition of learning improvement through error analysis and strategy adjustment and match the option that states it most accurately.",
    "Measuring success only by speed.": "Review the definition of learning improvement through error analysis and strategy adjustment and match the option that states it most accurately.",
    "Ignoring feedback once marks are known.": "Review the definition of learning improvement through error analysis and strategy adjustment and match the option that states it most accurately."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "definition-check"
  ],
  remedialBrief: "Correct: Analyzing mistakes and improving strategy for future attempts..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Definition Check",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Definition Strategy",
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
      "Analyzing mistakes and improving strategy for future attempts.",
      "Reading only correct answers and skipping mistakes.",
      "Measuring success only by speed.",
      "Ignoring feedback once marks are known."
    ],
    "Analyzing mistakes and improving strategy for future attempts."
  )
};

export const inline_2_6_5_0_2 = {
  id: "inline_2_6_5_0_2",
  text: "If 5 out of 20 mistakes are due to boundary-rule confusion, what fraction of mistakes should targeted boundary review address?",
  options: [
    "1/2",
    "1/4",
    "1/5",
    "3/4"
  ],
  correctAnswer: "1/4",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "5/20 simplifies to 1/4.",
  incorrectOptionFeedback: {
    "1/2": "Use the provided values carefully and apply the relevant rule/formula for learning improvement through error analysis and strategy adjustment.",
    "1/5": "Use the provided values carefully and apply the relevant rule/formula for learning improvement through error analysis and strategy adjustment.",
    "3/4": "Use the provided values carefully and apply the relevant rule/formula for learning improvement through error analysis and strategy adjustment."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 1/4.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Quantitative Check",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Quant Strategy",
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
      "1/5",
      "3/4"
    ],
    "1/4"
  )
};

export const inline_2_6_5_0_3 = {
  id: "inline_2_6_5_0_3",
  text: "A student says: \"Making mistakes means revision is failing, so error review should be avoided.\" Which response is most accurate?",
  options: [
    "Yes, only perfect attempts produce learning.",
    "No. Error review is one of the strongest ways to improve understanding.",
    "Yes, mistakes should be hidden and never revisited.",
    "Error patterns are random and cannot inform strategy."
  ],
  correctAnswer: "No. Error review is one of the strongest ways to improve understanding.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with learning improvement through error analysis and strategy adjustment.",
  correctAnswerExplanation: "Structured error analysis builds targeted and efficient progress.",
  incorrectOptionFeedback: {
    "Yes, only perfect attempts produce learning.": "This response does not correctly address the misconception. Re-anchor to the rule for learning improvement through error analysis and strategy adjustment.",
    "Yes, mistakes should be hidden and never revisited.": "This response does not correctly address the misconception. Re-anchor to the rule for learning improvement through error analysis and strategy adjustment.",
    "Error patterns are random and cannot inform strategy.": "This response does not correctly address the misconception. Re-anchor to the rule for learning improvement through error analysis and strategy adjustment."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Error review is one of the strongest ways to improve understanding..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Misconception Repair",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Error Correction Flow",
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
      "Yes, only perfect attempts produce learning.",
      "No. Error review is one of the strongest ways to improve understanding.",
      "Yes, mistakes should be hidden and never revisited.",
      "Error patterns are random and cannot inform strategy."
    ],
    "No. Error review is one of the strongest ways to improve understanding."
  )
};

export const inline_2_6_5_0_4 = {
  id: "inline_2_6_5_0_4",
  text: "What is the most useful reflection routine after a test?",
  options: [
    "Classify each error, note cause, and define one preventive rule.",
    "Only count marks and stop analysis.",
    "Rewrite all correct answers only.",
    "Assume improvement will happen automatically."
  ],
  correctAnswer: "Classify each error, note cause, and define one preventive rule.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "Cause-focused reflection creates concrete behavior change for next attempt.",
  incorrectOptionFeedback: {
    "Only count marks and stop analysis.": "Choose the method that preserves the data type and question intent for learning improvement through error analysis and strategy adjustment.",
    "Rewrite all correct answers only.": "Choose the method that preserves the data type and question intent for learning improvement through error analysis and strategy adjustment.",
    "Assume improvement will happen automatically.": "Choose the method that preserves the data type and question intent for learning improvement through error analysis and strategy adjustment."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "method-selection"
  ],
  remedialBrief: "Best method: Classify each error, note cause, and define one preventive rule..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Method Selection",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Method Decision Steps",
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
      "Classify each error, note cause, and define one preventive rule.",
      "Only count marks and stop analysis.",
      "Rewrite all correct answers only.",
      "Assume improvement will happen automatically."
    ],
    "Classify each error, note cause, and define one preventive rule."
  )
};

export const inline_2_6_5_0_5 = {
  id: "inline_2_6_5_0_5",
  text: "For learning improvement through error analysis and strategy adjustment, what should be done first?",
  options: [
    "Map each error to concept, process, or arithmetic cause.",
    "Review incorrect responses and identify error type.",
    "Create a focused correction plan for next attempt.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Review incorrect responses and identify error type.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Review incorrect responses and identify error type.. After that, proceed with Map each error to concept, process, or arithmetic cause. and then Create a focused correction plan for next attempt..",
  incorrectOptionFeedback: {
    "Map each error to concept, process, or arithmetic cause.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Create a focused correction plan for next attempt.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Review incorrect responses and identify error type..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Process Order",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Ordered Workflow",
      steps: [
        "Review incorrect responses and identify error type.",
        "Map each error to concept, process, or arithmetic cause.",
        "Create a focused correction plan for next attempt."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Map each error to concept, process, or arithmetic cause.",
      "Review incorrect responses and identify error type.",
      "Create a focused correction plan for next attempt.",
      "Skip validation and finalize immediately"
    ],
    "Review incorrect responses and identify error type."
  )
};

export const inline_2_6_5_0_6 = {
  id: "inline_2_6_5_0_6",
  text: "True or False: Reviewing mistakes with strategy updates can increase future accuracy.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Reflection is a high-impact learning accelerator.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "reflection",
    "metacognition",
    "error-analysis",
    "module-6",
    "topic-5",
    "reflection-layer",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Reflection Layer - Rule Validation",
      points: [
        "Reflection identifies why mistakes occurred, not just what was wrong.",
        "Strategy updates improve future performance.",
        "Tracking recurring errors helps targeted revision.",
        "Confidence should be evidence-based and calibrated."
      ]
    },
    stepByStep: {
      title: "Reflection Layer - Validation Steps",
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

export const inline_2_6_6_0 = {
  id: "inline_2_6_6_0",
  text: "Which statement best reflects data-handling ethics in final revision?",
  options: [
    "Never alter original values to make graphs look cleaner.",
    "Small value edits are acceptable if pattern becomes clearer.",
    "Delete outliers without documentation to improve symmetry.",
    "Adjust totals after graphing so bars align nicely."
  ],
  correctAnswer: "Never alter original values to make graphs look cleaner.",
  format: GameFormat.RAINDROP,
  hint: "Representation can change; source data integrity cannot.",
  hintLevel1: "Representation can change; source data integrity cannot.",
  hintLevel2: "Reliable conclusions require faithful original observations.",
  correctAnswerExplanation: "(A) Ethical analytics requires preserving original data exactly.",
  incorrectOptionFeedback: {
    "Small value edits are acceptable if pattern becomes clearer.": "Value edits bias results and invalidate interpretation.",
    "Delete outliers without documentation to improve symmetry.": "Outlier handling must be justified and documented, not hidden.",
    "Adjust totals after graphing so bars align nicely.": "Adjusting totals breaks validity and trustworthiness."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up"
  ],
  remedialBrief: "Correct: Never alter original values to make graphs look cleaner..",
  remedialDetail: "Core idea: final consolidation of concepts, process discipline, and data ethics.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Core Concept",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - How To Solve",
      steps: [
        "Run final checklist: data type, method, computation, verification.",
        "Summarize key chapter rules in compact form.",
        "Attempt one integrated problem and review errors honestly."
      ]
    }
  },
  adaptiveBase: true,
  styles: buildUniversalStyles(
    [
      "Never alter original values to make graphs look cleaner.",
      "Small value edits are acceptable if pattern becomes clearer.",
      "Delete outliers without documentation to improve symmetry.",
      "Adjust totals after graphing so bars align nicely."
    ],
    "Never alter original values to make graphs look cleaner.",
    {
      kind: "ethics-note",
      principle: "integrity-first"
    }
  )
};

export const inline_2_6_6_0_1 = {
  id: "inline_2_6_6_0_1",
  text: "A strong chapter wrap-up should include:",
  options: [
    "Core rules, common errors, and one integrated solving workflow.",
    "Only motivational quotes without methods.",
    "Only final formulas with no meaning.",
    "Only past marks and no concept review."
  ],
  correctAnswer: "Core rules, common errors, and one integrated solving workflow.",
  format: GameFormat.RAINDROP,
  hint: "Focus on the exact meaning of final consolidation of concepts, process discipline, and data ethics.",
  hintLevel1: "Focus on the exact meaning of final consolidation of concepts, process discipline, and data ethics.",
  hintLevel2: "Pick the option that keeps the mathematical meaning precise, not vague.",
  correctAnswerExplanation: "Consolidation must connect concept, process, and error prevention.",
  incorrectOptionFeedback: {
    "Only motivational quotes without methods.": "Review the definition of final consolidation of concepts, process discipline, and data ethics and match the option that states it most accurately.",
    "Only final formulas with no meaning.": "Review the definition of final consolidation of concepts, process discipline, and data ethics and match the option that states it most accurately.",
    "Only past marks and no concept review.": "Review the definition of final consolidation of concepts, process discipline, and data ethics and match the option that states it most accurately."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "definition-check"
  ],
  remedialBrief: "Correct: Core rules, common errors, and one integrated solving workflow..",
  remedialDetail: "Definitions prevent procedural mistakes later in multi-step problems.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Definition Check",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Definition Strategy",
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
      "Core rules, common errors, and one integrated solving workflow.",
      "Only motivational quotes without methods.",
      "Only final formulas with no meaning.",
      "Only past marks and no concept review."
    ],
    "Core rules, common errors, and one integrated solving workflow."
  )
};

export const inline_2_6_6_0_2 = {
  id: "inline_2_6_6_0_2",
  text: "If final checklist has 4 required checks and you completed 3, completion fraction is:",
  options: [
    "1/4",
    "2/3",
    "3/4",
    "4/3"
  ],
  correctAnswer: "3/4",
  format: GameFormat.RAINDROP,
  hint: "Convert the words into a clear numeric relationship first.",
  hintLevel1: "Convert the words into a clear numeric relationship first.",
  hintLevel2: "Compute in order and verify units or totals before finalizing.",
  correctAnswerExplanation: "Completed checks over total checks = 3/4.",
  incorrectOptionFeedback: {
    "1/4": "Use the provided values carefully and apply the relevant rule/formula for final consolidation of concepts, process discipline, and data ethics.",
    "2/3": "Use the provided values carefully and apply the relevant rule/formula for final consolidation of concepts, process discipline, and data ethics.",
    "4/3": "Use the provided values carefully and apply the relevant rule/formula for final consolidation of concepts, process discipline, and data ethics."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "numerical-reasoning"
  ],
  remedialBrief: "Correct: 3/4.",
  remedialDetail: "Numerical checks reduce interpretation mistakes and confirm conceptual understanding.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Quantitative Check",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Quant Strategy",
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
      "1/4",
      "2/3",
      "3/4",
      "4/3"
    ],
    "3/4"
  )
};

export const inline_2_6_6_0_3 = {
  id: "inline_2_6_6_0_3",
  text: "A student says: \"End-of-module revision should focus only on speed and ignore verification.\" Which response is most accurate?",
  options: [
    "Yes, checking work is unnecessary once formulas are memorized.",
    "No. Speed without verification increases error rate and weakens reliability.",
    "Yes, verification should be skipped under exam pressure always.",
    "Accuracy naturally follows speed, so review can be omitted."
  ],
  correctAnswer: "No. Speed without verification increases error rate and weakens reliability.",
  format: GameFormat.RAINDROP,
  hint: "Find the option that directly corrects the false assumption.",
  hintLevel1: "Find the option that directly corrects the false assumption.",
  hintLevel2: "Look for the response that is mathematically consistent with final consolidation of concepts, process discipline, and data ethics.",
  correctAnswerExplanation: "Balanced speed and verification is crucial for high-quality performance.",
  incorrectOptionFeedback: {
    "Yes, checking work is unnecessary once formulas are memorized.": "This response does not correctly address the misconception. Re-anchor to the rule for final consolidation of concepts, process discipline, and data ethics.",
    "Yes, verification should be skipped under exam pressure always.": "This response does not correctly address the misconception. Re-anchor to the rule for final consolidation of concepts, process discipline, and data ethics.",
    "Accuracy naturally follows speed, so review can be omitted.": "This response does not correctly address the misconception. Re-anchor to the rule for final consolidation of concepts, process discipline, and data ethics."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "misconception-fix"
  ],
  remedialBrief: "Corrective response: No. Speed without verification increases error rate and weakens reliability..",
  remedialDetail: "Addressing misconceptions early prevents repeated errors in advanced tasks.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Misconception Repair",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Error Correction Flow",
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
      "Yes, checking work is unnecessary once formulas are memorized.",
      "No. Speed without verification increases error rate and weakens reliability.",
      "Yes, verification should be skipped under exam pressure always.",
      "Accuracy naturally follows speed, so review can be omitted."
    ],
    "No. Speed without verification increases error rate and weakens reliability."
  )
};

export const inline_2_6_6_0_4 = {
  id: "inline_2_6_6_0_4",
  text: "Which final preparation plan is strongest?",
  options: [
    "Review key rules, solve integrated set, and analyze mistakes before exam.",
    "Memorize answer keys only and avoid new questions.",
    "Practice only easiest question type repeatedly.",
    "Stop revision once confidence feels high regardless evidence."
  ],
  correctAnswer: "Review key rules, solve integrated set, and analyze mistakes before exam.",
  format: GameFormat.RAINDROP,
  hint: "Match tool/method to the kind of data and the decision required.",
  hintLevel1: "Match tool/method to the kind of data and the decision required.",
  hintLevel2: "Reject options that look convenient but violate core rules.",
  correctAnswerExplanation: "This plan combines retrieval, application, and feedback-driven improvement.",
  incorrectOptionFeedback: {
    "Memorize answer keys only and avoid new questions.": "Choose the method that preserves the data type and question intent for final consolidation of concepts, process discipline, and data ethics.",
    "Practice only easiest question type repeatedly.": "Choose the method that preserves the data type and question intent for final consolidation of concepts, process discipline, and data ethics.",
    "Stop revision once confidence feels high regardless evidence.": "Choose the method that preserves the data type and question intent for final consolidation of concepts, process discipline, and data ethics."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "method-selection"
  ],
  remedialBrief: "Best method: Review key rules, solve integrated set, and analyze mistakes before exam..",
  remedialDetail: "Method selection is a high-value skill because it determines the validity of all later steps.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Method Selection",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Method Decision Steps",
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
      "Review key rules, solve integrated set, and analyze mistakes before exam.",
      "Memorize answer keys only and avoid new questions.",
      "Practice only easiest question type repeatedly.",
      "Stop revision once confidence feels high regardless evidence."
    ],
    "Review key rules, solve integrated set, and analyze mistakes before exam."
  )
};

export const inline_2_6_6_0_5 = {
  id: "inline_2_6_6_0_5",
  text: "For final consolidation of concepts, process discipline, and data ethics, what should be done first?",
  options: [
    "Summarize key chapter rules in compact form.",
    "Run final checklist: data type, method, computation, verification.",
    "Attempt one integrated problem and review errors honestly.",
    "Skip validation and finalize immediately"
  ],
  correctAnswer: "Run final checklist: data type, method, computation, verification.",
  format: GameFormat.RAINDROP,
  hint: "Think process-first: what establishes a correct setup?",
  hintLevel1: "Think process-first: what establishes a correct setup?",
  hintLevel2: "The first step usually frames data/rules before calculation or interpretation.",
  correctAnswerExplanation: "The correct first step is: Run final checklist: data type, method, computation, verification.. After that, proceed with Summarize key chapter rules in compact form. and then Attempt one integrated problem and review errors honestly..",
  incorrectOptionFeedback: {
    "Summarize key chapter rules in compact form.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Attempt one integrated problem and review errors honestly.": "This is not the first step. Start with the foundational action before computing or concluding.",
    "Skip validation and finalize immediately": "This is not the first step. Start with the foundational action before computing or concluding."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "process-sequencing"
  ],
  remedialBrief: "Start with: Run final checklist: data type, method, computation, verification..",
  remedialDetail: "Good sequencing reduces errors and increases consistency across problem types.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Process Order",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Ordered Workflow",
      steps: [
        "Run final checklist: data type, method, computation, verification.",
        "Summarize key chapter rules in compact form.",
        "Attempt one integrated problem and review errors honestly."
      ]
    }
  },
  adaptiveVariant: true,
  styles: buildUniversalStyles(
    [
      "Summarize key chapter rules in compact form.",
      "Run final checklist: data type, method, computation, verification.",
      "Attempt one integrated problem and review errors honestly.",
      "Skip validation and finalize immediately"
    ],
    "Run final checklist: data type, method, computation, verification."
  )
};

export const inline_2_6_6_0_6 = {
  id: "inline_2_6_6_0_6",
  text: "True or False: Reliable exam confidence should be based on verified practice and error review, not guesswork.",
  options: [
    "True",
    "False"
  ],
  correctAnswer: "True",
  format: GameFormat.RAINDROP,
  hint: "Anchor to the formal rule, not intuition.",
  hintLevel1: "Anchor to the formal rule, not intuition.",
  hintLevel2: "Test the statement against one concrete example mentally.",
  correctAnswerExplanation: "True. Evidence-based confidence is more stable and accurate.",
  incorrectOptionFeedback: {
    False: "Re-check the statement using the core rule before deciding true/false."
  },
  questionTags: [
    "final-wrap-up",
    "consolidation",
    "data-ethics",
    "module-6",
    "topic-6",
    "module-wrap-up",
    "true-false-check"
  ],
  remedialBrief: "Correct answer: True.",
  remedialDetail: "Binary checks are effective only when grounded in exact definitions and rules.",
  remedialContent: {
    coreConcept: {
      title: "Module Wrap-Up - Rule Validation",
      points: [
        "Final readiness combines concept clarity, process accuracy, and interpretation quality.",
        "Checklist-based solving reduces avoidable errors.",
        "Ethical data handling is essential in all analytics work.",
        "Confidence should come from verified practice evidence."
      ]
    },
    stepByStep: {
      title: "Module Wrap-Up - Validation Steps",
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

export const inline_2_6_q1 = inline_2_6_1_0;
export const inline_2_6_q2 = inline_2_6_2_0;
export const inline_2_6_q3 = inline_2_6_3_0;
export const inline_2_6_q4 = inline_2_6_4_0;
export const inline_2_6_q5 = inline_2_6_5_0;
export const inline_2_6_q6 = inline_2_6_6_0;

// Compatibility aliases for existing module files that still import inline_2_1_q* names.
export const inline_2_1_q1 = inline_2_6_q1;
export const inline_2_1_q2 = inline_2_6_q2;
export const inline_2_1_q3 = inline_2_6_q3;
export const inline_2_1_q4 = inline_2_6_q4;
export const inline_2_1_q5 = inline_2_6_q5;
export const inline_2_1_q6 = inline_2_6_q6;
