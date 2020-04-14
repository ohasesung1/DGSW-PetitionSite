import models from '../../models';
import * as validate from '../../lib/Validate/auth';
import * as token from '../../lib/token';

export const login = async (req ,res) => {
  const { body } = req;
  try {
    await validate.validateLogin(body);
  } catch (error) {
    const result = {
      status: 400,
      message: 'login valite error!',
    }

    res.status(400).json(result);

    return;
  }

  const { id, pw } = body;

  const member = await models.Member.findMemberForLogin(id, pw);

  if (!member) {
    const result = {
      status: 403,
      message: 'not found member!',
    }

    res.status(403).json(result);

    return;
  }

  const tokenData = await token.createToken(member.id, member.accessLevel); 

  try {
    const result = {
      status: 200,
      message: '로그인 성공!',
      data: {
        tokenData,
        member,
      }
    }

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};

export const registerMember = async (req, res) => {
  const { body } = req;

  try {
    await validate.vaildateRegister(body);
  } catch (error) {
    const result = {
      status: 400,
      message: '회원가입 양식 오류!',
    }

    res.status(400).json(result);

    return;
  }

  try {
    const addData = {
      ...body,
    };
    const member = await models.Member.findMemberById(addData.id);

    if (member) {
      const result = {
        status: 403,
        message: '이미 가입 된 사용자 Id 입니다.',
      }
  
      res.status(403).json(result);
  
      return;
    }

    await models.Member.create({
      ...body,
      accessLevel: 1,
    });

    const result = {
      status: 200,
      message: '회원가입 성공!',
    }

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};

export const validateId = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    const result = {
      status: 400,
      message: 'id를 입력 하세요!',
    }

    res.status(400).json(result);

    return;
  }

  try {
    const member = await models.Member.findMemberById(id);

    if (member) {
      const result = {
        status: 403,
        message: '이미 가입된 id!',
      }
  
      res.status(403).json(result);

      return;
    }

    const result = {
      status: 200,
      message: '사용 가능한 id!',
    }

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};

export const grantAuth = async (req ,res) => {
  const { accessLevel } = req.decoded;
  const { memberId } = req.body;

    if (accessLevel !== 0) {
      const result = {
        status: 403,
        message: '권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    if (!memberId) {
      const result = {
        status: 400,
        message: 'memberId를 지정하세요!',
      }
  
      res.status(400).json(result);

      return;
    }
  try {
    await models.Member.grantAuth(memberId);
    const result = {
      status: 200,
      message: '학생회 권한 주기 성공!',
    }

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};
