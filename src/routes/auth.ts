import express, {Router} from "express";
import {fargotPassword, login, me, register, resetCodeCheck, resetPassword} from "../controllers/auth";
import AuthValidation from "../middlewares/validations/authValidation";
import {checkToken} from "../middlewares/auth";

const router : Router = express.Router();

router.post("/register", AuthValidation.register, register);

router.post("/login",AuthValidation.login, login);

router.get("/me", checkToken, me);

router.post("/fargotPassword", fargotPassword);

router.post("/resetCodeCheck", resetCodeCheck);

router.post("/resetPassword", resetPassword)

export default router;