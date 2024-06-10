type Rating = 1 | 2 | 3;

const ratingText = ["Too bad so sad", "Looking good", "Amazing work buddy!"];

interface Exercise {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

interface Arguments {
  days: number[];
  target: number;
}

const calculateExercises = (dailyHours: number[], target: number): Exercise => {
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

const parseArguments2 = (args: string[]): Arguments => {
  if (args.length <= 2) throw new Error("Missing target value");
  if (args.length == 3) throw new Error("No training days provided in input");

  const target = Number(args[2]);
  if (isNaN(target) || target < 0 || target > 24)
    throw new Error(
      `Failed to parse daily target value from ${args[2]}, parsed as ${target}`
    );

  const days: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const number = Number(args[i]);
    if (isNaN(number) || number < 0 || number > 24) {
      throw new Error(
        `Provided input ${args[i]}, as a number: ${number}, was not a valid representation of daily hours`
      );
    }
    days.push(number);
  }

  return { days, target };
};

try {
  const input = parseArguments2(process.argv);
  console.log(calculateExercises(input.days, input.target));
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
