/**
 * Module 2.6: Data Ethics & Critical Thinking
 * Expanded with 3 concepts teaching students to question and verify data
 * Story: "Detective Raj Learns to Question Everything"
 */

export const module_2_6_expanded = {
  c2_6_1: {
    id: 'c2_6_1',
    title: 'Identifying Misleading Data',
    storyNarrative: `Detective Raj Finds a Crime Mystery

    Raj reads a shocking headline: "Crime increased 300% this year!"
    
    But Detective Raj knows better. He digs into the data. He finds the truth:
    "Previous year: 1 crime reported. This year: 3 crimes reported. Yes, 3 ÷ 1 = 300% increase."
    
    But this is misleading! With only 1 crime the previous year, a 300% jump means just 2 MORE crimes. 
    The headline makes it sound like the city is becoming dangerous. The real story: 
    "In a city of 1 million people, we now have 3 crimes. The city is actually incredibly safe."
    
    The data is technically correct, but presented to mislead and create fear!`,
    textContent: `
COMMON WAYS PEOPLE MISLEAD WITH DATA

TECHNIQUE 1: CHERRY-PICKING DATA
"My business grew 400% this year!"
Hidden truth: I got a haircut on January 1, 2022. My hair grew 0.1mm. By December 31, it grew 2cm (2000% growth!)
But that's just hair growth, irrelevant to business!

REAL-WORLD EXAMPLE:
A phone company says: "Customer satisfaction improved 50%!"
Reality: They only surveyed people who renewed their contracts (happy customers). 
They didn't survey people who left the company (unhappy customers).
Misleading because they handpicked favorable data!

TECHNIQUE 2: MISLEADING GRAPH AXIS
Graph showing ice cream sales (labeled "Revenue Crisis!"):
- Y-axis starts at 998 instead of 0
- Sales went from 1000 to 1005
- Looks like a scary spike!
- Actually just 0.5% increase

Why people do this: Small changes look DRAMATIC on slanted axis

TECHNIQUE 3: CORRELATION ≠ CAUSATION
Headline: "Ice cream causes drowning!"
Data shows: Ice cream sales increase in summer → Drowning deaths increase in summer

But correlation isn't causation! Both increase BECAUSE summer arrives (warmer weather).
Ice cream doesn't cause drowning. Heat and water cause drowning.

REAL EXAMPLES OF FALSE CAUSATION:
"Roosters cause sunrise!" (Rooster crows at 6am, sunrise at 6:05am, but rooster didn't CAUSE it)
"Left-handed people die earlier!" (Actually: older generation more right-handed, so fewer lefties, not causation)
"Social media causes depression!" (Maybe, or maybe depression causes social media use)

TECHNIQUE 4: INCOMPLETE SAMPLING
"9 out of 10 doctors recommend our toothpaste!"
Hidden: We surveyed only 10 doctors, all paid by us
Actual truth: If we surveyed 1,000 independent dentists, 4 out of 10 recommend it

Small, biased samples mislead!

TECHNIQUE 5: USING AGGREGATE DATA TO HIDE TRUTH
"Average salary in our company: $50,000"
Sounds fair? Unless:
- CEO: $500,000
- Executives (5): $200,000 each
- Everyone else (100): $30,000 each

Average: (500k + 1m + 3m) ÷ 106 = $43,396 ... wait, that math is wrong.
Actually: (500,000 + 1,000,000 + 3,000,000) ÷ 106 = $43k per person average
Wait let me recalculate: Total = $4.5M, average = $4.5M ÷ 106 ≈ $42.5k

But over 100 regular employees earn only $30k! 
The average is misleading because 1 person earns WAY more.`,

    workedExamples: [
      {
        title: 'Example 1: The Misleading Percentage',
        explanation: `A company claims "Revenue increased 500%!" Is this impressive?`,
        steps: [
          'Last year revenue: $100',
          'This year revenue: $600',
          'Calculation: (600-100)/100 × 100% = 500% (technically correct)',
          'But: Started so small ($100) that $600 is still tiny',
          'Context needed: Is $600 revenue enough to survive? Probably not',
          'Lesson: Percentages can hide small absolute numbers'
        ]
      },
      {
        title: 'Example 2: Misleading Graph Scales',
        explanation: `Two graphs of the same data. First looks scary, second looks normal.`,
        steps: [
          'Actual data: Sales increased from 1000 to 1010 units (1% growth)',
          'Bad graph: Y-axis from 990-1020. The line looks like a cliff!',
          'Good graph: Y-axis from 0-2000. The line is a tiny blip',
          'Same data, different visual impression',
          'Lesson: Always check the axis scale! Liars use zoomed-in scales'
        ]
      },
      {
        title: 'Example 3: Correlation vs Causation',
        explanation: `"Chocolate consumption increases happiness!" says a chocolate company.`,
        steps: [
          'Data collected: 1000 people → chocolate eaters report 7/10 happiness',
          'Non-chocolate eaters report 5/10 happiness',
          'Claim: "Chocolate caused the 2-point happiness increase"',
          'Other explanations: Chocolate eaters might be wealthier (wealth causes happiness)',
          'Or chocolate goes with dessert meals (meals cause happiness, not chocolate)',
          'Or happier people buy more treats generally (happiness causes chocolate, not vice versa)',
          'Lesson: Correlation needs much evidence before proving causation'
        ]
      },
      {
        title: 'Example 4: Biased Sampling',
        explanation: `A video game company claims "95% of players love our new update!"`,
        steps: [
          'Survey method: Players who completed all 25 achievements in one week',
          'Reality: Only hardcore players did 25 achievements (they loved it)',
          'Casual players who tried update once and quit: NOT surveyed',
          'True finding: 95% of dedicated players love it (but only 20% of players are dedicated)',
          'Lesson: Who answers surveys matters! Surveyors choose who to ask',
          'Better method: Random survey of ALL players'
        ]
      },
      {
        title: 'Example 5: How Averages Lie',
        explanation: `A neighborhood claims "average income $100,000" - sounds wealthy!`,
        steps: [
          'Reality: 99 families earn $40,000; 1 billionaire lives there',
          'Math: (99×40k + 1×1B) ÷ 100 = (3.96M + 1B) / 100 = $10.039M / 100 = $100,390',
          'Average looks rich, but 99% of people earn only $40k!',
          'Median (middle value) = $40,000 = TRUE picture',
          'Lesson: Average can be misleading. Always ask for median or distribution!'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Numbers Can Lie',
        content: `Data is truthful, but HOW you present it matters. Imagine saying "I grew 1000% 
        taller!" if you were 1cm and grew to 10cm. Technically true, but misleading (you're still tiny). 
        This is why we must think critically about data. Numbers don't lie, but people can use 
        them dishonestly!`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Media Literacy',
        content: `News headlines use data to grab attention. "500% increase!" sounds scarier than 
        "5 more incidents." But are 5 incidents really a crisis? Understanding how numbers are 
        presented, which data is hidden, and what questions to ask separates informed people 
        from those misled by sensationalism.`
      },
      {
        level: 3,
        title: 'Interactive Practice: Be a Fact-Checker',
        content: `Find a news headline with a dramatic claim (e.g., "Teen Screen Time Causes 200% 
        Mental Health Crisis!"). Investigate: What data supports this? Is it correlation or causation? 
        Who conducted the study and might they be biased? Share your fact-check!`
      }
    ]
  },

  c2_6_2: {
    id: 'c2_6_2',
    title: 'Bias in Data Collection',
    storyNarrative: `The Invisible Bias That Almost Ruined Everything

    A school decides to improve: "Which subject should we improve? Let's collect student opinions!"
    
    The principal surveys only students in the Advanced Programs class during their exam prep session. 
    Results: "Students  love STEM and hate Languages!"
    
    But here's the invisible bias:
    - Advanced students are into STEM naturally
    - Surveyed during their exam time = stressed = negative about other subjects
    - Never asked: Regular students, arts-lovers, non-exam-stressed students
    
    The "data" was technically collected from real students, but the bias in WHICH students were 
    surveyed made the results completely misleading. Language arts actually has 80% satisfaction 
    among regular students! The survey never found that.
    
    Invisible bias can hide in the process itself!`,
    textContent: `
WHAT IS BIAS IN DATA COLLECTION?

Bias = Systematic error that favors one result over another
It's invisible because the data looks real and valid - but it's SKEWED in directions people don't see.

TYPES OF BIAS

TYPE 1: SELECTION BIAS
Definition: Who you choose to survey determines your results

EXAMPLE 1: Political Polling
- Survey 1: Call landlines at 3pm
  Result: "70% support Policy X" (mostly retired voters at home)
- Survey 2: Text message young voters
  Result: "30% support Policy X" (young people have different politics)
- Survey 3: Ask at mall (shoppers = free time + money)
  Result: "80% support Policy X" (generally wealthier, happier people)
- All three are "real data" but each is biased by WHO was surveyed!

TYPE 2: RESPONSE BIAS
Definition: How you ask affects what people answer

EXAMPLE 2: Leading Questions
Question A: "Do you support this good policy?" → 75% say yes
Question B: "Do you support this wasteful policy?" → 25% say yes
Same policy, different results! The question itself creates bias.

EXAMPLE 3: Social Desirability Bias
Question: "Do you exercise regularly?"
In-person survey: People lie (say "yes" to sound healthy) → 60% say yes
Anonymous online survey: Truth (lazy people admit it) → 30% say yes
People bias their answers based on who's asking!

TYPE 3: CONFIRMATION BIAS
Definition: Survey-designer's expectations affect results

EXAMPLE: Ice Cream Preference Study
Researcher expects: "Vanilla is most popular"
He asks: "Do you prefer vanilla's classic taste?" (leading)
Result: 80% prefer vanilla (but was the question fair?)
True question: "What's your favorite flavor?" → 40% vanilla, 35% chocolate, 25% other

TYPE 4: SURVIVOR BIAS
Definition: You only collect data from successful cases, ignoring failures

EXAMPLE: Gambler's Autobiography
Book title: "How I Got Rich from Horse Racing: My Strategy"
What you hear: His horse-racing method worked!
What's hidden: 99 people tried his method. 98 lost money. Only 1 (the author) won.
You never hear from the 98 failures because they didn't write books!

Real application: "Why did Company X succeed?" 
Researcher only interviews Company X (the success). Never talks to 10 similar companies that failed.
The "success strategy" might just be luck!

TYPE 5: CULTURAL BIAS
Definition: Surveys reflect one culture's values, not everyone's

EXAMPLE: Education Quality Survey
Question: "How important is individual achievement?"
- Western Culture: "Very important! 90% agree"
- Asian Culture: "Family/group harmony more important, 40% agree"
- Question itself shows Western bias in what it considers important
- Real answer: "Both matter, depending on culture" - but survey didn't allow that!`,

    workedExamples: [
      {
        title: 'Example 1: Detecting Selection Bias',
        explanation: `A restaurant claims "95% of customers love our food!" But how did they collect this data?`,
        steps: [
          'Scenario 1 (likely): Surveys only customers who returned (survival bias)',
          'Truth: Customers who hated food never came back (not in survey)',
          'Scenario 2 (better): Exit survey to ALL customers',
          'Many one-time visitors might say "meh" (not 95% love)',
          'Lesson: Pay attention to HOW data was collected, not just the result'
        ]
      },
      {
        title: 'Example 2: Recognizing Leading Questions',
        explanation: `Compare outcomes from different question phrasings about a new school rule:`,
        steps: [
          'Question A: "Do you agree we should have stricter discipline?" → 60% yes',
          'Question B: "Do you support unnecessary punishment?" → 20% yes',
          'Same underlying topic, different results due to question wording',
          'Question A sounds reasonable; Question B sounds harsh',
          'Lesson: The way a question is asked predetermines the answer'
        ]
      },
      {
        title: 'Example 3: Social Desirability Bias',
        explanation: `A school surveys: "How much time do you spend on homework?" Results vary by method:`,
        steps: [
          'Anonymous survey: "Average 30 minutes" (students honest)',
          'In-person with teacher: "Average 90 minutes" (students exaggerate)',
          'Same students, different answers based on who\'s asking',
          'Teacher wants to believe students study hard, so students claim they do',
          'Lesson: Method of collection (anonymous vs identified) affects answers'
        ]
      },
      {
        title: 'Example 4: Survivor Bias in Success Stories',
        explanation: `Article: "How TikTok stars got famous: 10 secrets to success!" But is this fair?`,
        steps: [
          'Article interviews 10 famous TikTokers who succeeded',
          'All 10 followed similar strategies, so article concludes those strategies work',
          'Hidden: 10,000 other people followed the same strategies but got 0 followers',
          'The strategies didn\'t make them succeed; other factors (timing, luck, quality) did',
          'Lesson: Only hearing from winners creates false lessons'
        ]
      },
      {
        title: 'Example 5: Invisible Cultural Bias',
        explanation: `Survey in India asks: "What is most important in a career?"`,
        steps: [
          'Option A: Personal satisfaction and individual growth',
          'Option B: Salary to support family',
          'Option C: Status and family honor',
          'Western survey would emphasize A (individual fulfillment)',
          'Indian survey should include B & C equally (family values)',
          'Survey built on Western bias misses Indian cultural values',
          'Lesson: Survey design reflects survey-designer\'s culture'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Who Gets Surveyed Matters',
        content: `Imagine asking only your best friends: "Am I a good friend?" They'll say "yes!" 
        Of course! But if you asked people who dislike you, they'd say "no." The truth is probably 
        somewhere in between. The same is true for any survey—WHO you ask determines the answer. 
        That's why good surveys try to ask a fair mix of people!`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Recognizing Invisible Bias',
        content: `Bias is dangerous because it looks like real data. Numbers look objective. But if 
        the process for collecting data was biased, the numbers are also biased. A restaurant surveying 
        only happy customers will have perfect ratings. That doesn't mean the food is perfect—it means 
        the survey only heard from satisfied people. Thinking critically means asking: "Who is this 
        survey missing?" and "How might that change the result?"​`
      },
      {
        level: 3,
        title: 'Interactive Practice: Design a Fair Survey',
        content: `You want to know: "Should our school have later start times?" Design a fair survey that 
        would give unbiased results. Consider: Who should you ask? (Morning people? Night owls? 
        Parents? Teachers?) How should you ask? (Anonymous? In person?) What questions would be fair? 
        (No leading questions?) Share your design and explain why it's fair!`
      }
    ]
  },

  c2_6_3: {
    id: 'c2_6_3',
    title: 'Data Privacy & Responsibility',
    storyNarrative: `Privacy Invasion: How Data Can Hurt

    Aisha's school collects data: "Which students scored lowest in Math?"
    
    The data is real and accurate. It's organized in a table. It's shared at a staff meeting.
    
    But someone leaves the papers at a coffee shop. They're found by students. Now everyone 
    knows: "Aman is worst at math. He's embarrassed."
    
    Aman also learns his data was shared without permission. He feels betrayed.
    
    The data was ethically collected, but it was shared without consent. This violates privacy.
    A data handler has a responsibility: "Just because I CAN share data doesn't mean I SHOULD."`,
    textContent: `
WHY PRIVACY MATTERS

PERSONAL DATA IS POWERFUL

Personal data includes:
- Your name, address, phone number
- Your grades, medical history, test scores
- Your browsing behavior, purchase history
- Your location (from your phone), your relationships, your interests
- Your financial information (credit card, bank balance)

Why this is powerful:
If someone has your data, they can:
- Predict your behavior (machine learning)
- Manipulate you (show you ads designed to influence you)
- Identify you (if they have enough data points)
- Steal from you (fraudsters use data to impersonate you)
- Discriminate against you (employers use data to decide who to hire/fire)
- Blackmail you (if they have embarrassing data)

LEGAL RIGHTS

In Europe: GDPR (General Data Protection Regulation)
"You OWN your data. Companies must ask permission to use it."

In USA: Weaker protections, but growing awareness
"Your data is valuable. It should be protected."

Basic rights people should have:
1. KNOW: What data is collected about you?
2. CONTROL: What happened to your data?
3. DELETE: Can you ask for your data to be erased?
4. OBJECT: Can you opt-out?

DATA HANDLER RESPONSIBILITY

If you collect data, you become responsible for:

1. SECURITY
- Store securely (encrypted, protected from hackers)
- Don't leave papers with personal data at coffee shops! (happened in real cases)
- If data is breached, notify people immediately

2. PURPOSE LIMITATION
- Collect data only for stated purpose
- If you collect "height for health class," don't sell to clothing companies
- Health data should never be shared with employers (discrimination risk)

3. CONSENT
- Ask permission before collecting sensitive data
- "Hiding" in fine print doesn't count
- "Opt-out" is weaker than "opt-in" (assume you don't consent unless you choose to)

4. TRANSPARENCY
- Be honest about how data is used
- "We collect analytics" is vague
- "We track clicks, scroll times, page visit order to recommend products" is transparent

REAL-WORLD DATA BREACHES

Case 1: Facebook-Cambridge Analytica Scandal (2018)
- Event: 87 million users' data shared without consent
- Used for: Political manipulation (showing different ads to influence voters)
- Harm: Democracy violated, privacy devastated
- Lesson: Your data can influence who you vote for, without you knowing

Case 2: Equifax Data Breach (2017)
- Breached: 150 million people's financial data (social security numbers, credit card info)
- Stolen by: Hackers
- Harm: Years of stolen identity, fraud, damaged credit
- Lesson: Companies hold your data but don't always protect it

Case 3: Uber Data Breach (2016)
- Breached: 57 million ride-sharers' data and driver data
- Response: Uber paid hackers to hide it (illegal cover-up!)
- Harm: Privacy violated + trust destroyed
- Lesson: Companies sometimes hide breaches instead of protecting you

BEST PRACTICES FOR DATA ETHICS

AS A DATA COLLECTOR:
1. Collect minimum data needed
   - Don't collect address if you only need email
2. Protect data from hackers
   - Use encryption, secure servers
3. Get consent
   - Ask first, assume no unless people say yes
4. Be transparent
   - Clearly explain how data is used
5. Allow access & deletion
   - Let people see/delete their own data

AS A DATA USER:
1. Understand you're the product
   - Free apps? You're the product. Your data is valuable.
2. Check privacy settings
   - Social media, phones, apps - minimize what you share
3. Use strong passwords
   - Hackers try to break in and steal data
4. Be skeptical of requests
   - If a website asks for data unrelated to service, that's suspicious
5. Know your rights
   - In many countries, you can request data deletion`,

    workedExamples: [
      {
        title: 'Example 1: When Sharing Data Hurts',
        explanation: `A school shares test scores by name publicly on a bulletin board. Is this ethical?`,
        steps: [
          'Technical question: Correct data? Yes, accurate test scores.',
          'Legal question: Did they have consent? Likely no.',
          'Ethical question: Can this hurt students? Yes, embarrassment, bullying.',
          'Answer: Even accurate data can be unethically shared',
          'Better practice: Posted anonymously or shown only to student + parent'
        ]
      },
      {
        title: 'Example 2: Data for Unexpected Purpose',
        explanation: `A weather app collects your location "to provide weather forecasts." 
        Later you learn it sells location data to advertisers.`,
        steps: [
          'Original purpose: Weather service (legitimate)',
          'New purpose: Selling location data (NOT disclosed)',
          'Your expectation: Location used only for weather',
          'Reality: Location sold to companies to track your shopping',
          'Ethical problem: Different purpose than promised',
          'Solution: Require explicit consent for data sales'
        ]
      },
      {
        title: 'Example 3: Identifying Biased Data Use',
        explanation: `A company collects job applicants' zip codes and uses it to decide who to hire.`,
        steps: [
          'Data collected: Name, experience, zip code, test score',
          'Algorithm: "Zip codes from wealthy areas = higher scores in program" (statistically)',
          'Decision: Hire more from wealthy zip codes',
          'Discrimination: Low-income zip codes less likely to be hired (even if equally qualified)',
          'Cause: Historical bias in training data (wealth correlates with education)',
          'Ethical problem: Using proxy data for discrimination',
          'Solution: Don\'t use zip code; focus on qualifications only'
        ]
      },
      {
        title: 'Example 4: Protecting Your Own Data',
        explanation: `You use a social media app that "respects privacy." How do you verify?`,
        steps: [
          'Check privacy settings: What\'s visible to public vs friends?',
          'Read privacy policy: How do they collect/use data?',
          'Ask questions: Do they sell data? Where is data stored? Can you delete it?',
          'Red flags: If company refuses to answer, data probably isn\'t protected',
          'Best practice: Use apps with good privacy track records',
          'Remember: "Free" app = you\'re the product'
        ]
      },
      {
        title: 'Example 5: Data Misuse Prevention',
        explanation: `Your school collects BMI (body mass index) data for health tracking. Misuse scenario:`,
        steps: [
          'Purpose 1: Health class learns about nutrition',
          'Purpose 2: Coach uses BMI to judge fitness',
          'Wrong use: Showing BMI data on PE class bulletin board (public embarrassment)',
          'Really wrong use: School selling health data to food companies',
          'Really REALLY wrong: Insurance company denies coverage based on school data',
          'Lesson: Same data, different uses = different harm potential'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Your Data is Valuable',
        content: `Your data (where you live, what you like, where you go) is valuable. Companies 
        want it because it helps them make money. Data about you should be protected like you'd 
        protect your money. Just like you wouldn't give your wallet to anyone, you shouldn't give 
        your data to anyone without understanding how they'll use it.`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Data Power',
        content: `Data about millions of people can be used to predict and influence behavior. 
        Political campaigns use data to decide which voters to target. Companies use data to decide 
        what prices to charge. Schools use data to decide which students need help. This power is 
        why privacy laws are crucial. If one entity has all data, they have too much power. 
        Democracy and fairness require that personal data be protected and controlled by individuals.`
      },
      {
        level: 3,
        title: 'Interactive Practice: Audit Your Digital Privacy',
        content: `Check your phone/computer: What apps do you use? Go through privacy settings 
        for your top 5 apps. How much data do they request? Location? Contacts? Photos? 
        Which permissions seem reasonable? Which seem excessive? Discuss with a parent which apps 
        to keep or delete. Practice saying "no" to unnecessary data collection!`
      }
    ]
  }
};

export default module_2_6_expanded;
