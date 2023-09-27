import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { code = StatusCodes.INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(code)
    .send({ message: code === StatusCodes.INTERNAL_SERVER_ERROR ? 'Server error' : message });
  next();
};

export default errorHandler;
