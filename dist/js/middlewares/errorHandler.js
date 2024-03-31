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
const error_1 = __importDefault(require("../utils/error"));
const errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof error_1.default) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message
        });
    }
    next();
    return res.status(500).json({
        success: false,
        message: "Bir hata ile karşılaştık lütfen apinizi kontrol ediniz"
    });
});
exports.default = errorHandlerMiddleware;
