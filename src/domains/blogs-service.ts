
import { blogsRepository } from "../repositories/mongo/blogs-repository";
import { IBlogInput, IBlogView } from "../types/blogs";

export const blogsService = {
  async getBlogs(): Promise<IBlogView[]> {
    return await blogsRepository.getBlogs();
  },

  async createBlog(data: IBlogInput): Promise<IBlogView> {
    const newBlog = {
      id: String(Math.floor(Date.now() / 1000)),
      createdAt: (new Date()).toISOString(),
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
}