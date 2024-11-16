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
  
}