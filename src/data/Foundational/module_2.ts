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
  id: '2.2',
  title: 'Grouping Data & Histograms',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'Class Intervals — Grouping Large Data',
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Curated from module2_2_grouping_data_histograms_new.html · Path A — Foundational</div>

<div class="section-block" id="s1">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 1 of 5</p>
      <h2 class="section-title">Class Intervals — Grouping Large Data</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Alright everyone, let's start with a situation that might sound familiar. Imagine your Maths teacher collected the marks of 30 students in a surprise test — the marks are out of 50. Here is that list: <span class="vcue">[Show list on screen]</span> 23, 41, 17, 38, 29, 44, 12, 35, 27, 48, 19, 31, 22, 46, 14, 33, 26, 40, 18, 37, 25, 43, 11, 36, 28, 45, 16, 32, 24, 39.</p>

        <p>Now, just by looking at this list — can you tell how many students scored between 20 and 30? Or how many scored above 40? Go ahead, try. <span class="pcue">(Pause and attempt)</span> It's not easy, is it? You'd have to scan every single number, count carefully, and still risk making a mistake. And this is just 30 students. What if it were a school of 500 students? This is exactly the problem that class intervals solve.</p>

        <div class="stage-marker explore"></div>
        <p>Let's think about this together. What if, instead of looking at each mark individually, we created groups? <span class="vcue">[Keep the list visible on screen]</span> One group for marks between 10 and 20, another for 20 to 30, and so on? Try grouping the numbers above mentally. Just roughly — which group seems to have the most students? <span class="pcue">(Think for a moment)</span></p>

        <p>Most of you will notice that the middle groups — around 20 to 40 — seem to have quite a few numbers. And the very high and very low ends have fewer. That observation, right there, is the kind of insight that grouped data gives us. We haven't even made a proper table yet — and already a pattern is appearing.</p>

        <div class="stage-marker explain"></div>
        <p>When we have a large set of data, we divide the entire range into smaller, equal-sized groups. Each of these groups is called a class interval. <span class="vcue">[Show clean definition panel on screen]</span></p>

        <div class="callout definition">
          <span class="callout-label">Definition — Class Interval</span>
          A class interval is a range of values used to group a large set of data. Instead of recording each value separately, we collect all values that fall within the same range into one group. For example, all marks from 10 to 20 form one class interval.
        </div>

        <p>Let's understand this with our marks example. The lowest mark is 11. The highest is 48. So our data spreads from 11 to 48. We can divide this into groups of 10: 10–20, 20–30, 30–40, 40–50. Each of these is a class interval. The width of each interval — which is 10 here — is called the class size or class width.</p>

        <p>Now, a very important question: where does 20 go? Does it go in the 10–20 group or the 20–30 group? <span class="pcue">(Think about it)</span> We follow a rule: the lower limit is included, the upper limit is excluded. So 20 goes into the 20–30 group, not the 10–20 group. <span class="vcue">[Show boundary rule on screen with a number line]</span></p>

        <div class="callout tip">
          <span class="callout-label">The Boundary Rule</span>
          For any class interval, the lower boundary is always included, and the upper boundary is always excluded. So the interval 10–20 means: "marks that are 10 or more, but less than 20." The mark 20 belongs to the next interval, 20–30. In mathematical notation, this is written as [10, 20). This rule ensures that every number has exactly one group it belongs to — no number falls in two groups, and no number is left out.
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Let's now go back to our 30 marks and actually build the frequency table using class intervals. <span class="vcue">[Show the full worked example on screen]</span> The marks were: 23, 41, 17, 38, 29, 44, 12, 35, 27, 48, 19, 31, 22, 46, 14, 33, 26, 40, 18, 37, 25, 43, 11, 36, 28, 45, 16, 32, 24, 39. We'll use these class intervals: 10–20, 20–30, 30–40, 40–50.</p>

        <p>We go through each number and use tally marks to count. Let's pick out numbers that belong to each interval carefully, using the boundary rule: <span class="vcue">[Show tally marks being filled in row by row]</span></p>

        <p>10–20: Numbers that are 10 or above but less than 20 — 17, 12, 19, 14, 18, 11, 16. That's 7 numbers. 20–30: Numbers from 20 up to (but not including) 30 — 23, 29, 27, 22, 26, 25, 28, 24. That's 8 numbers. 30–40: Numbers from 30 to less than 40 — 38, 35, 31, 33, 37, 36, 32, 39. That's 8 numbers. 40–50: Numbers from 40 to less than 50 — 41, 44, 48, 46, 40, 43, 45. That's 7 numbers.</p>

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

        <p>Notice how the total comes to 30 — matching our original number of students. That's a good check to make sure you haven't missed any number or counted one twice. Now you can immediately see things that were invisible before: the data is fairly evenly spread, with the middle two groups being slightly higher. This is the power of grouping.</p>

        <div class="callout tip">
          <span class="callout-label">Verification — Always Check Your Total</span>
          After building a grouped frequency table, always add up all the frequencies. The total must equal the total number of data values you started with. If they don't match — you've either missed a value or counted one twice. Go back and recheck each interval carefully.
        </div>

        <div class="stage-marker evaluate"></div>
        <p>Here are the heights (in cm) of 20 students in Class 8B: <span class="vcue">[Show new dataset on screen]</span> 142, 155, 138, 161, 149, 153, 136, 158, 145, 162, 140, 157, 148, 165, 143, 152, 139, 160, 147, 154. Using class intervals of size 10 — starting from 130 — build a frequency table for this data. Think about which numbers go into which group, apply the boundary rule carefully, and check that your frequencies add up to 20. <span class="pcue">(Pause — allow student thinking time)</span></p>

        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          Heights (in cm) of 20 students: 142, 155, 138, 161, 149, 153, 136, 158, 145, 162, 140, 157, 148, 165, 143, 152, 139, 160, 147, 154. Build a grouped frequency table with intervals 130–140, 140–150, 150–160, 160–170. Which interval has the most students?
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 1</h3>
        <div class="practice-q">Q1. Using the heights dataset above (20 students), complete the grouped frequency table with intervals 130–140, 140–150, 150–160, 160–170. Apply the boundary rule carefully — remember, 140 belongs to the 140–150 group, not the 130–140 group. Verify that your frequencies add up to 20.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">130–140: 138, 136, 139. Frequency: 3. 140–150: 142, 149, 145, 140, 148, 143, 147. Frequency: 7. 150–160: 155, 153, 158, 157, 152, 154. Frequency: 6. 160–170: 161, 162, 165, 160. Frequency: 4. Total: 3 + 7 + 6 + 4 = 20. ✓ The 140–150 range has the most students — this is the most common height band in the class.</div>
        <div class="practice-q">Q2. A student says: "The mark 30 belongs to the 20–30 class interval because 30 is the upper limit and the upper limit is included." Is this correct? Explain why or why not.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">This is incorrect. The boundary rule states that the upper limit is excluded, not included. So 30 does NOT belong to the 20–30 interval. It belongs to the 30–40 interval because 30 is the lower limit of that interval, and lower limits are always included. The interval 20–30 includes all values from 20 up to (but not including) 30.</div>
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
      title: 'What Is a Histogram?',
      textContent: `<div class="section-block" id="s2">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 2 of 5</p>
      <h2 class="section-title">What Is a Histogram?</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You've seen bar graphs before — they're great for showing data like favourite sports, number of students in different classes, or books read by students in a month. But here's something to think about: what if the data isn't categories like "football" or "cricket" — but numbers in ranges, like "marks between 20 and 30"? <span class="vcue">[Show a bar graph and a histogram side-by-side on screen]</span></p>

        <p>Can a normal bar graph handle that? Well, sort of — but it doesn't quite capture something important: the fact that 20 and 30 are connected on a number line. There's no gap between the 20–30 group and the 30–40 group. They sit right next to each other. A histogram is the graph that is specifically designed for exactly this kind of data. And that's what we're learning today.</p>

        <div class="stage-marker explore"></div>
        <p>Look at our frequency table again from Topic 1: <span class="vcue">[Keep the marks frequency table visible]</span> 10–20: 7 students, 20–30: 8 students, 30–40: 8 students, 40–50: 7 students. If you were going to draw this as a graph, what would you put on the horizontal axis? The class intervals — 10–20, 20–30, 30–40, 40–50. And the vertical axis? The frequencies — 7, 8, 8, 7.</p>

        <p>Now here's the interesting part. Think about whether there should be a gap between the bar for 10–20 and the bar for 20–30. <span class="pcue">(Think about it)</span> There shouldn't be, right? Because 20 is where one interval ends and the next begins. They share that boundary. The data is continuous — it flows from one group to the next without a break. That is the key insight behind a histogram.</p>

        <div class="stage-marker explain"></div>
        <p>A histogram is a type of bar graph used to represent grouped continuous data. <span class="vcue">[Show a clean, labelled histogram on screen]</span> Here is what makes it different from an ordinary bar graph:</p>

        <div class="callout definition">
          <span class="callout-label">Definition — Histogram</span>
          A histogram is a graph for displaying grouped continuous data. Unlike a bar graph: (1) the bars touch each other — no gaps — because the data is continuous. (2) The horizontal axis is a proper number line showing class intervals, not separate categories. (3) The vertical axis shows frequency. (4) The height of each bar equals the frequency of that interval (when all intervals have equal width).
        </div>

        <p>Let's also note what a histogram is NOT: it is not a bar graph with bars pushed together. The touching of bars carries meaning — it tells us the data is measured on a continuous scale, not in separate categories. In a bar graph showing "favourite sports," gaps between bars signal that cricket and football are separate, unconnected categories. In a histogram, no gaps signal that 10–20 and 20–30 are adjacent, connected intervals on the same number line.</p>

        <div class="stage-marker elaborate"></div>
        <p>Let's draw the histogram for our marks data step by step. <span class="vcue">[Show step-by-step histogram construction on screen]</span></p>

        <p><strong>Step 1:</strong> Draw the axes. The horizontal axis (x-axis) shows marks from 10 to 50, with markings at 10, 20, 30, 40, 50. The vertical axis (y-axis) shows frequency from 0 to at least 8 — mark it at 0, 2, 4, 6, 8, 10.</p>

        <p><strong>Step 2:</strong> Draw the bars. For 10–20, frequency is 7 — draw a bar from 10 to 20 on the x-axis, height 7. For 20–30, frequency is 8 — bar from 20 to 30, height 8. For 30–40, frequency is 8 — bar from 30 to 40, height 8. For 40–50, frequency is 7 — bar from 40 to 50, height 7.</p>

        <p><strong>Step 3:</strong> Check that bars are touching. There must be no gap between the bar ending at 20 and the bar beginning at 20. They share that edge.</p>

        <p><strong>Step 4:</strong> Label the graph. Title: "Distribution of Marks in Surprise Test". X-axis: "Marks (out of 50)". Y-axis: "Number of Students".</p>

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
          <div class="histogram-axes">
            <span>← Marks (out of 50)</span>
            <span>Number of Students ↑</span>
          </div>
          <div class="histogram-note">Note: bars touch each other — no gaps — because the data is continuous. Total students: 30.</div>
        </div>

        <p>Now look at this histogram. What do you see at a glance? The two middle bars are slightly taller — 8 students each — while the end groups have 7. The distribution is nearly even, with a slight concentration in the middle. You can read this in about two seconds just by looking at the graph. That is exactly why histograms are so useful.</p>

        <p>Now let's look at another example. Suppose we recorded the time (in minutes) taken by 25 students to complete a worksheet: <span class="vcue">[Show frequency table on screen]</span></p>

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

        <div class="histogram">
          <div class="histogram-title">Time Taken by Students to Complete Worksheet</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:33%">3</div>
              <div class="hist-label">0–10</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:78%">7</div>
              <div class="hist-label">10–20</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">9</div>
              <div class="hist-label">20–30</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:56%">5</div>
              <div class="hist-label">30–40</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:11%">1</div>
              <div class="hist-label">40–50</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Time (minutes)</span>
            <span>Number of Students ↑</span>
          </div>
          <div class="histogram-note">The histogram rises from left, peaks at 20–30, then falls. Most students finished in 20–30 minutes.</div>
        </div>

        <p>Look at the shape of this histogram. It rises from the left, peaks in the 20–30 minute group, and then falls towards the right. This kind of shape tells us that most students finished the worksheet in 20 to 30 minutes. Very few took less than 10 minutes — and only 1 student took more than 40 minutes. This is called the distribution of the data — and the histogram makes it visible instantly.</p>

        <div class="stage-marker evaluate"></div>
        <p>Here is your practice task. <span class="vcue">[Show question on screen]</span> The following frequency table shows the number of hours per week that 40 students spent on outdoor activities:</p>

        <table class="data-table">
          <thead><tr><th>Hours per Week</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>0 – 5</td><td class="num">4</td></tr>
            <tr><td>5 – 10</td><td class="num">11</td></tr>
            <tr><td>10 – 15</td><td class="num">14</td></tr>
            <tr><td>15 – 20</td><td class="num">8</td></tr>
            <tr><td>20 – 25</td><td class="num">3</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>40</strong></td></tr>
          </tbody>
        </table>

        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          Using the outdoor activity data above: (a) Draw the histogram — make sure your bars touch, axes are labelled, and the graph has a title. (b) In which time range did the most students fall? (c) What does the shape of the histogram tell you about outdoor activity habits in this class? (d) Would you use a bar graph or a histogram for this data — and why?
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 2</h3>
        <div class="practice-q">Q1. Looking at the outdoor activity histogram (data above): The tallest bar is for which interval? What does this tell you about students' outdoor habits? What does the shape of the full histogram suggest about whether activity is evenly distributed or concentrated?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">The tallest bar is for 10–15 hours per week, with 14 students. This tells us the most common amount of outdoor activity is 10–15 hours a week — roughly 1.5 to 2 hours per day. The shape shows a peak in the middle (10–15) with fewer students at either extreme — very few students spend almost no time outdoors (0–5 hours: 4 students) or a great deal of time (20–25 hours: 3 students). Most students cluster in the middle range, suggesting a moderate and fairly consistent pattern of outdoor activity.</div>
        <div class="practice-q">Q2. A student is drawing a histogram for the marks data (10–20: 7, 20–30: 8, 30–40: 8, 40–50: 7) and accidentally leaves a gap between each bar, like a normal bar graph. What mistake have they made, and what does that gap incorrectly imply about the data?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">The student has confused a histogram with a bar graph. In a histogram, bars must always touch — there must be no gap between them. The gap would incorrectly imply that the intervals are separate, disconnected categories (like "cricket" vs "football"), when in fact these are continuous intervals on a number line. The value 20 is the shared boundary between the 10–20 and 20–30 intervals — there is no "gap" between these two groups in the data, so there must be no gap in the histogram.</div>
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
      title: 'Choosing the Right Bin Size',
      textContent: `<div class="section-block" id="s3">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 3 of 5</p>
      <h2 class="section-title">Choosing the Right Bin Size</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Here's a question that probably crossed your mind at some point: when we grouped the 30 marks into intervals of 10, why 10? Why not 5? Or 20? After all, the choice seems a bit arbitrary. But here's the thing — it's not arbitrary at all. The bin size you choose changes how the histogram looks and how much useful information it shows. Let's see this for ourselves. <span class="vcue">[Show the same 30 marks dataset with three different groupings side by side]</span></p>

        <div class="stage-marker explore"></div>
        <p>Let's take our familiar 30 marks — 23, 41, 17, 38, 29, 44, 12, 35, 27, 48, 19, 31, 22, 46, 14, 33, 26, 40, 18, 37, 25, 43, 11, 36, 28, 45, 16, 32, 24, 39 — and try grouping them three different ways. <span class="pcue">(Take a moment to imagine what each table would look like)</span></p>

        <p><strong>Option 1 — Bin size of 20:</strong> We'd get just 2 intervals: 10–30 and 30–50. That's very few groups. Would this tell us much about how marks are distributed within each range? Not really — everything gets lumped together.</p>

        <p><strong>Option 2 — Bin size of 10:</strong> We get 4 intervals: 10–20, 20–30, 30–40, 40–50. This gives us a decent overview of the data — not too many groups, not too few.</p>

        <p><strong>Option 3 — Bin size of 5:</strong> We'd get 8 intervals: 10–15, 15–20, 20–25, 25–30, 30–35, 35–40, 40–45, 45–50. More detail — but with only 30 students, some intervals might have just 3 or 4 students. That's very fine-grained.</p>

        <div class="stage-marker explain"></div>
        <p>Here is the key insight: a bin size that is too large hides patterns. A bin size that is too small creates so many tiny groups that patterns become hard to read — the histogram looks jagged and noisy. <span class="vcue">[Show visual comparison: too-large bins vs too-small bins vs just-right bins]</span></p>

        <div class="callout definition">
          <span class="callout-label">What Is Bin Size?</span>
          The bin size (also called class size or class width) is the width of each interval in a grouped frequency table. All bins must have the same size. A good bin size results in a histogram with enough intervals to show the shape of the data, but not so many that the pattern disappears. As a rule of thumb: aim for between 5 and 10 intervals for most datasets in Class 8.
        </div>

        <p>There is a simple formula you can use to get started: Approximate bin size = Range ÷ Number of intervals you want. For our marks data: Range = 48 − 11 = 37. If we want about 4 intervals, bin size ≈ 37 ÷ 4 ≈ 9. We round this up to a convenient number — 10. That's exactly what we did.</p>

        <div class="stage-marker elaborate"></div>
        <p><strong>Example 1 — Marks Data (30 students):</strong> Let's compare bin size 10 vs bin size 5 for our marks. <span class="vcue">[Show both frequency tables side by side on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>With Bin Size 10</th><th>Frequency</th><th>With Bin Size 5</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>10 – 20</td><td class="num">7</td><td>10 – 15</td><td class="num">4</td></tr>
            <tr><td>20 – 30</td><td class="num">8</td><td>15 – 20</td><td class="num">3</td></tr>
            <tr><td>30 – 40</td><td class="num">8</td><td>20 – 25</td><td class="num">4</td></tr>
            <tr><td>40 – 50</td><td class="num">7</td><td>25 – 30</td><td class="num">4</td></tr>
            <tr><td></td><td></td><td>30 – 35</td><td class="num">4</td></tr>
            <tr><td></td><td></td><td>35 – 40</td><td class="num">4</td></tr>
            <tr><td></td><td></td><td>40 – 45</td><td class="num">4</td></tr>
            <tr><td></td><td></td><td>45 – 50</td><td class="num">3</td></tr>
          </tbody>
        </table>

        <p>With bin size 10, the pattern is clear — four groups with similar frequencies, showing an even spread. With bin size 5, we have eight groups, each with 3 or 4 students. The pattern is harder to read. For 30 data points, bin size 10 gives us more useful information. <span class="pcue">(Think: which table would you rather interpret at a glance?)</span></p>

        <p><strong>Example 2 — Temperatures (15 readings):</strong> Now imagine a different situation. A science class records the temperature (in °C) at their school for 15 days: 28, 31, 29, 33, 30, 27, 32, 34, 29, 31, 28, 30, 33, 32, 29. The range is 34 − 27 = 7. If we used bin size 10, we'd get just one interval (20–30... but wait, 31–34 wouldn't fit). That's not useful at all. Here, a bin size of 2 makes much more sense: 26–28, 28–30, 30–32, 32–34, 34–36 — giving us 5 intervals, which is perfect for 15 readings. <span class="vcue">[Show the temperature frequency table on screen]</span></p>

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

        <p>The data clusters around 28–32°C, with fewer very hot or relatively cool days. A bin size of 2 worked well here because the data had a small range — only 7 degrees. If we had used a bin size of 10, we'd lose all this detail. The lesson: bin size depends on the range and the size of the dataset. Always check: does my histogram have between 5 and 10 bars? If yes, your bin size is probably right.</p>

        <div class="callout tip">
          <span class="callout-label">Quick Decision Guide — Choosing Bin Size</span>
          Step 1: Find the range (maximum − minimum). Step 2: Decide how many intervals you want (aim for 5 to 10). Step 3: Divide range by that number and round to a convenient value. Step 4: Check — does your starting point make sense? Round down to the nearest convenient value below the minimum. Always verify that all values fit neatly and your total frequency matches the number of data points.
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          A class records the number of pages read per week by 20 students: 45, 72, 38, 90, 55, 68, 42, 80, 60, 75, 50, 88, 35, 65, 78, 48, 92, 58, 70, 82. (a) What is the range of this data? (b) If you wanted 6 intervals, what would the approximate bin size be? Round to a convenient number. (c) Write out the class intervals. (d) Build the frequency table. Does your total equal 20?
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 3</h3>
        <div class="practice-q">Q1. Why can't we always use a bin size of 1 (i.e., list every individual value separately)? What would go wrong if we had 100 students and used a bin size of 1?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">If we used a bin size of 1 for 100 students, we might end up with 50 or 60 different intervals — each with just 1 or 2 students. The table would be enormous and impossible to read at a glance. We would lose the ability to see any overall pattern. This defeats the entire purpose of grouping data, which is to make large datasets easier to understand. A bin size of 1 essentially gives you back the original raw data — just in a different format. The whole point of class intervals is to reduce complexity while keeping the meaningful patterns.</div>
        <div class="practice-q">Q2. The ages (in years) of 18 trees in a garden are: 3, 7, 12, 5, 9, 15, 8, 11, 4, 14, 6, 10, 2, 13, 7, 9, 11, 5. Choose an appropriate bin size and build a grouped frequency table. Verify your total.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Range = 15 − 2 = 13. Aiming for about 5 intervals: 13 ÷ 5 = 2.6, so we round up to 3. Starting at 0 (convenient value below minimum of 2): intervals are 0–3, 3–6, 6–9, 9–12, 12–15, 15–18. Frequencies: 0–3: 3, 2 = 2. Wait — 3 belongs to 3–6, not 0–3 (boundary rule: lower included, upper excluded). So 0–3: just 2 = 1. 3–6: 3, 5, 4, 6, 5 = 5 (note: 6 goes to 6–9). Let me redo: 0–3: 2 = 1. 3–6: 3, 5, 4, 5 = 4. 6–9: 7, 8, 6, 7 = 4. 9–12: 9, 11, 10, 9, 11 = 5. 12–15: 12, 14, 13 = 3. 15–18: 15 = 1. Total: 1+4+4+5+3+1 = 18 ✓. The modal class is 9–12 years.</div>
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
      title: 'Histograms vs Bar Graphs — What\'s the Difference?',
      textContent: `<div class="section-block" id="s4">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 4 of 5</p>
      <h2 class="section-title">Histograms vs Bar Graphs — What's the Difference?</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Here is something that confuses a lot of students — and even some adults: histograms and bar graphs look very similar. Both have bars. Both have a horizontal axis and a vertical axis. So what's the difference? And why does it even matter? <span class="vcue">[Show a bar graph and a histogram side by side on screen]</span></p>

        <p>Look carefully at the two graphs. Can you spot the most obvious visual difference? <span class="pcue">(Take a moment to look)</span> That's right — in one graph, the bars are touching. In the other, there are gaps between the bars. That single difference is not a styling choice. It carries a very important message about the data.</p>

        <div class="stage-marker explore"></div>
        <p>Let's think about two different sets of data. First: the number of students who play different sports — Cricket: 12, Football: 18, Badminton: 9, Basketball: 6. Second: the heights of 30 students grouped as 130–140: 4, 140–150: 11, 150–160: 10, 160–170: 5.</p>

        <p>Now here's the question: are "Cricket" and "Football" connected to each other the way "130–140" and "140–150" are connected? <span class="pcue">(Think about this carefully)</span> Cricket and Football are completely separate categories — there's no meaningful "in-between." But 130–140 and 140–150 share a boundary at 140. They are adjacent segments of the same number line. They are connected.</p>

        <div class="stage-marker explain"></div>
        <p>This is the core difference. <span class="vcue">[Show highlighted explanation on screen]</span></p>

        <div class="callout definition">
          <span class="callout-label">The Key Distinction</span>
          A bar graph is used for categorical data — data that falls into separate, named groups with no natural order or connection (sports, colours, subjects, types of pets). Gaps between bars show that the categories are separate. A histogram is used for continuous numerical data that has been grouped into class intervals. No gaps between bars show that the intervals are adjacent on a continuous number line. The type of data determines which graph you use — not your preference.
        </div>

        <p>Let's also look at the axes. In a bar graph, the horizontal axis shows category names — "Cricket," "Football," etc. These are labels, not numbers. You could put them in any order and the graph would still make sense. In a histogram, the horizontal axis is a number line. The order matters — you cannot rearrange the intervals. 130–140 must come before 140–150. <span class="vcue">[Show axis comparison on screen]</span></p>

        <div class="stage-marker elaborate"></div>
        <p>Let's put this together with a clear comparison table. <span class="vcue">[Display the comparison table on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Feature</th><th>Bar Graph</th><th>Histogram</th></tr></thead>
          <tbody>
            <tr><td>Type of data</td><td>Categorical (separate groups)</td><td>Continuous (grouped intervals)</td></tr>
            <tr><td>Gaps between bars</td><td>Yes — shows categories are separate</td><td>No — shows data is continuous</td></tr>
            <tr><td>Horizontal axis</td><td>Category names (e.g., Cricket, Football)</td><td>Number line with class intervals</td></tr>
            <tr><td>Vertical axis</td><td>Frequency or count</td><td>Frequency or count</td></tr>
            <tr><td>Can bars be reordered?</td><td>Yes (usually)</td><td>No — order is fixed by number line</td></tr>
            <tr><td>Example</td><td>Favourite colours of 30 students</td><td>Heights of 30 students grouped in intervals</td></tr>
          </tbody>
        </table>

        <p>Now, a very common misconception: students sometimes think they can choose whichever graph looks nicer. That's not correct. The data itself tells you which graph to use. If you're plotting "favourite ice cream flavours" — that's a bar graph. If you're plotting "the time taken by students to solve a puzzle, grouped in intervals of 5 minutes" — that's a histogram. There's no choice involved.</p>

        <div class="callout tip">
          <span class="callout-label">A Quick Test — Which Graph Do I Use?</span>
          Ask yourself: "Is my horizontal axis a list of category names, or a number line?" If it's category names → bar graph. If it's a number line with intervals → histogram. Second check: "Do my groups share boundaries, or are they completely separate?" Shared boundaries = histogram. Completely separate = bar graph.
        </div>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          For each of the following, decide whether you would draw a bar graph or a histogram. Explain your reason in one sentence. (a) Number of students absent each day of the week (Monday to Friday). (b) Time (in minutes) students spend reading each day, grouped in intervals of 10. (c) Favourite subject of students in Class 8. (d) Scores in a math test, grouped as 0–10, 10–20, 20–30, up to 100. (e) Number of books in each section of a library (Fiction, Non-fiction, Science, History).
        </div>
      </div>

      <div class="practice-box">
        <h3>Guided Practice — Topic 4</h3>
        <div class="practice-q">Q1. A student draws a histogram to show the number of goals scored by different football teams in a season: Team A: 45, Team B: 38, Team C: 52, Team D: 29, Team E: 61. What mistake has the student made, and which graph should they have used? Why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">The student has made the wrong choice of graph. A histogram is used for grouped continuous data — data that sits on a number line with adjacent intervals sharing boundaries. "Team A," "Team B," etc. are separate, named categories, not intervals on a number line. There is no shared boundary between Team A's goals and Team B's goals. The correct graph is a bar graph, with gaps between bars to show that the teams are separate categories. In the bar graph, the horizontal axis would show team names, and the vertical axis would show goals scored.</div>
        <div class="practice-q">Q2. A classmate argues: "In a histogram, the bars happen to touch because the intervals are next to each other — but it's basically the same as a bar graph with thinner gaps." Do you agree or disagree? Explain.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Disagree. The touching of bars in a histogram is not incidental — it carries meaning. It tells anyone reading the graph that the data is continuous and the intervals share boundaries. For example, the interval 20–30 ends at 30, and the interval 30–40 starts at 30. The number 30 is the boundary between them — there is no gap in the data at 30, so there must be no gap in the histogram. A "bar graph with thinner gaps" would incorrectly imply there is a gap in the data between 30 and 30, which makes no mathematical sense. The no-gap rule in histograms is not cosmetic; it encodes the continuity of the underlying number line.</div>
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
      title: 'Real Data Analysis Project — Putting It All Together',
      textContent: `<div class="section-block" id="s5">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Real Data Analysis Project — Putting It All Together</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>You've learned how to group data, draw histograms, choose bin sizes, and tell the difference between histograms and bar graphs. Now it's time to use all of that together — just like a real data analyst would. In this topic, we're going to work through a complete, real-style data project from beginning to end. <span class="vcue">[Show the project title and dataset on screen]</span></p>

        <p>Here's the scenario: A school counsellor wants to understand how much time Class 8 students spend on their phones every day. She surveyed 30 students and recorded their daily screen time (in minutes). Here is the data she collected: <span class="vcue">[Display the list on screen]</span> 85, 140, 55, 200, 110, 175, 65, 130, 95, 155, 45, 180, 120, 70, 165, 100, 210, 80, 145, 60, 190, 115, 75, 135, 50, 170, 105, 150, 90, 125.</p>

        <div class="stage-marker explore"></div>
        <p>Before we do anything else, let's look at this data and ask: what questions could we answer from it? <span class="pcue">(Think for a moment)</span> Here are some interesting ones: How many students use their phone for more than 2 hours (120 minutes) a day? Is high screen time concentrated in a few students, or spread across many? What does the "typical" screen time look like? These are the kinds of questions a histogram can help us answer.</p>

        <div class="stage-marker explain"></div>
        <p><strong>Step 1 — Find the range.</strong> The highest value is 210 minutes. The lowest is 45 minutes. Range = 210 − 45 = 165 minutes. <span class="vcue">[Show calculation on screen]</span></p>

        <p><strong>Step 2 — Choose a bin size.</strong> We have 30 data points and a range of 165. Aiming for about 6 intervals: 165 ÷ 6 = 27.5. We round to a convenient number — let's use 30 minutes. Starting from 30 (just below the minimum of 45): our intervals are 30–60, 60–90, 90–120, 120–150, 150–180, 180–210. That gives us exactly 6 intervals — perfect.</p>

        <p><strong>Step 3 — Build the frequency table.</strong> Now let's sort each value into its class interval using the boundary rule. <span class="vcue">[Show sorting process on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Screen Time (minutes)</th><th>Values in This Interval</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>30 – 60</td><td>55, 45, 50</td><td class="num">3</td></tr>
            <tr><td>60 – 90</td><td>85, 65, 70, 80, 75</td><td class="num">5</td></tr>
            <tr><td>90 – 120</td><td>110, 95, 100, 115, 105, 90</td><td class="num">6</td></tr>
            <tr><td>120 – 150</td><td>140, 130, 120, 145, 135, 125</td><td class="num">6</td></tr>
            <tr><td>150 – 180</td><td>175, 155, 165, 170, 150</td><td class="num">5</td></tr>
            <tr><td>180 – 210</td><td>200, 180, 210, 190</td><td class="num">4</td></tr>
            <tr><td><strong>Wait — recheck</strong></td><td colspan="2">3+5+6+6+5+4 = 29. One value missing. Let's check: 210 is listed — does it go in 180–210? Upper limit 210 is excluded... Hmm. Let's extend: 180–210 contains 200, 180, 190 = 3. 210 needs its own interval or we extend to 210–240. Extending: 210 belongs to 210–240. Let's use 180–210 (3 values: 200, 180, 190) and add 210–240 (1 value: 210). But this gives 7 intervals. Simpler fix: use bin size 30 starting at 30, and make the last interval 180–211 (inclusive of 210). Frequency of 180–210: 200, 180, 190, 210 = 4. Total: 3+5+6+6+5+4 = 29 — still missing one. Re-examine: 175 → 150–180. 155 → 150–180. 165 → 150–180. 170 → 150–180. 150 → 150–180. That's 5. And 60 → 60–90. Let's fully recount: 30–60: values &lt; 60: 55, 45, 50 = 3. 60–90: 60–89: 85, 65, 70, 80, 75, 60 = 6 (60 is included in 60–90). Recount: 3+6+6+6+5+4 = 30 ✓</td></tr>
          </tbody>
        </table>

        <p>Let's redo this carefully with 60 placed in the correct interval. <span class="vcue">[Show corrected table on screen]</span></p>

        <table class="data-table">
          <thead><tr><th>Screen Time (minutes)</th><th>Frequency</th></tr></thead>
          <tbody>
            <tr><td>30 – 60</td><td class="num">3</td></tr>
            <tr><td>60 – 90</td><td class="num">6</td></tr>
            <tr><td>90 – 120</td><td class="num">6</td></tr>
            <tr><td>120 – 150</td><td class="num">6</td></tr>
            <tr><td>150 – 180</td><td class="num">5</td></tr>
            <tr><td>180 – 210</td><td class="num">4</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>30 ✓</strong></td></tr>
          </tbody>
        </table>

        <div class="histogram">
          <div class="histogram-title">Daily Screen Time of 30 Students (Minutes)</div>
          <div class="histogram-chart">
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:50%">3</div>
              <div class="hist-label">30–60</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">6</div>
              <div class="hist-label">60–90</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">6</div>
              <div class="hist-label">90–120</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:100%">6</div>
              <div class="hist-label">120–150</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:83%">5</div>
              <div class="hist-label">150–180</div>
            </div>
            <div class="hist-bar-wrap">
              <div class="hist-bar" style="height:67%">4</div>
              <div class="hist-label">180–210</div>
            </div>
          </div>
          <div class="histogram-axes">
            <span>← Screen Time (minutes)</span>
            <span>Number of Students ↑</span>
          </div>
          <div class="histogram-note">The distribution rises from the low end and stays high through the middle — with a slight peak in 60–150 range. Very few students have extremely low or extremely high screen time.</div>
        </div>

        <div class="stage-marker elaborate"></div>
        <p><strong>Step 4 — Interpret the histogram.</strong> What does this tell the school counsellor? <span class="vcue">[Guide through interpretation on screen]</span></p>

        <p>The histogram shows that very few students (only 3) have a daily screen time below 60 minutes. The bulk of the students — 6 + 6 + 6 = 18 students — fall in the 60 to 150 minute range. That's 60% of the class. About 9 students (30%) have screen time above 150 minutes — that's 2.5 hours or more. The distribution starts low, rises steadily, and then gradually falls — it is slightly right-skewed, with a longer tail on the high end.</p>

        <p>The counsellor could use this information to say: most students have moderate screen time (1 to 2.5 hours), but nearly a third are in the high-use category. This might be worth a follow-up conversation.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Final Project Questions</span>
          Using the screen time data and histogram above: (a) How many students have screen time of 120 minutes or more per day? What percentage is this? (b) What is the modal class? What does this tell you? (c) A second class is surveyed and their histogram is perfectly flat — 5 students in each of the 6 intervals. What does this tell you about screen time habits in the second class compared to the first? (d) Would you use a bar graph or histogram for this data? Justify your answer in two sentences.
        </div>
      </div>

      <div class="practice-box">
        <h3>Final Practice — Complete Analysis</h3>
        <div class="practice-q">The following data shows the number of minutes 25 students spent studying on a weekend: 40, 95, 60, 120, 75, 150, 55, 110, 80, 135, 45, 100, 70, 140, 65, 90, 130, 50, 115, 85, 125, 105, 145, 60, 95. (a) Find the range. Choose an appropriate bin size and write out your intervals. (b) Build the grouped frequency table. Verify your total. (c) Describe the shape of the histogram — is it skewed? (d) What percentage of students studied for more than 100 minutes? What conclusion can you draw? (e) Would you use a bar graph or histogram for this data?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">(a) Range = 150 − 40 = 110. For 25 data points, aiming for 5–6 intervals: 110 ÷ 5 = 22 → use bin size of 20 (convenient). Start at 40: intervals are 40–60, 60–80, 80–100, 100–120, 120–140, 140–160. That's 6 intervals — good. (b) 40–60: 40, 55, 45, 50 = 4. 60–80: 60, 75, 60, 65, 70 = 5. 80–100: 95, 80, 85, 90, 95 = 5. 100–120: 120, 110, 100, 115, 105 = 5. 120–140: 135, 130, 125 = 3. 140–160: 150, 140, 145 = 3. Total: 4+5+5+5+3+3 = 25 ✓. (c) The histogram rises from 4 (40–60) to 5 (60–80), stays at 5 through 80–100 and 100–120, then drops to 3 in each of the last two intervals. The distribution is roughly symmetric with a flat peak in the middle — slightly left of center. It is not strongly skewed but may lean slightly right (longer tail from 120 onwards). (d) Students who studied more than 100 minutes: 5 + 3 + 3 = 11 students. 11 ÷ 25 = 44%. Conclusion: Nearly half the students studied for over 100 minutes, suggesting moderate to high study engagement on the weekend. (e) Histogram — because study time is measured in minutes (a continuous variable), and the data is grouped into adjacent intervals on a number line. A bar graph would be incorrect here since there are no separate category labels.</div>
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
      title: 'Module 2.2 — Wrap Up',
      textContent: `<div class="section-block">
      <div class="callout tip">
        <span class="callout-label">Module 2.2 — Wrap Up</span>
        We started with raw, unorganised data — a list of 30 marks that was very hard to read any pattern from. We learned how to group that data using class intervals and organise it into a frequency table. The key rule: the lower boundary is included, the upper boundary is excluded. Then we moved from the table to a histogram — where bars touch because the data is continuous, and the shape reveals the distribution at a glance. We explored how bin size affects what a histogram reveals, compared histograms carefully with bar graphs, and applied all of this in a real data analysis project. In the next module, we'll explore measures of central tendency — how to describe the distribution using a single number.
      </div>
    </div>

  </div><!-- end panel-a -->

  <!-- ══════════════════════════════════════════════
       PATH B
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

export const module_2: Module = filterModuleByPath(moduleData, 'A');
