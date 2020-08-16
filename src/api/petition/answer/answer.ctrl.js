import * as validate from '../../../lib/Validate/answer';
import models from '../../../models';

export const answerWrite = async (req, res) => {
  const { body } = req;
  const { memberId, accessLevel } = req.decoded;

  if (accessLevel != 0 && accessLevel != 1) {
    const result = {
      status: 403,
      messaga: 'no permission',
    };

    res.status(403).json(result);
    return;
  }

  try {
    await validate.vaildatePetitionAnswer(body);
  } catch (error) {
    const result = {
      status: 400,
      message: 'bad request!',
    };

    res.status(400).json(result);
    return;
  }

  try {

    const petition = await models.Petition.findPetition(body.petitionIdx);

    if (!petition) {
      const result = {
        status: 404,
        message: 'not found petition!',
      };
  
      res.status(404).json(result);

      return
    }

    if (petition.isAllowed === 1) {
      const result = {
        status: 405,
        messaga: 'this petition has already been answered',
      };
  
      res.status(405).json(result);
      
      return;
    }

    await models.Petition.updateAllowPetition(body.petitionIdx);

    await models.Answer.create({
      ...body,
      id: memberId,
    });

    const result = {
      status: 200,
      message: 'answer write success!',
    };

    res.status(200).json(result); 
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      message: 'server error!',
    };

    res.status(500).json(result);
  }
};

export const answerUpdate = async (req, res) => {
  const { body } = req;
  const { accessLevel } = req.decoded;

  if (accessLevel != 0 && accessLevel != 1) {
    const result = {
      status: 403,
      messaga: 'no permission',
    };

    res.status(403).json(result);
    return;
  }

  try {
    await validate.vaildateAnswerUpdate(body);
  } catch (error) {
    const result = {
      status: 400,
      message: 'bad request!',
    };

    res.status(400).json(result);
    return;
  }

  try {
    const { petitionIdx, contents } = body;

    await models.Answer.update({
      contents,
    }, {
      where: {
        petitionIdx
      },
    });

    const result = {
      status: 200,
      message: 'answer update success!',
    };

    res.status(200).json(result); 
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      message: 'server error!',
    };

    res.status(500).json(result);
  }
};