type IUserLogin = {
    username: string,
    password: string,
  }

export type IToken = {
  token: string,
}

export type IUser = {
  id: number,
  username: string,
  password: string,
  accountId: number,
}
export default IUserLogin;

