import { getDB, setDB } from "../../db/db";
import { IPostInput, IPostView } from "../../types/posts";

export const postsRepository = {
  async getPosts(): Promise<IPostView[]> {
    return getDB().posts;
  },

  async createPost(data: IPostInput): Promise<IPostView> {
    const db = getDB();
    const newPost = {
      id: String(db.posts.length + 1),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: "",
    };

    setDB({ posts: [...db.posts, newPost] });
    return this.mapToOutput(newPost);
  },

  async getPostById(id: string): Promise< IPostView | null> {
    const post = getDB().posts.find(p => p.id === id);
    return post ? this.mapToOutput(post) : null;
  },

  async updatePost(id: string, data: IPostInput): Promise<boolean> {
    const db = getDB();
    const index = db.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPosts = [...db.posts];
      updatedPosts[index] = {
        ...updatedPosts[index],
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
      };
      setDB({ posts: updatedPosts });
      return true;
    } else {
      return false;
    }
  },

  async deletePost(id: string): Promise<boolean> {
    const db = getDB();
    const updatedPosts = db.posts.filter(post => post.id !== id);
    if (updatedPosts.length !== db.posts.length) {
      setDB({ posts: updatedPosts });
      return true;
    }
    return false;
  },

  mapToOutput(post: IPostView): IPostView {
    return {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
  }
};