import ITransactionsService from "../interfaces/ITransactionsService";
import CashInsuficient from "../errors/cash-insuficient-error";
import Users from "../database/models/Users";
import Transactions from "../database/models/Transactions";
import Accounts from "../database/models/Accounts";
import InvalidParamError from "../errors/invalid-param-error";
import IAccountService, { IAccount } from '../interfaces/IAccountService';
import { Op } from "sequelize";


export default class TransactionsService implements ITransactionsService {
  private readonly accountService: IAccountService;
    
    constructor(accountService: IAccountService) {
        this.accountService = accountService;
    }

  public async transaction(
    username: string,
    value: number,
    token: string
  ): Promise<void> {
    const userCashOut = await this.accountService.visualizerAccount(token);
    const [userCashIn] = await Users.findAll({ where: { username } });

    if(!userCashIn) {
      throw new InvalidParamError('Invalid username');
    }
    if (userCashOut.id === userCashIn.accountId) {
      throw new InvalidParamError("You dont transfer for yourself");
    }
    if (userCashOut.balance < value) {
      throw new CashInsuficient(
        "Cash should be greather than value that you wants transfer"
      );
    }
    console.log(new Date());
    await Transactions.create({
      debitedAccountId: userCashIn.accountId,
      creditedAccountId: userCashOut.id,
      value,
      createdAt: new Date(),
    });

    await Accounts.update(
      { balance: userCashOut.balance - value },
      { where: { id: userCashOut.id } }
    );
    
    const [accountUser] = await Accounts.findAll({ where: { id: userCashIn.accountId }});
    await Accounts.update(
      { balance: accountUser.balance + value },
      { where: { id: userCashIn.id } }
    );
  }

  public async viewTransaction(token: string): Promise<object> {
    const userId = await this.accountService.visualizerAccount(token);
    const transaction = await Transactions.findAll({ where: { 
      [Op.or]: [
        {debitedAccountId: userId.id },
        {creditedAccountId: userId.id },
      ],
      }});
    return transaction;
  }
}
