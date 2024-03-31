import IAuth, { ItemporyToken } from "../types/AuthType"
import {Response} from "express";

export default class IResponse {
    message: string | null;
    data: IAuth | ItemporyToken| null 


    constructor( message: string | null = null, data: IAuth | null = null) {
        this.message = message,
        this.data = data
    }


    success(res: Response) {
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı",
        })
    }


    created(res: Response) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı",
        })
    }

    error500(res: Response) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız",
        })
    }

    
    error400(res: Response) {
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız",
        })
    }

    
    error401(res: Response) {
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız",
        })
    }

    error429(res: Response) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı",
        })
    }


}