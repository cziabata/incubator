import { getDB, setDB } from "../../db/db";
import { IBlogInput, IBlogView } from "../../types/blogs";

export const blogsRepository = {
  async getBlogs(): Promise<IBlogView[]> {
    return getDB().blogs;
  },

  async createBlog(data: IBlogInput): Promise<IBlogView> {
    const db = getDB();
    const newBlog = {
      id: String(db.blogs.length + 1),
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
    };

    setDB({ blogs: [...db.blogs, newBlog] });
    return this.mapToOutput(newBlog);
  },

  async getBlogById(id: string): Promise<IBlogView | null> {
    const blog = getDB().blogs.find(p => p.id === id);
    return blog ? this.mapToOutput(blog) : null;
  },

  async updateBlog(id: string, data: IBlogInput): Promise<boolean> {
    const db = getDB();
    const index = db.blogs.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedBlogs = [...db.blogs];
      updatedBlogs[index] = {
        ...updatedBlogs[index],
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
      };
      setDB({ blogs: updatedBlogs });
      return true;
    } else {
      return false;
    }
  },

  async deleteBlog(id: string): Promise<boolean> {
    const db = getDB();
    const updatedBlogs = db.blogs.filter(blog => blog.id !== id);
    if (updatedBlogs.length !== db.blogs.length) {
      setDB({ blogs: updatedBlogs });
      return true;
    }
    return false;
  },

  async find(id: string): Promise<IBlogView | undefined> {
    const db = getDB();
    return db.blogs.find(b => b.id === id)
  },

  mapToOutput(blog: IBlogView): IBlogView {
    return {
      id: blog.id,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    };
  }
}