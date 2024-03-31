"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor(message, statusCode) {
        super(message),
            this.statusCode = statusCode || 400;
    }
}
exports.default = APIError;
