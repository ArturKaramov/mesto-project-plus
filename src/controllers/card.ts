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
    owner: req.user?._id,
  })
    .then((obj) => res.send(obj))
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'ValidationError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
    })
    .then((data) => {
      if (JSON.stringify(data.owner) !== JSON.stringify(req.user?._id)) {
        next(new ErrorWithCode(StatusCodes.FORBIDDEN, 'Not Enough Rights'));
      } else {
        data.deleteOne()
          .then(() => res.send({ message: 'Card Deleted' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error && err.name === 'CastError') {
        next(new ErrorWithCode(StatusCodes.BAD_REQUEST, CAST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const updateCard = (
  cardId: string,
  params: { [key: string]: { [key: string]: string | undefined } },
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(cardId, params, { new: true })
    .orFail(() => {
      throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
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

export const putLike = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  updateCard(req.params.cardId, { $addToSet: { likes: req.user?._id } }, res, next);
};

export const deleteLike = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  updateCard(req.params.cardId, { $pull: { likes: req.user?._id } }, res, next);
};
