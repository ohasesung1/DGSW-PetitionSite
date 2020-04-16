import models from '../../models';
import * as colorConsole from '../../lib/console';
import * as validate from '../../lib/Validate/petition';

export const writePetition = async (req, res) => {
  const { body } = req;
  const { memberId } = req.decoded;

  try {
    await validate.validateWritePetition(body);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 400,
      messaga: '청원 검증 오류!',
    };

    res.status(400).json(result);

    return;
  }

  try {

    await models.Petition.create({
      ...body,
      id: memberId,
    });

    const result = {
      status: 200,
      messaga: '청원 작성 완료!',
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

export const readPetitions = async (req, res) => {
  const { page } = req.query;
  let { limit } = req.query;

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    const petition = await models.Petition.getPetitions(requestPage, limit);
    const petitionAll = await models.Petition.getAllPetitions();

    const totalPage = Math.ceil(petitionAll.length / limit);

    const result = {
      status: 200,
      messaga: '청원 게시글 목록 조회 성공!',
      data: {
        petition,
        totalPage,
      },
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

export const updatePetition = async (req, res) => {
  try {
    const result = {
      status: 200,
      messaga: '청원 게시글 수정 완료!',
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

export const deletePetition = async (req, res) => {
  const { idx } = req.query;

  if (!idx) {
    const result = {
      status: 400,
      messaga: 'idx를 지정하세요!!',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const petition = await models.Petition.findPetition(idx);

    if (!petition) {
      const result = {
        status: 400,
        messaga: '청원이 없어요!',
      };
  
      res.status(400).json(result);
  
      return;
    }

    await models.Petition.destroy({
      where: {
        idx,
      },
    });

    const result = {
      status: 200,
      messaga: '청원 게시글 삭제 완료!',
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
