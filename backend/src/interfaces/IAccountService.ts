import IUserLogin from "./IUserLogin";

export default interface IUserService {
    visualizerAccount(token: string): Promise<object | void>;
}