import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "https://deno.land/x/lambda@1.7.2/mod.ts";
import { connectPg, PgConn } from "https://deno.land/x/pgc4d/src/mod.ts";
let client: PgConn;

const clientOpts = {
  user: Deno.env.get("PG_USER"),
  database: Deno.env.get("PG_DB"),
  password: Deno.env.get("PG_PASS"),
  hostname: Deno.env.get("PG_HOST"),
  port: Deno.env.get("PG_PORT"),
  tls: { enforce: true }
};
export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log("getting client");
  const { user, password, hostname, database } = clientOpts;
  client = await connectPg(
    `postgres://${user}:${password}@${hostname}/${database}`
  );
  try {
    console.log("connectedto client");

    const result = await client.query("SELECT now()");
    console.log(result.rows);
    return {
      body: `Welcome to deno ${Deno.version.deno} 🦕 ${result.rows}`,
      headers: { "content-type": "text/html;charset=utf8" },
      statusCode: 200
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    client.close();
  }
}
