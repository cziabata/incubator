import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongoDb";
import { ICommentView, INewCommentDto } from "../../@types/comments";

export const commentsRepository = {

  async updateComment(commentId: string, content: string): Promise<boolean> {
    const result = await commentsCollection.updateOne({ _id: new ObjectId(commentId) }, {
      $set: {
        content,
      }
    })
    return result.matchedCount === 1;
  },

  async createComment(data: INewCommentDto): Promise<ICommentView> {
    const result = await commentsCollection.insertOne(data);
    const insertedId = result.insertedId.toString();
    return {
      id: insertedId,
      content: data.content,
      commentatorInfo: { ...data.commentatorInfo },
      createdAt: data.createdAt,
    }
  },

  async deleteComment(commentId: string): Promise<boolean> {
    const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
    return result.deletedCount === 1;
  },

}