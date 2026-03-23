import { GameFormat } from '../../types';

export const inline_2_2_q1 = {
  id: 'inline_2_2_q1',
  text: 'Using the table (0-10=2, 10-20=10, 20-30=21, 30-40=19, 40-50=7, 50-60=1), how many students scored LESS THAN 20 marks?',
  hint: 'Less than 20 = ALL classes whose upper limit ≤ 20. Find which classes those are and add their frequencies.',
  remedialBrief: '0–10 (freq=2) and 10–20 (freq=10). Total = 2+10 = 12 students.',
  remedialDetail: '"Less than 20" means every class whose values are below 20. That is 0–10 AND 10–20. You must ADD BOTH: 2+10=12.',
  styles: {
    [GameFormat.RAINDROP]: {
      options: ['2', '10', '12', '21'],
      correctAnswer: '12'
    }
  }
};

export const inline_2_2_q2 = {
  id: 'inline_2_2_q2',
  text: 'Workers wages grouped: 800–810=6, 810–820=3, 820–830=9, 830–840=8, 840–850=2. Which class has the MOST workers?',
  hint: 'Most workers = highest frequency. Find the biggest number.',
  remedialBrief: '820–830 has frequency 9 — the highest. Most workers earn in 820–830.',
  remedialDetail: 'Scan the frequency column for the LARGEST number. Values are: 6, 3, 9, 8, 2. Largest=9. That is class 820–830.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['800–810', '810–820', '820–830', '830–840'],
      correctAnswer: '820–830'
    }
  }
};

export const inline_2_2_q3 = {
  id: 'inline_2_2_q3',
  text: 'From the marks histogram (0-10=2, 10-20=10, 20-30=21, 30-40=19, 40-50=7, 50-60=1), how many students scored 40 marks or MORE?',
  hint: '40 or more = classes 40–50 AND 50–60. Add both.',
  remedialBrief: '40–50: 7 + 50–60: 1 = 8 students scored 40 or more.',
  remedialDetail: '"40 or more" includes BOTH 40–50 (freq=7) AND 50–60 (freq=1). Do NOT forget the last class. 7+1=8.',
  styles: {
    [GameFormat.RAINDROP]: {
      options: ['7', '8', '9', '6'],
      correctAnswer: '8'
    }
  }
};

export const inline_2_2_q4 = {
  id: 'inline_2_2_q4',
  text: 'TV hours watched: 1hr=4, 2hr=8, 3hr=22, 4hr=32, 5hr=8, 6hr=6, 7hr=5. Total=85 students. What fraction watched MORE than 5 hours? Give in simplest form.',
  hint: 'More than 5 hours = 6-hour group + 7-hour group. Then divide by total. Simplify.',
  remedialBrief: 'More than 5 hrs: 6+5=11. Total=85. Fraction=11/85. GCD(11,85)=1. Already simplest.',
  remedialDetail: 'Step 1: list which classes are "more than 5 hours": 6-hour (freq=6) and 7-hour (freq=5). Step 2: add: 6+5=11. Step 3: total students = 4+8+22+32+8+6+5=85. Step 4: fraction = 11/85.',
  styles: {
    [GameFormat.DRAG_SORT]: {
      options: ['11/85', '6/85', '5/85', '11/80'],
      correctAnswer: '11/85'
    }
  }
};
