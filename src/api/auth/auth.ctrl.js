import models from '../../models';
import * as validate from '../../lib/Validate/auth';
import * as token from '../../lib/token';
import isEmail from 'validator/lib/isEmail';
import * as emailLib from '../../lib/email';

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
      accessLevel: 2,
    });

    const result = {
      status: 200,
      message: '회원가입 성공!',
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
  const { id } = req.body;

    if (accessLevel !== 0) {
      const result = {
        status: 403,
        message: '권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    if (!id) {
      const result = {
        status: 400,
        message: 'memberId를 지정하세요!',
      }
  
      res.status(400).json(result);

      return;
    }
  try {
    await models.Member.grantAuth(id);
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


export const deleteAuth = async (req ,res) => {
  const { accessLevel } = req.decoded;
  const { id } = req.body;

    if (accessLevel !== 0) {
      const result = {
        status: 403,
        message: '권한 없음!',
      }
  
      res.status(403).json(result);

      return;
    }

    if (!id) {
      const result = {
        status: 400,
        message: 'memberId를 지정하세요!',
      }
  
      res.status(400).json(result);

      return;
    }
  try {
    await models.Member.deleteAuth(id);
    const result = {
      status: 200,
      message: '학생회 권한 삭제 성공!',
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

export const validateEmail = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  // if (!isEmail(email)) {
  //   const result = {
  //     status: 400,
  //     message: '이메일 형식을 지켜주세요.',
  //   }

  //   res.status(400).json(result);
  //   return;
  // }
    
  try {

    const emailData = await models.Member.findMemberById(email);

    if (emailData) {
      const result = {
        status: 403,
        message: '이미 회원가입 처리된 이메일 입니다!',
      };

      res.status(403).json(result);

      return;
    }

    const verify = await models.EmailVerify.findeEmailCode(email);
    if (verify) {
      await models.EmailVerify.destroy({
        where: {
          email,
        },
      });
    }

    let emailCode = await emailLib.createEmailCode();

    try {
      emailCode = String(emailCode);

      await emailLib.sendEmailCode(email, emailCode);
    } catch (error) {
      log.error('이메일 전송 중 에러 발생', error);

      const result = {
        status: 503,
        message: '이메일 전송 중 에러 발생!',
      };

      res.status(503).json(result);

      return;
    }

    await models.EmailVerify.create({
      email,
      code: emailCode,
    });

    const result = {
      status: 200,
      message: '이메일 인증 요청 성공!',
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
};

export const verifyEmailCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    const result = {
      status: 400,
      message: '이메일 혹은 코드를 보내주세요!',
    };

    res.status(400).json(result);
    return;
  }
  try {

    const verify = await models.EmailVerify.verifyCode(email, code);

    if (!verify) {
      const result = {
        status: 403,
        message: '코드 검증 실패!',
      };

      res.status(403).json(result);

      return;
    }

    const result = {
      status: 200,
      message: '검증 성공!!',
    };

    res.status(200).json(result);
  } catch (error) {
    log.error(error);

    const result = {
      status: 500,
      message: '서버 에러!',
    };

    res.status(500).json(result);
  }
};