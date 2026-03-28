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

const moduleData: Module = {
  id: '2.4',
  title: 'Chance & Probability',
  concepts: [
    {
      id: 'c2_1_1',
      title: 'The Mathematics of Random Experiments',
      textContent: `<div class="duration-badge" style="background:var(--c-light);color:var(--c-hue);">⏱ Curated from module_2.4_final.html · Path C — Advanced</div>

<div class="section-block" id="s1c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 1 of 5</p>
      <h2 class="section-title">The Mathematics of Random Experiments</h2>
      <div class="narration">
        <div class="stage-marker explain"></div>
        <p>Probability theory allows us to quantify uncertainty. In a **Random Experiment**, we cannot predict individual outcomes, but we can perfectly describe the **Sample Space (S)**—the mathematical set of all possible results. For a coin toss, S = {Head, Tail}. For a standard die, S = {1, 2, 3, 4, 5, 6}.</p>
        <div class="callout definition">
          <span class="callout-label">Formal Definition</span>
          An <strong>Event (E)</strong> is a subset of the Sample Space. The probability P(E) is defined as the size of the event set divided by the size of the sample space, assuming all outcomes in S are mutually exclusive and equally likely.
        </div>
        <p>If we toss two coins together, the Sample Space is S = {HH, HT, TH, TT}. Why are HT and TH listed as separate outcomes? Because they represent different physical states—Coin A showing Heads while Coin B shows Tails, and vice versa. There are 4 total outcomes. The probability of getting "exactly one head" is therefore 2/4 = 0.5.</p>
        <p>Probability forms a strict bounded scale from [0, 1]. The sum of all probabilities in a sample space must equal 1.</p>
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
      title: 'Bias and Fairness Logic',
      textContent: `<div class="section-block" id="s2c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 2 of 5</p>
      <h2 class="section-title">Bias and Fairness Logic</h2>
      <div class="narration">
        <div class="stage-marker explore"></div>
        <p>We say outcomes are <strong>Equally Likely</strong> when there is no structural reason to prefer one outcome over another. This is an assumed property of the physical system (like a perfectly balanced, isotropic die).</p>
        <p>If a system is biased—say a spinning wheel where 75% is Green and 25% is Blue—the base outcomes (Green and Blue) are <strong>not</strong> equally likely. We must then treat Green as three "favourable parts" of a four-part uniform whole.</p>
        <div class="callout challenge">
            <span class="callout-label">Advanced Thought</span>
            Is any real-world experiment ever truly "equally likely"? In physics, tiny imperfections (a coin being slightly heavier on the "Heads" side due to the engraving) always exist. In probability, we use "Equally Likely" as a mathematical model to simplify the world and make predictions that are "good enough" for engineering, science, and economics.
        </div>
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
      title: 'The Convergence Principle',
      textContent: `<div class="section-block" id="s3c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 3 of 5</p>
      <h2 class="section-title">The Convergence Principle</h2>
      <div class="narration">
        <div class="stage-marker explain"></div>
        <p>The <strong>Law of Large Numbers</strong> is the bridge between abstract theoretical math and the physical world. It states that the relative frequency (experimental probability) of an event in a sequence of independent trials converges to the expected value (theoretical probability) as the number of trials approaches infinity.</p>
        <p>This is why a casino can lose money to one person in one hour (random noise), but will always make a profit over 10,000 hours (mathematical certainty). The individual is subject to the high variance of <strong>Experimental Probability</strong>, while the house operates on the stable bedrock of <strong>Theoretical Probability</strong>.</p>
        <table class="data-table">
            <thead><tr><th>Trials</th><th>Deviation from Mean</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>10</td><td>+/- 20%</td><td>High Variance (Noise)</td></tr>
              <tr><td>1,000</td><td>+/- 2%</td><td>Stabilizing</td></tr>
              <tr><td>1,000,000</td><td>+/- 0.02%</td><td>Deterministic (Law of Large Numbers)</td></tr>
            </tbody>
        </table>
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
      title: 'Complex Sets in Games & Sports',
      textContent: `<div class="section-block" id="s4c">
        <p class="section-eyebrow" style="color:var(--c-mid)">Topic 4 of 5</p>
        <h2 class="section-title">Complex Sets in Games & Sports</h2>
        <div class="narration">
          <div class="stage-marker elaborate"></div>
          <p>In a 52-card deck, we can construct more complex event subsets:
            <ul>
                <li>Probability of drawing a Red Ace: There are 2 in the deck (Hearts and Diamonds). P = 2/52 = 1/26.</li>
                <li>Probability of drawing a Face Card (J, Q, K): There are 3 per suit × 4 suits = 12 total. P = 12/52 = 3/13.</li>
            </ul>
          </p>
          <p>In sports and finance, we use historical frequencies to estimate future probability. If a batsman scores >30 runs in 60 out of 100 innings, his estimated empirical probability is 0.6. These ratios are used to set "Odds" in betting, and calculate risk premiums in insurance.</p>
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
      title: 'Dependency Logic and Changing Spaces',
      textContent: `<div class="section-block" id="s5c">
      <p class="section-eyebrow" style="color:var(--c-mid)">Topic 5 of 5</p>
      <h2 class="section-title">Dependency Logic and Changing Spaces</h2>
      <div class="narration">
        <div class="stage-marker explain"></div>
        <p>A <strong>Dependent Event</strong> is one where the probability of the second trial is conditionally altered by the outcome of the first. This is most common in physical "Sampling Without Replacement."</p>
        <p><strong>The Mechanics of Conditional Change:</strong> A box has 4 Red apples and 3 Green apples. You take one out and eat it. Then you take another.
            <br>1. P(First is Red) = 4/7.
            <br>2. Assume the first was indeed Red. The sample space has now shrunk. The box contains 3 Red and 3 Green.
            <br>3. P(Second is Red | First was Red) = 3/6 = 0.5.
            <br>Notice how the probability of "Red" dropped from ~0.57 to 0.50 because we removed a favourable outcome from the system. If we had replaced the apple, the probability would have remained an independent 4/7.
        </p>
      </div>
      <div class="practice-box">
        <h3>Advanced Challenge</h3>
        <div class="practice-q">A bag has 3 red and 2 yellow balls. Two balls are drawn one after the other without replacement. List all outcomes and find the probability that both are red.</div>
        <button class="show-ans-btn" onclick="toggleAns(this)">Show Answer</button>
        <div class="practice-ans">Outcomes for 1st draw: R1 (3/5), Y1 (2/5).
            <br>If R1 is drawn, the bag now has 2 red, 2 yellow. 2nd draw: R2 (2/4), Y2 (2/4).
            <br>P(Both Red) = P(R1) × P(R2 | R1) = (3/5) × (2/4) = 6/20 = 3/10 or 0.3.</div>
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
      questions: buildAdaptiveQuestions(4, 6)
    }
  ]
};

export const module_4: Module = filterModuleByPath(moduleData, 'C');
