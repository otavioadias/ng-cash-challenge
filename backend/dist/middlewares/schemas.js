"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(3).messages({
        'string-empty': '"username" is required',
        'string-min': '"username" length must be at least 3 characters long',
    }),
    password: joi_1.default.string().required().min(8).messages({
        'string-empty': '"password" is required',
        'string-min': '"password" length must be at least 8 characters long',
    }),
});
exports.default = {
    loginSchema,
};
