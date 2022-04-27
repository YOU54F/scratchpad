export const web = module.exports as Web<[]>;
import * as nock from "nock";
import * as customResponses from "../lib/custom-responses";
import { logger } from "../lib/logger";
import * as utils from "../lib/utils";
// import rtm = require('./rtm')
const baseUrl = "https://slack.com";

web.calls = [];

// Slack accepts both GET and POST requests, will intercept API and OAuth calls

web.start = () => {
  return nock(baseUrl)
    .persist()
    .get(/.*/)
    .query(true)
    .reply(reply)

    .post(/.*/, () => true)
    .reply(reply);
};

web.reset = () => {
  logger.debug(`resetting web`);
  web.calls.splice(0, web.calls.length);
  customResponses.reset("web");
};

web.addResponse = opts => {
  customResponses.set("web", opts);
};

function reply(path: string, requestBody: string) {
  const url = `https://slack.com${path.split("?")[0]}`;
  const params = utils.parseParams(path, requestBody) as [];

  logger.debug(`intercepted web request: ${url}`);

  web.calls.push({
    url,
    params,
    headers: this.req.headers
  });

  const response = customResponses.get("web", url);
  // const responseBody = response[1]

  // if (/rtm\.[start|connect]/.test(url) && responseBody.ok) {
  //   logger.debug('overriding specified url for rtm')

  //   const rtmUrl = rtm._.addToken(params.token)
  //   responseBody.purl = rtmUrl
  // }

  return response;
}

export type WebUrl = string;
export type WebHttpHeaders = nock.HttpHeaders;

export interface Web<T> {
  addResponse: (opts: WebOptions<T>) => void;
  reset: () => void;
  start: () => void;
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
