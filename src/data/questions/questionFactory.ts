import { GameFormat, Question } from '../../types';

const SUPPORTED_GAME_FORMATS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,

];

function buildUniversalStyles(options: string[], correctAnswer: string, visual?: Record<string, any>): Record<string, any> {
  return SUPPORTED_GAME_FORMATS.reduce((acc, gameFormat) => {
    acc[gameFormat] = {
      ...(visual ? { visual } : {}),
      options: [...options],
      correctAnswer,
    };
    return acc;
  }, {} as Record<string, any>);
}

function buildIncorrectFeedback(options: string[], correctAnswer: string, fallback: string): Record<string, string> {
  return options.reduce((acc, option) => {
    if (option !== correctAnswer) {
      acc[option] = fallback;
    }
    return acc;
  }, {} as Record<string, string>);
}

function uniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags));
}

interface BasePrompt {
  text: string;
  options: [string, string, string, string];
  correctAnswer: string;
  hintLevel1: string;
  hintLevel2: string;
  explanation: string;
  feedback: Record<string, string>;
  visual?: Record<string, any>;
}

interface PromptWithExplanation {
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
}

interface MisconceptionPrompt {
  claim: string;
  correction: string;
  distractors: [string, string, string];
  explanation: string;
}

interface TrueFalsePrompt {
  statement: string;
  answer: 'True' | 'False';
  reason: string;
}

export interface TopicSeed {
  topicId: number;
  topicTitle: string;
  focus: string;
  tags: string[];
  corePoints: string[];
  stepSequence: [string, string, string];
  base: BasePrompt;
  definition: PromptWithExplanation;
  check: PromptWithExplanation;
  misconception: MisconceptionPrompt;
  method: PromptWithExplanation;
  trueFalse: TrueFalsePrompt;
}

interface BuildQuestionArgs {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  hintLevel1: string;
  hintLevel2: string;
  explanation: string;
  incorrectOptionFeedback: Record<string, string>;
  tags: string[];
  brief: string;
  detail: string;
  coreTitle: string;
  corePoints: string[];
  stepTitle: string;
  stepSteps: string[];
  adaptiveBase?: boolean;
  adaptiveVariant?: boolean;
  visual?: Record<string, any>;
}

function buildQuestion(args: BuildQuestionArgs): Question {
  return {
    id: args.id,
    text: args.text,
    options: args.options,
    correctAnswer: args.correctAnswer,
    format: GameFormat.RAINDROP,
    hint: args.hintLevel1,
    hintLevel1: args.hintLevel1,
    hintLevel2: args.hintLevel2,
    correctAnswerExplanation: args.explanation,
    incorrectOptionFeedback: args.incorrectOptionFeedback,
    questionTags: args.tags,
    remedialBrief: args.brief,
    remedialDetail: args.detail,
    remedialContent: {
      coreConcept: {
        title: args.coreTitle,
        points: args.corePoints,
      },
      stepByStep: {
        title: args.stepTitle,
        steps: args.stepSteps,
      },
    },
    ...(args.adaptiveBase ? { adaptiveBase: true } : {}),
    ...(args.adaptiveVariant ? { adaptiveVariant: true } : {}),
    styles: buildUniversalStyles(args.options, args.correctAnswer, args.visual),
  };
}

