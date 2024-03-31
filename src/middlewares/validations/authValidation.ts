import APIError from "../../utils/error";
import {NextFunction, Request, Response} from "express";
import Joi from "joi";


export default class AuthValidation {
    constructor() {}

    static register = async (req: Request, res:Response, next:NextFunction) => {    
        try {
            await Joi.object({
                name: Joi.string().required().min(3).max(100).messages({
                    "string.base": "İsim Alanı Normal Metin Olmalıdır",
                    "string.empy": "İsim Alanı Normal Boş Geçilemez",
                    "string.required": "İsim Alanı Zorunludur",
                    "string.min": "İsim Alanı En Az 3 Karakterden Oluşmalıdır",
                    "string.max": "İsim Alanı En Fazla 100 Karakterden Oluşmalıdır",
                }),
                lastname: Joi.string().required().min(3).max(100).messages({
                    "string.base": "Soy İsim Alanı Normal Metin Olmalıdır",
                    "string.empy": "Soy İsim Alanı Normal Boş Geçilemez",
                    "string.required": "Soy İsim Alanı Zorunludur",
                    "string.min": "Soy İsim Alanı En Az 3 Karakterden Oluşmalıdır",
                    "string.max": "Soy İsim Alanı En Fazla 100 Karakterden Oluşmalıdır",
                }),
                email: Joi.string().email().required().min(3).max(100).messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empy": "Email Alanı Normal Boş Geçilemez",
                    "string.required": "Email Alanı Zorunludur",
                    "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
                    "string.email" : "Email Formatında Giriniz"
                }),
                password: Joi.string().required().min(6).max(36).messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empy": "Şifre Alanı Normal Boş Geçilemez",
                    "string.required": "Şifre Alanı Zorunludur",
                    "string.min": "Şifre Alanı En Az 6 Karakterden Oluşmalıdır",
                    "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşmalıdır",
                }),
            }).validateAsync(req.body);
        } catch (error: any) {
            if(error.details && error.details[0].message) {
                throw new APIError(error.details[0].message, 400)
            }else{
                throw new APIError("Validasyon Hatası", 400);
            }
        }

        next();
    }

    static login = async (req: Request, res:Response, next:NextFunction) =>  {
        try {
            await Joi.object({
                email: Joi.string().email().required().min(3).max(100).messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empy": "Email Alanı Normal Boş Geçilemez",
                    "string.required": "Email Alanı Zorunludur",
                    "string.email": "Email Formatında Giriniz",
                    "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
                }),
                password: Joi.string().required().min(3).max(100).messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empy": "Email Alanı Normal Boş Geçilemez",
                    "string.required": "Email Alanı Zorunludur",
                    "string.min": "Email Alanı En Az 3 Karakterden Oluşmalıdır",
                    "string.max": "Email Alanı En Fazla 100 Karakterden Oluşmalıdır",
                }),
            }).validateAsync(req.body);
        } catch (error: any) {
            if(error.details && error.details[0].message) {
                throw new APIError(error.details[0].message, 400)
            }else{
                throw new APIError("Validasyon Hatası", 400);
            }
        }

        next();
    }
}


