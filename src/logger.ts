import winston, { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

// Set up winston logging.
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger: winston.Logger = createLogger({
    format: combine(
        label({ label: 'app.js' }),
        format.colorize(),
        format.simple(),
        format.timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'config-server.log'})
    ]
});

logger.level = 'silly';
logger.exitOnError = false;
