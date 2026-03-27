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
        textContent: 'Your teacher asks: "Which sport is most popular in Class 8?" Every student calls out at the same time. You hear: Cricket, Football, Cricket, Badminton, Cricket, Football, Tennis, Cricket … Can you tell which sport is most popular? No — it is noise. You need to COLLECT, ORGANISE, and COUNT responses systematically. That is exactly what Data Handling teaches you to do.',
        difficulty: 'easy',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Raj\'s Mystery: Finding the Most Popular Lunch',
          scenario: 'The school cafeteria manager, Mrs. Patel, is confused. Every day, she cooks different lunch options, but she doesn\'t know which one students prefer most. She asked 50 students: "What is your favourite lunch?" The answers came as a long, chaotic list: "Pizza, Dosa, Pizza, Biryani, Pizza, Dosa, Pasta, Pizza, Dosa, Biryani…" With data like this, Mrs. Patel cannot make good decisions. She turns to Raj for help.',
          realWorldConnection: 'Netflix uses data organisation to find your favourite shows. Google uses it to understand search trends. Amazon uses it to find popular products. Your school cafeteria uses it to plan menus. Without organisation, data is just noise!',
          studentChallenge: 'You are now like Raj. By the end of this module, you\'ll be able to take messy data and turn it into clear graphs that answer questions instantly.'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 0,
        videoEndSeconds: 40,
        videoCheckpointPrompt: 'Pause and answer: What problem did raw data create for Raj?',
        workedExamples: [
          {
            explanation: 'Example 1: The Problem That Graphs Solve',
            steps: [
              'Imagine you have collected 50 responses to "What is your favourite sport?" as a raw list.',
              'Reading it takes 2 minutes and you still cannot answer: "Which sport is most popular?"',
              'Frequency tables, pictographs, and bar graphs exist to solve this exact problem.',
              'With a graph, you see the answer in 5 seconds by looking at the tallest bar.'
            ]
          },
          {
            explanation: 'Example 2: Why Companies Care About Data',
            steps: [
              'McDonald\'s collects data on which menu items customers order.',
              'By organising this data, they see that burgers are most popular.',
              'They stock more burgers and fewer salads.',
              'Result: happier customers, more sales.'
            ]
          },
          {
            explanation: 'Example 3: Your School',
            steps: [
              'Your school collects data on student grades in Math, Science, English.',
              'By organising this data, they see which students need extra help.',
              'They provide tutoring to struggling students.',
              'Result: better grades, better learning outcomes.'
            ]
          },
          {
            explanation: 'Example 4: Making Personal Decisions',
            steps: [
              'You track your test scores: 75, 82, 78, 85, 88 (5 tests).',
              'Organised, you see: average = 81.6, trend = improving.',
              'You realise studying more helps.',
              'Decision: continue with your study plan.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Why Data Matters',
            content: 'Data is simply facts and numbers. Organized data shows patterns that raw data hides. For example, if you list all colors in a rainbow in order (red, orange, yellow, green, blue, indigo, violet), you instantly remember the pattern. Compare this to listing colors randomly: "blue, red, indigo, orange, violet, yellow, green." Much harder to remember! Same with numbers — organized is always clearer than chaos.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: The Power of Organisation',
            content: 'When you organise data, you enable people to make decisions quickly. A doctor organises patient symptoms to diagnose disease. A coach organises player statistics to build a winning team. A teacher organises test scores to identify struggling students. Without organisation, these decisions take forever and tend to be wrong.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Real-World Application',
            content: 'Think of a decision your parents need to make. Example: "Which school is best for our child?" They collect data on: exam results, sports facilities, fees, commute time. By organising this data (maybe in a table or chart), they can compare schools and make a good decision. You try: Pick a decision (best phone, best pizza topping, best vacation destination) and think about what data you\'d collect and how you\'d organise it.'
          }
        ],
        realWorldApplications: [
          'Netflix recommendations based on watch history',
          'Google search trends analysis',
          'School cafeteria menu planning',
          'Weather forecasting',
          'Sports team strategies'
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
        textContent: 'A Frequency Distribution Table organises data by listing every category with its tally marks and frequency. Every time a value appears, make ONE stroke: |. After 4 strokes (||||), the 5th stroke crosses them diagonally: |||| — this completes a group of 5. Tally marks in groups of 5 make counting fast and error-free.',
        difficulty: 'easy',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Counting Like Ancient Humans',
          scenario: 'Hundreds of years ago, shepherds needed to count sheep. Marking on paper one-by-one (1, 2, 3, 4, 5…) was slow. Then someone discovered "grouping by 5" using tally marks. Suddenly, counting 1000 sheep wasn\'t painful — divide into groups of 5, done! This ancient method is still the fastest way humans count by hand today.',
          realWorldConnection: 'Tally marks are used in modern surveys, opinion polls, game scoring, and even by emergency responders counting victims. It\'s a 2000-year-old method that\'s still faster than any modern app for quick, manual counting.',
          studentChallenge: 'In the next activity, you\'ll use tally marks to count real survey responses and build your first frequency table.'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 40,
        videoEndSeconds: 80,
        videoCheckpointPrompt: 'Pause and answer: Why do tally marks use groups of 5?',
        workedExamples: [
          {
            explanation: 'Example 1: Basic Tally Marks Method',
            steps: [
              'Raw data: "Red, Blue, Red, Green, Red, Blue, Red, Green, Blue, Red" (10 items)',
              'Step 1: List categories in a table (Red, Blue, Green).',
              'Step 2: Go through data one-by-one left-to-right. For each "Red", mark | in the Red row.',
              'Step 3: After 4 marks (||||), the 5th mark crosses them diagonally: ||||. This makes groups of 5.',
              'Step 4: Count tally groups. Red: 1 group of 5 + 0 extra = 5. Blue: 1 group of 5 = 2 remaining = Wait, recount... (This teaches carefulness!)'
            ]
          },
          {
            explanation: 'Example 2: Building a Frequency Table',
            steps: [
              'Draw a table with 3 columns: Category, Tally, Frequency.',
              'Fill in Category column: Apple, Banana, Orange.',
              'Process raw data one item at a time, adding tally marks.',
              'Count tally groups. Each group of 5 = 5. Remaining marks = add extra.',
              'Write frequency (total count) in the Frequency column.'
            ]
          },
          {
            explanation: 'Example 3: The Error-Catching Power of Tally Groups',
            steps: [
              'A student counts 23 items by writing: 23 individual marks (takes forever, easy to miscount).',
              'Expert uses: ||| ||| ||| ||| ||| | (5 groups + 3 extra = clear, quick, hard to miscount).',
              'Because marks are grouped, you can instantly see "5 complete groups" = at least 25. If you see less, you know something\'s wrong.'
            ]
          },
          {
            explanation: 'Example 4: Speed Comparison',
            steps: [
              'Time to count 100 items by writing individual marks: 5+ minutes.',
              'Time to count 100 items with tally groups (20 groups): 1-2 minutes.',
              'Time to count 100 items by just reading organized tally: 10 seconds.',
              'This is why tally marks in groups of 5 are still used in professional surveys!'
            ]
          },
          {
            explanation: 'Example 5: Avoiding Common Mistakes',
            steps: [
              'WRONG: Making 6 marks for one group. ✗',
              'RIGHT: Always stop at 4, then cross with the 5th. ✓',
              'WRONG: Mixing up single marks and groups. ✗',
              'RIGHT: Keep marks organized; clearly separate each group of 5. ✓'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: The Purpose of Tally Marks',
            content: 'Tally marks are just a way to count. Instead of writing numbers (1, 2, 3, 4, 5), you draw marks ( | | | | | ). They\'re grouped by 5 because humans find it easier to recognize 5 things at a glance than 20 separate marks. It\'s like bundles — 10 pencils in a bundle is easier to count than 10 loose pencils scattered on a desk.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Why Groups of 5?',
            content: 'Humans naturally think in groups of 5 because we have 5 fingers. When you count on your fingers, you use one hand (5 fingers) as one unit. Groups of 5 make counting mentally efficient — you "see" 5 as one chunk. That\'s why tally marks use groups of 5, and that\'s why many currencies have 5-unit coins (5 rupees, 5 dollars, etc.).'
          },
          {
            level: 3,
            title: 'Interactive Practice: Tally Challenges',
            content: 'Practice 1: Use tally marks to count the letters in this sentence. Practice 2: Count the number of E\s in the alphabet (answer: 1). Practice 3: Create your own frequency table for eye colors in your class. Challenge: Can you think of situations where tally marks would be faster than a calculator?'
          }
        ],
        realWorldApplications: [
          'Market research surveys',
          'Restaurant food order tallying',
          'Sports referees counting fouls',
          'Wildlife habitat surveys',
          'Opinion polls'
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
        title: 'Types of Graphs: Pictographs',
        textContent: 'A pictograph represents data using pictures or symbols. Each symbol stands for a fixed number of items. A pictograph is ideal for showing quantities that are large or when visual appeal matters. Always include a KEY (LEGEND) showing what one symbol represents.',
        difficulty: 'medium',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'The Symbol That Tells a Story',
          scenario: 'Raj\'s school did a survey: "How many books did you read last month?" Results: Student A read 5, B read 10, C read 15, etc. Writing numbers (5, 10, 15) is boring. Using book symbols 📚 is exciting! A teacher shows Raj: 📚📚📚📚📚 = 25 books. Instantly, Raj understands "wow, that\'s a lot!" without even checking the number.',
          realWorldConnection: 'Pictographs are used in: newspaper infographics, children\'s books, marketing presentations, environmental reports (tree icons for forest coverage, rainfall drops for precipitation), and health reports (heart icons for cardiovascular data).',
          studentChallenge: 'You\'ll create your own pictograph using symbols to represent class data. The goal: make your graph so clear that someone can understand it without numbers!'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 80,
        videoEndSeconds: 120,
        videoCheckpointPrompt: 'Pause and answer: What does the KEY in a pictograph represent?',
        workedExamples: [
          {
            explanation: 'Example 1: Creating a Pictograph Scale',
            steps: [
              'Data: India produced 100 million cars, China produced 250 million cars.',
              'Choosing scale: 1 car symbol 🚗 = 50 million cars (chosen to fit nicely on paper).',
              'India: 100 ÷ 50 = 2 symbols. China: 250 ÷ 50 = 5 symbols.',
              'Draw: India: 🚗🚗. China: 🚗🚗🚗🚗🚗.',
              'Always include the KEY showing "🚗 = 50 million cars."'
            ]
          },
          {
            explanation: 'Example 2: Using Fractional Symbols',
            steps: [
              'Data: Country A has 75 trees, Country B has 100 trees.',
              'Scale: 1 tree symbol 🌲 = 50 trees.',
              'Country A: 75 ÷ 50 = 1.5 symbols. So draw: 🌲 + (half symbol 🌲/2).',
              'Country B: 100 ÷ 50 = 2 symbols. So draw: 🌲🌲.',
              'The KEY must show the full symbol and clearly indicate half-symbol value.'
            ]
          },
          {
            explanation: 'Example 3: Choosing Appropriate Symbols',
            steps: [
              'Data is about fruits sold. Symbol should be a fruit 🍎, not a person 👤.',
              'Data is about water usage. Symbol should be a drop 💧, not a car 🚗.',
              'Data is about students in sports. Symbol can be a player 🏃 or sport equipment ⚽.',
              'Rule: Symbol must be RELATED to the data for instant understanding.'
            ]
          },
          {
            explanation: 'Example 4: Scale Selection Matters',
            steps: [
              'If 1 symbol = 1 item, and data is 500-1000 items, the graph becomes TOO LARGE.',
              'If 1 symbol = 1000 items, and data ranges from 500-2000, many categories show incomplete symbols.',
              'Good scale: makes graph fit on paper (not too large), minimizes fractional symbols (not too small).',
              'Example: 500, 600, 700 items → scale of 1 symbol = 100 items works well.'
            ]
          },
          {
            explanation: 'Example 5: Reading a Pictograph',
            steps: [
              'Given pictograph: Apple: 🍎🍎🍎. Banana: 🍌🍌. Orange: 🍌🍌🍌.',
              'KEY: 🍎 = 20 apples. 🍌 = 20 bananas.',
              'Count symbols: Apple = 3 × 20 = 60. Banana = 2 × 20 = 40. Orange = 3 × 20 = 60.',
              'The graph instantly shows: Apple and Orange are equally popular, Banana less so.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Pictographs in Daily Life',
            content: 'You see pictographs every day — on weather apps (☀️ for sunny, 🌧️ for rainy), in health diagrams (❤️ for heart health), and in kids books. A pictograph is just a graph where numbers are replaced by pictures. Instead of saying "5 apples," you draw 🍎🍎🍎🍎🍎. It\'s simpler to understand at a glance.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Why Pictographs Matter',
            content: 'Pictographs are universal. A child in China, Brazil, or Kenya can understand a pictograph without reading a single word. That\'s why international organizations use them. Also, pictographs engage emotion — seeing 💪💪💪 (strength) feels better than reading "3 strength." This makes data memorable.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Design a Pictograph',
            content: 'Challenge 1: Collect data on favorite fruits in your class. Design a pictograph with appropriate symbols and scale. Challenge 2: Create a pictograph showing water usage (in liters) by different activities (shower, washing, cooking). Challenge 3: Find a pictograph online (health report, environmental data) and explain why that symbol was chosen.'
          }
        ],
        realWorldApplications: [
          'Weather app visualizations',
          'Health and fitness tracking apps',
          'Environmental reports (carbon footprint, pollution levels)',
          'Income distribution charts in newspapers',
          'Literacy rate infographics'
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
        title: 'Types of Graphs: Bar Graphs & Double Bar Graphs',
        textContent: 'A bar graph represents data using rectangular bars of equal width. The KEY RULE: GAPS must exist between bars. The horizontal axis shows categories, and the vertical axis shows frequency/values. A double bar graph compares TWO datasets for the same categories.',
        difficulty: 'medium',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Comparing Teams Using Bars',
          scenario: 'Two cricket teams played 5 matches. Team A scores: 150, 165, 140, 175, 160. Team B scores: 145, 160, 155, 170, 165. Looking at the lists, it\'s hard to say which team is better. But draw two bars side-by-side for each match… instantly, you see Team A has higher bars on average. That\'s the power of bar graphs!',
          realWorldConnection: 'Bar graphs are ubiquitous: news articles comparing countries\' GDP, election results (candidate A vs B), sports statistics (team performance), company sales by quarter, and school enrollment by year. Any comparison of values across categories uses bar graphs.',
          studentChallenge: 'You\'ll build your own bar graph using the BAR BUILDER game format, and analyze double bar graphs to make comparisons.'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 120,
        videoEndSeconds: 140,
        videoCheckpointPrompt: 'Pause and answer: When should you use a double bar graph?',
        workedExamples: [
          {
            explanation: 'Example 1: Drawing a Simple Bar Graph',
            steps: [
              'Data: Cricket team runs — Batsman A (50 runs), B (75), C (60), D (85).',
              'Step 1: Draw x-axis (horizontal) with 0 spacing between labels.',
              'Step 2: Draw y-axis (vertical) with frequency scale (0, 20, 40, 60, 80, 100).',
              'Step 3: For Batsman A, draw a bar from 0 to 50 (height = 50).',
              'Step 4: Leave a gap, then draw Batsman B bar (height = 75).',
              'Step 5: Repeat for C and D. All bars have equal width; gaps between them are equal.'
            ]
          },
          {
            explanation: 'Example 2: The Critical Rule — Gaps Between Bars',
            steps: [
              'WRONG: Drawing bars touching each other (||||||||). This is HISTOGRAM format.',
              'RIGHT: Drawing bars with gaps: | | | | . This is BAR GRAPH format.',
              'Why the difference? Bars represent CATEGORIES (sport, color, name). Categories are separate.',
              'Histograms represent CONTINUOUS DATA (heights 160-169, 170-179). These overlap, so no gaps.'
            ]
          },
          {
            explanation: 'Example 3: Reading a Bar Graph',
            steps: [
              'Given: A bar graph of test scores by subject. Math bar height = 85, Science = 75, English = 70.',
              'Reading: Align the top of each bar with the y-axis scale.',
              'Interpretation: Student did best in Math (85), worst in English (70).',
              'Comparison: Math is 15 points higher than Science (85 − 70 = 15).'
            ]
          },
          {
            explanation: 'Example 4: Creating a Double Bar Graph',
            steps: [
              'Data: Rainfall in City A (100mm) vs City B (120mm) for January. City A (80mm) vs B (150mm) for February.',
              'Draw x-axis with months (Jan, Feb). Draw y-axis with rainfall scale.',
              'For January, draw two bars: City A to 100, City B to 120 (place side-by-side with small gap).',
              'For February, draw two bars: City A to 80, City B to 150.',
              'Use different colors (or patterns) for City A and B. Include legend showing which color = which city.'
            ]
          },
          {
            explanation: 'Example 5: Interpreting Double Bar Graphs',
            steps: [
              'Looking at the double bar graph above, what story does it tell?',
              'January: Both cities have similar rainfall. City B slightly higher.',
              'February: Huge difference! City B has much heavier rainfall (150mm vs 80mm).',
              'Conclusion: City B experiences more dramatic seasonal rainfall variation.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Bars Show Amounts',
            content: 'A bar graph is like stacking blocks. Taller bars = bigger numbers. Shorter bars = smaller numbers. That\'s it. Bar graphs let you compare amounts at a glance. Looking at bars, you instantly see which is biggest without reading numbers. This is why bar graphs are so powerful.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Bars vs Histograms',
            content: 'Bar graphs have gaps because they show categories (separate groups). Histograms have no gaps because they show continuous ranges (where one range touches the next). Example: "Favorite color" (categories) uses bar graphs with gaps. "Height of students" (continuous ranges like 150-160, 160-170) uses histograms with no gaps. This is the fundamental difference that confuses many students — understanding this distinction will make you excellent at data visualization.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Build Your Own Double Bar Graph',
            content: 'Collect data for double bar comparison: Boys vs Girls in your class for each sport (cricket, badminton, tennis). Create a double bar graph. Analyze: Which sport is more popular among girls? Which among boys? Is there a gender difference in sport preferences? Present your findings to the class.'
          }
        ],
        realWorldApplications: [
          'Sales comparison across quarters',
          'Election results (candidate A vs B by region)',
          'Sports statistics (team A vs team B by season)',
          'Student performance across subjects',
          'Market share comparisons between companies'
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
        title: 'Reading & Interpreting Real Graphs',
        textContent: 'Real graphs from newspapers, reports, and websites often contain misleading features. A truncated y-axis (not starting from 0) can exaggerate differences. Unequal spacing can distort visual perception. Learning to read critically means checking the scale, noting the source, and questioning the data presentation.',
        difficulty: 'hard',
        estimatedTimeSeconds: 400,
        storyNarrative: {
          title: 'Fact vs Fiction: Are All Graphs Trustworthy?',
          scenario: 'A politician shows a graph claiming: "Economic growth is booming!" The graph shows sales jumping from 50 to 51. Looks impressive, right? But look at the y-axis — it starts at 45, not 0. The true 2% growth looks like a huge 90° jump! This is a LYING GRAPH. Raj learns to question graphs and uncover the truth.',
          realWorldConnection: 'Politicians, advertisers, and companies use misleading graphs daily. Toothpaste companies show graphs with truncated axes to make their product look better. Media outlets exaggerate trends with poor scaling. Learning to read graphs critically is a life skill — it makes you immune to manipulation!',
          studentChallenge: 'You\'ll analyze real-world graphs (some truthful, some misleading) and identify which are intentionally deceptive and why.'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 340,
        videoEndSeconds: 425,
        videoCheckpointPrompt: 'Pause and answer: Which graph clue can reveal misleading data?',
        workedExamples: [
          {
            explanation: 'Example 1: The Truncated Axis Trick',
            steps: [
              'Graph A: Bar from 0 to 50. Bar from 0 to 51. Visually similar heights.',
              'Graph B (misleading): Y-axis starts at 45. Bar 1 goes to 50 (very short). Bar 2 goes to 51 (very tall).',
              'Same data, different graphs. Graph B makes a 2% increase look like 400%!',
              'Red flag: Always check what the y-axis starts at. If not 0, be suspicious.'
            ]
          },
          {
            explanation: 'Example 2: Unequal Spacing Deception',
            steps: [
              'True data: 2020 (100), 2021 (200), 2022 (300), 2023 (400).',
              'Honest graph: Equal spacing, values double each year (honest).',
              'Deceptive graph: Cramped spacing for small growth years, huge spacing for big growth years.',
              'Visual impression: Growth looks inconsistent/dramatic when it\'s actually consistent.',
              'Red flag: Unequal spacing without mathematical reason = deception.'
            ]
          },
          {
            explanation: 'Example 3: Missing Context',
            steps: [
              'Graph shows: "Ice cream sales soar!" with sales jumping from 100 to 200.',
              'Context missing: Is this for a day? A season? A decade?',
              'True story: Ice cream sales are higher in summer (expected). Without time context, the graph is meaningless.',
              'Red flag: Graphs without clear time frames, units, or data source are suspicious.'
            ]
          },
          {
            explanation: 'Example 4: Contradictory Dual Axes',
            steps: [
              'Graph shows: Temperature (left y-axis, 0-40°C) and Rainfall (right y-axis, 0-500mm).',
              'Left axis scaled to make temperature look steady. Right axis scaled to make rainfall volatile.',
              'Same data, two different visual stories!',
              'Red flag: Dual axes without equal proportional scaling = deception.'
            ]
          },
          {
            explanation: 'Example 5: Identifying Honest vs Misleading Graphs',
            steps: [
              'Honest graph: Y-axis starts at 0, equal spacing, clear labels, cited source, recent data.',
              'Misleading graph: Truncated axis, weird spacing, unlabeled, no source, old data.',
              'Your role: As a student, learn to question graphs. Ask: "Who made this?" "What is the source?" "Does the scale look fair?"',
              'Become a graph detective! Protect yourself from lies.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Always Check the Axis',
            content: 'The most common graph lie is the truncated y-axis. If a graph\'s y-axis starts at 80 instead of 0, small differences look huge. Always look at what the axis starts with. If it doesn\'t start at 0 (and it\'s a bar/column graph), be careful. Ask yourself: "Why did they start here? Are they hiding something?"'
          },
          {
            level: 2,
            title: 'Deeper Explanation: The Psychology of Graphs',
            content: 'Humans judge visuals emotionally before reading numbers. A tall bar feels "bigger" even if the difference is tiny. This is why misleading graphs work — they exploit visual perception. Advertisers and politicians know this. They manipulate graphs to trigger emotions (fear, excitement, pride). Learning to read graphs critically means you\'re learning to protect yourself from emotional manipulation.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Graph Detectives',
            content: 'Challenge 1: Find a graph in a news article online. Analyze: Is the y-axis fair? Are the axes labeled clearly? What story is the graph telling? Is the story supported by the actual data? Challenge 2: Take honest data and create two graphs — one honest, one deceptive. Show both to classmates and see if they notice the difference. Challenge 3: Follow a company or politician you know and analyze how they present data in their reports. Are their graphs fair?'
          }
        ],
        realWorldApplications: [
          'Political campaign advertising',
          'Company financial reports',
          'News media infographics',
          'Social media data visualizations',
          'Marketing and product comparisons',
          'COVID-19 pandemic statistics'
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
        title: 'Class Data Project: Be a Data Detective',
        textContent: 'Apply everything you\'ve learned! Collect real data from your class, organize it using frequency tables and tally marks, and create graphs (pictograph, bar graph, or both). Present your findings to the class. This is how real data scientists work.',
        difficulty: 'medium',
        estimatedTimeSeconds: 600,
        storyNarrative: {
          title: 'Be a Data Detective in Your Class',
          scenario: 'Raj decides to investigate: "What is the true favorite food in Class 8?" He collects data by surveying all 40 students. Results are messy: "Dosa, Pizza, Dosa, Dosa, Pizza, Burger, Biryani…" Using frequency tables, tally marks, and bar graphs, Raj discovers: Dosa is #1 (15 students), Pizza #2 (12), Burger #3 (8), Biryani #4 (5). He presents this to the class. Mrs. Patel uses this data to improve the cafeteria menu. Raj becomes a hero!',
          realWorldConnection: 'Companies hire data scientists to do exactly this. Researchers use these methods to answer questions about society. Government uses data collection for census (population surveys). Your work here mirrors real-world data analysis!',
          studentChallenge: 'You will become a data detective. Choose a question about your class, collect data, organize it, visualize it, and present findings.'
        },
        videoUrl: MODULE_2_1_SHARED_VIDEO_URL,
        videoStartSeconds: 425,
        videoEndSeconds: 520,
        videoCheckpointPrompt: 'Pause and answer: What are the 3 steps in your class data project?',
        workedExamples: [
          {
            explanation: 'Example Project 1: Favorite Sport Survey',
            steps: [
              'Question: "Which sport is most popular in our class?"',
              'Data collection: Ask all 35 classmates, record responses.',
              'Organization: Create frequency table. Cricket (12), Badminton (10), Tennis (8), Football (5).',
              'Visualization: Draw bar graph. Cricket bar is tallest.',
              'Presentation: "Cricket is most popular (12 students). Badminton is close (10). Football is least popular (5)."',
              'Insight: Maybe the school should invest more cricket equipment!'
            ]
          },
          {
            explanation: 'Example Project 2: How Much Sleep Do Students Get?',
            steps: [
              'Question: "How many hours of sleep do 8th graders get on average?"',
              'Data collection: Ask 30 students about yesterday\'s sleep (8h, 6h, 9h, 7h, etc.).',
              'Organization: Group into intervals (6-7h, 7-8h, 8-9h, 9-10h). Create frequency table.',
              'Visualization: Draw histogram (no gaps because continuous data). Most students cluster 7-8h.',
              'Presentation: "Most students (22) sleep 7-8 hours. Some (5) sleep 6-7, few (3) sleep 8+ hours."',
              'Insight: Most students get healthy sleep amounts!'
            ]
          },
          {
            explanation: 'Example Project 3: Comparing Boys\' and Girls\' Preferences',
            steps: [
              'Question: "Do boys and girls like the same foods?"',
              'Data collection: Ask 20 boys and 20 girls about 3 foods.',
              'Organization: Create two frequency tables (one for boys, one for girls).',
              'Visualization: Draw double bar graph (boys vs girls for each food).',
              'Presentation: "Pizza is popular among both. Boys prefer Biryani; girls prefer Dosa. They differ!"',
              'Insight: Gender influences food preferences in our class.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Project Steps Overview',
            content: 'Step 1: Ask a question. Step 2: Collect data (ask friends/family). Step 3: Organize using tables and tally marks. Step 4: Draw a graph (bar, pictograph, or histogram). Step 5: Write findings (which category is most popular, any patterns?). Step 6: Present to class. That\'s it! You\'re now a data analyst!'
          },
          {
            level: 2,
            title: 'Deeper Explanation: From Data to Insight',
            content: 'Raw data is just numbers. But when you organize and visualize data, you discover stories. Example: If you survey "favorite subject" and find Math is #1, you can conclude "most students like Math" or "we need more fun Math activities." Data is useless without interpretation. Your job is to look at the graph and ask: "What does this mean? Why does this pattern exist? What should we do with this information?"'
          },
          {
            level: 3,
            title: 'Interactive Practice: Design Your Own Survey',
            content: 'Project guidance: (1) Choose a question about your class (favorite subject, breakfast, extracurricular activity, etc.). (2) Decide how to collect data (survey, observation, count). (3) Aim for at least 30 responses. (4) Organize using tally marks and frequency table. (5) Create at least one graph. (6) Write 3-5 sentences explaining findings. (7) Present to class (2-3 min talk). Good projects investigate real, interesting questions and present data honestly.'
          }
        ],
        realWorldApplications: [
          'Market research for businesses',
          'Public health surveys',
          'Environmental impact studies',
          'Student satisfaction feedback',
          'Product rating analysis'
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

export const module_1: Module = filterModuleByPath(moduleData, 'B');
