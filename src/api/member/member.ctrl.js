import models from '../../models';

export const getMemberList = async (req, res) => {
  const { accessLevel } = req.decoded;
  
  if (accessLevel !== 0) {
    const result = {
      status: 403,
      message: '관리자 권한 없음!',
    };

    res.status(403).json(result);

    return;
  }

  try {

    const member = await models.Member.getOrderMember();

    for (let i = 0; i < member.length; i++) {
      delete member[i].pw;
    }

    const result = {
      status: 200,
      message: '멤버 리스트 조회 성공',
      data: {
        member,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const findMemberBySearch = async (req, res) => {
  const { query } = req;

  try {
    const { searchWord } = query;
    const member = await models.Member.searchMember(searchWord);

    const result = {
      status: 200,
      message: '멤버 검색 성공!',
      data: {
        member,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};