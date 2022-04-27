import { html } from "https://cdn.skypack.dev/htm/preact";
// import { useLocalState } from "../hooks/localstate.js";
// import { useState } from "https://cdn.skypack.dev/preact/hooks";
// import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import List from "./List.js";

const App = () => {
  //   const [dataArray, setDataArray] = useLocalState("dataArray", [
  //     "Item 0",
  //     "Item 1",
  //     "Item 2"
  //   ]);

  //   const [dataArray, setDataArray] = useState(0);
  const dataArray = ["Item 0", "Item 1", "Item 2"];
  return html`
    <div style="margin: 2rem 0;">
      <p>This website is appified with the Preact JavaScript library!</p>
      <${List} data=${dataArray} />
      <button class="btn-lg-primary">add item</button>
      <button class="btn-lg-secondary">remove item</button>
    </div>
  `;
};

export default App;
