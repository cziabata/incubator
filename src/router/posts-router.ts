import { Router } from "express";
import { 
  createPostController, 
  deletePostController, 
  getPostByIdController, 
  getPostsController, 
  updatePostController 
} from "../controller/posts";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";
import { checkIdPostValidators, createPostValidators, updatePostValidators } from "../middlewares/validators/post-validators";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", ...checkIdPostValidators, getPostByIdController);
postsRouter.post("/", basicAuthGuard, ...createPostValidators, createPostController);
postsRouter.put("/:id", basicAuthGuard, ...updatePostValidators, updatePostController);
postsRouter.delete("/:id", basicAuthGuard, ...checkIdPostValidators, deletePostController);