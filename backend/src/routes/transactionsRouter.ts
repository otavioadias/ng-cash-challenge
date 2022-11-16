import { Request, Response, Router } from "express";
import TransactionsController from "../controllers/TransactionsController";
import TransactionsService from "../services/TransactionsService";
import AccountService from "../services/AccountService";

const accountService = new AccountService;
const transactionService = new TransactionsService(accountService);
const transactionController = new TransactionsController(transactionService);
const router = Router();

router
  .put(
    '/transactions',
    (
        req: Request,
        res: Response,
    ) => transactionController.transaction(req, res)
  );


export { router as transactionsRouter };
