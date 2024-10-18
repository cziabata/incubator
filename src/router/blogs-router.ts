import { Router } from "express";
import { 
  createBlogController, 
  deleteBlogController, 
  getBlogByIdController, 
  getBlogsController, 
  updateBlogController 
} from "../controller/blogs";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", getBlogByIdController);
blogsRouter.post("/", createBlogController);
blogsRouter.put("/:id", updateBlogController);
blogsRouter.delete("/:id", deleteBlogController);