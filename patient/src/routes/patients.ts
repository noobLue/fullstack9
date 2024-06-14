import express from "express";
import patients from "../data/patients";
import { PatientFront } from "../types";

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

export default router;
