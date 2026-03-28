import { LearningPath, Module } from '../../types';
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

function enrichModuleWithSkillTags(module: Module): Module {
  const moduleTags = MODULE_SKILL_TAGS[module.id] || [];
  return {
    ...module,
    concepts: module.concepts.map((concept) => ({
      ...concept,
      skillTags: uniqueTags([
        ...(concept.skillTags || []),
        ...moduleTags,
        ...getStageTags(concept.title),
        ...getKeywordTags(module.title, concept.title),
      ]),
    })),
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
