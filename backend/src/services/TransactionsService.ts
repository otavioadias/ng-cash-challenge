import ITransactionsService from "../interfaces/ITransactionsService";
import CashInsuficient from "../errors/cash-insuficient-error";
import Users from "../database/models/Users";
import Transactions from "../database/models/Transactions";
import Accounts from "../database/models/Accounts";
import InvalidParamError from "../errors/invalid-param-error";
import IAccountService, { IAccount } from '../interfaces/IAccountService';
import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from 'date-fns';


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
    await Transactions.create({
      debitedAccountId: userCashOut.id,
      creditedAccountId: userCashIn.accountId,
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

  public async viewTransaction(token: string, date: string | undefined): Promise<Transactions[]> {
    const userId = await this.accountService.visualizerAccount(token);
    if(!date) {
      const transaction = await Transactions.findAll({ where: { 
        [Op.or]: [
          { debitedAccountId: userId.id },
          { creditedAccountId: userId.id },
        ],
        }});
      return transaction;
    }
    const transactionDate = await Transactions.findAll({ where: { 
        created_at: { [Op.between]: [
          startOfDay(parseISO(date as string)),
          endOfDay(parseISO(date as string)),
        ] },
      }});
    return transactionDate;
  }

 

  public async debitedTransaction(token: string, date: string | undefined): Promise<Transactions[]> {
    const userId = await this.accountService.visualizerAccount(token);
    if(!date) {
      const transaction = await Transactions.findAll({ where: { debitedAccountId: userId.id } });
      return transaction;
    }
    const transactionDate = await Transactions.findAll({ where: { 
      [Op.and]: [
        { debitedAccountId: userId.id },
        { created_at: { [Op.between]: [
          startOfDay(parseISO(date)),
          endOfDay(parseISO(date)),
        ] } },
      ],
      }});
    return transactionDate;
  }

  public async creditedTransaction(token: string, date: string | undefined): Promise<Transactions[]> {
    const userId = await this.accountService.visualizerAccount(token);
    if(!date) {
      const transaction = await Transactions.findAll({ where: { creditedAccountId: userId.id } });
      return transaction;
    }
    const transactionDate = await Transactions.findAll({ where: { 
      [Op.and]: [
        { creditedAccountId: userId.id },
        { created_at: { [Op.between]: [
          startOfDay(parseISO(date)),
          endOfDay(parseISO(date)),
        ] } },
      ],
      }});
    return transactionDate;
  }
  
}
