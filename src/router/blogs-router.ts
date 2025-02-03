import { Router } from "express";
import { 
  createBlogController, 
  deleteBlogController, 
  getBlogByIdController, 
  getBlogsController, 
  updateBlogController,
  getBlogPostsController,
  createPostForBlogController 
} from "../controller/blogs";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";
import { checkIdBlogValidators, createBlogValidators, updateBlogValidators } from "../middlewares/validators/blog-balidators";
import { createPostForBlogValidators } from "../middlewares/validators/post-validators";
import { accessTokenOptionalGuard } from "../middlewares/guards/access.token.optional.guard";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", ...checkIdBlogValidators, getBlogByIdController);
blogsRouter.post("/", basicAuthGuard, ...createBlogValidators, createBlogController);
blogsRouter.put("/:id", basicAuthGuard, ...updateBlogValidators, updateBlogController);
blogsRouter.delete("/:id", basicAuthGuard, ...checkIdBlogValidators, deleteBlogController);

blogsRouter.get("/:id/posts", accessTokenOptionalGuard, ...checkIdBlogValidators, getBlogPostsController);
blogsRouter.post("/:id/posts", basicAuthGuard, ...createPostForBlogValidators, createPostForBlogController);