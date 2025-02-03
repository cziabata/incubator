import { ObjectId, WithId } from "mongodb";
import { ILikesDetails, IPostDB, IPostView } from "../@types/posts";
import { postsCollection } from "../db/mongoDb";

export const postsQueryRepository = {

  async getPostById(id: string, userId?: string): Promise<IPostView | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const post = await postsCollection.findOne({  _id: new ObjectId(id) });
    return post ? this.__mapToOutput(post, userId) : null;
  },

  async getDBPostById(id: string): Promise<WithId<IPostDB> | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    return post;
  },

  __mapToOutput(post: WithId<IPostDB>, userId?: string): IPostView {
    const status = (!userId || post.likes.length === 0)
      ? "None"
      : post.likes.find(l => l.userId === userId)?.status ?? "None";
    const newestLikes: ILikesDetails[] = post.likes
      .filter(l => l.status === "Like")
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 3)
      .map(l => ({
        userId: l.userId,
        login: l.login,
        addedAt: l.addedAt,
      }))

    return {
      id: post._id.toString(),
      createdAt: post.createdAt,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      extendedLikesInfo: {
        likesCount: post.likesCount,
        dislikesCount: post.dislikesCount,
        myStatus: status,
        newestLikes
      }
    };
  }
}