import { Module, GameFormat, Question } from '../types';
import { q_tally_7 } from './questions/q_tally_7';
import { q_pictograph_300 } from './questions/q_pictograph_300';
import { q_chance_blue } from './questions/q_chance_blue';
import { q_improvement_40 } from './questions/q_improvement_40';
import { q_pie_chocolate } from './questions/q_pie_chocolate';
import { q_interval_25 } from './questions/q_interval_25';
import { q_books_raj } from './questions/q_books_raj';
import { q_science_fraction } from './questions/q_science_fraction';
import { q_spinner_blue } from './questions/q_spinner_blue';
import { inline_2_1_q1, inline_2_1_q2, inline_2_1_q3, inline_2_1_q4 } from './questions/inline_2_1';
import { inline_2_2_q1, inline_2_2_q2, inline_2_2_q3, inline_2_2_q4 } from './questions/inline_2_2';
import { inline_2_3_q1, inline_2_3_q2, inline_2_3_q3, inline_2_3_q4 } from './questions/inline_2_3';
import { inline_2_4_q1, inline_2_4_q2, inline_2_4_q3, inline_2_4_q4, inline_2_4_q5 } from './questions/inline_2_4';
import { post_q1, post_q2, post_q3, post_q4, post_q5, post_q6, post_q7, post_q8, post_q9, post_q10 } from './questions/post_test';

const MODULE_2_1_SHARED_VIDEO_URL = '/Why_Do_We_Need_to_Organise_Data_.mp4';

