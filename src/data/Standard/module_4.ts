import { Module, GameFormat } from '../../types';
import * as questionBank from '../questions/module_4';


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
  id: '2.4',
  title: 'Chance & Probability',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'What Is Probability?',
      textContent: `<div class="duration-badge" style="background:var(--b-light);color:var(--b-hue);">⏱ Curated from module_2.4_final.html · Path B — Standard</div>

<div class="section-block" id="s1b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 1 of 5</p>
      <h2 class="section-title">What Is Probability?</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>So, welcome back everyone. So far, we’ve been working with data — collecting it, organising it, and representing it using graphs. But today, we are going to explore something slightly different. Instead of asking, “What has already happened?”, we are going to ask: 👉 <strong>“What is likely to happen?”</strong></p>
        <p>Imagine you are at a fair, and you see a game. You throw a ring, and if it lands on a bottle, you win a prize. Do you know for sure that you will win? No. But can you say: “There is a chance I might win”? Yes. That “chance” is exactly what probability measures.</p>

        <div class="stage-marker explore"></div>
        <p>Look at a simple spinner with 4 equal sections: Red, Blue, Green, Yellow. If you spin it once, what can happen? It can land on Red, Blue, Green, or Yellow. Which colour is most likely? Since all sections are equal, none is more likely than the other. Each outcome has the same chance.</p>

        <div class="stage-marker explain"></div>
        <p>Probability is a measure of how likely an event is to happen. We calculate probability using this formula:</p>
        <div class="callout definition">
          <span class="callout-label">The Formula</span>
          Probability of an event = (Number of favourable outcomes) ÷ (Total number of outcomes)
        </div>
        <p>So, if we want the probability of landing on Blue:<br>
          Favourable outcomes = 1 (Blue)<br>
          Total outcomes = 4<br>
          So, Probability = 1 ÷ 4
        </p>

        <p>An important idea: <strong>Probability values always lie between 0 and 1.</strong>
          <ul>
            <li>Probability = 0 → impossible event (will never happen, like getting 7 on a normal die)</li>
            <li>Probability = 1 → certain event (will definitely happen, like getting a number between 1 and 6)</li>
            <li>Between 0 and 1 → possible event</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>Let’s take a fun example. In a duck pond game, there are 10 ducks:
          <ul>
            <li>3 have a red mark (win prize)</li>
            <li>7 have no mark</li>
          </ul>
          If you pick one duck randomly, what is the probability of winning?<br>
          Favourable outcomes = 3<br>
          Total outcomes = 10<br>
          So, Probability = 3 ÷ 10 = 0.3 (This means you have a 30% chance of winning).
        </p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Evaluate</span>
          A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of picking a blue ball?<br>
          <em>Think about: Total balls, Favourable outcomes.</em>
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
      questions: buildAdaptiveQuestions(4, 1)
    },
    {
      id: 'c2_1_2',
      title: 'Equally Likely vs Not Equally Likely',
      textContent: `<div class="section-block" id="s2b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 2 of 5</p>
      <h2 class="section-title">Equally Likely vs Not Equally Likely</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>When you roll a normal die, each number from 1 to 6 has the same chance. But imagine a trick die — where 6 appears more often than other numbers. Is the game still fair?</p>

        <div class="stage-marker explore"></div>
        <p>With a normal die, the probability of each number is 1/6. With a biased die, some numbers appear more often, so the chances are no longer equal.</p>

        <div class="stage-marker explain"></div>
        <p>
          <ul>
            <li><strong>Equally likely events:</strong> when all outcomes have the same chance. (Example: Tossing a fair coin → Head and Tail both have probability 1/2).</li>
            <li><strong>Not equally likely events:</strong> when some outcomes are more likely than others. (Example: A bag with 9 red balls and 1 blue ball → Red is much more likely).</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>Let’s compare two games visually:
          <br><strong>Game 1:</strong> Toss a fair coin 👉 Head = 1/2, Tail = 1/2
          <br><strong>Game 2:</strong> Pick from a bag with 9 red and 1 blue 👉 Red = 9/10, Blue = 1/10
          <br>Even though both are random, one is clearly biased.
        </p>
      </div>

      <div class="practice-box">
        <h3>Evaluate</h3>
        <div class="practice-q">If a spinner has 3 red sections and 1 blue section. Which colour is more likely? Why?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Red, because it has more favourable outcomes (3 vs 1).</div>
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
      questions: buildAdaptiveQuestions(4, 2)
    },
    {
      id: 'c2_1_3',
      title: 'Experimental vs Theoretical Probability',
      textContent: `<div class="section-block" id="s3b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 3 of 5</p>
      <h2 class="section-title">Experimental vs Theoretical Probability</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>If you toss a coin once, what do you expect? Maybe Head, maybe Tail. But what if you toss it 100 times? Will you get exactly 50 heads? Not always.</p>

        <div class="stage-marker explore"></div>
        <p>Try this mentally: If you toss a coin 10 times, you might get: H, H, T, H, T, T, H, H, T, H. That’s 6 Heads and 4 Tails. Not exactly 5–5.</p>

        <div class="stage-marker explain"></div>
        <p>There are two types of probability:
          <ul>
            <li><strong>Theoretical Probability:</strong> What we expect mathematically. Example: Coin → Head = 1/2.</li>
            <li><strong>Experimental Probability:</strong> What we actually observe in experiments. Example: If 6 heads appear in 10 tosses → Experimental probability = 6/10.</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>Now here’s a powerful idea: As the number of trials increases, experimental probability gets closer to theoretical probability. This is called the <strong>Law of Large Numbers</strong>. So, 10 tosses might be uneven, but 1000 tosses will be much closer to 50–50.</p>
      </div>

      <div class="practice-box">
        <h3>Evaluate</h3>
        <div class="practice-q">If a coin is tossed 20 times and Head appears 12 times. What is the experimental probability of Head?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Answer: 12 ÷ 20 = 3/5.</div>
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
      questions: buildAdaptiveQuestions(4, 3)
    },
    {
      id: 'c2_1_4',
      title: 'Probability in Games and Sports',
      textContent: `<div class="section-block" id="s4b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 4 of 5</p>
      <h2 class="section-title">Probability in Games and Sports</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Before every cricket match, there is a coin toss. Why? Because both teams should have an equal chance to choose first.</p>

        <div class="stage-marker explain"></div>
        <p>Probability helps decide fairness, predict outcomes, and analyse performance. For example:
          <ul>
            <li>In cards: probability of drawing a heart = 13/52 = 1/4</li>
            <li>In dice: probability of getting even number = 3/6 = 1/2</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>A batsman scores runs in matches: 20, 35, 50, 10, 60. We can estimate the probability of scoring above 30 based on past data. Out of 5 matches, 3 times he scored above 30. So probability ≈ 3/5. This helps in prediction.</p>

        <div class="stage-marker evaluate"></div>
        <div class="callout question">
          <span class="callout-label">Evaluate</span>
          In a deck of 52 cards, what is the probability of drawing a king?
        </div>
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
      questions: buildAdaptiveQuestions(4, 4)
    },
    {
      id: 'c2_1_5',
      title: 'Independent vs Dependent Events',
      textContent: `<div class="section-block" id="s5b">
      <p class="section-eyebrow" style="color:var(--b-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Independent vs Dependent Events</h2>
      <div class="narration">
        <div class="stage-marker engage"></div>
        <p>Imagine you pick one card from a deck. Then you pick another. Now think: 👉 Does the first pick affect the second?</p>

        <div class="stage-marker explore"></div>
        <p><strong>Case 1:</strong> Replace the card → Total cards remain 52.<br>
           <strong>Case 2:</strong> Do not replace → Now only 51 cards remain. So the situation changes.</p>

        <div class="stage-marker explain"></div>
        <p>Events are:
          <ul>
            <li><strong>Independent:</strong> One event does not affect the other (Example: Tossing a coin twice).</li>
            <li><strong>Dependent:</strong> One event affects the next (Example: Drawing cards without replacement).</li>
          </ul>
        </p>

        <div class="stage-marker elaborate"></div>
        <p>Example: A bag has 5 red and 5 blue balls.
          <br>First pick: probability of red = 5/10.
          <br>If not replaced, for the second pick, now only 9 balls remain! So the probability changes.
        </p>
      </div>
      
      <div class="practice-box">
        <h3>Evaluate</h3>
        <div class="practice-q">If you draw one card and do NOT replace it. Does the second draw depend on the first?</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Yes — it is a dependent event.</div>
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
      questions: buildAdaptiveQuestions(4, 5)
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
      questions: buildAdaptiveQuestions(4, 6)
    }
  ]
};

export const module_4: Module = filterModuleByPath(moduleData, 'B');
