/**
 * Module 2.5: Real-World Data Applications
 * Expanded with 3 concepts showing data use in different industries
 * Story: "How Data Powers the World Around You"
 */

export const module_2_5_expanded = {
  c2_5_1: {
    id: 'c2_5_1',
    title: 'Data in Sports & Gaming',
    storyNarrative: `Champion's Secret Weapon

    Cricket player Virat Kohli uses data science to improve his game. Coaches collect data 
    on: bowling speeds, ball trajectories, fielder positions, bounce angles. They organise 
    this data and create graphs showing: "Pace bowlers bowl at 140 km/h from this position. 
    Virat struggles against yorkers on the leg side." 
    
    With this data, Virat practises the weak area. He gets better. Data gave him a competitive edge!`,
    textContent: `
HOW SPORTS TEAMS USE DATA

WHAT DATA DO THEY COLLECT?

1. PLAYER PERFORMANCE
   - Runs scored in each match
   - Wickets taken
   - Catch success rate
   - Average runs per over

2. MATCH CONDITIONS
   - Batting order
   - Opponent strategy
   - Weather conditions
   - Ground type (slow, fast, bouncy)

3. PHYSICAL DATA
   - Player speed (10-meter sprint time)
   - Strength (weight lifted)
   - Coordination (accuracy tests)

HOW THEY ORGANISE & USE IT

Example: Selecting a Cricket Team for Australia Tour

Raw data collected:
- Virat Kohli: 8 matches, 320 runs, avg 40, vs pace = weak
- Rohit Sharma: 8 matches, 380 runs, avg 47.5, vs pace = strong
- Hardik Pandya: 8 matches, 200 runs, avg 25, bowling avg 30

Coach's decision:
1. Organise in a table→ Compare easily
2. Create graphs → See patterns
3. Analyse weakness → "Virat struggles vs pace bowlers"
4. Select team → "Take Rohit (stronger vs pace), leave Virat for spinning pitches"
5. Result → Better performance!

REAL-WORLD APPLICATIONS

Basketball: NBA teams use data to find underrated players at cheap prices
- Example: 2014 Golden State Warriors bought Stephen Curry (considered weak defender)
- Data showed: excellent 3-point shooter, perfect for new "3-point heavy" strategy
- Result: Cheapest superstar ever, revolutionised basketball
- Cost: $600 million/year instead of $800 million
- Return: 2 championships, $1 billion in revenue

Football: Data predicts which players will become stars
- Teams collect: age, previous performance, physical metrics, match footage
- Analytics software predicts: "This 19-year-old will be world-class in 3 years"
- Teams buy young players BEFORE they become expensive celebrities
- Example: Liverpool FC discovered Mohamed Salah before he was famous using data
- Cost: $40 million
- Now worth: $150 million

Gaming: Data improves video game balance & player experience
- Game developers collect: Which weapons do players use most?
- Which levels do players quit?
- Which characters are overpowered?
- They organize this data and adjust games
- Better balanced games = happier players = more sales`,

    workedExamples: [
      {
        title: 'Example 1: Selecting Tournament Players',
        explanation: `Data for 5 batsmen over 10 matches. Coach must pick 3 for tournament.`,
        steps: [
          'Raw data collected: Runs, wickets, catch success, strike rate',
          'Organise in table: Compare all metrics side-by-side',
          'Analysis: Player A (1500 runs) > Player B (1200 runs)',
          'Decision: Select top 3 players by average runs',
          'Result: Team performs better, wins tournament'
        ]
      },
      {
        title: 'Example 2: Identifying Weakness',
        explanation: `A batsman scores 50 runs vs slow bowlers but 10 runs vs fast bowlers. Data reveals weakness.`,
        steps: [
          'Collect: Performance vs different bowling types',
          'Organise: Vs slow (avg 40), vs fast (avg 10)',
          'Analysis: Huge weakness against fast bowling',
          'Decision: Practice fast bowling in nets',
          'Result: Improves weakness, becomes complete batsman'
        ]
      },
      {
        title: 'Example 3: Predicting Future Stars',
        explanation: `Young player shows potential. Data from similar players predicts his future.`,
        steps: [
          'Collect: Age, training hours, natural ability, speed',
          'Compare to: 20 historical players at same age',
          'Pattern found: 18 of those 20 became superstars',
          'Prediction: 95% chance this player will be superstar',
          'Decision: Invest heavily in training this player now'
        ]
      },
      {
        title: 'Example 4: Game Balance Using Data',
        explanation: `A video game gun is used in 80% of matches. Data shows it\'s overpowered.`,
        steps: [
          'Track: Weapon usage rates across 100,000 matches',
          'Organised by weapon: Pistol (20%), Rifle (70%), Shotgun (10%)',
          'Analysis: Rifle used too much = overpowered',
          'Decision: Reduce rifle damage by 15%',
          'Result: After patch, distribution = 35%, 35%, 30% (balanced!)'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Sports Teams Use Data Too',
        content: `Just like your school tracks attendance, sports teams track player performance. 
        Coaches watch matches, record statistics (runs, wickets, speeds), and use this information 
        to improve players and win games. Data helps anyone get better at what they do!`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Competitive Advantage',
        content: `Professional sports teams spend millions on data analysis because it gives them 
        an edge. A player who understands their own weakness (from data analysis) can fix it. 
        A team that knows the opponent's weakness can exploit it. Data transforms talent into success.`
      },
      {
        level: 3,
        title: 'Interactive Practice: Analyze Your Own Performance',
        content: `Track your own data for one week: study hours, sleep hours, test scores. 
        Organize in a table. Can you spot any patterns? For example: "When I sleep 8+ hours, 
        I score higher." This is personal data analysis! Try it and report your findings.`
      }
    ]
  },

  c2_5_2: {
    id: 'c2_5_2',
    title: 'Data in Business & Marketing',
    storyNarrative: `Shopkeeper's Smart Decision

    Ram runs a small grocery shop. He notices customers often complain: "Why don't you stock 
    almond milk?" But he also sees expired products on his shelf. Ram decides to collect data.
    
    For one month, he records: Which products sell quickly? Which expire? Which does everyone ask for?
    He organises this data into charts. The patterns are obvious: "Almond milk: 50 customer requests. 
    Whole milk: 5 sales per day." Ram stocks more almond milk, fewer dairy products, and his business 
    improves! Data helped him make a better decision than guessing.`,
    textContent: `
HOW BUSINESSES USE DATA TO SUCCEED

WHAT DATA DO BUSINESSES COLLECT?

1. CUSTOMER BEHAVIOR
   - What do they buy?
   - When do they buy?
   - How much do they spend?
   - What do they complain about?

2. SALES DATA
   - Which products sell fastest?
   - Which products sit on shelf (wasted)?
   - What's the profit margin?
   - Which season sells more?

3. CUSTOMER FEEDBACK
   - Ratings and reviews
   - Customer complaints
   - Suggestions for improvement

HOW THEY ORGANISE & USE IT

Example: Large e-commerce platform (like Amazon)

Raw data:
- Millions of web searches per day
- Millions of purchases
- Thousands of product reviews
- Customer browsing patterns

Organisation:
1. Group by product category
2. Sort by popularity (most searched, most bought)
3. Analyze reviews (positive vs negative)
4. Track browsing patterns

Decisions made:
1. Stock more of popular items → faster delivery
2. Place popular items on homepage → more visibility
3. Fix issues mentioned in negative reviews → happier customers
4. Recommend products to specific customers → increase sales

Result: Amazon predicts what you want to buy and shows it on your feed!

REAL-WORLD APPLICATIONS

Netflix Recommendation System:
- Collects: What shows do YOU watch? What do you skip? What do similar users watch?
- Organises by: User preferences, genre, rating
- Decides: "You watched 3 crime dramas. 89% of people who did loved this new crime series"
- Recommends: That new crime series specifically to you
- Result: You watch more → Netflix makes more money

Starbucks Location Strategy:
- Collects data: Where are the wealthy neighborhoods? Where are office buildings? 
  Foot traffic patterns? Competitor locations?
- Organises by: Foot traffic, income levels, business density
- Decision: Open stores in high-traffic, wealthy areas with office buildings
- Avoids: Rural areas with low income and low foot traffic
- Result: 35,000 stores worldwide positioned for maximum profit

Fashion Retailers:
- Collect: What colors sell in summer? Winter? Different regions?
- Data shows: Red dresses sell 3x more in Valentine's month
- Decisions: Stock red dresses in January, clearance other colors
- Result: Higher sales, less wasted inventory

Fast Food Health Initiatives:
- Collected: Customers overwhelmingly want healthier options
- Organised by: Demand, customer demographics, health trends
- Decision: Add salads, reduce fried options
- Result: Happier customer base, better brand reputation`,

    workedExamples: [
      {
        title: 'Example 1: Stock Management Decision',
        explanation: `A shop owner must decide: stock more milk or almond milk? Data from last month:`,
        steps: [
          'Raw data: Sales, customer requests, shelf life',
          'Organize: Milk (5 sales/day, 5 requests, expires in 10 days)',
          'Almond milk: (3 sales/day, 20 requests, lasts 3 months)',
          'Analysis: Almond milk wanted more, Milk expires quickly',
          'Decision: Stock 70% almond milk, 30% milk',
          'Result: Happy customers, less waste'
        ]
      },
      {
        title: 'Example 2: Predicting Shopping Patterns',
        explanation: `A store owner collects 1 year of sales data. What should he stock more?`,
        steps: [
          'December: Hot chocolate sales = 300 units',
          'June: Hot chocolate sales = 10 units',
          'Pattern found: Hot chocolate season = winter',
          'Decision: Stock heavily in Oct-Feb, lightly in Mar-Sep',
          'Result: Avoid expired unsold inventory'
        ]
      },
      {
        title: 'Example 3: Customer Satisfaction',
        explanation: `A shop collects 500 customer reviews. 400 mention: "Long checkout queues." Data-driven solution:`,
        steps: [
          'Organized feedback: 80% complain about checkout speed',
          'Analysis: This is main pain point',
          'Decision: Add self-checkout counter',
          'Result: Faster service, happier customers, more loyalty'
        ]
      },
      {
        title: 'Example 4: Personalized Recommendations',
        explanation: `An online store tracks: You bought 3 chemistry books. What to recommend?`,
        steps: [
          'Track: You (and 99 similar buyers) bought chemistry books',
          'Data shows: 85% of chemistry buyers also bought lab notebooks',
          'Decision: Recommend lab notebooks to you',
          'Result: You find a product you wanted, store makes extra sale'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Shops Use Data Too',
        content: `Shop owners watch what customers buy. If everyone asks for almond milk but 
        he stocks only dairy milk, he's losing business. Data helps owners understand what customers want 
        and stock accordingly. It's just smart business!`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Data-Driven Decisions',
        content: `Businesses that use data wisely become successful. They know what customers want 
        before customers fully realize it themselves. Netflix recommends shows you love. Amazon 
        suggests products you need. Good shops have what you want when you want it. This magic comes from data analysis!`
      },
      {
        level: 3,
        title: 'Interactive Practice: Shop Like a DataMaster',
        content: `Next time at a shop, observe: Where are items placed? Why? (Answer: High-profit items at 
        eye level!) What seasonal items appear when? Can you predict what the owner data might show? 
        Think like a retailer using data!`
      }
    ]
  },

  c2_5_3: {
    id: 'c2_5_3',
    title: 'Data in Health & Environment',
    storyNarrative: `Doctor Sharma Saves Lives

    Doctor Sharma notices a terrible pattern: Three children from the same neighborhood are 
    hospitalised in a month with respiratory problems. Too much coincidence!
    
    She collects data: Where do patients live? What's the pollution level? What's the water quality? 
    When she organises this data into maps and charts, a pattern emerges: All three children live 
    near a factory with poor air quality standards. She alerts authorities. The factory is audited. 
    Emissions are controlled. The next month: Zero respiratory hospitalizations from that area!
    
    Data saved lives by identifying a hidden pattern.`,
    textContent: `
HOW DOCTORS & ENVIRONMENT EXPERTS USE DATA

WHAT DATA DO THEY COLLECT?

1. DISEASE TRACKING
   - Who gets sick and where?
   - What are the symptoms?
   - What cities/areas have higher disease rates?
   - What time of year are diseases most common?

2. ENVIRONMENTAL DATA
   - Air quality measurements
   - Water quality
   - Pollution levels
   - Deforestation rates
   - Climate patterns

3. HEALTH CORRELATIONS
   - Disease rates vs pollution levels
   - Health outcomes vs diet
   - Hospital admission rates vs weather

HOW THEY ORGANISE & USE IT

Example: COVID-19 Pandemic Response

Raw data collected:
- Millions of test results (positive/negative)
- Hospital bed occupancy
- Death rates
- Vaccination rates
- Mobility patterns

Organisation:
1. Organize by: City, region, date, age group
2. Create time-series graphs showing disease spread
3. Compare vaccination rates to death rates
4. Track variants and mortality

Decisions made:
1. Lockdowns in high-spread areas (data showed 90% spread through mobility)
2. Vaccination priorities for elderly (data showed 10x higher death rate)
3. Mask rules in crowded places (data showed effective transmission prevention)
4. When to relax restrictions (data showed declining cases)

Result: Data helped governments minimize deaths and prepare healthcare systems

REAL-WORLD APPLICATIONS

Cancer Research: Identifying Risk Factors
- Collect: 50,000 cancer patients' data (age, diet, smoking, family history)
- Organize by: Type of cancer, risk factors
- Finding: 85% of lung cancer patients smoked or were exposed to smoke
- Decision: Prevention campaigns target smokers
- Result: Lung cancer rates drop by 30% in 10 years

Environmental Protection: Monitoring Deforestation
- Collect: Satellite images of forests in Amazon, India, Indonesia
- Organize by: Year, region, forest type
- Trend found: 20% deforestation in last 5 years
- Decision: Protect remaining forest, plant 1 billion trees
- Monitor: Use satellites and data to track new trees' growth
- Result: Slow deforestation, restore habitats

Water Quality Management: Protecting Drinking Water
- Collect: Monthly water samples from urban water supply
- Test for: Bacteria, chemicals, pH level, chlorine content
- Organize: By sampling location, test date, pollutant type
- Finding: Bacteria levels exceed safe limits in Area X
- Decision: Alert public, identify contamination source, fix infrastructure
- Result: Safe drinking water restored

Air Quality & Health: Revealing Hidden Connections
- Collect: Daily air quality index + hospital admission rates
- Organize by: Day, location, pollutant type
- Finding: On high-pollution days, respiratory admissions increase by 40%
- Decision: Warn elderly/asthmatics to stay indoors on pollution warnings
- Result: Fewer hospitalisations, lives saved`,

    workedExamples: [
      {
        title: 'Example 1: Disease Outbreak Detection',
        explanation: `A city has a sudden spike in fever cases. Doctor collects data to find the cause.`,
        steps: [
          'Collect: Location of patients, water source, food consumed',
          'Organize by: Neighborhood, date of symptom onset',
          'Pattern found: All patients from neighborhood X ate from Restaurant Y on date Z',
          'Investigation: Food poisoning at restaurant, not contagious disease',
          'Decision: Close restaurant, audit food safety',
          'Result: Stopped panic, identified real culprit'
        ]
      },
      {
        title: 'Example 2: Pollution Causing Illness',
        explanation: `Asthma cases increase in City A. Environmental data investigation:`,
        steps: [
          'Collect: Asthma hospitalizations by neighborhood + air pollution levels',
          'Organize by: Neighborhood, month, pollution index',
          'Correlation found: High pollution areas = 3x more asthma cases',
          'Cause identified: New factory with poor emission controls',
          'Decision: Enforce stricter emission standards on factory',
          'Result: Pollution decreases by 40%, asthma cases drop'
        ]
      },
      {
        title: 'Example 3: Vaccination Effectiveness',
        explanation: `Scientists collect data on vaccinated vs unvaccinated people with a disease.`,
        steps: [
          'Collect: 100,000 people → 50,000 vaccinated, 50,000 unvaccinated',
          'Track: How many caught the disease?',
          'Results: Vaccinated = 2% infection rate, Unvaccinated = 30% infection rate',
          'Analysis: Vaccine is 93% effective at preventing infection',
          'Decision: Promote vaccination as primary disease prevention',
          'Result: 60% of population vaccinated, disease nearly eliminated'
        ]
      },
      {
        title: 'Example 4: Climate Change Patterns',
        explanation: `Scientists track temperature over 50 years to understand climate trends.`,
        steps: [
          'Collect: Daily temperatures from 1970-2020 for 50 years',
          'Organize by: Year, season, location',
          'Trend found: Global average temperature increased 1.1°C in 50 years',
          'Graph created: Clear upward trend line',
          'Decision: Climate change is real and accelerating',
          'Result: Governments commit to carbon reduction targets'
        ]
      }
    ],

    remediationLevels: [
      {
        level: 1,
        title: 'Gentle Review: Doctors Use Data to Help',
        content: `Doctors track patient symptoms and patterns to diagnose diseases. If 100 people 
        who eat at Restaurant X get sick, data shows the restaurant is the problem. If neighborhoods 
        near factories have more respiratory diseases, data shows the connection. Data helps doctors 
        and scientists protect public health!`
      },
      {
        level: 2,
        title: 'Deeper Explanation: Evidence-Based Medicine',
        content: `Modern medicine is evidence-based. Doctors don't just guess—they use data! 
        Research tracks: Which medicines work? which treatments cause side effects? What lifestyle 
        factors affect health? Data from millions of patients creates guidelines that save lives. 
        That's why data in medicine is absolutely critical.`
      },
      {
        level: 3,
        title: 'Interactive Practice: Track Your Health Data',
        content: `For one week, track your health data: Sleep hours, exercise time, eating healthy, 
        mood, energy level. At week's end, organize in a table. Can you spot patterns? 
        "Better sleep = better mood"? "Exercise = more energy"? Create your own health insights!`
      }
    ]
  }
};

export default module_2_5_expanded;
