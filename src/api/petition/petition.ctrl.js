import models from '../../models';
import * as colorConsole from '../../lib/console';
import * as validate from '../../lib/Validate/petition';
import { asyncForeach } from '../../lib/method';

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
      isAllowed: 0,
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

export const isAllowedPetition = async (req, res) => {
  const { body } = req;

  try {
    const { idx, isAllowed } = body;

    const result = {
      status: 200,
      messaga: '청원 게시글 승인 성공!',
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

export const readNotAllowedPetition = async (req ,res) => {
  const { accessLevel } = req.decoded;
  const { page } = req.query;
  let { limit } = req.query;

  if (accessLevel != 0 && accessLevel != 1) {
    const result = {
      status: 403,
      messaga: '권한 없음',
    };

    res.status(403).json(result);
    return;
  }

  if (!page || !limit) {
    const result = {
      status: 400,
      messaga: '요청 검증 오류',
    };

    res.status(400).json(result);
    return;
  }

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    const petition = await models.Petition.getNotAllowedPetitions(requestPage, limit);
    const petitionAll = await models.Petition.getNotAllowedAllPetitions();

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

// 승인된 청원 목록 조회
export const readPetitions = async (req, res) => {
  const { page } = req.query;
  let { limit } = req.query;

  const { type } = req.query;

  if (!page || !limit || !page) {
    const result = {
      status: 400,
      messaga: '요청 방식 검증 오류',
    };

    res.status(400).json(result);

    return;
  }
  
  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    let petition;
    let petitionAll;
    let totalPage;

    if (type === 'allowed') {
      petition = await models.Petition.getPetitions(requestPage, limit);
      petitionAll = await models.Petition.getAllPetitions();
  
      await asyncForeach(petition, async (item) => {
        const { idx } = item;
  
        const comment = await models.Comment.getCommentsByPetitionIdx(idx);
  
        item.commentCount = comment.length;
      });
  
      totalPage = Math.ceil(petitionAll.length / limit);
    } else if (type === 'not_allowed') {
      petition = await models.Petition.getNotAllowedPetitions(requestPage, limit);
      petitionAll = await models.Petition.getNotAllowedAllPetitions();
  
      await asyncForeach(petition, async (item) => {
        const { idx } = item;
  
        const comment = await models.Comment.getCommentsByPetitionIdx(idx);
  
        item.commentCount = comment.length;
      });
  
      totalPage = Math.ceil(petitionAll.length / limit);
    } else if (type === 'order') {
      petition = await models.Petition.getAllIsAllowPetitions(requestPage, limit);
      petitionAll = await models.Petition.getAllIsAllowPetitionsForCount();
  
      await asyncForeach(petition, async (item) => {
        const { idx } = item;
  
        const comment = await models.Comment.getCommentsByPetitionIdx(idx);
  
        item.commentCount = comment.length;
      });
      totalPage = Math.ceil(petitionAll.length / limit);
    } else if (type === 'vote_order') {
      petition = await models.Petition.getAllPetitionForVoteOrder(requestPage, limit);
      petitionAll = await models.Petition.getAllIsAllowPetitionsForCount();
  
      await asyncForeach(petition, async (item) => {
        const { idx } = item;
  
        const comment = await models.Comment.getCommentsByPetitionIdx(idx);
  
        item.commentCount = comment.length;
      });

      petition.sort((a, b) => {
        return  b["voteCount"] - a["voteCount"];
      });

      totalPage = Math.ceil(petitionAll.length / limit);
    }
    

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

export const readAllPetitions = async (req, res) => {
  const { page } = req.query;
  let { limit } = req.query;

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    const petition = await models.Petition.getAllIsAllowPetitions(requestPage, limit);
    const petitionAll = await models.Petition.getAllIsAllowPetitionsForCount();

    await asyncForeach(petition, async (item) => {
      const { idx } = item;

      const comment = await models.Comment.getCommentsByPetitionIdx(idx);

      item.commentCount = comment.length;
    });

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

export const readPetitionDetail = async (req, res) => {
  const { idx } = req.query;

  if (!idx) {
    const result = {
      status: 400,
      messaga: 'idx입력하세여!',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const petition = await models.Petition.findPetition(idx);
    const comment = await models.Comment.getCommentsByPetitionIdx(idx);
    const answer = await models.Answer.getAnswerByPetitionIdx(idx);

    petition.comment = [];
    petition.answer = answer;
    petition.comment = comment; 

    const result = {
      status: 200,
      messaga: '청원 게시글 조회 성공!',
      data: {
        petition,
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

export const getStudentCouncilPetition = async (req, res) => {
  const { accessLevel } = req.decoded;
  const { page, type } = req.query;
  let { limit } = req.query;

  if (!page || !limit || !type) {
    const result = {
      status: 400,
      messaga: '요청 오류!',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    let petition;
    let petitionAll;
    let totalPage;

    if (type === 'blind') {
      petition = await models.Petition.getBlindPetition(requestPage, limit);
      petitionAll = await models.Petition.getAllBlindPetition();
      totalPage = Math.ceil(petitionAll.length / limit);
      
    } else if (type === 'waiting') {
      petition = await models.Petition.getWaitingPetition(requestPage, limit);
      petitionAll = await models.Petition.getAllWaitingPetition();
      totalPage = Math.ceil(petitionAll.length / limit);
    }
    

    const result = {
      status: 200,
      messaga: '청원 게시글 조회 성공!',
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

export const readPetitionCategory = async (req, res) => {
  const { category, page } = req.query;
  let { limit } = req.query;
  if (!page || !limit) {
    const result = {
      status: 400,
      messaga: '요청 방식이 잘못됌!',
    };

    res.status(400).json(result);

    return;
  }
  

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    let petition;
    let petitionAll;
    let totalPage;

    if (!category) {
        petition = await models.Petition.getAllIsAllowPetitions(requestPage, limit);
        petitionAll = await models.Petition.getAllIsAllowPetitionsForCount();
    
        await asyncForeach(petition, async (item) => {
          const { idx } = item;
    
          const comment = await models.Comment.getCommentsByPetitionIdx(idx);
    
          item.commentCount = comment.length;
        });
    
        totalPage = Math.ceil(petitionAll.length / limit);
    } else {
        petitionAll = await models.Petition.getAllPetitionsByCategory(category);
        petition = await models.Petition.getPetitionsByCategory(category, requestPage, limit);
    
        await asyncForeach(petition, async (item) => {
          const { idx } = item;
    
          const comment = await models.Comment.getCommentsByPetitionIdx(idx);
    
          item.commentCount = comment.length;
        });

        totalPage = Math.ceil(petitionAll.length / limit);
    }
    const result = {
      status: 200,
      messaga: '청원 게시글 조회 성공!(카테고리)',
      data: {
        petition,
        totalPage
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

export const blindPetition = async (req, res) => {
  const { accessLevel } = req.decoded;
  const { body } = req;

  if (accessLevel !== 1 && accessLevel !== 0) {
    const result = {
      status: 403,
      messaga: '권한 없음!',
    };

    res.status(403).json(result);

    return;
  }

  try {
    await models.Petition.update({
      blind: body.isBlind,
    },{
      where: {
        idx: body.idx,
      }
    });

    const result = {
      status: 200,
      messaga: '블라인드 처리 완료!',
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
} 

export const deletePetition = async (req, res) => {
  const { idx } = req.query;
  const { accessLevel } = req.decoded;

  if (accessLevel !== 0 && accessLevel !== 1) {
    const result = {
      status: 403,
      messaga: '권한 없음!!',
    };

    res.status(403).json(result);

    return;
  }

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
        status: 404,
        messaga: '청원이 없어요!',
      };
  
      res.status(404).json(result);
  
      return;
    }

    await models.Comment.deleteByPetitionIdx(idx);

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

export const searchPetitionByTitle = async (req, res) => {
  const { title, page } = req.query;
  let { limit } = req.query;

  if (!page || !limit) {
    const result = {
      status: 400,
      messaga: '요청 양식 에러',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    const petition = await models.Petition.searchPetition(title, requestPage, limit);
    const petitionAll = await models.Petition.searchAllPetition(title);

    const totalPage = Math.ceil(petitionAll.length / limit);

    const result = {
      status: 200,
      messaga: '청원 검색 성공!',
      data: {
        petition,
        totalPage
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
}