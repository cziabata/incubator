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
  passwordRecoveryController,
} from "../controller/auth";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { createUserValidators } from "../middlewares/validators/user-validators";
import { checkConfirmCodeValidators, passwordRecoveryValidators, resendEmailValidators } from "../middlewares/validators/auth-validators";
import { refreshTokenGuard } from "../middlewares/guards/refresh.token.guard";
import { apiAttemptsGuard } from "../middlewares/guards/api.attempts.guard";

export const authRouter = Router();

authRouter.post("/login", apiAttemptsGuard, ...loginUserValidators, loginController);
authRouter.get("/me", accessTokenGuard, authMeController);
authRouter.post("/registration", apiAttemptsGuard, ...createUserValidators, registrationController);
authRouter.post("/registration-confirmation", apiAttemptsGuard, ...checkConfirmCodeValidators, confirmRegistrationController);
authRouter.post("/registration-email-resending", apiAttemptsGuard, ...resendEmailValidators, emailResendingController);
authRouter.post("/refresh-token", refreshTokenGuard, refreshTokenController);
authRouter.post("/logout", refreshTokenGuard, logoutController);

authRouter.post("/password-recovery", apiAttemptsGuard, ...passwordRecoveryValidators, passwordRecoveryController);