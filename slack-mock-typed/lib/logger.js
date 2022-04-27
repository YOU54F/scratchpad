"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const defaultLevel = process.env.LOG_LEVEL;
const options = {
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: defaultLevel,
    transports: [
        new winston_1.transports.Console({
            colorize: true,
            showLevel: true,
            timestamp: true
        })
    ]
};
const logger = new winston_1.Logger(options);
exports.logger = logger;
