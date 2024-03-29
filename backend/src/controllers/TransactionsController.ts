import { Request, Response } from "express";
import ITransactionsService from "../interfaces/ITransactionsService";

export default class TransactionController {
    private readonly transactionService: ITransactionsService;

    constructor(transactionService: ITransactionsService) {
        this.transactionService = transactionService;
    }
    async transaction(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;
        const { username, value } = req.body;
        if(!username || !value) {
            return res.status(400).json({ message: 'Username or value cannot be empty' });
        }
        const transaction = await this.transactionService.transaction(username, value, token as string);
        return res.status(201).json(transaction);
    }

    async viewTransaction(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;
        const { date } = req.query;
        const transactions = await this.transactionService.viewTransaction(token as string, date);
        return res.status(200).json(transactions);
    }

    async debitedTransaction(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;
        const { date } = req.query;
        const transactions = await this.transactionService.debitedTransaction(token as string, date);
        return res.status(200).json(transactions);
    }

    async creditedTransaction(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;
        const { date } = req.query;
        const transactions = await this.transactionService.creditedTransaction(token as string, date);
        return res.status(200).json(transactions);
    }
}