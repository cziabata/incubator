import { postsRepository } from "../repositories/mongo/posts-repository";
import { IPostInput, IPostView } from "../types/posts";

export const postsService = {

  async getPosts(): Promise<IPostView[]> {
    return await postsRepository.getPosts();
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

    return await postsRepository.createPost(newPost);
  },

  async getPostById(id: string): Promise< IPostView | null> {
    return await postsRepository.getPostById(id);
  },

  async updatePost(id: string, data: IPostInput): Promise<boolean> {
    return await postsRepository.updatePost(id, data);
  },

  async deletePost(id: string): Promise<boolean> {
    return await postsRepository.deletePost(id);
  },
};