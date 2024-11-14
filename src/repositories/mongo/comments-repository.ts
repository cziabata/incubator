import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongoDb";

export const commentsRepository = {

  async updateComment(commentId: string, content: string): Promise<boolean> {
    const result = await commentsCollection.updateOne({ _id: new ObjectId(commentId) }, {
      $set: {
        content,
      }
    })

    return result.matchedCount === 1;
  },

  async deleteComment(commentId: string): Promise<boolean> {
    const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
    return result.deletedCount === 1;
  },

}