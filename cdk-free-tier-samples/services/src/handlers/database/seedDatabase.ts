import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import { Pool, QueryResult, QueryResultRow } from "pg";
import logger from "../../utilities/logger";

// connection details inherited from environment
const pool = new Pool({
  max: 1,
  min: 0,
  idleTimeoutMillis: 120000,
  connectionTimeoutMillis: 10000
});

interface EventSetupBody<T> {
  [key: string]: T;
}

const getEventValue = (
  event: APIGatewayProxyEvent,
  key: string,
  defaultValue: string
) => {
  if (event.body && event.body !== null) {
    const body = JSON.parse(event.body) as EventSetupBody<databaseOperations>;
    if (key in body) {
      return body[key];
    }
  }
  return defaultValue;
};

enum databaseOperations {
  SEED = "seed",
  NOW = "now",
  INSERT = "insert",
  TRUNCATE = "truncate",
  DELETE = "delete",
  COUNT = "count",
  SLOTS = "slots"
}

const textCity =
  "INSERT INTO city(name, countrycode, district, population) VALUES($1, $2, $3, $4) RETURNING *";
const valuesCity = [
  ["Kabul", "AFG", "Kabol", 1780000],
  ["Amsterdam", "NLD", "Noord-Holland", 731200]
];
export const getSeedDatabaseHandler = (): APIGatewayProxyHandler => async (
  event,
  context
) => {
  // https://github.com/brianc/node-postgres/issues/930#issuecomment-230362178
  context.callbackWaitsForEmptyEventLoop = false; // !important to reuse pool
  logger.info({ event }, "connecting to the database");
  const client = await pool.connect();
  let result: QueryResult<QueryResultRow>;
  try {
    const requestedDbOperation = getEventValue(
      event,
      "operation",
      databaseOperations.NOW
    );
    switch (requestedDbOperation) {
      case databaseOperations.SEED: {
        const sqlFile = await require("./world.sql");
        const sqlText = readFileSync(sqlFile, "utf-8");
        result = await client.query(sqlText);
        break;
      }
      case databaseOperations.INSERT: {
        const results = await Promise.all(
          valuesCity.map(async (values) => {
            return await client.query(textCity, values);
          })
        );
        result = results[0];
        break;
      }
      case databaseOperations.TRUNCATE: {
        result = await client.query("TRUNCATE city CASCADE");
        break;
      }
      case databaseOperations.SLOTS: {
        result = await client.query("select * from pg_replication_slots;");
        break;
      }
      case databaseOperations.COUNT: {
        result = await client.query("SELECT COUNT(*) FROM city");
        break;
      }
      case databaseOperations.DELETE: {
        result = await client.query("DROP TABLE countrylanguage CASCADE");
        result = await client.query("DROP TABLE country CASCADE");
        result = await client.query("DROP TABLE city CASCADE");
        break;
      }
      default: {
        result = await client.query("SELECT NOW()");
        break;
      }
    }

    logger.info(
      {
        result: {
          command: result.command,
          rows: result.rows,
          rowCount: result.rowCount
        },
        requestedDbOperation
      },
      "successfully performed operation"
    );
  } catch (err) {
    logger.error({ err }, "An error occurred connecting to the database");
    return {
      statusCode: 503,
      body: err.message ?? err
    };
  } finally {
    // https://github.com/brianc/node-postgres/issues/1180#issuecomment-270589769
    client.release(true);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.rows)
  };
};
