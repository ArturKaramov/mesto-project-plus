import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IRequestWithUser } from './utils/types';
import errorHandler from './middlewares/error-handler';
import userRouter from './routes/user';
import cardRouter from './routes/card';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/mesto');

app.use(express.json());

app.use((req: IRequestWithUser, res: Response, next: NextFunction) => {
  req.user = { _id: '650da79e2357b7b7f51f8bb2' };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorHandler);

app.listen(PORT);
