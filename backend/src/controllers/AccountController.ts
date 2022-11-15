import { Request, Response } from "express";
import InvalidTokenError from "../errors/invalid-token-error";
import IAccountService from "../interfaces/IAccountService";

export default class AccountController {
    private readonly accountService: IAccountService;
    
    constructor(accountService: IAccountService) {
        this.accountService = accountService;
    }

    async findAccount(req: Request, res: Response): Promise<Response> {
        const token = req.headers.authorization;
        const accounts = await this.accountService.visualizerAccount(token as string);
        return res.status(200).json(accounts);
    }

}