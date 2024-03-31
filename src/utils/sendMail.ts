import nodemailer from "nodemailer";
import APIError from "./error";



const sendEmail = async (mailOptions:any) => {
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
            throw new APIError("Mail Gönderilemedi !", 400);
        }
        // console.log("info : ",info);
        return true
    })
}

export default sendEmail;