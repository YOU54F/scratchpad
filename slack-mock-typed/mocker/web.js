"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = module.exports;
const nock = require("nock");
const customResponses = require("../lib/custom-responses");
const logger_1 = require("../lib/logger");
const utils = require("../lib/utils");
// import rtm = require('./rtm')
const baseUrl = "https://slack.com";
exports.web.calls = [];
// Slack accepts both GET and POST requests, will intercept API and OAuth calls
exports.web.start = () => {
    return nock(baseUrl)
        .persist()
        .get(/.*/)
        .query(true)
        .reply(reply)
        .post(/.*/, () => true)
        .reply(reply);
};
exports.web.reset = () => {
    logger_1.logger.debug(`resetting web`);
    exports.web.calls.splice(0, exports.web.calls.length);
    customResponses.reset("web");
};
exports.web.addResponse = opts => {
    customResponses.set("web", opts);
};
function reply(path, requestBody) {
    const url = `https://slack.com${path.split("?")[0]}`;
    const params = utils.parseParams(path, requestBody);
    logger_1.logger.debug(`intercepted web request: ${url}`);
    exports.web.calls.push({
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
