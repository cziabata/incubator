import { body, param } from 'express-validator';
import { checkErrorsMiddleware } from '../global/check-errors-middleware';

const nameInputValidator = body('name')
  .isString().withMessage("Name must be a string")
  .trim()
  .notEmpty().withMessage("Name is required")
  .isLength({ max: 15 }).withMessage("Name should not exceed 15 characters");

const descriptionInputValidator = body('description')
  .isString().withMessage("Description must be a string")
  .trim()
  .notEmpty().withMessage("Description is required")
  .isLength({ max: 500 }).withMessage("Description should not exceed 500 characters");

const websiteUrlInputValidator = body('websiteUrl')
  .isString().withMessage("Website URL must be a string")
  .trim()
  .notEmpty().withMessage("Website URL is required")
  .isLength({ max: 100 }).withMessage("Website URL should not exceed 100 characters")
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage("Website URL must be a valid URL starting with https://");

  const idParamValidator = param('id')
  .isString()
  .trim()
  .notEmpty()
  .withMessage("ID should be a non-empty string");

export const createBlogValidators = [
  nameInputValidator,
  descriptionInputValidator,
  websiteUrlInputValidator,
  checkErrorsMiddleware
]

export const updateBlogValidators = [
  idParamValidator,
  nameInputValidator,
  descriptionInputValidator,
  websiteUrlInputValidator,
  checkErrorsMiddleware
]

export const checkIdBlogValidators = [
  idParamValidator,
  checkErrorsMiddleware
]