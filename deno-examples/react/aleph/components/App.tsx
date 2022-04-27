import React from "react";
import { useLocalState } from "~/hooks/localstate.ts";

import List from "./List.tsx";

const App = () => {
  const [dataArray, setDataArray] = useLocalState("dataArray", [
    "Item 0",
    "Item 1",
    "Item 2"
  ]);

  return (
    <div style={{ margin: "2rem 0" }}>
      <p>Add or Remove items from state and count button clicks</p>
      <List data={dataArray} />
      <button
        className='btn-lg-primary'
        onClick={() =>
          setDataArray((dataArray: string[]) => [
            ...dataArray,
            `Item ${dataArray.length}`
          ])
        }>
        add item
      </button>
      <button
        className='btn-lg-secondary'
        onClick={() =>
          setDataArray((dataArray: string[]) =>
            dataArray.slice(0, dataArray.length - 1)
          )
        }>
        remove item
      </button>
    </div>
  );
};

export default App;
