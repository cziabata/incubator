import { postsCollection } from "../../db/mongoDb";
import { IPostInput, IPostView } from "../../types/posts";

export const postsRepository = {
  async getPosts(): Promise<IPostView[]> {
    return postsCollection.find({}).toArray();
  },

  async createPost(data: IPostInput): Promise<IPostView> {
    const newPost = {
      id: String(Math.floor(Date.now() / 1000)),
      createdAt: (new Date()).toISOString(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: "",
    };

    await postsCollection.insertOne(newPost);
    return this.mapToOutput(newPost);
  },

  async getPostById(id: string): Promise< IPostView | null> {
    const post = await postsCollection.findOne({ id });
    return post ? this.mapToOutput(post) : null;
  },

  async updatePost(id: string, data: IPostInput): Promise<boolean> {

    const result = await postsCollection.updateOne({ id }, {
      $set: {
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
      }
    })

    return result.matchedCount === 1;

  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id });
    return result.deletedCount === 1;
  },

  mapToOutput(post: IPostView): IPostView {
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
};