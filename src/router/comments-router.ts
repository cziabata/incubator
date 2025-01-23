import { Router } from "express";
import { deleteCommentController, getCommentByIdController, updateCommentController, updateCommentLikeController } from "../controller/comments";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { iLikeStatusValidationValidators, inputCommentValidators } from "../middlewares/validators/comments-validators";
import { accessTokenOptionalGuard } from "../middlewares/guards/access.token.optional.guard";

export const commentsRouter = Router();

commentsRouter.get("/:id", accessTokenOptionalGuard, getCommentByIdController);
commentsRouter.put("/:id", accessTokenGuard, ...inputCommentValidators, updateCommentController);
commentsRouter.delete("/:id", accessTokenGuard, deleteCommentController);

commentsRouter.put("/:id/like-status", accessTokenGuard, ...iLikeStatusValidationValidators, updateCommentLikeController);