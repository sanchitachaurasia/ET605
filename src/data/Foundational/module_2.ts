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
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Estimated reading time: 15–18 minutes &nbsp;·&nbsp; Path A — Full Foundational</div>

<!-- ── TOPIC 1 ── -->
<div class="section-block" id="s1">
  <p class="section-eyebrow" style="color:var(--a-mid)">Topic 1 of 6</p>
  <h2 class="section-title">Why Do We Need to Organise Data?</h2>

  <div class="narration">
    <div class="stage-marker engage"></div>
    <p>Alright everyone, let's start with something really simple — something that probably happened in your school this week. Imagine your teacher says, "I want to find out what sport everyone in this class loves the most." So she calls out every student's name, and as each of you answers, she quickly writes it down on the board. <span class="vcue">[Show a random list appearing on screen, one sport at a time]</span> Rahul says cricket. Priya says badminton. Ankit says football. Aarti says cricket. Sneha says kho-kho. And so on, for all 30 students in the class. <span class="pcue">(Pause 2 seconds)</span></p>

    <p>Now here's my question for you. Your teacher has written down all 30 answers. Can she immediately tell which sport is the most popular? Can she look at that list and say, "Eight students said cricket"? <span class="pcue">(Think about it for a moment)</span> Honestly — no. She'd have to go through the whole list again, counting each sport one by one. She might lose count. She might misread her own writing. She might count one sport twice and another sport not at all. That messy list on the board — that's what we call raw data. And raw data, on its own, is very hard to make sense of.</p>

    <div class="callout definition">
      <span class="callout-label">Definition — Data</span>
      Data simply means information — any collection of facts, numbers, or observations. When we collect answers from students, count things around us, or write down measurements, we are collecting data. But data in its raw collected form is often disordered and hard to understand.
    </div>

    <div class="stage-marker explore"></div>
    <p>Let me show you exactly what raw data looks like, and why it's so frustrating to work with. <span class="vcue">[Show the following raw list on screen]</span> Here are the favourite sports that 20 students named: Cricket, Football, Cricket, Badminton, Cricket, Kho-Kho, Football, Cricket, Badminton, Football, Cricket, Cricket, Badminton, Kho-Kho, Football, Cricket, Badminton, Cricket, Football, Cricket. <span class="pcue">(Pause 3 seconds — let students look at it)</span></p>

    <p>Try to answer this — just by looking at that list, without counting carefully — how many students said cricket? Take a guess. Now go back and actually count. Did you get it right? Most people don't, because there's no pattern in this list, no grouping, no order. This is the frustration of raw data. It contains all the information, but it's hiding it from you. Now — what if we could arrange this list so that the answers just jumped out at you? That's exactly what organising data means, and that's what this entire chapter is about.</p>

    <div class="stage-marker explain"></div>
    <p>So what does it mean to organise data? Let's build this idea slowly. <span class="vcue">[Show the word "organise" being highlighted]</span> When we organise data, we arrange it in a way that makes it easy to read, easy to count, and easy to compare. Think of your school bag. If you throw all your books, pencils, lunch box, and notebooks in randomly, it's chaos — you can't find anything quickly. But if you put each subject's books together, your stationery in one pocket, and your lunch in another — you can find anything in seconds. Data works the same way. When data is organised, the patterns and answers appear almost instantly.</p>

    <p>There are many ways to organise data — and in this module, we are going to learn four powerful tools: tally marks and frequency tables, pictographs, bar graphs, and double bar graphs. Each one is useful in different situations. But they all share the same purpose: to take raw, messy data and turn it into something you can read and understand at a glance.</p>

    <div class="stage-marker elaborate"></div>
    <p>Let's go back to our favourite sports data. <span class="vcue">[Show the raw list again on the left side of screen]</span> Here are the 20 responses. Now watch what happens when we organise it. We go through the list, and every time we see "Cricket," we put it in one group. Every "Football" goes in another group. "Badminton" in a third. "Kho-Kho" in a fourth. <span class="vcue">[Show the data being sorted into four columns]</span></p>

    <p>Cricket appears: 9 times. Football appears: 5 times. Badminton appears: 4 times. Kho-Kho appears: 2 times. <span class="vcue">[Show the organised table with these counts]</span> Now look at this. Which sport is most popular? Cricket — immediately obvious. Which sport is least popular? Kho-Kho — you can see it in one second. Did anyone have to count through a messy list? No. Organised data speaks for itself. This is the power of organisation. From here, we're going to learn the specific tools that help us do this efficiently and beautifully.</p>

    <div class="stage-marker evaluate"></div>
    <div class="callout question">
      <span class="callout-label">Check Your Understanding</span>
      Your class teacher collects information about how students come to school — by bus, auto, bicycle, or on foot. She writes down all 35 students' answers in a random order. Try to answer: (a) What is this collection of 35 answers called? (b) Why is it difficult to answer "which mode is most common" from the raw list? (c) What would you do to make the data easier to understand?
    </div>
  </div>

