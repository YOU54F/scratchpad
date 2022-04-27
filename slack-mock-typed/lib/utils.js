"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("qs");
const logger_1 = require("./logger");
function parseParams(path, requestBody) {
    let body = requestBody;
    let queryString = {};
    const pathParts = path.split("?");
    logger_1.logger.debug(requestBody);
    if (pathParts[1]) {
        if (typeof requestBody === "string") {
            // parses content-type application/x-www-form-urlencoded
            logger_1.logger.debug(`parsing application/x-www-form-urlencoded body: ${requestBody}`);
            body = qs.parse(requestBody);
        }
        // query params from a GET request
        logger_1.logger.debug(`parsing query parameters: ${pathParts[1]}`);
        queryString = qs.parse(`${pathParts[1]}`);
        typedKeys(queryString).forEach(key => {
            body[key] = queryString[key];
        });
    }
    else if (typeof requestBody === "string") {
        // parses content-type application/x-www-form-urlencoded
        logger_1.logger.debug(`rendering recieved body: ${requestBody}`);
        body = requestBody;
        const mbTestUrlBase = "https://api.slack.com/docs/messages/builder?msg=";
        const encodedBody = encodeURIComponent(requestBody);
        logger_1.logger.debug(`Slack URL: ${mbTestUrlBase}${encodedBody}`);
    }
    function typedKeys(o) {
        return Object.keys(o);
    }
    return body;
}
exports.parseParams = parseParams;
