import { celebrate, Joi } from 'celebrate';

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(
      /(http[s]?:\/\/)([www.]?[A-Za-z0-9-]+)(\.[A-Za-z])(\/[A-Za-z0-9-]+)?/,
    ),
  }),
});

export const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

export const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const avatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(
      /(http[s]?:\/\/)([www.]?[A-Za-z0-9-]+)(\.[A-Za-z])(\/[A-Za-z0-9-]+)?/,
    ),
  }),
});
