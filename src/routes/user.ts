import { Router } from 'express';
import {
  loginValidation, registerValidation, userIdValidation, userUpdateValidation, avatarUpdate,
} from '../validation/user';
import {
  createUser,
  getUser,
  getMe,
  getUsers,
  login,
  updateAvatar,
  updateNameAndAbout,
} from '../controllers/user';
import {
  LOGIN_URL,
  REGISTER_URL,
  USERS_ALL_URL,
  USER_MINE_AVATAR_URL,
  USER_MINE_URL,
  USER_URL,
} from '../utils/url';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  LOGIN_URL,
  loginValidation,
  login,
);

router.post(
  REGISTER_URL,
  registerValidation,
  createUser,
);

router.use(auth);

router.get(USERS_ALL_URL, getUsers);

router.get(USER_MINE_URL, getMe);

router.get(
  USER_URL,
  userIdValidation,
  getUser,
);

router.patch(
  USER_MINE_URL,
  userUpdateValidation,
  updateNameAndAbout,
);

router.patch(
  USER_MINE_AVATAR_URL,
  avatarUpdate,
  updateAvatar,
);

export default router;
