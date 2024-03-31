import {NextFunction, Response} from "express";
import IAuth, { ItemporyToken } from "../types/AuthType";
import jwt, { decode } from "jsonwebtoken";
import APIError from "../utils/error";
import Auth from "../models/auth";

export const createToken = (user: IAuth, res: Response) => {
    const payload = {
        sub: user._id,
        name: user.name
    }

    const token = jwt.sign(payload, process.env.JWT_KEY || "", {
        algorithm: "HS512",
        expiresIn: process.env.DAY
    });

    return res.status(201).json({
        success: true,
        token,
        message: "Başarılı"
    })
}


export const checkToken = async (req: any | Request, res: Response, next: NextFunction) => {
    const headertoken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

    if(!headertoken) {
        throw new APIError("Lütfen Oturum Açın", 401);
    }

    const token : string = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY || "", async ( err: any, decoded: any) => {
        if(err){
          throw new APIError("Geçersiz Token", 401);
        }

        const userInfo : IAuth = await Auth.findById(decoded.sub).select("_id name lastname email");

        if(!userInfo) {
          throw new APIError("Geçersiz Token", 401);
        }

        req.user = userInfo as Pick<IAuth, "_id" | "name" | "lastname" | "email">;
        next();
    })
}

export const createTemporaryToken =async (userId: string, email: string) : Promise<string> =>{
    const payload={
        sub:userId,
        email
    }

    const token: string = jwt.sign(payload, process.env.JWT_TEMPORY_TOKEN || "",{
        expiresIn : process.env.JWT_TEMPORY_TIME,
        algorithm:"HS512"
    })

    return "Bearer " + token
}

export const decodedTempraryToken = async(temproryToken:any)=>{
    const token = temproryToken.split(" ")[1]
    let userInfo
    await jwt.verify(token, process.env.JWT_TEMPORY_TOKEN || "" ,async(err:any, decoded:any)=>{
        if(err){
            throw new APIError("token geçersiz",401)
        }
        userInfo = await Auth.findById(decoded.sub)
        if(!userInfo){
            throw new APIError("geçersiz token",401)
        }
    })
    return userInfo;
}