export function buildTopicQuestionSet(moduleNumber: number, seed: TopicSeed): [Question, Question, Question, Question, Question, Question, Question] {
  const baseId = `inline_2_${moduleNumber}_${seed.topicId}_0`;
  const commonTags = uniqueTags([
    ...seed.tags,
    `module-${moduleNumber}`,
    `topic-${seed.topicId}`,
    seed.topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  ]);

  const q0 = buildQuestion({
    id: baseId,
    text: seed.base.text,
    options: [...seed.base.options],
    correctAnswer: seed.base.correctAnswer,
    hintLevel1: seed.base.hintLevel1,
    hintLevel2: seed.base.hintLevel2,
    explanation: seed.base.explanation,
    incorrectOptionFeedback: seed.base.feedback,
    tags: commonTags,
    brief: `Correct: ${seed.base.correctAnswer}.`,
    detail: `Core idea: ${seed.focus}.`,
    coreTitle: `${seed.topicTitle} - Core Concept`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - How To Solve`,
    stepSteps: [...seed.stepSequence],
    adaptiveBase: true,
    visual: seed.base.visual,
  });

  const q1Fallback = `Review the definition of ${seed.focus} and match the option that states it most accurately.`;
  const q1 = buildQuestion({
    id: `${baseId}_1`,
    text: seed.definition.question,
    options: [...seed.definition.options],
    correctAnswer: seed.definition.correctAnswer,
    hintLevel1: `Focus on the exact meaning of ${seed.focus}.`,
    hintLevel2: `Pick the option that keeps the mathematical meaning precise, not vague.`,
    explanation: seed.definition.explanation,
    incorrectOptionFeedback: buildIncorrectFeedback(seed.definition.options, seed.definition.correctAnswer, q1Fallback),
    tags: uniqueTags([...commonTags, 'definition-check']),
    brief: `Correct: ${seed.definition.correctAnswer}.`,
    detail: `Definitions prevent procedural mistakes later in multi-step problems.`,
    coreTitle: `${seed.topicTitle} - Definition Check`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Definition Strategy`,
    stepSteps: ['Read all options fully.', 'Discard options that change key terms.', 'Select the precise mathematical statement.'],
    adaptiveVariant: true,
  });

  const q2Fallback = `Use the provided values carefully and apply the relevant rule/formula for ${seed.focus}.`;
  const q2 = buildQuestion({
    id: `${baseId}_2`,
    text: seed.check.question,
    options: [...seed.check.options],
    correctAnswer: seed.check.correctAnswer,
    hintLevel1: `Convert the words into a clear numeric relationship first.`,
    hintLevel2: `Compute in order and verify units or totals before finalizing.`,
    explanation: seed.check.explanation,
    incorrectOptionFeedback: buildIncorrectFeedback(seed.check.options, seed.check.correctAnswer, q2Fallback),
    tags: uniqueTags([...commonTags, 'numerical-reasoning']),
    brief: `Correct: ${seed.check.correctAnswer}.`,
    detail: `Numerical checks reduce interpretation mistakes and confirm conceptual understanding.`,
    coreTitle: `${seed.topicTitle} - Quantitative Check`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Quant Strategy`,
    stepSteps: ['Identify known values.', 'Apply the right rule/formula.', 'Validate the result against context.'],
    adaptiveVariant: true,
  });

  const q3Options: [string, string, string, string] = [
    seed.misconception.distractors[0],
    seed.misconception.correction,
    seed.misconception.distractors[1],
    seed.misconception.distractors[2],
  ];
  const q3Fallback = `This response does not correctly address the misconception. Re-anchor to the rule for ${seed.focus}.`;
  const q3 = buildQuestion({
    id: `${baseId}_3`,
    text: `A student says: "${seed.misconception.claim}" Which response is most accurate?`,
    options: [...q3Options],
    correctAnswer: seed.misconception.correction,
    hintLevel1: `Find the option that directly corrects the false assumption.`,
    hintLevel2: `Look for the response that is mathematically consistent with ${seed.focus}.`,
    explanation: seed.misconception.explanation,
    incorrectOptionFeedback: buildIncorrectFeedback(q3Options, seed.misconception.correction, q3Fallback),
    tags: uniqueTags([...commonTags, 'misconception-fix']),
    brief: `Corrective response: ${seed.misconception.correction}.`,
    detail: `Addressing misconceptions early prevents repeated errors in advanced tasks.`,
    coreTitle: `${seed.topicTitle} - Misconception Repair`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Error Correction Flow`,
    stepSteps: ['Identify the faulty assumption.', 'State the correct rule clearly.', 'Apply it to the given situation.'],
    adaptiveVariant: true,
  });

  const q4Fallback = `Choose the method that preserves the data type and question intent for ${seed.focus}.`;
  const q4 = buildQuestion({
    id: `${baseId}_4`,
    text: seed.method.question,
    options: [...seed.method.options],
    correctAnswer: seed.method.correctAnswer,
    hintLevel1: `Match tool/method to the kind of data and the decision required.`,
    hintLevel2: `Reject options that look convenient but violate core rules.`,
    explanation: seed.method.explanation,
    incorrectOptionFeedback: buildIncorrectFeedback(seed.method.options, seed.method.correctAnswer, q4Fallback),
    tags: uniqueTags([...commonTags, 'method-selection']),
    brief: `Best method: ${seed.method.correctAnswer}.`,
    detail: `Method selection is a high-value skill because it determines the validity of all later steps.`,
    coreTitle: `${seed.topicTitle} - Method Selection`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Method Decision Steps`,
    stepSteps: ['Classify the data/task.', 'Choose the mathematically valid method.', 'Execute and verify output.'],
    adaptiveVariant: true,
  });

  const q5Options: [string, string, string, string] = [
    seed.stepSequence[1],
    seed.stepSequence[0],
    seed.stepSequence[2],
    'Skip validation and finalize immediately',
  ];
  const q5Fallback = `This is not the first step. Start with the foundational action before computing or concluding.`;
  const q5 = buildQuestion({
    id: `${baseId}_5`,
    text: `For ${seed.focus}, what should be done first?`,
    options: [...q5Options],
    correctAnswer: seed.stepSequence[0],
    hintLevel1: `Think process-first: what establishes a correct setup?`,
    hintLevel2: `The first step usually frames data/rules before calculation or interpretation.`,
    explanation: `The correct first step is: ${seed.stepSequence[0]}. After that, proceed with ${seed.stepSequence[1]} and then ${seed.stepSequence[2]}.`,
    incorrectOptionFeedback: buildIncorrectFeedback(q5Options, seed.stepSequence[0], q5Fallback),
    tags: uniqueTags([...commonTags, 'process-sequencing']),
    brief: `Start with: ${seed.stepSequence[0]}.`,
    detail: `Good sequencing reduces errors and increases consistency across problem types.`,
    coreTitle: `${seed.topicTitle} - Process Order`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Ordered Workflow`,
    stepSteps: [...seed.stepSequence],
    adaptiveVariant: true,
  });

  const q6Options: [string, string] = ['True', 'False'];
  const q6Fallback = `Re-check the statement using the core rule before deciding true/false.`;
  const q6 = buildQuestion({
    id: `${baseId}_6`,
    text: `True or False: ${seed.trueFalse.statement}`,
    options: [...q6Options],
    correctAnswer: seed.trueFalse.answer,
    hintLevel1: `Anchor to the formal rule, not intuition.`,
    hintLevel2: `Test the statement against one concrete example mentally.`,
    explanation: seed.trueFalse.reason,
    incorrectOptionFeedback: buildIncorrectFeedback(q6Options, seed.trueFalse.answer, q6Fallback),
    tags: uniqueTags([...commonTags, 'true-false-check']),
    brief: `Correct answer: ${seed.trueFalse.answer}.`,
    detail: `Binary checks are effective only when grounded in exact definitions and rules.`,
    coreTitle: `${seed.topicTitle} - Rule Validation`,
    corePoints: seed.corePoints,
    stepTitle: `${seed.topicTitle} - Validation Steps`,
    stepSteps: ['Recall the governing rule.', 'Test the statement against that rule.', 'Decide true/false with justification.'],
    adaptiveVariant: true,
  });

  return [q0, q1, q2, q3, q4, q5, q6];
}
