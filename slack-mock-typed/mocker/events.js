"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = module.exports;
const axios_1 = require("axios");
const logger_1 = require("../lib/logger");
exports.events.calls = [];
exports.events.send = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default
        .post(opts.target, opts.data)
        .then((response) => {
        logger_1.logger.debug(`received response to events request`);
        exports.events.calls.push({
            url: opts.target,
            params: response.data.body,
            body: response.data.body,
            headers: response.headers,
            statusCode: response.status
        });
        return Promise.resolve();
    })
        .catch((err) => {
        return logger_1.logger.error(`error receiving response to events api ${opts.target}`, err);
    });
    return Promise.resolve();
});
exports.events.reset = () => {
    logger_1.logger.debug(`resetting events`);
    exports.events.calls.splice(0, exports.events.calls.length);
};
