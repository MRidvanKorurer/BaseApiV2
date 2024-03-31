import APIError from "../utils/error";
import {Request, Response, NextFunction} from "express";


const errorHandlerMiddleware = async (err:Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIError) {
         return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message
         })    
    }

    next();

    return res.status(500).json({
        success: false,
        message: "Bir hata ile karşılaştık lütfen apinizi kontrol ediniz"
    })

}



export default errorHandlerMiddleware;