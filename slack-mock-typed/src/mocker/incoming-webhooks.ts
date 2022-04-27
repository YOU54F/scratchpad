"use strict";

export const incomingWebhooks = module.exports as IncomingWebhooks<[]>;
import * as nock from "nock";
import * as customResponses from "../lib/custom-responses";
import { logger } from "../lib/logger";
import * as utils from "../lib/utils";
const baseUrl = "https://hooks.slack.com";

// Slack accepts both GET and POST requests, will intercept API and OAuth calls

logger.debug(`starting incoming-webhooks`);

incomingWebhooks.start = () => {
  return nock(baseUrl)
    .persist()
    .post(/.*/, () => true)
    .reply(reply);
};

incomingWebhooks.calls = [];

incomingWebhooks.reset = () => {
  logger.debug(`resetting incoming-webhooks`);

  customResponses.reset("incoming-webhooks");
  incomingWebhooks.calls.splice(0, incomingWebhooks.calls.length);
};

incomingWebhooks.addResponse = opts => {
  logger.debug(`adding incoming-webhook response` + opts);
  customResponses.set("incoming-webhooks", opts);
};

function reply(path: string, requestBody: string) {
  const url = `${baseUrl}${path}`;

  logger.debug(`intercepted incoming-webhooks request`);

  incomingWebhooks.calls.push({
    url,
    params: utils.parseParams(path, requestBody) as [],
    headers: {}
  });

  return customResponses.get("incoming-webhooks", url) as Array<{}>;
}

export type IncomingWebhookUrl = string;
export type IncomingWebhookHttpHeaders = nock.HttpHeaders;

export interface IncomingWebhooks<T> {
  addResponse: (opts: IncomingWebhookOptions<T>) => void;
  reset: () => void;
  start: () => void;
  calls: Array<IncomingWebhookCall<T>>;
}

export interface IncomingWebhookOptions<T> {
  url?: IncomingWebhookUrl;
  statusCode?: number;
  body?: T;
  headers?: IncomingWebhookHttpHeaders;
}

export interface IncomingWebhookCall<T> {
  url: IncomingWebhookUrl;
  params: T;
  headers: IncomingWebhookHttpHeaders;
}
