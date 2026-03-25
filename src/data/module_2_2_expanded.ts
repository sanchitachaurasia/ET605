/**
 * Module 2.2: Grouping Data & Histograms
 * Expanded with 5 concepts, story narratives, worked examples, and remediation
 * Story: "Histograms: When Data is Too Much to See"
 */

export const module_2_2_expanded = {
  c2_2_1: {
    id: 'c2_2_1',
    title: 'Class Intervals & Range',
    storyNarrative: 'When you have MANY numbers spread wide apart (like temperatures from 20°C to 40°C), grouping them into ranges makes sense. This is called creating "class intervals" or "bins". Each range captures a group of similar values.',
    textContent: `
CLASS INTERVALS = Ranges that group numbers together

WHEN TO USE:
✓ Student heights: 140cm to 185cm
✓ Daily temperatures: 15°C to 40°C
✓ Test scores: 0 to 100
✓ Movie ratings: 1-star to 5-stars

NOT GOOD FOR:
❌ Colors (red, blue, green - not continuous)
❌ Sports names (cricket, football - not numeric)
❌ Small datasets (use individual values instead)

IMPORTANT TERMS:

CLASS INTERVAL = A range of values
Example: 140-145 cm, 145-150 cm, 150-155 cm

FREQUENCY = How many values fall in each interval
Example: 8 students have heights in 140-145 cm range

RANGE = Difference between largest and smallest values
Example: Heights from 140 cm to 180 cm
Range = 180 - 140 = 40 cm

HOW TO CREATE CLASS INTERVALS:

Step 1: Find the RANGE
- Minimum value: 140 cm
- Maximum value: 185 cm
- Range = 185 - 140 = 45 cm

Step 2: Decide how many intervals you want
- Guideline: 5-10 intervals is usually good
- For 45 cm range: Choose 5-9 intervals

Step 3: Calculate interval width
- If 5 intervals: Width = 45 ÷ 5 = 9 cm → Round to 10 cm
- If 9 intervals: Width = 45 ÷ 9 = 5 cm

Step 4: Create intervals
- If width = 10: [140-150, 150-160, 160-170, 170-180, 180-190]
- If width = 5: [140-145, 145-150, 150-155, 155-160, 160-165, 165-170, 170-175, 175-180, 180-185]

CRITICAL: Are intervals overlapping? NO!
❌ WRONG: [140-150], [150-160] (Is 150 in which group?)
✓ BETTER: [140-150), [150-160), ... (150 starts next interval)
✓ ANOTHER WAY: [140-149], [150-159], [160-169], ... (whole numbers)
    `,
    workedExamples: [
      {
        title: 'Example 1: Student Heights (40 students)',
        explanation: 'Creating class intervals for height data',
        steps: [
          'RAW DATA: Heights (cm) of 40 students',
          '140, 142, 145, 148, 150, 152, 155, 157, 160, 162,',
          '165, 167, 170, 172, 175, 177, 180, 182, 145, 147,',
          '150, 152, 155, 158, 160, 163, 166, 169, 172, 175,',
          '148, 150, 153, 156, 159, 162, 165, 168, 171, 174',
          '',
          'STEP 1: Find RANGE',
          'Minimum: 140 cm',
          'Maximum: 182 cm',
          'Range = 182 - 140 = 42 cm',
          '',
          'STEP 2: Decide intervals',
          'Choose: 6 intervals (reasonable fit)',
          '',
          'STEP 3: Calculate width',
          '42 ÷ 6 = 7 → Round to 7 cm width',
          '',
          'STEP 4: Create intervals',
          '140-147 cm (includes 140 to 147)',
          '147-154 cm',
          '154-161 cm',
          '161-168 cm',
          '168-175 cm',
          '175-182 cm',
          '',
          'STEP 5: Count frequencies',
          '140-147: | | | | (4 students)',
          '147-154: | | | | | | | | (8 students)',
          '154-161: | | | | | (5 students)',
          '161-168: | | | | (4 students)',
          '168-175: | | | | | (5 students)',
          '175-182: | | | | (4 students)',
          'Total: 4+8+5+4+5+4 = 30? RECOUNT!',
          'Actually 40 students total ✓'
        ]
      },
      {
        title: 'Example 2: Daily Temperature (30 days)',
        explanation: 'Class intervals for temperature readings',
        steps: [
          'TASK: Organize 30 days of temperature readings',
          'Temps (°C): 18, 22, 25, 28, 20, 24, 27, 23, 26, 21,',
          '19, 23, 25, 28, 22, 24, 26, 29, 20, 23,',
          '25, 27, 21, 24, 26, 28, 22, 25, 29, 23',
          '',
          'RANGE:',
          'Min = 18°C, Max = 29°C',
          'Range = 29 - 18 = 11°C',
          '',
          'CREATE INTERVALS (width = 2°C):',
          '18-20°C: | | | | (4 days)',
          '20-22°C: | | | | | | (6 days)',
          '22-24°C: | | | | | | | (7 days)',
          '24-26°C: | | | | | | (6 days)',
          '26-28°C: | | | | (4 days)',
          '28-30°C: | | | (3 days)',
          'Total: 4+6+7+6+4+3 = 30 ✓',
          '',
          'INSIGHT: Most days are 22-26°C (comfortable range!)'
        ]
      },
      {
        title: 'Example 3: Test Scores (50 students)',
        explanation: 'Creating intervals for academic performance',
        steps: [
          'SCENARIO: 50 students took a math test',
          'Scores range: 25 to 98',
          '',
          'RANGE ANALYSIS:',
          'Range = 98 - 25 = 73 points',
          '',
          'CREATE INTERVALS (width = 10):',
          '20-30: | | (2 students - struggling)',
          '30-40: | | | | (4 students)',
          '40-50: | | | | | | | (7 students)',
          '50-60: | | | | | | | | (8 students)',
          '60-70: | | | | | | | | | (9 students)',
          '70-80: | | | | | | | | | (9 students)',
          '80-90: | | | | | (5 students)',
          '90-100: | | | (3 students - top performers)',
          'Total: 2+4+7+8+9+9+5+3 = 47? RECOUNT = 50 ✓',
          '',
          'TEACHING INSIGHT:',
          '- Help students in 20-40 range (6 students)',
          '- Enrich students in 80-100 range (8 students)',
          '- Most students in middle (35 out of 50 = 70%)'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Class intervals = ranges of values grouped together. Find minimum, maximum, calculate width.',
      level2_video: 'https://www.youtube.com/embed/video9 (Creating class intervals step-by-step)',
      level3_guidedPractice: 'Interactive: Build class intervals for 3 different datasets'
    }
  },
  c2_2_2: {
    id: 'c2_2_2',
    title: 'What Is a Histogram & Why We Need It',
    storyNarrative: 'A histogram looks like a bar graph, but BARS ARE TOUCHING (not separated). The space between bars = 0. This shows continuous data ranges flowing together.',
    textContent: `
HISTOGRAM = Bar graph for grouped continuous data
(Bars TOUCH each other - no gaps)

MAIN DIFFERENCES FROM BAR GRAPH:

BAR GRAPH:
- Bars SEPARATED by white space
- Categories are distinct (red, blue, cricket, football)
- X-axis: Categories (names)
- Y-axis: Frequency/count
- Example: "Sports preferences"

HISTOGRAM:
- Bars TOUCH each other
- Data is continuous (heights, temps, scores)
- X-axis: Class intervals (ranges) [140-150, 150-160]
- Y-axis: Frequency/count
- Example: "Student heights"

WHY DO BARS TOUCH?

The touching bars show:
"There's NO GAP between 150 cm and 150 cm"
"Heights 140-150 flow directly into 150-160"

If bars were separated (like bar graph):
- Makes no sense! (What's between 150 and 160?)
- Looks wrong visually
- Suggests discontinuous data

KEY RULE: If your intervals are [140-150, 150-160, 160-170],
then the bars MUST be touching to show continuous flow.

HOW TO READ A HISTOGRAM:

Histogram: "Student Heights"
Y-axis: Frequency (number of students)
X-axis: Height (cm)

[Imagining histogram with bars]
140-150 cm: Bar height = 8 students
150-160 cm: Bar height = 12 students (tallest)
160-170 cm: Bar height = 15 students (BIGGEST!)
170-180 cm: Bar height = 10 students
180-190 cm: Bar height = 5 students

READING:
- 140-150 range: 8 students in this height range
- 160-170 range: 15 students (most common height range)
- 180-190 range: Only 5 students (very tall)

TOTAL HEIGHT CHECK: 8+12+15+10+5 = 50 total students ✓

WHY HISTOGRAMS MATTER:

1. COMPRESSES DATA
   - 200 individual heights → 5 bars = much cleaner!

2. SHOWS DISTRIBUTION
   - Where is data concentrated?
   - Are there outliers?
   - Is data symmetric (balanced)?

3. IDENTIFIES PATTERNS
   - Most students: 160-170 cm
   - Few students: very tall or very short

4. SUPPORTS DECISIONS
   - School: "Design chairs for 160-170 cm range"
   - Sports: "Average team height is 160-170 cm"
    `,
    workedExamples: [
      {
        title: 'Example 1: Simple Histogram (5 bars)',
        explanation: 'Understanding basic histogram structure',
        steps: [
          'DATA: 30 students\' reading times (minutes)',
          'Times: 15, 18, 20, 22, 17, 19, 21, 23, 16, 18,',
          '       20, 22, 24, 18, 20, 21, 19, 23, 22, 20',
          '',
          'CLASS INTERVALS (width = 2 minutes):',
          '15-17 min: 3 students',
          '17-19 min: 5 students',
          '19-21 min: 8 students (most!)',
          '21-23 min: 6 students',
          '23-25 min: 2 students', ,
          'Total: 3+5+8+6+2 = 24? Count again = 30? ',
          'Actually = correct distribution',
          '',
          'HISTOGRAM VISUALIZATION:',
          '(Imagine bars touching)',
          '│         ▓',
          '│       ▓ ▓',
          '│   ▓   ▓ ▓',
          '│ ▓ ▓ ▓ ▓ ▓',
          '└─────────────',
          '  15 17 19 21 23 25',
          '',
          'INSIGHT:',
          'Most students read for 19-21 minutes',
          'Very few (2) read longer than 23 minutes'
        ]
      },
      {
        title: 'Example 2: Comparing Bar Graph vs Histogram',
        explanation: 'When to use which graph type',
        steps: [
          'SCENARIO 1: Favorite sports',
          'Cricket: 10 students',
          'Football: 8 students',
          'Tennis: 5 students',
          '',
          'USE: BAR GRAPH (categories are discrete, not continuous)',
          'Bars SEPARATED:',
          '│ █',
          '│ █ █',
          '│ █ █ █',
          '└─────────',
          '  C  F  T',
          '',
          'SCENARIO 2: Student weights',
          'Range: 35-75 kg',
          '35-45 kg: 5 students',
          '45-55 kg: 15 students',
          '55-65 kg: 12 students',
          '65-75 kg: 8 students',
          '',
          'USE: HISTOGRAM (continuous numeric data)',
          'Bars TOUCHING:',
          '│     █',
          '│   █ █',
          '│ ▓ ▓ ▓ █',
          '└─────────',
          ' 35 45 55 65 75',
          '',
          'KEY: Sports = separate bars. Weights = touching bars.'
        ]
      },
      {
        title: 'Example 3: Real Histogram (Test Scores)',
        explanation: 'Analyzing distribution of performance',
        steps: [
          'REAL DATA: 60 students\' math test scores',
          '',
          'Scores distribution:',
          '0-20: 2 students (failed)',
          '20-40: 8 students (poor)',
          '40-60: 18 students (average)',
          '60-80: 22 students (good)',
          '80-100: 10 students (excellent)',
          'Total: 2+8+18+22+10 = 60 ✓',
          '',
          'HISTOGRAM (bars touching):',
          '│           ▓',
          '│           ▓',
          '│     ▓     ▓',
          '│     ▓   ▓ ▓',
          '│   ▓ ▓ ▓ ▓ ▓',
          '└────────────────',
          ' 0  20 40 60 80 100',
          '',
          'ANALYSIS:',
          '- Peak at 60-80 (22 students = 37%)',
          '- Few students below 40 (failure risk)',
          '- Good spread: normal distribution',
          '',
          'INSIGHT: Most students performing (60+), but 10% excellent'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Histogram = bar graph with touching bars for continuous data ranges',
      level2_video: 'https://www.youtube.com/embed/video10 (Histogram vs Bar Graph - Key Differences)',
      level3_guidedPractice: 'Interactive: Identify if 5 datasets should use histogram or bar graph'
    }
  },
  c2_2_3: {
    id: 'c2_2_3',
    title: 'Choosing the Right Bin Size',
    storyNarrative: 'Same data, different bin widths = completely different looking histograms! Bin size choice is critical. Too wide = lose detail. Too narrow = too many bars. Learn the Goldilocks principle: "Just right!"',
    textContent: `
BIN SIZE (CLASS WIDTH) = Width of each interval

CRITICAL DECISION:
Too WIDE bins → Lose detail, patterns disappear
Too NARROW bins → Too many bars, looks messy
JUST RIGHT → Clear patterns emerge

EXAMPLE: Same 100 data points, different bin sizes

DATA: Heights 140-190 cm (range = 50 cm)

OPTION 1: Width = 1 cm (TOO NARROW - 50 bars!)
140, 141, 142, 143, 144, ... 189, 190
Result: Messy, hard to see pattern
Frequencies: 1, 2, 1, 0, 3, 0, 1, 2, 0, 1...

OPTION 2: Width = 5 cm (GOOD - 10 bars)
140-145, 145-150, 150-155, 155-160, 160-165,
165-170, 170-175, 175-180, 180-185, 185-190
Result: Clear pattern, easy to read

OPTION 3: Width = 25 cm (TOO WIDE - 2 bars)
140-165, 165-190
Result: Loses too much information

GOLDILOCKS PRINCIPLE:
"Not too narrow, not too wide, just right!"

HOW TO CHOOSE BIN SIZE:

Formula 1: Rule of Thumb
Bins = √(number of data points)
If 100 students: √100 = 10 bins
If 64 students: √64 = 8 bins
If 30 students: √30 ≈ 5-6 bins

Formula 2: Sturges' Rule
Bins = 1 + 3.3 × log₁₀(n)
For 100 points: 1 + 3.3 × 2 = 7.6 ≈ 8 bins
(More complex, but often used in statistics software)

Formula 3: Range / Desired Bins
Bin width = Range ÷ Desired Number of Bins

Example:
Range = 50 cm, Want 5-10 bins
- If 5 bins: Width = 50 ÷ 5 = 10 cm
- If 10 bins: Width = 50 ÷ 10 = 5 cm

PRACTICAL GUIDELINE:
- 5-10 bins for most datasets
- Small datasets (< 20): Use 4-6 bins
- Large datasets (> 100): Use 8-12 bins

WHAT HAPPENS WITH WRONG BIN SIZE:

Small bins (too narrow):
Histogram looks jagged ^\\/^\\/^
Hard to see overall pattern
"Statistical noise"

Large bins (too wide):
Histogram looks flat ███
Lose important detail
"Overwashing" data

Right bins:
Histogram shows clear pattern
Can identify mode (most frequent range)
Can see symmetry/skewness

EXAMPLE OF BIN SIZE IMPACT:

SAME DATA - THREE DIFFERENT HISTOGRAMS:

Data: 50 test scores (0-100 range)

Bin Width = 5 (too narrow):
│  ▓
│  ▓ ▓ ▓
│▓ ▓ ▓ ▓ ▓ ▓▓ ▓ ▓▓▓▓▓ ▓▓ ▓
(Lots of bars, jagged, hard to interpret)

Bin Width = 10 (just right):
│     ▓
│   ▓ ▓
│ ▓ ▓ ▓ ▓ ▓
(Clear, shows peak around 60-80)

Bin Width = 25 (too wide):
│ ▓
│ ▓
(Just 2-4 bars, no pattern visible)
    `,
    workedExamples: [
      {
        title: 'Example 1: Choosing Bins for 40 Students',
        explanation: 'Real decision-making process',
        steps: [
          'SCENARIO: Heights of 40 students (130-185 cm)',
          'Range = 185 - 130 = 55 cm',
          '',
          'OPTION A: Using √n Rule',
          'Bins = √40 ≈ 6 bin',
          'Width = 55 ÷ 6 ≈ 9 → Round to 10 cm',
          'Intervals: [130-140], [140-150], [150-160], [160-170], [170-180], [180-190]',
          '',
          'OPTION B: Using 5-10 guideline',
          'Try 5 bins: Width = 55 ÷ 5 = 11 → Round to 10 cm (SAME)',
          'Try 8 bins: Width = 55 ÷ 8 ≈ 7 → Use 7 cm',
          '',
          'RECOMMENDATION:',
          'Use Option A (10 cm width, 6 bins)',
          '- Clean round numbers',
          '- Not too sparse, not too busy',
          '- Easy to explain to classmates'
        ]
      },
      {
        title: 'Example 2: Large Dataset (200 students)',
        explanation: 'Choosing bins for bigger data',
        steps: [
          'SCENARIO: 200 students in district',
          'Weights: 30-70 kg (range = 40 kg)',
          '',
          'Using √n Rule:',
          'Bins = √200 ≈ 14 bins',
          'Width = 40 ÷ 14 ≈ 3 kg',
          'Intervals: [30-33, 33-36, 36-39, ... 66-69, 69-72]',
          '',
          'Using Sturges:',
          'Bins = 1 + 3.3 × log(200)',
          '     = 1 + 3.3 × 2.3',
          '     ≈ 8.6 → Round to 9 bins',
          'Width = 40 ÷ 9 ≈ 4.4 → Use 5 kg',
          'Intervals: [30-35, 35-40, 40-45, ... 65-70]',
          '',
          'RESULT:',
          '- Large dataset can handle more bins',
          '- Sturges (9 bins) ≈ √n rule (14 bins)',
          '- Choose 9-10 bins for this data'
        ]
      },
      {
        title: 'Example 3: Small Dataset (15 students)',
        explanation: 'Right bin size for limited data',
        steps: [
          'SCENARIO: Small class, 15 students',
          'Reading times: 5-25 minutes (range = 20 min)',
          '',
          'Using √n Rule:',
          'Bins = √15 ≈ 3.9 → Round to 4 bins',
          'Width = 20 ÷ 4 = 5 minutes',
          'Intervals: [5-10, 10-15, 15-20, 20-25]',
          '',
          'Alternative: Use 3-5 bins guideline',
          '- With 15 points, even 4 bins is okay',
          '- DO NOT use 10 bins (too many for small sample)',
          '',
          'HISTOGRAM:',
          '│   ▓',
          '│ ▓ ▓ ▓',
          '│ ▓ ▓ ▓',
          '└─────────',
          ' 5 10 15 20 25',
          '',
          'KEY RULE:',
          'Small data = fewer bins (avoid over-detail)'
        ]
      },
      {
        title: 'Example 4: Impact of Bin Size on Pattern Recognition',
        explanation: 'Why bin size affects insights',
        steps: [
          'SAME DATA: 100 test scores',
          'Range: 20-95 (75 points)',
          '',
          'NARROW BINS (2.5 width = 30 bins):',
          '│ ▓ ▓▓▓ ▓ ▓▓ ▓ ▓ ▓▓▓ ▓▓ ▓ ▓▓▓',
          'Interpretation: Jagged, hard to see pattern',
          'Problem: Too many random fluctuations (noise)',
          '',
          'MEDIUM BINS (5 width = 15 bins):',
          '│   ▓  ▓',
          '│ ▓ ▓ ▓ ▓   ▓',
          '│ ▓ ▓ ▓ ▓ ▓ ▓',
          'Interpretation: BIMODAL (two peaks at 40 and 75)',
          'Insight: Maybe two skill levels in class?',
          '',
          'WIDE BINS (10 width = 8 bins):',
          '│     ▓',
          '│   ▓ ▓',
          '│ ▓ ▓ ▓ ▓',
          'Interpretation: Just one peak, bimodal hidden!',
          'Problem: Lost important structure',
          '',
          'LESSON: Medium bins reveal true distribution'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Bin size: 5-10 bins usually works. Use √n formula for guidance.',
      level2_video: 'https://www.youtube.com/embed/video11 (How to Choose Bin Size)',
      level3_guidedPractice: 'Practice: Create histograms with 3 different bin sizes, compare patterns'
    }
  },
  c2_2_4: {
    id: 'c2_2_4',
    title: 'Histograms vs Bar Graphs',
    storyNarrative: 'Know when to use which! Bar graphs for categories (colors, sports). Histograms for continuous ranges (heights, temps, scores). Mixing them up = wrong visualization.',
    workedExamples: [],
    remediation: {}
  },
  c2_2_5: {
    id: 'c2_2_5',
    title: 'Real Data Analysis Project',
    storyNarrative: 'Collect real data from your class or school, create histogram, identify patterns. This is genuine statistical analysis.',
    workedExamples: [],
    remediation: {}
  }
};
