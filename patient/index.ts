import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged");
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
