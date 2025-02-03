import { postsCollection } from "../../db/mongoDb";
import { ILikesDetails, IPostDB, IPostInput, IPostsDto, IPostView, ISearchPostsValues, IUpdateLikeDto } from "../../@types/posts";
import { IBlogPostsDto, ISearchPostsByBlogIdValues } from "../../@types/blogs";
import { LikeStatus } from "../../@types/shared";
import { ObjectId, WithId } from "mongodb";

export const postsRepository = {
  async getPosts(query: ISearchPostsValues): Promise<IPostsDto> {

    const { pageNumber, pageSize, sortBy, sortDirection } = query;

    const filter: any = {};

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const posts = await postsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return {
      items: posts.map(p => this.__mapToOutput(p)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }

  },

  async createPost(newPost: IPostDB): Promise<IPostView> {
    const { insertedId } = await postsCollection.insertOne(newPost);
    return this.__mapToOutput({ ...newPost, _id: insertedId });
  },

  async getPostById(id: string, userId?: string): Promise<IPostView | null> {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    return post ? this.__mapToOutput(post, userId) : null;
  },

  async updatePost(id: string, data: IPostInput): Promise<boolean> {

    const result = await postsCollection.updateOne({ _id: new ObjectId(id) }, {
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
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },

  async getPostsByBlogId(query: ISearchPostsByBlogIdValues): Promise<IBlogPostsDto> {
    const { blogId, pageNumber, pageSize, sortBy, sortDirection } = query;

    const filter = { blogId: { $regex: blogId } };

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const foundedPostsByBlogId = await postsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return {
      items: foundedPostsByBlogId.map(p => this.__mapToOutput(p)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }
  },

  async addLike(data: IUpdateLikeDto): Promise<boolean> {
    const { postId, userId, status, login } = data;
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: { likes: { userId, status, addedAt: new Date(), login } },
        $inc: {
          likesCount: status === "Like" ? 1 : 0,
          dislikesCount: status === "Dislike" ? 1 : 0
        }
      }
    );
    return result.matchedCount === 1;
  },


  async updateLike(postId: string, userId: string, newStatus: LikeStatus, oldStatus: LikeStatus): Promise<boolean> {
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: { "likes.$[elem].status": newStatus },
        $inc: {
          likesCount: newStatus === "Like" && oldStatus !== "Like" ? 1 : oldStatus === "Like" ? -1 : 0,
          dislikesCount: newStatus === "Dislike" && oldStatus !== "Dislike" ? 1 : oldStatus === "Dislike" ? -1 : 0
        }
      },
      { arrayFilters: [{ "elem.userId": userId }] }
    );
    return result.matchedCount === 1;
  },

  async removeLike(data: IUpdateLikeDto, oldStatus: LikeStatus): Promise<boolean> {
    const { postId, userId, status } = data;

    if (status === "None") {
      const result = await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        {
          $pull: { likes: { userId } },
          $inc: {
            likesCount: oldStatus === "Like" ? -1 : 0,
            dislikesCount: oldStatus === "Dislike" ? -1 : 0
          }
        }
      );
      return result.matchedCount === 1;
    } else {
      const result = await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        {
          $pull: { likes: { userId } },
          $inc: {
            likesCount: status === "Like" ? -1 : 0,
            dislikesCount: status === "Dislike" ? -1 : 0
          }
        }
      );
      return result.matchedCount === 1;
    }
  },

  __mapToOutput(post: WithId<IPostDB>, userId?: string): IPostView {
    const status = (!userId || post.likes.length === 0)
      ? "None"
      : post.likes.find(l => l.userId === userId)?.status ?? "None";

    const newestLikes: ILikesDetails[] = post.likes
      .filter(l => l.status === "Like")
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 3)
      .map(l => ({
        userId: l.userId,
        login: l.login,
        addedAt: l.addedAt,
      }))

    return {
      id: post._id.toString(),
      createdAt: post.createdAt,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      extendedLikesInfo: {
        likesCount: post.likesCount,
        dislikesCount: post.dislikesCount,
        myStatus: status,
        newestLikes
      }
    };
  }
};