import models from '../../../models';
import * as colorConsole from '../../../lib/console';
import * as validate from '../../../lib/Validate/comment'

export const writeComment = async (req, res) => {
  const { body } = req;
  const { memberId } = req.decoded;

  try {
    await validate.validateWriteComment(body);
  } catch (error) {
    const result = {
      status: 400,
      messaga: '검증 에러!',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const member = await models.Comment.findComment(body.petitionIdx, memberId);

    if (member) { 
      const result = {
        status: 403,
        messaga: '이미 동의를 한 청원 입니다!',
      };
  
      res.status(403).json(result);

      return;
    }

    await models.Comment.create({
      ...body,
      id: memberId,
    });

    const result = {
      status: 200,
      messaga: '동의 성공!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};
