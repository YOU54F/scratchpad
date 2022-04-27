import { IMemoryDb, newDb } from "https://deno.land/x/pg_mem@1.8.6/mod.ts";

// create new database
const db = newDb();

// seed
db.public.none(`create table test(id text);
insert into test values ('value');`);

const getAll = (db: IMemoryDb) => db.public.many(`select * from test`);
console.log(getAll(db)[0].id); // value

// create a restore point
const backup = db.backup();

// update database (in a test for example)
db.public.none(`update test set id='new value';`);
console.log(getAll(db)[0].id); // new value

// restore database
backup.restore();
console.log(getAll(db)[0].id); // value
