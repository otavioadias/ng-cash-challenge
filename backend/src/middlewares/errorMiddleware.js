"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, _next) => {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
};
exports.default = errorMiddleware;
