import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import user from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  user
    .find({ _id: req.params.userId })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.NOT_FOUND, 'User not exist');
      }
      res.send({ data: obj });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((obj) => res.send({ data: obj }))
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(req.body.user, { name, about })
    .then((obj) => res.send({ data: obj }))
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  user
    .findByIdAndUpdate(req.body.user, { avatar: req.body.avatar })
    .then((obj) => res.send({ data: obj }))
    .catch(next);
};
