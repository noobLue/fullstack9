import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((res) => setDiaries(res.data as DiaryEntry[]));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
