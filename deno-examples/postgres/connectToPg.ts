// deno run --allow-net --allow-read --unstable mod.ts
import { Client } from "https://deno.land/x/postgres/mod.ts";

//

const client = new Client({
  user: "user",
  database: "test",
  hostname: "localhost",
  port: 5432
});
await client.connect();

{
  const result = await client.queryArray("SELECT ID, NAME FROM PEOPLE");
  console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
}

{
  const result = await client.queryArray`SELECT ID, NAME FROM PEOPLE WHERE ID = ${1}`;
  console.log(result.rows); // [[1, 'Carlos']]
}

{
  const result = await client.queryObject("SELECT ID, NAME FROM PEOPLE");
  console.log(result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'Johnru'}, ...]
}

{
  const result = await client.queryObject`SELECT ID, NAME FROM PEOPLE WHERE ID = ${1}`;
  console.log(result.rows); // [{id: 1, name: 'Carlos'}]
}

await client.end();
