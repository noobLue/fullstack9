interface HWInfo {
  height: number;
  weight: number;
}

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
    text: "Obese (Class I",
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

const calculateBmi = (height: number, weight: number): string => {
  const bmi = getBmi(height, weight);
  const bmic = getBmiInfo(bmi);

  return bmic.text;
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
