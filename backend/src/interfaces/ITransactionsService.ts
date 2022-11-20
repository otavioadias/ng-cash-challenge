import Transactions from "../database/models/Transactions";

export default interface ITransactionsService {
    transaction(username: string, value: number, token: string): Promise<Transactions[]>,
    viewTransaction(token: string, date: any): Promise<object>,
    debitedTransaction(token: string, date: any): Promise<object>,
    creditedTransaction(token: string, date: any): Promise<object>,
}