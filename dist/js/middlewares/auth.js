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
exports.decodedTempraryToken = exports.createTemporaryToken = exports.checkToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../utils/error"));
const auth_1 = __importDefault(require("../models/auth"));
const createToken = (user, res) => {
    const payload = {
        sub: user._id,
        name: user.name
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || "", {
        algorithm: "HS512",
        expiresIn: process.env.DAY
    });
    return res.status(201).json({
        success: true,
        token,
        message: "Başarılı"
    });
};
exports.createToken = createToken;
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headertoken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
    if (!headertoken) {
        throw new error_1.default("Lütfen Oturum Açın", 401);
    }
    const token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw new error_1.default("Geçersiz Token", 401);
        }
        const userInfo = yield auth_1.default.findById(decoded.sub).select("_id name lastname email");
        if (!userInfo) {
            throw new error_1.default("Geçersiz Token", 401);
        }
        req.user = userInfo;
        next();
    }));
});
exports.checkToken = checkToken;
const createTemporaryToken = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        sub: userId,
        email
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_TEMPORY_TOKEN || "", {
        expiresIn: process.env.JWT_TEMPORY_TIME,
        algorithm: "HS512"
    });
    return "Bearer " + token;
});
exports.createTemporaryToken = createTemporaryToken;
const decodedTempraryToken = (temproryToken) => __awaiter(void 0, void 0, void 0, function* () {
    const token = temproryToken.split(" ")[1];
    let userInfo;
    yield jsonwebtoken_1.default.verify(token, process.env.JWT_TEMPORY_TOKEN || "", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw new error_1.default("token geçersiz", 401);
        }
        userInfo = yield auth_1.default.findById(decoded.sub);
        if (!userInfo) {
            throw new error_1.default("geçersiz token", 401);
        }
    }));
    return userInfo;
});
exports.decodedTempraryToken = decodedTempraryToken;
