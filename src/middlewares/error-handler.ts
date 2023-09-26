import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { code = 500, message } = err;
  res.status(code).send({ message: code === 500 ? 'Server error' : message });
  next();
};

export default errorHandler;
