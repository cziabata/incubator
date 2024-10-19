import { Response, Request } from 'express';
import { postsRepository } from '../repositories/posts-repository';

export const getPostsController = (req: Request, res: Response) => {
  const foundPosts = postsRepository.getPosts();
  res.send(foundPosts);
}

export const getPostByIdController = (req: Request, res: Response) => {
  const post = postsRepository.getPostById(req.params.id);
  if (post) res.send(post);
  else res.send(404);
}

export const deletePostController = (req: Request, res: Response) => {

  const isDeleted = postsRepository.deletePost(req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}

export const createPostController = (req: Request, res: Response) => {
  const prepareBody = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
  }
  const newPost = postsRepository.createPost(prepareBody);
  res.status(201).send(newPost);
}

export const updatePostController = (req: Request, res: Response) => {
  const prepareBody = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
  }
  const isPostUpdated = postsRepository.updatePost(req.params.id, prepareBody);
  if (isPostUpdated) {
    const updatedPost = postsRepository.getPostById(req.params.id)
    res.send(204) // .send(updatedPost)
  } else {
    res.send(404)
  };
}