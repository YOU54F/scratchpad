import { Context, FirehoseTransformationEvent } from "aws-lambda";
import Logger from "bunyan";
import { getLogger } from "./logger";
import { decode64, encode64 } from "./utils";
import { Client } from "pg";
import Decimal from "decimal.js";
export enum Wal2JsonChangeKind {
  Update = "update",
  Insert = "insert",
  Delete = "delete",
}

const log = getLogger({ name: "MI-Transform" });

export interface Wal2JsonBase {
  kind: Wal2JsonChangeKind;
  table: string;
  schema: string;
}

export interface Wal2JsonColumns {
  columnnames: string[];
  columnvalues: any[];
  columntypes: string[];
}

interface Wal2JsonOldKeys {
  oldkeys: {
    keytypes: string[];
    keyvalues: any[];
    keynames: string[];
  };
}

export interface Wal2JsonInsert extends Wal2JsonBase, Wal2JsonColumns {}

export interface Wal2JsonUpdate extends Wal2JsonBase, Wal2JsonColumns {}

export interface Wal2JsonDelete extends Wal2JsonBase, Wal2JsonOldKeys {}

export type Wal2JsonChange = Wal2JsonUpdate | Wal2JsonInsert | Wal2JsonDelete;

export const reduceNamesValues = ({
  columnnames,
  columnvalues,
  columntypes,
}: Wal2JsonColumns) =>
  columnnames.reduce((prev: any, current, idx) => {
    prev[current] = columnvalues[idx];
    if (columntypes[idx] === "jsonb") {
      prev[current] = JSON.parse(prev[current]);
    }
    return prev;
  }, {});

export interface Wal2JsonEvent {
  xid: number;
  change: Wal2JsonChange[];
}

interface Product {
  _id: string;
  id: string;
  name: string | null;
  version: string | null;
  type: string | null;
  price: Decimal | null;
}

export const transformRecords = (c: Wal2JsonColumns, sequenceId: number) => {
  const record = reduceNamesValues(c) as Product;
  return {
    record,
    sequenceId,
  };
};

export type TransformedRecord = ReturnType<typeof transformRecords>;

interface DuplicateMetadata {
  eventTimestamps: Date[];
  rawEvents: TransformedRecord[];
}

export interface DuplicateRecordReport {
  [applicationId: string]: DuplicateMetadata;
}

export const shouldProcessChangeEvent = ({
  kind,
  table,
}: Wal2JsonChange): boolean =>
  table === "product" &&
  (kind === Wal2JsonChangeKind.Update || kind === Wal2JsonChangeKind.Insert);

const transformRecordData = (data: string, log: Logger) => {
  const decoded = decode64(data);

  const parsed: Wal2JsonEvent = JSON.parse(decoded);

  const updatesOrInserts = parsed.change.filter(shouldProcessChangeEvent);

  log.info({ updatesOrInserts }, "Update or insert wal2json events");

  // Changes need to be strictly sequential so that the order in which
  // they occurred can be readily determined
  return transformAndSequenceChanges(updatesOrInserts);
};

const transformAndSequenceChanges = (changes: Wal2JsonChange[]) =>
  changes.map((change, sequenceId) =>
    transformRecords(change as Wal2JsonUpdate | Wal2JsonInsert, sequenceId)
  );

export const handler = async (
  event: FirehoseTransformationEvent,
  _context: Context
) => {
  // log.info(
  //   { recordsToProcess: event.records.length },
  //   "Starting transformation of records"
  // );
  log.info({ event, _context }, "Starting transformation of records");

  const aggregated: TransformedRecord[] = [];
  // const client = new Client();

  try {
    // await client.connect();

    const output = await Promise.all(
      event.records.map(async ({ data, recordId }) => {
        const transformed = transformRecordData(data, log);
        aggregated.push(...transformed);

        const asJson = transformed.map((event) => JSON.stringify(event));
        console.log(asJson);
        const base64encoded = encode64(
          asJson.length ? asJson.join("\n") + "\n" : ""
        );

        return {
          recordId,
          result: TransformResultType.Ok,
          data: base64encoded,
        };
      })
    );

    log.info({ recordsProcessed: output.length }, "Processing completed");

    return { records: output };
  } catch (err) {
    log.error({ err }, "Failed to process record");
    throw new Error("Processing of wal2json record failed");
  } finally {
    // if (client) {
    //   client.end();
    // }
  }
};

export enum TransformResultType {
  Ok = "Ok",
  Dropped = "Dropped",
  ProcessingFailed = "ProcessingFailed",
}
