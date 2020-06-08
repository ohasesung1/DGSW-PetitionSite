import BaseJoi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiDate);

export const validateWriteComment = async (body) => {
  const schema = Joi.object().keys({
    petitionIdx: Joi.number().integer(),
    contents: Joi.string().required(),
  });

  try {
    return await schema.validateAsync(body);
  } catch (error) {
    throw error;
  }
}
