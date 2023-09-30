import { celebrate, Joi } from 'celebrate';

export const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .pattern(/(http[s]?:\/\/)([www.]?[A-Za-z0-9-]+)(\.[A-Za-z])(\/[A-Za-z0-9-]+)?/),
  }),
});

export const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex(),
  }),
});
