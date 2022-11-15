"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const accountService = new AccountService_1.default();
const accountController = new AccountController_1.default(accountService);
const router = (0, express_1.Router)();
router
    .get('/account', (req, res) => accountController.findAccount(req, res));
exports.default = router;
