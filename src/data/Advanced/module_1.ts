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
  id: '2.1',
  title: 'Data Organisation & Types of Graphs',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'Why Do We Need to Organise Data?',
      textContent: `<div class="duration-badge" style="background:var(--c-light);color:var(--c-hue);">⏱ Estimated reading time: 6–8 minutes &nbsp;·&nbsp; Path C — Advanced · Direct Application</div>

<div class="section-block" id="s1c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topics 1–2 of 6</p>
      <h2 class="section-title">Data Organisation &amp; Frequency Tables</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Raw data is noise. Organised data is signal. The tools that convert one to the other — tally marks, frequency tables — are not ends in themselves but the starting conditions for analysis. <span class="vcue">[Show the sports survey data: 20 raw responses]</span> Your task is not just to build the frequency table, but to use it to answer a question that the raw data cannot answer at all: not "which sport is popular?" (anyone can see that with some effort) but "how concentrated is the preference?" Is one sport dominant, or are choices spread evenly?</p>

        <div class="stage-marker explore"></div>
        <p>Sports data: Cricket 9, Football 5, Badminton 4, Kho-Kho 2. Total = 20. Cricket accounts for 45% of all responses. Compare this to a case where: Cricket 6, Football 6, Badminton 5, Kho-Kho 3 — here, no sport exceeds 30%. In the first case, data is concentrated; in the second, it is dispersed. A frequency table makes this analysis possible; raw data does not.</p>

        <div class="stage-marker explain"></div>
        <p>The frequency table for the subject preference data (Art: 5, Maths: 7, Science: 4, English: 4, total: 20) reveals something beyond mere counts. Maths leads at 35% of responses. Science and English are tied at 20% each. Art falls between at 25%. The tie between Science and English is an interesting finding — it suggests these subjects may share a common appeal or a common barrier. This is the kind of observation that emerges from organised data and drives meaningful educational decisions.</p>

        <table class="data-table">
          <thead><tr><th>Subject</th><th>Frequency</th><th>% of Total</th><th>Rank</th></tr></thead>
          <tbody>
            <tr><td>Maths</td><td class="num">7</td><td class="num">35%</td><td class="num">1st</td></tr>
            <tr><td>Art</td><td class="num">5</td><td class="num">25%</td><td class="num">2nd</td></tr>
            <tr><td>Science</td><td class="num">4</td><td class="num">20%</td><td class="num">3rd =</td></tr>
            <tr><td>English</td><td class="num">4</td><td class="num">20%</td><td class="num">3rd =</td></tr>
          </tbody>
        </table>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Challenge</span>
          A school surveys 40 students and finds: Sport A chosen by 25, B by 8, C by 5, D by 2. Another school of the same size finds: Sport A: 12, B: 11, C: 10, D: 7. Compare the two distributions. Which school has a more "democratic" preference pattern? If you were planning a sports day for each school, how would the two frequency distributions change your planning?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topics 1 & 2</h3>
        <div class="practice-q">In a class of 30, test scores out of 20 are: 12, 15, 18, 12, 16, 20, 14, 12, 18, 15, 16, 12, 20, 14, 15, 18, 12, 16, 14, 20, 15, 18, 12, 14, 16, 15, 20, 18, 14, 16. Build a frequency table. Find the score with highest frequency. Calculate what percentage of students scored 18 or above. If the pass mark is 12, how many students passed?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Frequency table: Score 12: 6 times, Score 14: 6 times, Score 15: 5 times, Score 16: 5 times, Score 18: 5 times, Score 20: 4 times (wait — 6+6+5+5+5+4 = 31, recount). Corrected recount: 12 appears 6 times, 14 appears 5 times, 15 appears 5 times, 16 appears 5 times, 18 appears 5 times, 20 appears 4 times. Total = 30 ✓. Highest frequency: 12 (6 students). Students scoring 18 or above: 5 + 4 = 9 students = 30%. Pass mark 12 — ALL 30 students scored at least 12 (the minimum in the data is 12), so all 30 students passed. This is a significant finding — the teacher maintained 100% pass rate.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T3 -->

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
      title: 'Tally Marks & Frequency Tables',
      textContent: `<div class="section-block" id="s1c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topics 1–2 of 6</p>
      <h2 class="section-title">Data Organisation &amp; Frequency Tables</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Raw data is noise. Organised data is signal. The tools that convert one to the other — tally marks, frequency tables — are not ends in themselves but the starting conditions for analysis. <span class="vcue">[Show the sports survey data: 20 raw responses]</span> Your task is not just to build the frequency table, but to use it to answer a question that the raw data cannot answer at all: not "which sport is popular?" (anyone can see that with some effort) but "how concentrated is the preference?" Is one sport dominant, or are choices spread evenly?</p>

        <div class="stage-marker explore"></div>
        <p>Sports data: Cricket 9, Football 5, Badminton 4, Kho-Kho 2. Total = 20. Cricket accounts for 45% of all responses. Compare this to a case where: Cricket 6, Football 6, Badminton 5, Kho-Kho 3 — here, no sport exceeds 30%. In the first case, data is concentrated; in the second, it is dispersed. A frequency table makes this analysis possible; raw data does not.</p>

        <div class="stage-marker explain"></div>
        <p>The frequency table for the subject preference data (Art: 5, Maths: 7, Science: 4, English: 4, total: 20) reveals something beyond mere counts. Maths leads at 35% of responses. Science and English are tied at 20% each. Art falls between at 25%. The tie between Science and English is an interesting finding — it suggests these subjects may share a common appeal or a common barrier. This is the kind of observation that emerges from organised data and drives meaningful educational decisions.</p>

        <table class="data-table">
          <thead><tr><th>Subject</th><th>Frequency</th><th>% of Total</th><th>Rank</th></tr></thead>
          <tbody>
            <tr><td>Maths</td><td class="num">7</td><td class="num">35%</td><td class="num">1st</td></tr>
            <tr><td>Art</td><td class="num">5</td><td class="num">25%</td><td class="num">2nd</td></tr>
            <tr><td>Science</td><td class="num">4</td><td class="num">20%</td><td class="num">3rd =</td></tr>
            <tr><td>English</td><td class="num">4</td><td class="num">20%</td><td class="num">3rd =</td></tr>
          </tbody>
        </table>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Challenge</span>
          A school surveys 40 students and finds: Sport A chosen by 25, B by 8, C by 5, D by 2. Another school of the same size finds: Sport A: 12, B: 11, C: 10, D: 7. Compare the two distributions. Which school has a more "democratic" preference pattern? If you were planning a sports day for each school, how would the two frequency distributions change your planning?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topics 1 & 2</h3>
        <div class="practice-q">In a class of 30, test scores out of 20 are: 12, 15, 18, 12, 16, 20, 14, 12, 18, 15, 16, 12, 20, 14, 15, 18, 12, 16, 14, 20, 15, 18, 12, 14, 16, 15, 20, 18, 14, 16. Build a frequency table. Find the score with highest frequency. Calculate what percentage of students scored 18 or above. If the pass mark is 12, how many students passed?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Frequency table: Score 12: 6 times, Score 14: 6 times, Score 15: 5 times, Score 16: 5 times, Score 18: 5 times, Score 20: 4 times (wait — 6+6+5+5+5+4 = 31, recount). Corrected recount: 12 appears 6 times, 14 appears 5 times, 15 appears 5 times, 16 appears 5 times, 18 appears 5 times, 20 appears 4 times. Total = 30 ✓. Highest frequency: 12 (6 students). Students scoring 18 or above: 5 + 4 = 9 students = 30%. Pass mark 12 — ALL 30 students scored at least 12 (the minimum in the data is 12), so all 30 students passed. This is a significant finding — the teacher maintained 100% pass rate.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T3 -->

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
      title: 'Pictographs',
      textContent: `<div class="section-block" id="s3c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 3 of 6</p>
      <h2 class="section-title">Pictographs — Scale, Precision &amp; Limitations</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>A pictograph's value lies entirely in its scale choice. A poorly chosen scale either forces too many symbols (unreadable) or loses precision through excessive fractional symbols. The real analytical skill with pictographs is not drawing them — it's critically evaluating them. Given data, can you identify whether a pictograph is well-constructed or misleading? <span class="vcue">[Show car sales pictograph: Mumbai 500, Delhi 300, Chennai 400, Kolkata 200. Key: 🚗 = 100]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>Consider this data for car sales with a changed scale. If the key were 🚗 = 150 instead of 100: Mumbai = 500/150 = 3.33 symbols (requires a third-symbol — unusual). Delhi = 300/150 = 2 exactly. Chennai = 400/150 = 2.67 symbols (imprecise). This scale is poor. The original scale of 100 is better because it divides evenly into all values. The principle: choose a scale that is a common factor of all (or most) data values. When no such scale exists, round to the nearest practical value and note that some precision is lost.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Critical Analysis Challenge</span>
          Data: City A sold 720 cars, City B sold 540 cars, City C sold 630 cars, City D sold 450 cars. (a) Find the HCF of these values — this gives the most precise pictograph scale. (b) Why might you choose a larger scale despite losing precision? (c) If someone used a scale of 200 cars per symbol, what would the fractional symbols be for each city? Are all fractional values "neat" halves or are some imprecise?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 3</h3>
        <div class="practice-q">A pictograph shows monthly website visitors: Jan-4500, Feb-3000, Mar-6000, Apr-4500, May-7500, Jun-6000. A student uses a key of 1 symbol = 1000 visitors. (a) How many symbols per month? (b) Evaluate this scale — is it appropriate? (c) Suggest an alternative scale and justify it. (d) Which month shows the sharpest increase from the previous month?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Jan: 4.5, Feb: 3, Mar: 6, Apr: 4.5, May: 7.5, Jun: 6. (b) The scale is manageable (max 7.5 symbols), but Jan and Apr require half symbols, and May also needs a half symbol. It is acceptable but not the most elegant choice. (c) A better scale: 1 symbol = 1500 visitors. Then: Jan: 3, Feb: 2, Mar: 4, Apr: 3, May: 5, Jun: 4. All whole numbers — no fractional symbols needed. This scale works because 1500 is a factor of all six values. (d) Sharpest increase: May (from 4500 to 7500, an increase of 3000 — the largest single-month jump).</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T4 -->

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
      title: 'Bar Graphs & Double Bar Graphs',
      textContent: `<div class="section-block" id="s4c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 4 of 6</p>
      <h2 class="section-title">Bar Graphs — Construction, Comparison &amp; Insight</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Bar graphs are the workhorse of data representation — precise, scalable, and capable of revealing patterns that tables hide. A double bar graph adds a comparative dimension: not just "how much?" but "compared to what?" The analytical power lies in reading both the absolute heights and the relative differences between paired bars across all categories simultaneously. <span class="vcue">[Show school enrolment double bar graph: Boys and Girls 2019–2023]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>From the enrolment data (Boys: 230, 200, 240, 270, 250; Girls: 190, 180, 210, 240, 240): three simultaneous analyses are possible. First, absolute comparison within each year — boys consistently outnumber girls, with the gap ranging from 10 (2023) to 40 (2019). Second, trend analysis per group — both groups dipped in 2020 (possibly external factor, e.g., pandemic), then recovered and grew through 2022. Third, gap analysis across time — the gender gap is narrowing. In 2019, boys led by 40 students; by 2023, the gap was only 10. If this trend continues, enrolment may equalise.</p>

        <table class="data-table">
          <thead><tr><th>Year</th><th>Boys</th><th>Girls</th><th>Gap (B−G)</th><th>Trend</th></tr></thead>
          <tbody>
            <tr><td>2019</td><td class="num">230</td><td class="num">190</td><td class="num">40</td><td>Baseline</td></tr>
            <tr><td>2020</td><td class="num">200</td><td class="num">180</td><td class="num">20</td><td>Both fell; gap narrowed</td></tr>
            <tr><td>2021</td><td class="num">240</td><td class="num">210</td><td class="num">30</td><td>Recovery; gap widened slightly</td></tr>
            <tr><td>2022</td><td class="num">270</td><td class="num">240</td><td class="num">30</td><td>Peak for both</td></tr>
            <tr><td>2023</td><td class="num">250</td><td class="num">240</td><td class="num">10</td><td>Converging</td></tr>
          </tbody>
        </table>

        <div class="stage-marker evaluate"></div>
        <div class="callout challenge">
          <span class="callout-label">Multi-Step Challenge</span>
          A double bar graph compares two students' test scores across 6 subjects. Student A: 80, 72, 65, 88, 55, 90. Student B: 70, 85, 78, 75, 82, 68. (a) In how many subjects does each student lead? (b) Calculate each student's total and average. (c) Who is the more "consistent" performer? (Define consistency numerically — hint: think about how far each score is from their own average.) (d) If you could only enter ONE student in an all-round academic competition, which would you choose and why?
        </div>
      </div>
      <div class="practice-box">
        <h3>Application — Topic 4</h3>
        <div class="practice-q">Monthly rainfall (mm) in two cities over 6 months — City X: Jan 20, Feb 15, Mar 40, Apr 80, May 120, Jun 200. City Y: Jan 5, Feb 10, Mar 25, Apr 60, May 100, Jun 180. (a) Describe what the double bar graph would look like. (b) Calculate the difference between the cities each month. Is the gap growing, shrinking, or constant? (c) In which month did City X receive 2.5 times more rain than City Y? (d) What does this data suggest about these two cities' climates?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Both sets of bars rise sharply through the months, with City X bars consistently taller. The bars accelerate steeply from April onward, with June being by far the tallest pair. (b) Monthly gaps (X−Y): Jan: 15, Feb: 5, Mar: 15, Apr: 20, May: 20, Jun: 20. After February's unusual narrowing, the gap stabilises at 20mm from April to June — it neither grows nor shrinks in the monsoon months, suggesting a constant difference in rainfall intensity. (c) City X = 2.5 × City Y: Check each month — Jan: 20/5=4, Feb: 15/10=1.5, Mar: 40/25=1.6, Apr: 80/60=1.33, May: 120/100=1.2, Jun: 200/180=1.11. None is exactly 2.5. The closest is January (ratio 4:1). So no month has exactly 2.5 times more — this is an important lesson: not all questions have tidy answers in real data. (d) Both cities show a strong monsoon pattern (dramatic increase June), suggesting a tropical/semi-tropical climate. City X consistently receives more rainfall — it may be coastal or at a lower elevation facing monsoon winds directly.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T5+T6 combined for C -->

<hr class="section-divider">`,
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

export const module_1: Module = filterModuleByPath(moduleData, 'C');
