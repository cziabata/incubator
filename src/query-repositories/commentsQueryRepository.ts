import { ObjectId, WithId } from "mongodb";
import { ICommentDB, ICommentDto, ICommentView, ISearchCommentsValues, } from "../@types/comments";
import { commentsCollection } from "../db/mongoDb";

export const commentsQueryRepository = {
  async getCommentById(id: string, userId?: string): Promise<ICommentView | null> {

    if (!this._checkObjectId(id)) return null;

    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });

    if (comment) {
      return this._mapToOutput(comment, userId);
    } else {
      return null;
    }

  },

  async getDBCommentById(id: string, userId?: string): Promise<ICommentDB | null> {

    if (!this._checkObjectId(id)) return null;

    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });

    if (comment) {
      return comment;
    } else {
      return null;
    }

  },

  async getCommentsByPostId(query: ISearchCommentsValues, userId?: string): Promise<ICommentDto> {

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
      items: comments.map(c => this._mapToOutput(c, userId)),
    }

  },

  _mapToOutput(comment: WithId<ICommentDB>, userId?: string): ICommentView {

    const status = (!userId || comment.likes.length === 0)
      ? "None"
      : comment.likes.find(l => l.authorId === userId)?.status ?? "None";

    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: comment.commentatorInfo,
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesCount,
        dislikesCount: comment.dislikesCount,
        myStatus: status,
      },
    };
  },

  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  }
}