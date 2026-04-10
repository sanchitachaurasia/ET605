import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_5';
import { videoLinks } from '../videoLinks';


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
      title: 'Strategic Forecasting',
      textContent: `<div class="duration-badge" style="background:var(--c-light);color:var(--c-hue);">⏱ Curated from module_2.5_final.html · Path C — Advanced</div>

<div class="section-block" id="s1c">
        <p class="section-eyebrow" style="color:var(--c-mid)">Analytical Modeling</p>
        <h2 class="section-title">Strategic Forecasting</h2>
        <div class="narration">
          <div class="stage-marker engage"></div>
          <p>For a data scientist, probability is the bridge between historical trends and future optimization. We don't just calculate chances; we build predictive models. In the high-stakes world of finance and logistics, a deviation of 1% in probability can result in millions of dollars in difference.</p>
          <p>Consider <strong>Risk Assessment</strong>. When an insurance company calculates your premium, they are performing multi-step data handling. They look at your age, location, and habits. Each factor adjusts the "Expected Loss" probability. If data shows that 1 in 1,000 drivers in your category has an accident per year, the theoretical probability is 0.001. That number determines the price of your insurance.</p>
          
          <div class="stage-marker explain"></div>
          <p>In modern sports, we move beyond simple averages to <strong>Conditional Probability</strong>. We don't just ask, "Will this player score?" We ask, "Given the current weather conditions and the opponent's defensive formation, what is the probability of a successful pass?" This requires analyzing sub-sets of data—filtering the total data set to find the most relevant <strong>Sample Space</strong>. <span class="vcue">[Display graph: Pass completion rates vs Defensive Pressure levels]</span></p>
        </div>
      </div>`,
      videoUrl: videoLinks['module_5']['topic_1'],
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
      title: 'The Law of Large Numbers in Action',
      textContent: `<div class="section-block" id="s2c">
        <p class="section-eyebrow" style="color:var(--c-mid)">Analysis &amp; Interpretation</p>
        <h2 class="section-title">The Law of Large Numbers in Action</h2>
        <div class="narration">
          <div class="stage-marker elaborate"></div>
          <p>Large corporations like Amazon or Netflix rely on the <strong>Law of Large Numbers</strong>. On an individual level, a user's behavior is unpredictable (Experimental Probability). However, when looking at 100 million users, the aggregate data becomes almost deterministic. This allows for automated inventory management—where a computer uses historical probability to "pre-ship" items to a warehouse near you before you even click "Buy."</p>
          
          <div class="callout challenge">
            <span class="callout-label">Challenge Level Thinking</span>
            If a business has a 95% success rate for on-time delivery, but a major storm has a 30% probability of occurring and would delay all shipments, how does the <strong>Joint Probability</strong> change their risk profile? This type of multi-factor analysis is how global supply chains remain resilient.
          </div>
        </div>
        
        <div class="practice-box">
          <h3>Strategic Analysis</h3>
          <div class="practice-q">A tech firm tracks server crashes. Historically, a crash happens on 2% of days. However, when traffic exceeds 1 million users, the probability jumps to 15%. If the data shows 10 high-traffic days expected next month, what is the predicted number of crashes?</div>
          <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
          <div class="practice-ans">Predicted crashes = 10 days * 0.15 probability = 1.5. This means the firm should prepare for 1 to 2 potential crashes during high-traffic periods.</div>
        </div>
      </div>`,
      videoUrl: videoLinks['module_5']['topic_2'],
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
      videoUrl: videoLinks['module_5']['topic_3'],
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
      videoUrl: videoLinks['module_5']['topic_4'],
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
      videoUrl: videoLinks['module_5']['topic_5'],
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
      videoUrl: videoLinks['module_5']['topic_6'],
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

export const module_5: Module = filterModuleByPath(moduleData, 'C');
