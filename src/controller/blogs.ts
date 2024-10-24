import { Response, Request } from 'express';
import { blogsRepository } from '../repositories/mongo/blogs-repository';

export const getBlogsController = async (req: Request, res: Response) => {
  const foundBlogs = await blogsRepository.getBlogs();
  res.send(foundBlogs);
}

export const getBlogByIdController = async (req: Request, res: Response) => {
  const blog = await blogsRepository.getBlogById(req.params.id);
  if (blog) res.send(blog);
  else res.send(404);
}

export const deleteBlogController = async (req: Request, res: Response) => {

  const isDeleted = await blogsRepository.deleteBlog(req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}

export const createBlogController = async (req: Request, res: Response) => {
  const prepareBody = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  const newBlog = await blogsRepository.createBlog(prepareBody);
  res.status(201).send(newBlog);
}

export const updateBlogController = async (req: Request, res: Response) => {
  const prepareBody = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  const isBlogUpdated = await blogsRepository.updateBlog(req.params.id, prepareBody);
  if (isBlogUpdated) {
    const updatedBlog = blogsRepository.getBlogById(req.params.id)
    res.send(204) // .send(updatedBlog)
  } else {
    res.send(404)
  };
}