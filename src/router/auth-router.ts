import { Router } from "express";
import { loginUserValidators } from "../middlewares/validators/login-validators";
import { authMeController, confirmRegistrationController, loginController } from "../controller/auth";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";

export const authRouter = Router();

authRouter.post("/login", ...loginUserValidators, loginController);
authRouter.get("/me", accessTokenGuard, authMeController);
authRouter.post("/registration", confirmRegistrationController);