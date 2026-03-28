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
      title: 'The Raincoat Dilemma',
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Curated from module_2.5_final.html · Path A — Foundational</div>

<div class="section-block" id="s1">
        <p class="section-eyebrow" style="color:var(--a-mid)">Engage &amp; Explore</p>
        <h2 class="section-title">The Raincoat Dilemma</h2>
        <div class="narration">
          <div class="stage-marker engage"></div>
          <p>Welcome back! Let's start with something we all experience. Imagine it is the rainy season. Every day for two weeks, you have carried your raincoat to school, but not a single drop of rain has fallen. On the fifteenth day, you decide to leave it at home. You think to yourself, "The chance of rain must be very low today." But then, just as school ends, a huge thunderstorm begins! You are soaked.</p>
          <p>This is a classic example of taking a "chance." Even though you did not have a calculator, you were trying to use data from the last 14 days to predict the 15th. In this module, we are going to learn how people use math to do this much more accurately than our gut feelings.</p>
          
          <div class="stage-marker explore"></div>
          <p>Think about your favorite bakery. Have you ever noticed that they rarely run out of your favorite cupcake, but they also don't have hundreds left over at the end of the day? How do they know exactly how many to bake? <span class="pcue">(Try to think... what information would you need if you were the baker?)</span></p>
          <p>If the baker knows that on average, 20 people buy chocolate cupcakes every Monday, baking 100 would be a waste of money, and baking 5 would leave customers unhappy. They use data handling to make this decision. <span class="vcue">[Show data on screen: Monday sales - 18, 22, 19, 21]</span> By looking at these numbers, the baker sees a trend. They can predict with high probability that next Monday, sales will be around 20.</p>
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
      title: 'Why Probability Matters in Business',
      textContent: `<div class="section-block" id="s2">
        <p class="section-eyebrow" style="color:var(--a-mid)">Explain</p>
        <h2 class="section-title">Why Probability Matters in Business</h2>
        <div class="narration">
          <div class="stage-marker explain"></div>
          <p>When we talk about probability in the real world, we are talking about <strong>Probability of an Event</strong>. An "event" is just a fancy word for something happening—like a customer buying a shirt or a train arriving on time. We define probability as a measure of how likely that event is to happen on a scale from 0 to 1.</p>
          <p>Let's define a <strong>Trend</strong>. A trend is a general direction in which something is developing or changing. Businesses look for trends in their sales data. If a shop owner sees that sales of umbrellas go up every time the weather report says there is a 70% chance of rain, they use that probability to decide their inventory. <strong>Inventory</strong> is just the stock of goods they have in the store. If they don't have enough umbrellas when it rains, they lose money!</p>
          
          <div class="callout definition">
            <span class="callout-label">Simple Definition: Inventory</span>
            Inventory is the total amount of products a business has ready to sell. Using probability helps businesses keep just the right amount—not too much, and not too little.
          </div>
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
      title: 'Sports Stars and Statistics',
      textContent: `<div class="section-block" id="s3">
        <p class="section-eyebrow" style="color:var(--a-mid)">Elaborate</p>
        <h2 class="section-title">Sports Stars and Statistics</h2>
        <div class="narration">
          <div class="stage-marker elaborate"></div>
          <p>If you are a fan of cricket or football, you see probability every single day. Have you ever seen a <strong>Batting Average</strong> on the screen? A batsman might have an average of 45 runs. This does not mean he will score exactly 45 runs in the next match. It means based on all his past "data," the <strong>probability</strong> of him scoring around that much is high.</p>
          <p>Captains use this data to make decisions. If a specific bowler has a high "wicket-taking probability" against a left-handed batsman, the captain will bring that bowler on. They are using data handling to play the "percentage game." <span class="vcue">[Display graph: Bowler A vs Left-handers - 15 wickets in 50 overs]</span></p>
        </div>
        
        <div class="practice-box">
          <h3>Try This!</h3>
          <div class="practice-q">A basketball player made 8 out of 10 free throws in practice yesterday. If she takes one shot now, what is the probability she will make it?</div>
          <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
          <div class="practice-ans">The probability is 8/10, which is 0.8 or 80%. We use her past data (8/10) to predict her next chance!</div>
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
      title: 'The Science of Weather',
      textContent: `<div class="section-block" id="s4">
        <p class="section-eyebrow" style="color:var(--a-mid)">Evaluate</p>
        <h2 class="section-title">The Science of Weather</h2>
        <div class="narration">
          <div class="stage-marker evaluate"></div>
          <p>Meteorologists (weather scientists) use huge amounts of data from satellites and sensors. When they say "There is a 40% chance of rain," they mean that in the past, in weather conditions exactly like today's, it rained 40 out of 100 times. They aren't guessing—they are comparing today's data to thousands of past days.</p>
          <p>Now, think about your own school performance. If you have taken 5 math tests and scored 80, 85, 82, 88, and 84, what can you predict about your next test? <span class="pcue">(Try to think... would it be likely you'd score a 20? Or more likely you'd score around 83?)</span> You are using data handling to track your own progress!</p>
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
      textContent: `<div class="section-block" id="s5">
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
      textContent: `<div class="section-block" id="s5">
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

export const module_5: Module = filterModuleByPath(moduleData, 'A');
