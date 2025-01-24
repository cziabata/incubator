import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongoDb";
import { ICommentView, INewCommentDto, IUpdateLikeDto, LikeStatus } from "../../@types/comments";

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
    const result = await commentsCollection.insertOne({
      ...data,
      likes: [],
      likesCount: 0,
      dislikesCount: 0,
    });
    const insertedId = result.insertedId.toString();
    return {
      id: insertedId,
      content: data.content,
      commentatorInfo: { ...data.commentatorInfo },
      createdAt: data.createdAt,
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: "None",
      }
    }
  },

  async deleteComment(commentId: string): Promise<boolean> {
    const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
    return result.deletedCount === 1;
  },

  async addLike(data: IUpdateLikeDto): Promise<boolean> {
    const { commentId, authorId, status } = data;
    const result = await commentsCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $push: { likes: { authorId, status, createdAt: new Date() } },
        $inc: {
          likesCount: status === "Like" ? 1 : 0,
          dislikesCount: status === "Dislike" ? 1 : 0
        }
      }
    );
    return result.matchedCount === 1;
  },

  async updateLike(commentId: string, authorId: string, newStatus: LikeStatus, oldStatus: LikeStatus): Promise<boolean> {
    const result = await commentsCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: { "likes.$[elem].status": newStatus },
        $inc: {
          likesCount: newStatus === "Like" && oldStatus !== "Like" ? 1 : oldStatus === "Like" ? -1 : 0,
          dislikesCount: newStatus === "Dislike" && oldStatus !== "Dislike" ? 1 : oldStatus === "Dislike" ? -1 : 0
        }
      },
      { arrayFilters: [{ "elem.authorId": authorId }] }
    );
    return result.matchedCount === 1;
  },

  async removeLike(data: IUpdateLikeDto, oldStatus: LikeStatus): Promise<boolean> {
    const { commentId, authorId, status } = data;

    if (status === "None") {
      const result = await commentsCollection.updateOne(
        { _id: new ObjectId(commentId) },
        {
          $pull: { likes: { authorId } },
          $inc: {
            likesCount: oldStatus === "Like" ? -1 : 0,
            dislikesCount: oldStatus === "Dislike" ? -1 : 0
          }
        }
      );
      return result.matchedCount === 1;
    } else {
      const result = await commentsCollection.updateOne(
        { _id: new ObjectId(commentId) },
        {
          $pull: { likes: { authorId } },
          $inc: {
            likesCount: status === "Like" ? -1 : 0,
            dislikesCount: status === "Dislike" ? -1 : 0
          }
        }
      );
      return result.matchedCount === 1;
    }

  }

}