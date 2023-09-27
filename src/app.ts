import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from './utils/classes/ErrorWithCode';
import errorHandler from './middlewares/error-handler';
import rootRouter from './routes';
import { IRequestWithUser } from './utils/types';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mesto');

app.use(express.json());

app.use((req: IRequestWithUser, res: Response, next: NextFunction) => {
  req.user = { id: '650da79e2357b7b7f51f8bb2' };
  next();
});

app.use('/', rootRouter);

app.all('*', () => {
  throw new ErrorWithCode(StatusCodes.NOT_FOUND, 'Path Not Found');
});

app.use(errorHandler);

app.listen(PORT);
