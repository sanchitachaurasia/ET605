import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_5';


function getDefaultQuestionStyle(question: { styles?: Record<string, any>; format: GameFormat }): Record<string, any> {
  if (!question.styles) return {};
  return question.styles[question.format] || (Object.values(question.styles)[0] as Record<string, any>) || {};
}

const ADAPTIVE_VARIANTS = ['', '_1', '_2', '_3', '_4', '_5', '_6'] as const;
const ADAPTIVE_DIFFICULTY = ['easy', 'medium', 'medium', 'easy', 'hard', 'medium', 'easy'] as const;

function buildAdaptiveQuestions(moduleNumber: number, topicNumber: number) {
  return ADAPTIVE_VARIANTS.map((variant, index) => {
    const questionKey = `inline_2_${moduleNumber}_${topicNumber}_0${variant}` as keyof typeof questionBank;
    const question = questionBank[questionKey] as any;

    return {
      ...question,
      ...getDefaultQuestionStyle(question),
      hint: question.hintLevel1,
      format: question.format,
      difficulty: ADAPTIVE_DIFFICULTY[index],
    };
  });
}

const MODULE_2_1_SHARED_VIDEO_URL = '/Why_Do_We_Need_to_Organise_Data_.mp4';

function filterModuleByPath(module: Module, path: 'A' | 'B' | 'C'): Module {
  return {
    ...module,
    concepts: module.concepts
      .filter((concept) => !concept.path || concept.path === path)
      .map((concept) => ({
        ...concept,
        questions: concept.questions.filter((question) => !question.path || question.path === path),
      })),
  };
}

