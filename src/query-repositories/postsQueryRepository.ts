import { IPostView } from "../@types/posts";
import { postsCollection } from "../db/mongoDb";

export const postsQueryRepository = {

  async getPostById(id: string): Promise<IPostView | null> {
    const post = await postsCollection.findOne({ id });
    return post ? this.__mapToOutput(post) : null;
  },

  async getPostComments() {
    
  },

  __mapToOutput(post: IPostView): IPostView {
    return {
      id: post.id,
      createdAt: post.createdAt,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
  }
}