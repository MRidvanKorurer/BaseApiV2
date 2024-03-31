"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    reset: {
        code: {
            type: String,
            default: null
        },
        time: {
            type: String,
            default: null
        }
    }
});
exports.default = mongoose_1.default.model("Auth", authSchema);
