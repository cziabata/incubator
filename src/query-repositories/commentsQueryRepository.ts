import { ObjectId, WithId } from "mongodb";
import { ICommentView, } from "../@types/comments";
import { commentsCollection } from "../db/mongoDb";

export const commentsQueryRepository = {
  async getCommentById(id: string): Promise<ICommentView | null> {

    if (!this._checkObjectId(id)) return null;

    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });

    if(comment) {
      return this._mapToOutput(comment);
    } else {
      return null;
    }

  },

  _mapToOutput(comment: WithId<ICommentView>): ICommentView {
    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: comment.commentatorInfo,
      createdAt: comment.createdAt,
    };
  },

  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  }
}