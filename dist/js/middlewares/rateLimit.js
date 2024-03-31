"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const allowList = ["::1"];
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: (req, res) => {
        if (req.url === "/auth/login" || req.url === "/auth/register")
            return 5;
        else
            return 100;
    },
    message: {
        success: false,
        message: "Çok fazla istekte bulundunuz!"
    },
    skip: (req, res) => allowList.includes(req.ip),
    standardHeaders: true,
    legacyHeaders: false
});
exports.default = apiLimiter;
