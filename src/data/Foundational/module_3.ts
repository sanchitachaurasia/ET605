import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_3';
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
  id: '2.3',
  title: 'Pie Charts & Circle Graphs',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'What Is a Pie Chart?',
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Estimated reading time: 15–18 minutes &nbsp;·&nbsp; Path A — Full Foundational</div>

<div class="section-block" id="s1">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 1 of 4</p>
      <h2 class="section-title">What Is a Pie Chart?</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Let's start with a situation you've probably been in. Your family earns ₹20,000 every month. The money goes to different places — food, house rent, school fees, clothes, savings. Now, your teacher asks: "Can you show ALL the spending categories AND their proportions in one single picture?" <span class="vcue">[Show a monthly budget table on screen]</span></p>

        <p>You think — I'll draw a bar graph! Good idea. You draw it. But wait. The bar graph shows you how much money goes to each category. It does NOT easily show you what fraction of the whole each category takes up. You can't immediately see from the bar graph that Food takes up one-quarter of the income, or that Savings is exactly the same share as House Rent. The bar graph is showing amounts, but not the relationship of each part to the whole. <span class="pcue">(Pause — let this sink in)</span> This is exactly the problem a pie chart solves.</p>

        <div class="callout definition">
          <span class="callout-label">Definition — Pie Chart (Circle Graph)</span>
          A pie chart, also called a circle graph, is a circular diagram where the whole circle represents the total amount (100%), and the circle is divided into sectors. Each sector represents one category, and the size of each sector is proportional to the share of that category in the whole. Bigger share = bigger slice. Smaller share = smaller slice.
        </div>

        <div class="stage-marker explore"></div>
        <p>Look at a clock face for a moment. <span class="vcue">[Show a clock face on screen]</span> The clock is a full circle — 360 degrees all the way around. Now imagine the clock face is your family's monthly income. If food takes up half the income, it takes up half the circle — from 12 o'clock all the way to 6 o'clock. That's 180 degrees. If rent takes up a quarter of the income, it gets one quarter of the circle — 90 degrees. Do you see how the circle becomes a picture of proportions?</p>

        <p>Now think about this: the whole circle is 360 degrees. If ALL the categories together add up to 360 degrees, then together they represent 100% of the income — which must be true. This is the key mathematical idea: <strong>the sum of all sector angles in a pie chart is always exactly 360 degrees.</strong></p>

        <div class="stage-marker explain"></div>
        <p>Let's understand the structure of a pie chart by looking at a real example. The NCERT textbook gives us data about the favourite ice cream flavours of students in a school. Here it is: <span class="vcue">[Show the data table on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Flavour</th><th>% of Students</th></tr></thead>
          <tbody>
            <tr><td>Chocolate</td><td class="num">50%</td></tr>
            <tr><td>Vanilla</td><td class="num">25%</td></tr>
            <tr><td>Other flavours</td><td class="num">25%</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>100%</strong></td></tr>
          </tbody>
        </table>

        <p>Now, the total angle in a circle is 360°. Each flavour's sector angle is a fraction of 360°, equal to its fraction of the total. Let's work this out for Chocolate. Chocolate has 50% of students. So Chocolate's sector gets 50% of the circle. 50% of 360° = (50 ÷ 100) × 360° = 0.5 × 360° = 180°. That means the Chocolate sector takes up exactly half the circle. <span class="vcue">[Draw this on the circle diagram — show Chocolate filling exactly half]</span></p>

        <table class="data-table">
          <thead><tr><th>Flavour</th><th>% of Students</th><th>As a Fraction</th><th>Sector Angle</th></tr></thead>
          <tbody>
            <tr><td>Chocolate</td><td class="num">50%</td><td class="frac">50/100 = 1/2</td><td class="ang">½ × 360° = 180°</td></tr>
            <tr><td>Vanilla</td><td class="num">25%</td><td class="frac">25/100 = 1/4</td><td class="ang">¼ × 360° = 90°</td></tr>
            <tr><td>Other flavours</td><td class="num">25%</td><td class="frac">25/100 = 1/4</td><td class="ang">¼ × 360° = 90°</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>100%</strong></td><td></td><td class="ang"><strong>360°</strong></td></tr>
          </tbody>
        </table>

        <div class="pie-wrap">
          <p class="pie-chart-title">Favourite Ice Cream Flavours — Class Survey</p>
          <div class="pie-svg-area">
            <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
              <!-- Chocolate: 180° (top half) -->
              <path d="M100,100 L100,10 A90,90 0 1,1 99.999,10 Z" fill="var(--active-mid)" opacity="0.9"/>
              <!-- Vanilla: 90° (bottom-right quarter) -->
              <path d="M100,100 L100,190 A90,90 0 0,1 190,100 Z" fill="#f59e0b" opacity="0.9"/>
              <!-- Others: 90° (bottom-left quarter) -->
              <path d="M100,100 L190,100 A90,90 0 0,1 100,10 Z" fill="#10b981" opacity="0.9"/>
              <!-- Labels -->
              <text x="100" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family="sans-serif">Choc.</text>
              <text x="100" y="74" text-anchor="middle" font-size="10" fill="white" font-family="sans-serif">50%</text>
              <text x="152" y="155" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="sans-serif">Van.</text>
              <text x="152" y="167" text-anchor="middle" font-size="9" fill="white" font-family="sans-serif">25%</text>
              <text x="48" y="155" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="sans-serif">Other</text>
              <text x="48" y="167" text-anchor="middle" font-size="9" fill="white" font-family="sans-serif">25%</text>
            </svg>
          </div>
          <div class="pie-legend">
            <div class="pie-legend-item"><span class="pie-swatch" style="background:var(--active-mid)"></span><span class="pie-legend-label">Chocolate</span><span class="pie-legend-val">50% · 180°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#f59e0b"></span><span class="pie-legend-label">Vanilla</span><span class="pie-legend-val">25% · 90°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#10b981"></span><span class="pie-legend-label">Other flavours</span><span class="pie-legend-val">25% · 90°</span></div>
          </div>
        </div>

        <div class="callout tip">
          <span class="callout-label">Always Verify — Angles Must Sum to 360°</span>
          After calculating all sector angles, add them up. They must total exactly 360°. Here: 180° + 90° + 90° = 360°. ✓ If they don't add up to 360°, you have made a calculation error somewhere. This check is mandatory every time you draw a pie chart.
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Let's look at another everyday example. The time a child spends in a day. <span class="vcue">[Show the data on screen]</span> A day has 24 hours. How the child spends those 24 hours: Sleep 8 hours, School 6 hours, Homework 4 hours, Play 4 hours, Others 2 hours. Let's verify: 8 + 6 + 4 + 4 + 2 = 24 hours. ✓ Good, all 24 hours are accounted for. Now let's find the sector angle for Sleep: (8 ÷ 24) × 360° = (1 ÷ 3) × 360° = 120°. And for School: (6 ÷ 24) × 360° = (1 ÷ 4) × 360° = 90°.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          Using the child's daily schedule (Sleep 8 hr, School 6 hr, Homework 4 hr, Play 4 hr, Others 2 hr): (a) What fraction of the day is spent on Homework? (b) What is the sector angle for Play? (c) What is the sector angle for Others? (d) Add up all five sector angles — do they sum to 360°?
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 1</h3>
        <div class="practice-q">Q1. A class of 30 students was asked their favourite season. Results: Summer — 6 students, Rainy — 12 students, Winter — 12 students. (a) What fraction of the class prefers Summer? (b) Without calculating yet — which two seasons have equal sector angles? How do you know? (c) Calculate the sector angle for Rainy season.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Summer fraction = 6/30 = 1/5. (b) Rainy and Winter — both have 12 students each, i.e., the same count, so they will have the same sector angle. Equal counts = equal fractions = equal angles. (c) Rainy fraction = 12/30 = 2/5. Sector angle = (2/5) × 360° = 144°. You can check: Summer = (1/5) × 360° = 72°. Winter = 144°. Sum = 72 + 144 + 144 = 360°. ✓</div>
        <div class="practice-q">Q2. A shopkeeper sells four types of bread: Whole wheat — 40%, White — 30%, Multigrain — 20%, Other — 10%. What would be the sector angle for each type? Verify your answer.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Whole wheat: (40/100) × 360° = 144°. White: (30/100) × 360° = 108°. Multigrain: (20/100) × 360° = 72°. Other: (10/100) × 360° = 36°. Verification: 144 + 108 + 72 + 36 = 360°. ✓</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- ── TOPIC 2 ── -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_3']['topic_1'],
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
      title: 'Calculating Sector Angles — The Formula & Reverse Calculation',
      textContent: `<div class="section-block" id="s2">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 2 of 4</p>
      <h2 class="section-title">Calculating Sector Angles — The Formula &amp; Reverse Calculation</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Now we know what a pie chart looks like and what it represents. The next skill is being able to build one from scratch. And this means we need to be very confident with one formula. Let's understand it completely — not just memorise it, but understand WHERE it comes from. <span class="vcue">[Show the formula derivation on screen]</span></p>

        <div class="stage-marker explore"></div>
        <p>Think about it this way. If you have 720 rupees in total, and you spend 240 rupees on food, what fraction of your money went to food? It's 240 ÷ 720 = 1/3. Now, if the whole circle is 360°, what angle represents 1/3 of the circle? It's (1/3) × 360° = 120°. We just used the formula — we computed the fraction first, then multiplied by 360°. That's all the formula does. <span class="pcue">(It's that simple)</span></p>

        <div class="stage-marker explain"></div>
        <p>The formula, stated cleanly:</p>

        <div class="formula-block">
          <span class="formula-label">Central Angle Formula</span>
          <span class="formula-main">Sector Angle = (Value ÷ Total) × 360°</span>
        </div>

        <p>If the data is given as percentages instead of raw values, use this equivalent form:</p>

        <div class="formula-block">
          <span class="formula-label">When Data Is in Percentages</span>
          <span class="formula-main">Sector Angle = (Percentage ÷ 100) × 360°</span>
        </div>

        <p>Let's now do a full worked example from the NCERT textbook: the sales of different items at a baker's shop on one day. <span class="vcue">[Show the data table on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Item</th><th>Sales (₹)</th><th>Fraction</th><th>Sector Angle</th></tr></thead>
          <tbody>
            <tr><td>Ordinary Bread</td><td class="num">320</td><td class="frac">320/720 = 4/9</td><td class="ang">(4/9) × 360° = 160°</td></tr>
            <tr><td>Fruit Bread</td><td class="num">80</td><td class="frac">80/720 = 1/9</td><td class="ang">(1/9) × 360° = 40°</td></tr>
            <tr><td>Cakes &amp; Pastries</td><td class="num">160</td><td class="frac">160/720 = 2/9</td><td class="ang">(2/9) × 360° = 80°</td></tr>
            <tr><td>Biscuits</td><td class="num">120</td><td class="frac">120/720 = 1/6</td><td class="ang">(1/6) × 360° = 60°</td></tr>
            <tr><td>Others</td><td class="num">40</td><td class="frac">40/720 = 1/18</td><td class="ang">(1/18) × 360° = 20°</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>720</strong></td><td></td><td class="ang"><strong>360°</strong></td></tr>
          </tbody>
        </table>

        <div class="pie-wrap">
          <p class="pie-chart-title">Baker's Shop — Daily Sales Breakdown</p>
          <div class="pie-svg-area">
            <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
              <!-- Ordinary Bread 160°: start at top (270°), go 160° clockwise -->
              <path d="M100,100 L100,10 A90,90 0 0,1 186.4,135 Z" fill="var(--active-mid)" opacity="0.9"/>
              <!-- Biscuits 60° -->
              <path d="M100,100 L186.4,135 A90,90 0 0,1 145,178 Z" fill="#f59e0b" opacity="0.85"/>
              <!-- Cakes 80° -->
              <path d="M100,100 L145,178 A90,90 0 0,1 10,100 Z" fill="#10b981" opacity="0.85"/>
              <!-- Fruit Bread 40° -->
              <path d="M100,100 L10,100 A90,90 0 0,1 55,22 Z" fill="#8b5cf6" opacity="0.85"/>
              <!-- Others 20° -->
              <path d="M100,100 L55,22 A90,90 0 0,1 100,10 Z" fill="#ef4444" opacity="0.85"/>
            </svg>
          </div>
          <div class="pie-legend">
            <div class="pie-legend-item"><span class="pie-swatch" style="background:var(--active-mid)"></span><span class="pie-legend-label">Ord. Bread</span><span class="pie-legend-val">160°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#f59e0b"></span><span class="pie-legend-label">Biscuits</span><span class="pie-legend-val">60°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#10b981"></span><span class="pie-legend-label">Cakes &amp; Pastries</span><span class="pie-legend-val">80°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#8b5cf6"></span><span class="pie-legend-label">Fruit Bread</span><span class="pie-legend-val">40°</span></div>
            <div class="pie-legend-item"><span class="pie-swatch" style="background:#ef4444"></span><span class="pie-legend-label">Others</span><span class="pie-legend-val">20°</span></div>
          </div>
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Now let's learn something very important — reverse calculation. What if someone gives you a pie chart and tells you the angle of one sector and the total value, and asks you to find the actual value for that sector? <span class="vcue">[Show NCERT Example 1 on screen — family expenditure pie chart]</span></p>

        <p>The NCERT textbook gives us a family's monthly budget as a pie chart: Food 25%, House Rent 10%, Education 15%, Clothes 10%, Transport 5%, Others 20%, Savings 15%. The monthly savings are ₹3,000. What is the monthly expenditure on clothes?</p>

        <div class="step-box">
          <span class="step-label">Step 1 — Find what 1% represents</span>
          Savings = 15% of total income = ₹3,000. So 1% of total income = 3,000 ÷ 15 = ₹200.
        </div>
        <div class="step-box">
          <span class="step-label">Step 2 — Find the value for Clothes</span>
          Clothes = 10% of total income = 10 × ₹200 = ₹2,000.
        </div>

        <div class="callout tip">
          <span class="callout-label">The Two Directions of Pie Chart Calculations</span>
          Direction 1 — Building the chart (Given value → Find angle): Use (Value ÷ Total) × 360°. Direction 2 — Reading the chart (Given angle → Find value): Use (Angle ÷ 360°) × Total. OR use the unitary method: if X% = known value, then 1% = (known value ÷ X), then 100% = total. Always identify which direction you're going before starting.
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          A pie chart shows the marks scored by a student in 5 subjects. Total marks = 540. The sector angles are: Hindi 70°, English 55°, Maths 90°, Social Science 65°, Science 80°. (a) Verify: do these angles add to 360°? (b) How many marks did the student score in Maths? (c) Which subject has the highest score? (d) How many more marks were scored in Maths than in Hindi?
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 2</h3>
        <div class="practice-q">Q1. A group of 360 people voted for their favourite season: Summer 90, Rainy 120, Winter 150. (a) Find the central angle for each season. (b) Verify that angles sum to 360°. (Hint: notice that the total number of people happens to equal 360 — does this make any step simpler?)</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Summer: (90/360) × 360° = 90°. Rainy: (120/360) × 360° = 120°. Winter: (150/360) × 360° = 150°. (b) 90 + 120 + 150 = 360°. ✓ Important shortcut: when the total count equals 360, each person contributes exactly 1° to the circle. So Summer's 90 people → 90° directly. This shortcut only works when the total = 360. Do NOT use this shortcut with any other total.</div>
        <div class="practice-q">Q2. A pie chart shows the languages spoken by students in a hostel: Hindi 40, English 12, Marathi 9, Tamil 7, Bengali 4. Total = 72. Find the sector angle for each language. Which language has the largest sector?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Hindi: (40/72) × 360° = 200°. English: (12/72) × 360° = 60°. Marathi: (9/72) × 360° = 45°. Tamil: (7/72) × 360° = 35°. Bengali: (4/72) × 360° = 20°. Verification: 200+60+45+35+20 = 360°. ✓ Hindi has the largest sector at 200° — more than half the circle.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- ── TOPIC 3 ── -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_3']['topic_2'],
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
      title: 'When to Use Pie Charts — and When NOT To',
      textContent: `<div class="section-block" id="s3">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 3 of 4</p>
      <h2 class="section-title">When to Use Pie Charts — and When NOT To</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>We've now learned how to construct and read pie charts. But here's a very important question that data analysts always ask: just because I can draw a pie chart, does that mean I should? The answer is: not always. A good data scientist chooses the right graph for the right data. Using the wrong graph can actually make data harder to understand — or even misleading. <span class="vcue">[Show two side-by-side graphs for the same data — one appropriate, one inappropriate]</span></p>

        <div class="stage-marker explain"></div>
        <p>When does a pie chart work best? A pie chart is the right choice when: you want to show how a whole is split into parts, all parts together add up to 100% (or the total), and you want the reader to immediately see which part is biggest and roughly how large each share is. Think: budget breakdowns, survey result distributions, demographic splits.</p>

        <div class="compare-grid">
          <div class="compare-card use">
            <h4>✓ Use a Pie Chart When…</h4>
            Data parts add up to a meaningful whole (100%). You want to show proportions, not just amounts. There are not too many categories (ideally 2–6 slices). The main question is "what share does each part take?" Example: showing what fraction of a school budget goes to different departments.
          </div>
          <div class="compare-card no-use">
            <h4>✗ Don't Use a Pie Chart When…</h4>
            Data shows change over time (use a line graph or bar graph instead). Categories don't add up to a meaningful whole. There are many categories — too many slices make a pie chart unreadable. You want to compare exact amounts precisely (bar graphs are better for this). Example: showing production of food grains across multiple years.
          </div>
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Let’s explore three examples to understand which graph is most suitable for different types of data. <span class="vcue">[Show the three datasets on screen]</span></p>

        <p><strong>Dataset 1 — Food grain production by year (2001–2006):</strong> This data tracks production over time. Time-series data belongs on a bar graph or line graph, not a pie chart. Why? Because a pie chart cannot show that 2001 came before 2002 — it has no sense of sequence or trend. A pie chart of this data would be misleading.</p>

        <p><strong>Dataset 2 — Choice of food (North Indian 30, South Indian 40, Chinese 25, Others 25, Total 120):</strong> These are four categories that together represent the preferences of a group of people — all 120 of them. This is a classic pie chart situation. The categories add to 100% of the group, and we want to see each cuisine's share. A bar graph works too, but a pie chart shows the proportional story more vividly.</p>

        <p><strong>Dataset 3 — Daily income of factory workers (income range vs number of workers):</strong> This data is grouped by income ranges — these are class intervals on a continuous scale. The right graph here is a histogram, not a pie chart. The workers don't "add up to 100%" in a proportional sense — we're looking at distribution across a continuous range, which is a job for a histogram.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          For each situation below, say whether a pie chart is the right choice and explain why or why not: (a) Showing the percentage of students in a school who play cricket, football, badminton, and no sport. (b) Showing the monthly temperature of a city from January to December. (c) Showing what fraction of a 24-hour day a student spends on different activities.
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 3</h3>
        <div class="practice-q">A student says: "I'll use a pie chart to show the scores of 5 students in a Maths test." The scores are: Rohan 85, Priya 72, Kiran 90, Anita 68, Dev 78. Is this a good idea? What would be wrong with this pie chart? What graph should be used instead?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">This is a poor choice. A pie chart shows PARTS OF A WHOLE. These 5 scores do not represent parts of a single total in any meaningful way — Rohan's 85 marks is not a "share" of the combined total in any useful sense. The pie chart would suggest that together their scores add up to something meaningful, which they don't. Also, the pie chart would make it very hard to compare exact scores (who scored highest?). A bar graph is the right choice here — it shows each student's score as a separate bar, making comparison easy and precise.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- ── TOPIC 4 ── -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_3']['topic_3'],
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
      textContent: `<div class="section-block" id="s4">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 4 of 4</p>
      <h2 class="section-title">Real-World Pie Chart Analysis Project</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>In this final section, we put everything together. You're going to read, interpret, and analyse a real pie chart — not just draw one. This is the skill that matters most in real life. When you see a pie chart in a newspaper, a company report, or a government publication, can you extract precise information, compare sectors, and reason about what the chart is telling you? <span class="vcue">[Show the NCERT Exercise 4.1 Q1 pie chart — types of music preferred by young people: Classical 10%, Semi-Classical 20%, Folk 30%, Light 40%]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>Let's work through the NCERT's music survey pie chart completely. The chart shows four music types with these percentages: Light 40%, Folk 30%, Semi-Classical 20%, Classical 10%. Let's answer each type of question this chart can generate.</p>

        <p><strong>Question type 1 — Reading the chart directly:</strong> Which type of music is liked by the maximum number of people? Light music — because its sector is the largest at 40%.</p>

        <p><strong>Question type 2 — Reverse calculation from a percentage:</strong> If 20 people liked Classical music, how many young people were surveyed in total? Classical music = 10% of total. If 10% = 20 people, then 1% = 2 people, and 100% = 200 people. So 200 people were surveyed in total.</p>

        <p><strong>Question type 3 — Applying a total to find counts:</strong> If a cassette company were to make 1000 CDs, how many of each type would they make? Light music: 40% × 1000 = 400 CDs. Folk: 30% × 1000 = 300 CDs. Semi-Classical: 20% × 1000 = 200 CDs. Classical: 10% × 1000 = 100 CDs. Check: 400 + 300 + 200 + 100 = 1000. ✓</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Module 2.3 — Final Challenge</span>
          A school tracks three activities: Library borrowing, Sports participation, and Canteen sales (in ₹ hundreds) over a semester. The data is: Library 45, Sports 30, Canteen 82, Others 23. Total = 180. (a) Calculate the sector angle for each category. (b) Which category has the largest sector — is this surprising? Why or why not? (c) If library borrowing increased next semester to 60 (with the same total), what would its new sector angle be? (d) The principal wants to present this as a pie chart to parents. Is a pie chart the right choice? What would it show that a bar graph would not?
        </div>
      </div>

      <div class="practice-box">
        <h3>Final Consolidation Practice — Module 2.3</h3>
        <div class="practice-q">The adjoining pie chart gives marks scored in an examination: Hindi 70°, English 55°, Maths 90°, Social Science 65°, Science 80°. Total marks obtained = 540. (a) In which subject did the student score 105 marks? (Hint: find the angle that corresponds to 105 marks first.) (b) How many more marks were obtained in Maths than in Hindi? (c) Is the sum of marks in Social Science and Maths more than that in Science and Hindi?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) First find the angle for 105 marks: (105/540) × 360° = 70°. The subject with a 70° sector is Hindi. So the student scored 105 marks in Hindi. (b) Maths marks = (90/360) × 540 = (1/4) × 540 = 135. Hindi marks = 105 (from above). Difference = 135 − 105 = 30 marks more in Maths. (c) Social Science marks = (65/360) × 540 = 97.5 marks. Maths = 135. Sum of SS + Maths = 232.5. Science = (80/360) × 540 = 120. Hindi = 105. Sum of Science + Hindi = 225. Since 232.5 > 225, yes — the sum of Social Science and Maths marks IS more than Science and Hindi. (Note: you can also compare just the angles without calculating marks: SS + Maths = 65+90=155° vs Science + Hindi = 80+70=150°. Since 155 > 150, the first pair is larger.)</div>
      </div>
    </div>`,
      videoUrl: videoLinks['module_3']['topic_4'],
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
      textContent: `<!-- ── TOPIC 5 ── -->
    <div class="section-block" id="s5">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 5 of 6</p>
      <h2 class="section-title">Reading &amp; Interpreting Graphs</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>We've learned how to make graphs — now we need to learn how to READ them. And I don't just mean reading the numbers off the Y-axis. I mean really interpreting what a graph is telling you. <span class="vcue">[Show a student's test score bar graph across 5 tests]</span> Imagine you're a student and your teacher shows you this graph of your last 5 test scores. Can you tell whether you're improving? Can you spot if there was one particular test where you really struggled? Can you predict how you might do on the next test? All of this comes from careful interpretation — not just reading numbers, but finding the story behind them.</p>

        <div class="stage-marker explore"></div>
        <p>Here are a student's scores in 5 consecutive Maths tests: Test 1 — 55, Test 2 — 62, Test 3 — 58, Test 4 — 70, Test 5 — 75. <span class="vcue">[Show bar graph of these scores]</span> Look at this graph for a moment. <span class="pcue">(Pause 3 seconds)</span> What is the first thing you notice? The general trend? The dip in Test 3? The rise toward the end? All of these are observations — and interpretation means turning observations into understanding and conclusions.</p>

        <div class="stage-marker explain"></div>
        <p>When interpreting any graph, follow three steps. Step one: read the basics — what is the title? What do the X and Y axes represent? What is the scale? This gives you context. Step two: make observations — what is the highest value? The lowest? Are there any sudden rises or drops? Is there a general trend going up or down? Step three: draw conclusions — what do these observations tell us about the real-world situation? Why might the data look this way?</p>
        <p>For our student's test scores: the observations are that scores dropped from Test 2 to Test 3, then rose steadily. The conclusion might be that the student had a difficult week before Test 3, but then studied harder and improved. Interpretation goes beyond the numbers — it connects data to real life.</p>

        <div class="callout tip">
          <span class="callout-label">Key Vocabulary for Interpretation</span>
          When interpreting graphs, use these words: Trend (general direction of data over time), Peak (the highest point), Trough (the lowest point), Increase / Decrease, Steady (no significant change), Sharp rise / Sharp fall (sudden big change). Using precise vocabulary makes your interpretation more powerful.
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Let's now interpret a double bar graph together. <span class="vcue">[Show a double bar graph: Maths scores of two students — Arjun and Meera — over 5 tests]</span> Arjun's scores: 60, 65, 70, 68, 75. Meera's scores: 72, 70, 68, 75, 80. <span class="pcue">(Read from the graph)</span> What can we say? Both students show a general upward trend. Meera consistently scores higher than Arjun except in Test 3 where they were close. The gap between them is largest in Test 5. Arjun improved by 15 points overall (60 to 75), while Meera improved by 8 points (72 to 80). The double bar graph makes all of this comparison easy to see.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          A bar graph shows a school library's book-borrowing data for six months: Jan-50, Feb-45, Mar-70, Apr-80, May-30, Jun-25. (a) In which month was borrowing the highest? (b) Describe the trend from April to June — use the word "sharp" if appropriate. (c) Why do you think May and June show the lowest numbers? (Hint: think about the school calendar.)
        </div>
      </div>

</div>

<hr class="section-divider">`,
      videoUrl: videoLinks['module_3']['topic_5'],
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
      textContent: `<!-- ── TOPIC 6 ── -->
    <div class="section-block" id="s6">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 6 of 6</p>
      <h2 class="section-title">Class Activity: Be a Data Detective</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Alright, class — we've learned every tool in our data toolkit. Now it's time to use them all together. Today you are a data detective. <span class="vcue">[Show a detective badge and a folder labelled "Case File: Class 8B"]</span> A data detective takes raw, messy, real-world data and turns it into clear, useful insights that help people make decisions. Doctors do this. School principals do this. Sports coaches do this. News reporters do this. And now — you'll do it too.</p>

        <div class="stage-marker explore"></div>
        <p>Here is your case file. <span class="vcue">[Show a jumbled list of 30 student marks from a class test, out of 50]</span> These are the marks of 30 students from Class 8B in their recent Science test: 42, 28, 35, 47, 22, 38, 42, 50, 35, 28, 42, 33, 47, 22, 35, 28, 38, 42, 33, 50, 35, 22, 42, 47, 28, 38, 33, 35, 47, 42. <span class="pcue">(Look at this list. What can you see? Anything? Almost nothing, right?)</span> Your job is to find out: how is the class performing? Are most students doing well, average, or poorly? Are there a few students who are struggling that the teacher should pay attention to?</p>

        <div class="stage-marker explain"></div>
        <p>Here's the detective process — the exact steps you'll follow. First, organise the data into groups. We'll create three groups: Below 30 (needs support), 30 to 39 (average), and 40 and above (doing well). Second, use tally marks to count how many students fall in each group. Third, create a frequency table. Fourth, represent it as a bar graph. Fifth — and this is the detective part — interpret what you see and write a recommendation for the teacher.</p>

        <div class="stage-marker elaborate"></div>
        <p>Let's work through it together. <span class="vcue">[Show the data being sorted into groups one by one]</span> Going through the 30 marks: scores below 30 — 28, 22, 28, 22, 28, 22, 28 — that's 7 students. Scores from 30 to 39 — 35, 38, 35, 33, 35, 38, 33, 35, 33, 35, 38 — that's 11 students. Scores 40 and above — 42, 47, 42, 50, 42, 47, 42, 50, 42, 47, 47, 42 — that's 12 students. Total: 7 + 11 + 12 = 30. Matches our class size — the detective's verification check passes. <span class="vcue">[Show the completed frequency table and bar graph side by side]</span></p>

        <table class="data-table">
          <thead><tr><th>Score Range</th><th>Tally</th><th>Frequency</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>Below 30</td><td class="tally">|||| ||</td><td class="num">7</td><td style="color:#dc2626;font-size:13px">Needs Support</td></tr>
            <tr><td>30 – 39</td><td class="tally">|||| |||| |</td><td class="num">11</td><td style="color:#ca6f1e;font-size:13px">Average</td></tr>
            <tr><td>40 and above</td><td class="tally">|||| |||| ||</td><td class="num">12</td><td style="color:#059669;font-size:13px">Doing Well</td></tr>
          </tbody>
        </table>

        <p>Now the detective's conclusion: most of the class — 23 out of 30 students — scored 30 or above, which means the majority understood the material. However, 7 students scored below 30, and these students need the teacher's attention. The teacher might consider a revision session focused on the weaker concepts. The data doesn't tell us WHY these 7 students struggled — that's where the teacher needs to step in. But the data very clearly tells us WHO and HOW MANY. That's the value of data — it points to where attention is needed.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Your Detective Assignment</span>
          Here is new raw data: The number of books borrowed from a school library by students in 6 different classes — Class 6: 45, Class 7: 38, Class 8: 62, Class 9: 29, Class 10: 18, Class 11: 52. (a) Make a frequency table. (b) Draw (or describe) a bar graph. (c) Which class borrows the most? Which borrows the least? (d) Write ONE recommendation for the school librarian based on this data.
        </div>
      </div>

    </div>

</div>`,
      videoUrl: videoLinks['module_3']['topic_6'],
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

export const module_3: Module = filterModuleByPath(moduleData, 'A');
