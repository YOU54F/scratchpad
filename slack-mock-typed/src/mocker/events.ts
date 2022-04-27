export const events = module.exports as Events<[]>;

import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import * as nock from "nock";
import { logger } from "../lib/logger";

events.calls = [];

events.send = async opts => {
  await axios
    .post(opts.target, opts.data)
    .then((response: AxiosResponse) => {
      logger.debug(`received response to events request`);
      events.calls.push({
        url: opts.target,
        params: response.data.body,
        body: response.data.body, // remove in next major version
        headers: response.headers,
        statusCode: response.status
      });
      return Promise.resolve();
    })
    .catch((err: AxiosError) => {
      return logger.error(
        `error receiving response to events api ${opts.target}`,
        err
      );
    });
  return Promise.resolve();
};

events.reset = () => {
  logger.debug(`resetting events`);
  events.calls.splice(0, events.calls.length);
};

export type EventsUrl = string;

export interface Events<T> {
  send: (opts: EventsOptions<T>) => Promise<void>;
  reset: () => void;
  start: () => void;
  calls: Array<EventsCall<T>>;
}

export interface EventsOptions<T> {
  target?: string;
  data?: T;
}

export type EventsHttpHeaders = nock.HttpHeaders;

export interface EventsCall<T> {
  url: EventsUrl;
  params: T;
  body?: T;
  headers: EventsHttpHeaders;
  statusCode?: number;
}
