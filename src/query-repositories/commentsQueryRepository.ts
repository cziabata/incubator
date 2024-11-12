import { ObjectId, WithId } from "mongodb";
import { ICommentDto, ICommentView, ISearchCommentsValues } from "../@types/comments";
import { commentsCollection } from "../db/mongoDb";

export const commentsQueryRepository = {
  async getCommentsByPostId(query: ISearchCommentsValues): Promise<ICommentDto> {

    const { pageNumber, pageSize, sortBy, sortDirection, postId } = query;

    const filter = { _id: new ObjectId(postId) };

    const totalCount = await commentsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const comments = await commentsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return {
      items: comments.map(c => this._mapToOutput(c)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
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