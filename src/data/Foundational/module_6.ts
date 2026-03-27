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
  };

export const module_6: Module = filterModuleByPath(moduleData, 'A');
