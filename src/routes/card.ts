import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCards, createCard, deleteCard, putLike, deleteLike,
} from '../controllers/card';
import { CARDS_ALL_URL, CARD_LIKES_URL, CARD_URL } from '../utils/url';
import auth from '../middlewares/auth';

const router = Router();

router.use(auth);

router.get(CARDS_ALL_URL, getCards);

router.post(
  CARDS_ALL_URL,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/(http[s]?:\/\/)([www.]?[A-Za-z0-9-]+)(\.[A-Za-z])(\/[A-Za-z0-9-]+)?/),
    }),
  }),
  createCard,
);

router.delete(
  CARD_URL,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard,
);

router.put(
  CARD_LIKES_URL,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  putLike,
);

router.delete(
  CARD_LIKES_URL,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteLike,
);

export default router;
