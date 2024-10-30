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
import { authMiddleware } from "../middlewares/global/auth-middleware";
import { checkIdBlogValidators, createBlogValidators, updateBlogValidators } from "../middlewares/validators/blog-balidators";
import { createPostForBlogValidators } from "../middlewares/validators/post-validators";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", ...checkIdBlogValidators, getBlogByIdController);
blogsRouter.post("/", authMiddleware, ...createBlogValidators, createBlogController);
blogsRouter.put("/:id", authMiddleware, ...updateBlogValidators, updateBlogController);
blogsRouter.delete("/:id", authMiddleware, ...checkIdBlogValidators, deleteBlogController);

blogsRouter.get("/:id/posts", ...checkIdBlogValidators, getBlogPostsController);
blogsRouter.post("/:id/posts", ...createPostForBlogValidators, createPostForBlogController);