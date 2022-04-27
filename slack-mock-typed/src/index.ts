"use strict";
import { logger } from "./lib/logger";
import { events, Events } from "./mocker/events";
import { incomingWebhooks, IncomingWebhooks } from "./mocker/incoming-webhooks";
import { web, Web } from "./mocker/web";

export function SlackMocker(config?: ConfigOptions): Instance {
  config = config || {};

  if (config.logLevel) {
    logger.level = config.logLevel;
  }
  logger.info("slack-mock running");

  module.exports.instance = {
    events: {
      send: events.send,
      reset: events.reset,
      calls: events.calls
    },
    incomingWebhooks: {
      addResponse: incomingWebhooks.addResponse,
      reset: incomingWebhooks.reset,
      calls: incomingWebhooks.calls,
      start: incomingWebhooks.start
    },
    web: {
      addResponse: web.addResponse,
      reset: web.reset,
      calls: web.calls,
      start: web.start
    },
    reset() {
      events.reset();
      incomingWebhooks.reset();
      web.reset();
    }
  };

  return module.exports.instance;
}

export interface Instance {
  incomingWebhooks: IncomingWebhooks<any>;
  events: Events<any>;
  web: Web<any>;
  reset: () => void;
}

export interface ConfigOptions {
  logLevel?: string;
}
