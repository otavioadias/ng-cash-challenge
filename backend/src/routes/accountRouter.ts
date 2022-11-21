import { Request, Response, Router } from 'express';
import AccountController from '../controllers/AccountController';
import AccountService from '../services/AccountService';

const accountService = new AccountService();
const accountController = new AccountController(accountService);
const router = Router();

router
  .get(
    '/account',
    (
        req: Request,
        res: Response,
    ) => accountController.findAccount(req, res),
  );

export default router;