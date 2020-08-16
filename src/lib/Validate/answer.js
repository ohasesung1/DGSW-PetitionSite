import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const vaildatePetitionAnswer = async (body) => {
  const schema = Joi.object().keys({
    petitionIdx: Joi.number().integer().required(),
    contents: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}

export const vaildateAnswerUpdate = async (body) => {
  const schema = Joi.object().keys({
    petitionIdx: Joi.number().integer().required(),
    contents: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}