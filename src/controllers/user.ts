import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import user from '../models/user';
import {
  CAST_ERROR_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/error-messages';
import { IRequestWithUser } from '../utils/types';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((obj) => res.send(obj))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'ValidationError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
      }
      next(err);
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  user
    .findById(req.params.userId)
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE);
    })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE));
      }
      next(err);
    });
};

const updateUser = (
  id: string | undefined,
  res: Response,
  next: NextFunction,
  data: { [key: string]: string },
) => {
  user
    .findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .orFail(() => new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE))
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        if (err.name === 'ValidationError') {
          next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
        } else if (err.name === 'CastError') {
          next(new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE));
        }
      }
      next(err);
    });
};

export const updateNameAndAbout = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  updateUser(req.user?.id, res, next, { name, about });
};

export const updateAvatar = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  updateUser(req.user?.id, res, next, { avatar });
};
