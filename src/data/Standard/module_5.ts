import { Module, GameFormat } from '../../types';

const inline_2_1_q1 = {
  id: 'inline_2_1_q1',
  text: 'A frequency table: Dog=7, Cat=10, Fish=6, Rabbit=5. Which animal is MOST popular?',
  hint: 'Most popular = highest frequency. Find the biggest number in the Frequency column.',
  remedialBrief: 'Cat has frequency 10 — the largest value. Most popular = Cat.',
  remedialDetail: 'Scan the frequency column. The values are 7, 10, 6, and 5. The largest number is 10, which corresponds to Cat.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Dog', value: 7 },
          { label: 'Cat', value: 10 },
          { label: 'Fish', value: 6 },
          { label: 'Rabbit', value: 5 },
        ],
      },
      options: ['Dog', 'Cat', 'Fish', 'Rabbit'],
      correctAnswer: 'Cat'
    }
  }
};
const inline_2_1_q2 = {
  id: 'inline_2_1_q2',
  text: 'Pictograph of cars: one symbol = 50 cars. September shows 4 full symbols and 1 half symbol. How many cars?',
  hint: 'Full symbols × value. Half symbol = half the value. Then add both.',
  remedialBrief: '4 × 50 = 200. Half symbol = 25. Total = 200 + 25 = 225 cars.',
  remedialDetail: 'Step 1: Count full symbols and multiply: 4 × 50 = 200. Step 2: Half symbol = scale ÷ 2 = 50 ÷ 2 = 25. Step 3: Add: 200 + 25 = 225.',
  styles: {
    [GameFormat.RAINDROP]: {
      visual: {
        kind: 'pictograph',
        rows: [{ label: 'September', symbols: '🚗🚗🚗🚗◐' }],
        key: 'Key: 1 symbol = 50 cars (half = 25)',
      },
      options: ['200', '225', '250', '175'],
      correctAnswer: '225'
    }
  }
};
const inline_2_1_q3 = {
  id: 'inline_2_1_q3',
  text: 'Double bar graph: Hindi 2005-06=50, 2006-07=45. Maths 2005-06=30, 2006-07=70. Which subject showed a DECREASE in performance?',
  hint: 'Decrease = later value is LOWER than earlier value. Check each subject.',
  remedialBrief: 'Hindi: 50 → 45 = decreased (−5). Maths: 30 → 70 = increased (+40). Answer: Hindi.',
  remedialDetail: 'Decrease means the second (later) value is SMALLER than the first. Hindi went from 50 to 45, so it decreased. Maths went from 30 to 70, so it increased.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Hindi 05-06', value: 50 },
          { label: 'Hindi 06-07', value: 45 },
          { label: 'Maths 05-06', value: 30 },
          { label: 'Maths 06-07', value: 70 },
        ],
      },
      options: ['Maths', 'Hindi', 'Both subjects', 'Neither subject'],
      correctAnswer: 'Hindi'
    }
  }
};
const inline_2_1_q4 = {
  id: 'inline_2_1_q4',
  text: 'A double bar graph shows boys vs girls marks in 5 subjects. Boys scores: Maths=40, Science=60, English=55, Hindi=70, Art=45. Girls scores: Maths=55, Science=50, English=65, Hindi=65, Art=50. In how many subjects did BOYS outperform GIRLS?',
  hint: 'Outperform means score HIGHER. Compare boys vs girls in each subject one by one.',
  remedialBrief: 'Science: 60 > 50 (boys win). Hindi: 70 > 65 (boys win). All others: girls scored higher. Count = 2 subjects.',
  remedialDetail: 'Go subject by subject: Maths: B40 < G55. Science: B60 > G50 (Win). English: B55 < G65. Hindi: B70 > G65 (Win). Art: B45 < G50. Total wins = 2.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      visual: {
        kind: 'bar',
        data: [
          { label: 'Maths B', value: 40 },
          { label: 'Maths G', value: 55 },
          { label: 'Science B', value: 60 },
          { label: 'Science G', value: 50 },
          { label: 'English B', value: 55 },
          { label: 'English G', value: 65 },
          { label: 'Hindi B', value: 70 },
          { label: 'Hindi G', value: 65 },
          { label: 'Art B', value: 45 },
          { label: 'Art G', value: 50 },
        ],
      },
      options: ['1 subject', '2 subjects', '3 subjects', '4 subjects'],
      correctAnswer: '2 subjects'
    }
  }
};

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
      questions: [
        {
          ...inline_2_1_q1,
          ...inline_2_1_q1.styles[GameFormat.DRAG_SORT],
          format: GameFormat.DRAG_SORT,
          difficulty: 'easy'
        }
      ]
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
      questions: [
        {
          ...inline_2_1_q2,
          ...inline_2_1_q2.styles[GameFormat.RAINDROP],
          format: GameFormat.RAINDROP,
          difficulty: 'easy'
        }
      ]
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
      questions: [
        {
          ...inline_2_1_q3,
          ...inline_2_1_q3.styles[GameFormat.DRAG_SORT],
          format: GameFormat.DRAG_SORT,
          difficulty: 'medium'
        }
      ]
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
      questions: [
        {
          ...inline_2_1_q4,
          ...inline_2_1_q4.styles[GameFormat.DRAG_SORT],
          format: GameFormat.DRAG_SORT,
          difficulty: 'medium'
        }
      ]
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
      questions: [
        {
          id: 'c2_1_5_q1',
          text: 'Which type of graph would be most appropriate for comparing average rainfall across 12 months?',
          options: ['Pictograph', 'Bar Graph', 'Histogram', 'Pie Chart'],
          correctAnswer: 'Bar Graph',
          format: GameFormat.RAINDROP,
          difficulty: 'hard',
          hint: 'Think about discrete categories (months) vs continuous data.',
          remedialBrief: 'Months are categories (discrete), not a continuous range, so use a bar graph with gaps.',
          remedialDetail: 'Pictographs work but are less precise. Histograms are for continuous data. Pie charts show parts of a whole. Bar graphs compare values across categories — perfect for months!'
        }
      ]
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
      questions: [
        {
          id: 'c2_1_6_q1',
          text: 'If you were conducting a survey on favorite foods in your class, what would be the best graph format to present your findings?',
          options: ['Pictograph with food symbols', 'Bar graph by category', 'Histogram', 'All of the above could work'],
          correctAnswer: 'Bar graph by category',
          format: GameFormat.RAINDROP,
          difficulty: 'medium',
          hint: 'Think about whether food categories are discrete (separate) or continuous (ranges).',
          remedialBrief: 'Food types are categories, not continuous data. Bar graphs (with gaps) are best for comparing categories.',
          remedialDetail: 'Pictographs work but are less standard for this. Histograms are for continuous grouping like height ranges or test scores, not discrete categories like food types.'
        }
      ]
    }
  ]
};

export const module_5: Module = filterModuleByPath(moduleData, 'B');
