import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  updateAvatar,
  updateNameAndAbout,
} from '../controllers/user';
import {
  USERS_ALL_URL, USER_MINE_AVATAR_URL, USER_MINE_URL, USER_URL,
} from '../utils/url';

const router = Router();

router.get(USERS_ALL_URL, getUsers);

router.get(USER_URL, getUser);

router.post(USERS_ALL_URL, createUser);

router.patch(USER_MINE_URL, updateNameAndAbout);

router.patch(USER_MINE_AVATAR_URL, updateAvatar);

export default router;
