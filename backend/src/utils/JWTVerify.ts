import jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const verify = async (token: string) => jwt.verify(token, JWT_SECRET);

export default verify;