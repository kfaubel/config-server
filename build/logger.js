"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
// Set up winston logging.
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'app.js' }), winston_1.format.colorize(), winston_1.format.simple(), winston_1.format.timestamp(), logFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'config-server.log' })
    ]
});
exports.logger.level = 'silly';
exports.logger.exitOnError = false;
//# sourceMappingURL=logger.js.map