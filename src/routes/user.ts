import { Router } from 'express';
import {
  createUser, getUser, getUsers, updateAvatar, updateUser,
} from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

export default router;
