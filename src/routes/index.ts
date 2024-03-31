import express, {Router} from "express";
import authRoute  from "../routes/auth";
import upload from "../middlewares/lib/upload";
import multer from "multer";
import APIError from "../utils/error";
import IResponse from "../utils/response";


const router : Router = express.Router();

router.use("/auth",authRoute);

router.post("/upload", function (req: any, res: any) {
    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) 
            throw new APIError("Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ", 200);
        else if (err) 
            throw new APIError("Resim Yüklenirken Hata Çıktı : ", err)
        else return new IResponse("Yükleme Başarılı", req.savedImages).success(res);
    });
})

export default router;