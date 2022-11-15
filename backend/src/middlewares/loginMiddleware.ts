import { NextFunction, Request, Response } from 'express';
import schemas from './schemas';

const loginMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    const login = req.body;
    const validation = schemas.loginSchema.validate(login);
    if(validation.error) {
        return res.status(400).json({ message: validation.error.message });
    }
    next();
});

export default loginMiddleware;