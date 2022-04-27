import { newDb } from "https://deno.land/x/pg_mem@1.8.6/mod.ts";

// create new database
const db = newDb();
db.public.none(`create table people(id serial PRIMARY KEY,name varchar(50));
insert into people values (1,'Carlos');
insert into people values (2,'John');`);

// create node-pg client from pg_mem adaptor
const { Client } = db.adapters.createPg();

const client = new Client({
  user: "user",
  database: "test",
  hostname: "localhost",
  port: 5432
});
await client.connect();

{
  console.log(1);
  const result = await client.query("SELECT ID, NAME FROM PEOPLE");
  console.log(result.rows);
  // [
  //   { id: 1, name: "Carlos", [Symbol(_id)]: "people_0", [Symbol()]: Symbol() },
  //   { id: 2, name: "John", [Symbol(_id)]: "people_1", [Symbol()]: Symbol() }
  // ]
}

{
  console.log(2);
  const result = await client.query(
    `SELECT ID, NAME FROM PEOPLE WHERE ID = ${1}`
  );
  console.log(result.rows);
  // [ { id: 1, name: "Carlos", [Symbol(_id)]: "people_0", [Symbol()]: Symbol() } ]
}

{
  console.log(3);
  const result = await client.query({
    text: `SELECT ID, NAME FROM PEOPLE WHERE ID = $1`,
    values: [2]
  });
  console.log(result.rows);
  // [ { id: 2, name: "John", [Symbol(_id)]: "people_1", [Symbol()]: Symbol() } ]
}

await client.end();
