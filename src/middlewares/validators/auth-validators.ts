import { body } from "express-validator";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { checkValidationErrorsMiddleware } from "./check-validation-errors-middleware";

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
    async (email: string) => {
      const user = await usersRepository.findByLoginOrEmail(email);
      if (!user) {
        throw new Error("User with such email doesnt exist");
      }
      return true;
    }
  );

export const checkConfirmCodeValidators = [
  codeParamValidator,
  checkValidationErrorsMiddleware
]