import { calculateExercises } from "./helper";

interface Arguments {
  days: number[];
  target: number;
}

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

  return { days, target } as Arguments;
};

try {
  const input: Arguments = parseArguments2(process.argv);
  console.log(calculateExercises(input.days, input.target));
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
