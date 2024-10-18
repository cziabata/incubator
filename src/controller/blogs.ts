import { Response, Request } from 'express';
import { blogsRepository } from '../repositories/blogs-repository';

export const getBlogsController = (req: Request, res: Response) => {
  const foundBlogs = blogsRepository.getBlogs();
  res.send(foundBlogs);
}

export const getBlogByIdController = (req: Request, res: Response) => {
  const blog = blogsRepository.getBlogById(+req.params.id);
  if (blog) res.send(blog);
  else res.send(404);
}

export const deleteBlogController = (req: Request, res: Response) => {

  const isDeleted = blogsRepository.deleteBlog(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}

export const createBlogController = (req: Request, res: Response) => {
  const prepareBody = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  const newBlog = blogsRepository.createBlog(prepareBody);
  res.status(201).send(newBlog);
}

export const updateBlogController = (req: Request, res: Response) => {
  const prepareBody = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  const isBlogUpdated = blogsRepository.updateBlog(+req.params.id, prepareBody);
  if (isBlogUpdated) {
    const updatedBlog = blogsRepository.getBlogById(+req.params.id)
    res.send(updatedBlog)
  } else {
    res.send(404)
  };
}