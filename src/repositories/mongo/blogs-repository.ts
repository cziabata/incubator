import { IBlogDto, IBlogInput, IBlogView } from "../../@types/blogs";
import { ISearchBlogsValues } from "../../@types/blogs";
import { BlogModel } from "../../db/entity/blogs.entity";

export const blogsRepository = {
  async getBlogs(query: ISearchBlogsValues): Promise<IBlogDto> {

    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = query;

    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" }
    }

    const totalCount = await BlogModel.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const blogs = await BlogModel
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? "asc" : "desc" })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return {
      items: blogs.map(b => this.mapToOutput(b)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }
  },

  async createBlog(newBlog: IBlogView): Promise<IBlogView> {
    await BlogModel.create(newBlog);
    return this.mapToOutput(newBlog);
  },

  async getBlogById(id: string): Promise<IBlogView | null> {
    const blog = await BlogModel.findOne({ id });
    return blog ? this.mapToOutput(blog) : null;
  },

  async updateBlog(id: string, data: IBlogInput): Promise<boolean> {

    const result = await BlogModel.updateOne({ id }, {
      $set: {
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
      }
    })

    return result.matchedCount === 1;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await BlogModel.deleteOne({ id });
    return result.deletedCount === 1;
  },

  mapToOutput(blog: IBlogView): IBlogView {
    return {
      id: blog.id,
      createdAt: blog.createdAt,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      isMembership: blog.isMembership,
    };
  }
}