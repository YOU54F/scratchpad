import { html } from "https://cdn.skypack.dev/htm/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";

const List = ({ data }) => {
  // takes a data prop
  // how many clicks have we counted? Default to 0
  const [counter, setCounter] = useState(0);
  let count = 0;
  const setCount = count + 1;
  // shared event handler
  const handleClick = () => {
    count = count + 1;
    console.log(count);
    // setCount(count + 1);
  };

  return html`
    <div>
      <ul>
        ${data &&
        data.map(
          (i) => html`
            <li>${i}: <button onClick=${handleClick}>Click me</button></li>
          `
        )}
      </ul>
      <h3>${count} ${count === 1 ? "click" : "clicks"} counted</h3>
    </div>
  `;
};

export default List;
