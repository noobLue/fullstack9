import calculateBmi from "./helper";

interface HWInfo {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): HWInfo => {
  if (args.length === 4) {
    const height: number = Number(process.argv[2]);
    const weight: number = Number(process.argv[3]);
    if (!isNaN(height) && !isNaN(weight)) {
      return { height, weight };
    } else {
      throw new Error(
        `Either weight '${weight}' or height '${height}' was incorrectly parsed from command line arguments`
      );
    }
  } else {
    throw new Error(`Expected 2 arguments, got ${args.length - 2}`);
  }
};

try {
  const hw = parseArguments(process.argv);
  console.log(calculateBmi(hw.height, hw.weight));
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
