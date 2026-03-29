import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_3';


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

export const moduleData: Module = {
  id: '2.3',
  title: 'Pie Charts & Circle Graphs',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'What Is a Pie Chart?',
      textContent: `<div class="duration-badge" style="background:var(--b-light);color:var(--b-hue);">⏱ Estimated reading time: 10–14 minutes &nbsp;·&nbsp; Path B — Standard</div>

<div class="section-block" id="s1b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 1 of 4</p>
      <h2 class="section-title">What Is a Pie Chart?</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You've worked with bar graphs and histograms — tools that compare amounts across categories or show distributions. But here's a problem neither of them solves elegantly: showing all the categories of a whole simultaneously, with their proportions visible at a glance. A family budget, a country's population breakdown, a company's revenue by product — you don't just want to know the amounts, you want to see the shares. That's what a pie chart does. <span class="vcue">[Show a family budget bar graph vs pie chart side-by-side]</span> The bar graph shows amounts. The pie chart shows proportions. Both carry value — but they answer different questions.</p>

        <div class="stage-marker explain"></div>
        <p>A pie chart (also called a circle graph) represents a whole as a circle of 360°. Each category is represented by a sector — a slice of the circle. The central angle of each sector is proportional to that category's share of the whole. The total angle of all sectors always sums to exactly 360°, just as all parts of a whole add up to 100%. <span class="vcue">[Show the ice cream flavours example: Chocolate 50%, Vanilla 25%, Other 25%]</span></p>

        <table class="data-table">
          <thead><tr><th>Flavour</th><th>%</th><th>Fraction</th><th>Sector Angle</th></tr></thead>
          <tbody>
            <tr><td>Chocolate</td><td class="num">50%</td><td class="frac">1/2</td><td class="ang">180°</td></tr>
            <tr><td>Vanilla</td><td class="num">25%</td><td class="frac">1/4</td><td class="ang">90°</td></tr>
            <tr><td>Other flavours</td><td class="num">25%</td><td class="frac">1/4</td><td class="ang">90°</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>100%</strong></td><td></td><td class="ang"><strong>360°</strong></td></tr>
          </tbody>
        </table>

        <div class="stage-marker elaborate"></div>
        <p>The power of a pie chart lies in what you can read without calculation. Looking at the chart, you immediately see: Chocolate is exactly half the circle (largest group), Vanilla and Other are equal (same-sized slices). No arithmetic needed for those observations. Now compare this to reading a frequency table — you'd have to scan numbers and mentally estimate ratios. The pie chart externalises the proportion. That's its value. <span class="vcue">[Highlight key visual reading features on the pie chart]</span></p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          A pie chart shows three categories with sector angles 144°, 108°, and 108°. (a) Do these sum to 360°? (b) What percentage of the whole does the 144° sector represent? (c) What fraction of the whole do the two equal sectors represent together?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 1</h3>
        <div class="practice-q">A survey of 360 people asked their favourite season. Summer: 90, Rainy: 120, Winter: 150. Without using the formula, explain why each person's response contributes exactly 1° to the pie chart. Then verify: do the three angles sum to 360°?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">When the total number of people equals 360, each person represents 360° ÷ 360 people = 1° per person. This is a special case, not a general rule. Summer = 90 people → 90°. Rainy = 120 people → 120°. Winter = 150 people → 150°. Sum: 90 + 120 + 150 = 360°. ✓ This shortcut only applies when the total count equals 360.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T2B -->

<hr class="section-divider">`,
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
      questions: buildAdaptiveQuestions(3, 1)
    },
    {
      id: 'c2_1_2',
      title: 'Calculating Sector Angles — Formula & Reverse Calculation',
      textContent: `<div class="section-block" id="s2b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 2 of 4</p>
      <h2 class="section-title">Calculating Sector Angles — Formula &amp; Reverse Calculation</h2>
      <div class="narration">
        <div class="stage-marker explain"></div>
        <p>Two forms of the central angle formula — know both and know when to use each. <span class="vcue">[Display both formulas on screen]</span></p>

        <div class="formula-block">
          <span class="formula-label">Building the chart (Value → Angle)</span>
          <span class="formula-main">Angle = (Value ÷ Total) × 360°</span>
        </div>
        <div class="formula-block">
          <span class="formula-label">Reading the chart (Angle → Value)</span>
          <span class="formula-main">Value = (Angle ÷ 360°) × Total</span>
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Full worked example — Baker's shop daily sales (Total = ₹720): <span class="vcue">[Show the complete calculation table]</span></p>

        <table class="data-table">
          <thead><tr><th>Item</th><th>Sales (₹)</th><th>Fraction</th><th>Sector Angle</th></tr></thead>
          <tbody>
            <tr><td>Ordinary Bread</td><td class="num">320</td><td class="frac">320/720 = 4/9</td><td class="ang">160°</td></tr>
            <tr><td>Fruit Bread</td><td class="num">80</td><td class="frac">80/720 = 1/9</td><td class="ang">40°</td></tr>
            <tr><td>Cakes &amp; Pastries</td><td class="num">160</td><td class="frac">160/720 = 2/9</td><td class="ang">80°</td></tr>
            <tr><td>Biscuits</td><td class="num">120</td><td class="frac">120/720 = 1/6</td><td class="ang">60°</td></tr>
            <tr><td>Others</td><td class="num">40</td><td class="frac">40/720 = 1/18</td><td class="ang">20°</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>720</strong></td><td></td><td class="ang"><strong>360°</strong></td></tr>
          </tbody>
        </table>

        <p>Reverse calculation (NCERT Example 1): A family's budget pie chart shows Savings = 15%, Clothes = 10%. Monthly savings = ₹3,000. Find expenditure on clothes. Solution: 15% = ₹3,000 → 1% = ₹200 → 10% = ₹2,000. Clothes expenditure = <strong>₹2,000</strong>.</p>

        <div class="callout tip">
          <span class="callout-label">Verification — Non-Negotiable</span>
          All sector angles must sum to exactly 360°. If they don't, locate and correct the error before drawing. A pie chart with angles summing to 361° or 359° is mathematically wrong.
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          A student's exam marks pie chart: Maths 90°, English 55°, Hindi 70°, Science 80°, Social Science 65°. Total marks = 540. (a) Do the angles sum to 360°? (b) Find marks scored in Maths. (c) In which subject were 105 marks scored?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 2</h3>
        <div class="practice-q">A hostel has students speaking: Hindi 40, English 12, Marathi 9, Tamil 7, Bengali 4. Total = 72. Calculate the sector angle for each language. Which language forms the majority of the circle (more than 180°)?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Hindi: (40/72)×360 = 200°. English: (12/72)×360 = 60°. Marathi: (9/72)×360 = 45°. Tamil: (7/72)×360 = 35°. Bengali: (4/72)×360 = 20°. Total = 200+60+45+35+20 = 360°. ✓ Hindi forms the majority at 200° — more than half the circle — meaning more than half of all hostel students speak Hindi.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T3B -->

<hr class="section-divider">`,
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
      questions: buildAdaptiveQuestions(3, 2)
    },
    {
      id: 'c2_1_3',
      title: 'When to Use Pie Charts — and When Not To',
      textContent: `<div class="section-block" id="s3b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 3 of 4</p>
      <h2 class="section-title">When to Use Pie Charts — and When Not To</h2>
      <div class="narration">
        <div class="stage-marker explain"></div>
        <p>Choosing the right graph is as important as drawing it correctly. The NCERT "Try This" section presents three datasets and asks which graph suits each. Apply this framework: <strong>if the data represents parts of a meaningful whole → pie chart. If data tracks change over time → line/bar graph. If data is a continuous grouped distribution → histogram.</strong> <span class="vcue">[Show three datasets side by side]</span></p>

        <div class="compare-grid">
          <div class="compare-card use">
            <h4>✓ Pie Chart Appropriate</h4>
            Choice of food (North Indian 30, South Indian 40, Chinese 25, Others 25, Total 120): All four categories together represent 100% of the group's preferences. A pie chart shows each cuisine's share of the total immediately.
          </div>
          <div class="compare-card no-use">
            <h4>✗ Pie Chart Inappropriate</h4>
            Food grain production 2001–2006: This is time-series data — the years are sequential, and trends matter. A bar graph shows year-on-year changes clearly. A pie chart of yearly production would destroy the temporal meaning.
          </div>
        </div>

        <div class="stage-marker elaborate"></div>
        <p>The third dataset — daily income of factory workers in income ranges — requires a histogram, not a pie chart. The income ranges are continuous class intervals, and the number of workers in each range constitutes a frequency distribution. This is continuous grouped data, which is always represented by a histogram. A pie chart here would falsely suggest that the income bands are separate, unrelated categories. <span class="vcue">[Show the dataset with the correct graph type labelled]</span></p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          State the best graph type for each: (a) Percentage of students in Class 8 enrolled in different co-curricular clubs. (b) Monthly rainfall in Mumbai from June to September. (c) Heights of 50 students grouped into 5 cm class intervals.
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 3</h3>
        <div class="practice-q">A newspaper article shows a pie chart of "monthly expenditures of five different families." Each family is one slice. Is this a valid use of a pie chart? What is wrong with this representation? What would be the correct graph?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">This is an invalid use of a pie chart. The five families' expenditures are separate, independent values — they are not "parts of a single whole." Adding five families' spending together produces a total that has no meaningful interpretation. The pie would imply that together they represent "all spending" which is not a useful idea. The correct graph is a bar graph — each family gets its own bar, making comparison easy and not implying any false proportional relationship between them.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T4B -->

<hr class="section-divider">`,
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
      questions: buildAdaptiveQuestions(3, 3)
    },
    {
      id: 'c2_1_4',
      title: 'Real-World Pie Chart Analysis Project',
      textContent: `<div class="section-block" id="s4b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 4 of 4</p>
      <h2 class="section-title">Real-World Pie Chart Analysis Project</h2>
      <div class="narration">
        <div class="stage-marker elaborate"></div>
        <p>Reading a pie chart analytically means doing more than identifying the largest slice. It means extracting precise values, making comparisons across sectors, and performing reverse calculations from angle to amount. Let's work through the NCERT music survey: Classical 10%, Semi-Classical 20%, Folk 30%, Light 40%. Total surveyed = 200 people. <span class="vcue">[Show the pie chart]</span></p>

        <p>Three analytical moves: (1) Direct reading — Light music is preferred by 40% (the largest group). (2) Reverse calculation — If Classical (10%) = 20 people, then total = 20 × (100/10) = 200 people. (3) Proportional allocation — 1000 CDs to be made: Light = 400, Folk = 300, Semi-Classical = 200, Classical = 100. Total = 1000. ✓</p>

        <p>Now attempt a more complex reading task. The TV viewers pie chart: Entertainment 50%, Sports 25%, News 15%, Informative 10%. <span class="vcue">[Show chart]</span> Which two categories together equal the Sports viewers? Entertainment (50%) = Sports (25%) + Informative (10%) + News (15%). Or more precisely: Sports (25%) = News (15%) + Informative (10%). So News + Informative = Sports viewers. This is a sector equivalence question — answering it requires reading and summing angles, not just identifying the largest slice.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Path B — Final Challenge</span>
          A school's annual budget (Total ₹5,00,000) is shown in a pie chart: Teaching Staff Salaries 40%, Infrastructure 25%, Library 10%, Sports 15%, Admin 10%. (a) Calculate the rupee amount for each category. (b) If the Library budget increases by ₹10,000 while the total stays the same, what is its new sector angle? (c) The Sports sector angle is 54°. Is this consistent with the 15% stated? Verify. (d) Which two categories together account for half the total budget?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Challenge — Path B</h3>
        <div class="practice-q">Answer the four parts of the school budget challenge above. Show all working.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Teaching Staff: 40% × 5,00,000 = ₹2,00,000. Infrastructure: 25% × 5,00,000 = ₹1,25,000. Library: 10% × 5,00,000 = ₹50,000. Sports: 15% × 5,00,000 = ₹75,000. Admin: 10% × 5,00,000 = ₹50,000. Total = 2,00,000+1,25,000+50,000+75,000+50,000 = 5,00,000. ✓ (b) New Library budget = ₹60,000. New percentage = (60,000/5,00,000) × 100 = 12%. New angle = (12/100) × 360° = 43.2°. (c) 15% → angle should be (15/100)×360° = 54°. Yes — 54° is consistent with 15%. ✓ (d) Teaching Staff (40%) + Sports (15%) = 55% — not quite half. Teaching Staff (40%) + Infrastructure (25%) = 65% — too much. Library (10%) + Admin (10%) + Sports (15%) + Infrastructure (25%) = 60% — no. Admin (10%) + Infrastructure (25%) + Library (10%) = 45% — no. Actually: Sports (15%) + Admin (10%) + Library (10%) + Infrastructure (25%) = 60%. The exact pair that totals 50% is Teaching Staff (40%) + Library (10%) = 50%.</div>
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
      questions: buildAdaptiveQuestions(3, 4)
    },
    {
      id: 'c2_1_5',
      title: 'Reading & Interpreting Graphs',
      textContent: `<div class="section-block" id="s5b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 5 of 6</p>
      <h2 class="section-title">Reading &amp; Interpreting Graphs</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Reading a graph is a skill distinct from making one. A graph well-read yields insights — a trend spotted, an anomaly noticed, a comparison made. A graph poorly read leads to wrong conclusions, especially if the scale is manipulated. Let's develop critical reading skills. <span class="vcue">[Show a student's 5-test score trend graph]</span></p>

        <div class="stage-marker explore"></div>
        <p>Test scores over 5 tests: 55, 62, 58, 70, 75. <span class="vcue">[Show bar graph]</span> Identify: (a) the general trend, (b) the one anomaly, (c) the rate of improvement from Test 3 to Test 5. Now: what would you tell this student about their performance? Can you predict Test 6?</p>

        <div class="stage-marker explain"></div>
        <p>Interpretation has three levels. Level one — descriptive: state what the graph shows (values, highest, lowest). Level two — analytical: identify patterns, trends, anomalies, and comparisons. Level three — inferential: draw conclusions about what the data means and make predictions. Most students stop at level one. Strong data literacy means reaching level three routinely. Also — always check the Y-axis start point. A non-zero Y-axis exaggerates differences. This is the most common way graphs mislead.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Critical Thinking</span>
          Two bar graphs show the same rainfall data. Graph A has a Y-axis from 0 to 200mm. Graph B has a Y-axis from 100mm to 150mm. In Graph B, one bar looks almost 4 times taller than another. In Graph A, the difference looks small. Which graph tells the truth? Which might be used to alarm readers unnecessarily?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 5</h3>
        <div class="practice-q">A double bar graph shows online vs offline sales for a store over 4 quarters. Q1: Online 40, Offline 80. Q2: Online 55, Offline 75. Q3: Online 70, Offline 65. Q4: Online 90, Offline 55. Interpret this data at all three levels — descriptive, analytical, and inferential. What business decision does this data support?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Descriptive: Online sales ranged from 40 to 90, growing each quarter. Offline sales ranged from 55 to 80, declining each quarter. The two lines crossed between Q2 and Q3. Analytical: There is a clear crossover trend — online sales are rising sharply (+50 over 4 quarters) while offline sales are falling steadily (−25). Q3 is the crossover point. Inferential: Consumer preference is shifting significantly toward online purchasing. The business should invest more in their online platform, increase inventory available online, and potentially reconsider the cost of maintaining physical store space. This data strongly supports expanding the digital sales channel.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T6 -->

