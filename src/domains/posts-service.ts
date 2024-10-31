import { postsRepository } from "../repositories/mongo/posts-repository";
import { IPostInput, IPostsDto, IPostView, ISearchPostsValues } from "../@types/posts";
import { blogsService } from "./blogs-service";

export const postsService = {

  async getPosts(query: ISearchPostsValues): Promise<IPostsDto> {
    return await postsRepository.getPosts(query);
  },

  async createPost(data: IPostInput): Promise<IPostView> {

    const relatedBlog = await blogsService.getBlogById(data.blogId);

    const newPost = {
      id: String(Math.floor(Date.now() / 1000)),
      createdAt: (new Date()).toISOString(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: relatedBlog?.name || "",
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