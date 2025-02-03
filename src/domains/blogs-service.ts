
import { blogsRepository } from "../repositories/mongo/blogs-repository";
import { IBlogDto, IBlogInput, IBlogPostsDto, IBlogView, ISearchPostsByBlogIdValues, ISearchBlogsValues } from "../@types/blogs";
import { postsRepository } from "../repositories/mongo/posts-repository";
import { IPostInput, IPostView } from "../@types/posts";
import { postsService } from "./posts-service";

export const blogsService = {
  async getBlogs(query: ISearchBlogsValues): Promise<IBlogDto> {
    return await blogsRepository.getBlogs(query);
  },

  async createBlog(data: IBlogInput): Promise<IBlogView> {
    const newBlog = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
      isMembership: false
    };

    return await blogsRepository.createBlog(newBlog);
  },

  async getBlogById(id: string): Promise<IBlogView | null> {
    return blogsRepository.getBlogById(id);
  },

  async updateBlog(id: string, data: IBlogInput): Promise<boolean> {
    return await blogsRepository.updateBlog(id, data);
  },

  async deleteBlog(id: string): Promise<boolean> {
    return await blogsRepository.deleteBlog(id)
  },

  async getBlogPosts(query: ISearchPostsByBlogIdValues, userId?: string): Promise<IBlogPostsDto> {
    return postsRepository.getPostsByBlogId(query, userId)
  },

  async createPostForBlog(data: IPostInput): Promise<IPostView> {
    return postsService.createPost(data);
  }
}