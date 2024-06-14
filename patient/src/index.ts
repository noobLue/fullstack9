import express from "express";
import cors from "cors";
import diagnoses from "./routes/diagnoses";
import ping from "./routes/ping";
import patients from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
app.use("/api/ping", ping);
app.use("/api/diagnoses", diagnoses);
app.use("/api/patients", patients);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
