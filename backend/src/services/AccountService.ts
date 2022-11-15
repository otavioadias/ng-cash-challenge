import Accounts from '../database/models/Accounts';
import Users from '../database/models/Users';
import IAccountService from '../interfaces/IAccountService';
import userJWT from '../utils/JWTDecode';
import verify from '../utils/JWTVerify';

export default class AccountService implements IAccountService {
    public async visualizerAccount(token: string): Promise<object | void> {
        const verifyToken = await verify(token);
        if (verifyToken) {
            const payload = await userJWT(token);
            const [user] = await Users.findAll({ where: { username: payload.username }});
            const accountUser = Accounts.findAll({ where: { id: user.accountId }});
            return accountUser;
        }
    }
}