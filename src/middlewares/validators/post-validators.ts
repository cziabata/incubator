import { body, param } from 'express-validator';
import { checkErrorsMiddleware } from '../global/check-errors-middleware';
import { blogsRepository } from '../../repositories/mongo/blogs-repository';

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

  export const blogIdValidator = body('blogId').isString().withMessage('not string')
  .trim().custom(async blogId => {
      const blog = await blogsRepository.getBlogById(blogId)
      return !!blog
  }).withMessage('no blog')

  const idParamValidator = param('id')
  .isString()
  .trim()
  .notEmpty()
  .withMessage("ID should be a non-empty string");

export const createPostValidators = [
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdValidator,
  checkErrorsMiddleware
]

export const updatePostValidators = [
  idParamValidator,
  titleInputValidator,
  shortDescriptionInputValidator,
  contentInputValidator,
  blogIdValidator,
  checkErrorsMiddleware
]

export const checkIdPostValidators = [
  idParamValidator,
  checkErrorsMiddleware
]