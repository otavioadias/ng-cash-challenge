import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserService from '../services/UserService';

const userService = new UserService();
const userController = new UserController(userService);
const router = Router();

router
  .post(
    '/registration',
    loginMiddleware,
    (
        req: Request,
        res: Response,
    ) => userController.newUser(req, res),
  );

  router
  .post(
    '/login',
    loginMiddleware,
    (
        req: Request,
        res: Response,
    ) => userController.login(req, res),
  );

export default router;