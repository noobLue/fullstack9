interface bmiClass {
  text: string;
  upperLim: number;
}

// listed in order of smallest to largest bmi class
const bmiInfo: bmiClass[] = [
  {
    text: "Underweight (Severe thinness)",
    upperLim: 16,
  },
  {
    text: "Underweight (Moderate thinness)",
    upperLim: 17,
  },
  {
    text: "Underweight (Mild thinness)",
    upperLim: 18.5,
  },
  {
    text: "Normal range",
    upperLim: 25,
  },
  {
    text: "Overweight (Pre-obese)",
    upperLim: 30,
  },
  {
    text: "Obese (Class I)",
    upperLim: 35,
  },
  {
    text: "Obese (Class II)",
    upperLim: 40,
  },
  {
    text: "Obese (Class III)",
    upperLim: Infinity,
  },
];

const getBmi = (height: number, weight: number): number => {
  return weight / Math.pow(height / 100, 2);
};

const getBmiInfo = (bmi: number): bmiClass => {
  for (let i = 0; i < bmiInfo.length; i++) {
    if (bmi < bmiInfo[i].upperLim) {
      return bmiInfo[i];
    }
  }

  throw new Error("Failed to place bmi in range");
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = getBmi(height, weight);
  const bmic = getBmiInfo(bmi);

  return bmic.text;
};

/* Exercises */

type Rating = 1 | 2 | 3;

const ratingText = ["Too bad so sad", "Looking good", "Amazing work buddy!"];

export interface Exercise {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Exercise => {
  console.log(dailyHours);
  const periodLength: number = dailyHours.length;
  const average: number =
    dailyHours.reduce((acc, h) => acc + h, 0) / periodLength;
  let rating: Rating = 1;
  if (average > target) rating = 2;
  if (average > target * 2) rating = 3;

  const exercise: Exercise = {
    periodLength,
    trainingDays: dailyHours.filter((h) => h > 0).length,
    target,
    average,
    success: average > target,
    rating,
    ratingDescription: ratingText[rating - 1],
  };

  return exercise;
};

export default calculateBmi;
