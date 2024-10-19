import { Router } from "express";
import { 
  createPostController, 
  deletePostController, 
  getPostByIdController, 
  getPostsController, 
  updatePostController 
} from "../controller/posts";
import { authMiddleware } from "../middlewares/global/auth-middleware";
import { checkIdPostValidators, createPostValidators, updatePostValidators } from "../middlewares/validators/post-validators";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", ...checkIdPostValidators, getPostByIdController);
postsRouter.post("/", authMiddleware, ...createPostValidators, createPostController);
postsRouter.put("/:id", authMiddleware, ...updatePostValidators, updatePostController);
postsRouter.delete("/:id", authMiddleware, ...checkIdPostValidators, deletePostController);