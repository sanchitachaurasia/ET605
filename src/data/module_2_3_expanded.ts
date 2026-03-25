/**
 * Module 2.3: Pie Charts / Circle Graphs
 * Expanded with 4 concepts showing "parts of a whole"
 * Story: "Pizza Fractions: Understanding Parts of a Whole"
 */

export const module_2_3_expanded = {
  c2_3_1: {
    id: 'c2_3_1',
    title: 'What Is a Pie Chart?',
    storyNarrative: 'A pizza is a whole. When divided 8 ways, each slice is 1/8. Pie charts show "What FRACTION of the total is each category?" Perfect for showing parts of a whole.',
    textContent: `
PIE CHART = Circle divided into slices representing parts of WHOLE

KEY CONCEPT: THE WHOLE = 360°
Each slice size is proportional to percentage

WHEN TO USE:
✓ Budget breakdown (rent 40%, food 30%, entertainment 20%, savings 10%)
✓ Student grades distribution (A's 20%, B's 40%, C's 25%, D's 15%)
✓ Favorite colors in class (blue 30%, red 25%, green 25%, yellow 20%)
✓ How you spend 24 hours (sleep 33%, school 25%, homework 20%, play 22%)

WHEN NOT TO USE:
❌ More than 5-6 categories (pie gets too crowded)
❌ Comparing two datasets (use side-by-side bars instead)
❌ When exact numbers matter (use table + bar graph instead)

IMPORTANT RULES:

1. ALL SLICES ADD TO 100% (or 360°)
2. Each slice = (percentage) × 360°
3. Label with both % and category name
4. Use different colors for each slice

EXAMPLE PIE CHART:

Title: "Your Weekly Time Budget (168 hours)"

[Imagining pie chart]
- Sleep: 56 hours = 33% = 119° slice
- School: 42 hours = 25% = 90° slice
- Homework: 34 hours = 20% = 72° slice
- Play: 36 hours = 22% = 79° slice

Check: 33% + 25% + 20% + 22% = 100% ✓
Check: 119° + 90° + 72° + 79° = 360° ✓

READING A PIE CHART:

Size of slice = Importance/Frequency
Bigger slice = More of that category

Example: School snack preferences
- Pizza slice (biggest): 40% of students
- Sandwich slice: 30%
- Fruit slice: 20%
- Cookie slice (smallest): 10%

Instant insight: Pizza >> Sandwich > Fruit = Cookie

WHY PIE CHARTS ARE POWERFUL:

1. INSTANT VISUAL: See distribution at a glance
2. PSYCHOLOGICAL: We understand "slices" naturally
3. WHOLE CONTEXT: Shows part-to-whole relationship (not just part-to-part)
4. BUSINESS READY: Commonly used in presentations
    `,
    workedExamples: [
      {
        title: 'Example 1: Favorite Ice Cream Flavors',
        explanation: 'Simple pie chart with 4 categories',
        steps: [
          'Survey: 50 students, "Favorite flavor?"',
          '',
          'Raw data:',
          'Vanilla: 18 students',
          'Chocolate: 15 students',
          'Strawberry: 10 students',
          'Mint: 7 students',
          'Total: 50 ✓',
          '',
          'Calculate percentages:',
          'Vanilla: 18/50 = 0.36 = 36%',
          'Chocolate: 15/50 = 0.30 = 30%',
          'Strawberry: 10/50 = 0.20 = 20%',
          'Mint: 7/50 = 0.14 = 14%',
          '',
          'Calculate angles:',
          'Vanilla: 36% × 360° = 130°',
          'Chocolate: 30% × 360° = 108°',
          'Strawberry: 20% × 360° = 72°',
          'Mint: 14% × 360° = 50°',
          'Total: 130 + 108 + 72 + 50 = 360° ✓',
          '',
          'PIE CHART:',
          '- Vanilla slice: 130° (36%) - BIGGEST',
          '- Chocolate slice: 108° (30%)',
          '- Strawberry slice: 72° (20%)',
          '- Mint slice: 50° (14%) - smallest',
          '',
          'INSIGHT: Vanilla & Chocolate dominate (66%)'
        ]
      },
      {
        title: 'Example 2: How Students Spend Daily Time',
        explanation: 'Pie chart showing time allocation (24-hour day)',
        steps: [
          'Track: Typical student\'s 24-hour day',
          '',
          'Time allocation:',
          'Sleep: 8 hours',
          'School: 6 hours',
          'Homework: 2 hours',
          'Meals: 1.5 hours',
          'Play/Sports: 4 hours',
          'Screen time: 2 hours',
          'Other: 0.5 hours',
          'Total: 24 hours ✓',
          '',
          'Convert to percentages:',
          'Sleep: 8/24 = 33%',
          'School: 6/24 = 25%',
          'Homework: 2/24 = 8%',
          'Meals: 1.5/24 = 6%',
          'Play: 4/24 = 17%',
          'Screen: 2/24 = 8%',
          'Other: 0.5/24 = 2%',
          'Total: 33 + 25 + 8 + 6 + 17 + 8 + 2 = 99% ≈ 100% ✓',
          '',
          'PIE CHART VISUALIZATION:',
          'Sleep (largest slice, 33%) + School (25%) = 58% of day!',
          'Play (17%) - kids want more!',
          'Screen (8%) - often feels like more',
          '',
          'INSIGHT: Education takes more than half your day'
        ]
      },
      {
        title: 'Example 3: School Budget Allocation',
        explanation: 'Realistic budget pie chart',
        steps: [
          'SCENARIO: School annual budget = ₹100 crores',
          '',
          'Budget breakdown:',
          'Teacher salaries: ₹50 crores',
          'Building maintenance: ₹20 crores',
          'Books/Materials: ₹15 crores',
          'Sports/Activities: ₹10 crores',
          'Admin: ₹5 crores',
          'Total: ₹100 crores ✓',
          '',
          'Pie chart percentages:',
          'Salaries: 50% (largest)',
          'Maintenance: 20%',
          'Books: 15%',
          'Sports: 10%',
          'Admin: 5% (smallest)',
          '',
          'Angles:',
          'Salaries: 50% × 360° = 180° (HALF the circle!)',
          'Maintenance: 20% × 360° = 72°',
          'Books: 15% × 360° = 54°',
          'Sports: 10% × 360° = 36°',
          'Admin: 5% × 360° = 18°',
          'Total: 360° ✓',
          '',
          'INSIGHT FOR STUDENTS:',
          '"Half of school budget pays teachers\' - shows their importance!'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Pie chart = circle divided into slices. Each slice = percentage of total (360°)',
      level2_video: 'https://www.youtube.com/embed/video12 (Reading & Creating Pie Charts)',
      level3_guidedPractice: 'Practice: Create 3 pie charts from different data types'
    }
  },
  c2_3_2: {
    id: 'c2_3_2',
    title: 'Calculating Sector Angles',
    storyNarrative: 'A circle has 360 degrees. Your pie slices must fit perfectly. If 40% are blue, that\'s 40% of 360 = 144 degrees. Learn to calculate exact slice angles.',
    textContent: `
SECTOR = Slice of a pie chart
SECTOR ANGLE = How many degrees wide the slice

FORMULA: Sector Angle = Percentage × 360°

EXAMPLE:
If category = 25% of total
Sector angle = 25% × 360° = 0.25 × 360° = 90°

STEP-BY-STEP CALCULATION:

Step 1: Calculate percentage
Percentage = (Category value / Total value) × 100%

Example: 15 students out of 50
Percentage = (15/50) × 100% = 30%

Step 2: Convert percentage to angle
Angle = Percentage × 360°
Angle = 30% × 360° = 0.30 × 360° = 108°

VERIFICATION CHECK:
All angles must sum to 360°
If you get 355° or 365°, you made a rounding error!

COMMON FRACTIONS & THEIR ANGLES:

1/4 = 25% = 90°
1/3 ≈ 33% = 120°
1/2 = 50% = 180°
2/3 ≈ 67% = 240°
3/4 = 75% = 270°

Quick reference:
20% = 72°
25% = 90°
30% = 108°
33% = 120°
50% = 180°

EXAMPLE CALCULATION - DETAILED:

Favorite color survey (100 students):
Red: 25 students
Blue: 30 students
Green: 20 students
Yellow: 25 students
Total: 100 ✓

Red: (25/100) × 360° = 0.25 × 360° = 90°
Blue: (30/100) × 360° = 0.30 × 360° = 108°
Green: (20/100) × 360° = 0.20 × 360° = 72°
Yellow: (25/100) × 360° = 0.25 × 360° = 90°

Verification: 90 + 108 + 72 + 90 = 360° ✓

HANDLING ROUNDING ERRORS:

When percentages don't divide evenly:
Data: 10 students
A: 3 students
B: 3 students
C: 2 students
D: 2 students

Percentages: 30%, 30%, 20%, 20%
Angles: 108°, 108°, 72°, 72°
Sum: 108 + 108 + 72 + 72 = 360° ✓

But what if: 5 students
A: 2 students = 40% = 144°
B: 2 students = 40% = 144°
C: 1 student = 20% = 72°
Sum: 144 + 144 + 72 = 360° ✓ Perfect!

COMPLEX EXAMPLE - NO PERFECT DIVISIONS:

Data: 7 students
A: 3 students = 3/7 = 42.86% = 154.3°
B: 2 students = 2/7 = 28.57% = 102.9°
C: 2 students = 2/7 = 28.57% = 102.9°
Sum: 154.3 + 102.9 + 102.9 = 360.1° ≈ 360° ✓
(0.1° rounding acceptable)
    `,
    workedExamples: [
      {
        title: 'Example 1: Simple 4-Part Pie (Perfect Divisions)',
        steps: [
          'Data: 40 students, favorite subject',
          'Math: 10 students',
          'Science: 12 students',
          'English: 10 students',
          'History: 8 students',
          'Total: 40 ✓',
          '',
          'Calculate angles:',
          'Math: (10/40) × 360° = 0.25 × 360° = 90°',
          'Science: (12/40) × 360° = 0.30 × 360° = 108°',
          'English: (10/40) × 360° = 0.25 × 360° = 90°',
          'History: (8/40) × 360° = 0.20 × 360° = 72°',
          '',
          'Check: 90 + 108 + 90 + 72 = 360° ✓',
          '',
          'Draw pie chart:',
          '- Start at 12 o\'clock (top)',
          '- Math: Draw 90° sector (quarter circle)',
          '- Science: Draw 108° sector',
          '- English: Draw 90° sector',
          '- History: Draw 72° sector'
        ]
      },
      {
        title: 'Example 2: Real-World Budget Pie',
        steps: [
          'Monthly pocket money: ₹1000',
          'Savings: ₹300',
          'Snacks: ₹200',
          'Comics: ₹250',
          'Movies: ₹150',
          'Other: ₹100',
          'Total: ₹1000 ✓',
          '',
          'Convert to angles:',
          'Savings: (300/1000) × 360° = 0.30 × 360° = 108°',
          'Snacks: (200/1000) × 360° = 0.20 × 360° = 72°',
          'Comics: (250/1000) × 360° = 0.25 × 360° = 90°',
          'Movies: (150/1000) × 360° = 0.15 × 360° = 54°',
          'Other: (100/1000) × 360° = 0.10 × 360° = 36°',
          '',
          'Verification: 108 + 72 + 90 + 54 + 36 = 360° ✓',
          '',
          'Insight: Comics + Savings = 198° (55% of budget!)'
        ]
      },
      {
        title: 'Example 3: Irregular Numbers (Rounding)',
        steps: [
          'Survey: 20 students (awkward number)',
          'Like Math: 7 students',
          'Like Science: 6 students',
          'Like English: 5 students',
          'Like History: 2 students',
          'Total: 20 ✓',
          '',
          'Calculate (with decimals):',
          'Math: (7/20) = 0.35 = 35% = 126°',
          'Science: (6/20) = 0.30 = 30% = 108°',
          'English: (5/20) = 0.25 = 25° = 90°',
          'History: (2/20) = 0.10 = 10° = 36°',
          '',
          'Check: 126 + 108 + 90 + 36 = 360° ✓'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Angle = Fraction × 360°. All angles must total 360°.',
      level2_video: 'https://www.youtube.com/embed/video13 (Calculating Sector Angles)',
      level3_guidedPractice: 'Practice: Calculate angles for 5 datasets, verify totals'
    }
  },
  c2_3_3: {
    id: 'c2_3_3',
    title: 'When to Use Pie Charts (and When NOT To)',
    storyNarrative: 'Pie charts are powerful but not always best. Too many slices = confusing. Comparing two datasets = use bars instead. Know when pie charts shine, and when to pick other graphs.',
    workedExamples: [],
    remediation: {}
  },
  c2_3_4: {
    id: 'c2_3_4',
    title: 'Real-World Pie Chart Analysis Project',
    storyNarrative: 'Find 3 real pie charts (online, newspapers, reports). Analyze them: What story do they tell? Are they honest or misleading? Create your own pie chart.',
    workedExamples: [],
    remediation: {}
  }
};
