import { body } from "express-validator";
import { checkValidationErrorsMiddleware } from "./check-validation-errors-middleware";
import { io_container } from "../../composition-root/users-composition-root";
import { UsersRepository } from "../../repositories/mongo/users-repository";

const usersRepository = io_container.resolve(UsersRepository);

const codeParamValidator = body('code')
  .isString()
  .trim()
  .notEmpty()
  .custom(async (code, { req }) => {
    const user = await usersRepository.findUserByConfirmationCode(code);
    if (!user) {
      req.statusCode = 400;
      return Promise.reject('User with the given code does not exist');
    }
    if (user.registerConfirmation.isConfirmed) {
      req.statusCode = 400;
      return Promise.reject('Code already confirmed');
    }
  })
  .withMessage('User with the given code does not exist');

export const emailInputValidation = body("email")
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage("User email doesnt exist")
  .custom(
    async (email: string, { req }) => {
      const user = await usersRepository.findByLoginOrEmail(email);
      if (!user) {
        req.statusCode = 400;
        throw new Error("User with such email doesnt exist");
      }
      if (user.registerConfirmation.isConfirmed) {
        req.statusCode = 400;
        return Promise.reject('Code already confirmed');
      }
      return true;
    }
  );

export const passwordInputValidation = body("newPassword")
  .isString()
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage("password is not correct");

const recoveryCodeParamValidator = body('recoveryCode')
  .isString()
  .trim()
  .notEmpty()
  .custom(async (recoveryCode, { req }) => {
    const user = await usersRepository.findUserByConfirmationCode(recoveryCode);
    if (!user) {
      req.statusCode = 400;
      return Promise.reject('User with the given code does not exist');
    }
    if (user.registerConfirmation.isConfirmed) {
      req.statusCode = 400;
      return Promise.reject('Code already confirmed');
    }
  })
  .withMessage('User with the given code does not exist');

export const passwordRecoveryEmailInputValidation = body("email")
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage("Invalid email");

export const checkConfirmCodeValidators = [
  codeParamValidator,
  checkValidationErrorsMiddleware
]

export const resendEmailValidators = [
  emailInputValidation,
  checkValidationErrorsMiddleware
]

export const passwordRecoveryValidators = [
  passwordRecoveryEmailInputValidation,
  checkValidationErrorsMiddleware
]

export const newPasswordValidators = [
  recoveryCodeParamValidator,
  passwordInputValidation,
  checkValidationErrorsMiddleware
]