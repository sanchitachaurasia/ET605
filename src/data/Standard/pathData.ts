import { LearningPath, Module, Concept, Question, GameFormat } from '../../types';
import { module_1 as foundationalModule1 } from '../Foundational/module_1';
import { module_2 as foundationalModule2 } from '../Foundational/module_2';
import { module_3 as foundationalModule3 } from '../Foundational/module_3';
import { module_4 as foundationalModule4 } from '../Foundational/module_4';
import { module_5 as foundationalModule5 } from '../Foundational/module_5';
import { module_6 as foundationalModule6 } from '../Foundational/module_6';
import { module_1 as standardModule1 } from './module_1';
import { module_2 as standardModule2 } from './module_2';
import { module_3 as standardModule3 } from './module_3';
import { module_4 as standardModule4 } from './module_4';
import { module_5 as standardModule5 } from './module_5';
import { module_6 as standardModule6 } from './module_6';
import { module_1 as advancedModule1 } from '../Advanced/module_1';
import { module_2 as advancedModule2 } from '../Advanced/module_2';
import { module_3 as advancedModule3 } from '../Advanced/module_3';
import { module_4 as advancedModule4 } from '../Advanced/module_4';
import { module_5 as advancedModule5 } from '../Advanced/module_5';
import { module_6 as advancedModule6 } from '../Advanced/module_6';

const MODULE_SKILL_TAGS: Record<string, string[]> = {
  '2.1': ['data-organization', 'frequency-analysis', 'graph-selection'],
  '2.2': ['grouped-data', 'class-intervals', 'histogram-reasoning'],
  '2.3': ['pie-chart-interpretation', 'sector-angle-calculation', 'part-whole-reasoning'],
  '2.4': ['chance-and-probability', 'sample-space', 'event-reasoning'],
  '2.5': ['real-world-probability', 'decision-making', 'data-driven-choices'],
  '2.6': ['revision-and-consolidation', 'mixed-data-handling', 'exam-readiness'],
};

const KEYWORD_SKILL_TAGS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /tally/i, tag: 'tally-marks' },
  { pattern: /frequency/i, tag: 'frequency-table-reading' },
  { pattern: /pictograph/i, tag: 'pictograph-scaling' },
  { pattern: /bar graph|double bar/i, tag: 'bar-graph-comparison' },
  { pattern: /histogram/i, tag: 'histogram-interpretation' },
  { pattern: /class interval|bin size/i, tag: 'class-interval-binning' },
  { pattern: /pie chart|circle graph/i, tag: 'pie-chart-analysis' },
  { pattern: /sector angle|percentage/i, tag: 'percentage-angle-conversion' },
  { pattern: /probability|sample space|event/i, tag: 'probability-computation' },
  { pattern: /independent|dependent/i, tag: 'event-dependence-reasoning' },
  { pattern: /interpret|analysis|detective/i, tag: 'data-interpretation' },
  { pattern: /reflection|wrap up|recall|notes/i, tag: 'metacognitive-reflection' },
];

const ALL_GAME_FORMATS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
  GameFormat.TALLY_TAP,
];

function uniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => tag.trim())));
}

function getStageTags(conceptTitle: string): string[] {
  const title = conceptTitle.toLowerCase();
  const tags: string[] = [];

  if (title.includes('warm-up') || title.includes('recall')) {
    tags.push('retrieval-practice');
  }
  if (title.includes('active recall')) {
    tags.push('active-retrieval', 'confidence-self-rating');
  }
  if (title.includes('smart notes') || title.includes('notes builder')) {
    tags.push('knowledge-compression', 'structured-note-making');
  }
  if (title.includes('application') || title.includes('challenge') || title.includes('project') || title.includes('activity')) {
    tags.push('applied-problem-solving');
  }
  if (title.includes('reflection') || title.includes('wrap up')) {
    tags.push('self-assessment');
  }

  return tags;
}

