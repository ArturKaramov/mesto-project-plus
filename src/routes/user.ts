import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
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
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  REGISTER_URL,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(
        /(http[s]?:\/\/)([www.]?[A-Za-z0-9-]+)(\.[A-Za-z])(\/[A-Za-z0-9-]+)?/,
      ),
    }),
  }),
  createUser,
);

router.use(auth);

router.get(USERS_ALL_URL, getUsers);

router.get(USER_MINE_URL, getMe);

router.get(
  USER_URL,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);

router.patch(
  USER_MINE_URL,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
    }),
  }),
  updateNameAndAbout,
);

router.patch(
  USER_MINE_AVATAR_URL,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }),
  updateAvatar,
);

export default router;
