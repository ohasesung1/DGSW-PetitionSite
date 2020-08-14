import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateLogin = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().email().required(),
    pw: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}

export const vaildateRegister = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().email().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
    grade: Joi.number().integer().required(),
    studentClass: Joi.number().integer().required(),
    number: Joi.number().integer().required()
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}