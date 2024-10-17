import { body, param } from 'express-validator';
import { checkErrorsMiddleware } from '../global/check-errors-middleware';

const titleInputValidator = body('title')
  .isString()
  .trim()
  .isLength({ min: 3, max: 30 })
  .withMessage("Length should be from 3 to 30 symbols");

const idParamValidator = param('id')
  .isInt({ gt: 0 })
  .withMessage("ID should be a positive integer");

export const createProductValidators = [
  titleInputValidator,
  checkErrorsMiddleware
]

export const updateProductValidators = [
  idParamValidator,
  titleInputValidator,
  checkErrorsMiddleware
]

export const checkIdProductValidators = [
  idParamValidator,
  checkErrorsMiddleware
]