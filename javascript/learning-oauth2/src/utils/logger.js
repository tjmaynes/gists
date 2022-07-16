import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

export const loggerBuilder = (vlabel) => {
    const formatter = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
    });

    const getFormat = () => combine(
        label({ label: vlabel }),
        timestamp(),
        formatter
    );

    return createLogger({
        colorize: true,
        exitOnError: false,
        transports: [
            new transports.Console({ format: getFormat() })
        ]
    });
};