export const chapterData: Module[] = [
  {
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
  },
  {
    id: '2.2',
    title: 'Grouping Data & Histograms',
    concepts: [
      {
        id: 'c2_2_1',
        title: 'Class Intervals',
        textContent: 'When we have a large amount of data, we group it into intervals like 0-10, 10-20, etc. These are called class intervals. The smaller number is the Lower Class Limit, and the larger is the Upper Class Limit. Class Width = Upper Limit - Lower Limit. Class Mark (Midpoint) = (Lower Limit + Upper Limit) / 2.',
        videoUrl: 'https://www.youtube.com/embed/placeholder4',
        workedExamples: [
          {
            explanation: 'The Boundary Convention',
            steps: [
              'A value equal to the upper limit belongs to the NEXT (higher) class.',
              'Suppose a student scored exactly 20. Class intervals are 10–20 and 20–30.',
              '→ 20 belongs to 20–30 (the higher class), NOT 10–20.',
              'This is a RULE, not a choice. It prevents any value from being counted twice.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_2_q1,
            ...inline_2_2_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'c2_2_2',
        title: 'What Is a Histogram?',
        textContent: 'A histogram is a bar graph for GROUPED NUMERICAL data (class intervals). The most important rule: bars in a histogram have NO GAPS. They touch each other because class intervals are continuous. The horizontal axis shows the CLASS INTERVAL SCALE, and the vertical axis shows FREQUENCY.',
        videoUrl: 'https://www.youtube.com/embed/placeholder5',
        workedExamples: [
          {
            explanation: 'How to Draw a Histogram',
            steps: [
              'Draw the horizontal (x) axis and mark the class interval boundaries.',
              'Draw the vertical (y) axis and mark frequency values.',
              'Draw bars for each class with height equal to frequency.',
              'Ensure all bars touch — NO gaps.',
              'If the x-axis does not start from 0, draw a BREAK MARK (∧).'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_2_q2,
            ...inline_2_2_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium'
          },
          {
            ...inline_2_2_q3,
            ...inline_2_2_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_2_q4,
            ...inline_2_2_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          }
        ]
      }
    ]
  },
  {
    id: '2.3',
    title: 'Pie Charts / Circle Graphs',
    concepts: [
      {
        id: 'c2_3_1',
        title: 'What Is a Pie Chart?',
        textContent: 'A pie chart is a CIRCLE divided into SECTORS (wedge-shaped pieces). Each sector represents ONE CATEGORY of data. The SIZE of a sector is PROPORTIONAL to the value it represents. The whole circle = 360° = 100% of the data. The CENTRAL ANGLE of a sector is the angle at the centre of the circle for that slice.',
        videoUrl: 'https://www.youtube.com/embed/placeholder6',
        workedExamples: [
          {
            explanation: 'Central Angle Formula',
            steps: [
              'Central Angle = (Value ÷ Total) × 360°',
              'If given as percentage: Central Angle = (Percentage ÷ 100) × 360°',
              'Verify: ALL central angles must SUM to EXACTLY 360°.'
            ]
          },
          {
            explanation: 'Reverse Calculation',
            steps: [
              'You are GIVEN the pie chart (percentages or angles) and asked to find ACTUAL VALUES.',
              'Formula: Value = (Central Angle ÷ 360°) × Total',
              'Or: Value = (Percentage ÷ 100) × Total',
              'Alternative "chain method": find the value of 1%, then scale up.'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_3_q1,
            ...inline_2_3_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_3_q2,
            ...inline_2_3_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium'
          },
          {
            ...inline_2_3_q3,
            ...inline_2_3_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'hard'
          },
          {
            ...inline_2_3_q4,
            ...inline_2_3_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          }
        ]
      }
    ]
  },
  {
    id: '2.4',
    title: 'Chance & Probability',
    concepts: [
      {
        id: 'c2_4_1',
        title: 'Probability Formula',
        textContent: 'Probability is the mathematics of CHANCE. It gives us a way to measure and compare how likely events are. A Random Experiment is an experiment whose outcome CANNOT be predicted in advance. Sample Space (S) is the COMPLETE SET of all equally likely outcomes. An Event (E) is one or more outcomes from the sample space.',
        videoUrl: 'https://www.youtube.com/embed/placeholder7',
        workedExamples: [
          {
            explanation: 'The Probability Formula',
            steps: [
              'P(Event) = Number of Favourable Outcomes / Total Number of Equally Likely Outcomes',
              'Range: P is ALWAYS between 0 and 1 (0 ≤ P ≤ 1).',
              'P=0 → Impossible. P=1 → Certain. P=0.5 → Equally likely to happen or not.',
              'Complement Rule: P(E) + P(not E) = 1, therefore P(not E) = 1 − P(E)'
            ]
          }
        ],
        questions: [
          {
            ...inline_2_4_q1,
            ...inline_2_4_q1.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q2,
            ...inline_2_4_q2.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'easy'
          },
          {
            ...inline_2_4_q3,
            ...inline_2_4_q3.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium'
          },
          {
            ...inline_2_4_q4,
            ...inline_2_4_q4.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'hard'
          },
          {
            ...inline_2_4_q5,
            ...inline_2_4_q5.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'hard'
          }
        ]
      }
    ]
  },
  {
    id: '2.5',
    title: 'Real-World Data Applications',
    concepts: [
      {
        id: 'c2_5_1',
        title: 'Data in Sports & Gaming',
        textContent: 'Sports teams use data to make winning decisions. Cricket teams analyse batting averages, bowling statistics, and field placements. Gaming companies track player behaviour, win rates, and item popularity. By organising this data, teams win championships and games become more fun.',
        difficulty: 'medium',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Champion\'s Secret Weapon: How Data Wins Games',
          scenario: 'The Indian cricket team was losing matches. Coach Sharma realized: "We have the data — player statistics, opposition weaknesses, match conditions — but we\'re not using it!" She hired a data analyst. Within 6 months, by organizing player performance data and opponent patterns, the team won the World Cup. Data = Strategy = Victory!',
          realWorldConnection: 'Every professional sports team (IPL, Premier League, NBA, FIFA) has a data analytics department. Athletes track: heart rate, speed, agility, accuracy. Teams use this data to choose players, plan strategies, and win championships.',
          studentChallenge: 'You will analyse real cricket statistics and predict which player should play next based on data, just like professional coaches do!'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_sports',
        workedExamples: [
          {
            explanation: 'Example 1: Cricket Batting Average',
            steps: [
              'Player A: scored 50, 75, 60, 85 runs in 4 matches.',
              'Average = (50+75+60+85) ÷ 4 = 270 ÷ 4 = 67.5 runs per match',
              'Player B: scored 40, 45, 42, 48 runs in 4 matches. Average = 43.75',
              'Decision: Hire Player A (higher average).'
            ]
          },
          {
            explanation: 'Example 2: Win Rate Analysis',
            steps: [
              'Team A won: 12 games out of 20 total. Win rate = 12÷20 = 60%',
              'Team B won: 15 games out of 25 total. Win rate = 15÷25 = 60%',
              'Draw: Same win rate, but Team B\'s consistency is better (fewer losses).',
              'Real decision: Compare not just win rate but also consistency and recent form.'
            ]
          },
          {
            explanation: 'Example 3: Gaming Item Popularity',
            steps: [
              'Survey 100 players: 35 prefer sword, 28 prefer magic staff, 37 prefer bow.',
              'Organize: Sword=35%, Magic=28%, Bow=37%.',
              'Decision: Make bow more powerful/available in the game to increase engagement.',
              'Result: Players are happier, game sales increase.'
            ]
          },
          {
            explanation: 'Example 4: Field Position Strategy',
            steps: [
              'Batsman A hits left 60% of the time, straight 25%, right 15%.',
              'Place fielders on the left side (most vulnerable).',
              'Batsman A scores fewer runs against this strategy.',
              'Coach Sharma uses data to win! This is why data = winning.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Sports Uses Numbers',
            content: 'Every sport uses numbers—scores, averages, winning percentages. When you organize these numbers, you can make better decisions. If a batter has a 67% accuracy, they\'re better than someone with 45% accuracy. Data shows the truth!'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Strategy Through Data',
            content: 'Professional coaches don\'t rely on gut feeling. They use data: "Player X fails against left-arm spinners 70% of the time" → avoid playing Player X against left-arm spinners. This data-driven strategy makes teams unbeatable.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Be a Sports Analyst',
            content: 'You are hired as a sports analyst for the Indian cricket team. Given player statistics (batting average, recent form, success rate against specific bowlers), choose the best playing XI. Justify your choices using data. Real coaches do this every day!'
          }
        ],
        realWorldApplications: [
          'Professional cricket team selection',
          'NFL player draft decisions',
          'Esports team strategy optimization',
          'Video game balancing based on usage statistics',
          'Injury prevention through performance tracking'
        ],
        questions: [
          {
            id: 'c2_5_1_q1',
            text: 'A cricket player scored 45, 60, 50, and 55 runs in 4 matches. What is their average score?',
            options: ['52.5', '55', '57.5', '60'],
            correctAnswer: '52.5',
            format: GameFormat.RAINDROP,
            difficulty: 'medium',
            hint: 'Add all scores and divide by the number of matches.',
            remedialBrief: 'Average = Sum ÷ Count. (45+60+50+55) ÷ 4 = 210 ÷ 4 = 52.5',
            remedialDetail: 'This is exactly what sports analysts do! They calculate averages to compare player performances. Player with higher average is usually better.'
          }
        ]
      },
      {
        id: 'c2_5_2',
        title: 'Data in Business & Marketing',
        textContent: 'Businesses collect data on customer preferences, sales trends, and competitor prices. By analysing this data, companies decide: which products to stock, how to price, which customers to target. Amazon, Flipkart, and every successful business uses data to make money.',
        difficulty: 'medium',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'The Shopkeeper\'s Smart Decision',
          scenario: 'Raja runs a small shop. He was losing business to big stores like Amazon. One day, he started tracking: "Which items do customers ask for?" Within a month, his data showed: Everyone wants phone cases, but I stock only shirts! He changed inventory based on data. In 3 months, his profit doubled!',
          realWorldConnection: 'Target, Walmart, IKEA, and every successful business have entire teams analyzing customer data. They know: "What time do people shop?" "Which products are trending?" "Should we increase prices?" Data = Smart Business Decisions = Success',
          studentChallenge: 'You will help Raja organize customer data and predict which products he should stock next month to maximize profit!'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_business',
        workedExamples: [
          {
            explanation: 'Example 1: Product Popularity Check',
            steps: [
              'Last month, customers asked for: Phone cases 45 times, Chargers 30 times, Headphones 15 times.',
              'Organize: Phone cases (45) > Chargers (30) > Headphones (15)',
              'Decision: Stock 100 phone cases, 60 chargers, 30 headphones next month.',
              'Result: Fewer unsold items, happier customers, more profit.'
            ]
          },
          {
            explanation: 'Example 2: Flash Sale Timing',
            steps: [
              'Track daily sales: Monday-Thursday are slow (20 customers/day). Friday-Sunday are busy (80 customers/day).',
              'Insight: People shop on weekends!',
              'Strategy: Have a big sale Friday-Sunday. Stock fewer items Monday-Thursday.',
              'Result: Better inventory management, less storage cost.'
            ]
          },
          {
            explanation: 'Example 3: Customer Segmentation',
            steps: [
              'Survey 100 customers: 40 are students, 35 are office workers, 25 are housewives.',
              'Insight: Students want budget items, office workers want premium items.',
              'Strategy: Advertise differently to each group. Students: "Buy cheap, save money!" Office: "Premium quality, impress your image!"',
              'Result: Higher conversion rate, more sales.'
            ]
          },
          {
            explanation: 'Example 4: Competitor Price Analysis',
            steps: [
              'Raja checked prices: Amazon charges ₹500 for charger, local shop charges ₹450, Flipkart ₹480.',
              'Insight: Customers prefer cheaper options.',
              'Decision: Price at ₹470 (cheaper than rivals, but higher margin than local).',
              'Result: Customers switch to Raja. More business!'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Businesses Use Numbers',
            content: 'Every business asks: "What do customers want?" "How much should I charge?" "When is my busy season?" By organizing data about customer behavior, business owners make smart decisions that earn more profit.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Data-Driven Business',
            content: 'Companies like Amazon know exactly what you want BEFORE you know you want it! How? Data! They track your browsing, comparing with millions of other customers, and recommend products you\'ll probably buy. This is why top businesses are so successful—they use data!'
          },
          {
            level: 3,
            title: 'Interactive Practice: Your Own Shop Strategy',
            content: 'Imagine you open a café. You collect data: Mondays 50 customers, Fridays 150 customers. Coffee sales up 30% in winter. Young people prefer cold drinks, older people prefer hot. Based on this data, plan your strategy: inventory, staffing, pricing, marketing. Present why your decisions are smart!'
          }
        ],
        realWorldApplications: [
          'E-commerce recommendation systems (Amazon, Flipkart)',
          'Retail inventory management (Walmart, Target)',
          'Pricing strategy optimization',
          'Customer segmentation for marketing',
          'Social media engagement analytics'
        ],
        questions: [
          {
            id: 'c2_5_2_q1',
            text: 'A shop sold: Monday 30 items, Tuesday 35, Wednesday 28, Thursday 32, Friday 50. On which day was the best sale?',
            options: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
            correctAnswer: 'Friday',
            format: GameFormat.RAINDROP,
            difficulty: 'easy',
            hint: 'Find the day with the highest number of items sold.',
            remedialBrief: 'Compare all days: 30, 35, 28, 32, 50. Friday (50) is the highest.',
            remedialDetail: 'A smart shopkeeper would stock MORE items on Friday because that\'s when customers buy the most. This is how data helps business!'
          }
        ]
      },
      {
        id: 'c2_5_3',
        title: 'Data in Health & Environment',
        textContent: 'Doctors use data to diagnose diseases. Environmentalists use data to track pollution and protect nature. Governments use data to plan cities and predict climate. Data saves lives and protects our planet.',
        difficulty: 'medium',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Doctor Sharma Saves Lives With Data',
          scenario: 'Dr. Sharma analysed health data from 5000 patients in her hospital. She found: "Patients smoking cigarettes have 8x higher lung cancer risk." She warned her patients. 200 people quit smoking. Within 5 years, cancer cases dropped 40%. By organizing medical data, Dr. Sharma saved hundreds of lives!',
          realWorldConnection: 'During COVID-19, scientists tracked infection data across countries. This data helped governments decide lockdowns, testing strategies, and vaccine priorities. Without data, millions more would have died. Data literally saves lives!',
          studentChallenge: 'You will analyse health statistics from your school and recommend ways to improve student health based on data.'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_health',
        workedExamples: [
          {
            explanation: 'Example 1: Disease Risk Analysis',
            steps: [
              'Data: Out of 100 smokers, 15 developed lung disease. Out of 100 non-smokers, 2 developed lung disease.',
              'Risk: Smokers = 15%, Non-smokers = 2%',
              'Insight: Smoking increases disease risk by 7.5x!',
              'Action: Launch anti-smoking campaign to save lives.'
            ]
          },
          {
            explanation: 'Example 2: Pollution Tracking',
            steps: [
              'Measure air pollution (PM2.5) in different cities: City A (350), City B (180), City C (95).',
              'Insight: City A is 3.7x more polluted than City C!',
              'Decision: City A needs urgent pollution control measures.',
              'Action: Ban factories, promote green vehicles, plant trees. Pollution drops.'
            ]
          },
          {
            explanation: 'Example 3: Vaccination Coverage',
            steps: [
              'Survey: 85% of children in Village A are vaccinated. 40% in Village B.',
              'Insight: Village B has low immunity!',
              'Decision: Run vaccination camp in Village B.',
              'Result: Diseases prevented, children stay healthy.'
            ]
          },
          {
            explanation: 'Example 4: Water Quality Monitoring',
            steps: [
              'Test water: pH = 7 (safe), Bacteria = 500 (safe), Chemicals = 2.1 (high!)',
              'Insight: Chemical levels are unsafe. Drinking this water causes diarrhea.',
              'Action: Install water filtration, reduce industrial discharge.',
              'Result: Diarrhea cases drop 80%.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Health Data Saves Lives',
            content: 'Doctors track numbers: temperature, blood pressure, sugar levels. By comparing YOUR numbers to healthy ranges, doctors diagnose disease early. Numbers = Health = Life saved!'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Public Health Through Data',
            content: 'Governments track: infection rates, death rates, hospital capacity. During pandemics, this data decides: "Do we need lockdowns?" "Are hospitals overwhelmed?" "Is vaccine working?" Data-driven health policy saves millions of lives!'
          },
          {
            level: 3,
            title: 'Interactive Practice: School Health Investigation',
            content: 'Collect health data from your school: How many students exercise regularly? How many eat fruits daily? How many sleep 8+ hours? Organize this data. Find patterns. Recommend interventions. Example: "75% of students sleep <7 hours. Recommendation: Schools should start later so students sleep more." Real public health officials do this work!'
          }
        ],
        realWorldApplications: [
          'Disease diagnosis and treatment planning',
          'Epidemiological tracking (COVID, flu)',
          'Environmental pollution monitoring',
          'Climate change prediction via temperature data',
          'Water quality testing and management',
          'Vaccination coverage planning'
        ],
        questions: [
          {
            id: 'c2_5_3_q1',
            text: 'If 8 out of 50 students in a school have asthma, what is the percentage?',
            options: ['10%', '16%', '20%', '25%'],
            correctAnswer: '16%',
            format: GameFormat.RAINDROP,
            difficulty: 'medium',
            hint: 'Percentage = (Part ÷ Total) × 100. (8 ÷ 50) × 100',
            remedialBrief: '(8 ÷ 50) × 100 = 0.16 × 100 = 16%',
            remedialDetail: 'Doctors use this data to recommend: "This school has above-average asthma rates. We should improve air quality and provide medical support."'
          }
        ]
      }
    ]
  },
  {
    id: '2.6',
    title: 'Data Ethics & Critical Thinking',
    concepts: [
      {
        id: 'c2_6_1',
        title: 'Identifying Misleading Data Presentations',
        textContent: 'Not all data presentations are honest. Politicians, companies, and even news channels manipulate graphs to trick you. A truncated axis (starting not at 0) can make small differences look huge. Learning to spot these tricks makes you immune to manipulation.',
        difficulty: 'hard',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Detective Raj Uncovers Data Manipulation',
          scenario: 'A politician claimed: "My policies created a jobs boom!" The graph showed unemployment dropping from 5% to 4.8%. Looks impressive? But the y-axis started at 0.5%, not 0! The 0.2% drop looked like a massive 90° drop. Raj, now a data detective, exposed the lie. The real truth: unemployment barely changed. The politician lost the election. This is why data literacy is a superpower!',
          realWorldConnection: 'Major news outlets, corporations, and politicians use misleading graphs every day. Toothpaste companies claim "100% whiter teeth!" based on cherry-picked data. Election campaigns manipulate graphs to exaggerate achievements. Learning to spot lies = protecting yourself from manipulation.',
          studentChallenge: 'You will be given 5 graphs—some honest, some deceptive—and identify which are lies. Then you\'ll create your own deceptive graph to understand HOW people manipulate data.'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_ethics1',
        workedExamples: [
          {
            explanation: 'Example 1: Truncated Axis Deception',
            steps: [
              'Honest graph: Y-axis 0 → 100. Company A (45%) and B (47%) bars look nearly same.',
              'Deceptive graph: Y-axis 40 → 50. Company B bar suddenly towers over A!',
              'Same data, different impression. Deceptive graph exaggerates a 2% difference into appearing 400% larger!',
              'Red flag: Always check Y-axis starting point. If not 0 (for bar graphs), be suspicious.'
            ]
          },
          {
            explanation: 'Example 2: Cherry-Picked Time Period',
            steps: [
              'Stock price went: 2020 ($10), 2021 ($5), 2022 ($4), 2023 ($8), 2024 ($15).',
              'Honest report: "Volatile but recovering from low"',
              'Deceptive report: Graph shows only 2023-2024, claiming "Stock soared 88%!"',
              'Truth: Ignored the 60% crash in 2021-2022 before recovery.',
              'Red flag: Look for missing context. Are they showing the full story?'
            ]
          },
          {
            explanation: 'Example 3: Misleading Visual Proportions',
            steps: [
              'Data: Profit doubled from ₹10 Cr to ₹20 Cr (100% growth).',
              'Honest bar graph: Bar B twice height of Bar A.',
              'Deceptive: Show Bar B with 4x width AND 4x height (16x visual growth!). Humans compare area, not height.',
              'Same 100% growth looks like 1600% growth!',
              'Red flag: 3D graphs, fancy colors, unusual proportions = often deceptive.'
            ]
          },
          {
            explanation: 'Example 4: Missing Data / Biased Sampling',
            steps: [
              'Poll asked: "Do you support the new phone?" Only asked 100 iPhone users.',
              'Result: 92% say "Yes!"',
              'Deceptive: Ignores Android users, older phone users, people who can\'t afford phones.',
              'Truth: Real opinion might be 40% (if all groups were surveyed).',
              'Red flag: Who was surveyed? Is the sample fair? Could bias exist?'
            ]
          },
          {
            explanation: 'Example 5: Correlation ≠ Causation',
            steps: [
              'Data: As ice cream sales increase, drowning deaths increase.',
              'False conclusion: "Ice cream causes drowning!"',
              'Truth: Both increase because summer is hot. Hot → People eat ice cream AND go swimming → Some drown.',
              'The DATA is true but the INTERPRETATION is wrong!',
              'Red flag: Be careful when data shows two things changing together. Usually there\'s a third cause.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Question Graphs',
            content: 'When you see a graph in a news article, advertisement, or social media, ask: "Does the axis start at 0?" "Who made this graph?" "Are they trying to convince me of something?" Skepticism keeps you safe from manipulation.'
          },
          {
            level: 2,
            title: 'Deeper Explanation: The Psychology of Deception',
            content: 'Humans judge visuals emotionally before reading numbers. A tall bar FEELS significant, even if it\'s just a 2% change. Advertisers know this. They exploit it to sell products. By understanding HOW manipulation works, you develop immunity to it. You become hard to fool!'
          },
          {
            level: 3,
            title: 'Interactive Practice: Create Deceptive Graphs',
            content: 'Challenge 1: Take honest data and create 3 deceptive versions. Can your classmates spot the lies? Challenge 2: Find misleading graphs in real ads/news. Write a report explaining what\'s deceptive. Challenge 3: Create a campaign: "Read graphs like a detective!" posters to teach your school about data manipulation. Be a data literacy activist!'
          }
        ],
        realWorldApplications: [
          'Protecting yourself from political propaganda',
          'Understanding advertisement claims critically',
          'Analyzing company financial reports honestly',
          'Evaluating news media credibility',
          'Social media statistics verification'
        ],
        questions: [
          {
            id: 'c2_6_1_q1',
            text: 'A graph shows unemployment dropping from 5.0% to 4.9%. The y-axis starts at 4.5%. Is this graph deceptive?',
            options: ['Yes, the y-axis is truncated', 'No, it\'s accurate', 'It depends on context', 'Maybe, need more info'],
            correctAnswer: 'Yes, the y-axis is truncated',
            format: GameFormat.RAINDROP,
            difficulty: 'hard',
            hint: 'For bar graphs, if the axis doesn\'t start at 0, small differences look huge.',
            remedialBrief: 'Starting the y-axis at 4.5% instead of 0% makes a 0.1% drop appear as 10% visually. This is the classic truncated axis trick!',
            remedialDetail: 'An honest graph would start the y-axis at 0%, making the 0.1% change look tiny (which it is). The deceptive truncation makes politicians look better than they are.'
          }
        ]
      },
      {
        id: 'c2_6_2',
        title: 'Bias in Data Collection',
        textContent: 'If you only survey iPhone users, you get biased data. If you only measure student happiness in a classroom (not including dropouts), you miss unhappy students. Recognizing bias in data means recognizing incomplete truths.',
        difficulty: 'hard',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'The Invisible Bias: When Data Lies By Omission',
          scenario: 'A school claims: "95% of students love our new curriculum!" But Raj discovers: They only surveyed the top 10% of students (high achievers). Struggling students had already dropped out. By ignoring dropouts, the school painted a false picture of success. The TRUE picture: 60% of all students (including dropouts) are struggling. Raj\'s investigation revealed the bias.',
          realWorldConnection: 'Tech companies are biased: AI trained mostly on white faces fails to recognize dark skin. News outlets report on wealthy neighborhoods, ignoring poor ones. These biases make data SEEM balanced but are actually incomplete. Recognizing bias = seeking the truth.',
          studentChallenge: 'You will design a FAIR survey about "favorite subject in school," choosing an unbiased sample that represents every student type (top performers, average, struggling, special needs).  Then design a BIASED version and show how it misleads!'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_ethics2',
        workedExamples: [
          {
            explanation: 'Example 1: Selection Bias',
            steps: [
              'Poll: "Do you like the new school uniform?" Only surveyed students WHO ARE PRESENT today.',
              'Skipped: Absent students, dropped-out students, sick students.',
              'Result: 89% say "Yes!" But absentees might have different opinion.',
              'Fair survey: Survey all student groups—present, absent, dropped-out.',
              'Result might be: 60% yes (more honest).'
            ]
          },
          {
            explanation: 'Example 2: Self-Selection Bias',
            steps: [
              'YouTuber asks viewers: "Do you love my videos?" in a poll.',
              'Who responds? Fans who watch and love videos.',
              'Who doesn\'t respond? Haters who don\'t watch, or quit watching.',
              'Result: 95% say "Yes!" But true opinion might be 40% (if haters responded).',
              'Fair method: Randomly survey ALL viewers (including those who quit).'
            ]
          },
          {
            explanation: 'Example 3: Survivor Bias',
            steps: [
              'Study: "Does our university produce successful graduates?"',
              'Data: Survey only graduates who stayed in touch (successful ones).',
              'Missing: Dropouts, unemployed graduates, graduates who moved away.',
              'Result: 80% are successful! But maybe only 30% true success if counting all?',
              'Fair method: Find and survey ALL graduates, including "lost contact" ones.'
            ]
          },
          {
            explanation: 'Example 4: Confirmation Bias',
            steps: [
              'Researcher believes: "Girls are better at math."',
              'Data collection: Focuses on girls\' math achievements, ignores failures.',
              'Result: "Girls rock at math!" But selectively collected data.',
              'Fair method: Collect ALL results equally—successes AND failures—for both genders.',
              'Analysis might show: No real difference between boys and girls.'
            ]
          },
          {
            explanation: 'Example 5: Availability Bias',
            steps: [
              'Question: "Which is more common, car accidents or plane crashes?"',
              'Most say plane crashes (we remember dramatic news).',
              'Truth: Car accidents = 1.3 million deaths/year. Plane crashes = 400/year.',
              'Car accidents are 3000x more common but feel less common because they\'re not dramatic news.',
              'Lesson: Don\'t rely on memory. Use REAL DATA.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Whose Data Are We Missing?',
            content: 'Every survey has people who don\'t answer. Every sample misses some group. The question is: Does that missing group have different opinions? If YES, the data is biased. Always ask: "Who\'s NOT in this data? Would they have different answers?"'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Structural Bias in Data',
            content: 'Some groups are naturally less represented in data. Poor people don\'t have internet = missing from online surveys. Shy people don\'t participate = survey skews toward outgoing types. Old people don\'t use phones = app surveys miss them. These structural biases are hard to see but make data unreliable for certain decisions.'
          },
          {
            level: 3,
            title: 'Interactive Practice: Designing Fair Surveys',
            content: 'Challenge 1: Design a FAIR survey about "favorite sport" that includes: boys, girls, disabled students, new students, rural students, rich, poor, athletes, non-athletes. Make sure all groups are proportionally represented. Challenge 2: Redesign it to be BIASED (easy!). Show how bias changes "results." Challenge 3: Audit a real survey online. Does it have bias? What groups are missing?'
          }
        ],
        realWorldApplications: [
          'Clinical trial design (must include diverse populations)',
          'Political polling (representative sample essential)',
          'Product testing (must include all user types)',
          'Research methodology standardization',
          'Understanding social media echo chambers'
        ],
        questions: [
          {
            id: 'c2_6_2_q1',
            text: 'A school surveyed student satisfaction by asking only students who are present today. Is this sample biased?',
            options: ['Yes, it excludes absent and dropout students', 'No, present students represent all', 'Only if absence rate is high', 'Cannot determine'],
            correctAnswer: 'Yes, it excludes absent and dropout students',
            format: GameFormat.RAINDROP,
            difficulty: 'hard',
            hint: 'What group of students is definitely NOT represented in this survey?',
            remedialBrief: 'This is selection bias. Absent students (who might be less satisfied, sick, or working) are excluded. Dropout students (who left because unhappy) are completely missing.',
            remedialDetail: 'A fair survey would track down ALL students: present, absent, and past dropouts. The missing groups might have much lower satisfaction, revealing the true picture.'
          }
        ]
      },
      {
        id: 'c2_6_3',
        title: 'Data Privacy & Responsibility',
        textContent: 'Companies collect data about you: what you search, what you buy, where you go. This data is powerful. It can help (personalized medicine) or harm (discrimination, scams). Understanding data privacy means understanding your rights and protecting yourself.',
        difficulty: 'hard',
        estimatedTimeSeconds: 300,
        storyNarrative: {
          title: 'Raj\'s Privacy Invasion: When Data Becomes Dangerous',
          scenario: 'Raj\'s location data was sold to a marketing company. They knew: He visited a clinic for diabetes treatment. They sold that info to an insurance company. The insurance company DENIED him coverage, saying "High-risk customer." Raj never consented to data sale. His private health info destroyed his insurance. He sued and won. Now, countries have strict data protection laws (GDPR, India\'s new laws). Raj\'s story shows: YOUR data = YOUR property = YOU have rights.',
          realWorldConnection: 'Facebook sold user data to Cambridge Analytica, influencing elections. Health apps sold genetic data to law enforcement, identifying criminals BUT also innocent people. Your data is valuable. Companies BUY and SELL it. Understanding this = protecting yourself and your rights.',
          studentChallenge: 'You will investigate: What data does Instagram collect about you? (Answer: Everything—location, contacts, browsing, duration, likes, searches). Then you\'ll create a data privacy contract: "Companies can collect X but NOT Y. I consent to Z."'
        },
        videoUrl: 'https://www.youtube.com/embed/placeholder_ethics3',
        workedExamples: [
          {
            explanation: 'Example 1: Health Data Privacy',
            steps: [
              'Your doctor has your medical data (diabetes diagnosis, prescriptions, treatments).',
              'This data is PROTECTED by law. Insurance companies CANNOT access it without your consent.',
              'If someone steals this data, they can deny you coverage, employment, or insurance.',
              'Protection: Only share health data with trustworthy providers. Demand encryption.',
              'Your right: You can request a copy of your health data and demand deletion.'
            ]
          },
          {
            explanation: 'Example 2: Financial Data Privacy',
            steps: [
              'Your bank knows: Salary, spending, loans, investments.',
              'This data is PROTECTED. Bank cannot sell it to third parties without permission.',
              'If a scammer steals this data, they can impersonate you, empty accounts, take loans.',
              'Protection: Use strong passwords. Enable two-factor authentication. Monitor statements.',
              'Your right: You can request a credit report. If false, you can dispute it.'
            ]
          },
          {
            explanation: 'Example 3: Genetic Data Privacy',
            steps: [
              'Genetic test companies (23andMe, AncestryDNA) have your DNA data.',
              'This data can identify you, your relatives, your health risks, ancestry.',
              'If sold to law enforcement: Can be used to catch criminals. But also police overreach!',
              'Example: DNA matched an innocent person; false arrest. Genetic privacy is serious!',
              'Protection: Read privacy policies. Choose companies that NEVER sell data.'
            ]
          },
          {
            explanation: 'Example 4: Location Data Privacy',
            steps: [
              'Your phone tracks every place you go: Home address, workplace, clinic visits, protests attended.',
              'Companies BUY this data: Employers spy on employees, governments track activists.',
              'China used location data to detain 1 million people. Privacy is life-and-death in some countries!',
              'Protection: Turn off location sharing. Use VPN. Clear location history regularly.',
              'Your right: GDPR lets you DELETE your data. India\'s law gives similar rights.'
            ]
          },
          {
            explanation: 'Example 5: Informed Consent vs Manipulation',
            steps: [
              'A free app says: "We need location access for features."',
              'Truth: They sell location data for $10 million/year.',
              'Manipulation: Buried in 50-page terms (nobody reads).',
              'With informed consent: "We collect location. We sell to marketers. You get free app. Accept?"',
              'Most wouldn\'t accept if HONEST. That\'s why companies hide it.'
            ]
          }
        ],
        remediationLevels: [
          {
            level: 1,
            title: 'Gentle Review: Your Data = Your Property',
            content: 'Think of data like your toys. Nobody can take your toys without permission. Same with data. If a company collects data about you without clear permission (not hidden in 50-page terms), they\'re stealing. Protect your data like you\'d protect your valuables!'
          },
          {
            level: 2,
            title: 'Deeper Explanation: Data as Currency & Power',
            content: 'Data is worth money. Your search history is worth $100s/year to advertisers. Your location data is worth $1000s. Your health data is worth millions (to insurance/pharma). By understanding data\'s VALUE, you understand why companies collect it. You stop being naive about "free" services. Free = you\'re the product being sold!'
          },
          {
            level: 3,
            title: 'Interactive Practice: Be a Privacy Advocate',
            content: 'Challenge 1: Read a real app\'s privacy policy (complex, right?). Highlight: What data is collected? Who is it shared with? Can you delete it? Challenge 2: Create a FAIR privacy policy for a fictional app. What should it say to be transparent? Challenge 3: Research: Which countries have strongest data privacy laws? (EU\'s GDPR, India\'s new law, USA\'s CCPA). Why? Advocate for strong privacy laws in your country!'
          }
        ],
        realWorldApplications: [
          'GDPR compliance in Europe',
          'Data protection law in India & other countries',
          'Cybersecurity and data breach prevention',
          'Ethical AI and algorithmic transparency',
          'Employee monitoring and workplace privacy',
          'Genetic privacy and bioethics'
        ],
        questions: [
          {
            id: 'c2_6_3_q1',
            text: 'A social media app collects your location data but hides it in a 50-page terms document. Is this ethical?',
            options: ['Yes, you agreed to the terms', 'No, it\'s hidden manipulation', 'Yes if they use data to improve service', 'Need more context'],
            correctAnswer: 'No, it\'s hidden manipulation',
            format: GameFormat.RAINDROP,
            difficulty: 'hard',
            hint: 'Think about informed consent. Did you really know and agree?',
            remedialBrief: 'This is manipulation through obscurity. Most users NEVER read 50-page terms. True consent means clear, visible disclosure: "We collect location. We sell it to advertisers." If you wouldn\'t agree to that, they shouldn\'t hide it.',
            remedialDetail: 'Laws like GDPR require: 1) Clear disclosure, 2) Easy access to data, 3) Easy deletion. Companies that hide collection violate these principles. This is why you should read privacy policies (even if boring) or choose apps with transparent policies.'
          }
        ]
      }
    ]
  }
];

export const preTestQuestions: Question[] = [
  {
    ...q_books_raj,
    ...q_books_raj.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  },
  {
    ...q_pictograph_300,
    ...q_pictograph_300.styles[GameFormat.RAINDROP],
    format: GameFormat.RAINDROP
  },
  {
    ...q_improvement_40,
    ...q_improvement_40.styles[GameFormat.BAR_BUILDER],
    format: GameFormat.BAR_BUILDER
  },
  {
    ...q_science_fraction,
    ...q_science_fraction.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  },
  {
    ...q_tally_7,
    ...q_tally_7.styles[GameFormat.TALLY_TAP],
    format: GameFormat.TALLY_TAP
  },
  {
    ...q_spinner_blue,
    ...q_spinner_blue.styles[GameFormat.SPIN_WHEEL],
    format: GameFormat.SPIN_WHEEL
  },
  {
    ...q_pie_chocolate,
    ...q_pie_chocolate.styles[GameFormat.PIE_SLICER],
    format: GameFormat.PIE_SLICER
  },
  {
    ...q_interval_25,
    ...q_interval_25.styles[GameFormat.DRAG_SORT],
    format: GameFormat.DRAG_SORT
  }
];

export const postTestQuestions: Question[] = [
  { ...post_q1, ...post_q1.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q2, ...post_q2.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q3, ...post_q3.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q4, ...post_q4.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q5, ...post_q5.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q6, ...post_q6.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q7, ...post_q7.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q8, ...post_q8.styles[GameFormat.RAINDROP], format: GameFormat.RAINDROP },
  { ...post_q9, ...post_q9.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
  { ...post_q10, ...post_q10.styles[GameFormat.DRAG_SORT], format: GameFormat.DRAG_SORT },
];
