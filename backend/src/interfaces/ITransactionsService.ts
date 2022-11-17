export default interface ITransactionsService {
    transaction(username: string, value: number, token: string): Promise<void>,
    viewTransaction(token: string): Promise<object>,
    dateTransaction(token: string, date: string): Promise<object>,
    debitedTransaction(token: string, date: string | undefined): Promise<object>,
    creditedTransaction(token: string, date: string | undefined): Promise<object>,
}