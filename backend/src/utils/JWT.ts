import jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig: object = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const generateToken = async (payload: object) => jwt.sign(payload, JWT_SECRET, jwtConfig);

export default generateToken;
