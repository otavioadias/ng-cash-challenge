export default interface ITransactionsService {
    transaction(username: string, value: number, token: string): Promise<void>,
    viewTransaction(token: string, date: any): Promise<object>,
    debitedTransaction(token: string, date: any): Promise<object>,
    creditedTransaction(token: string, date: any): Promise<object>,
}