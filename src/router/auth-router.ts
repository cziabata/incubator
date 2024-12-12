import { Router } from "express";
import { loginUserValidators } from "../middlewares/validators/login-validators";
import { authMeController, registrationController, loginController, confirmRegistrationController } from "../controller/auth";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { confirmRegistrationValidators, createUserValidators } from "../middlewares/validators/user-validators";

export const authRouter = Router();

authRouter.post("/login", ...loginUserValidators, loginController);
authRouter.get("/me", accessTokenGuard, authMeController);
authRouter.post("/registration", ...createUserValidators, registrationController);
authRouter.post("/registration-confirmation", ...confirmRegistrationValidators, confirmRegistrationController);