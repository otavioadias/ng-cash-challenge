import 'express-async-errors';
import express from 'express';
import userRouter from './routes/userRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import accountRouter from './routes/accountRouter';
import { transactionsRouter } from './routes/transactionsRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use(userRouter);
    this.app.use(accountRouter);
    this.app.use(transactionsRouter);
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();