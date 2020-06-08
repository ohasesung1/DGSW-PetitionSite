import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateWritePetition = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    contents: Joi.string().required(),
    category: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}

export const vaildateUpdatePetition = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    contents: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}