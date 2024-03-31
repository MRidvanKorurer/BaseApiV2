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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../utils/error"));
const joi_1 = __importDefault(require("joi"));
class AuthValidation {
    constructor() { }
}
_a = AuthValidation;
AuthValidation.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield joi_1.default.object({
            name: joi_1.default.string().required().min(3).max(100).messages({
                "string.base": "İsim Alanı Normal Metin Olmalıdır",
                "string.empy": "İsim Alanı Normal Boş Geçilemez",
                "string.required": "İsim Alanı Zorunludur",
                "string.min": "İsim Alanı En Az 3 Karakterden Oluşmalıdır",
                "string.max": "İsim Alanı En Fazla 100 Karakterden Oluşmalıdır",
            }),
            lastname: joi_1.default.string().required().min(3).max(100).messages({
                "string.base": "Soy İsim Alanı Normal Metin Olmalıdır",
                "string.empy": "Soy İsim Alanı Normal Boş Geçilemez",
                "string.required": "Soy İsim Alanı Zorunludur",
                "string.min": "Soy İsim Alanı En Az 3 Karakterden Oluşmalıdır",
                "string.max": "Soy İsim Alanı En Fazla 100 Karakterden Oluşmalıdır",
            }),
            email: joi_1.default.string().email().required().min(3).max(100).messages({
                "string.base": "Email Alanı Normal Metin Olmalıdır",
                "string.empy": "Email Alanı Normal Boş Geçilemez",
                "string.required": "Email Alanı Zorunludur",
                "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
                "string.email": "Email Formatında Giriniz"
            }),
            password: joi_1.default.string().required().min(6).max(36).messages({
                "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                "string.empy": "Şifre Alanı Normal Boş Geçilemez",
                "string.required": "Şifre Alanı Zorunludur",
                "string.min": "Şifre Alanı En Az 6 Karakterden Oluşmalıdır",
                "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşmalıdır",
            }),
        }).validateAsync(req.body);
    }
    catch (error) {
        if (error.details && error.details[0].message) {
            throw new error_1.default(error.details[0].message, 400);
        }
        else {
            throw new error_1.default("Validasyon Hatası", 400);
        }
    }
    next();
});
AuthValidation.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield joi_1.default.object({
            email: joi_1.default.string().email().required().min(3).max(100).messages({
                "string.base": "Email Alanı Normal Metin Olmalıdır",
                "string.empy": "Email Alanı Normal Boş Geçilemez",
                "string.required": "Email Alanı Zorunludur",
                "string.email": "Email Formatında Giriniz",
                "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
            }),
            password: joi_1.default.string().required().min(3).max(100).messages({
                "string.base": "Email Alanı Normal Metin Olmalıdır",
                "string.empy": "Email Alanı Normal Boş Geçilemez",
                "string.required": "Email Alanı Zorunludur",
                "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
            }),
        }).validateAsync(req.body);
    }
    catch (error) {
        if (error.details && error.details[0].message) {
            throw new error_1.default(error.details[0].message, 400);
        }
        else {
            throw new error_1.default("Validasyon Hatası", 400);
        }
    }
    next();
});
exports.default = AuthValidation;
