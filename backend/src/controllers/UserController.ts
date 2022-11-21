import { Request, Response } from "express";
import IUserService from "../interfaces/IUserService";

export default class UserController {
    private readonly userService: IUserService;
    
    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async newUser(req: Request, res: Response): Promise<Response> {
        const user = req.body;
        const newUser = await this.userService.newUser(user);
        return res.status(201).json(newUser);
    }

    async login(req: Request, res: Response): Promise<Response> {
        const user = req.body;
        const token = await this.userService.login(user);
        return res.status(200).json(token);
    }
}