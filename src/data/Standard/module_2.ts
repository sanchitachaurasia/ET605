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
      title: 'Class Intervals — Grouping Large Data',
      textContent: `<div class="duration-badge" style="background:var(--b-light);color:var(--b-hue);">⏱ Curated from module2_2_grouping_data_histograms_new.html · Path B — Standard</div>

<div class="section-block" id="s1b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 1 of 5</p>
      <h2 class="section-title">Class Intervals — Grouping Large Data</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>In our last session we looked at how data is collected. Today we go one step further — organising large amounts of data into groups so that patterns become readable. Here is the marks list for 30 students (out of 50): 23, 41, 17, 38, 29, 44, 12, 35, 27, 48, 19, 31, 22, 46, 14, 33, 26, 40, 18, 37, 25, 43, 11, 36, 28, 45, 16, 32, 24, 39. <span class="vcue">[Show list on screen]</span> How many students scored between 20 and 30? Can you answer without scanning every number? This is the problem class intervals solve.</p>

        <div class="stage-marker explore"></div>
        <p>Instead of looking at each value individually, we create equal-sized groups — one for marks 10–20, another for 20–30, and so on. This immediately reveals patterns. <span class="vcue">[Show the list being grouped mentally]</span> Which group appears to have the most values? The middle ranges — this is the kind of insight that emerges from grouping, even before a table is built.</p>

        <div class="stage-marker explain"></div>
        <p>A class interval is a fixed-width range used to group data. The class size (or class width) is the width of each interval — here it is 10. The critical boundary rule: the lower limit is included, the upper limit is excluded. So 20 belongs to 20–30, not 10–20. Written mathematically: [10, 20) means 10 is included, 20 is not. This ensures every value belongs to exactly one group. <span class="vcue">[Show number line with boundary rule]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>Building the frequency table for our 30 marks, with intervals 10–20, 20–30, 30–40, 40–50: <span class="vcue">[Show tally process on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Class Interval</th><th>Tally</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>10 – 20</td><td class="tally">|||| ||</td><td class="num">7</td></tr>
            <tr><td>20 – 30</td><td class="tally">|||| |||</td><td class="num">8</td></tr>
            <tr><td>30 – 40</td><td class="tally">|||| |||</td><td class="num">8</td></tr>
            <tr><td>40 – 50</td><td class="tally">|||| ||</td><td class="num">7</td></tr>
            <tr><td><strong>Total</strong></td><td></td><td class="num"><strong>30 ✓</strong></td></tr>
          </tbody>
        </table>

        <p>The distribution is nearly even — 8 in each middle group, 7 at each end. This was invisible in the raw list. Notice that the total equals 30 — always verify this. Grouped data does not lose information; it organises it into a readable structure.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          Heights (in cm) of 20 students: 142, 155, 138, 161, 149, 153, 136, 158, 145, 162, 140, 157, 148, 165, 143, 152, 139, 160, 147, 154. Use class intervals 130–140, 140–150, 150–160, 160–170 (size 10). Build a frequency table. Which interval has the most students, and what does this tell you?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 1</h3>
        <div class="practice-q">Complete the frequency table for the heights dataset (20 students, intervals 130–140, 140–150, 150–160, 160–170). Apply the boundary rule. Verify your total equals 20. Identify the modal class — the interval with the highest frequency.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">130–140: 138, 136, 139. Frequency: 3. | 140–150: 142, 149, 145, 140, 148, 143, 147. Frequency: 7. | 150–160: 155, 153, 158, 157, 152, 154. Frequency: 6. | 160–170: 161, 162, 165, 160. Frequency: 4. | Total: 20 ✓. Modal class: 140–150 (frequency 7). This means the most common height in the class falls in the 140–150 cm range.</div>
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
      title: 'What Is a Histogram?',
      textContent: `<div class="section-block" id="s2b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 2 of 5</p>
      <h2 class="section-title">What Is a Histogram?</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You know bar graphs — good for categorical data like favourite sports. But when data is grouped into class intervals, we need a different tool. Class intervals are not separate categories; they are adjacent ranges on a continuous number line. The graph that represents this correctly is the histogram. <span class="vcue">[Show a bar graph and histogram side-by-side]</span> The most visible difference: histogram bars touch. That's not an accident — it carries mathematical meaning.</p>

        <div class="stage-marker explore"></div>
        <p>Look at our marks frequency table: 10–20: 7, 20–30: 8, 30–40: 8, 40–50: 7. The x-axis shows the class intervals as a number line. Should there be a gap between the bar ending at 20 and the bar beginning at 20? No — because 20 is the shared boundary. The two intervals are connected. <span class="pcue">(This is the core idea)</span> No gap = continuous data. Gap = separate categories. The presence or absence of gaps is not cosmetic — it communicates the nature of the data.</p>

        <div class="stage-marker explain"></div>
        <p>A histogram is a bar graph for grouped continuous data. Key features: bars always touch; x-axis is a number line (not category labels); y-axis shows frequency; height of each bar equals frequency (for equal-width intervals). <span class="vcue">[Display labelled histogram]</span></p>

        <div class="histogram">
          <div class="histogram-title">Distribution of Marks in Surprise Test</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:87.5%">7</div>
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
              <div class="hist-bar" style="height:87.5%">7</div>
              <div class="hist-label">40–50</div>
            </div>
          </div>
          <div class="histogram-note">Bars touch — continuous data. Height = frequency. Shape reveals distribution.</div>
        </div>

        <div class="stage-marker elaborate"></div>
        <p>The shape of a histogram reveals the distribution of the data. Here is the time-taken data for 25 students completing a worksheet: <span class="vcue">[Show frequency table and histogram]</span></p>

        <table class="data-table">
          <thead><tr><th>Time (minutes)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>0 – 10</td><td class="num">3</td></tr>
            <tr><td>10 – 20</td><td class="num">7</td></tr>
            <tr><td>20 – 30</td><td class="num">9</td></tr>
            <tr><td>30 – 40</td><td class="num">5</td></tr>
            <tr><td>40 – 50</td><td class="num">1</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>25 ✓</strong></td></tr>
          </tbody>
        </table>

        <p>This histogram rises from the left, peaks at 20–30, then falls to the right. This tells us: most students took 20–30 minutes; very few finished under 10 minutes or took over 40 minutes. The shape communicates the distribution instantly. Compare this to the marks histogram — which was nearly flat (even distribution). Different shapes = different stories about the data.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          Outdoor activity data (40 students) — 0–5 hrs: 4, 5–10 hrs: 11, 10–15 hrs: 14, 15–20 hrs: 8, 20–25 hrs: 3. (a) Describe the shape of the histogram. (b) Which interval is the modal class? (c) Would a bar graph be appropriate here — why or why not?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 2</h3>
        <div class="practice-q">Outdoor activity data: 0–5: 4, 5–10: 11, 10–15: 14, 15–20: 8, 20–25: 3. Describe what the histogram would look like. Identify the modal class and interpret it in the context of students' habits. Compare: if these were category labels (Cricket, Football, etc.) instead of hours, would you use a histogram or a bar graph? Why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">The histogram would rise from a low start (4 students, 0–5 hrs), increase through 5–10 (11) and 10–15 (14), then fall through 15–20 (8) and drop sharply to 20–25 (3). It peaks in the middle — a roughly bell-shaped, right-skewed distribution. Modal class: 10–15 hours (14 students). This means the most common outdoor activity level is 10–15 hrs/week — about 1.5 to 2 hours per day. If these were category labels (Cricket, Football, etc.), a bar graph would be correct — because those are separate, unconnected categories, and gaps between bars would correctly show they are not adjacent on a number line. Hours are continuous; sports categories are not.</div>
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
      textContent: `<div class="section-block" id="s3b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 3 of 5</p>
      <h2 class="section-title">Choosing the Right Bin Size</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>When you built a grouped frequency table, the bin size was given to you. But what if it weren't? How do you decide the right width for each class interval? This is a decision that shapes the entire histogram — choose poorly and either the pattern is hidden or the graph is too noisy to read. <span class="vcue">[Show three histograms of the same data with different bin sizes]</span></p>

        <div class="stage-marker explain"></div>
        <p>The bin size (class size) determines how many intervals your data is divided into. A useful rule: aim for 5 to 10 intervals for most datasets. Use this formula to get started: Bin size ≈ Range ÷ Desired number of intervals. Then round to the nearest convenient number (a multiple of 5 or 10 usually works well). A bin size that is too large collapses all data into two or three bars — you lose detail. Too small, and you end up with dozens of bars each nearly empty — you lose the shape. <span class="vcue">[Show visual of each extreme]</span></p>

        <div class="stage-marker elaborate"></div>
        <p><strong>Example 1 — Comparing Bin Sizes on the Marks Data:</strong> Our 30 marks have a range of 37 (48 − 11). With bin size 10, we get 4 intervals (10–20, 20–30, 30–40, 40–50) with frequencies 7, 8, 8, 7 — a clear, readable pattern showing even distribution. With bin size 5, we get 8 intervals, each with only 3 or 4 students — the pattern becomes unclear and harder to interpret. For 30 data points, bin size 10 is the better choice.</p>

        <p><strong>Example 2 — Small Range Data (Temperatures):</strong> Fifteen daily temperatures (°C): 28, 31, 29, 33, 30, 27, 32, 34, 29, 31, 28, 30, 33, 32, 29. Range = 34 − 27 = 7. Using bin size 10 would give just one interval — useless. A bin size of 2 gives intervals 26–28, 28–30, 30–32, 32–34, 34–36, each with 2–5 readings. This reveals that temperatures cluster around 28–32°C. The bin size must match the scale of the data.</p>

        <table class="data-table">
          <thead><tr><th>Temperature (°C)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>26 – 28</td><td class="num">2</td></tr>
            <tr><td>28 – 30</td><td class="num">5</td></tr>
            <tr><td>30 – 32</td><td class="num">4</td></tr>
            <tr><td>32 – 34</td><td class="num">3</td></tr>
            <tr><td>34 – 36</td><td class="num">1</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>15 ✓</strong></td></tr>
          </tbody>
        </table>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          A dataset of 20 values has a range of 45. (a) If you want 5 intervals, what bin size would you use? (b) If you increased the bin size to 15, how many intervals would you get? Would this be too many or too few for 20 data points? (c) What is the general consequence of using a bin size that is too small?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 3</h3>
        <div class="practice-q">The distances (in km) run by 18 students in a cross-country event: 3.2, 5.8, 4.1, 7.3, 6.0, 4.9, 5.5, 3.7, 6.8, 5.2, 4.4, 7.1, 3.9, 6.3, 5.7, 4.6, 6.5, 5.0. (a) Find the range. (b) Choose an appropriate bin size and list your intervals. Justify your choice. (c) Build the grouped frequency table. (d) Which class interval is the modal class?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 7.3 − 3.2 = 4.1 km. (b) For 18 data points, aiming for 5 intervals: 4.1 ÷ 5 ≈ 0.8. Round to 1.0 for convenience. Start at 3.0 (below minimum of 3.2). Intervals: 3–4, 4–5, 5–6, 6–7, 7–8. Five intervals — appropriate for 18 data points. (c) 3–4: 3.2, 3.7, 3.9 = 3. 4–5: 4.1, 4.9, 4.4, 4.6 = 4. 5–6: 5.8, 5.5, 5.2, 5.7, 5.0 = 5. 6–7: 6.0, 6.8, 6.3, 6.5 = 4. 7–8: 7.3, 7.1 = 2. Total: 3+4+5+4+2 = 18 ✓. (d) Modal class: 5–6 km (frequency 5). Most students ran between 5 and 6 km.</div>
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
      title: 'Histograms vs Bar Graphs — A Conceptual Comparison',
      textContent: `<div class="section-block" id="s4b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 4 of 5</p>
      <h2 class="section-title">Histograms vs Bar Graphs — A Conceptual Comparison</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You have used both histograms and bar graphs in this module. They look similar — both use rectangular bars and axes. But they represent fundamentally different types of data, and mixing them up is one of the most common errors in data handling. The distinction comes down to a single question: is your data categorical or continuous? <span class="vcue">[Show both graph types side by side]</span></p>

        <div class="stage-marker explain"></div>
        <p>A bar graph represents categorical data — data where each group is a separate, named category with no shared boundaries. Favourite sports, types of fruit, subjects in school — these are categories. The gaps between bars signal: "these groups are completely separate from each other." In contrast, a histogram represents grouped continuous data — numbers that exist on a number line. Class intervals are adjacent ranges sharing boundaries. No gaps signal: "these intervals sit right next to each other on the number line, with no space between them." <span class="vcue">[Highlight the gap vs no-gap distinction]</span></p>

        <table class="data-table">
          <thead><tr><th>Feature</th><th>Bar Graph</th><th>Histogram</th></tr></thead>
          <tbody>
            <tr><td>Data type</td><td>Categorical</td><td>Continuous (grouped)</td></tr>
            <tr><td>Bars touch?</td><td>No — gaps present</td><td>Yes — no gaps</td></tr>
            <tr><td>X-axis</td><td>Category names</td><td>Number line with intervals</td></tr>
            <tr><td>Can bars be reordered?</td><td>Usually yes</td><td>No — fixed by number line</td></tr>
            <tr><td>Example</td><td>Number of students in each house</td><td>Marks of students in class intervals</td></tr>
          </tbody>
        </table>

        <div class="stage-marker elaborate"></div>
        <p>One more important point: the x-axis tells the story. In a bar graph, the x-axis labels are words — "Cricket," "Football," "Badminton." You could rearrange them in any order and the graph would still make sense. In a histogram, the x-axis is a number line — 10, 20, 30, 40, 50. The order is non-negotiable. You cannot put 30–40 before 10–20. This fixed ordering reflects the continuous nature of the underlying data.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          Classify each dataset as appropriate for a bar graph or histogram, and explain why: (a) Number of students who prefer each season (Summer, Monsoon, Winter, Autumn). (b) Time (in seconds) students take to solve a puzzle, grouped in intervals of 30. (c) Number of books in different school subjects (Math, Science, English, History). (d) Heights of plants measured after 4 weeks, grouped in intervals of 5 cm.
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 4</h3>
        <div class="practice-q">A student draws the following graph: bars for "Marks 0–25," "Marks 25–50," "Marks 50–75," "Marks 75–100" — but leaves gaps between each bar. (a) Is this a histogram or a bar graph? (b) What mistake has the student made? (c) What does the gap incorrectly communicate to anyone reading the graph?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) It should be a histogram, since the data is grouped continuous data (marks grouped in intervals). (b) The student has incorrectly drawn gaps between the bars. In a histogram, bars must always touch because the intervals are adjacent and share boundaries. The value 25 is both the upper limit of 0–25 and the lower limit of 25–50 — there is no real gap between them. (c) The gap incorrectly communicates that there are no marks between 25 and 25 — which is meaningless. More broadly, it suggests these intervals are separate categories (like different sports) rather than adjacent ranges on a number line. This misrepresents the nature of the data entirely.</div>
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
      title: 'Real Data Analysis Project',
      textContent: `<div class="section-block" id="s5b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Real Data Analysis Project</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Data analysis is most meaningful when the data is real and the questions matter. In this final topic, you will work through a complete analysis — choosing a bin size, building the frequency table, interpreting the histogram, and drawing conclusions. <span class="vcue">[Show the dataset on screen]</span></p>

        <p>The data: A school nurse recorded the number of hours of sleep 30 students got on a school night. Hours: 5.0, 7.5, 6.0, 8.5, 7.0, 9.0, 6.5, 8.0, 7.5, 5.5, 9.5, 6.0, 8.0, 7.0, 6.5, 9.0, 5.0, 7.5, 8.5, 6.0, 9.0, 7.0, 6.5, 8.0, 5.5, 7.5, 8.5, 6.0, 7.0, 9.5.</p>

        <div class="stage-marker elaborate"></div>
        <p>Range = 9.5 − 5.0 = 4.5 hours. For 30 data points, 5 intervals works well: 4.5 ÷ 5 = 0.9 → bin size 1.0. Starting at 5: intervals are 5–6, 6–7, 7–8, 8–9, 9–10.</p>

        <table class="data-table">
          <thead><tr><th>Sleep (hours)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>5 – 6</td><td class="num">4</td></tr>
            <tr><td>6 – 7</td><td class="num">7</td></tr>
            <tr><td>7 – 8</td><td class="num">9</td></tr>
            <tr><td>8 – 9</td><td class="num">6</td></tr>
            <tr><td>9 – 10</td><td class="num">4</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>30 ✓</strong></td></tr>
          </tbody>
        </table>

        <div class="histogram">
          <div class="histogram-title">Sleep Hours of 30 Students on a School Night</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:44%">4</div>
              <div class="hist-label">5–6</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:78%">7</div>
              <div class="hist-label">6–7</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">9</div>
              <div class="hist-label">7–8</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:67%">6</div>
              <div class="hist-label">8–9</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:44%">4</div>
              <div class="hist-label">9–10</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Sleep (hours)</span>
            <span>Number of Students ↑</span>
          </div>
          <div class="histogram-note">Peak at 7–8 hours. Nearly symmetric — most students sleep 6–9 hours. Very few sleep under 6 or over 9.</div>
        </div>

        <p>The histogram is nearly symmetric, peaking at 7–8 hours. The modal class is 7–8 hours — the most common amount of sleep. Few students sleep fewer than 6 hours or more than 9 hours. The school nurse could conclude that while most students are getting reasonable sleep, about 4 students getting 5–6 hours may be at risk of fatigue affecting their performance.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Analysis Questions</span>
          Using the sleep data above: (a) What percentage of students sleep less than 7 hours? (b) Is this histogram skewed? Describe its shape. (c) If the nurse set a benchmark of "at least 7 hours is healthy sleep," what percentage of students meet this benchmark? (d) How does this histogram compare in shape to the marks histogram from Topic 1?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Practice — Path B</h3>
        <div class="practice-q">Pulse rates (beats per minute) of 24 students during exercise: 88, 102, 115, 96, 128, 108, 91, 124, 99, 112, 84, 120, 104, 93, 118, 107, 86, 126, 100, 110, 95, 122, 97, 116. (a) Find the range and choose an appropriate bin size. List your class intervals. (b) Build the frequency table. (c) Identify the modal class. (d) What percentage of students had a pulse rate above 110 bpm? (e) Is this data better represented by a histogram or bar graph? Why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 128 − 84 = 44. For 24 data points, aiming for 5–6 intervals: 44 ÷ 5 = 8.8 → round to 10. Start at 80. Intervals: 80–90, 90–100, 100–110, 110–120, 120–130. (b) 80–90: 88, 86, 84 = 3. 90–100: 96, 91, 99, 93, 95, 97 = 6. 100–110: 102, 108, 104, 107, 100 = 5. 110–120: 115, 112, 118, 110, 116 = 5. 120–130: 128, 124, 120, 126, 122 = 5. Total: 3+6+5+5+5 = 24 ✓. (c) Modal class: 90–100 (frequency 6). (d) Students above 110 bpm: 5 (110–120) + 5 (120–130) = 10 students. 10/24 ≈ 41.7%. (e) Histogram — pulse rate is continuous numerical data grouped into adjacent intervals on a number line. Bars must touch. A bar graph would be incorrect as there are no separate category labels.</div>
      </div>
    </div>

  </div><!-- end panel-b -->

  <!-- ══════════════════════════════════════════════
       PATH C
  ══════════════════════════════════════════════ -->`,
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
      textContent: `<div class="section-block" id="s5b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Real Data Analysis Project</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Data analysis is most meaningful when the data is real and the questions matter. In this final topic, you will work through a complete analysis — choosing a bin size, building the frequency table, interpreting the histogram, and drawing conclusions. <span class="vcue">[Show the dataset on screen]</span></p>

        <p>The data: A school nurse recorded the number of hours of sleep 30 students got on a school night. Hours: 5.0, 7.5, 6.0, 8.5, 7.0, 9.0, 6.5, 8.0, 7.5, 5.5, 9.5, 6.0, 8.0, 7.0, 6.5, 9.0, 5.0, 7.5, 8.5, 6.0, 9.0, 7.0, 6.5, 8.0, 5.5, 7.5, 8.5, 6.0, 7.0, 9.5.</p>

        <div class="stage-marker elaborate"></div>
        <p>Range = 9.5 − 5.0 = 4.5 hours. For 30 data points, 5 intervals works well: 4.5 ÷ 5 = 0.9 → bin size 1.0. Starting at 5: intervals are 5–6, 6–7, 7–8, 8–9, 9–10.</p>

        <table class="data-table">
          <thead><tr><th>Sleep (hours)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>5 – 6</td><td class="num">4</td></tr>
            <tr><td>6 – 7</td><td class="num">7</td></tr>
            <tr><td>7 – 8</td><td class="num">9</td></tr>
            <tr><td>8 – 9</td><td class="num">6</td></tr>
            <tr><td>9 – 10</td><td class="num">4</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>30 ✓</strong></td></tr>
          </tbody>
        </table>

        <div class="histogram">
          <div class="histogram-title">Sleep Hours of 30 Students on a School Night</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:44%">4</div>
              <div class="hist-label">5–6</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:78%">7</div>
              <div class="hist-label">6–7</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">9</div>
              <div class="hist-label">7–8</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:67%">6</div>
              <div class="hist-label">8–9</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:44%">4</div>
              <div class="hist-label">9–10</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Sleep (hours)</span>
            <span>Number of Students ↑</span>
          </div>
          <div class="histogram-note">Peak at 7–8 hours. Nearly symmetric — most students sleep 6–9 hours. Very few sleep under 6 or over 9.</div>
        </div>

        <p>The histogram is nearly symmetric, peaking at 7–8 hours. The modal class is 7–8 hours — the most common amount of sleep. Few students sleep fewer than 6 hours or more than 9 hours. The school nurse could conclude that while most students are getting reasonable sleep, about 4 students getting 5–6 hours may be at risk of fatigue affecting their performance.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Analysis Questions</span>
          Using the sleep data above: (a) What percentage of students sleep less than 7 hours? (b) Is this histogram skewed? Describe its shape. (c) If the nurse set a benchmark of "at least 7 hours is healthy sleep," what percentage of students meet this benchmark? (d) How does this histogram compare in shape to the marks histogram from Topic 1?
        </div>
      </div>
      <div class="practice-box">
        <h3>Final Practice — Path B</h3>
        <div class="practice-q">Pulse rates (beats per minute) of 24 students during exercise: 88, 102, 115, 96, 128, 108, 91, 124, 99, 112, 84, 120, 104, 93, 118, 107, 86, 126, 100, 110, 95, 122, 97, 116. (a) Find the range and choose an appropriate bin size. List your class intervals. (b) Build the frequency table. (c) Identify the modal class. (d) What percentage of students had a pulse rate above 110 bpm? (e) Is this data better represented by a histogram or bar graph? Why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 128 − 84 = 44. For 24 data points, aiming for 5–6 intervals: 44 ÷ 5 = 8.8 → round to 10. Start at 80. Intervals: 80–90, 90–100, 100–110, 110–120, 120–130. (b) 80–90: 88, 86, 84 = 3. 90–100: 96, 91, 99, 93, 95, 97 = 6. 100–110: 102, 108, 104, 107, 100 = 5. 110–120: 115, 112, 118, 110, 116 = 5. 120–130: 128, 124, 120, 126, 122 = 5. Total: 3+6+5+5+5 = 24 ✓. (c) Modal class: 90–100 (frequency 6). (d) Students above 110 bpm: 5 (110–120) + 5 (120–130) = 10 students. 10/24 ≈ 41.7%. (e) Histogram — pulse rate is continuous numerical data grouped into adjacent intervals on a number line. Bars must touch. A bar graph would be incorrect as there are no separate category labels.</div>
      </div>
    </div>

  </div><!-- end panel-b -->

  <!-- ══════════════════════════════════════════════
       PATH C
  ══════════════════════════════════════════════ -->`,
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

export const module_2: Module = filterModuleByPath(moduleData, 'B');
