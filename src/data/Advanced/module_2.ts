import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_2';


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
  id: '2.2',
  title: 'Grouping Data & Histograms',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'Class Intervals — Grouping &amp; Frequency Tables',
      textContent: `<div class="duration-badge" style="background:var(--c-light);color:var(--c-hue);">⏱ Curated from module2_2_grouping_data_histograms_new.html · Path C — Advanced</div>

<div class="section-block" id="s1c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 1 of 5</p>
      <h2 class="section-title">Class Intervals — Grouping &amp; Frequency Tables</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Raw data becomes analytically powerful only when it is organised. For large continuous datasets, class intervals provide the structure: each value is assigned to exactly one group based on a fixed-width range. The boundary rule — lower limit included, upper limit excluded ([a, b)) — guarantees unambiguous assignment. What design choices go into building a useful grouped frequency table? <span class="vcue">[Show the 30 marks dataset: 23, 41, 17, 38, 29, 44, 12, 35, 27, 48, 19, 31, 22, 46, 14, 33, 26, 40, 18, 37, 25, 43, 11, 36, 28, 45, 16, 32, 24, 39]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>Three decisions shape a frequency table: (1) Starting point — typically rounded down to a convenient value below the minimum (min = 11, so start at 10). (2) Class size — must be uniform; too small creates noise, too large destroys detail. Here, a class size of 10 yields 4 intervals — adequate for a dataset of 30. (3) Number of intervals — conventionally 5–10 for most datasets. With 30 values and range 37 (48−11), a class size of 10 gives 4 intervals, which is appropriate.</p>

        <table class="data-table">
          <thead><tr><th>Class Interval</th><th>Tally</th><th>Frequency</th><th>Relative Frequency</th></tr></thead>
          <tbody>
            <tr><td>10 – 20</td><td class="tally">|||| ||</td><td class="num">7</td><td class="num">23.3%</td></tr>
            <tr><td>20 – 30</td><td class="tally">|||| |||</td><td class="num">8</td><td class="num">26.7%</td></tr>
            <tr><td>30 – 40</td><td class="tally">|||| |||</td><td class="num">8</td><td class="num">26.7%</td></tr>
            <tr><td>40 – 50</td><td class="tally">|||| ||</td><td class="num">7</td><td class="num">23.3%</td></tr>
            <tr><td><strong>Total</strong></td><td></td><td class="num"><strong>30</strong></td><td class="num"><strong>100%</strong></td></tr>
          </tbody>
        </table>

        <p>Relative frequency (frequency ÷ total) expresses distribution as proportions — useful for comparing datasets of different sizes. This table shows a nearly uniform distribution: all four groups contain 23–27% of the data. The modal class is 20–30 and 30–40 (tied at frequency 8). The data has no strong skew — it is roughly symmetric around the 20–40 midpoint. <span class="vcue">[Show relative frequency column calculation]</span></p>

        <div class="callout challenge">
          <span class="callout-label">Advanced Analysis</span>
          Consider the same 30 marks with a class size of 5 instead of 10. How many intervals would you get? Would this give more or less useful information? What is the trade-off between a smaller class size (more intervals) and a larger class size (fewer intervals)? When would you choose a class size of 5 over 10 for this data?
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Multi-Step Challenge</span>
          Heights of 20 students: 142, 155, 138, 161, 149, 153, 136, 158, 145, 162, 140, 157, 148, 165, 143, 152, 139, 160, 147, 154. (a) Build the grouped frequency table with class size 10, starting at 130. Include a relative frequency column. (b) Which class interval is the modal class? (c) What percentage of students are 150 cm or taller? (d) If you had used a class size of 5 instead, how would that change the modal class?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 1</h3>
        <div class="practice-q">A factory records the weights (in kg) of 25 items produced in a day: 42, 51, 38, 55, 47, 60, 35, 53, 45, 58, 40, 49, 62, 36, 54, 48, 41, 57, 44, 61, 39, 52, 46, 59, 43. (a) Choose an appropriate class size and build a grouped frequency table. Justify your choice of class size. (b) Add a cumulative frequency column. (c) What percentage of items weigh less than 50 kg? (d) What does the distribution shape suggest about quality control in this factory?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 62−35 = 27. With n=25, a class size of 5 gives 6 intervals (35–40, 40–45, 45–50, 50–55, 55–60, 60–65) — appropriate. Intervals and frequencies: 35–40: 35, 38, 36, 39 = 4. 40–45: 42, 40, 41, 44, 43 = 5. 45–50: 47, 45, 48, 46, 49 = 5. 50–55: 51, 53, 52 = 3. 55–60: 55, 58, 57, 59 = 4. 60–65: 60, 62, 61 = 3. Total: 4+5+5+3+4+3 = 24... recheck: 35, 38, 36, 39 | 42, 40, 41, 44, 43 | 47, 45, 48, 46, 49 | 51, 53, 52 | 55, 58, 57, 59 | 60, 62, 61. Count: 4+5+5+3+4+3 = 24. Missing one item — re-examine raw data: 54 was missed — goes in 50–55 (now 4). Total: 4+5+5+4+4+3 = 25 ✓. (b) Cumulative frequencies: 4, 9, 14, 18, 22, 25. (c) Items below 50 kg: intervals 35–40 (4) + 40–45 (5) + 45–50 (5) = 14 items. 14/25 = 56%. (d) The distribution is fairly spread across all intervals with slight concentration in 40–50 range. No strong skew — suggests weights are relatively consistent, which is a positive quality control signal. However, items in the 35–40 and 60–65 ranges represent the extremes — if tolerance limits are tight, these outlier batches warrant investigation.</div>
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
      questions: buildAdaptiveQuestions(2, 1)
    },
    {
      id: 'c2_1_2',
      title: 'Histograms — Construction, Shape &amp; Interpretation',
      textContent: `<div class="section-block" id="s2c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 2 of 5</p>
      <h2 class="section-title">Histograms — Construction, Shape &amp; Interpretation</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>A histogram is not a bar graph with gaps removed — it is a fundamentally different representation for a different type of data. The absence of gaps is not stylistic; it encodes continuity. The shape of the histogram — how bars rise, peak, and fall — is the primary analytical tool for understanding a distribution: where it is concentrated, how spread out it is, whether it is symmetric or skewed. <span class="vcue">[Show the marks histogram and the worksheet-time histogram side by side]</span> These two histograms tell completely different stories about their datasets. Reading that story accurately is the skill.</p>

        <div class="stage-marker elaborate"></div>
        <p>Three analytical questions for any histogram: (1) Where is the peak? The modal class — the interval with the highest bar — tells you where data is most concentrated. (2) What is the shape? A symmetric histogram (bell-shaped) suggests even distribution around a central value. A right-skewed histogram (long tail to the right) suggests most values are low with a few high outliers. A left-skewed histogram suggests the reverse. (3) How wide is the spread? Wide, flat histograms indicate high variability; tall, narrow histograms indicate data clustered tightly. <span class="vcue">[Annotate both histograms with these three questions]</span></p>

        <p>Applying this to our two datasets. Marks histogram (30 students): nearly flat — frequencies 7, 8, 8, 7. This indicates uniform distribution — no strong central tendency, no skew. Every group has roughly equal representation. Worksheet-time histogram (25 students): frequencies 3, 7, 9, 5, 1. This is right-skewed — peak at 20–30 minutes, with a long decline to the right. Most students cluster around a central time, but a few outliers took much longer. The shape itself is a summary statistic.</p>

        <div class="callout challenge">
          <span class="callout-label">Bar Graph vs Histogram — The Fundamental Distinction</span>
          A bar graph shows categorical data — items like sports, colours, or subjects that are separate, discrete categories. Gaps between bars signal discontinuity. A histogram shows grouped continuous data — intervals on a number line. No gaps signal continuity. The test: if the x-axis is a number line with adjacent intervals, it's a histogram. If the x-axis lists separate category names, it's a bar graph. The same dataset cannot be both — the type of data determines the graph.
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Critical Interpretation Challenge</span>
          Outdoor activity data (40 students) — 0–5 hrs: 4, 5–10 hrs: 11, 10–15 hrs: 14, 15–20 hrs: 8, 20–25 hrs: 3. (a) Describe the shape of this histogram precisely — is it symmetric, right-skewed, or left-skewed? Justify your answer. (b) Calculate the relative frequencies. What percentage of students exercise more than 10 hours per week? (c) A second class is surveyed and their data shows a perfectly flat histogram across the same intervals (8 students each). What does this tell you about the differences between the two classes? (d) Design a follow-up question you would want to ask based on the shape of the first histogram.
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Challenge — Path C</h3>
        <div class="practice-q">A researcher collected commute times (minutes) for 30 office workers: 12, 45, 28, 33, 19, 52, 41, 25, 37, 18, 29, 48, 35, 22, 44, 31, 15, 39, 26, 55, 42, 21, 36, 50, 27, 16, 38, 23, 47, 32. (a) Build a grouped frequency table with class size 10, starting at 10. Include relative frequency and cumulative frequency columns. (b) Identify the modal class and the median class (the class containing the middle value). (c) Describe the shape of the histogram — is it skewed? If so, in which direction and what real-world explanation might account for this? (d) What percentage of workers commute more than 40 minutes? What policy recommendation could you make based on this data?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Intervals: 10–20: 12, 19, 18, 15, 16 = 5. 20–30: 28, 25, 29, 22, 26, 27, 23 = 7. 30–40: 33, 37, 35, 31, 39, 36, 38, 32 = 8. 40–50: 45, 41, 44, 42, 47 = 5. 50–60: 52, 48, 55, 50 = 4. Wait: 12+19+18+15+16=5 | 28+25+29+22+26+27+23=7 | 33+37+35+31+39+36+38+32=8 | 45+41+44+42+47=5 | 52+48+55+50=4. Hmm 5+7+8+5+4=29 — one value unaccounted. Re-examine: 12,19,18,15,16 — that's 5. Note: all 30 values listed: 12,45,28,33,19,52,41,25,37,18,29,48,35,22,44,31,15,39,26,55,42,21,36,50,27,16,38,23,47,32 — missed 21 in 20–30 group: now 20–30 = 28,25,29,22,26,21,27,23 = 8. Total: 5+8+8+5+4=30 ✓. Relative freq: 16.7%, 26.7%, 26.7%, 16.7%, 13.3%. Cumulative freq: 5, 13, 21, 26, 30. (b) Modal class: 20–30 and 30–40 (tied, frequency 8). Median class: 15th and 16th values — cumulative freq reaches 13 at end of 20–30, so 14th–21st values are in 30–40. Median class: 30–40. (c) The distribution is slightly right-skewed — most workers commute 20–40 minutes, but the tail extends to 50–60 minutes. Real-world explanation: most workers likely live in a moderate distance from the office (20–40 min commute), but a few live far away or face severe traffic, pushing their times significantly higher. The right skew reflects the practical reality that commutes can always get longer (road conditions, distance) but have a minimum floor near zero. (d) Workers commuting more than 40 minutes: 5 + 4 = 9 workers = 30% of the sample. Policy recommendation: 30% is a substantial proportion facing long commutes. The organisation could consider flexible start/end times to help workers avoid peak-hour traffic, or investigate remote work options for the 13.3% (4 workers) with commutes over 50 minutes, as these are likely the most impacted by commute stress and fatigue.</div>
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
      questions: buildAdaptiveQuestions(2, 2)
    },
    {
      id: 'c2_1_3',
      title: 'Choosing the Right Bin Size',
      textContent: `<div class="section-block" id="s3c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 3 of 5</p>
      <h2 class="section-title">Choosing the Right Bin Size</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Bin size selection is not a neutral decision — it is an analytical one. The same dataset grouped with different class widths produces histograms that tell visually different stories, even though the underlying numbers haven't changed. Choosing a bin size that is too large masks internal structure; too small, and noise overwhelms signal. The objective is to reveal the distribution's true shape with the minimum number of intervals needed to do so. <span class="vcue">[Show the marks dataset with bin sizes 5, 10, and 20 side by side]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>The practical decision process: (1) Compute range = max − min. (2) Choose a target number of intervals (5–10 is standard for most datasets at this level). (3) Approximate bin size = range ÷ target intervals. (4) Round to the nearest convenient value — typically a factor of 5 or 10 for large datasets, or 1 or 2 for small-range data. (5) Select a starting point: round down from the minimum to a convenient value. Verify: number of intervals × bin size ≥ range. <span class="vcue">[Show algorithm applied to the marks dataset]</span></p>

        <p><strong>Example 1 — Marks Dataset (n = 30, range = 37):</strong> Target 4–5 intervals → bin size ≈ 37 ÷ 4 = 9.25 → round to 10. Start at 10. Result: 4 intervals (10–20, 20–30, 30–40, 40–50), frequencies 7, 8, 8, 7. The distribution is nearly uniform — visible in 4 intervals. Had we used bin size 5 (8 intervals), each bar would contain 3–4 students; the flatness of the distribution would be obscured by the apparent variability between adjacent small bars. Bin size 10 is correct for this dataset.</p>

        <p><strong>Example 2 — Reaction Times (n = 20, range = 180 ms):</strong> Twenty measured reaction times (ms): 210, 310, 265, 340, 285, 230, 390, 270, 315, 250, 360, 295, 240, 375, 280, 320, 255, 345, 300, 225. Range = 390 − 210 = 180 ms. Target 5 intervals: bin size ≈ 180 ÷ 5 = 36 → round to 40. Start at 200. Intervals: 200–240, 240–280, 280–320, 320–360, 360–400. Frequencies: 200–240: 210, 230, 225 = 3. 240–280: 265, 285, 270, 250, 255, 240 = 6. Wait — 240 has lower included in 240–280, correct. 280–320: 295, 310, 315, 300 = 4. Hmm, 285 is in 280–320 too. Let me recount: 200–240: 210, 230, 225 = 3. 240–280: 265, 285, 270, 250, 255, 240 = 6. 280–320: 295, 310, 315, 300, 280 = 5. Wait: 285 is 280+5, so it's 285 which is ≥280 and &lt;320 → in 280–320. Let me recount: 285 → 280–320 not 240–280. Recount 240–280: 265, 270, 250, 255, 240 = 5. 280–320: 285, 295, 310, 315, 300, 280 = 6. 320–360: 340, 345, 320, 360 — wait 360 ≥ 360 belongs to 360–400. 320–360: 340, 345, 320 = 3. 360–400: 390, 360, 375 = 3. Total: 3+5+6+3+3 = 20 ✓.</p>

        <table class="data-table">
          <thead><tr><th>Reaction Time (ms)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>200 – 240</td><td class="num">3</td></tr>
            <tr><td>240 – 280</td><td class="num">5</td></tr>
            <tr><td>280 – 320</td><td class="num">6</td></tr>
            <tr><td>320 – 360</td><td class="num">3</td></tr>
            <tr><td>360 – 400</td><td class="num">3</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>20 ✓</strong></td></tr>
          </tbody>
        </table>

        <p>This histogram peaks at 280–320 ms and is right-skewed — the tail extends toward slower reactions. Using bin size 40 was correct here: it produced 5 readable intervals. Had we used bin size 20 (9 intervals), most bars would contain just 1–2 values, creating a spiky, unreadable histogram. The mode and skew would be impossible to determine. Bin size selection is, fundamentally, a trade-off between resolution and readability.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Analytical Challenge</span>
          A researcher has two datasets: Dataset A has 100 values with a range of 200. Dataset B has 15 values with a range of 12. (a) Recommend a bin size for each dataset and justify your recommendation. (b) If a student used bin size 50 for Dataset B, how many intervals would result? What problem would this create? (c) Two histograms of the same data — one with 4 bins, one with 20 bins — are shown. The 4-bin version appears roughly symmetric; the 20-bin version appears irregular and jagged. Which is a better representation of the data's true shape, and why?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 3</h3>
        <div class="practice-q">Monthly rainfall (mm) recorded over 24 months: 112, 85, 203, 67, 145, 178, 94, 231, 156, 73, 189, 120, 98, 165, 244, 81, 137, 202, 109, 172, 58, 216, 143, 91. (a) Calculate the range. Recommend and justify an appropriate bin size for this dataset. (b) Construct the grouped frequency table. (c) Based on the frequency distribution, describe the shape of the histogram. (d) If this data were grouped with a bin size of 50 instead, how many intervals would result? What information is gained or lost compared to your chosen bin size?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 244 − 58 = 186 mm. For 24 data points, target 5–6 intervals: 186 ÷ 6 = 31 → round to 30. Start at 50 (below minimum 58). Intervals: 50–80, 80–110, 110–140, 140–170, 170–200, 200–230, 230–260. That's 7 intervals — acceptable. (b) 50–80: 67, 73, 58 = 3. 80–110: 85, 94, 98, 109, 81, 91 = 6. 110–140: 112, 120, 137, 143 (wait 143 ≥ 140 → next interval). 110–140: 112, 120, 137 = 3. 140–170: 145, 156, 165, 143 = 4. 170–200: 178, 189, 172 = 3. 200–230: 203, 231 — wait, 231 ≥ 230 → next interval. 200–230: 203, 202, 216 = 3. 230–260: 231, 244 = 2. Total: 3+6+3+4+3+3+2 = 24 ✓. (c) The distribution peaks strongly in 80–110 mm, suggesting most months have moderate rainfall. The relatively long tail from 170–260 (3+3+2 = 8 values, 33%) indicates a right skew — a meaningful proportion of months have high rainfall. (d) Bin size 50 gives: range 186 ÷ 50 ≈ 4 intervals (50–100, 100–150, 150–200, 200–250). Frequencies: 50–100: 3+6=9 (approx). 100–150: 3+4=7. 150–200: 3. 200–250: 3+2=5. This collapses the detail within each band. The peak at 80–110 is merged with 50–80 data into a 50–100 bar, so the concentration around 80–110 is no longer visible. Information is lost: the specific mode location is obscured, and the skew is harder to detect. Bin size 30 is superior for this dataset.</div>
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
      questions: buildAdaptiveQuestions(2, 3)
    },
    {
      id: 'c2_1_4',
      title: 'Histograms vs Bar Graphs — The Fundamental Distinction',
      textContent: `<div class="section-block" id="s4c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 4 of 5</p>
      <h2 class="section-title">Histograms vs Bar Graphs — The Fundamental Distinction</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>The confusion between histograms and bar graphs is not a superficial one — it reflects a deeper misunderstanding about the nature of data itself. Both graphs use rectangular bars and two labelled axes. But they represent fundamentally different mathematical structures: one encodes categorical membership, the other encodes continuous distribution. Using one where the other is required is not merely an aesthetic error; it misrepresents the data's structure and leads to incorrect inferences. <span class="vcue">[Show the two graph types with identical visual styling — the only difference is gaps vs no gaps]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>The core distinction: categorical data consists of values that belong to mutually exclusive, non-ordered groups — or groups whose order carries no mathematical meaning. Continuous data consists of values measured on a scale, where the distance between values is meaningful and intervals share boundaries on a number line. A gap between bars in a bar graph encodes the message: "there is no value between these two categories." In a histogram, a gap would encode the message: "there are no values between these two intervals" — which is mathematically false for continuous data, where the upper limit of one interval is exactly the lower limit of the next. The no-gap rule is not stylistic; it is a statement about the mathematical structure of the data.</p>

        <table class="data-table">
          <thead><tr><th>Property</th><th>Bar Graph</th><th>Histogram</th></tr></thead>
          <tbody>
            <tr><td>Data type</td><td>Categorical / discrete named groups</td><td>Continuous, grouped into intervals</td></tr>
            <tr><td>X-axis structure</td><td>Nominal labels — no inherent order required</td><td>Number line — order is non-negotiable</td></tr>
            <tr><td>Gaps between bars</td><td>Present — encode category separation</td><td>Absent — encode interval adjacency</td></tr>
            <tr><td>Bar width</td><td>Arbitrary / uniform for visual clarity</td><td>Proportional to class width (equal if intervals are equal)</td></tr>
            <tr><td>What height encodes</td><td>Frequency or count per category</td><td>Frequency per interval (or frequency density if unequal widths)</td></tr>
            <tr><td>Can be reordered?</td><td>Often yes (e.g., alphabetical, rank)</td><td>Never — x-axis order is determined by number line</td></tr>
          </tbody>
        </table>

        <p>One critical implication: bar order in a bar graph can often be changed without changing the graph's meaning. Sorting bars from tallest to shortest (a Pareto chart) is a common variation. In a histogram, changing bar order is meaningless — it would place the 30–40 interval before the 10–20 interval, which contradicts the number line. The order is determined by the data's mathematical structure, not by the analyst.</p>

        <p>A subtler point: the same numerical data can sometimes be represented by either graph, depending on how the question is framed. If students are asked "how many runs did each team score?" — that's a bar graph (teams are categories). If the scores are then grouped into intervals (0–50, 50–100, etc.) and the question becomes "how are scores distributed?" — that's a histogram. The graph type follows the analytical question, not just the raw numbers. <span class="vcue">[Show both framings of the same cricket data]</span></p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Critical Distinction Challenge</span>
          (a) A dataset shows the number of words typed per minute by 40 students, recorded as exact values. A student groups these into intervals 0–20, 20–40, 40–60, 60–80, 80–100 and draws a bar graph with gaps. What is wrong, and what does the gap imply that is mathematically incorrect? (b) A second student draws a histogram to show the number of students who play each sport (Cricket: 24, Football: 31, Badminton: 18, Basketball: 12). Identify every error in this choice and explain the consequences for interpretation. (c) Explain why a histogram's x-axis must be a true number line while a bar graph's x-axis need not be.
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 4</h3>
        <div class="practice-q">A data analyst receives two datasets: Dataset 1 — the number of customer complaints per department (Service: 42, Billing: 67, Technical: 55, Delivery: 38, Returns: 29). Dataset 2 — the time (in minutes) customers waited before their complaint was resolved, for 50 customers, grouped as 0–10, 10–20, 20–30, 30–40, 40–50, 50–60. (a) Identify which graph type is appropriate for each dataset and explain why. (b) For Dataset 1, could the bars be rearranged to show departments from highest to lowest complaints? Would this be valid for Dataset 2? Explain the mathematical reason for the difference. (c) The analyst draws a histogram for Dataset 1 — the bars for Service, Billing, and Technical touch, but the gap between Technical and Delivery is larger than the others. What impression does this incorrect graph create, and why is it misleading?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Dataset 1 → bar graph. Departments (Service, Billing, etc.) are separate named categories with no shared boundaries. There is no numerical meaning to the "distance" between Billing and Technical. Dataset 2 → histogram. Wait time is a continuous variable; intervals share boundaries (10 is simultaneously the upper limit of 0–10 and the lower limit of 10–20). (b) Dataset 1: yes, reordering by frequency (Pareto chart) is valid and often useful for identifying priority problem areas. Dataset 2: no. The intervals 0–10, 10–20, ... are positions on a time number line. Reordering them (e.g., putting 30–40 before 10–20) would contradict the number line and be mathematically nonsensical — it would imply that longer wait times somehow precede shorter ones on the axis. The x-axis order is fixed by the mathematics of continuous data. (c) The unequal gaps in the histogram for Dataset 1 create a false impression that the "distance" between department categories varies — as if Technical and Delivery are further apart from each other than Service and Billing are. In reality, these are unordered categories and no distance between them is meaningful. More fundamentally, drawing any histogram for this data is wrong: the touching bars suggest that there are values between "Technical" and "Delivery" complaints, which is impossible since these are discrete, named departments, not adjacent intervals on a number line.</div>
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
      questions: buildAdaptiveQuestions(2, 4)
    },
    {
      id: 'c2_1_5',
      title: 'Real Data Analysis Project — End-to-End Statistical Reasoning',
      textContent: `<div class="section-block" id="s5c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Real Data Analysis Project — End-to-End Statistical Reasoning</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Statistical reasoning does not end at drawing a histogram — it begins there. The histogram is the analytical starting point: it reveals the shape, center, and spread of a distribution, and raises questions that guide further investigation. In this project, you will apply the complete workflow — bin selection, table construction, histogram interpretation, and inference — to a realistic dataset and draw conclusions that extend beyond the numbers. <span class="vcue">[Show full project brief on screen]</span></p>

        <div class="stage-marker elaborate"></div>
        <p><strong>The Dataset:</strong> A municipal authority tracked daily electricity consumption (in kWh) for 36 residential households over one month (36 readings). The data: 14, 32, 27, 45, 19, 38, 52, 23, 41, 16, 35, 48, 29, 55, 22, 43, 18, 37, 51, 26, 44, 13, 31, 47, 21, 39, 58, 25, 42, 17, 34, 50, 28, 46, 20, 36.</p>

        <p><strong>Step 1 — Bin Selection:</strong> Range = 58 − 13 = 45. For n = 36, target 6 intervals: 45 ÷ 6 = 7.5 → round to 10. Start at 10. Intervals: 10–20, 20–30, 30–40, 40–50, 50–60. Five intervals — checking: 5 × 10 = 50 ≥ 45 ✓. A bin size of 10 is appropriate.</p>

        <p><strong>Step 2 — Frequency Table with Relative and Cumulative Frequencies:</strong></p>

        <table class="data-table">
          <thead><tr><th>Consumption (kWh)</th><th>Frequency</th><th>Relative Freq.</th><th>Cumulative Freq.</th></tr></thead>
          <tbody>
            <tr><td>10 – 20</td><td class="num">7</td><td class="num">19.4%</td><td class="num">7</td></tr>
            <tr><td>20 – 30</td><td class="num">8</td><td class="num">22.2%</td><td class="num">15</td></tr>
            <tr><td>30 – 40</td><td class="num">8</td><td class="num">22.2%</td><td class="num">23</td></tr>
            <tr><td>40 – 50</td><td class="num">8</td><td class="num">22.2%</td><td class="num">31</td></tr>
            <tr><td>50 – 60</td><td class="num">5</td><td class="num">13.9%</td><td class="num">36</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>36</strong></td><td class="num"><strong>100%</strong></td><td></td></tr>
          </tbody>
        </table>

        <div class="histogram">
          <div class="histogram-title">Daily Electricity Consumption — 36 Households (kWh)</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:88%">7</div>
              <div class="hist-label">10–20</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">20–30</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">30–40</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">40–50</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:63%">5</div>
              <div class="hist-label">50–60</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Consumption (kWh)</span>
            <span>Number of Households ↑</span>
          </div>
          <div class="histogram-note">Slightly left-skewed: peak in 20–50 kWh range, tapering at both ends. Three modal classes tied at frequency 8.</div>
        </div>

        <p><strong>Step 3 — Distribution Analysis:</strong> The histogram is nearly uniform across 20–50 kWh (three intervals each with 8 households = 22.2%), with fewer households at the low end (10–20: 19.4%) and a visible drop at the high end (50–60: 13.9%). This suggests the distribution is approximately uniform with a slight left truncation — most households consume between 20 and 50 kWh per day. High consumers (50–60 kWh) represent 13.9% of households — a significant minority. The cumulative frequency shows that 50% of households (18 of 36) consume fewer than 35 kWh per day (the midpoint of the 30–40 interval approximately) — this is the approximate median class.</p>

        <p><strong>Step 4 — Inference and Application:</strong> If the authority wants to target high-consumption households for energy conservation outreach, the 50–60 kWh group (5 households, 13.9%) is the primary target. If a subsidy threshold is set at "less than 20 kWh per day" (low-income households), it would apply to 7 households (19.4%). The near-uniform distribution in the 20–50 kWh range suggests that most households have broadly similar consumption patterns — there is no strong clustering around a central value, which is consistent with diverse household sizes and income levels in a mixed residential area.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Full Analysis Challenge</span>
          A second neighbourhood is surveyed. Their consumption data (36 households) produces a histogram that is strongly right-skewed — most households consume 10–30 kWh, with a long tail extending to 80–90 kWh. (a) What does this shape tell you about the distribution of consumption in the second neighbourhood compared to the first? (b) If you had to choose a single "typical" consumption level for each neighbourhood, which class interval would you cite, and why? (c) Which neighbourhood presents a greater challenge for energy conservation planning, and what data would you want to collect next to confirm your reasoning? (d) Construct an argument: could two neighbourhoods have histograms with identical shapes but different modal classes? What would this tell you?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Analysis — Path C</h3>
        <div class="practice-q">A logistics company tracked the delivery time (in hours) for 40 orders over two weeks: 2.1, 5.8, 3.4, 8.2, 4.7, 6.9, 1.8, 7.3, 3.9, 5.2, 9.1, 4.1, 6.4, 2.7, 8.8, 3.6, 5.5, 7.7, 2.4, 4.9, 6.1, 9.4, 3.2, 5.9, 8.5, 4.3, 7.1, 2.9, 6.6, 3.8, 9.8, 5.1, 4.6, 7.5, 2.6, 6.3, 8.1, 3.5, 5.7, 4.4. (a) Select an appropriate bin size, justify it, and construct a grouped frequency table with relative frequency and cumulative frequency columns. (b) Identify the modal class and median class. (c) Describe the histogram's shape — is it skewed, symmetric, or uniform? Support your answer with reference to the frequencies. (d) The company's service agreement guarantees delivery within 6 hours. What percentage of orders breached this threshold? What operational conclusion does this suggest? (e) A competing company claims their deliveries follow a left-skewed distribution over the same time range. What does this mean in practical terms, and how would their histogram differ visually from this one?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 9.8 − 1.8 = 8.0. For n = 40, target 5–8 intervals: 8.0 ÷ 8 = 1.0 → bin size 2. Start at 1. Intervals: 1–3, 3–5, 5–7, 7–9, 9–11. Five intervals — good for 40 data points. Frequencies: 1–3: 2.1, 1.8, 2.7, 2.4, 2.9, 2.6 = 6. 3–5: 3.4, 4.7, 3.9, 4.1, 3.6, 4.9, 3.2, 4.3, 3.8, 3.5, 4.6, 4.4 = 12. 5–7: 5.8, 6.9, 5.2, 5.5, 6.1, 5.9, 5.1, 6.6, 6.3, 5.7 = 10. 7–9: 8.2, 7.3, 8.8, 7.7, 7.1, 7.5, 8.1 = 7. 9–11: 9.1, 9.4, 9.8 = 3. Wait: let me check 6.4 — 6.4 is ≥5 and &lt;7 → 5–7. 6.4 and 6.6 and 6.3 are already counted? Recount 5–7: 5.8, 6.9, 5.2, 6.4, 5.5, 6.1, 5.9, 6.6, 5.1, 6.3, 5.7 = 11. And 3–5: 3.4, 4.7, 3.9, 4.1, 3.6, 4.9, 3.2, 4.3, 3.8, 3.5, 4.6, 4.4 = 12. Total: 6+12+11+7+3 = 39. Missing one — 8.5 is in 7–9 (→ now 8): 6+12+11+8+3 = 40 ✓. Relative freq: 15%, 30%, 27.5%, 20%, 7.5%. Cumulative freq: 6, 18, 29, 37, 40. (b) Modal class: 3–5 hours (frequency 12, 30%). Median class: 20th and 21st values. Cumulative freq at 3–5 reaches 18; 19th–29th values fall in 5–7. Median class: 5–7 hours. (c) The distribution is right-skewed: the peak is in 3–5 hours (early), with frequencies declining through 5–7 (11), 7–9 (8), and 9–11 (3). There is a comparatively high frequency at the low end. Most orders are delivered in 3–7 hours, but the tail extends to nearly 10 hours. The shape reflects that most deliveries are prompt, but a substantial minority take significantly longer. (d) Orders breaching the 6-hour threshold: 7–9 (8) + 9–11 (3) = 11 orders. 11/40 = 27.5%. Operational conclusion: over a quarter of orders fail to meet the service guarantee — a significant breach rate. The company should investigate whether delays are concentrated in particular routes, order types, or time windows, and consider process improvements in the 5–9 hour delivery pipeline specifically. (e) A left-skewed (negatively skewed) distribution over the same time range would mean most orders are delivered late (clustering at 7–10 hours), with a long tail of unexpectedly fast deliveries (1–3 hours). Visually, the histogram would peak on the right side and taper gradually to the left — the mirror image of this one. In practical terms, left-skew in delivery times would indicate chronically slow service with occasional fast outliers — a much more serious operational problem than the right-skewed case here, where most deliveries are prompt and delays are the exception.</div>
      </div>
    </div>

  </div><!-- end panel-c -->`,
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
      questions: buildAdaptiveQuestions(2, 5)
    },
    {
      id: 'c2_1_6',
      title: 'Module 2.2 — Wrap Up',
      textContent: `<div class="section-block" id="s5c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Real Data Analysis Project — End-to-End Statistical Reasoning</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Statistical reasoning does not end at drawing a histogram — it begins there. The histogram is the analytical starting point: it reveals the shape, center, and spread of a distribution, and raises questions that guide further investigation. In this project, you will apply the complete workflow — bin selection, table construction, histogram interpretation, and inference — to a realistic dataset and draw conclusions that extend beyond the numbers. <span class="vcue">[Show full project brief on screen]</span></p>

        <div class="stage-marker elaborate"></div>
        <p><strong>The Dataset:</strong> A municipal authority tracked daily electricity consumption (in kWh) for 36 residential households over one month (36 readings). The data: 14, 32, 27, 45, 19, 38, 52, 23, 41, 16, 35, 48, 29, 55, 22, 43, 18, 37, 51, 26, 44, 13, 31, 47, 21, 39, 58, 25, 42, 17, 34, 50, 28, 46, 20, 36.</p>

        <p><strong>Step 1 — Bin Selection:</strong> Range = 58 − 13 = 45. For n = 36, target 6 intervals: 45 ÷ 6 = 7.5 → round to 10. Start at 10. Intervals: 10–20, 20–30, 30–40, 40–50, 50–60. Five intervals — checking: 5 × 10 = 50 ≥ 45 ✓. A bin size of 10 is appropriate.</p>

        <p><strong>Step 2 — Frequency Table with Relative and Cumulative Frequencies:</strong></p>

        <table class="data-table">
          <thead><tr><th>Consumption (kWh)</th><th>Frequency</th><th>Relative Freq.</th><th>Cumulative Freq.</th></tr></thead>
          <tbody>
            <tr><td>10 – 20</td><td class="num">7</td><td class="num">19.4%</td><td class="num">7</td></tr>
            <tr><td>20 – 30</td><td class="num">8</td><td class="num">22.2%</td><td class="num">15</td></tr>
            <tr><td>30 – 40</td><td class="num">8</td><td class="num">22.2%</td><td class="num">23</td></tr>
            <tr><td>40 – 50</td><td class="num">8</td><td class="num">22.2%</td><td class="num">31</td></tr>
            <tr><td>50 – 60</td><td class="num">5</td><td class="num">13.9%</td><td class="num">36</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>36</strong></td><td class="num"><strong>100%</strong></td><td></td></tr>
          </tbody>
        </table>

        <div class="histogram">
          <div class="histogram-title">Daily Electricity Consumption — 36 Households (kWh)</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:88%">7</div>
              <div class="hist-label">10–20</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">20–30</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">30–40</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">8</div>
              <div class="hist-label">40–50</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:63%">5</div>
              <div class="hist-label">50–60</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Consumption (kWh)</span>
            <span>Number of Households ↑</span>
          </div>
          <div class="histogram-note">Slightly left-skewed: peak in 20–50 kWh range, tapering at both ends. Three modal classes tied at frequency 8.</div>
        </div>

        <p><strong>Step 3 — Distribution Analysis:</strong> The histogram is nearly uniform across 20–50 kWh (three intervals each with 8 households = 22.2%), with fewer households at the low end (10–20: 19.4%) and a visible drop at the high end (50–60: 13.9%). This suggests the distribution is approximately uniform with a slight left truncation — most households consume between 20 and 50 kWh per day. High consumers (50–60 kWh) represent 13.9% of households — a significant minority. The cumulative frequency shows that 50% of households (18 of 36) consume fewer than 35 kWh per day (the midpoint of the 30–40 interval approximately) — this is the approximate median class.</p>

        <p><strong>Step 4 — Inference and Application:</strong> If the authority wants to target high-consumption households for energy conservation outreach, the 50–60 kWh group (5 households, 13.9%) is the primary target. If a subsidy threshold is set at "less than 20 kWh per day" (low-income households), it would apply to 7 households (19.4%). The near-uniform distribution in the 20–50 kWh range suggests that most households have broadly similar consumption patterns — there is no strong clustering around a central value, which is consistent with diverse household sizes and income levels in a mixed residential area.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Full Analysis Challenge</span>
          A second neighbourhood is surveyed. Their consumption data (36 households) produces a histogram that is strongly right-skewed — most households consume 10–30 kWh, with a long tail extending to 80–90 kWh. (a) What does this shape tell you about the distribution of consumption in the second neighbourhood compared to the first? (b) If you had to choose a single "typical" consumption level for each neighbourhood, which class interval would you cite, and why? (c) Which neighbourhood presents a greater challenge for energy conservation planning, and what data would you want to collect next to confirm your reasoning? (d) Construct an argument: could two neighbourhoods have histograms with identical shapes but different modal classes? What would this tell you?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Analysis — Path C</h3>
        <div class="practice-q">A logistics company tracked the delivery time (in hours) for 40 orders over two weeks: 2.1, 5.8, 3.4, 8.2, 4.7, 6.9, 1.8, 7.3, 3.9, 5.2, 9.1, 4.1, 6.4, 2.7, 8.8, 3.6, 5.5, 7.7, 2.4, 4.9, 6.1, 9.4, 3.2, 5.9, 8.5, 4.3, 7.1, 2.9, 6.6, 3.8, 9.8, 5.1, 4.6, 7.5, 2.6, 6.3, 8.1, 3.5, 5.7, 4.4. (a) Select an appropriate bin size, justify it, and construct a grouped frequency table with relative frequency and cumulative frequency columns. (b) Identify the modal class and median class. (c) Describe the histogram's shape — is it skewed, symmetric, or uniform? Support your answer with reference to the frequencies. (d) The company's service agreement guarantees delivery within 6 hours. What percentage of orders breached this threshold? What operational conclusion does this suggest? (e) A competing company claims their deliveries follow a left-skewed distribution over the same time range. What does this mean in practical terms, and how would their histogram differ visually from this one?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 9.8 − 1.8 = 8.0. For n = 40, target 5–8 intervals: 8.0 ÷ 8 = 1.0 → bin size 2. Start at 1. Intervals: 1–3, 3–5, 5–7, 7–9, 9–11. Five intervals — good for 40 data points. Frequencies: 1–3: 2.1, 1.8, 2.7, 2.4, 2.9, 2.6 = 6. 3–5: 3.4, 4.7, 3.9, 4.1, 3.6, 4.9, 3.2, 4.3, 3.8, 3.5, 4.6, 4.4 = 12. 5–7: 5.8, 6.9, 5.2, 5.5, 6.1, 5.9, 5.1, 6.6, 6.3, 5.7 = 10. 7–9: 8.2, 7.3, 8.8, 7.7, 7.1, 7.5, 8.1 = 7. 9–11: 9.1, 9.4, 9.8 = 3. Wait: let me check 6.4 — 6.4 is ≥5 and &lt;7 → 5–7. 6.4 and 6.6 and 6.3 are already counted? Recount 5–7: 5.8, 6.9, 5.2, 6.4, 5.5, 6.1, 5.9, 6.6, 5.1, 6.3, 5.7 = 11. And 3–5: 3.4, 4.7, 3.9, 4.1, 3.6, 4.9, 3.2, 4.3, 3.8, 3.5, 4.6, 4.4 = 12. Total: 6+12+11+7+3 = 39. Missing one — 8.5 is in 7–9 (→ now 8): 6+12+11+8+3 = 40 ✓. Relative freq: 15%, 30%, 27.5%, 20%, 7.5%. Cumulative freq: 6, 18, 29, 37, 40. (b) Modal class: 3–5 hours (frequency 12, 30%). Median class: 20th and 21st values. Cumulative freq at 3–5 reaches 18; 19th–29th values fall in 5–7. Median class: 5–7 hours. (c) The distribution is right-skewed: the peak is in 3–5 hours (early), with frequencies declining through 5–7 (11), 7–9 (8), and 9–11 (3). There is a comparatively high frequency at the low end. Most orders are delivered in 3–7 hours, but the tail extends to nearly 10 hours. The shape reflects that most deliveries are prompt, but a substantial minority take significantly longer. (d) Orders breaching the 6-hour threshold: 7–9 (8) + 9–11 (3) = 11 orders. 11/40 = 27.5%. Operational conclusion: over a quarter of orders fail to meet the service guarantee — a significant breach rate. The company should investigate whether delays are concentrated in particular routes, order types, or time windows, and consider process improvements in the 5–9 hour delivery pipeline specifically. (e) A left-skewed (negatively skewed) distribution over the same time range would mean most orders are delivered late (clustering at 7–10 hours), with a long tail of unexpectedly fast deliveries (1–3 hours). Visually, the histogram would peak on the right side and taper gradually to the left — the mirror image of this one. In practical terms, left-skew in delivery times would indicate chronically slow service with occasional fast outliers — a much more serious operational problem than the right-skewed case here, where most deliveries are prompt and delays are the exception.</div>
      </div>
    </div>

  </div><!-- end panel-c -->`,
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
      questions: buildAdaptiveQuestions(2, 6)
    }
  ]
};

export const module_2: Module = filterModuleByPath(moduleData, 'C');
