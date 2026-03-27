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
  id: '2.4',
  title: 'Chance & Probability',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'What Is Probability? — The Math of Maybe',
      textContent: `<div class="duration-badge" style="background:var(--a-light);color:var(--a-hue);">⏱ Curated from module_2.4_final.html · Path A — Foundational</div>

<div class="section-block" id="s1">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 1 of 5</p>
      <h2 class="section-title">What Is Probability? — The Math of Maybe</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Welcome back! So far, we’ve been working with data — collecting it, organising it, and representing it using graphs. We asked, “What has already happened?” Today, we are going to explore something slightly different. We are going to ask: 👉 <strong>“What is likely to happen?”</strong></p>
        <p>Imagine you are at a carnival fair, and you see a game. You throw a ring, and if it lands on a bottle, you win a prize. Do you know for sure that you will win? No. But can you say, “There is a chance I might win”? Yes! That “chance” is exactly what probability measures.</p>

        <div class="stage-marker explore"></div>
        <p>Let's look at a simpler game. Imagine a spinner with 4 equal sections: Red, Blue, Green, and Yellow. If you spin it once, what can happen? It can land on any of those 4 colors. Which color is most likely? Since all sections are exactly the same size, none is more likely than the other. Every outcome has the same chance.</p>

        <div class="stage-marker explain"></div>
        <p>Probability is just a measure of how likely an event is to happen. We use a simple formula to calculate this number:</p>
        <div class="callout definition">
          <span class="callout-label">The Formula</span>
          Probability of an event = (Number of outcomes you want) ÷ (Total number of things that could happen)
        </div>

        <div class="stage-marker elaborate"></div>
        <p>Let’s take a fun example: a "Duck Pond" game. There are 10 plastic ducks floating in a pool. Underneath the ducks:
          <ul>
            <li><strong>3 ducks</strong> have a red mark (this means you win a prize!)</li>
            <li><strong>7 ducks</strong> have no mark</li>
          </ul>
        If you pick one duck randomly, what is the probability of winning?</p>
        <p>
          Favourable outcomes (winning ducks) = 3<br>
          Total outcomes (all ducks) = 10<br>
          So, <strong>Probability = 3 ÷ 10 = 0.3</strong>. This means you have a 30% chance of winning!
        </p>

        <p>Probability is always a number between 0 and 1:
          <ul>
            <li><strong>Probability = 0</strong> → Impossible event (will never happen, like getting a 7 on a normal die).</li>
            <li><strong>Probability = 1</strong> → Certain event (will definitely happen, like getting a number between 1 and 6 on a die).</li>
            <li><strong>Between 0 and 1</strong> → Possible event.</li>
          </ul>
        </p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Let's Check</span>
          A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of picking a blue ball?
          <br><br><em>Hint: Think about the total balls, and the favourable outcomes!</em>
        </div>
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
      title: 'Equally Likely vs Not Equally Likely',
      textContent: `<div class="section-block" id="s2">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 2 of 5</p>
      <h2 class="section-title">Equally Likely vs Not Equally Likely</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>When you roll a normal die, each number from 1 to 6 has the exact same chance of appearing. But imagine a "trick die" — where the number 6 is painted on three sides, and the other numbers share the rest. Is that fair? No. The chances are no longer equal.</p>

        <div class="stage-marker explain"></div>
        <p>Events are called <strong>Equally Likely</strong> when all outcomes have the same chance.
          <ul>
            <li><strong>Example:</strong> Tossing a fair coin. Head and Tail both have a probability of 1/2.</li>
          </ul>
        </p>
        <p>Events are <strong>NOT Equally Likely</strong> when some outcomes are more likely than others.
          <ul>
            <li><strong>Example:</strong> Picking from a bag with 9 red balls and 1 blue ball. Red is clearly much more likely (9/10) than Blue (1/10).</li>
          </ul>
        </p>
      </div>

      <div class="practice-box">
        <h3>Guided Practice</h3>
        <div class="practice-q">If a spinner has 3 red sections and 1 blue section, which colour is more likely to win? Are the colours equally likely?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Red is more likely because it has more sections (favourable outcomes). Therefore, the outcomes are NOT equally likely.</div>
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
      title: 'What Should Happen vs What Actually Happens',
      textContent: `<div class="section-block" id="s3">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 3 of 5</p>
      <h2 class="section-title">What Should Happen vs What Actually Happens</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>If you toss a coin once, what do you expect? Maybe Head, maybe Tail. But what if you toss it 100 times? Will you get exactly 50 heads? Not always!</p>
        
        <div class="stage-marker explore"></div>
        <p>Try this mentally: If you toss a coin 10 times, you might get: H, H, T, H, T, T, H, H, T, H. That’s 6 Heads and 4 Tails. It's not exactly 5-5.</p>

        <div class="stage-marker explain"></div>
        <p>There are two types of probability we talk about:
          <ul>
            <li><strong>Theoretical Probability:</strong> What we expect mathematically (e.g., Head = 1/2).</li>
            <li><strong>Experimental Probability:</strong> What we actually observe in an experiment (e.g., 6 heads in 10 tosses = 6/10).</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>Here is a powerful secret of math: As the number of trials increases, experimental probability gets closer and closer to theoretical probability. This is called the <strong>Law of Large Numbers</strong>. 10 tosses might be uneven, but 1000 tosses will be very close to 50-50!</p>
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
      title: 'Probability in Games & Sports',
      textContent: `<div class="section-block" id="s4">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 4 of 5</p>
      <h2 class="section-title">Probability in Games & Sports</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Before every cricket match, there is a coin toss. Why? Because both teams should have an equal chance to choose first. It decides fairness.</p>
        
        <div class="stage-marker elaborate"></div>
        <p>Probability helps us predict outcomes and analyze performance. For example, if a batsman scores these runs in 5 matches: 20, 35, 50, 10, 60. What is the probability of him scoring above 30?
          <br>He scored above 30 three times (35, 50, 60). 
          <br>Out of 5 total matches.
          <br>Probability ≈ 3/5.
        </p>
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
      title: 'Independent vs Dependent Events',
      textContent: `<div class="section-block" id="s5">
      <p class="section-eyebrow" style="color:var(--a-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Independent vs Dependent Events</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Imagine you pick one card from a deck. Then you pick another. Does your first pick affect your second pick? It depends on whether you put the first card back!</p>

        <div class="stage-marker explain"></div>
        <p>
          <ul>
            <li><strong>Independent Events:</strong> One event does not affect the other. (Example: Tossing a coin twice).</li>
            <li><strong>Dependent Events:</strong> One event affects the next. (Example: Drawing a card and keeping it. The deck now has 51 cards instead of 52, changing all the chances!).</li>
          </ul>
        </p>
      </div>

      <div class="practice-box">
        <h3>Final Check</h3>
        <div class="practice-q">If you draw one card from a deck of 52 and do NOT replace it, is drawing the next card a dependent or independent event?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">It is a <strong>Dependent event</strong>, because the total number of cards has changed (from 52 to 51).</div>
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

export const module_4: Module = filterModuleByPath(moduleData, 'A');
