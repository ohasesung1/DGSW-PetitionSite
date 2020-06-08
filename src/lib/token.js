import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

// Create Token

export const createToken = async (memberId, accessLevel) => {
  const payload = {
    memberId, accessLevel,
  };

  const option = { expiresIn: '5 days', issuer: 'petition-site.com', subject: 'token' }

  try {
    return jwt.sign(payload, secret, option);
  } catch (error) {
    throw error;
  }
};


export const createRefreshToken = async (memberId, accessLevel) => {
  const payload = {
    memberId, accessLevel,
  };
  const option = { expiresIn: '7 days', issuer: 'petition-site.com', subject: 'refreshToken' };

  // eslint-disable-next-line no-useless-catch
  try {
    return jwt.sign(payload, secret, option);
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, secret);
  } catch (error) {
    console.log(error.message);
    throw error
  }
};
