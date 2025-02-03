import { postsRepository } from "../repositories/mongo/posts-repository";
import { IPostDB, IPostInput, IPostsDto, IPostView, ISearchPostsValues, IUpdateLikeDto } from "../@types/posts";
import { blogsService } from "./blogs-service";
import { ICommentView, INewCommentDto } from "../@types/comments";
import { commentsRepository } from "../repositories/mongo/comments-repository";
import { postsQueryRepository } from "../query-repositories/postsQueryRepository";
import { usersQueryRepository } from "../query-repositories/usersQueryRepository";
import { LikeStatus } from "../@types/shared";

export const postsService = {

  async getPosts(query: ISearchPostsValues): Promise<IPostsDto> {
    return await postsRepository.getPosts(query);
  },

  async createPost(data: IPostInput): Promise<IPostView> {

    const relatedBlog = await blogsService.getBlogById(data.blogId);

    const newPost: IPostDB = {
      createdAt: new Date().toISOString(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: relatedBlog?.name || "",
      likes: [],
      likesCount: 0,
      dislikesCount: 0,
    };

    return await postsRepository.createPost(newPost);
  },

  async getPostById(id: string, userId?: string): Promise<IPostView | null> {
    return await postsRepository.getPostById(id, userId);
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

  async updatePostLike(postId: string, status: LikeStatus, userId: string): Promise<number> {

    const user = await usersQueryRepository.getUserById(userId);

    if (!user) return 404;

    const post = await postsQueryRepository.getDBPostById(postId);
    if (!post) return 404;

    const data: IUpdateLikeDto = {
      status,
      userId,
      postId,
      login: user.login,
    }

    const existingLike = post.likes.find(like => like.userId === userId);

    if (existingLike) {
      if (existingLike.status === status) {
        return 204; // Статус не изменился, ничего не делаем
      }

      if (status === "None") {
        const result = await postsRepository.removeLike(data, existingLike.status);
        return result ? 204 : 400;
      }
      const result = await postsRepository.updateLike(postId, userId, status, existingLike.status);
      return result ? 204 : 400;
    }

    if (status !== "None") {
      const result = await postsRepository.addLike(data);
      return result ? 204 : 400;
    }

    return 204; // Лайка не было и установили "None" — ничего не делаем
  }

};