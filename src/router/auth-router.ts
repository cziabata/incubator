import { Router } from "express";
import { loginUserValidators } from "../middlewares/validators/login-validators";
import { 
  authMeController, 
  registrationController, 
  loginController, 
  confirmRegistrationController, 
  emailResendingController,
  refreshTokenController,
  logoutController,
} from "../controller/auth";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { createUserValidators } from "../middlewares/validators/user-validators";
import { checkConfirmCodeValidators, resendEmailValidators } from "../middlewares/validators/auth-validators";
import { refreshTokenGuard } from "../middlewares/guards/refresh.token.guard";

export const authRouter = Router();

authRouter.post("/login", ...loginUserValidators, loginController);
authRouter.get("/me", accessTokenGuard, authMeController);
authRouter.post("/registration", ...createUserValidators, registrationController);
authRouter.post("/registration-confirmation", ...checkConfirmCodeValidators, confirmRegistrationController);
authRouter.post("/registration-email-resending", ...resendEmailValidators, emailResendingController);
authRouter.post("/refresh-token", refreshTokenGuard, refreshTokenController);
authRouter.post("/logout", refreshTokenGuard, logoutController);