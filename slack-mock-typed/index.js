"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./lib/logger");
const events_1 = require("./mocker/events");
const incoming_webhooks_1 = require("./mocker/incoming-webhooks");
const web_1 = require("./mocker/web");
function SlackMocker(config) {
    config = config || {};
    if (config.logLevel) {
        logger_1.logger.level = config.logLevel;
    }
    logger_1.logger.info("slack-mock running");
    module.exports.instance = {
        events: {
            send: events_1.events.send,
            reset: events_1.events.reset,
            calls: events_1.events.calls
        },
        incomingWebhooks: {
            addResponse: incoming_webhooks_1.incomingWebhooks.addResponse,
            reset: incoming_webhooks_1.incomingWebhooks.reset,
            calls: incoming_webhooks_1.incomingWebhooks.calls,
            start: incoming_webhooks_1.incomingWebhooks.start
        },
        web: {
            addResponse: web_1.web.addResponse,
            reset: web_1.web.reset,
            calls: web_1.web.calls,
            start: web_1.web.start
        },
        reset() {
            events_1.events.reset();
            incoming_webhooks_1.incomingWebhooks.reset();
            web_1.web.reset();
        }
    };
    return module.exports.instance;
}
exports.SlackMocker = SlackMocker;
