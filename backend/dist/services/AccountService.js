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
const Accounts_1 = __importDefault(require("../database/models/Accounts"));
const Users_1 = __importDefault(require("../database/models/Users"));
const JWTDecode_1 = __importDefault(require("../utils/JWTDecode"));
const JWTVerify_1 = __importDefault(require("../utils/JWTVerify"));
class AccountService {
    visualizerAccount(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyToken = yield (0, JWTVerify_1.default)(token);
            if (verifyToken) {
                const payload = yield (0, JWTDecode_1.default)(token);
                const [user] = yield Users_1.default.findAll({ where: { username: payload.username } });
                const accountUser = Accounts_1.default.findAll({ where: { id: user.accountId } });
                return accountUser;
            }
        });
    }
}
exports.default = AccountService;
