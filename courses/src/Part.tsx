import { CoursePart } from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled union member on the loose: ${JSON.stringify(value)}`
  );
};

const RenderName = ({
  name,
  exerciseCount,
}: {
  name: string;
  exerciseCount: number;
}) => {
  return (
    <h3>
      {name} {exerciseCount}
    </h3>
  );
};

const RenderDescription = ({ description }: { description: string }) => {
  return <i>{description}</i>;
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <RenderName name={part.name} exerciseCount={part.exerciseCount} />
          <RenderDescription description={part.description} />
        </div>
      );
    case "group":
      return (
        <div>
          <RenderName
            name={part.name}
            exerciseCount={part.exerciseCount}
          ></RenderName>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <RenderName name={part.name} exerciseCount={part.exerciseCount} />
          <RenderDescription description={part.description} />
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <RenderName name={part.name} exerciseCount={part.exerciseCount} />
          <RenderDescription description={part.description} />
          <p>
            Requirements:
            <ul>
              {part.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </p>
        </div>
      );
    default:
      assertNever(part);
  }
};

export default Part;
