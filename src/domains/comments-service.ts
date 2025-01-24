import { IUpdateLikeDto } from "../@types/comments";
import { commentsQueryRepository } from "../query-repositories/commentsQueryRepository";
import { commentsRepository } from "../repositories/mongo/comments-repository"

export const commentsService = {

  async updateComment(commentId: string, content: string): Promise<boolean> {
    const result = await commentsRepository.updateComment(commentId, content);
    return result;
  },

  async deleteComment(commentId: string): Promise<boolean> {
    const result = commentsRepository.deleteComment(commentId);
    return result;
  },

  async updateCommentLike(data: IUpdateLikeDto): Promise<number> {
    const { status, authorId, commentId } = data;

    const comment = await commentsQueryRepository.getDBCommentById(commentId);
    if (!comment) return 404;

    const existingLike = comment.likes.find(like => like.authorId === authorId);

    if (existingLike) {
      if (existingLike.status === status) {
        return 204; // Статус не изменился, ничего не делаем
      }

      if (status === "None") {
        const result = await commentsRepository.removeLike(data, existingLike.status);
        return result ? 204 : 400;
      }
      const result = await commentsRepository.updateLike(commentId, authorId, status, existingLike.status);
      return result ? 204 : 400;
    } 
    
    if (status !== "None") {
      const result = await commentsRepository.addLike(data);
      return result ? 204 : 400;
    }

    return 204; // Лайка не было и установили "None" — ничего не делаем
  }
  
}