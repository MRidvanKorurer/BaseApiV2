import mongoose from "mongoose";
import IAuth from "../types/AuthType";



const authSchema : mongoose.Schema = new mongoose.Schema({
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
   
})

export default mongoose.model<IAuth>("Auth", authSchema);