function getKeywordTags(moduleTitle: string, conceptTitle: string): string[] {
  const haystack = `${moduleTitle} ${conceptTitle}`;
  return KEYWORD_SKILL_TAGS.filter(({ pattern }) => pattern.test(haystack)).map(({ tag }) => tag);
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toCorrectAnswerLabel(correctAnswer: Question['correctAnswer']): string {
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.map((value) => String(value)).join(', ');
  }
  return String(correctAnswer);
}

function toPrimaryCorrectAnswer(correctAnswer: Question['correctAnswer']): string | number {
  if (Array.isArray(correctAnswer)) {
    if (correctAnswer.length === 0) return '';
    return correctAnswer[0];
  }
  return correctAnswer;
}

function buildDefaultIncorrectOptionFeedback(question: Question): Record<string, string> {
  if (!question.options || question.options.length === 0) {
    return {};
  }

  const correctAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.map((value) => String(value))
    : [String(question.correctAnswer)];

  return question.options.reduce((acc, option) => {
    const normalizedOption = String(option);
    if (!correctAnswers.includes(normalizedOption)) {
      acc[normalizedOption] = 'Not quite. Recheck the given values carefully and solve step-by-step before choosing again.';
    }
    return acc;
  }, {} as Record<string, string>);
}

function mergeUniqueText(existing: string[] = [], fallback: string[] = []): string[] {
  const merged = [...existing, ...fallback]
    .map((entry) => String(entry).trim())
    .filter(Boolean);
  return Array.from(new Set(merged));
}

function mergeExpandableSections(
  existingSections: Array<{ title: string; points: string[] }> = [],
  fallbackSections: Array<{ title: string; points: string[] }> = []
): Array<{ title: string; points: string[] }> {
  const sectionMap = new Map<string, string[]>();
  const order: string[] = [];

  existingSections.forEach((section) => {
    if (!section?.title) return;
    if (!sectionMap.has(section.title)) {
      order.push(section.title);
      sectionMap.set(section.title, []);
    }
    sectionMap.set(section.title, mergeUniqueText(sectionMap.get(section.title), section.points || []));
  });

  fallbackSections.forEach((section) => {
    if (!section?.title) return;
    if (!sectionMap.has(section.title)) {
      order.push(section.title);
      sectionMap.set(section.title, []);
    }
    sectionMap.set(section.title, mergeUniqueText(sectionMap.get(section.title), section.points || []));
  });

  return order.map((title) => ({
    title,
    points: sectionMap.get(title) || [],
  }));
}

function buildDefaultRemedialContent(question: Question, concept: Concept, correctAnswerLabel: string): NonNullable<Question['remedialContent']> {
  const cleanText = stripHtml(question.text);
  const shortPrompt = cleanText.length > 140 ? `${cleanText.slice(0, 137)}...` : cleanText;

  return {
    coreConcept: {
      title: 'Core Concept and Reasoning',
      points: [
        `Question focus: ${concept.title}.`,
        'Identify all given values first (table entries, symbols, scale, labels, or bar heights).',
        'Translate the question into a math action: count, compare, add/subtract, multiply, divide, or convert.',
        'Keep units consistent throughout the calculation.',
        'Check if any partial value exists (half symbol, quarter value, percentage fraction).',
        'Verify that the final result is sensible before matching options.',
      ],
    },
    stepByStep: {
      title: 'Step-by-Step Solution',
      steps: [
        `Read the prompt carefully: ${shortPrompt}`,
        'List known values in one line so nothing is missed.',
        'Write the formula or operation before calculating.',
        'Solve in small steps and keep intermediate values visible.',
        'Re-check one step where errors are common (scale conversion or subtraction order).',
        `Match the computed result with the correct answer: ${correctAnswerLabel}.`,
        'Do a quick reverse-check to confirm the result fits the data.',
      ],
    },
    expandable: {
      buttonLabel: 'Show more examples and background',
      sections: [
        {
          title: 'Common Mistakes and Fixes',
          points: [
            'Scale error: treating partial symbols as full symbols. Fix: compute fraction of scale explicitly.',
            'Comparison error: adding when difference is required. Fix: identify the question word first.',
            'Data-skip error: missing one value in the visual. Fix: recount from left to right once.',
            'Rounding error: rounding too early. Fix: round only at final step when asked.',
          ],
        },
        {
          title: 'Extra Practice Pattern',
          points: [
            'Try the same method with one value changed and solve again.',
            'Create a mini-check: if one value increases, predict how answer changes before recalculating.',
            'Explain your solution in one sentence using operation words (count, compare, convert, verify).',
          ],
        },
        {
          title: 'When to Use This Method',
          points: [
            'Use this process for table, pictograph, and bar-graph interpretation questions.',
            'Use it especially when options are numerically close and require careful checking.',
            'In word problems, convert the context into values first, then apply the same steps.',
          ],
        },
      ],
    },
  };
}

