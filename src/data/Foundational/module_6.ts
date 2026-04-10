import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_6';
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
  id: '2.6',
  title: 'Master Revision - Data Handling',
  concepts: [
    {
      id: 'c2_1_1',
      title: '⚡ 1. Warm-Up Recall',
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Curated from module_2.6_revision_final.html · Path A — Foundational</div>

<div class="section-block">
    <h2 class="section-title">⚡ 1. Warm-Up Recall</h2>
    <p style="font-size: 13px; color: var(--muted); margin-bottom: 24px;">Quick retrieval. Answer mentally, then reveal. Speed is key here.</p>
    
    <div class="card">
      <span class="question-label">Recall 1</span>
      <p>How do you represent the number <strong>9</strong> using tally marks?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 22px; letter-spacing: 6px;"><s>IIII</s> IIII</p>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Recall 2</span>
      <p>What is the total sum of all central angles in any Pie Chart?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>360 degrees</strong></p>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Recall 3</span>
      <p>What is the probability of a <strong>Certain Event</strong> (an event that will definitely happen)?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>1</strong></p>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Recall 4</span>
      <p>What name is given to an experiment where the result cannot be predicted exactly in advance?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Random Experiment</strong></p>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Recall 5</span>
      <p>In the class interval <strong>20–30</strong>, what is the <strong>class size</strong>?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>10</strong> (Upper Limit - Lower Limit = 30 - 20)</p>
      </div>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_1'],
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
      questions: buildAdaptiveQuestions(6, 1)
    },
    {
      id: 'c2_1_2',
      title: '🔁 2. Active Recall',
      textContent: `<div class="section-block">
    <h2 class="section-title">🔁 2. Active Recall</h2>
    <p style="font-size: 13px; color: var(--muted); margin-bottom: 24px;">Recall the concept, identify the insight, and track your confidence.</p>

    <div class="card">
      <span class="question-label">Logic: Bar Graph vs Histogram</span>
      <p>Why do the bars in a Histogram <strong>touch</strong> each other, while Bar Graph bars have gaps?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> Connectivity of data.</p>
        <div class="insight-box">
          <strong>Insight:</strong> Histograms represent <strong>continuous class intervals</strong> (like 10–20, 20–30) where the end of one is the start of the next. Bar graphs show separate categories.
        </div>
        <div class="confidence-check">
          <span>Confidence:</span>
          <button class="conf-btn">Low</button><button class="conf-btn">Med</button><button class="conf-btn">High</button>
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Rule: The Boundary Rule</span>
      <p>In a grouped frequency table (e.g., 0–10, 10–20), which interval does the value <strong>10</strong> belong to?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> The 10–20 interval.</p>
        <div class="insight-box">
          <strong>Insight:</strong> For any interval, the <strong>lower limit is included</strong> and the upper limit is excluded. This prevents a number from being counted twice.
        </div>
        <div class="confidence-check">
          <span>Confidence:</span>
          <button class="conf-btn">Low</button><button class="conf-btn">Med</button><button class="conf-btn">High</button>
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Calculation: Percentage to Angle</span>
      <p>If a component represents <strong>40%</strong> of the total data, how do you find its angle for a Pie Chart?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> (40 / 100) × 360 = 144 degrees</p>
        <div class="insight-box">
          <strong>Insight:</strong> A pie chart is a "part-to-whole" relation. To convert any fraction or percentage to an angle, multiply it by the "whole" (360 degrees).
        </div>
        <div class="confidence-check">
          <span>Confidence:</span>
          <button class="conf-btn">Low</button><button class="conf-btn">Med</button><button class="conf-btn">High</button>
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Theory: Large Numbers</span>
      <p>What happens to <strong>Experimental Probability</strong> as you increase the number of trials (like tossing a coin 10,000 times instead of 10)?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> It gets closer to the Theoretical Probability.</p>
        <div class="insight-box">
          <strong>Insight:</strong> This is the <strong>Law of Large Numbers</strong>. While small trials are random, massive trials settle into the mathematical pattern.
        </div>
        <div class="confidence-check">
          <span>Confidence:</span>
          <button class="conf-btn">Low</button><button class="conf-btn">Med</button><button class="conf-btn">High</button>
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Concept: Equally Likely</span>
      <p>When are outcomes of an experiment called <strong>Equally Likely</strong>?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> When each outcome has the same chance of occurring.</p>
        <div class="insight-box">
          <strong>Insight:</strong> For example, a fair die is equally likely (1/6 for each side). A "rigged" die where 6 appears half the time is NOT equally likely.
        </div>
        <div class="confidence-check">
          <span>Confidence:</span>
          <button class="conf-btn">Low</button><button class="conf-btn">Med</button><button class="conf-btn">High</button>
        </div>
      </div>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_2'],
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
      questions: buildAdaptiveQuestions(6, 2)
    },
    {
      id: 'c2_1_3',
      title: '📌 3. Smart Notes Builder',
      textContent: `<div class="section-block">
    <h2 class="section-title">📌 3. Smart Notes Builder</h2>
    <p style="font-size: 13px; color: var(--muted); margin-bottom: 24px;">Compress complex topics into single lines. Fill in the blanks to build your framework.</p>
    
    <div class="card">
      <span class="question-label">Guided Compression</span>
      <p>Explain <strong>"Data Handling"</strong> in exactly one line for a 5-year-old:</p>
      <textarea placeholder="Type your simple version here..."></textarea>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Suggested Answer:</strong> Collecting and organizing information to help us tell a clear story or make a smart choice.</p>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Framework Fill-in</span>
      <div style="font-size: 15px; line-height: 2;">
        1. <strong>Histogram:</strong> Best for <input type="text" class="framework-input" placeholder="data type?"> data.<br>
        2. <strong>Pie Chart:</strong> Shows the relation between a <input type="text" class="framework-input" placeholder="part and a whole">.<br>
        3. <strong>Probability Formula:</strong> Favourable Outcomes divided by <input type="text" class="framework-input" placeholder="total outcomes">.<br>
        4. <strong>Range:</strong> Probability values always lie between <input type="text" class="framework-input" placeholder="0 and 1">.<br>
        5. <strong>Circle Graph:</strong> Total angle at the centre is always <input type="text" class="framework-input" placeholder="360 degrees">.
      </div>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answers:</strong><br>
          1. <strong>Grouped/Continuous</strong><br>
          2. <strong>Part and a Whole</strong><br>
          3. <strong>Total number of possible outcomes</strong><br>
          4. <strong>0 and 1</strong><br>
          5. <strong>360 degrees</strong>
        </p>
      </div>
    </div>

    <div class="cheat-sheet">
      <span class="question-label" style="color: #657b83;">Master Cheat Sheet Block</span>
      <ul style="list-style: disc; margin-left: 20px;">
        <li><strong>Frequency:</strong> The number of times a particular entry occurs.</li>
        <li><strong>Class Interval:</strong> Grouping data into ranges (e.g., 10–20).</li>
        <li><strong>Theoretical Probability:</strong> What we expect mathematically.</li>
        <li><strong>Experimental Probability:</strong> Based on actual observed outcomes.</li>
        <li><strong>Sector Angle:</strong> (Value / Total) × 360.</li>
      </ul>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_3'],
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
      questions: buildAdaptiveQuestions(6, 3)
    },
    {
      id: 'c2_1_4',
      title: '🧠 4. Application Challenge',
      textContent: `<div class="section-block">
    <h2 class="section-title">🧠 4. Application Challenge</h2>
    <p style="font-size: 13px; color: var(--muted); margin-bottom: 24px;">Apply your knowledge to new situations. Step-by-step reasoning required.</p>
    
    <div class="card">
      <span class="question-label">Challenge 1: The Multi-Module Hybrid</span>
      <p>In a box of 50 slips numbered 1 to 50, what is the <strong>probability</strong> that a randomly picked slip is a number belonging to the class interval <strong>20–30</strong>?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> 1/5 or 0.2</p>
        <div class="insight-box">
          <strong>Explanation:</strong> <br>
          1. Range of interval 20–30 contains numbers: 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 (30 is excluded).<br>
          2. Favourable Outcomes = 10. <br>
          3. Total Outcomes = 50. <br>
          4. Probability = 10 / 50 = 1/5.
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Challenge 2: Pie Chart Interpretation</span>
      <p>A family spends 25% of their income on food. If their total monthly income is 40,000, what is the central angle for food in their budget pie chart AND the actual amount spent?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> 90 degrees and 10,000</p>
        <div class="insight-box">
          <strong>Explanation:</strong> <br>
          Angle = (25 / 100) × 360 = 90 degrees. <br>
          Amount = 25% of 40,000 = (1/4) × 40,000 = 10,000.
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Challenge 3: Discrete vs Continuous</span>
      <p>Which graph would you choose to show the heights of 50 students in a class? Why not use a standard bar graph?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> Histogram.</p>
        <div class="insight-box">
          <strong>Explanation:</strong> Height is continuous data. If we used a bar graph for every unique height (e.g., 140.1cm, 140.2cm), we would have too many bars. Grouping them into intervals (140–150cm) and using a histogram makes the data readable.
        </div>
      </div>
    </div>

    <div class="card">
      <span class="question-label">Challenge 4: Bag Logic</span>
      <p>A bag has 4 red and 2 yellow balls. If you draw one ball without looking, what is the probability of getting a red ball? If you then <strong>do not replace</strong> it, what is the probability of getting a red ball on the second draw?</p>
      <button class="show-ans-btn" onclick="toggle(this)">Show Answer</button>
      <div class="practice-ans">
        <p><strong>Answer:</strong> 2/3 (first) and 3/5 (second)</p>
        <div class="insight-box">
          <strong>Explanation:</strong> <br>
          Draw 1: Red = 4, Total = 6. P = 4/6 = 2/3. <br>
          Draw 2 (No replacement): Red remaining = 3, Total remaining = 5. P = 3/5.
        </div>
      </div>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_4'],
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
      questions: buildAdaptiveQuestions(6, 4)
    },
    {
      id: 'c2_1_5',
      title: '🔍 5. Reflection Layer',
      textContent: `<div class="section-block">
    <h2 class="section-title">🔍 5. Reflection Layer</h2>
    <p style="font-size: 14px; margin-bottom: 20px;">Meta-cognition: Understanding your own learning process.</p>
    
    <div class="checklist">
      <p style="font-size: 12px; font-weight: 700; color: var(--active-mid); margin-bottom: 10px;">MARK CONCEPTS YOU STILL FIND TRICKY:</p>
      <label><input type="checkbox"> Tally Marks & Frequency Tables</label>
      <label><input type="checkbox"> Histogram Boundary Rules (Lower/Upper limits)</label>
      <label><input type="checkbox"> Calculating Central Angles for Pie Charts</label>
      <label><input type="checkbox"> Comparing Experimental vs Theoretical Probability</label>
      <label><input type="checkbox"> Solving Multi-Step Real World Problems</label>
    </div>

    <div class="card" style="margin-top: 24px; background: white; border: 1.5px solid var(--active-mid);">
      <p style="font-size: 14px; font-weight: 600;">"Why do you think the concept(s) you checked above felt difficult?"</p>
      <textarea rows="3" placeholder="Example: I often forget to exclude the upper limit in class intervals..."></textarea>
    </div>

    <div style="text-align: center; margin-top: 40px; border-top: 1px solid var(--border); padding-top: 20px;">
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted);">REVISION COMPLETE • READINESS LEVEL: VERIFIED</p>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_5'],
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
      questions: buildAdaptiveQuestions(6, 5)
    },
    {
      id: 'c2_1_6',
      title: 'Module 2.6 - Wrap Up',
      textContent: `<div class="section-block">
    <h2 class="section-title">🔍 5. Reflection Layer</h2>
    <p style="font-size: 14px; margin-bottom: 20px;">Meta-cognition: Understanding your own learning process.</p>
    
    <div class="checklist">
      <p style="font-size: 12px; font-weight: 700; color: var(--active-mid); margin-bottom: 10px;">MARK CONCEPTS YOU STILL FIND TRICKY:</p>
      <label><input type="checkbox"> Tally Marks & Frequency Tables</label>
      <label><input type="checkbox"> Histogram Boundary Rules (Lower/Upper limits)</label>
      <label><input type="checkbox"> Calculating Central Angles for Pie Charts</label>
      <label><input type="checkbox"> Comparing Experimental vs Theoretical Probability</label>
      <label><input type="checkbox"> Solving Multi-Step Real World Problems</label>
    </div>

    <div class="card" style="margin-top: 24px; background: white; border: 1.5px solid var(--active-mid);">
      <p style="font-size: 14px; font-weight: 600;">"Why do you think the concept(s) you checked above felt difficult?"</p>
      <textarea rows="3" placeholder="Example: I often forget to exclude the upper limit in class intervals..."></textarea>
    </div>

    <div style="text-align: center; margin-top: 40px; border-top: 1px solid var(--border); padding-top: 20px;">
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted);">REVISION COMPLETE • READINESS LEVEL: VERIFIED</p>
    </div>
  </div>`,
      videoUrl: videoLinks['module_6']['topic_6'],
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
      questions: buildAdaptiveQuestions(6, 6)
    }
  ]
};

export const module_6: Module = filterModuleByPath(moduleData, 'A');
