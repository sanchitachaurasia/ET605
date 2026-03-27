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

const foundationalChapterData: Module[] = [
  foundationalModule1,
  foundationalModule2,
  foundationalModule3,
  foundationalModule4,
  foundationalModule5,
  foundationalModule6,
];

const standardChapterData: Module[] = [
  standardModule1,
  standardModule2,
  standardModule3,
  standardModule4,
  standardModule5,
  standardModule6,
];

const advancedChapterData: Module[] = [
  advancedModule1,
  advancedModule2,
  advancedModule3,
  advancedModule4,
  advancedModule5,
  advancedModule6,
];

export const chapterDataByPath: Record<LearningPath, Module[]> = {
  A: foundationalChapterData,
  B: standardChapterData,
  C: advancedChapterData,
};

export function getChapterDataForPath(path: LearningPath): Module[] {
  return chapterDataByPath[path] || chapterDataByPath.B;
}

// Backward-compatible default path if older call sites do not provide one.
export const chapterData: Module[] = getChapterDataForPath('B');
