"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IResponse {
    constructor(message = null, data = null) {
        this.message = message,
            this.data = data;
    }
    success(res) {
        var _a;
        return res.status(200).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarılı",
        });
    }
    created(res) {
        var _a;
        return res.status(201).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarılı",
        });
    }
    error500(res) {
        var _a;
        return res.status(500).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız",
        });
    }
    error400(res) {
        var _a;
        return res.status(400).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız",
        });
    }
    error401(res) {
        var _a;
        return res.status(401).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız",
        });
    }
    error429(res) {
        var _a;
        return res.status(429).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Çok Fazla İstek Atıldı",
        });
    }
}
exports.default = IResponse;
