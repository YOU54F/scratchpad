// import { useState, useEffect } from "https://cdn.skypack.dev/preact/hooks";
import * as _Preact from "https://cdn.skypack.dev/preact@10.4.7";
import * as _Hooks from "https://cdn.skypack.dev/preact@10.4.7/hooks";
export const Hooks = _Hooks;
import htm from "https://cdn.skypack.dev/htm@3.0.4";
export const html = htm.bind(_Preact.h);
export default _Preact;

// This hook will create a state variable and record it's value
// to localStorage anytime it is set.
//
// The provided value is used for initialization if there is no
// existing value for matching key in localStorage.
//
// The provided value will also be used in the server-side render
// therefore making it the initial state on load.

const useLocalState = (name, value) => {
  // return regular state if no localStorage (server-side renders)
  //   console.log(value);
  if (typeof localStorage === "undefined") return Hooks.useState(value);

  let localState = localStorage.getItem(name);

  const [state, setState] = Hooks.useState(
    localState ? JSON.parse(localState) : value
  );

  Hooks.useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export { useLocalState };
