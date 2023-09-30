import express from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { errors } from 'celebrate';
import config from '../config';
import ErrorWithCode from './utils/classes/ErrorWithCode';
import errorHandler from './middlewares/error-handler';
import rootRouter from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

mongoose.connect(config.DB_PORT);

app.use(express.json());

app.use(requestLogger);

app.use('/', rootRouter);

app.all('*', () => {
  throw new ErrorWithCode(StatusCodes.NOT_FOUND, 'Path Not Found');
});

app.use(errors());

app.use(errorHandler);

app.use(errorLogger);

app.listen(config.PORT);
