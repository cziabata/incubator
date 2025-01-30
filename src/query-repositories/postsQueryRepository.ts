import { ILikesDetails, IPostDB, IPostView } from "../@types/posts";
import { postsCollection } from "../db/mongoDb";

export const postsQueryRepository = {

  async getPostById(id: string): Promise<IPostView | null> {
    const post = await postsCollection.findOne({ id });
    return post ? this.__mapToOutput(post) : null;
  },

  __mapToOutput(post: IPostDB, userId?: string): IPostView {
    const status = (!userId || post.likes.length === 0)
      ? "None"
      : post.likes.find(l => l.userId === userId)?.status ?? "None";

    const newestLikes: ILikesDetails[] = post.likes
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 3)
      .map(l => ({
        userId: l.userId,
        login: l.login,
        addedAt: l.addedAt,
      }))

    return {
      id: post.id,
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