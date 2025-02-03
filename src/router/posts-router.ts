import { Router } from "express";
import { 
  createPostCommentController,
  createPostController, 
  deletePostController, 
  getPostByIdController,  
  getPostCommentsController, 
  getPostsController, 
  updatePostController, 
  updatePostLikeController
} from "../controller/posts";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";
import { checkIdPostValidators, createPostValidators, likeStatusValidators, updatePostValidators } from "../middlewares/validators/post-validators";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { inputCommentValidators } from "../middlewares/validators/comments-validators";
import { accessTokenOptionalGuard } from "../middlewares/guards/access.token.optional.guard";

export const postsRouter = Router();

postsRouter.get("/", accessTokenOptionalGuard, getPostsController);
postsRouter.get("/:id", accessTokenOptionalGuard, ...checkIdPostValidators, getPostByIdController);
postsRouter.post("/", basicAuthGuard, ...createPostValidators, createPostController);
postsRouter.put("/:id", basicAuthGuard, ...updatePostValidators, updatePostController);
postsRouter.delete("/:id", basicAuthGuard, ...checkIdPostValidators, deletePostController);

postsRouter.get("/:id/comments", accessTokenOptionalGuard, getPostCommentsController);
postsRouter.post("/:id/comments", accessTokenGuard, ...inputCommentValidators, createPostCommentController);

postsRouter.put("/:id/like-status", accessTokenGuard, ...likeStatusValidators, updatePostLikeController);