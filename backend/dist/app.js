"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const loginMiddleware_1 = __importDefault(require("./middlewares/loginMiddleware"));
const accountRouter_1 = __importDefault(require("./routes/accountRouter"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        // Não remover essa rota
        this.app.get('/', (_req, res) => res.json({ ok: true }));
        this.app.use(accountRouter_1.default);
        this.app.use(loginMiddleware_1.default, userRouter_1.default);
        this.app.use(errorMiddleware_1.default);
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express_1.default.json());
        this.app.use(accessControl);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
