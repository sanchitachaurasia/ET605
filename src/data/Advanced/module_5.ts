import { Module, GameFormat } from '../../types';

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
  };

export const module_5: Module = filterModuleByPath(moduleData, 'C');
