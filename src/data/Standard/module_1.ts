import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_1';
import { videoLinks } from '../videoLinks';

const SUPPORTED_GAME_FORMATS: GameFormat[] = [
  GameFormat.RAINDROP,
  GameFormat.DRAG_SORT,
  GameFormat.SPIN_WHEEL,
  GameFormat.BAR_BUILDER,
  GameFormat.HOTSPOT,
  GameFormat.PIE_SLICER,
];

function buildUniversalStyles(options: string[], correctAnswer: string, visual?: any): Record<string, any> {
  return SUPPORTED_GAME_FORMATS.reduce((acc, gameFormat) => {
    acc[gameFormat] = {
      ...(visual ? { visual } : {}),
      options: [...options],
      correctAnswer,
    };
    return acc;
  }, {} as Record<string, any>);
}

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

export const moduleData: Module = {
  id: '2.1',
  title: 'Data Organisation & Types of Graphs',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'Why Do We Need to Organise Data?',
      textContent: `<div class="duration-badge" style="background:var(--b-light);color:var(--b-hue);">⏱ Estimated reading time: 10–14 minutes &nbsp;·&nbsp; Path B — Standard</div>

<div class="section-block" id="s1b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 1 of 6</p>
      <h2 class="section-title">Why Do We Need to Organise Data?</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You've collected data before — maybe in a survey, or counting something for a project. But here's the thing: collecting data is only half the job. Raw, unorganised data is like a room full of puzzle pieces — all the information is there, but it's completely unusable until you put it in order. <span class="vcue">[Show a messy list of 20 sports responses]</span> Can you immediately tell which sport is most popular from this list? No. So let's understand why organisation transforms data from useless to powerful.</p>

        <div class="stage-marker explore"></div>
        <p>Here are the favourite sports of 20 students: Cricket, Football, Cricket, Badminton, Cricket, Kho-Kho, Football, Cricket, Badminton, Football, Cricket, Cricket, Badminton, Kho-Kho, Football, Cricket, Badminton, Cricket, Football, Cricket. <span class="vcue">[Show list]</span> Count how many times Cricket appears — go ahead. Now imagine doing this for 200 students. The problem is obvious. Raw data hides its answers. Organised data reveals them.</p>

        <div class="stage-marker explain"></div>
        <p>Organising data means arranging it so that patterns become visible, comparisons become possible, and questions get answered at a glance. The tools we use for this are frequency tables, pictographs, and bar graphs — each suited to different types of data and different questions. The process always starts the same way: identify your categories, count your values, and build a structure around those counts. <span class="vcue">[Show the sports data sorted into a four-row table with counts]</span> Cricket: 9, Football: 5, Badminton: 4, Kho-Kho: 2. The most popular sport is now instantly readable.</p>

        <div class="stage-marker elaborate"></div>
        <p>The key insight here is that the data itself didn't change — only its arrangement did. All 20 responses are still present. But now you can answer: most popular sport (Cricket, 9 votes), least popular (Kho-Kho, 2), how many more chose Cricket over Football (9 − 5 = 4). Organised data doesn't just store information — it enables reasoning.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          A canteen records 30 lunch orders: Daal-Chawal (12 times), Rajma-Chawal (8 times), Chole-Chawal (6 times), Pulao (4 times). Is this data already organised? What two questions can you immediately answer from it?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 1</h3>
        <div class="practice-q">The following are daily temperatures (°C) recorded for 10 days: 32, 35, 33, 36, 35, 34, 32, 36, 35, 33. Organise this data and find which temperature occurred most frequently. What does this tell you about the weather that week?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Organised: 32°C — 2 times, 33°C — 2 times, 34°C — 1 time, 35°C — 3 times, 36°C — 2 times. Most frequent temperature: 35°C. This suggests the weather was consistently warm (35°C was the most typical day), with no extreme fluctuations. The range was only 4°C (32 to 36), suggesting stable weather conditions that week.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T2 -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_1']['topic_1'],
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
      questions: buildAdaptiveQuestions(1, 1)
    },
    {
      id: 'c2_1_2',
      title: 'Tally Marks & Frequency Tables',
      textContent: `<div class="section-block" id="s2b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 2 of 6</p>
      <h2 class="section-title">Tally Marks &amp; Frequency Tables</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>The fastest way to organise raw data while counting it is tally marks. You already know the idea — group counts in fives so totals are readable at a glance. The frequency table is the structured result: a table with categories, their tally marks, and their frequency counts. Let's see this in action on a real dataset. <span class="vcue">[Show favourite subject survey data]</span></p>

        <div class="stage-marker explore"></div>
        <p>A class of 20 students named their favourite subject. Responses: Art, Maths, Science, Maths, English, Art, Maths, Science, Art, English, Maths, Science, Maths, Art, English, Science, Maths, Art, Maths, English. Sort these using tally marks as we go through them together.</p>

        <div class="stage-marker explain"></div>
        <p>One tally mark per item as we encounter it. Every fifth mark is the crossing diagonal. When finished, count each row's marks to get the frequency. The total of all frequencies must equal the total number of data points — this is your verification. <span class="vcue">[Show completed table]</span></p>

        <table class="data-table">
          <thead><tr><th>Subject</th><th>Tally Marks</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>Art</td><td class="tally">|||| |</td><td class="num">5</td></tr>
            <tr><td>Maths</td><td class="tally">|||| ||</td><td class="num">7</td></tr>
            <tr><td>Science</td><td class="tally">||||</td><td class="num">4</td></tr>
            <tr><td>English</td><td class="tally">||||</td><td class="num">4</td></tr>
            <tr><td><strong>Total</strong></td><td></td><td class="num"><strong>20 ✓</strong></td></tr>
          </tbody>
        </table>

        <div class="stage-marker elaborate"></div>
        <p>From this table: Maths is most popular (7), Science and English are equally liked (4 each), Art is in the middle (5). A teacher seeing this data might decide to make Science and English lessons more engaging, since those subjects have the fewest enthusiasts. This is data informing a real decision — which is the whole point.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Quick Check</span>
          Make a frequency table for: Red, Blue, Green, Red, Yellow, Blue, Red, Green, Blue, Red, Yellow, Blue, Green, Red, Blue (15 items). Which colour has frequency 5? Does your total verify correctly?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 2</h3>
        <div class="practice-q">A survey asked 24 people their preferred mode of transport: Car, Bus, Train, Two-wheeler, Car, Bus, Car, Train, Two-wheeler, Car, Bus, Car, Two-wheeler, Train, Car, Bus, Car, Train, Two-wheeler, Car, Bus, Car, Two-wheeler, Train. Build the frequency table. Which mode is most preferred? What percentage of people prefer Bus? (Round to 1 decimal place.)</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Car: 9, Bus: 6, Train: 5, Two-wheeler: 4. Total = 24 ✓. Most preferred: Car (9 times). Bus percentage: (6/24) × 100 = 25.0%. Car is preferred by 37.5% of respondents — a clear majority, suggesting most people find personal vehicles more convenient.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T3 -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_1']['topic_2'],
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
      questions: buildAdaptiveQuestions(1, 2)
    },
    {
      id: 'c2_1_3',
      title: 'Pictographs',
      textContent: `<div class="section-block" id="s3b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 3 of 6</p>
      <h2 class="section-title">Pictographs</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>A pictograph turns frequency data into a visual of symbols — each symbol representing a fixed count called the scale. The key (or legend) defines this scale. The power of a pictograph is immediate visual comparison; its limitation is that large numbers require many symbols, making it unwieldy. Knowing when to use it — and when a bar graph is better — is a key skill. <span class="vcue">[Show a city-wise car sales pictograph]</span></p>

        <div class="stage-marker explore"></div>
        <p>Car sales data: Mumbai 500, Delhi 300, Chennai 400, Kolkata 200. If each car symbol = 100 cars, draw the pictograph. Now try: what if a city sold 350 cars? How many symbols would you draw? <span class="pcue">(Think: 3.5 symbols — 3 full and 1 half)</span></p>

        <div class="stage-marker explain"></div>
        <p>The scale you choose matters enormously. Too small a scale (e.g., 1 symbol = 10 for data in hundreds) creates rows with too many symbols — messy and hard to count. Too large a scale loses precision — fractional symbols become unavoidable. A good rule: aim for no more than 10 symbols in the longest row. Divide your maximum value by 10 to find a reasonable scale, then round up to a clean number.</p>

        <div class="pictograph">
          <div class="bar-chart-title">Cars Sold by City — Pictograph (🚗 = 100 cars)</div>
          <div class="picto-row"><span class="picto-label">Mumbai</span><span class="picto-symbol">🚗🚗🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Delhi</span><span class="picto-symbol">🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Chennai</span><span class="picto-symbol">🚗🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Kolkata</span><span class="picto-symbol">🚗🚗</span></div>
          <div class="picto-key">🚗 = 100 cars</div>
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Application</span>
          A pictograph shows book sales. Key: 📚 = 50 books. Shelf A has 4.5 symbols, Shelf B has 3 symbols, Shelf C has 6 symbols. How many books were sold from each shelf? What is the total? If the store wants to restock the most sold shelf first, which one is it?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 3</h3>
        <div class="practice-q">Design a pictograph for the data: Students choosing extracurricular activities — Sports: 80, Music: 60, Drama: 45, Art: 35. Choose an appropriate scale. Explain your choice. Which activity would require a half symbol at your chosen scale?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Suitable scale: 1 symbol = 10 students. Symbols per activity: Sports: 8, Music: 6, Drama: 4.5, Art: 3.5. Drama (45) and Art (35) both require half symbols. At scale = 20: Sports: 4, Music: 3, Drama: 2.5, Art: 1.5 — both Drama and Art need half symbols again. At scale = 10, the rows are manageable (max 8 symbols) so this is a good choice. Drama requires a half symbol at scale 10.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T4 -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_1']['topic_3'],
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
      questions: buildAdaptiveQuestions(1, 3)
    },
    {
      id: 'c2_1_4',
      title: 'Bar Graphs & Double Bar Graphs',
      textContent: `<div class="section-block" id="s4b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 4 of 6</p>
      <h2 class="section-title">Bar Graphs &amp; Double Bar Graphs</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Bar graphs solve the limitations of pictographs — they handle any size of number cleanly, and the height of the bar encodes the value precisely using a numerical scale. They're the most versatile and widely used graph type. Adding a second set of bars (a double bar graph) enables direct comparison between two groups across the same categories. <span class="vcue">[Show school enrolment bar graph]</span></p>

        <div class="stage-marker explore"></div>
        <p>School enrolment data: 2019: 420, 2020: 380, 2021: 450, 2022: 510, 2023: 490. From the raw numbers, identify: in which year did enrolment drop? By how much did it increase from 2020 to 2022? Now see if a bar graph makes these answers faster to find. <span class="vcue">[Show bar graph]</span></p>

        <div class="bar-chart">
          <div class="bar-chart-title">School Enrolment 2019–2023</div>
          <div class="bar-row"><span class="bar-label">2019</span><div class="bar-track"><div class="bar-fill" style="width:76%">420</div></div></div>
          <div class="bar-row"><span class="bar-label">2020</span><div class="bar-track"><div class="bar-fill" style="width:69%">380</div></div></div>
          <div class="bar-row"><span class="bar-label">2021</span><div class="bar-track"><div class="bar-fill" style="width:82%">450</div></div></div>
          <div class="bar-row"><span class="bar-label">2022</span><div class="bar-track"><div class="bar-fill" style="width:93%">510</div></div></div>
          <div class="bar-row"><span class="bar-label">2023</span><div class="bar-track"><div class="bar-fill" style="width:89%">490</div></div></div>
        </div>

        <div class="stage-marker explain"></div>
        <p>In a double bar graph, each category gets two bars — one per group — drawn side by side in different colours. A legend maps colours to groups. This enables two types of comparison simultaneously: comparing the two groups within the same category (looking at one pair of bars), and tracking each group's trend across categories (looking at bars of one colour across the graph). <span class="vcue">[Show double bar graph with boys/girls enrolment per year]</span></p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Analysis Question</span>
          In a double bar graph showing Maths vs Science scores for 5 students, you notice that the Maths bars are consistently taller in the lower-scoring students, but the Science bars are taller for the higher-scoring students. What might this pattern suggest about these students?
        </div>
      </div>
      <div class="practice-box">
        <h3>Guided Practice — Topic 4</h3>
        <div class="practice-q">A student's scores across 5 subjects in two consecutive exams: Exam 1 — Maths: 72, Science: 68, English: 80, Hindi: 65, Social: 74. Exam 2 — Maths: 78, Science: 74, English: 76, Hindi: 70, Social: 82. Describe what a double bar graph of this data would look like. In which subjects did the student improve? In which did they decline?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Improvement (Exam 2 score higher): Maths (+6), Science (+6), Hindi (+5), Social Studies (+8). Decline: English (−4). The double bar graph would show almost all Exam 2 bars (second bar in each pair) slightly taller than Exam 1 bars, except for English where the second bar is shorter. The greatest improvement visible would be Social Studies — its pair of bars would show the largest height difference. This student seems to have improved overall but needs attention on English.</div>
      </div>
    </div>

    <hr class="section-divider">

    <!-- T5 -->

<hr class="section-divider">`,
      videoUrl: videoLinks['module_1']['topic_4'],
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
      questions: buildAdaptiveQuestions(1, 4)
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
      videoUrl: videoLinks['module_1']['topic_5'],
      workedExamples: [],
      guidedPracticeTitle: 'Guided Practice — Topic 5',
      guidedPracticeItems: [
        {
          question: 'Runs in 6 matches: 120, 185, 95, 210, 175, 160. Find highest, lowest, and trend type.',
          answer: 'Highest = 210, lowest = 95, and the trend is mixed/fluctuating.'
        }
      ],
      questions: buildAdaptiveQuestions(1, 5)
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
      videoUrl: videoLinks['module_1']['topic_6'],
      workedExamples: [],
      guidedPracticeTitle: 'Final Reflection — Module 2.1',
      guidedPracticeItems: [
        {
          question: 'A friend says, "I don\'t need graphs — I can just read numbers from a table." Respond using two examples from this module.',
          answer: 'Tables give exact values, while graphs reveal patterns instantly. Example: enrolment dip is easier to spot in bars than raw numbers; score trends and dips become obvious visually over time.'
        }
      ],
      questions: buildAdaptiveQuestions(1, 6)
    }
  ]
};

export const module_1: Module = filterModuleByPath(moduleData, 'B');
