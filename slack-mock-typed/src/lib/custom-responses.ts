import nock = require("nock");
import { logger } from "./logger";

const allResponses = new Map();

allResponses.set("incoming-webhooks", new Map());
allResponses.set("web", new Map());

export function set(type: string, opts: WebOptions<{}>) {
  const typeResponses = allResponses.get(type);
  if (!opts.url) {
    opts.url = "any";
  }

  let urlResponses = typeResponses.get(opts.url);

  if (!urlResponses) {
    urlResponses = [];
    typeResponses.set(opts.url, urlResponses);
  }

  logger.debug(`added response for ${type}`, opts);

  urlResponses.push({
    statusCode: opts.statusCode || 200,
    body: opts.body || (type === "web" ? { ok: true } : "OK"),
    headers: opts.headers || {}
  });
}

export function get(type: string, url: string) {
  const defaultResponse = { statusCode: 200, body: "OK", headers: {} };
  let response = defaultResponse;

  if (type === "web") {
    defaultResponse.body = JSON.stringify({ ok: true });
  }

  let urlResponses = allResponses.get(type).get(url);
  if (!urlResponses) {
    urlResponses = allResponses.get(type).get("any");
  }

  if (urlResponses && urlResponses.length) {
    response = urlResponses.shift();
    logger.debug(`responding to ${type} with override`, response);
  }

  return [response.statusCode, response.body, response.headers];
}

export function reset(type: string) {
  logger.debug(`clearing responses for ${type}`);
  allResponses.get(type).clear();
}

export function resetAll() {
  for (const key of allResponses.keys()) {
    logger.debug(`clearing responses for ${key}`);
    allResponses.get(key).clear();
  }
}

type WebUrl = string;
type WebHttpHeaders = nock.HttpHeaders;

export interface Web<T> {
  addResponse: (opts: WebOptions<T>) => void;
  reset: () => void;
  calls: Array<WebCall<T>>;
}

export interface WebOptions<T> {
  url?: WebUrl;
  statusCode?: number;
  body?: T;
  headers?: WebHttpHeaders;
}

export interface WebCall<T> {
  url: WebUrl;
  params: T;
  headers: WebHttpHeaders;
}
