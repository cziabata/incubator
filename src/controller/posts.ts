import { Response, Request } from 'express';
import { postsRepository } from '../repositories/mongo/posts-repository';

export const getPostsController = async (req: Request, res: Response) => {
  const foundPosts = await postsRepository.getPosts();
  res.send(foundPosts);
}

export const getPostByIdController = async (req: Request, res: Response) => {
  const post = await postsRepository.getPostById(req.params.id);
  if (post) res.send(post);
  else res.send(404);
}

export const deletePostController = async (req: Request, res: Response) => {

  const isDeleted = await postsRepository.deletePost(req.params.id);
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
  const newPost = await postsRepository.createPost(prepareBody);
  res.status(201).send(newPost);
}

export const updatePostController = async (req: Request, res: Response) => {
  const prepareBody = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
  }
  const isPostUpdated = await postsRepository.updatePost(req.params.id, prepareBody);
  if (isPostUpdated) {
    const updatedPost = postsRepository.getPostById(req.params.id)
    res.send(204) // .send(updatedPost)
  } else {
    res.send(404)
  };
}