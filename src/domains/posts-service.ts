import { postsRepository } from "../repositories/mongo/posts-repository";
import { IPostInput, IPostsDto, IPostView, ISearchPostsValues } from "../@types/posts";
import { blogsService } from "./blogs-service";
import { ICommentView, INewCommentDto } from "../@types/comments";
import { commentsRepository } from "../repositories/mongo/comments-repository";

export const postsService = {

  async getPosts(query: ISearchPostsValues): Promise<IPostsDto> {
    return await postsRepository.getPosts(query);
  },

  async createPost(data: IPostInput): Promise<IPostView> {

    const relatedBlog = await blogsService.getBlogById(data.blogId);

    const newPost = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
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

  async createPostComment(data: INewCommentDto): Promise<ICommentView> {
    return await commentsRepository.createComment(data);
  },

};