import { Router } from 'express';
import {
  getCards, createCard, deleteCard, putLike, deleteLike,
} from '../controllers/card';

const router = Router();

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', putLike);

router.delete('/:cardId/likes', deleteLike);

export default router;