import express from "express";
import patients, { AddPatient } from "../data/patients";
import { PatientFront } from "../types";
import { ToNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const pf: PatientFront[] = patients.map((p) => {
    return {
      id: p.id,
      name: p.name,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      occupation: p.occupation,
    };
  });

  res.status(200).json(pf);
});

router.post("/", (req, res) => {
  try {
    const patient = AddPatient(ToNewPatient(req.body));

    res.json(patient);
  } catch (exception: unknown) {
    let message: string = "Failed to add person: ";

    if (exception instanceof Error) {
      message += exception.message;
    }

    res.status(400).send(message);
  }
});

export default router;
