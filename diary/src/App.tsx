import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";

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

function RadioSelect<Type>({ options, name, selected, onSelect}: { options: [string, Type][]; name: string, selected: Type, onSelect: React.Dispatch<React.SetStateAction<Type>> }) {

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {options.map((o) => (
        <div key={o[0]} style={{margin: "5px"}}>
          <input type="radio" name={name} value={o[0]} checked={selected === o[1]} onChange={() => onSelect(o[1])}></input>
          <label>{o[0]}</label>
        </div>
      ))}
    </div>
  )
}



const DiaryForm = ({
  setError,
  addDiary,
}: {
  setError: (error: string | null) => void;
  addDiary: (diary: DiaryEntry) => void;
}) => {
  const DEFAULT_VISIBILITY = Visibility.Great;
  const DEFAULT_WEATHER = Weather.Sunny;
  const DEFAULT_DATE: string = new Date().toISOString().substring(0, 10);

  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [visibility, setVisibility] = useState<Visibility>(DEFAULT_VISIBILITY);
  const [weather, setWeather] = useState<Weather>(DEFAULT_WEATHER);
  const [comment, setComment] = useState<string>("");

  const clickHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const entry: NewDiaryEntry = {
        date,
        visibility,
        weather,
        comment,
      };
      const res = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", entry);

      addDiary(res.data);

      setDate(DEFAULT_DATE);
      setVisibility(DEFAULT_VISIBILITY);
      setWeather(DEFAULT_WEATHER);
      setComment("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
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
      <b>Date</b> <input value={date} type="date" onChange={(e) => setDate(e.target.value)}></input>
      <b>Visibility</b> <RadioSelect name="visibility" options={Object.entries(Visibility)} onSelect={setVisibility} selected={visibility}></RadioSelect>
      <b>Weather</b> <RadioSelect name="weather" options={Object.entries(Weather)} onSelect={setWeather} selected={weather}></RadioSelect>
      <b>Comment</b> <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
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
