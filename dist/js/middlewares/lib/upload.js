"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error('Bu Resim Tipi Desteklenmemektedir. Lütfen Farklı Bir Resim Seçiniz !'), false);
    }
    else {
        cb(null, true);
    }
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        var _a;
        const rootDir = path_1.default.dirname(((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) || '');
        const destinationPath = path_1.default.join(rootDir, '/public/uploads');
        if (!fs_1.default.existsSync(destinationPath)) {
            fs_1.default.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        if (!req.savedImages)
            req.savedImages = [];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const url = `image_${uniqueSuffix}.${extension}`;
        req.savedImages = [...req.savedImages, url];
        cb(null, url);
    }
});
const upload = (0, multer_1.default)({ storage, fileFilter }).array('images');
exports.default = upload;
