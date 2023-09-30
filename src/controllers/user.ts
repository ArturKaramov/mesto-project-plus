import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import User from '../models/user';
import {
  CAST_ERROR_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/error-messages';
import { IRequestWithUser } from '../utils/types';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', `Bearer ${token}`, { httpOnly: true });
      res.send({ message: 'Successfully Logged In' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'ValidationError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => login(req, res, next))
        .catch((err) => {
          if (err instanceof mongoose.Error && err.name === 'ValidationError') {
            next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
          } else if (err.code === 11000) {
            next(new ErrorWithCode(StatusCodes.CONFLICT, 'This Email Is Already Registered'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((obj) => res.send(obj))
    .catch(next);
};

const getUserById = (id: string | undefined, res: Response, next: NextFunction) => {
  User.findById({ _id: id })
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE);
    })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  getUserById(req.params.userId, res, next);
};

export const getMe = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  getUserById(req.user?._id, res, next);
};

const updateUser = (
  id: string | undefined,
  res: Response,
  next: NextFunction,
  data: { [key: string]: string },
) => {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .orFail(() => new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_USER_MESSAGE))
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'ValidationError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

export const updateNameAndAbout = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  updateUser(req.user?._id, res, next, { name, about });
};

export const updateAvatar = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  updateUser(req.user?._id, res, next, { avatar });
};
