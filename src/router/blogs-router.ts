import { Router } from "express";
import { 
  createBlogController, 
  deleteBlogController, 
  getBlogByIdController, 
  getBlogsController, 
  updateBlogController 
} from "../controller/blogs";
import { authMiddleware } from "../middlewares/global/auth-middleware";
import { checkIdBlogValidators, createBlogValidators, updateBlogValidators } from "../middlewares/validators/blog-balidators";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", ...checkIdBlogValidators, getBlogByIdController);
blogsRouter.post("/", authMiddleware, ...createBlogValidators, createBlogController);
blogsRouter.put("/:id", authMiddleware, ...updateBlogValidators, updateBlogController);
blogsRouter.delete("/:id", authMiddleware, ...checkIdBlogValidators, deleteBlogController);