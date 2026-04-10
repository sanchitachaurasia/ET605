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
      title: 'What Is a Pie Chart? — Conceptual Foundation',
      textContent: `<div class="duration-badge" style="background:var(--c-light);color:var(--c-hue);">⏱ Estimated reading time: 6–8 minutes &nbsp;·&nbsp; Path C — Advanced</div>

<div class="section-block" id="s1c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 1 of 4</p>
      <h2 class="section-title">What Is a Pie Chart? — Conceptual Foundation</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>A pie chart is not simply a "colourful circle" — it is a proportional representation where visual area encodes mathematical share. The circle represents a fixed whole (360° = 100%), and each sector's central angle is exactly proportional to its category's share of that whole. This makes the pie chart uniquely suited to answering one specific question: "What fraction of the total does each part represent?" It answers this question visually, without arithmetic, for a reader who can judge relative areas. <span class="vcue">[Show the ice cream flavour chart — read it as a proportional map, not a counting exercise]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>The mathematics: sector angle = (value/total) × 360°. This is a linear mapping from the data domain [0, total] to the angular domain [0°, 360°]. The constraint: all angles must sum to 360°, just as all values must sum to the total. This constraint is not just a verification step — it is the structural definition of what makes a pie chart valid. A "pie chart" where sectors don't sum to 360° is not a valid representation of a whole; it is a mis-labelled bar graph drawn in a circle.</p>

        <div class="callout challenge">
          <span class="callout-label">Conceptual Challenge</span>
          A pie chart shows three sectors with angles 120°, 150°, and 85°. (a) Is this a valid pie chart? Why or why not? (b) A student says: "I'll redraw it so the three sectors become 130°, 150°, and 80°." Is this better? Why? (c) What is the minimum change needed to make the original three angles form a valid pie chart?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 1</h3>
        <div class="practice-q">TV viewers pie chart: Entertainment 50%, Sports 25%, News 15%, Informative 10%. (a) What fraction of viewers watch Entertainment? (b) Which two programme types together equal the Sports viewership? (c) If total viewers = 3,600, how many watch News? (d) If News viewership increases by 180 viewers (total unchanged), by how many degrees does the News sector increase?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) 50% = 1/2. (b) News (15%) + Informative (10%) = 25% = Sports (25%). So News + Informative viewers = Sports viewers. (c) News = 15% × 3600 = 540 viewers. (d) New News viewers = 540 + 180 = 720. New percentage = (720/3600) × 100 = 20%. New angle = (20/100) × 360° = 72°. Old angle = (15/100) × 360° = 54°. Increase = 72° − 54° = 18°.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T2C -->

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
      title: 'Calculating Sector Angles — Both Directions & Chain Reasoning',
      textContent: `<div class="section-block" id="s2c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 2 of 4</p>
      <h2 class="section-title">Calculating Sector Angles — Both Directions &amp; Chain Reasoning</h2>
      <div class="narration">
        <div class="stage-marker elaborate"></div>
        <p>Two directions of the formula, and a third — chain reasoning. <span class="vcue">[Show all three formula forms]</span></p>

        <div class="formula-block">
          <span class="formula-label">Forward — Given value, find angle</span>
          <span class="formula-main">Angle = (Value ÷ Total) × 360°</span>
        </div>
        <div class="formula-block">
          <span class="formula-label">Reverse — Given angle and total, find value</span>
          <span class="formula-main">Value = (Angle ÷ 360°) × Total</span>
        </div>
        <div class="formula-block">
          <span class="formula-label">Chain — Given one value and its %, find total, then any other value</span>
          <span class="formula-main">Total = (Known value ÷ Known %) × 100</span>
        </div>

        <p>The chain method is the most powerful. NCERT Example 1: Savings = 15% = ₹3,000. Chain: Total = (3,000 ÷ 15) × 100 = ₹20,000. Now any category's amount can be found: Clothes (10%) = 10% × ₹20,000 = ₹2,000. Food (25%) = ₹5,000. The chain gives you the total, which unlocks every other calculation. <span class="vcue">[Show the full budget pie chart with all category amounts derived]</span></p>

        <p>Relative sector comparison (no total needed): Are the sum of Social Science and Maths marks more than Science and Hindi? SS angle = 65°, Maths = 90°, sum = 155°. Science = 80°, Hindi = 70°, sum = 150°. Since 155° > 150°, the answer is yes — and you never needed to calculate a single mark. Angular comparison replaces arithmetic comparison when you only need to know which is larger.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Multi-Step Challenge</span>
          A pie chart of a school's annual expenses shows: Teaching Staff 40%, Infrastructure 25%, Library 10%, Sports 15%, Admin 10%. The Admin budget is ₹50,000. (a) Find the total annual budget. (b) Find the amount for each category. (c) The board decides to reduce Infrastructure by 5% and add it to Sports. What are the new angles for both categories? (d) A journalist reports "Sports spending jumped by 33%." Is this accurate? Show the calculation.
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 2</h3>
        <div class="practice-q">Colours preferred by 36 people — Blue: 18, Green: 9, Red: 6, Yellow: 3. (a) Calculate all sector angles. (b) Blue's angle is X°. Express the angles of Green, Red, and Yellow as fractions of Blue's angle. (c) If a fifth colour "Purple" is added with 6 people, and the total becomes 42, what is Purple's new sector angle? What happens to all other angles?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Total = 36. Blue: (18/36)×360 = 180°. Green: (9/36)×360 = 90°. Red: (6/36)×360 = 60°. Yellow: (3/36)×360 = 30°. Sum = 360°. ✓ (b) Blue = 180°. Green = 90° = (1/2) of Blue. Red = 60° = (1/3) of Blue. Yellow = 30° = (1/6) of Blue. (c) New total = 42. Purple = (6/42)×360 = 51.4°. All other angles change: Blue = (18/42)×360 = 154.3°. Green = (9/42)×360 = 77.1°. Red = (6/42)×360 = 51.4°. Yellow = (3/42)×360 = 25.7°. Sum = 154.3+77.1+51.4+51.4+25.7 = 359.9° ≈ 360° (rounding). Key insight: adding a new category without increasing the total is impossible — the total MUST increase, which reduces ALL existing sectors proportionally.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T3C -->

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
      title: 'When to Use Pie Charts — Critical Evaluation',
      textContent: `<div class="section-block" id="s3c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 3 of 4</p>
      <h2 class="section-title">When to Use Pie Charts — Critical Evaluation</h2>
      <div class="narration">
        <div class="stage-marker elaborate"></div>
        <p>The graph selection question is analytical, not procedural. The decision framework: (1) Does the data represent parts of a meaningful, fixed whole? If yes — pie chart is a candidate. (2) Is comparison of exact values important? If yes — bar graph is better (humans judge bar heights more accurately than sector areas). (3) Is the data sequential/temporal? If yes — line or bar graph. (4) Is the data a continuous distribution? If yes — histogram. (5) Are there more than 6–7 categories? If yes — a pie chart becomes unreadable; use a bar graph.</p>

        <p>The NCERT datasets: Food choices (North Indian/South Indian/Chinese/Others) — valid for pie chart: four clean categories, all people accounted for. Food grain production 2001–2006 — invalid for pie chart: sequential data, trend matters, years are not "parts of a whole." Factory workers by income range — invalid: continuous grouped data, histogram required.</p>

        <div class="callout challenge">
          <span class="callout-label">Critical Analysis — Misleading Pie Charts</span>
          A company presents two pie charts showing market share: Year 1 (their share 30%, competitors 70%) and Year 2 (their share 35%, competitors 65%). The CEO says: "Our pie has grown significantly." (a) Has the company's market share meaningfully increased? Calculate the percentage-point and relative increase. (b) If the total market grew from ₹100 crore to ₹150 crore, has the company's absolute revenue increased even more than their market-share percentage suggests? (c) Under what conditions could a DECREASING market share still represent an INCREASING absolute revenue?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 3</h3>
        <div class="practice-q">A school canteen records 5 days of meal choices. Each day, 100 students choose between Daal-Chawal, Rajma-Chawal, or Pulao. Monday: 40, 35, 25. Tuesday: 42, 30, 28. Wednesday: 45, 32, 23. Thursday: 38, 38, 24. Friday: 50, 28, 22. A student proposes five separate pie charts, one per day. (a) Is each individual day's data valid for a pie chart? Why? (b) Is a set of five pie charts the best way to track trends across the week? What alternative would be better? (c) What would a "combined week" pie chart show, and what would it hide?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Yes — each day's three choices sum to 100 students (100%), so each individual pie chart is valid. Each sector correctly represents a share of that day's total. (b) No — five separate pie charts make trend-tracking very hard. Comparing sector sizes across five separate circles is cognitively difficult. A double bar graph (or grouped bar chart) with days on the x-axis and meal counts on the y-axis would clearly show how Daal-Chawal is growing (40→42→45→38→50) and how Rajma-Chawal is declining. The bar graph makes the trend visible; the pie charts hide it. (c) A combined-week pie chart (total 500 students over 5 days) would show the average proportional preference across the week: Daal-Chawal (215/500=43%), Rajma-Chawal (163/500=32.6%), Pulao (122/500=24.4%). This shows overall preferences accurately but hides the daily variation completely — Thursday's equal split between Daal and Rajma (38 each) is invisible in the combined chart.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T4C -->

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
      title: 'Real-World Pie Chart Analysis — Full Detective Pipeline',
      textContent: `<div class="section-block" id="s4c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 4 of 4</p>
      <h2 class="section-title">Real-World Pie Chart Analysis — Full Detective Pipeline</h2>
      <div class="narration">
        <div class="stage-marker elaborate"></div>
        <p>The complete analytical pipeline for any pie chart: (1) Verify structural validity (angles sum to 360°). (2) Identify the modal category (largest sector). (3) Read absolute values using reverse calculation. (4) Compare pairs of sectors using angle arithmetic. (5) Infer what the distribution tells you about the real situation. (6) Identify what the chart does NOT show and what additional data you would need. <span class="vcue">[Apply this pipeline to the NCERT family expenditure pie chart]</span></p>

        <p>Applying the pipeline to the family budget (Food 25%, Rent 10%, Education 15%, Clothes 10%, Transport 5%, Others 20%, Savings 15%): (1) Sum = 25+10+15+10+5+20+15 = 100%. Angles: 90+36+54+36+18+72+54 = 360°. ✓ (2) Modal category: Food at 25%. (3) If Savings = ₹3,000 → total income = ₹20,000. Others = ₹4,000. (4) Education (54°) = Savings (54°) — exactly equal sectors. (5) This family saves 15% of income, which is a healthy savings rate; food is the largest single expense. (6) The chart does not show income fluctuation across months, or whether the "Others" category hides important sub-categories. <span class="vcue">[Show completed analysis panel on screen]</span></p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Path C — Complete Analysis Challenge</span>
          A government presents a pie chart of a state's annual budget (₹12,000 crore): Education 22%, Health 18%, Infrastructure 30%, Agriculture 15%, Administration 10%, Others 5%. A journalist challenges the data, saying: "The Administration sector appears larger than the Agriculture sector on the chart." (a) Calculate the sector angles for Administration and Agriculture. Is the journalist's claim mathematically possible? (b) Find the rupee allocation for each category. (c) If next year's total budget grows to ₹15,000 crore and each percentage stays the same, by how much does the Education budget increase in absolute terms? (d) An NGO argues: "Health spending is insufficient — it should be at least 25% of budget." How much additional money (in crore) would be needed to achieve this, assuming total budget stays at ₹12,000 crore? (e) What critical information does this pie chart NOT provide that a policymaker would need before making funding decisions?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Challenge — Path C</h3>
        <div class="practice-q">Answer all five parts of the government budget challenge above. Show full working for parts (a), (b), (c), and (d). For part (e), write 3–4 sentences identifying the limits of what this pie chart can tell a policymaker.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Administration angle = (10/100)×360 = 36°. Agriculture = (15/100)×360 = 54°. Administration (36°) is smaller than Agriculture (54°), so the journalist's claim is mathematically impossible. Agriculture has a larger sector than Administration. The journalist may have misread the chart or compared visual areas incorrectly — a common perceptual error with pie charts when slices are positioned at different angles. (b) Education: 22% × 12,000 = ₹2,640 cr. Health: 18% × 12,000 = ₹2,160 cr. Infrastructure: 30% × 12,000 = ₹3,600 cr. Agriculture: 15% × 12,000 = ₹1,800 cr. Administration: 10% × 12,000 = ₹1,200 cr. Others: 5% × 12,000 = ₹600 cr. Total = 12,000 cr. ✓ (c) New Education budget = 22% × 15,000 = ₹3,300 cr. Increase = 3,300 − 2,640 = ₹660 crore increase. (d) Current Health = 18% = ₹2,160 cr. Required Health = 25% × 12,000 = ₹3,000 cr. Additional needed = 3,000 − 2,160 = ₹840 crore. But: if total stays at ₹12,000 cr and Health increases to 25%, some other category must decrease by 7 percentage points. The chart as-is cannot accommodate this without redistribution. (e) The pie chart does not show: (1) How each allocation compares to previous years — we cannot see if health spending is growing or shrinking. (2) How efficiently each rupee is spent — a large Education allocation tells us nothing about learning outcomes. (3) The distribution within each sector — "Infrastructure" at 30% could mean roads, bridges, or government buildings; the chart cannot distinguish. (4) Per-capita figures — a state with a large population needs proportionally more health spending than the percentage alone conveys.</div>
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
      textContent: `<div class="section-block" id="s5c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topics 5–6 of 6</p>
      <h2 class="section-title">Critical Interpretation &amp; The Data Detective</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>The most sophisticated data skill is not construction — it's critical interpretation. This means asking not just "what does the graph show?" but "what does it not show? What assumptions does it make? Could the same data support a different conclusion? How might this graph be used to mislead?" Combining this with the detective's pipeline — organise, represent, interpret, recommend — completes the full data literacy cycle. <span class="vcue">[Show student test trend graph and a misleadingly scaled alternative of the same data]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>A student's 5-test scores: 55, 62, 58, 70, 75. Three levels of interpretation. Descriptive: scores range from 55 to 75, with a dip at Test 3 and consistent growth thereafter. Analytical: the overall trend is positive (net gain of +20 over 5 tests). Test 3 represents an anomaly — a dip that breaks the otherwise upward pattern. The average improvement per test (excluding the Test 2→3 dip) is approximately 5.5 points. Inferential: the student is improving, likely with increasing engagement or better study habits. The Test 3 dip might indicate an external factor (illness, difficult week). If the trend continues, Test 6 could be predicted around 78–82. However, one should note that this prediction assumes the trend is linear and sustained — both are assumptions that require caution.</p>

        <div class="callout challenge">
          <span class="callout-label">Misleading Graphs — Advanced Analysis</span>
          Two companies present bar graphs of their sales growth. Company A's graph uses a Y-axis from 0 to 1000, showing sales growth from 800 to 850. Company B uses a Y-axis from 800 to 860, showing the same type of growth from 820 to 855. On Company B's graph, the bar appears to triple in height. On Company A's graph, both bars look almost the same. Actual percentage growth: Company A = 6.25%, Company B = 4.27%. Which company is growing faster? Which graph is more misleading? What is the ethical responsibility of someone presenting data?
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">The Complete Detective Challenge</span>
          Raw data: 35 students' Science test scores (out of 100): 82, 55, 91, 68, 45, 72, 88, 55, 63, 91, 78, 45, 55, 82, 68, 91, 63, 78, 55, 82, 45, 91, 68, 82, 78, 63, 55, 91, 45, 82, 68, 78, 55, 63, 91. Complete the full detective pipeline: (1) Build a frequency table with score groupings of your choice — justify your groupings. (2) Describe the bar graph that would result. (3) Identify the modal group (most common score range). (4) What percentage of students scored 80 and above? (5) Write a three-sentence interpretation that a teacher could use to plan the next lesson. (6) Challenge: if this teacher's goal is to move 80% of students above 70 — what does the current data tell us about how far from that goal they are?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Challenge — Path C</h3>
        <div class="practice-q">A school tracks library borrowing, canteen sales (₹ hundreds), and sports participation over 6 months in a double bar graph comparing the first half of year with second half. H1 (Jan–Jun): Library 45, Canteen 82, Sports 30. H2 (Jul–Dec): Library 52, Canteen 71, Sports 48. (a) Which activity showed the greatest percentage increase in H2? (b) Which showed the greatest percentage decrease? (c) If you were the school principal, what two initiatives would this data suggest you prioritise? (d) What additional data would you want to collect to confirm your interpretation is correct before acting?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Sports: increase from 30 to 48 = +60%. Library: increase from 45 to 52 = +15.6%. These are the two that increased. (b) Canteen: decrease from 82 to 71 = −13.4%. (c) Two priorities: First — sustain and build on the sports participation surge in H2 (60% increase is remarkable — identify what drove it and replicate it). Second — investigate the canteen revenue drop (−13.4%) as it may signal quality concerns, pricing issues, or competition from outside vendors. Library's modest increase suggests steady but unspectacular growth — possibly maintain current strategy. (d) Additional data needed: student attendance data (to normalise borrowing/participation counts), exit surveys from canteen users (why did sales fall?), sport-specific breakdown (did all sports grow or just one?), and month-by-month data rather than just semester totals (to identify which specific months drove the H2 sports surge).</div>
      </div>
    </div>

  </div><!-- end panel-c -->

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
      textContent: `<div class="section-block" id="s5c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topics 5–6 of 6</p>
      <h2 class="section-title">Critical Interpretation &amp; The Data Detective</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>The most sophisticated data skill is not construction — it's critical interpretation. This means asking not just "what does the graph show?" but "what does it not show? What assumptions does it make? Could the same data support a different conclusion? How might this graph be used to mislead?" Combining this with the detective's pipeline — organise, represent, interpret, recommend — completes the full data literacy cycle. <span class="vcue">[Show student test trend graph and a misleadingly scaled alternative of the same data]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>A student's 5-test scores: 55, 62, 58, 70, 75. Three levels of interpretation. Descriptive: scores range from 55 to 75, with a dip at Test 3 and consistent growth thereafter. Analytical: the overall trend is positive (net gain of +20 over 5 tests). Test 3 represents an anomaly — a dip that breaks the otherwise upward pattern. The average improvement per test (excluding the Test 2→3 dip) is approximately 5.5 points. Inferential: the student is improving, likely with increasing engagement or better study habits. The Test 3 dip might indicate an external factor (illness, difficult week). If the trend continues, Test 6 could be predicted around 78–82. However, one should note that this prediction assumes the trend is linear and sustained — both are assumptions that require caution.</p>

        <div class="callout challenge">
          <span class="callout-label">Misleading Graphs — Advanced Analysis</span>
          Two companies present bar graphs of their sales growth. Company A's graph uses a Y-axis from 0 to 1000, showing sales growth from 800 to 850. Company B uses a Y-axis from 800 to 860, showing the same type of growth from 820 to 855. On Company B's graph, the bar appears to triple in height. On Company A's graph, both bars look almost the same. Actual percentage growth: Company A = 6.25%, Company B = 4.27%. Which company is growing faster? Which graph is more misleading? What is the ethical responsibility of someone presenting data?
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">The Complete Detective Challenge</span>
          Raw data: 35 students' Science test scores (out of 100): 82, 55, 91, 68, 45, 72, 88, 55, 63, 91, 78, 45, 55, 82, 68, 91, 63, 78, 55, 82, 45, 91, 68, 82, 78, 63, 55, 91, 45, 82, 68, 78, 55, 63, 91. Complete the full detective pipeline: (1) Build a frequency table with score groupings of your choice — justify your groupings. (2) Describe the bar graph that would result. (3) Identify the modal group (most common score range). (4) What percentage of students scored 80 and above? (5) Write a three-sentence interpretation that a teacher could use to plan the next lesson. (6) Challenge: if this teacher's goal is to move 80% of students above 70 — what does the current data tell us about how far from that goal they are?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Challenge — Path C</h3>
        <div class="practice-q">A school tracks library borrowing, canteen sales (₹ hundreds), and sports participation over 6 months in a double bar graph comparing the first half of year with second half. H1 (Jan–Jun): Library 45, Canteen 82, Sports 30. H2 (Jul–Dec): Library 52, Canteen 71, Sports 48. (a) Which activity showed the greatest percentage increase in H2? (b) Which showed the greatest percentage decrease? (c) If you were the school principal, what two initiatives would this data suggest you prioritise? (d) What additional data would you want to collect to confirm your interpretation is correct before acting?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Sports: increase from 30 to 48 = +60%. Library: increase from 45 to 52 = +15.6%. These are the two that increased. (b) Canteen: decrease from 82 to 71 = −13.4%. (c) Two priorities: First — sustain and build on the sports participation surge in H2 (60% increase is remarkable — identify what drove it and replicate it). Second — investigate the canteen revenue drop (−13.4%) as it may signal quality concerns, pricing issues, or competition from outside vendors. Library's modest increase suggests steady but unspectacular growth — possibly maintain current strategy. (d) Additional data needed: student attendance data (to normalise borrowing/participation counts), exit surveys from canteen users (why did sales fall?), sport-specific breakdown (did all sports grow or just one?), and month-by-month data rather than just semester totals (to identify which specific months drove the H2 sports surge).</div>
      </div>
    </div>

  </div><!-- end panel-c -->`,
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

export const module_3: Module = filterModuleByPath(moduleData, 'C');