const moduleData: Module = {
  id: '2.5',
  title: 'Applying Probability to Life',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'From Data Sets to Smart Decisions',
      textContent: `<div class="duration-badge" style="background:var(--b-light);color:var(--b-hue);">⏱ Curated from module_2.5_final.html · Path B — Standard</div>

<div class="section-block" id="s1b">
        <p class="section-eyebrow" style="color:var(--b-mid)">Standard Application</p>
        <h2 class="section-title">From Data Sets to Smart Decisions</h2>
        <div class="narration">
          <div class="stage-marker engage"></div>
          <p>In our previous sessions, we focused on how to calculate theoretical probability using coins and dice. Today, we bridge the gap to the real world. Probability is not just a classroom exercise; it is the fundamental tool used by modern industries to handle uncertainty.</p>
          <p>Consider the <strong>Probability of Precipitation</strong> (PoP) in weather forecasting. When you see "60% chance of rain," it is not a guess about the sky's mood. It is a statistical conclusion based on historical data handling. Meteorologists look at historical days with similar atmospheric pressure and humidity. If it rained on 60% of those historical days, that is your forecast.</p>
          
          <div class="stage-marker explore"></div>
          <p>In business, this is called <strong>Predictive Analytics</strong>. For example, a smartphone company needs to decide how many units to manufacture. If they look at past sales data and see that demand increases by 20% every December, they don't just hope for the best. They use that 1.2x multiplier to stock their inventory. <span class="vcue">[Show data on screen: Dec 2021 sales - 100k, Dec 2022 - 120k, Dec 2023 - 144k]</span></p>
        </div>
      </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 300,
      videoStartSeconds: 0,
      videoEndSeconds: 40,
      videoCheckpointPrompt: 'Pause and answer: What problem did raw data create for Raj?',
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 1',
      guidedPracticeItems: [
        {
          question: 'A shopkeeper notes the colours of 15 shirts sold in a day: Red, Blue, Red, White, Blue, Red, Green, Blue, White, Red, Blue, Red, White, Green, Blue. Without making a table, can you tell which colour was sold the most? Now organise the data and check your answer.',
          answer: 'Without a table, it is genuinely difficult to be certain. After organising: Red appears 5 times, Blue appears 5 times, White appears 3 times, Green appears 2 times. Both Red and Blue are equally most sold — something that is hard to spot in the raw list. This shows exactly why organisation matters.'
        },
        {
          question: 'Give one example from your daily life where data is collected but might be hard to understand if it\'s left unorganised.',
          answer: 'Possible examples: a register of all the marks scored in a test (hard to see average or highest without sorting), a list of all items purchased in a week (hard to know which item was bought most often), a record of temperatures every hour in a day (hard to see patterns without ordering).'
        }
      ],
      questions: buildAdaptiveQuestions(5, 1)
    },
    {
      id: 'c2_1_2',
      title: 'Inventory and Competitive Edge',
      textContent: `<div class="section-block" id="s2b">
        <p class="section-eyebrow" style="color:var(--b-mid)">Market &amp; Sports Logic</p>
        <h2 class="section-title">Inventory and Competitive Edge</h2>
        <div class="narration">
          <div class="stage-marker explain"></div>
          <p>Effective business management relies on <strong>Probability Distributions</strong>. By graphing past sales, a manager can see the <strong>Expected Value</strong>—the most likely outcome for future sales. This prevents the two biggest risks in business: <strong>Stockouts</strong> (running out of items) and <strong>Overstocking</strong> (having too many items that might go bad or become obsolete).</p>
          
          <div class="stage-marker elaborate"></div>
          <p>Sports analytics has evolved significantly. Professional teams now use <strong>Expected Goals</strong> (xG) in football or <strong>Win Probability</strong> in cricket. These are calculated by analyzing thousands of similar situations in the past. If a striker takes a shot from 20 yards out, and data shows only 5% of shots from that spot result in a goal, the probability is 0.05. Coaches use this to tell players to look for a better pass instead of shooting.</p>
        </div>
        
        <div class="practice-box">
          <h3>Application Challenge</h3>
          <div class="practice-q">A clothing store sold 500 T-shirts last month. 300 were Blue, 150 were Red, and 50 were Green. If the manager expects to sell 1000 T-shirts next month, how many Blue ones should they order based on current probability?</div>
          <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
          <div class="practice-ans">Current Probability of Blue = 300/500 = 0.6. For 1000 shirts, the order should be 0.6 * 1000 = 600 Blue T-shirts.</div>
        </div>
      </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 300,
      videoStartSeconds: 40,
      videoEndSeconds: 80,
      videoCheckpointPrompt: 'Pause and answer: Why do tally marks use groups of 5?',
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 2',
      guidedPracticeItems: [
        {
          question: 'A class of 25 students was asked about their pet at home. Make a complete frequency table with tally marks. Which pet is most common?',
          answer: 'Corrected totals: Dog = 10, Cat = 6, None = 5, Fish = 4. Total = 25. Most common pet: Dog.'
        },
        {
          question: 'If a frequency table shows four items with frequencies 8, 12, 5, and 10, what is the total number of data points?',
          answer: 'Total = 35 data points.'
        }
      ],
      questions: buildAdaptiveQuestions(5, 2)
    },
    {
      id: 'c2_1_3',
      title: 'Wrap Up',
      textContent: `<div class="section-block">
        <div class="callout tip">
          <span class="callout-label">Module 2.4 — Wrap Up</span>
          We moved from the "feeling" of chance to the math of probability. We learned how to measure chance using a ratio, how to identify fair games, and why real-world experiments need many trials to match theory. We also discovered how our actions (like replacing a card or not) change the very math we use. In the next chapter, we'll see how these chances help us make big decisions in the world!
        </div>
      </div>

    </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 300,
      videoStartSeconds: 80,
      videoEndSeconds: 120,
      videoCheckpointPrompt: 'Pause and answer: What does the KEY in a pictograph represent?',
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 3',
      guidedPracticeItems: [
        {
          question: 'In a pictograph, the key shows ★ = 10 students. Drama has 3.5 stars, Science has 5 stars, Sports has 4 stars. Find all counts.',
          answer: 'Drama = 35, Science = 50, Sports = 40. Science has the most participants.'
        },
        {
          question: 'Choose a suitable key for Apples: 250, Bananas: 175, Oranges: 300, Mangoes: 125 and justify.',
          answer: 'A suitable key is 1 symbol = 25 fruits, giving 10, 7, 12, and 5 symbols respectively.'
        }
      ],
      questions: buildAdaptiveQuestions(5, 3)
    },
    {
      id: 'c2_1_4',
      title: 'Wrap Up',
      textContent: `<div class="section-block">
        <div class="callout tip">
          <span class="callout-label">Module 2.4 — Wrap Up</span>
          We moved from the "feeling" of chance to the math of probability. We learned how to measure chance using a ratio, how to identify fair games, and why real-world experiments need many trials to match theory. We also discovered how our actions (like replacing a card or not) change the very math we use. In the next chapter, we'll see how these chances help us make big decisions in the world!
        </div>
      </div>

    </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 300,
      videoStartSeconds: 120,
      videoEndSeconds: 140,
      videoCheckpointPrompt: 'Pause and answer: When should you use a double bar graph?',
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 4',
      guidedPracticeItems: [
        {
          question: 'Draw/describe a bar graph for scores: Maths 85, Science 72, English 90, Hindi 68, Social Studies 78. Which subject needs focus?',
          answer: 'Use 0–100 scale. Lowest score is Hindi (68), then Science (72). Focus on Hindi first.'
        },
        {
          question: 'Why must bars start from zero?',
          answer: 'Starting above zero exaggerates differences and can mislead interpretation.'
        }
      ],
      questions: buildAdaptiveQuestions(5, 4)
    },
    {
      id: 'c2_1_5',
      title: 'Wrap Up',
      textContent: `<div class="section-block">
        <div class="callout tip">
          <span class="callout-label">Module 2.4 — Wrap Up</span>
          We moved from the "feeling" of chance to the math of probability. We learned how to measure chance using a ratio, how to identify fair games, and why real-world experiments need many trials to match theory. We also discovered how our actions (like replacing a card or not) change the very math we use. In the next chapter, we'll see how these chances help us make big decisions in the world!
        </div>
      </div>

    </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 400,
      videoStartSeconds: 340,
      videoEndSeconds: 425,
      videoCheckpointPrompt: 'Pause and answer: Which graph clue can reveal misleading data?',
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 5',
      guidedPracticeItems: [
        {
          question: 'Runs in 6 matches: 120, 185, 95, 210, 175, 160. Find highest, lowest, and trend type.',
          answer: 'Highest = 210, lowest = 95, and the trend is mixed/fluctuating.'
        }
      ],
      questions: buildAdaptiveQuestions(5, 5)
    },
    {
      id: 'c2_1_6',
      title: 'Wrap Up',
      textContent: `<div class="section-block">
        <div class="callout tip">
          <span class="callout-label">Module 2.4 — Wrap Up</span>
          We moved from the "feeling" of chance to the math of probability. We learned how to measure chance using a ratio, how to identify fair games, and why real-world experiments need many trials to match theory. We also discovered how our actions (like replacing a card or not) change the very math we use. In the next chapter, we'll see how these chances help us make big decisions in the world!
        </div>
      </div>

    </div>`,
      videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
      estimatedTimeSeconds: 600,
      videoStartSeconds: 425,
      videoEndSeconds: 520,
      videoCheckpointPrompt: 'Pause and answer: What are the 3 steps in your class data project?',
      workedExamples: [],
      guidedPracticeTitle: 'Final Reflection — Module 2.1',
      guidedPracticeItems: [
        {
          question: 'A friend says, "I don\'t need graphs — I can just read numbers from a table." Respond using two examples from this module.',
          answer: 'Tables give exact values, while graphs reveal patterns instantly. Example: enrolment dip is easier to spot in bars than raw numbers; score trends and dips become obvious visually over time.'
        }
      ],
      questions: buildAdaptiveQuestions(5, 6)
    }
  ]
};

export const module_5: Module = filterModuleByPath(moduleData, 'B');
