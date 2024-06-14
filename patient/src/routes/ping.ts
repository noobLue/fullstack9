import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Someone pinged");
  res.status(200).send("pong");
});

export default router;
