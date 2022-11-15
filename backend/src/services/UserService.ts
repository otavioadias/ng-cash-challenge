import IUserService from "../interfaces/IUserService";
import bcrypt = require('bcrypt');
import IUserLogin, { IUser } from "../interfaces/IUserLogin";
import Users from "../database/models/Users";
import Accounts from "../database/models/Accounts";
import generateToken from "../utils/JWT";
import InvalidParamError from "../errors/invalid-param-error";
import MissingParamError from "../errors/missing-param-error";
import UserExists from "../errors/user-exist";


export default class UserService implements IUserService {
    static hashPassword(password: string): string {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        return hash;
    }

    static async generateTokenUser(user: IUserLogin): Promise<string> {
        const token = await generateToken({ username: user.username });
        return token;
    }

    static async findUser(username: string): Promise<IUser> {
        const [userExist] = await Users.findAll({ where: { username } });
        return userExist;
    }

    public async newUser(user: IUserLogin): Promise<object> {
        const passwordHashed = UserService.hashPassword(user.password);
        const verifyUser = await UserService.findUser(user.username);
        if (!verifyUser) {
            const accountId = await Accounts.create({
                balance: 100
            });
            const newUser = await Users.create({
                username: user.username,
                password: passwordHashed,
                accountId: accountId.id,
            });
            const token = await UserService.generateTokenUser(user);
            return { token };
        }
        throw new UserExists('User already exist');
        
    }

    static async decodePassword(password: string, passwordDB: string): Promise<boolean> {
        const result = await bcrypt.compare(password, passwordDB);
        if (result === false) {
            throw new InvalidParamError('Incorrect email or password');
        }
        return result;
    }

    public async login(user: IUserLogin): Promise<object> {
        if (!user.username || !user.password) {
            throw new MissingParamError('All fields must be filled');
          }
        const verifyUser = await UserService.findUser(user.username);
        if (!verifyUser) {
            throw new InvalidParamError('Incorrect email or password');
        }
        const decode = await UserService.decodePassword(user.password, verifyUser.password);
        const token = await UserService.generateTokenUser(user);
        return { token };
    }
}