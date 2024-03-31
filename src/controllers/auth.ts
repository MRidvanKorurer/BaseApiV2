import {Request, Response} from "express";
import Auth from "../models/auth";
import IAuth, { ItemporyToken } from "../types/AuthType";
import bcrypt from "bcrypt";
import APIError from "../utils/error";
import IResponse from "../utils/response";
import { createTemporaryToken, createToken, decodedTempraryToken } from "../middlewares/auth";
import crypto from "crypto";
import moment from "moment";
import sendEmail from "../utils/sendMail";


export const login = async (req: Request, res: Response) : Promise<any> => {
    const {email, password} = req.body as Pick<IAuth, "email" | "password">;

    const user : IAuth | null = await Auth.findOne({email});

    if(!user) {
        throw new APIError("Email yada parola hatalı", 400);
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    
    if(!comparePassword) {
        throw new APIError("Email yada parola hatalı", 400);
    }
    
    createToken(user, res);

    // return new IResponse("Giriş işlemi başarılı", user).success(res);
}




export const register = async (req: Request, res: Response) : Promise<any>  => {

    const checkUser : IAuth | null  = await Auth.findOne({email: req.body.email});

    if(checkUser) {
        throw new APIError("Email adresi zaten kayıtlı", 400);
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

        const user : IAuth = new Auth(req.body);
        await user.save()
            .then((results) => {
                return new IResponse(null ,results).created(res)
                })
            .catch((err) => {
                 throw new APIError("Kullanıcı kayıt edilemedi", 400);
            })
}



export const me = async (req:any, res: Response) => {
    return new IResponse(null,req.user).success(res);
}



export const fargotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;

    const userInfo = await Auth.findOne({email}).select(" name lastname email " );

    if(!userInfo) {
        throw new APIError("Geçersiz Kullanıcı", 400);
    }

    const resetCode = crypto.randomBytes(3).toString("hex");

      await sendEmail({
            from: "m.ridvankorurer@gmail.com",
            to: userInfo.email,
            subject: "Şifre Sıfırlama",
            text: `Şifre Sıfırlama Kodunuz ${resetCode}`
       })


        userInfo.reset = {
            code: resetCode,
            time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
        };
        await userInfo.save();


    return new IResponse("Lütfen Mail Kutunuzu Kontrol Ediniz", userInfo).success(res);
}


export const resetCodeCheck = async(req:Request,res:Response)=>{
    const {email, code} = req.body

    const user = await Auth.findOne({
        email,
    })

    if(!user){
        throw new APIError("email bulunamadı", 404)
    }

    const dbTime:any = (user.reset.time)
    const nowTime:any = moment(new Date())

    const timeDiff = dbTime.diff(nowTime) 

    if(timeDiff <= 0 || user.reset.code !== code){
        throw new APIError("süreniz doldu", 401)
    }

    const temporyToken: any= createTemporaryToken(
        user._id,
        user.email
    )


    return res.status(200).json({
        temporyToken,

    })
}


export const resetPassword =async (req:Request, res:Response)=>{
    const {password, temporyToken} = req.body;

    const decodedToken:any = await decodedTempraryToken(temporyToken)

    const hashPassword = await bcrypt.hash(password, 10)

    await Auth.findByIdAndUpdate(
        {_id: decodedToken._id},
        {
            reset:{
                code:null,
                time:null
        },
            password:hashPassword
        }
    )

    return new IResponse("şifre sıfırlama başarılı", decodedToken).success(res)
}