import { createLogger, transports, format } from 'winston';

const levelFilter = (level: any) =>
  format((info) => {
    if (info.level !== level) {
      return false;
    }
    return info;
  })();

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/error-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('error'),
      level: 'error',
    }),
    new transports.File({
      filename: './logs/warn-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('warn'),
      level: 'warn',
    }),
    new transports.File({
      filename: './logs/info-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('info'),
      level: 'info',
    }),
    new transports.File({
      filename: './logs/http-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('http'),
      level: 'http',
    }),
    new transports.File({
      filename: './logs/verbose-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('verbose'),
      level: 'verbose',
    }),
    new transports.File({
      filename: './logs/debug-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('debug'),
      level: 'debug',
    }),
    new transports.File({
      filename: './logs/silly-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: levelFilter('silly'),
      level: 'silly',
    }),
    new transports.Console(),
  ],
});

export default logger;

export const ConsoleLogger = createLogger({
  transports: [new transports.Console()],
});
