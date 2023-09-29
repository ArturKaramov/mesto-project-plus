import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const errtTransport = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: 1,
});

const reqTransport = new winston.transports.DailyRotateFile({
  filename: 'request-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: 1,
});

export const requestLogger = expressWinston.logger({
  transports: [reqTransport],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [errtTransport],
  format: winston.format.json(),
});