</div>

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
      textContent: `<!-- ── TOPIC 2 ── -->
<div class="section-block" id="s2">
  <p class="section-eyebrow" style="color:var(--a-mid)">Topic 2 of 6</p>
  <h2 class="section-title">Tally Marks &amp; Frequency Tables</h2>

  <div class="narration">
    <div class="stage-marker engage"></div>
    <p>Now that we know WHY we need to organise data, let's learn the first and most fundamental tool: tally marks. <span class="vcue">[Show an image of someone keeping score during a cricket match on paper]</span> Have you ever seen a scorekeeper at a local cricket match? They don't write "1, 2, 3, 4, 5" for every run — they use a quick system of marks. Four vertical lines, and then a diagonal line crossing through them for the fifth. This system lets them count fast, without losing track, and read the total at a glance. That system has a name — it's called tally marks — and you're going to use it the same way to count data.</p>

    <div class="callout definition">
      <span class="callout-label">Definition — Tally Mark</span>
      A tally mark is a way of recording a count using lines. One mark (|) represents the number 1. When you reach 5, instead of drawing a fifth line, you draw a diagonal line (/) crossing through the previous four, making a bundle of five: ||||̶. This makes it very easy to count totals by reading groups of five.
    </div>

    <div class="stage-marker explore"></div>
    <p>Let's try counting something together — and see why tally marks make it easier. <span class="vcue">[Show this list of subjects students chose as favourite: Art, Maths, Science, Maths, English, Art, Maths, Science, Art, English, Maths, Science, Maths, Art, English, Science, Maths, Art, Maths, English]</span> I want you to count how many students chose Maths as their favourite. Try counting it directly from this list — go ahead. <span class="pcue">(Pause 5 seconds)</span> Did you lose track at any point? Did you have to restart? Now let's use tally marks instead. As I go through the list one item at a time, I put one tally mark under the correct subject. Ready?</p>

    <div class="stage-marker explain"></div>
    <p>Here's how to build a frequency table using tally marks — step by step. <span class="vcue">[Show an empty table with columns: Subject | Tally | Frequency]</span></p>

    <p>Step one: list all the unique items in the first column. In our case: Art, Maths, Science, English. Step two: go through the raw data, one item at a time. Every time you see an item, draw one tally mark in its row. Step three: when you've gone through all the data, count the tally marks in each row. That count is called the frequency. Frequency simply means how often something appears in the data — it's the number of times it occurs.</p>

    <div class="callout definition">
      <span class="callout-label">Definition — Frequency</span>
      Frequency is the number of times a particular value or item appears in a set of data. For example, if "Maths" appears 7 times in our list, its frequency is 7.
    </div>

    <p>Now let's fill in our table. <span class="vcue">[Animate the table being filled row by row]</span> Going through the list: Art appears 5 times, Maths appears 7 times, Science appears 4 times, English appears 4 times. Here is the complete frequency table:</p>

    <table class="data-table">
      <thead><tr><th>Subject</th><th>Tally Marks</th><th>Frequency</th></tr></thead>
      <tbody>
        <tr><td>Art</td><td class="tally">|||| |</td><td class="num">5</td></tr>
        <tr><td>Maths</td><td class="tally">|||| ||</td><td class="num">7</td></tr>
        <tr><td>Science</td><td class="tally">||||</td><td class="num">4</td></tr>
        <tr><td>English</td><td class="tally">||||</td><td class="num">4</td></tr>
        <tr><td><strong>Total</strong></td><td></td><td class="num"><strong>20</strong></td></tr>
      </tbody>
    </table>

    <div class="callout tip">
      <span class="callout-label">Important Tip — Verification</span>
      Always add up all the frequencies at the end. The total must equal the total number of data points you started with. Here, 5 + 7 + 4 + 4 = 20, and we had 20 students. They match — so our table is correct. If they don't match, you made an error somewhere.
    </div>

    <div class="stage-marker elaborate"></div>
    <p>Now look at this completed frequency table and notice how much easier it is to read. <span class="vcue">[Highlight the Maths row]</span> Which subject is most popular? Maths — with a frequency of 7. Which subjects are equally popular? Science and English — both with frequency 4. How many students were surveyed in total? 20. All of these answers are available immediately, without searching through a messy list. That's the power of a frequency table.</p>

    <div class="stage-marker evaluate"></div>
    <div class="callout question">
      <span class="callout-label">Check Your Understanding</span>
      Here is a list of colours of 18 cars parked in a school parking lot: Red, White, Black, Silver, Red, White, Silver, Black, Red, White, Red, Silver, White, Black, Red, Silver, White, Red. Make a tally marks table and answer: (a) What is the frequency of Red cars? (b) Which colour appears least often? (c) What is the total of all frequencies — does it match 18?
    </div>
  </div>

</div>

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
      textContent: `<!-- ── TOPIC 3 ── -->
    <div class="section-block" id="s3">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 3 of 6</p>
      <h2 class="section-title">Pictographs</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Alright — we can now organise data into a table. But tables show numbers. And sometimes, numbers alone don't make the strongest impact. Have you ever noticed those colourful charts in newspapers or on TV news, where instead of just writing "50 cars," they show 5 little car icons? <span class="vcue">[Show a newspaper infographic with small icons representing counts]</span> Those are called pictographs, and they're one of the oldest forms of data representation — even ancient civilisations drew pictures to communicate counts. Today we learn how they work and, importantly, how to read them correctly without being misled.</p>

        <div class="stage-marker explore"></div>
        <p>Let's say a car company wants to show how many cars they sold in four cities. Here is the data: Mumbai — 500 cars, Delhi — 300 cars, Chennai — 400 cars, Kolkata — 200 cars. <span class="vcue">[Show this frequency table on screen]</span> Now, drawing 500 actual tiny cars for Mumbai is obviously impossible. So we use a KEY — one symbol represents a fixed number, say 100 cars. Let's see what this looks like as a pictograph. <span class="vcue">[Show the pictograph being built]</span></p>

        <div class="pictograph">
          <div class="bar-chart-title">Cars Sold by City (🚗 = 100 cars)</div>
          <div class="picto-row"><span class="picto-label">Mumbai</span><span class="picto-symbol">🚗🚗🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Delhi</span><span class="picto-symbol">🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Chennai</span><span class="picto-symbol">🚗🚗🚗🚗</span></div>
          <div class="picto-row"><span class="picto-label">Kolkata</span><span class="picto-symbol">🚗🚗</span></div>
          <div class="picto-key">KEY: 🚗 = 100 cars &nbsp;|&nbsp; Half symbol (🚗½) = 50 cars</div>
        </div>

        <div class="stage-marker explain"></div>
        <p>Let's understand the structure of a pictograph carefully. Every pictograph has three parts. First, the categories — listed in a column on the left, one per row. Second, the symbols — drawn in each row, with the number of symbols representing the data value. Third, and most important, the KEY. <span class="vcue">[Highlight the KEY box in the pictograph]</span></p>

        <p>The key tells you what ONE symbol represents. This is called the scale of the pictograph. In our example, one car symbol equals 100 cars. So to find the actual value for any row, you count the symbols in that row and multiply by the scale. Mumbai has 5 symbols — 5 times 100 equals 500. Delhi has 3 symbols — 3 times 100 equals 300. Simple multiplication.</p>

        <div class="callout definition">
          <span class="callout-label">What About Half Symbols?</span>
          Sometimes the data value is not a perfect multiple of the scale. If Mumbai had sold 550 cars, we would draw 5 full car symbols and one half symbol. A half symbol represents half of the scale value. Half of 100 is 50. So 5 full + 1 half = 500 + 50 = 550. Always check: does the data make half symbols necessary? If the scale is 100 and the data value is 650, that's 6.5 symbols — 6 full and 1 half.
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Now let me show you how to READ a pictograph — because reading it wrong is a very common mistake. <span class="vcue">[Show a new pictograph: Books read by students in a month, symbol = 📚, key says each book = 4 books read]</span> Suppose Aditya has 3 book symbols, Meera has 2.5 book symbols, and Rohan has 4 book symbols. The scale is: 1 symbol = 4 books. <span class="pcue">(Now calculate)</span></p>
        <p>Aditya: 3 × 4 = 12 books. Meera: 2.5 × 4 = 10 books. Rohan: 4 × 4 = 16 books. <span class="vcue">[Show calculations beside each row]</span> Who read the most? Rohan. Who read exactly 10 books? Meera — because of the half symbol. Now here's the key lesson: if you forget to check the key, you might think Rohan read 4 books, not 16. The key is everything in a pictograph.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          A pictograph shows ice cream sales over 5 days. The key says: 🍦 = 20 ice creams. Monday has 3 symbols, Tuesday has 4 symbols, Wednesday has 2.5 symbols, Thursday has 5 symbols, Friday has 3.5 symbols. (a) How many ice creams were sold on Wednesday? (b) On which day were the most ice creams sold? (c) What is the total ice cream sales for the week?
        </div>
      </div>

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
      textContent: `<!-- ── TOPIC 4 ── -->
    <div class="section-block" id="s4">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 4 of 6</p>
      <h2 class="section-title">Bar Graphs &amp; Double Bar Graphs</h2>

      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Pictographs are great for simple counts, but they have a problem: drawing lots of tiny symbols is tedious, and comparing values isn't always easy. What if I told you there's a way to represent data visually where the HEIGHT of a shape tells you the value — no symbols needed, no counting icons, just one look at how tall a bar is and you immediately know if a value is high or low? <span class="vcue">[Show a bar graph animation appearing on screen]</span> That's a bar graph. And it's arguably the most widely used graph in the world. Let's master it completely today.</p>

        <div class="stage-marker explore"></div>
        <p>Here's a real scenario. A school tracked how many students were enrolled each year from 2019 to 2023. The data is: 2019 — 420 students, 2020 — 380 students, 2021 — 450 students, 2022 — 510 students, 2023 — 490 students. <span class="vcue">[Show this table]</span> From just reading these five numbers, can you immediately tell: was there a drop at any point? By how much did enrolment grow from 2019 to 2022? Which year had the biggest jump from the previous year? It's hard to see all of this from a table. A bar graph will make every one of these answers visual and instant.</p>

        <div class="stage-marker explain"></div>
        <p>Let's learn the parts of a bar graph. <span class="vcue">[Show a labelled diagram of a bar graph]</span> Every bar graph has the following components. The X-axis is the horizontal line at the bottom — this is where you put your categories, like years, subjects, or names. The Y-axis is the vertical line on the left — this shows the numerical values. You must label both axes clearly.</p>
        <p>The scale on the Y-axis is a series of evenly spaced numbers, starting from zero and going up to a value slightly above your highest data point. In our school data, the highest value is 510, so the scale might go from 0 to 550 in steps of 50. Each bar starts at zero and rises to the height that matches its data value. All bars must be the same width, and there must be equal gaps between them.</p>

        <div class="bar-chart">
          <div class="bar-chart-title">School Enrolment 2019–2023</div>
          <div class="bar-row"><span class="bar-label">2019</span><div class="bar-track"><div class="bar-fill" style="width:76%">420</div></div></div>
          <div class="bar-row"><span class="bar-label">2020</span><div class="bar-track"><div class="bar-fill" style="width:69%">380</div></div></div>
          <div class="bar-row"><span class="bar-label">2021</span><div class="bar-track"><div class="bar-fill" style="width:82%">450</div></div></div>
          <div class="bar-row"><span class="bar-label">2022</span><div class="bar-track"><div class="bar-fill" style="width:93%">510</div></div></div>
          <div class="bar-row"><span class="bar-label">2023</span><div class="bar-track"><div class="bar-fill" style="width:89%">490</div></div></div>
          <p style="font-size:11px;color:var(--muted);margin-top:8px;font-family:'JetBrains Mono',monospace">Y-axis: Number of Students · X-axis: Year</p>
        </div>

        <p>Now look at the bar graph. <span class="vcue">[Highlight the 2020 bar]</span> The dip in 2020 is immediately visible — the bar is shorter than 2019. <span class="vcue">[Highlight the 2022 bar]</span> The peak is clearly 2022. You can see these patterns in seconds. No calculation needed.</p>

        <div class="stage-marker explain"></div>
        <p>Now let's go one step further. What if we want to compare two groups side by side? For example — what if we want to see the number of boys and girls enrolled each year? A double bar graph places two bars next to each other for every category, each bar in a different colour, with a legend explaining which colour represents which group. <span class="vcue">[Show a double bar graph with boys in blue and girls in orange]</span></p>

        <table class="data-table">
          <thead><tr><th>Year</th><th>Boys</th><th>Girls</th></tr></thead>
          <tbody>
            <tr><td>2019</td><td class="num">230</td><td class="num">190</td></tr>
            <tr><td>2020</td><td class="num">200</td><td class="num">180</td></tr>
            <tr><td>2021</td><td class="num">240</td><td class="num">210</td></tr>
            <tr><td>2022</td><td class="num">270</td><td class="num">240</td></tr>
            <tr><td>2023</td><td class="num">250</td><td class="num">240</td></tr>
          </tbody>
        </table>

        <p><span class="vcue">[Show the double bar graph]</span> In a double bar graph, for each year, we draw two bars side by side — one for boys (blue), one for girls (orange). The legend in the corner tells us which is which. Now you can compare boys vs girls in the same year AND track the trend of both groups across years — all from one graph.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Check Your Understanding</span>
          Using the double bar graph data above: (a) In which year was the gap between boys and girls enrolment the largest? (b) In 2023, how many more boys than girls were enrolled? (c) Is the difference between boys and girls getting larger or smaller over the years?
        </div>
      </div>
      </div>


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
