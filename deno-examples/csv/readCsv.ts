import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./import.csv");

const main = () => {
  for await (const x of readCSVObjects(f)) {
    console.log(x);
  }
};

main();
