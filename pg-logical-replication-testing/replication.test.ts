import { Client } from "pg";

const createTableWithPk =
  "CREATE TABLE table2_with_pk (a SERIAL, b VARCHAR(30), c TIMESTAMP NOT NULL, PRIMARY KEY(a, c));";
const createTableWithoutPk =
  "CREATE TABLE table2_without_pk (a SERIAL, b NUMERIC(5,2), c TEXT);";
const createReplicationSlotWal2Json =
  "SELECT 'init' FROM pg_create_logical_replication_slot('test_slot', 'wal2json');";
const transaction = `BEGIN;
INSERT INTO table2_with_pk (b, c) VALUES('Backup and Restore', now());
INSERT INTO table2_with_pk (b, c) VALUES('Tuning', now());
INSERT INTO table2_with_pk (b, c) VALUES('Replication', now());
DELETE FROM table2_with_pk WHERE a < 3;
INSERT INTO table2_without_pk (b, c) VALUES(2.34, 'Tapir');
UPDATE table2_without_pk SET c = 'Anta' WHERE c = 'Tapir';
COMMIT;`;
const getSlotChanges =
  "SELECT data FROM pg_logical_slot_get_changes('test_slot', NULL, NULL, 'pretty-print', '1');";
const stopReplicationSlotWal2Json =
  "SELECT 'stop' FROM pg_drop_replication_slot('test_slot');";
const dropTableWithPk = "DROP TABLE table2_with_pk CASCADE;";
const dropTableWithoutPk = "DROP TABLE table2_without_pk CASCADE;";

describe("handler", () => {
  let client = new Client();
  beforeAll(async () => {
    await client.connect().catch((err) => {
      throw new Error(err);
    });

    await client.query(createTableWithPk).catch((err) => console.log(err));
    await client.query(createTableWithoutPk).catch((err) => console.log(err));
    await client
      .query(createReplicationSlotWal2Json)
      .catch((err) => console.log(err));
  });

  afterAll(async () => {
    await client
      .query(stopReplicationSlotWal2Json)
      .catch((err) => console.log(err));
    await client
      .query(dropTableWithPk)
      .catch((err) => console.log(err))
      .then(
        async () =>
          await client
            .query(dropTableWithoutPk)
            .catch((err) => console.log(err))
      );
    client.end();
  });
  it("should read a wal2json replicated change", async () => {
    await client.query(transaction);
    const result = await client.query(getSlotChanges);

    expect(JSON.parse(result.rows[0].data)).toEqual(
      expect.objectContaining({
        change: [
          {
            kind: "insert",
            schema: "public",
            table: "table2_with_pk",
            columnnames: ["a", "b", "c"],
            columntypes: [
              "integer",
              "character varying(30)",
              "timestamp without time zone",
            ],
            columnvalues: [1, "Backup and Restore", expect.any(String)],
          },
          {
            kind: "insert",
            schema: "public",
            table: "table2_with_pk",
            columnnames: ["a", "b", "c"],
            columntypes: [
              "integer",
              "character varying(30)",
              "timestamp without time zone",
            ],
            columnvalues: [2, "Tuning", expect.any(String)],
          },
          {
            kind: "insert",
            schema: "public",
            table: "table2_with_pk",
            columnnames: ["a", "b", "c"],
            columntypes: [
              "integer",
              "character varying(30)",
              "timestamp without time zone",
            ],
            columnvalues: [3, "Replication", expect.any(String)],
          },
          {
            kind: "delete",
            schema: "public",
            table: "table2_with_pk",
            oldkeys: {
              keynames: ["a", "c"],
              keytypes: ["integer", "timestamp without time zone"],
              keyvalues: [1, expect.any(String)],
            },
          },
          {
            kind: "delete",
            schema: "public",
            table: "table2_with_pk",
            oldkeys: {
              keynames: ["a", "c"],
              keytypes: ["integer", "timestamp without time zone"],
              keyvalues: [2, expect.any(String)],
            },
          },
          {
            kind: "insert",
            schema: "public",
            table: "table2_without_pk",
            columnnames: ["a", "b", "c"],
            columntypes: ["integer", "numeric(5,2)", "text"],
            columnvalues: [1, 2.34, "Tapir"],
          },
        ],
      })
    );
  }, 30000);
});
