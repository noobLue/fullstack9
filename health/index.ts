import express from "express";
import calculateBmi, { calculateExercises } from "./helper";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.status(200).send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query.weight || !req.query.height) {
    return res.status(422).json({ error: "missing parameters" });
  }

  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(422).json({ error: "malformatted parameters" });
  }

  const bmi: string = calculateBmi(height, weight);

  return res.status(200).json({ weight, height, bmi });
});

interface Body {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as Body;

  if (!daily_exercises || !target) {
    return res.status(422).json({ error: "parameters missing" });
  }

  let dailyMalformat: boolean = false;
  const daily: number[] = [];

  // Try to parse array
  try {
    daily_exercises.forEach((d) => {
      const n = Number(d);
      if (isNaN(n)) {
        dailyMalformat = true;
      } else {
        daily.push(Number(n));
      }
    });
  } catch (error: unknown) {
    return res
      .status(422)
      .json({ error: "malformatted parameter (daily_exercises)" });
  }

  if (dailyMalformat || isNaN(target)) {
    return res.status(422).json({ error: "malformatted parameters" });
  }

  const overview = calculateExercises(daily, target);

  return res.status(200).json(overview);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
