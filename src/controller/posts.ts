import { Response, Request } from 'express';
import { postsService } from '../domains/posts-service';

export const getPostsController = async (req: Request, res: Response) => {
  const foundPosts = await postsService.getPosts();
  res.send(foundPosts);
}

export const getPostByIdController = async (req: Request, res: Response) => {
  const post = await postsService.getPostById(req.params.id);
  if (post) res.send(post);
  else res.send(404);
}

export const deletePostController = async (req: Request, res: Response) => {

  const isDeleted = await postsService.deletePost(req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}

export const createPostController = async (req: Request, res: Response) => {
  const prepareBody = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
  }
  const newPost = await postsService.createPost(prepareBody);
  res.status(201).send(newPost);
}

export const updatePostController = async (req: Request, res: Response) => {
  const prepareBody = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
  }
  const isPostUpdated = await postsService.updatePost(req.params.id, prepareBody);
  if (isPostUpdated) {
    const updatedPost = postsService.getPostById(req.params.id)
    res.send(204) // .send(updatedPost)
  } else {
    res.send(404)
  };
}