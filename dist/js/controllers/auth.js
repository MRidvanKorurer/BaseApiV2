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
exports.resetPassword = exports.resetCodeCheck = exports.fargotPassword = exports.me = exports.register = exports.login = void 0;
const auth_1 = __importDefault(require("../models/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../utils/error"));
const response_1 = __importDefault(require("../utils/response"));
const auth_2 = require("../middlewares/auth");
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield auth_1.default.findOne({ email });
    if (!user) {
        throw new error_1.default("Email yada parola hatalı", 400);
    }
    const comparePassword = yield bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw new error_1.default("Email yada parola hatalı", 400);
    }
    (0, auth_2.createToken)(user, res);
    // return new IResponse("Giriş işlemi başarılı", user).success(res);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield auth_1.default.findOne({ email: req.body.email });
    if (checkUser) {
        throw new error_1.default("Email adresi zaten kayıtlı", 400);
    }
    req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
    const user = new auth_1.default(req.body);
    yield user.save()
        .then((results) => {
        return new response_1.default(null, results).created(res);
    })
        .catch((err) => {
        throw new error_1.default("Kullanıcı kayıt edilemedi", 400);
    });
});
exports.register = register;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new response_1.default(null, req.user).success(res);
});
exports.me = me;
const fargotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userInfo = yield auth_1.default.findOne({ email }).select(" name lastname email ");
    if (!userInfo) {
        throw new error_1.default("Geçersiz Kullanıcı", 400);
    }
    const resetCode = crypto_1.default.randomBytes(3).toString("hex");
    yield (0, sendMail_1.default)({
        from: "m.ridvankorurer@gmail.com",
        to: userInfo.email,
        subject: "Şifre Sıfırlama",
        text: `Şifre Sıfırlama Kodunuz ${resetCode}`
    });
    userInfo.reset = {
        code: resetCode,
        time: (0, moment_1.default)(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
    };
    yield userInfo.save();
    return new response_1.default("Lütfen Mail Kutunuzu Kontrol Ediniz", userInfo).success(res);
});
exports.fargotPassword = fargotPassword;
const resetCodeCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    const user = yield auth_1.default.findOne({
        email,
    });
    if (!user) {
        throw new error_1.default("email bulunamadı", 404);
    }
    const dbTime = (user.reset.time);
    const nowTime = (0, moment_1.default)(new Date());
    const timeDiff = dbTime.diff(nowTime);
    if (timeDiff <= 0 || user.reset.code !== code) {
        throw new error_1.default("süreniz doldu", 401);
    }
    const temporyToken = (0, auth_2.createTemporaryToken)(user._id, user.email);
    return res.status(200).json({
        temporyToken,
    });
});
exports.resetCodeCheck = resetCodeCheck;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, temporyToken } = req.body;
    const decodedToken = yield (0, auth_2.decodedTempraryToken)(temporyToken);
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    yield auth_1.default.findByIdAndUpdate({ _id: decodedToken._id }, {
        reset: {
            code: null,
            time: null
        },
        password: hashPassword
    });
    return new response_1.default("şifre sıfırlama başarılı", decodedToken).success(res);
});
exports.resetPassword = resetPassword;
