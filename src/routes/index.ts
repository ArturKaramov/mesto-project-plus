import { Router } from 'express';
import cardsRouter from './card';
import userRouter from './user';

const router = Router();

router.use('/', userRouter);
router.use('/', cardsRouter);

export default router;
