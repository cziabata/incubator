import { Router } from "express";
import { loginUserValidators } from "../middlewares/validators/login-validators";
import { 
  authMeController, 
  registrationController, 
  loginController, 
  confirmRegistrationController, 
  emailResendingController,
} from "../controller/auth";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { createUserValidators } from "../middlewares/validators/user-validators";
import { checkConfirmCodeValidators, resendEmailValidators } from "../middlewares/validators/auth-validators";

export const authRouter = Router();

authRouter.post("/login", ...loginUserValidators, loginController);
authRouter.get("/me", accessTokenGuard, authMeController);
authRouter.post("/registration", ...createUserValidators, registrationController);
authRouter.post("/registration-confirmation", ...checkConfirmCodeValidators, confirmRegistrationController);
authRouter.post("/registration-email-resending", ...resendEmailValidators, emailResendingController);