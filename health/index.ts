import express from "express";
import calculateBmi from "./helper";

const app = express();

app.get("/hello", (_req, res) => {
  return res.status(200).send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query.weight || !req.query.height) {
    return res.status(422).json({ error: "weight or height missing" });
  }

  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(422).json({ error: "malformatted parameters" });
  }

  const bmi: string = calculateBmi(height, weight);

  return res.status(200).json({ weight, height, bmi });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
