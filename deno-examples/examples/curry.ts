import {
  lens,
  view,
  over,
  inc,
  set
} from "https://deno.land/x/fae@v1.0.0/mod.ts";

const array = [1, 2, 3, 4, 5, 6, 7, 8];

// gets element at index `0`
function getter(a: number[]) {
  return a[0];
}

// returns a new array by setting passed value `val` at index `0`
function setter(val: number, a: number[]) {
  const x = [...a];
  x[0] = val;
  return x;
}

const l = lens(getter, setter);

const viewResult = view(l, array);
const overResult = over(l, inc, array);
const setResult = set(l, 12, array);

console.log(viewResult); // 1
console.log(overResult); // [2, 2, 3, 4, 5, 6, 7, 8]
console.log(setResult); // [12, 2, 3, 4, 5, 6, 7, 8]
