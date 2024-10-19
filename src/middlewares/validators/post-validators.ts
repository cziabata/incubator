import { body, param } from 'express-validator';
import { checkErrorsMiddleware } from '../global/check-errors-middleware';

const titleInputValidator = body('title')
  .isString().withMessage("Title must be a string")
  .trim()
  .notEmpty().withMessage("Title is required")
  .isLength({ max: 30 }).withMessage("Title should not exceed 30 characters");

const shortDescriptionInputValidator = body('shortDescription')
  .isString().withMessage("Description must be a string")
  .trim()
  .notEmpty().withMessage("Description is required")
  .isLength({ max: 100 }).withMessage("Description should not exceed 100 characters");

const contentInputValidator = body('content')
  .isString().withMessage("Content must be a string")
  .trim()
  .notEmpty().withMessage("Content is required")
  .isLength({ max: 1000 }).withMessage("Content should not exceed 1000 characters");

const blogIdInputValidator = body('blogId')
  .isString().withMessage("Blog Id must be a string")
  .trim()
  .notEmpty().withMessage("Description is required")

const idParamValidator = param('id')
  .isInt({ gt: 0 })
  .withMessage("ID should be a positive integer");

export const createPostValidators = [
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdInputValidator,
  checkErrorsMiddleware
]

export const updatePostValidators = [
  idParamValidator,
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdInputValidator,
  checkErrorsMiddleware
]

export const checkIdPostValidators = [
  idParamValidator,
  checkErrorsMiddleware
]