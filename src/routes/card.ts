import { Router } from 'express';
import { cardValidation, cardIdValidation } from '../validation/card';
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
  cardValidation,
  createCard,
);

router.delete(
  CARD_URL,
  cardIdValidation,
  deleteCard,
);

router.put(
  CARD_LIKES_URL,
  cardIdValidation,
  putLike,
);

router.delete(
  CARD_LIKES_URL,
  cardIdValidation,
  deleteLike,
);

export default router;
