import { ObjectId, WithId } from "mongodb";
import { ICommentDB, ICommentDto, ICommentView, ISearchCommentsValues, } from "../@types/comments";
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

  async getCommentsByPostId(query: ISearchCommentsValues): Promise<ICommentDto> {

    const { pageNumber, pageSize, sortBy, sortDirection, postId } = query;

    const filter = { postId };

    const totalCount = await commentsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const comments = await commentsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return {
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: comments.map(c => this._mapToOutput(c)),
    }

  },

  _mapToOutput(comment: WithId<ICommentDB>): ICommentView {
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