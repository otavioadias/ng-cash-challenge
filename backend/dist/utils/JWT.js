"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';
const jwtConfig = {
    expiresIn: '24h',
    algorithm: 'HS256',
};
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () { return jwt.sign(payload, JWT_SECRET, jwtConfig); });
exports.default = generateToken;
