/**
 * Module 2.4: Chance & Probability
 * Expanded with 5 concepts using "Carnival Games" narrative
 * Story: "Carnival Challenge: Can You Beat the Odds?"
 */

export const module_2_4_expanded = {
  c2_4_1: {
    id: 'c2_4_1',
    title: 'Basic Probability Concepts: What Are Your Chances?',
    storyNarrative: 'At the carnival, there\'s a wheel with 10 sections (3 red, 4 blue, 2 green, 1 yellow). If you spin, what\'s your chance of landing RED? That\'s probability! Learn to calculate "what are my chances?"',
    textContent: `
PROBABILITY = Mathematical way to say "What are my chances?"

FUNDAMENTAL FORMULA:
Probability = (Number of favorable outcomes) / (Total possible outcomes)

P(event) = favorable / total

EXAMPLE:
Rolling a die, what\'s probability of getting a 6?
- Favorable outcomes: 1 (rolling a 6)
- Total possible outcomes: 6 (rolling 1, 2, 3, 4, 5, or 6)
- P(rolling 6) = 1/6 ≈ 16.7%

KEY TERMS:

EVENT = Something that might happen
Examples: Rolling a 6, spinning red, drawing a heart

FAVORABLE OUTCOME = The event you want
Example: Rolling a 6 (when rolling die)

SAMPLE SPACE = All possible outcomes
Example: {1, 2, 3, 4, 5, 6} when rolling die

PROBABILITY RANGE:
- Minimum: 0 (impossible - 0%)
- Maximum: 1 (certain - 100%)
- Range: 0 ≤ P(event) ≤ 1

LANGUAGE TRANSLATION:
P = 0: "Impossible" (will never happen)
P = 0.25 (1/4): "Unlikely" (25% chance)
P = 0.5 (1/2): "Equally likely" (coin flip)
P = 0.75 (3/4): "Likely" (75% chance)
P = 1: "Certain" (will definitely happen)

CARNIVAL WHEEL EXAMPLE:

Carnival Wheel: 10 sections total
Red: 3 sections
Blue: 4 sections
Green: 2 sections
Yellow: 1 section
Total: 3 + 4 + 2 + 1 = 10 ✓

P(landing on Red) = 3/10 = 0.3 = 30%
P(landing on Blue) = 4/10 = 0.4 = 40%
P(landing on Green) = 2/10 = 0.2 = 20%
P(landing on Yellow) = 1/10 = 0.1 = 10%

CHECK: 0.3 + 0.4 + 0.2 + 0.1 = 1.0 ✓
(All probabilities must sum to 1.0)

WHY PROBABILITY MATTERS:

Insurance companies: "What\'s probability of car accident?"
Weather forecast: "40% chance of rain"
Sports betting: "70% chance team wins"
Medical tests: "95% accurate" = 95% probability correct
Carnival: "50% win rate" = P(win) = 0.5

REAL CARNIVAL ANALYSIS:

Game: "Draw a card from deck, get hearts you win"
Deck: 52 cards (13 hearts, 13 diamonds, 13 clubs, 13 spades)

P(drawing heart) = 13/52 = 1/4 = 0.25 = 25%
Translation: "You have 1 in 4 chance to win"

Expected games to win: If you play 4 times, expect 1 win
Reality: Might win 0, 1, 2, or all 4 (randomness!)
    `,
    workedExamples: [
      {
        title: 'Example 1: Card Deck Probabilities',
        explanation: 'Understanding probability with playing cards',
        steps: [
          'Standard deck: 52 cards',
          '- 13 Hearts',
          '- 13 Diamonds',
          '- 13 Clubs',
          '- 13 Spades',
          '- 4 Kings',
          '',
          'Question 1: P(drawing a Heart)?',
          'Answer: 13/52 = 1/4 = 25%',
          '',
          'Question 2: P(drawing a King)?',
          'Answer: 4/52 = 1/13 ≈ 7.7%',
          '',
          'Question 3: P(drawing a Red card)?',
          'Red = Hearts + Diamonds = 13 + 13 = 26',
          'Answer: 26/52 = 1/2 = 50%',
          '',
          'Question 4: P(drawing a Black King)?',
          'Black Kings = 2 (King of Clubs, King of Spades)',
          'Answer: 2/52 = 1/26 ≈ 3.8%',
          '',
          'INSIGHT: Specific events (Black King) are rare,',
          'General events (Red card) are common'
        ]
      },
      {
        title: 'Example 2: Carnival Dice Game',
        explanation: 'Rolling dice probabilities',
        steps: [
          'Game: Roll 2 dice, get sum of 7 you win',
          '',
          'Possible outcomes for 2 dice:',
          'Total outcomes = 6 × 6 = 36',
          '',
          'Ways to get 7:',
          '(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)',
          'Favorable outcomes = 6',
          '',
          'P(sum = 7) = 6/36 = 1/6 ≈ 16.7%',
          '',
          'Other probabilities:',
          'P(sum = 2) = 1/36 (only 1,1) = 2.8%',
          'P(sum = 12) = 1/36 (only 6,6) = 2.8%',
          'P(sum = 7) = 6/36 = 16.7% (MOST COMMON!)',
          '',
          'CARNIVAL INSIGHT:',
          'Game managers know 7 is most likely',
          'So "win if 7" is not a good bet for players!'
        ]
      },
      {
        title: 'Example 3: Spinner Probabilities',
        explanation: 'Colored spinners and fair games',
        steps: [
          'Carnival Spinner: 8 equal sections',
          'Red: 2 sections',
          'Blue: 3 sections',
          'Green: 2 sections',
          'Yellow: 1 section',
          '',
          'P(Red) = 2/8 = 1/4 = 25%',
          'P(Blue) = 3/8 ≈ 37.5%',
          'P(Green) = 2/8 = 1/4 = 25%',
          'P(Yellow) = 1/8 = 12.5%',
          '',
          'Check: 25% + 37.5% + 25% + 12.5% = 100% ✓',
          '',
          'Game fairness:',
          'If game says "50% chance to win Blue"',
          'But P(Blue) = 37.5%, not 50%',
          'Result: UNFAIR GAME! Players lose over time'
        ]
      },
      {
        title: 'Example 4: Carnival Prize Distribution',
        explanation: 'Real business model of carnival game',
        steps: [
          'Game: Draw colored ball from bag',
          'Bag contents:',
          '- 2 Red balls (win ₹100 prize)',
          '- 8 White balls (win nothing)',
          'Total: 10 balls',
          '',
          'P(winning ₹100) = 2/10 = 20%',
          'P(winning nothing) = 8/10 = 80%',
          '',
          'Business math:',
          'Cost to play: ₹50',
          'Prize value: ₹100 (if you win)',
          '',
          'Expected payout per game to player:',
          'E = 0.20 × ₹100 + 0.80 × ₹0',
          'E = ₹20',
          '',
          'Carnival profit per game:',
          '₹50 (cost to play) - ₹20 (expected payout) = ₹30 profit',
          '',
          'Over 100 games played:',
          'Carnival expects: ₹3000 profit',
          'Players expect: ₹2000 loss'
        ]
      }
    ],
    remediation: {
      level1_brief: 'P(event) = favorable outcomes / total outcomes. Range: 0 to 1 (0% to 100%)',
      level2_video: 'https://www.youtube.com/embed/video14 (Probability Fundamentals - Carnival Games)',
      level3_guidedPractice: 'Calculate probabilities for 5 scenarios (cards, dice, spinners)'
    }
  },
  c2_4_2: {
    id: 'c2_4_2',
    title: 'Equally Likely vs Non-Equally Likely Events',
    storyNarrative: 'Fair coins: heads and tails are equally likely (50% each). Unfair coins (weighted): different probabilities. Learn to spot fair vs rigged games at carnival!',
    textContent: `
EQUALLY LIKELY EVENTS = Each outcome has same probability
NON-EQUALLY LIKELY EVENTS = Different probabilities for outcomes

EQUALLY LIKELY EXAMPLE - FAIR COIN:
P(Heads) = 1/2 = 50%
P(Tails) = 1/2 = 50%
(Both equally likely)

NON-EQUALLY LIKELY EXAMPLE - LOADED CARNIVAL COIN:
If coin is weighted:
P(Heads) = 3/5 = 60%
P(Tails) = 2/5 = 40%
(Heads more likely - UNFAIR!)

FAIR VS UNFAIR GAMES:

FAIR GAME:
- All outcomes equally likely
- Probability = 1 / (number of outcomes)
- Example: Fair die: P(any number) = 1/6 each
- Carnival profit = 0 (sustainable long-term only if players lose)

UNFAIR GAME (Rigged):
- Some outcomes more likely than others
- Carnival advantage built in
- Example: P(7) rigged to be less than 6/36
- Players consistently lose

HOW TO TEST IF GAME IS FAIR:

TEST 1: Do all outcomes have equal probability?
- Fair coin: P(H) = 50%, P(T) = 50% ✓ EQUAL
- Loaded die: P(6) = 25%, others = 15% ✗ NOT EQUAL

TEST 2: Check the "expected value"
- Fair game might have expected value ≤ 0 for player
- If it\'s -50%, definitely unfair

TEST 3: Test empirically (play many times)
- Fair die rolled 600 times: each number appears ~100 times
- Loaded die rolled 600 times: one number appears 200+ times

CARNIVAL RED FLAGS:

🚩 Game heavily advertises probability ("70% win rate!")
   → Often false exaggeration

🚩 Prize value less than cost to play
   → Even if fair, you lose money overall

🚩 Game hides the rules
   → Sign of unfairness

🚩 Player always loses multiple times in a row
   → Suggests probability rigged against player

HONEST EQUAL-PROBABILITY GAMES:

✓ Fair coin flip: 50-50
✓ Fair die roll: 1/6 each
✓ Fair card draw: equal probability of each suit
✓ Roulette wheel: equal probability for each number

All these have equal P(outcome) for all options.

DETECTING NON-EQUAL PROBABILITY:

Example: "Carnival Wheel" spinner
8 sections = LOOKS like equal probability
But what if...?
- Red section is WIDE (covers 2 times normal)
- Blue section is THIN (covers half normal)
Result: P(Red) ≠ P(Blue) even though visually equal!

P(Red) = 2/8 = 25% (takes up 2 sections)
P(Blue) = 1/8 = 12.5% (takes up 1 section)

MATHEMATICAL CHECK:
For equally likely: All P(outcome) values are EQUAL
For non-equally likely: At least one P(outcome) differs
    `,
    workedExamples: [
      {
        title: 'Example 1: Fair vs Loaded Dice',
        explanation: 'Testing equality of probability',
        steps: [
          'Fair Die Test:',
          'Each face: 1, 2, 3, 4, 5, 6',
          'P(1) = 1/6',
          'P(2) = 1/6',
          '...',
          'P(6) = 1/6',
          'All equal → FAIR ✓',
          '',
          'Loaded Die Test:',
          'Weights inside: heavier on one side',
          'P(1) = 5%',
          'P(2) = 5%',
          'P(3) = 15%',
          'P(4) = 15%',
          'P(5) = 30% ← ← ← Highest!',
          'P(6) = 30% ← ← ← Highest!',
          'Not all equal → LOADED (UNFAIR) ✗',
          '',
          'Carnival Test:',
          '"Roll a 5 or 6 you win!"',
          'Fair die: P(5 or 6) = 2/6 = 33%',
          'Loaded die: P(5 or 6) = 60%',
          'Fair: Players win ⅓ of time',
          'Loaded: Players win 60% of time (TOO GOOD!)',
          'Must be other trick to make money'
        ]
      },
      {
        title: 'Example 2: Carnival Bag Test',
        explanation: 'Checking if prize distribution is fair',
        steps: [
          'Game: Draw ball from bag',
          'Cost: ₹10 per draw',
          'Prize: ₹50 for red ball, ₹0 for white',
          '',
          'Stated claim: "50-50 chance!"',
          '',
          'ACTUAL contents:',
          '5 red balls',
          '95 white balls',
          'Total: 100 balls',
          '',
          'Actual probability:',
          'P(Red) = 5/100 = 5%',
          'P(White) = 95/100 = 95%',
          '',
          'NOT 50-50!',
          'This is NON-EQUALLY LIKELY',
          'AND false advertising!',
          '',
          'Expected payout per game:',
          '0.05 × ₹50 + 0.95 × ₹0 = ₹2.50',
          '',
          'Player pays ₹10, expects to get ₹2.50 back',
          'Expected loss per game: ₹7.50',
          'Over 100 games: ₹750 loss!'
        ]
      },
      {
        title: 'Example 3: Rigged Spinner Analysis',
        explanation: 'Detecting visual deception',
        steps: [
          'Carnival Spinner: 4 sections (looks equal)',
          '',
          'Visual appearance:',
          'All 4 sections LOOK the same size',
          '[Drawn equally]',
          '',
          'Actual measurement:',
          'Red: 90°',
          'Blue: 90°',
          'Green: 90°',
          'Yellow: 90°',
          'Total: 360° ✓',
          '',
          'Calculation:',
          'P(Red) = 90/360 = 25%',
          'P(Blue) = 90/360 = 25%',
          'P(Green) = 90/360 = 25%',
          'P(Yellow) = 90/360 = 25%',
          '',
          'Result: EQUAL PROBABILITY',
          'This is FAIR ✓',
          '',
          'RIGGED VERSION:',
          'What if Yellow = 180°, others = 60° each?',
          'P(Yellow) = 50% (rigged!)',
          'Others = 17% each',
          'Carnival promises Yellow rarely wins',
          'But it wins 50% of time = player loses'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Equal probability: All outcomes have same chance. Non-equal: Different chances.',
      level2_video: 'https://www.youtube.com/embed/video15 (Fair vs Rigged Games)',
      level3_guidedPractice: 'Analyze 4 carnival games: determine if fair or rigged'
    }
  },
  c2_4_3: {
    id: 'c2_4_3',
    title: 'Experimental vs Theoretical Probability',
    storyNarrative: 'Theory says coin is 50-50. But flip it 10 times, you might get 7 heads. Theory ≠ Reality in short term. Understand why reality differs from expected.',
    textContent: `
THEORETICAL PROBABILITY = What SHOULD happen (mathematics)
EXPERIMENTAL PROBABILITY = What ACTUALLY happened (data from experiments)

EXAMPLE:

THEORETICAL (Math):
Fair coin: P(Heads) = 1/2 = 50%
Fair die: P(6) = 1/6 ≈ 16.7%

EXPERIMENTAL (Real coin flip):
Flip 10 times: Got 7 heads, 3 tails
Experimental P(Heads) = 7/10 = 70%
Experimental P(Tails) = 3/10 = 30%

COMPARISON:
Theoretical: 50% heads, 50% tails
Experimental: 70% heads, 30% tails
DIFFERENCE: 20% variation!

WHY THE DIFFERENCE?

Short term: RANDOMNESS causes variation
Long term: Experimental → Theoretical

Flip coin 10 times: Might be 7H-3T
Flip coin 1000 times: Will be ~500H-500T
Flip coin 1,000,000 times: ≅ 500,000H-500,000T

LAW OF LARGE NUMBERS:
As experiments increase, experimental probability → theoretical probability

CARNIVAL APPLICATION:

Game: "Spin wheel, land on RED you win"
Theoretical P(Red) = 3/8 = 37.5% (depends on wheel design)

Day 1 Results (20 spins):
Red: 8 times
Experimental P(Red) = 8/20 = 40%
(Close to theoretical!)

Day 1 Results (only 4 spins):
Red: 3 times
Experimental P(Red) = 3/4 = 75%
(Far from theoretical!)

Day 7 Results (1000 spins cumulative):
Red: 375 times
Experimental P(Red) = 375/1000 = 37.5%
(Matches theoretical!)

RANDOM vs RIGGED DETECTION:

RANDOM VARIATION (Normal):
Small samples show variation (10H-0T vs 5H-5T)
Large samples show pattern (≅500H-500T)

RIGGED DETECTION:
Even large samples show deviation
1000 coin flips: 800H-200T
This WON'T happen randomly! (Rigged!)

CONFIDENCE: How many trials needed?

Fewer trials (< 30):
- Don't trust experimental probability
- High randomness effect
- Might not match theoretical

Many trials (> 100):
- Experimental getting closer to theoretical
- Pattern emerging

Very many trials (> 1000):
- Experimental ≅ Theoretical
- Can reliably estimate probabilities
    `,
    workedExamples: [
      {
        title: 'Example 1: Coin Flipping Convergence',
        explanation: 'How experimental approaches theoretical with more flips',
        steps: [
          'Theoretical: P(Heads) = 50%',
          '',
          'Experiment 1: Flip 10 times',
          'Results: H,T,H,H,T,H,T,H,H,T',
          'Heads: 6',
          'Experimental P(H) = 6/10 = 60%',
          'Error: 60% - 50% = 10%',
          '',
          'Experiment 2: Flip 100 times',
          'Results: 53 heads, 47 tails',
          'Experimental P(H) = 53/100 = 53%',
          'Error: 53% - 50% = 3%',
          '',
          'Experiment 3: Flip 1000 times',
          'Results: 501 heads, 499 tails',
          'Experimental P(H) = 501/1000 = 50.1%',
          'Error: 50.1% - 50% = 0.1%',
          '',
          'Experiment 4: Flip 10,000 times',
          'Results: 5003 heads, 4997 tails',
          'Experimental P(H) = 5003/10000 = 50.03%',
          'Error: 50.03% - 50% ≅ 0%',
          '',
          'OBSERVATION:',
          'More flips → closer to 50%',
          'Large numbers make pattern clear'
        ]
      },
      {
        title: 'Example 2: Die Rolls (Spotting Cheating)',
        explanation: 'Using experiments to detect loaded dice',
        steps: [
          'Theoretical: Fair die P(6) = 1/6 ≈ 16.7%',
          '',
          'Test 1: Roll 30 times',
          'Got 6: 7 times',
          'Experimental P(6) = 7/30 ≈ 23%',
          'Higher than expected, but small sample (could be luck)',
          '',
          'Test 2: Roll 300 times',
          'Got 6: 85 times',
          'Experimental P(6) = 85/300 ≈ 28%',
          'MUCH higher than 16.7%!',
          'Probability of this by chance: < 1%',
          'CONCLUSION: Die is LOADED ✗',
          '',
          'Test 3: Compare with fair die',
          'Fair die, 300 rolls: 50 sixes (≈16.7%)',
          'Loaded die, 300 rolls: 85 sixes (≈28%)',
          'Difference too large → Loading confirmed!'
        ]
      },
      {
        title: 'Example 3: Carnival Game Analysis',
        explanation: 'Using data to evaluate if game is fair',
        steps: [
          'Carnival Wheel Game:',
          'Claimed P(Winning) = 40%',
          'Cost: ₹50',
          'Prize: ₹100',
          '',
          'Customer plays 100 times:',
          'Won: 32 times',
          'Experimental P(Win) = 32/100 = 32%',
          '',
          'Analysis:',
          'Claimed: 40%, Actual: 32%',
          'Difference: 8% (significant!)',
          'Over 100 games:',
          '- Expected to win: 40 times',
          '- Actually won: 32 times',
          '- Lost 8 extra times',
          '- Cost: 8 × ₹50 = ₹400 fraudulently taken?',
          '',
          'Verdict: LIKELY RIGGED or FALSE CLAIM',
          'Need more trials (1000) to be sure'
        ]
      }
    ],
    remediation: {
      level1_brief: 'Theoretical = math prediction. Experimental = real results. More trials → match closer.',
      level2_video: 'https://www.youtube.com/embed/video16 (Simulation: Theoretical vs Experimental)',
      level3_guidedPractice: 'Simulate 100 & 1000 rolls, compare experimental to theoretical'
    }
  },
  c2_4_4: {
    id: 'c2_4_4',
    title: 'Probability in Games & Sports',
    textContent: 'How atheletes, teams, and sports use probability in strategy and predictions.',
    workedExamples: [],
    remediation: {}
  },
  c2_4_5: {
    id: 'c2_4_5',
    title: 'Independent & Dependent Events',
    textContent: 'Flip coin twice: independent. Draw 2 cards without replacing: dependent. Learn the difference.',
    workedExamples: [],
    remediation: {}
  }
};
