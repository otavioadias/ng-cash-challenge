import { Request, Response, Router } from "express";
import TransactionsController from "../controllers/TransactionsController";
import TransactionsService from "../services/TransactionsService";
import AccountService from "../services/AccountService";

const accountService = new AccountService;
const transactionService = new TransactionsService(accountService);
const transactionController = new TransactionsController(transactionService);
const router = Router();

router
.get(
  '/transactions',
  (
      req: Request,
      res: Response,
  ) => transactionController.viewTransaction(req, res)
);

router
.get(
  '/transactions/credited',
  (
      req: Request,
      res: Response,
  ) => transactionController.creditedTransaction(req, res)
);

router
.get(
  '/transactions/debited',
  (
      req: Request,
      res: Response,
  ) => transactionController.debitedTransaction(req, res)
);

router
  .put(
    '/transactions',
    (
        req: Request,
        res: Response,
    ) => transactionController.transaction(req, res)
  );



export { router as transactionsRouter };
