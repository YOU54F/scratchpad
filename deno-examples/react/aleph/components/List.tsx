import React from "react";
import { useLocalState } from "~/hooks/localstate.ts";

const List = ({ data }: { data: string[] }) => {
  const [count, setCount] = useLocalState("count", 0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <ul>
        {data &&
          data.map((i) => (
            <li key={i}>
              {i}: <button onClick={handleClick}>Click me</button>
            </li>
          ))}
      </ul>
      <h3>
        {count} {count === 1 ? "click" : "clicks"} counted
      </h3>
    </div>
  );
};

export default List;
