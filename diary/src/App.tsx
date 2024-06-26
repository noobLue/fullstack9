import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";

const ErrorPlayer = ({ error }: { error: string | null }) => {
  if (!error) return <div></div>;

  return (
    <div
      style={{
        backgroundColor: "pink",
        color: "red",
        borderStyle: "solid",
        padding: "3px",
      }}
    >
      {error}
    </div>
  );
};

const DiaryForm = ({
  setError,
  addDiary,
}: {
  setError: (error: string | null) => void;
  addDiary: (diary: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const clickHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", {
        date,
        visibility,
        weather,
        comment,
      });

      addDiary(res.data);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e.status);
        console.log(e.response);

        if (e.response) setError(e.response.data);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
      }}
      onSubmit={clickHandler}
    >
      Date <input value={date} onChange={(e) => setDate(e.target.value)}></input>
      Visibility <input value={visibility} onChange={(e) => setVisibility(e.target.value)}></input>
      Weather <input value={weather} onChange={(e) => setWeather(e.target.value)}></input>
      Comment <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
      <button type="submit">Submit Diary!</button>
    </form>
  );
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries").then((res) => setDiaries(res.data as DiaryEntry[]));
  }, []);

  const errorHandler = (error: string | null) => {
    if (timeoutId) clearTimeout(timeoutId);

    const t = setTimeout(() => {
      setError(null);
      setTimeoutId(null);
    }, 5000);

    setError(error);
    setTimeoutId(t);
  };

  const AddDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <div>
      <h3>Add new diary</h3>
      <ErrorPlayer error={error}></ErrorPlayer>
      <DiaryForm addDiary={AddDiary} setError={errorHandler}></DiaryForm>

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
