"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = __importDefault(require("./schemas"));
const loginMiddleware = ((req, res, next) => {
    const login = req.body;
    const validation = schemas_1.default.loginSchema.validate(login);
    if (validation.error) {
        return res.status(400).json({ message: validation.error.message });
    }
    next();
});
exports.default = loginMiddleware;
