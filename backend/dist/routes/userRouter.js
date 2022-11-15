"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const userService = new UserService_1.default();
const userController = new UserController_1.default(userService);
const router = (0, express_1.Router)();
router
    .post('/registration', (req, res) => userController.newUser(req, res));
router
    .post('/login', (req, res) => userController.login(req, res));
exports.default = router;
