import jwtDecode from 'jwt-decode';

interface MyToken {
  username: string,
  iat: number,
  exp: number
}

const userJWT = async (token: string) => {
  const decoded = jwtDecode<MyToken>(token);
  return decoded;
};

export default userJWT;