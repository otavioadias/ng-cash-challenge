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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Users_1 = __importDefault(require("../database/models/Users"));
const Accounts_1 = __importDefault(require("../database/models/Accounts"));
const JWT_1 = __importDefault(require("../utils/JWT"));
const invalid_param_error_1 = __importDefault(require("../errors/invalid-param-error"));
const missing_param_error_1 = __importDefault(require("../errors/missing-param-error"));
const user_exist_1 = __importDefault(require("../errors/user-exist"));
class UserService {
    static hashPassword(password) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        return hash;
    }
    static generateTokenUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield (0, JWT_1.default)({ username: user.username });
            return token;
        });
    }
    static findUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userExist] = yield Users_1.default.findAll({ where: { username: user.username } });
            return userExist;
        });
    }
    newUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHashed = UserService.hashPassword(user.password);
            const verifyUser = yield UserService.findUser(user);
            if (!verifyUser) {
                const accountId = yield Accounts_1.default.create({
                    balance: 100
                });
                const newUser = yield Users_1.default.create({
                    username: user.username,
                    password: passwordHashed,
                    accountId: accountId.id,
                });
                const token = yield UserService.generateTokenUser(user);
                return { token };
            }
            throw new user_exist_1.default('User already exist');
        });
    }
    static decodePassword(password, passwordDB) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bcrypt.compare(password, passwordDB);
            if (result === false) {
                throw new invalid_param_error_1.default('Incorrect email or password');
            }
            return result;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.username || !user.password) {
                throw new missing_param_error_1.default('All fields must be filled');
            }
            const verifyUser = yield UserService.findUser(user);
            if (!verifyUser) {
                throw new invalid_param_error_1.default('Incorrect email or password');
            }
            const decode = yield UserService.decodePassword(user.password, verifyUser.password);
            const token = yield UserService.generateTokenUser(user);
            return { token };
        });
    }
}
exports.default = UserService;
