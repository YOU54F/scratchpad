"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const allResponses = new Map();
allResponses.set("incoming-webhooks", new Map());
allResponses.set("web", new Map());
function set(type, opts) {
    const typeResponses = allResponses.get(type);
    if (!opts.url) {
        opts.url = "any";
    }
    let urlResponses = typeResponses.get(opts.url);
    if (!urlResponses) {
        urlResponses = [];
        typeResponses.set(opts.url, urlResponses);
    }
    logger_1.logger.debug(`added response for ${type}`, opts);
    urlResponses.push({
        statusCode: opts.statusCode || 200,
        body: opts.body || (type === "web" ? { ok: true } : "OK"),
        headers: opts.headers || {}
    });
}
exports.set = set;
function get(type, url) {
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
        logger_1.logger.debug(`responding to ${type} with override`, response);
    }
    return [response.statusCode, response.body, response.headers];
}
exports.get = get;
function reset(type) {
    logger_1.logger.debug(`clearing responses for ${type}`);
    allResponses.get(type).clear();
}
exports.reset = reset;
function resetAll() {
    for (const key of allResponses.keys()) {
        logger_1.logger.debug(`clearing responses for ${key}`);
        allResponses.get(key).clear();
    }
}
exports.resetAll = resetAll;
