import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import { UNAUTHORIZED_MESSAGE } from '../utils/error-messages';
import JWT_SECRET from '../utils/env';
import { IRequestWithPayload } from '../utils/types';

export default (req: IRequestWithPayload, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorWithCode(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_MESSAGE));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new ErrorWithCode(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_MESSAGE));
    }
    req.user = payload;
    next();
  }
};