<hr class="section-divider">`,
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
      questions: buildAdaptiveQuestions(3, 5)
    },
    {
      id: 'c2_1_6',
      title: 'Class Activity: Be a Data Detective',
      textContent: `<div class="section-block" id="s6b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 6 of 6</p>
      <h2 class="section-title">Class Activity: Be a Data Detective</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Every tool from this module now comes together in one investigation. A data detective doesn't just organise and represent — they investigate, interpret, and recommend. The best data analysis always ends with a decision that someone can act on. Let's apply the full pipeline to a real scenario. <span class="vcue">[Show "Case File" folder]</span></p>

        <div class="stage-marker explore"></div>
        <p>Class 8B's Science test marks (30 students, out of 50): 42, 28, 35, 47, 22, 38, 42, 50, 35, 28, 42, 33, 47, 22, 35, 28, 38, 42, 33, 50, 35, 22, 42, 47, 28, 38, 33, 35, 47, 42. <span class="vcue">[Show raw list]</span> Before organising — what can you already infer? What can't you tell yet?</p>

        <div class="stage-marker elaborate"></div>
        <p>Group into three ranges: Below 30 (7 students), 30–39 (11 students), 40+ (12 students). <span class="vcue">[Show frequency table and bar graph]</span> The bar graph shows that the majority of students (23 out of 30) scored 30 or above, suggesting reasonable overall understanding. The 7 students below 30 represent the teacher's priority group for follow-up. The data doesn't tell us why they struggled — that requires teacher investigation — but it tells us clearly how many and at what level.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Detective Assignment</span>
          You receive monthly attendance data for Class 8: April 92%, May 88%, June 75%, July 71%, August 85%, September 90%. Build a bar graph and write a two-sentence interpretation that a principal could act on. Include one specific recommendation.
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Consolidation — Path B</h3>
        <div class="practice-q">A school canteen recorded daily sales for one week: Monday 120, Tuesday 95, Wednesday 140, Thursday 130, Friday 180, Saturday 60, Sunday 0. (a) Make a frequency table. (b) Describe a bar graph of this data. (c) Identify the trend and explain it in terms of the school week. (d) If the canteen manager can only fully staff on 4 days, which days should they choose and why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Table: Mon-120, Tue-95, Wed-140, Thu-130, Fri-180, Sat-60, Sun-0. Total = 725. (b) Bar graph shows a peak on Friday (tallest bar), a clear dip on Saturday, and zero on Sunday. The bars rise through the week Monday to Friday then drop sharply. (c) The trend follows the school week — highest on Friday (end of week, busiest social day), lowest on weekend (fewer students). Wednesday and Thursday also show strong sales mid-week. (d) The four days the manager should fully staff: Friday (highest, 180), Wednesday (140), Thursday (130), and Monday (120). These four days account for 570 of 725 total sales — about 79% of revenue.</div>
      </div>
    </div>

  </div><!-- end panel-b -->`,
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
      questions: buildAdaptiveQuestions(3, 6)
    }
  ]
};

export const module_3: Module = filterModuleByPath(moduleData, 'B');
