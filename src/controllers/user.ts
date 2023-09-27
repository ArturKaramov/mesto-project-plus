import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import user from '../models/user';
import { BAD_REQUEST_MESSAGE, NOT_FOUND_USER_MESSAGE } from '../utils/constants';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({ _id: req.params.userId })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE);
      }
      res.send(...obj);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(req.body.user, { name, about }, { new: true })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  user
    .findByIdAndUpdate(req.body.user, { avatar: req.body.avatar }, { new: true })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};
