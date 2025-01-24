import { Request, Response } from "express";
import { commentsQueryRepository } from "../query-repositories/commentsQueryRepository";
import { commentsService } from "../domains/comments-service";

export const getCommentByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user?.id;
  const comment = await commentsQueryRepository.getCommentById(id, userId);
  if (comment) {
    res.status(200).send(comment);
    return;
  } else {
    res.status(404).send("Not Found");
    return;
  }
}

export const updateCommentController = async (req: Request, res: Response) => {

  const userId = req.user?.id;

  if (!userId) {
    res.status(401).send("Not authorized");
    return
  }

  const commentContent = req.body.content;
  const commentId = req.params.id;

  const comment = await commentsQueryRepository.getCommentById(commentId, userId);
  if (!comment) {
    res.status(404).send("Not Found");
    return;
  }

  if (comment.commentatorInfo.userId !== userId) {
    res.status(403).send("You try to edit the comment that is not your own");
    return;
  }
  const success = await commentsService.updateComment(commentId, commentContent);

  if (success) {
    res.send(204);
    return;
  } else {
    res.status(400).send("Some error occured while comment updated");
    return;
  }

}

export const deleteCommentController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).send("Not authorized");
    return
  }

  const commentId = req.params.id;

  const comment = await commentsQueryRepository.getCommentById(commentId);

  if (!comment) {
    res.status(404).send("Not Found");
    return;
  }

  if (comment.commentatorInfo.userId !== userId) {
    res.status(403).send("You try to delete the comment that is not your own");
    return;
  }

  const success = await commentsService.deleteComment(commentId);

  if (success) {
    res.send(204);
    return;
  } else {
    res.status(400).send("Some error occured while comment deleted");
    return;
  }
}

export const updateCommentLikeController = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const commentId = req.params.id;
  const status = req.body.likeStatus;

  const resultStatus = await commentsService.updateCommentLike({ commentId, status, authorId: userId });

  res.send(resultStatus);
  return;
}