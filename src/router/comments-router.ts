import { Router } from "express";
import { deleteCommentController, getCommentByIdController, updateCommentController } from "../controller/comments";
import { accessTokenGuard } from "../middlewares/guards/access.token.guard";
import { inputCommentValidators } from "../middlewares/validators/comments-validators";

export const commentsRouter = Router();

commentsRouter.get("/:id", getCommentByIdController);
commentsRouter.put("/:id", accessTokenGuard, ...inputCommentValidators, updateCommentController);
commentsRouter.delete("/:id", accessTokenGuard, deleteCommentController);