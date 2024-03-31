"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authValidation_1 = __importDefault(require("../middlewares/validations/authValidation"));
const auth_2 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", authValidation_1.default.register, auth_1.register);
router.post("/login", authValidation_1.default.login, auth_1.login);
router.get("/me", auth_2.checkToken, auth_1.me);
router.post("/fargotPassword", auth_1.fargotPassword);
router.post("/resetCodeCheck", auth_1.resetCodeCheck);
router.post("/resetPassword", auth_1.resetPassword);
exports.default = router;
