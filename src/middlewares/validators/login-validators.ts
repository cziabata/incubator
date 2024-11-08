import { body } from "express-validator";
import { passwordInputValidation } from "./user-validators";
import { checkErrorsMiddleware } from "../global/check-errors-middleware";

export const loginOrEmailValidation = body("loginOrEmail")
  .isString()
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage("loginOrEmail is not correct");

export const loginUserValidators = [
  loginOrEmailValidation,
  passwordInputValidation,
  checkErrorsMiddleware
]