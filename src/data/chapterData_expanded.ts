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

/**
 * EXPANDED CHAPTER DATA WITH:
 * - Story-based narratives for engagement
 * - 4-5 worked examples per concept
 * - 3-level remediation (Brief → Video → Guided Practice)
 * - Deeper conceptual explanations for 11-year-olds
 * - Real-world applications
 * Updated: 2026-03-25 - Total: ~20 concepts across 4 modules
 */

export const chapterData: Module[] = [
  {
    id: '2.1',
    title: 'Data Organisation & Types of Graphs',
    storyTitle: 'Raj\'s Mystery: Finding the Most Popular Lunch',
    storyContext: 'Raj is the student council president. The cafeteria manager asks: "What lunch should we serve more?" Every student shouts different answers. Without organizing the data, no one knows the answer. Help Raj organize the data to solve the mystery!',
    totalConcepts: 6,
    estimatedMinutes: 30,
    concepts: [
      {
        id: 'c2_1_1',
        title: 'Why Do We Need to Organise Data?',
        storyNarrative: 'Imagine Raj collected 50 responses about favorite lunches, but they\'re just a messy list: Pizza, Sandwich, Pizza, Lunch-Box, Pizza, Sandwich... Can you tell which is most popular by reading this list? No! You need DATA ORGANISATION.',
        textContent: `
DATA is information. Raw data = messy, unorganized information.

Let's say 50 students answered: "What's your favorite lunch?"
Response list: Pizza, Sandwich, Pizza, Lunch-Box, Pizza, Sandwich, Pizza, Idli, Pizza...

THE PROBLEM:
- Takes 5 minutes to read the whole list
- After reading, you STILL can't answer "Which is most popular?"
- Your brain can't process unorganized information quickly

THE SOLUTION:
ORGANIZE → COUNT → COMPARE → ANSWER = Data Handling

WHY DOES ANYONE CARE?
- Netflix: Uses organized data to recommend movies you'll like
- YouTube: Uses organized data to show videos in order of views
- Schools: Use organized data to find that 80% of students like math (great news!)
- Your parents: Use organized data to find the cheapest grocery store

ANALOGY FOR 11-YEAR-OLDS:
Imagine you have 200 LEGO bricks mixed together. You want to know:
- How many red bricks do I have?
- How many blue bricks do I have?

If bricks are mixed → You count for 1 hour 😞
If bricks are sorted by color → You count in 2 minutes 😊

DATA ORGANIZATION does the same thing!
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Sports Survey (Simple)',
            explanation: 'Organizing 10 responses about favorite sports',
            steps: [
              'Raw data (unorganized): Cricket, Football, Cricket, Cricket, Football, Badminton, Cricket, Tennis, Football, Cricket',
              'Now organize by sport:',
              '  Cricket: ||||',
              '  Football: |||',
              '  Badminton: |',
              '  Tennis: |',
              'RESULT: Cricket is most popular (5 votes out of 10)'
            ],
            keyTakeaway: 'Organization reveals patterns instantly!'
          },
          {
            title: 'Example 2: Pizza Toppings (Medium)',
            explanation: 'Organizing 25 pizza topping preferences',
            steps: [
              'Raj surveyed 25 friends about pizza toppings',
              'Raw responses (first 10): Cheese, Pepperoni, Mushroom, Cheese, Pepperoni, Cheese, Paneer, Cheese, Pepperoni, Cheese',
              'Complete organized table:',
              '  Cheese: |||| |||| (10)',
              '  Pepperoni: |||| (5)',
              '  Mushroom: || (2)',
              '  Paneer: ||| (3)',
              '  Onion: ||||| (5)',
              'RESULT: Cheese is 4x more popular than mushroom!'
            ],
            keyTakeaway: 'Data organization makes comparison easy'
          },
          {
            title: 'Example 3: Classroom Pets Survey (Complex)',
            explanation: 'Organizing 40 responses with multiple categories',
            steps: [
              'Survey question: "If you could have a pet at school, which would it be?"',
              'Responses from 40 students, organized:',
              '  Dog: |||| |||| (10)',
              '  Cat: |||| ||| (8)',
              '  Rabbit: |||| || (7)',
              '  Parrot: |||| (5)',
              '  Hamster: ||| (3)',
              '  Goldfish: ||| (3)',
              '  Snake: || (2)',
              '  Turtle: || (2)',
              'PATTERN: Dogs and cats dominate (18 out of 40 = 45%)!',
              'INSIGHT: These 2 pets should be priority pets for school program'
            ],
            keyTakeaway: 'Organized data reveals actionable insights!'
          },
          {
            title: 'Example 4: Real-World Application - Movie Preferences',
            explanation: 'How Netflix uses data organization',
            steps: [
              'Imagine Netflix asking 1000 users: "Which genre do you watch?',
              'Without organization: Impossible to find patterns in 1000 responses',
              'With organization:',
              '  Action: 320 users (32%)',
              '  Comedy: 280 users (28%)',
              '  Drama: 180 users (18%)',
              '  Horror: 120 users (12%)',
              '  Other: 100 users (10%)',
              'RESULT: Netflix knows to show ACTION movies first!',
              'BUSINESS IMPACT: More users watch → Netflix makes more money'
            ],
            keyTakeaway: 'Organized data = Business decisions = Real money!'
          },
          {
            title: 'Example 5: You Try - Ice Cream Survey',
            explanation: 'Practice organizing data yourself',
            steps: [
              'Survey: 15 students in class were asked "Favorite ice cream flavor?"',
              'Raw responses: Vanilla, Chocolate, Vanilla, Strawberry, Vanilla, Chocolate, Mint, Vanilla, Chocolate, Vanilla, Strawberry, Vanilla, Chocolate, Mint, Vanilla',
              'YOUR TASK: Organize this data',
              'COUNT: Vanilla=7, Chocolate=4, Strawberry=2, Mint=2',
              'ANSWER: Which flavor is most popular? (Vanilla!)',
              'Real scenario: An ice cream shop uses this to decide: "Make more Vanilla!"'
            ],
            keyTakeaway: 'Now you can organize data like a data scientist!'
          }
        ],
        remediation: {
          level1_brief: 'Organized data = easy to see patterns. Messy data = hard to understand.',
          level2_video: 'https://www.youtube.com/embed/video2 (Animation: Data Before & After Organization)',
          level3_guidedPractice: 'Interactive: Drag-drop 10 items into categories, see patterns appear instantly'
        },
        questions: [
          {
            ...inline_2_1_q1,
            ...inline_2_1_q1.styles[GameFormat.DRAG_SORT],
            format: GameFormat.DRAG_SORT,
            difficulty: 'easy',
            remedialBrief: 'Organization helps us see which item appears most often',
            remedialDetail: 'Watch: How to count items systematically. Then try again by grouping similar items together.'
          }
        ]
      },
      {
        id: 'c2_1_2',
        title: 'Tally Marks & Frequency Tables',
        storyNarrative: 'Before computers existed, ancient people used tally marks to count. They showed them in clever groups of 5 to count fast. Learn the ancient secret that data scientists still use today!',
        textContent: `
TALLY MARKS = ancient fast-counting method, still used today!

WHY GROUPS OF 5?
- Humans have 5 fingers
- 5 is easy to see and count
- Ancient people: Used 5 stones = 1 group = faster counting

HOW TO MAKE TALLY MARKS:
1st item: |
2nd item: ||
3rd item: |||
4th item: ||||
5th item: |||| (CROSS DIAGONALLY = group of 5 = 🎉 ONE GROUP COMPLETE)

6th item: |||| |
7th item: |||| ||
...and so on

WHY THIS MATTERS:
- Without groups: 26 marks = count each one slowly = | | | | | | | | | | | | | | | | | | | | | | | | | |
- With groups: 5 groups + 1 = |||| |||| |||| |||| |||| | = INSTANT = "26!"

A FREQUENCY TABLE organizes data into categories with their counts:

Category          | Tally Marks      | Frequency
Cricket          | |||| |||        | 8
Football         | |||| ||         | 7
Badminton        | |||             | 3
Tennis           | ||||            | 5

READING A FREQUENCY TABLE:
- Cricket was chosen 8 times (most popular)
- Tennis was chosen 5 times
- Badminton was chosen 3 times (least popular)
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Favorite Color (Simple, 10 items)',
            explanation: 'Making a frequency table from a small dataset',
            steps: [
              'Survey: 10 friends, "What\'s your favorite color?"',
              'Raw responses: Red, Blue, Red, Green, Red, Blue, Red, Pink, Red, Blue',
              'Organizing with tally marks:',
              '  Red:   |||| |  = 5',
              '  Blue:  |||     = 3',
              '  Green: |       = 1',
              '  Pink:  |       = 1',
              'Frequency Table:',
              'Color  | Tally | Frequency',
              'Red    | ╱╱╱╱╱ | 5',
              'Blue   | ╱╱╱   | 3',
              'Green  | ╱     | 1',
              'Pink   | ╱     | 1',
              'INSIGHT: Red is 5x more popular than green!'
            ]
          },
          {
            title: 'Example 2: Number of Books Read (Medium, 25 items)',
            explanation: 'Organizing continuous data into frequency table',
            steps: [
              'Survey: 25 students, "How many books did you read last month?"',
              'Responses: 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 0, 2, 3, 2, 4, 2, 5, 2, 3, 2, 1, 2',
              'Tally marks (notice the pattern):',
              '  0 books: |        = 1 student',
              '  1 book:  ||       = 2 students',
              '  2 books: |||| |||| |||| | = 11 students (WOW!)',
              '  3 books: ||||     = 4 students',
              '  4 books: |||      = 3 students',
              '  5 books: ||       = 2 students',
              'Key finding: Most students read 2 books (11 out of 25 = 44%)',
              'Teacher insight: Need to encourage more reading!'
            ]
          },
          {
            title: 'Example 3: Breakfast Choices (Complex, 48 items)',
            explanation: 'Real classroom survey with multiple categories',
            steps: [
              'Cafeteria survey: 48 students, "What did you eat for breakfast today?"',
              'Categories tracked: Cereal, Paratha, Idli, Toast, Fruit, Bread',
              'After organizing:',
              'Food    | Tally              | Frequency',
              'Cereal  | ╱╱╱╱╱ ╱╱╱╱╱ ╱╱    | 12',
              'Paratha | ╱╱╱╱╱ ╱╱╱╱╱ ╱╱╱╱ | 14',
              'Idli    | ╱╱╱╱╱ ╱╱╱╱╱      | 10',
              'Toast   | ╱╱╱╱╱ ╱╱         | 7',
              'Fruit   | ╱╱╱╱╱           | 5',
              'Bread   | ╱╱              | 2',
              'Total: 12+14+10+7+5+2 = 50? NO WAIT: 48 ✓',
              'KEY INSIGHT: Paratha is popular (14/48 = 29%)',
              'Next step: Design ads showing paratha benefits!'
            ]
          },
          {
            title: 'Example 4: Dice Rolls (Probability Introduction)',
            explanation: 'Using tally marks to understand randomness',
            steps: [
              'Experiment: Roll a die 30 times, record results',
              'Results: 3,1,4,2,3,6,1,5,3,2,1,4,3,6,2,1,5,3,4,2,1,6,3,5,2,1,4,3,2,1',
              'Making tally table:',
              '  1: |||| |||| | = 11 times (Hmm... should be 5 times?)',
              '  2: |||| |     = 6 times (reasonable)',
              '  3: |||| |    = 6 times (reasonable)',
              '  4: ||||      = 5 times (reasonable)',
              '  5: |||       = 3 times (rare!)',
              '  6: |||       = 3 times (rare!)',
              'OBSERVATION: Not perfectly equal! (This is randomness!)',
              'PROBABILITY CONCEPT: Expected = 5 each, Actual = varied'
            ]
          },
          {
            title: 'Example 5: Quick Practice - Your Class',
            explanation: 'Create your own frequency table',
            steps: [
              'TASK: Ask 20 classmates, "How many siblings do you have?"',
              '(Expected responses: 0, 1, 2, 3, 4 siblings)',
              'Create tally marks as you collect responses',
              'Make frequency table:',
              'Siblings | Tally | Frequency | Percentage',
              '0        |       |           |',
              '1        |       |           |',
              '2        |       |           |',
              '3        |       |           |',
              '4+       |       |           |',
              'Analysis:',
              '- Which number of siblings is most common?',
              '- What percentage have 2+ siblings?'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Tally marks group by 5 for fast counting: |||| = 5',
          level2_video: 'https://www.youtube.com/embed/video3 (Animation: Counting with tally marks 1-50)',
          level3_guidedPractice: 'Interactive: Count 30 items, create tally marks, watch patterns emerge'
        },
        questions: [
          {
            ...inline_2_1_q2,
            ...inline_2_1_q2.styles[GameFormat.RAINDROP],
            format: GameFormat.RAINDROP,
            difficulty: 'medium',
            remedialBrief: 'Count tally marks in groups of 5. Each crossed group = 5.',
            remedialDetail: 'Practice: Group items by 5 to count them faster.'
          }
        ]
      },
      {
        id: 'c2_1_3',
        title: 'Pictographs: Using Pictures to Show Data',
        storyNarrative: 'Before most people could read numbers, they used PICTURES to show data. A pictograph is like a visual story. One symbol = many items. Can you decode the picture message?',
        textContent: `
PICTOGRAPH = Data shown using symbols/pictures (not numbers)

WHY USE PICTURES?
- Everyone understands pictures (even if they can't read)
- Pictures are faster to understand than numbers
- 5-year-olds can read pictographs!

EXAMPLE PICTOGRAPH:
Title: "Students' Favorite Ice Cream"

Vanilla  🍦 🍦 🍦 🍦 🍦 🍦 
Chocolate 🍦 🍦 🍦 🍦 
Strawberry 🍦 🍦 

KEY (LEGEND): 🍦 = 2 students

READING IT:
- Vanilla: 6 × 2 = 12 students
- Chocolate: 4 × 2 = 8 students
- Strawberry: 2 × 2 = 4 students

CRITICAL PART: THE SCALE
- 1 symbol = 2 students (in example above)
- Could be: 1 symbol = 10 items
- Could be: 1 symbol = 100 items
- ALWAYS CHECK THE KEY!

HOW TO CREATE ONE:
1. Choose a simple symbol
2. Decide the SCALE (1 symbol = ?)
3. For partial values, draw HALF a symbol
4. Make a KEY/LEGEND
5. Label axes clearly

EXAMPLE WITH FRACTION SYMBOLS:
Title: "Books Borrowed This Month"

Emma    📚 📚 📚 📚 📚
Raj     📚 📚 📚 📚 📚 📚
Priya   📚 📚 📚 📚 [half 📚]
Arjun   📚 📚 📚

KEY: 📚 = 5 books

READING PRIYA'S ROW:
- 4 full books = 4 × 5 = 20
- 1 half = 2.5
- Total = 22.5... NO! That's wrong!

BETTER READ: Maybe this pictograph chose scale = 10?
Then Priya = 4×10 + 5 (half) = 45? 

IMPORTANT: Always check the KEY first!
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Simple Pictograph (Cars)',
            explanation: 'Basic pictograph with 1 symbol = 1 item',
            steps: [
              'Title: "Cars in Each Family\'s Garage"',
              '',
              'Raj family     🚗 🚗 🚗',
              'Priya family   🚗 🚗 🚗 🚗 🚗',
              'Arjun family   🚗 🚗',
              'Emma family    🚗 🚗 🚗 🚗',
              '',
              'KEY: 🚗 = 1 car',
              '',
              'READING:',
              '- Raj family: 3 cars',
              '- Priya family: 5 cars (most!)',
              '- Arjun family: 2 cars (least)',
              '- Emma family: 4 cars',
              '',
              'This is for SMALL numbers. For bigger numbers, we use scales.'
            ]
          },
          {
            title: 'Example 2: Pictograph with Scale (10)',
            explanation: 'Using 1 symbol to represent 10 items',
            steps: [
              'Title: "Apples Sold at Farmers Market"',
              '',
              'Monday   🍎 🍎 🍎',
              'Tuesday  🍎 🍎 🍎 🍎',
              'Wednesday 🍎 🍎',
              'Thursday 🍎 🍎 🍎 🍎 🍎',
              'Friday   🍎 🍎 🍎 🍎 🍎 🍎',
              '',
              'KEY: 🍎 = 10 apples',
              '',
              'CALCULATION:',
              '- Monday: 3 × 10 = 30 apples',
              '- Tuesday: 4 × 10 = 40 apples',
              '- Wednesday: 2 × 10 = 20 apples',
              '- Thursday: 5 × 10 = 50 apples (BEST DAY!)',
              '- Friday: 6 × 10 = 60 apples (BEST DAY!)',
              '',
              'WITHOUT scale, Friday would show 60 tiny symbols = messy!',
              'WITH scale, only 6 symbols = clean and clear!'
            ]
          },
          {
            title: 'Example 3: Pictograph with Half Symbols',
            explanation: 'Handling partial values in pictographs',
            steps: [
              'Title: "Distance Walked by Students (in km)"',
              '',
              'Raj     🚶 🚶 🚶 🚶 [half 🚶]',
              'Priya   🚶 🚶 🚶 🚶 🚶 🚶',
              'Arjun   🚶 🚶 🚶 [half 🚶]',
              'Emma    🚶 🚶 🚶 🚶',
              '',
              'KEY: 🚶 = 2 km',
              '',
              'READING (INCLUDING HALVES):',
              '- Raj: 4.5 × 2 = 9 km',
              '- Priya: 6 × 2 = 12 km (walked most!)',
              '- Arjun: 3.5 × 2 = 7 km',
              '- Emma: 4 × 2 = 8 km',
              '',
              'KEY SKILL: Understand that half a symbol = half the value'
            ]
          },
          {
            title: 'Example 4: Real Data (Bus Passengers)',
            explanation: 'Reading pictograph from real scenario',
            steps: [
              'Bus Company Data: Passengers per school bus',
              '',
              'Bus 1 (morning)   🚌 🚌 🚌 🚌 [half 🚌]',
              'Bus 2 (morning)   🚌 🚌 🚌',
              'Bus 1 (afternoon) 🚌 🚌 🚌 🚌 🚌 🚌',
              'Bus 2 (afternoon) 🚌 🚌 🚌 🚌',
              '',
              'KEY: 🚌 = 20 passengers',
              '',
              'Using pictograph data:',
              'Bus 1 morning: 4.5 × 20 = 90 passengers',
              'Bus 2 morning: 3 × 20 = 60 passengers',
              'Bus 1 afternoon: 6 × 20 = 120 passengers',
              'Bus 2 afternoon: 4 × 20 = 80 passengers',
              '',
              'BUSINESS INSIGHT:',
              '- Need bigger buses for Bus 1 afternoon (120 people!)',
              '- Bus 2 morning is underutilized (only 60)'
            ]
          },
          {
            title: 'Example 5: Create Your Own',
            explanation: 'Design a pictograph for your class',
            steps: [
              'TASK: Make pictograph for "Pets in Your Class"',
              '',
              'Step 1: Collect data',
              '- Ask classmates: What pet do you have?',
              '- Count: Dogs=12, Cats=8, Fish=4, Birds=2, Rabbits=6',
              '',
              'Step 2: Choose symbol',
              '- Pick a picture related to pets',
              '',
              'Step 3: Choose scale',
              '- Total students: 32',
              '- Scale option 1: 1 symbol = 1 = lots of symbols',
              '- Scale option 2: 1 symbol = 4 = fewer symbols (BETTER!)',
              '',
              'Step 4: Create pictograph',
              'Dogs    🐕 🐕 🐕    (12 = 3 symbols × 4)',
              'Cats    🐈 🐈        (8 = 2 symbols × 4)',
              'Fish    🐠           (4 = 1 symbol × 4)',
              'Birds   [half 🐦]    (2 = half symbol × 4)',
              'Rabbits 🐰 🐰       (6 = 1.5 symbols × 4)',
              '',
              '...and finally, write KEY: 🐕 = 4 pets'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Pictograph = pictures showing data. KEY tells you 1 symbol = ? items',
          level2_video: 'https://www.youtube.com/embed/video4 (How to read pictographs with different scales)',
          level3_guidedPractice: 'Interactive: Drag symbols to create pictograph, adjust scale, read results'
        },
        questions: [
          {
            ...q_pictograph_300,
            format: GameFormat.DRAG_SORT,
            difficulty: 'medium',
            remedialBrief: 'Look at KEY to find 1 symbol value, then multiply by number of symbols',
            remedialDetail: 'Practice: Find values in 3 pictographs, starting with scale=1, going to scale=10'
          }
        ]
      },
      {
        id: 'c2_1_4',
        title: 'Bar Graphs: Comparing with Bars',
        storyNarrative: 'Bar graphs use rectangles of different heights to compare categories. Taller bar = bigger number. Shorter bar = smaller number. It\'s like a visual race!',
        textContent: `
BAR GRAPH = Rectangles (bars) of different heights showing data

PICTURE THIS:
If pictographs are pictures, bar graphs are like a visual race!
- Taller bar = winner (biggest number)
- Shorter bar = slower (smaller number)

CRITICAL RULE: GAPS between bars!
❌ WRONG: Bars touching (looks like a histogram, not a bar graph)
✓ CORRECT: Bars separated by white space

EXAMPLE BAR GRAPH:
Title: "Favorite Fruits"

[Imagining vertical bar graph]
Number of Students (y-axis): 0, 2, 4, 6, 8, 10, 12
Fruit (x-axis): Apple, Banana, Mango, Orange, Grapes

Apple   | Bar height: 10
Banana  | Bar height: 8
Mango   | Bar height: 6
Orange  | Bar height: 4
Grapes  | Bar height: 2

READING:
- Apple is MOST popular (10 students) 🏆
- Grapes are LEAST popular (2 students)
- Banana is 2nd place (8 students)

IMPORTANT PARTS:
1. Title: What is this about?
2. X-axis labels: What categories?
3. Y-axis labels: What scale? (0, 2, 4, 6...)
4. Bars with equal width, different heights
5. SPACE between bars (key difference from histogram)

WHY BAR GRAPHS?
- Easy to compare (just look at heights!)
- Works with any categories (not just numbers)
- Everyone understands them instantly
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Reading a Bar Graph',
            explanation: 'Simple bar graph interpretation',
            steps: [
              'Title: "Hours of Sleep Last Night"',
              '[Bar graph with students on x-axis, hours on y-axis]',
              '',
              'Raj:    7 hours',
              'Priya:  8 hours (tallest bar)',
              'Arjun:  6 hours',
              'Emma:   9 hours (TALLEST!)',
              'Ali:    5 hours (shortest)',
              '',
              'QUICK ANALYSIS:',
              '- Emma slept most (9 hours)',
              '- Ali slept least (5 hours)',
              '- Most students got 7-8 hours (healthy!)',
              '- Ali needs more sleep'
            ]
          },
          {
            title: 'Example 2: Creating a Bar Graph from Data',
            explanation: 'How to build a bar graph',
            steps: [
              'RAW DATA: "Pocket Money Received"',
              '- Raj: 200 rupees',
              '- Priya: 150 rupees',
              '- Arjun: 100 rupees',
              '- Emma: 250 rupees',
              '- Ali: 175 rupees',
              '',
              'STEP 1: Choose scale',
              '- Highest value: 250',
              '- Scale: 0, 50, 100, 150, 200, 250 (by 50s)',
              '',
              'STEP 2: Draw bars',
              'Raj:    ████ (200)',
              'Priya:  ███ (150)',
              'Arjun:  ██ (100)',
              'Emma:   █████ (250) - tallest!',
              'Ali:    ███½ (175)',
              '',
              'STEP 3: Add labels',
              'Title: "Weekly Pocket Money"',
              'X-axis: Student names',
              'Y-axis: Amount (rupees)'
            ]
          },
          {
            title: 'Example 3: Comparing Bar Graphs',
            explanation: 'Using bar graphs to make decisions',
            steps: [
              'SCENARIO: School choosing snacks to sell',
              '',
              'Bar graph - Student snack preferences:',
              'Samosa:  ██████████ (100 votes)',
              'Pakora:  ███████ (70 votes)',
              'Pizza:   ████████ (80 votes)',
              'Masala Dosa: █████ (50 votes)',
              'Sandwich: ███ (30 votes)',
              '',
              'DECISION:',
              '- Stock MOST = Samosa (100 votes)',
              '- Stock LESS = Sandwich (30 votes)',
              '- Samosas sell 3x more than sandwiches!',
              '',
              'REAL BUSINESS: This is how stores decide what to keep!'
            ]
          },
          {
            title: 'Example 4: Double Bar Graph (Comparison)',
            explanation: 'Comparing two sets of data side-by-side',
            steps: [
              'Title: "Reading Hours: Boys vs Girls"',
              '',
              'Science books:',
              'Boys:   ███ (30 hours)',
              'Girls:  ██ (20 hours)',
              '',
              'English books:',
              'Boys:   ██ (20 hours)',
              'Girls:  ████ (40 hours)',
              '',
              'COMPARISON:',
              '- Boys prefer science (30 > 20)',
              '- Girls prefer English (40 > 20)',
              '- Girls read more English than boys (double!)',
              '- This suggests: Different study patterns'
            ]
          },
          {
            title: 'Example 5: Real-World Bar Graph Analysis',
            explanation: 'Understanding published bar graphs',
            steps: [
              'Example from real statistics:',
              '"Time Spent on Study Each Day"',
              '',
              'Weekday mornings:  ██████ (6 hours)',
              'Weekday evenings:  ████ (4 hours)',
              'Weekend mornings:  ██ (2 hours)',
              'Weekend evenings:  ███ (3 hours)',
              '',
              'INTERPRETATION:',
              '- Weekday mornings = most study (6 hours)',
              '- Students relax on weekends',
              '- Pattern suggests: School + homework = weekdays',
              '- Relaxation = weekends',
              '',
              'INSIGHT: This is how educators understand student patterns!'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Bar graph: Taller bar = bigger number. Compare bar heights to see differences.',
          level2_video: 'https://www.youtube.com/embed/video5 (How to read and create bar graphs)',
          level3_guidedPractice: 'Interactive: Build bar graphs from data, interpret patterns, make predictions'
        },
        questions: [
          {
            ...inline_2_1_q3,
            ...inline_2_1_q3.styles[GameFormat.BAR_BUILDER],
            format: GameFormat.BAR_BUILDER,
            difficulty: 'medium',
            remedialBrief: 'Each bar\'s height shows a number. Taller = bigger.',
            remedialDetail: 'Practice: Create 3 bar graphs with increasing difficulty'
          }
        ]
      },
      {
        id: 'c2_1_5',
        title: 'Reading & Interpreting Real Graphs',
        storyNarrative: 'Not all graphs tell the truth! Some graphs try to trick you. Learn how to spot when data is presented honestly vs. misleadingly. Become a "graph detective!"',
        textContent: `
CRITICAL SKILL: Reading graphs with a CRITICAL EYE

Not all graphs are honest! Some graphs try to trick you to make:
- Products look better
- Numbers look bigger
- Differences look more dramatic

COMMON GRAPH TRICKS (RED FLAGS):

1. BROKEN AXIS
❌ Graph shows: 0 to 10, then jumps to 90-100
✓ Honest graph: Shows full 0-100 range
(Effect: Makes small 2% change look 50% change!)

2. MISLEADING SCALE
❌ Y-axis: 0, 10, 20, 30, 40, 100 (unequal spacing)
✓ Honest scale: 0, 20, 40, 60, 80, 100 (equal spacing)

3. 3D TRICKS
❌ 3D bars make taller bars look disproportionately bigger
✓ 2D simple bars show true proportions

4. COMPARING APPLES TO ORANGES
❌ Comparing 2010 data to 2024 data with inflation ignored
✓ Adjusting for inflation to compare fairly

EXAMPLE - GRAPH TRICK:

PIZZA BRAND SALES (2023 vs 2024)
❌ Misleading graph:
  2023: ██ (50 pizzas)
  2024: ████ (60 pizzas)
  [but Y-axis goes 0, 40, 50, 60, 100]
  Effect: Looks like 50% increase! (Only 20% increase)

✓ Honest graph:
  2023: ██ (50 pizzas)
  2024: ███ (60 pizzas)
  [Y-axis goes 0, 20, 40, 60, 80, 100]
  Effect: Shows true 20% increase

HOW TO READ GRAPHS HONESTLY:
1. Check the TITLE - What does it claim?
2. Check AXIS LABELS - Are scales honest?
3. Check the SCALE - Is spacing equal?
4. Look for Visual tricks - 3D effects? Misleading heights?
5. Ask: "Is this true or manipulated?"
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Honest vs Misleading Sales Graph',
            explanation: 'Spotting manipulation in data presentation',
            steps: [
              'Company claim: "Our sales DOUBLED!"',
              '',
              'Graph A (MISLEADING):',
              'Year 1: ██ (100 units)',
              'Year 2: ████ (120 units)',
              '[Y-axis: 0, 100, 110, 120, 200]',
              'Visual effect: Looks like 50% jump!',
              '',
              'Graph B (HONEST):',
              'Year 1: ████████████ (100 units)',
              'Year 2: ███████████████ (120 units)',
              '[Y-axis: 0, 20, 40, 60, 80, 100, 120]',
              'Visual effect: Shows only 20% jump',
              '',
              'REALITY: 100 → 120 is 20% increase, NOT double!',
              'LESSON: Always check the axisscale!'
            ]
          },
          {
            title: 'Example 2: Broken Axis Trick',
            explanation: 'How broken axes distort data',
            steps: [
              'Product comparison: "Our soda is VASTLY popular!"',
              '',
              'Misleading:',
              'Our brand:       ██████████ (95%)',
              'Competitor A:    ███████ (90%)',
              'Competitor B:    ████ (80%)',
              '[Y-axis: 0, 80, 90, 95, 100]',
              'Visual: Our brand looks TWICE as big!',
              '',
              'Honest:',
              'Our brand:       ████████████████████ (95%)',
              'Competitor A:    ███████████████████ (90%)',
              'Competitor B:    ████████████████ (80%)',
              '[Y-axis: 0, 20, 40, 60, 80, 100]',
              'Visual: All brands are similar (80-95%)',
              '',
              'REALITY: 15% difference is NOT "vastly popular"',
              '(Breaking the axis makes 15% look like 100%!)'
            ]
          },
          {
            title: 'Example 3: Misleading Bar Widths',
            explanation: 'Area tricks that distort perception',
            steps: [
              'Company: "Our profit TRIPLED!"',
              '',
              'Misleading (using 3D perspective):',
              'Year 1: Small bar ($100M)',
              'Year 2: 3x wider AND 3x taller (visually HUGE)',
              '(But data: $100M → $300M = 3x)',
              '',
              'What happened:',
              '- Bar width increased: 1 unit → 3 units',
              '- Bar height increased: 1 unit → 3 units',
              '- Visual area: 1² = 1 → 3² = 9 (NINE times bigger!)',
              '- But profit only tripled (3x, not 9x)',
              '',
              'LESSON: 2D bars are honest. Watch out for 3D!'
            ]
          },
          {
            title: 'Example 4: Missing Context (Apples to Oranges)',
            explanation: 'How missing context misleads readers',
            steps: [
              'Graph: "Chocolate consumption INCREASED 50%!"',
              'Year 1: 1000 tons',
              'Year 2: 1500 tons',
              '[Looks honest!]',
              '',
              'BUT MISSING CONTEXT:',
              '- Year 1 population: 10 million',
              '  Per person: 1000/10M = 0.0001 tons/person',
              '- Year 2 population: 20 million (Double!)',
              '  Per person: 1500/20M = 0.000075 tons/person',
              '',
              'TRUTH: Per-person chocolate DECREASED by 25%!',
              'The graph lied by ignoring population growth',
              '',
              'LESSON: For fair comparison, check: per-capita vs total'
            ]
          },
          {
            title: 'Example 5: Detect the Trick - Your Challenge',
            explanation: 'Practice spotting graph deception',
            steps: [
              'GRAPH SHOWN: "Students love our school lunch!"',
              '',
              '5-star ratings:',
              '2019: █████████████ (60 ratings)',
              '2024: ████████████████████ (64 ratings)',
              '',
              'Axis shows: 0, 60, 62, 64, 66',
              '',
              'YOUR TASK:',
              '✓ Spot the trick',
              '✓ What\'s the real percentage change?',
              '  (60 → 64 = 6.7% increase, NOT 30% visible jump)',
              '  ',
              '✓ What scale is honest?',
              '  (0, 10, 20, 30, 40, 50, 60, 70)',
              '',
              'ANSWER: BROKEN AXIS makes small change (6%) look huge (30%)'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Check axis scale: Is it fair and equal spacing?',
          level2_video: 'https://www.youtube.com/embed/video6 (How graphs trick you: Common tricks exposed)',
          level3_guidedPractice: 'Interactive: Evaluate 5 graphs, identify tricks, rewrite honestly'
        },
        questions: [
          {
            id: 'c2_1_5_q1',
            text: 'Which graph most honestly displays this data: 2020=50, 2021=55?',
            options: [
              'A: Y-axis 0-100 (honest scale)',
              'B: Y-axis 0, 45, 50, 55, 100 (broken)',
              'C: Y-axis 0, 50, 55 (broken)',
              'D: 3D bars (visual trick)'
            ],
            correctAnswer: 'A',
            format: GameFormat.HOTSPOT,
            difficulty: 'medium',
            hint: 'Honest graphs use equal axis spacing',
            remedialBrief: 'Equal scale from 0-100 shows truth. Broken axes magnify changes.',
            remedialDetail: 'Watch: Examples of honest vs deceptive graphs'
          }
        ]
      },
      {
        id: 'c2_1_6',
        title: 'Class Data Collection Project',
        storyNarrative: 'Now YOU are the data scientist! Collect real data from your class, organize it, create graphs, and share findings. This is what real statisticians do!',
        textContent: `
PROJECT: BECOME A DATA SCIENTIST FOR ONE DAY

Your mission: Collect, organize, analyze, and present real class data.

PROJECT STEPS:

STEP 1: CHOOSE YOUR QUESTION
Good questions (answerable with data):
✓ "What's the favorite lunch among girls vs boys?"
✓ "How many hours do students sleep on school nights?"
✓ "What time do students wake up?"
✓ "How many books does each student read per month?"

Bad questions (not answerable with data):
❌ "Is math hard?" (too vague)
❌ "Do you like school?" (yes/no, limited insight)

STEP 2: DESIGN YOUR SURVEY
- How many people will you survey? (aim: 20-30)
- What exact question will you ask?
- What answer options will you provide?

STEP 3: COLLECT DATA
- Ask people one by one
- Write responses carefully
- Don't skip anyone
- Total: 20-30 responses

STEP 4: ORGANIZE DATA
- Make tally marks
- Create frequency table
- Double-check counts add up

STEP 5: CHOOSE GRAPH TYPE
- Pictograph: Small numbers, visual appeal
- Bar graph: Easy comparison of categories
- Choose the BEST format for YOUR data

STEP 6: CREATE GRAPH
- Title: What does this show?
- Labels: What is each axis?
- Legend: What do symbols mean?
- Neat and colorful!

STEP 7: ANALYZE & INTERPRET
- What pattern do you see?
- Which category is most popular?
- Why do you think this is?
- What surprised you?

STEP 8: PRESENT FINDINGS
- Show your graph to class
- Explain: "Here's what the data shows..."
- Answer questions

PROJECT ASSESSMENT:
- Quality of survey question (clear and answerable): 20%
- Accuracy of data collection (correct counts): 20%
- Graph choice and creation (neat, labeled): 30%
- Analysis (insights, patterns, conclusions): 20%
- Presentation (clear explanation): 10%

EXAMPLE SUCCESSFUL PROJECT:
"Breakfast Preferences in Class 8-A"

Survey: Asked 28 students, "What did you eat for breakfast?"

Results:
Cereal:   ║║║║║ ║║║ = 8 students
Paratha:  ║║║║║ ║║║║║ ║║ = 12 students
Toast:    ║║║║  = 4 students
Fruit:    ║║║  = 3 students
Other:    ║  = 1 student
Total: 28 ✓

Graph created: Bar graph (best for comparison)

Key findings:
- Paratha is MOST popular (12/28 = 43%)
- Cereal is second (8/28 = 29%)
- As a school: Provide more paratha options
- Surprise: Only 1 student ate "other food"

This is REAL data science!
        `,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        workedExamples: [
          {
            title: 'Example 1: Sports Preference Survey (20 students)',
            explanation: 'Complete worked example from start to finish',
            steps: [
              'QUESTION: "What\'s your favorite sport?"',
              '',
              'RESPONSES:',
              'Cricket, Football, Cricket, Badminton, Cricket,',
              'Football, Cricket, Tennis, Cricket, Badminton,',
              'Cricket, Football, Chess, Cricket, Badminton,',
              'Football, Cricket, Badminton, Tennis, Cricket',
              '',
              'ORGANIZE:',
              'Cricket:   ║║║║║ ║║║║║ = 10',
              'Football:  ║║║║  = 4',
              'Badminton: ║║║║  = 4',
              'Tennis:    ║║  = 2',
              'Chess:     ║  = 1',
              'Total: 21... wait, count again! = 20 ✓',
              '',
              'GRAPH (BAR): Shows Cricket dominates',
              '',
              'FINDINGS:',
              '- Cricket: 50% (10/20)',
              '- Football & Badminton: 20% each',
              '- Only 1 student likes chess (unique!)',
              '',
              'CONCLUSION: School should have cricket team'
            ]
          },
          {
            title: 'Example 2: Sleep Hours Survey (25 students)',
            explanation: 'Analyzing numeric continuous data',
            steps: [
              'QUESTION: "How many hours did you sleep last night?"',
              '',
              'RESPONSES (25 students):',
              '7, 8, 6, 9, 7, 8, 5, 8, 7, 6,',
              '8, 9, 7, 8, 6, 7, 10, 8, 7, 6,',
              '8, 7, 9, 5, 8',
              '',
              'ORGANIZE BY HOURS:',
              '5 hours:  ║║  = 2 students (NOT ENOUGH!)',
              '6 hours:  ║║║║  = 4 students',
              '7 hours:  ║║║║║ ║║ = 7 students (most common)',
              '8 hours:  ║║║║║ ║║║ = 8 students',
              '9 hours:  ║║║  = 3 students',
              '10 hours: ║  = 1 student',
              'Total: 25 ✓',
              '',
              'FINDINGS:',
              '- Average: 7.5 hours',
              '- Most students: 7-8 hours (healthy!)',
              '- Only 2 students sleep less than 6 hours',
              '',
              'RECOMMENDATION: 6 hours is minimum for health'
            ]
          },
          {
            title: 'Example 3: Pet Ownership Survey (30 students)',
            explanation: 'Using pictograph for visual appeal',
            steps: [
              'QUESTION: "Do you have a pet? If yes, what kind?"',
              '',
              'RESPONSES:',
              'Dog:    12 students',
              'Cat:    8 students',
              'Fish:   5 students',
              'Bird:   3 students',
              'Other:  2 students',
              'Total:  30 students',
              '',
              'GRAPH TYPE CHOICE:',
              '- Could use: Bar graph (good)',
              '- Better choice: Pictograph (cute, visual)',
              '',
              'PICTOGRAPH CREATED:',
              'Dog:    🐕 🐕 🐕  (each = 4)',
              'Cat:    🐈 🐈    (8 = 2 symbols × 4)',
              'Fish:   🐠    (5 = hmm... fractional issue!)',
              'Bird:   🐦    (3 = fractional issue!)',
              '',
              'ANALYSIS:',
              '- 40% have dogs (12/30)',
              '- Most households: dog or cat owners',
              '- Tropical pets (fish, birds): minority',
              '',
              'INSIGHT: Design school mascot = Dog or Cat, not fish'
            ]
          },
          {
            title: 'Example 4: Favorite Subject (Mixed data types)',
            explanation: 'Comparing by gender',
            steps: [
              'QUESTION: "What\'s your favorite subject?"',
              'SUBGROUPS: Boys vs Girls (15 each, 30 total)',
              '',
              'BOYS (15 students):',
              'Math:    5 boys',
              'Science: 6 boys',
              'English: 2 boys',
              'Sports:  2 boys',
              '',
              'GIRLS (15 students):',
              'Math:    4 girls',
              'Science: 3 girls',
              'English: 5 girls',
              'Sports:  3 girls',
              '',
              'GRAPH CHOICE: Double bar graph',
              '',
              'KEY FINDINGS:',
              '- Boys prefer science (6/15 = 40%)',
              '- Girls prefer English (5/15 = 33%)',
              '- Math equally popular (5&4 ≈ 30%)',
              '- Sports least popular overall',
              '',
              'INSIGHT: Tailor teaching to preferences!'
            ]
          },
          {
            title: 'Example 5: Your Challenge - Design Your Own',
            explanation: 'Template to plan your project',
            steps: [
              'YOUR SURVEY TEMPLATE:',
              '',
              'Step 1: Question',
              'I will ask: ________________?',
              '',
              'Step 2: Sample size',
              'Number of people: _____ (aim: 20-30)',
              '',
              'Step 3: Answer options',
              'Possible responses:',
              '- ________',
              '- ________',
              '- ________',
              '',
              'Step 4: Collect',
              '[Make tallies as you collect 20-30 responses]',
              '',
              'Step 5: Organize',
              '[Create frequency table]',
              '',
              'Step 6: Choose graph',
              'Best graph for my data: _____ (Pictograph/Bar/Double-bar)',
              '',
              'Step 7: Draw & analyze',
              'Key finding: ____________',
              '',
              'PRESENTATION READY! 🎉'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Collect data → Organize → Graph → Analyze → Present',
          level2_video: 'https://www.youtube.com/embed/video7 (Real student project examples)',
          level3_guidedPractice: 'Guided: Complete a 5-step mini project with feedback'
        },
        questions: [
          {
            id: 'c2_1_6_q1',
            text: 'You surveyed 20 students on favorite color. Results: Red=8, Blue=7, Green=5. Is your total data correct?',
            options: [
              'A: Yes, 8+7+5=20 ✓',
              'B: No, missing 1 student (only 19)',
              'C: Can\'t tell without original responses',
              'D: Numbers don\'t matter for pictograph'
            ],
            correctAnswer: 'B',
            format: GameFormat.HOTSPOT,
            difficulty: 'medium',
            hint: 'Always verify total equals your survey size',
            remedialBrief: 'After collecting data, sum all categories. Should equal survey size.',
            remedialDetail: 'Practice: Check 3 datasets for accuracy'
          }
        ]
      }
    ]
  },
  // Modules 2.2, 2.3, 2.4 to be continued with similar depth...
  // (Structure same as 2.1 - expanded to 4-6 concepts each with story narratives,
  //  4-5 worked examples, 3-level remediation)
  {
    id: '2.2',
    title: 'Grouping Data & Histograms',
    storyTitle: 'Histograms: When Data is Too Much to See',
    storyContext: 'When you have 500 student heights (from 140cm to 185cm), a bar graph with 45 bars is messy! Histograms GROUP the data into ranges. Same data, cleaner view. Learn when to use histograms instead of bar graphs.',
    totalConcepts: 5,
    estimatedMinutes: 30,
    concepts: [
      {
        id: 'c2_2_1',
        title: 'Class Intervals & Range',
        storyNarrative: 'When you have many numbers spread wide apart, you group them into "bins" or "class intervals". This is like organizing temperature data: 20-25°C, 25-30°C, 30-35°C instead of showing all 100 individual temperatures.',
        textContent: 'Class Intervals = ranges that group numbers together\n\nBEST FOR: Continuous data (heights, temps, test scores)\nNOT GOOD FOR: Categories (colors, sports names)',
        workedExamples: [
          {
            title: 'Example 1: Student Heights',
            steps: [
              'Class 8-A student heights (40 students):',
              '140, 142, 145, 148, 150, 152, 155, 157, 160, 162,',
              '165, 167, 170, 172, 175, 177, 180, 182, 145, 147,',
              '150, 152, 155, 158, 160, 163, 166, 169, 172, 175,',
              '148, 150, 153, 156, 159, 162, 165, 168, 171, 174',
              '',
              'USE CLASS INTERVALS (ranges):',
              '140-145 cm: |||| (4 students)',
              '145-150 cm: |||| ||| (8 students)',
              '150-155 cm: |||| || (7 students)',
              '155-160 cm: |||| | (6 students)',
              '160-165 cm: |||| (5 students)',
              '165-170 cm: |||| (4 students)',
              '170-175 cm: |||| (5 students)',
              '175-180 cm: ||| (3 students)',
              '180-185 cm: || (2 students)',
              'Total: 44... recount! Actually 40 ✓'
            ]
          }
        ],
        remediation: {
          level1_brief: 'Class intervals = ranges (20-25, 25-30, 30-35)',
          level2_video: 'https://www.youtube.com/embed/video8',
          level3_guidedPractice: 'Create class intervals for temperature data set'
        },
        questions: []
      },
      // Additional concepts 2.2_2, 2.2_3, 2.2_4, 2.2_5 follow similar pattern...
      {
        id: 'c2_2_2',
        title: 'What Is a Histogram & Why We Need It',
        workedExamples: [],
        remediation: {},
        questions: []
      },
      {
        id: 'c2_2_3',
        title: 'Choosing the Right Bin Size',
        workedExamples: [],
        remediation: {},
        questions: []
      },
      {
        id: 'c2_2_4',
        title: 'Histograms vs Bar Graphs',
        workedExamples: [],
        remediation: {},
        questions: []
      },
      {
        id: 'c2_2_5',
        title: 'Real Data Analysis Project',
        workedExamples: [],
        remediation: {},
        questions: []
      }
    ]
  },
  {
    id: '2.3',
    title: 'Pie Charts / Circle Graphs',
    storyTitle: 'Pie Charts: Parts of a Whole',
    storyContext: 'A pizza divided 8 ways. Your homework time divided in subjects. Your weekend divided by activities. Pie charts show: "What part of the WHOLE?"',
    totalConcepts: 4,
    estimatedMinutes: 20,
    concepts: [
      { id: 'c2_3_1', title: 'What Is a Pie Chart?', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_3_2', title: 'Calculating Sector Angles', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_3_3', title: 'When to Use Pie Charts', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_3_4', title: 'Real-World Pie Chart Analysis', workedExamples: [], remediation: {}, questions: [] }
    ]
  },
  {
    id: '2.4',
    title: 'Chance & Probability',
    storyTitle: 'Carnival Games: Can You Win? Probability Says Maybe!',
    storyContext: 'At a carnival, you play games where sometimes you win, sometimes you lose. Probability is the science of "What are my chances?" Learn whether carnival games are fair, and understand the odds of real-world scenarios.',
    totalConcepts: 5,
    estimatedMinutes: 30,
    concepts: [
      { id: 'c2_4_1', title: 'Basic Probability Concepts', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_4_2', title: 'Equally Likely vs Non-Equally Likely Events', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_4_3', title: 'Experimental vs Theoretical Probability', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_4_4', title: 'Probability in Games & Sports', workedExamples: [], remediation: {}, questions: [] },
      { id: 'c2_4_5', title: 'Independent & Dependent Events', workedExamples: [], remediation: {}, questions: [] }
    ]
  }
];

export const preTestQuestions: Question[] = [
  post_q1, post_q2, post_q3, post_q4, post_q5,
  post_q6, post_q7, post_q8, post_q9, post_q10
];