function ensureStylesAcrossFormats(question: Question): Record<string, any> | undefined {
  const existingStyles = question.styles || {};
  const firstExistingStyle = Object.values(existingStyles)[0] as Record<string, any> | undefined;
  const baseStyle = (existingStyles[question.format] || firstExistingStyle || {}) as Record<string, any>;

  const resolvedOptions = question.options
    ? [...question.options]
    : Array.isArray(baseStyle.options)
      ? baseStyle.options.map((option: any) => String(option))
      : undefined;

  const resolvedCorrectAnswer = baseStyle.correctAnswer ?? toPrimaryCorrectAnswer(question.correctAnswer);

  if (!resolvedOptions || resolvedOptions.length === 0 || resolvedCorrectAnswer === undefined || resolvedCorrectAnswer === '') {
    return question.styles;
  }

  const canonicalStyle: Record<string, any> = {
    ...(baseStyle.visual ? { visual: baseStyle.visual } : {}),
    options: resolvedOptions,
    correctAnswer: resolvedCorrectAnswer,
  };

  return ALL_GAME_FORMATS.reduce((acc, gameFormat) => {
    const existingStyle = (existingStyles[gameFormat] || {}) as Record<string, any>;
    const mergedStyle: Record<string, any> = {
      ...canonicalStyle,
      ...existingStyle,
      options: Array.isArray(existingStyle.options) ? existingStyle.options.map((option: any) => String(option)) : [...resolvedOptions],
      correctAnswer: existingStyle.correctAnswer ?? resolvedCorrectAnswer,
    };
    acc[gameFormat] = mergedStyle;
    return acc;
  }, {} as Record<string, any>);
}

