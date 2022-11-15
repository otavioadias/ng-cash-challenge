"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserExists extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
exports.default = UserExists;
