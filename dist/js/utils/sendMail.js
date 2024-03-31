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
const nodemailer_1 = __importDefault(require("nodemailer"));
const error_1 = __importDefault(require("./error"));
const sendEmail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = yield nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
            throw new error_1.default("Mail Gönderilemedi !", 400);
        }
        // console.log("info : ",info);
        return true;
    });
});
exports.default = sendEmail;
