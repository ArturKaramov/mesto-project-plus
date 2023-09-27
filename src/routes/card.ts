import { Router } from 'express';
import {
  getCards, createCard, deleteCard, putLike, deleteLike,
} from '../controllers/card';
import { CARDS_ALL_URL, CARD_LIKES_URL, CARD_URL } from '../utils/url';

const router = Router();

router.get(CARDS_ALL_URL, getCards);

router.post(CARDS_ALL_URL, createCard);

router.delete(CARD_URL, deleteCard);

router.put(CARD_LIKES_URL, putLike);

router.delete(CARD_LIKES_URL, deleteLike);

export default router;
