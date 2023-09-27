import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';
import { IRequestWithUser } from '../utils/types';
import Card from '../models/card';
import { BAD_REQUEST_MESSAGE, NOT_FOUND_CARD_MESSAGE } from '../utils/constants';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const createCard = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  if (req.user && req.user._id) {
    Card.create({
      name,
      link,
      owner: req.user._id,
      likes: [],
      createdAt: Date.now(),
    })
      .then((obj) => {
        if (!obj) {
          throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
        }
        res.send(obj);
      })
      .catch(next);
  }
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.NOT_FOUND, NOT_FOUND_CARD_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.body.user._id } }, { new: true })
    .then((obj) => {
      if (!obj) {
        throw new ErrorWithCode(StatusCodes.BAD_REQUEST, BAD_REQUEST_MESSAGE);
      }
      res.send(obj);
    })
    .catch(next);
};
