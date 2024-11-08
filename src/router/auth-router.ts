import { Router } from "express";
import { loginUserValidators } from "../middlewares/validators/login-validators";
import { loginController } from "../controller/auth";

export const authRouter = Router();

authRouter.post("/login", ...loginUserValidators, loginController);