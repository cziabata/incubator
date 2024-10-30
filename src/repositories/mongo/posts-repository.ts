import { postsCollection } from "../../db/mongoDb";
import { IPostInput, IPostsDto, IPostView, ISearchPostsValues } from "../../@types/posts";
import { IBlogPostsDto, ISearchPostsByBlogIdValues } from "../../@types/blogs";

export const postsRepository = {
  async getPosts(query: ISearchPostsValues): Promise<IPostsDto> {

    const { pageNumber, pageSize, sortBy, sortDirection } = query;

    const filter: any = {};

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const posts = await postsCollection
      .find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === "asc" ? "asc" : "desc" })
      .toArray();

    return {
      items: posts.map(p => this.mapToOutput(p)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }

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

  async getPostById(id: string): Promise<IPostView | null> {
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

  async getPostsByBlogId(query: ISearchPostsByBlogIdValues): Promise<IBlogPostsDto> {
    const { blogId, pageNumber, pageSize, sortBy, sortDirection } = query;

    const filter = { blogId: { $regex: blogId } };

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const foundedPostsByBlogId = await postsCollection
      .find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === "asc" ? "asc" : "desc" })
      .toArray();

    return {
      items: foundedPostsByBlogId.map(p => this.mapToOutput(p)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }
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