"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../routes/auth"));
const upload_1 = __importDefault(require("../middlewares/lib/upload"));
const multer_1 = __importDefault(require("multer"));
const error_1 = __importDefault(require("../utils/error"));
const response_1 = __importDefault(require("../utils/response"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.post("/upload", function (req, res) {
    (0, upload_1.default)(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError)
            throw new error_1.default("Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ", 200);
        else if (err)
            throw new error_1.default("Resim Yüklenirken Hata Çıktı : ", err);
        else
            return new response_1.default("Yükleme Başarılı", req.savedImages).success(res);
    });
});
exports.default = router;
