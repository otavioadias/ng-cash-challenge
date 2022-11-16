import Accounts from '../database/models/Accounts';
import Users from '../database/models/Users';
import UserDontExists from '../errors/user-exist';
import IAccountService, { IAccount } from '../interfaces/IAccountService';
import userJWT from '../utils/JWTDecode';
import verify from '../utils/JWTVerify';

export default class AccountService implements IAccountService {
    public async visualizerAccount(token: string): Promise<IAccount> {
        const verifyToken = await verify(token);
        if (verifyToken) {
            const payload = await userJWT(token);
            const [user] = await Users.findAll({ where: { username: payload.username }});
            const [accountUser] = await Accounts.findAll({ where: { id: user.accountId }});
            return accountUser.dataValues as unknown as IAccount;
        }
        throw new UserDontExists('User does not exist');
    }
}