function enrichQuestionDetails(question: Question, concept: Concept, conceptTags: string[]): Question {
  const hintLevel1 = question.hintLevel1 || question.hint || 'Read the prompt carefully and identify the key values first.';
  const hintLevel2 = question.hintLevel2 || `${hintLevel1} Then solve in small steps and verify with options.`;
  const correctAnswerLabel = toCorrectAnswerLabel(question.correctAnswer);

  const mergedIncorrectOptionFeedback = {
    ...buildDefaultIncorrectOptionFeedback(question),
    ...(question.incorrectOptionFeedback || {}),
  };

  const defaultRemedialContent = buildDefaultRemedialContent(question, concept, correctAnswerLabel);
  const existingRemedialContent = question.remedialContent;
  const mergedExpandableSections = mergeExpandableSections(
    existingRemedialContent?.expandable?.sections || [],
    defaultRemedialContent.expandable?.sections || []
  );

  const mergedRemedialContent: NonNullable<Question['remedialContent']> = {
    coreConcept: {
      title: existingRemedialContent?.coreConcept?.title || defaultRemedialContent.coreConcept?.title,
      points: mergeUniqueText(
        existingRemedialContent?.coreConcept?.points || [],
        defaultRemedialContent.coreConcept?.points || []
      ),
    },
    stepByStep: {
      title: existingRemedialContent?.stepByStep?.title || defaultRemedialContent.stepByStep?.title,
      steps: mergeUniqueText(
        existingRemedialContent?.stepByStep?.steps || [],
        defaultRemedialContent.stepByStep?.steps || []
      ),
    },
    expandable: {
      buttonLabel: existingRemedialContent?.expandable?.buttonLabel || defaultRemedialContent.expandable?.buttonLabel,
      sections: mergedExpandableSections,
    },
  };

  const questionKeywordTags = KEYWORD_SKILL_TAGS.filter(({ pattern }) => pattern.test(stripHtml(question.text))).map(({ tag }) => tag);
  const mergedQuestionTags = uniqueTags([...(question.questionTags || []), ...conceptTags, ...questionKeywordTags]);

  return {
    ...question,
    hint: question.hint || hintLevel1,
    hintLevel1,
    hintLevel2,
    correctAnswerExplanation:
      question.correctAnswerExplanation ||
      `Correct answer: ${correctAnswerLabel}. Use the given values carefully and compute step-by-step.`,
    incorrectOptionFeedback: mergedIncorrectOptionFeedback,
    questionTags: mergedQuestionTags,
    remedialBrief:
      question.remedialBrief ||
      `Correct answer: ${correctAnswerLabel}. Review the core concept, then redo the solution using the structured steps.`,
    remedialDetail:
      question.remedialDetail ||
      'Method: identify known values, choose the operation, solve in stages, and run a final validation check against the data and options.',
    remedialContent: mergedRemedialContent,
    styles: ensureStylesAcrossFormats(question),
  };
}

function enrichModuleWithSkillTags(module: Module): Module {
  const moduleTags = MODULE_SKILL_TAGS[module.id] || [];
  return {
    ...module,
    concepts: module.concepts.map((concept) => {
      const conceptTags = uniqueTags([
        ...(concept.skillTags || []),
        ...moduleTags,
        ...getStageTags(concept.title),
        ...getKeywordTags(module.title, concept.title),
      ]);

      return {
        ...concept,
        skillTags: conceptTags,
        questions: concept.questions.map((question) => enrichQuestionDetails(question, concept, conceptTags)),
      };
    }),
  };
}

const foundationalChapterData: Module[] = [
  foundationalModule1,
  foundationalModule2,
  foundationalModule3,
  foundationalModule4,
  foundationalModule5,
  foundationalModule6,
].map(enrichModuleWithSkillTags);

const standardChapterData: Module[] = [
  standardModule1,
  standardModule2,
  standardModule3,
  standardModule4,
  standardModule5,
  standardModule6,
].map(enrichModuleWithSkillTags);

const advancedChapterData: Module[] = [
  advancedModule1,
  advancedModule2,
  advancedModule3,
  advancedModule4,
  advancedModule5,
  advancedModule6,
].map(enrichModuleWithSkillTags);

export const chapterDataByPath: Record<LearningPath, Module[]> = {
  A: foundationalChapterData,
  B: standardChapterData,
  C: advancedChapterData,
};

export function getChapterDataForPath(path: LearningPath): Module[] {
  return chapterDataByPath[path] || chapterDataByPath.B;
}

export interface TopicSkillTagEntry {
  path: LearningPath;
  moduleId: string;
  moduleTitle: string;
  conceptId: string;
  conceptTitle: string;
  skillTags: string[];
}

export function getTopicSkillTagIndex(path: LearningPath): TopicSkillTagEntry[] {
  return getChapterDataForPath(path).flatMap((module) =>
    module.concepts.map((concept) => ({
      path,
      moduleId: module.id,
      moduleTitle: module.title,
      conceptId: concept.id,
      conceptTitle: concept.title,
      skillTags: concept.skillTags || [],
    }))
  );
}

// Backward-compatible default path if older call sites do not provide one.
export const chapterData: Module[] = getChapterDataForPath('B');
