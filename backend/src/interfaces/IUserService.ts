import IUserLogin from "./IUserLogin";

export default interface IUserService {
    newUser (user: IUserLogin): Promise<object>,
    login(user: IUserLogin): Promise<object>,
}