export default interface ITransactionsService {
    transaction(username: string, value: number, token: string): Promise<void>,
    viewTransaction(token: string): Promise<object>,
}