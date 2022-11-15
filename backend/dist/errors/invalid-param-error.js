"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidParamError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.default = InvalidParamError;
