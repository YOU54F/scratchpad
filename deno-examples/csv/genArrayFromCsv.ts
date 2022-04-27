import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./500000-Records.csv");

async function iterable2array<T>(gen: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of gen) {
    out.push(x);
  }
  return out;
}

const main = async () => {
  const array = await iterable2array(readCSVObjects(f));
  console.log(array.length);
};

main();
