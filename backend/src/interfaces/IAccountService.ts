export default interface IAccountervice {
    visualizerAccount(token: string): Promise<IAccount> 
}

export type IAccount = {
    id: number,
    balance: number
}