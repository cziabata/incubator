import { body } from 'express-validator';
import { checkValidationErrorsMiddleware } from './check-validation-errors-middleware';

export const commentInputValidation = body("content")
  .isString()
  .trim()
  .isLength({ min: 20, max: 300 })
  .withMessage("Incorrect comment content");

export const likeStatusValidation = body("likeStatus")
  .isString()
  .trim()
  .isIn(["Like", "Dislike", "None"])
  .withMessage("Invalid like status. Allowed values: 'Like', 'Dislike', 'None'.");

export const inputCommentValidators = [
  commentInputValidation,
  checkValidationErrorsMiddleware
]

export const iLikeStatusValidationValidators = [
  likeStatusValidation,
  checkValidationErrorsMiddleware
]