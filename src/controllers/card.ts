import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import Card from '../models/card';
import {
  CAST_ERROR_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/error-messages';
import { IRequestWithUser } from '../utils/types';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate('owner')
    .then((obj) => res.send(obj))
    .catch(next);
};

export const createCard = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user?.id,
  })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'ValidationError') {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
    })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.body.user._id } }, { new: true })
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
    })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE);
      }
      next(err);
    })
    .catch(next);
};
