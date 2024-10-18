import { Router } from "express";
import { 
  createPostController, 
  deletePostController, 
  getPostByIdController, 
  getPostsController, 
  updatePostController 
} from "../controller/posts";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", getPostByIdController);
postsRouter.post("/", createPostController);
postsRouter.put("/:id", updatePostController);
postsRouter.delete("/:id", deletePostController);