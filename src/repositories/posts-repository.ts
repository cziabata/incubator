import { getDB, setDB } from "../db/db";
import { IPostInput, IPostView } from "../types/posts";

export const postsRepository = {
  getPosts() {
    return getDB().posts;
  },

  createPost(data: IPostInput) {
    const db = getDB();
    const newPost = {
      id: db.posts.length + 1,
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: "",
    };

    setDB({ posts: [...db.posts, newPost] });
    return this.mapToOutput(newPost);
  },

  getPostById(id: number) {
    const post = getDB().posts.find(p => p.id === id);
    return post ? this.mapToOutput(post) : null;
  },

  updatePost(id: number, data: IPostInput) {
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

  deletePost(id: number) {
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