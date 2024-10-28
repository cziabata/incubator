import { Response, Request } from 'express';
import { blogsService } from '../domains/blogs-repository';

export const getBlogsController = async (req: Request, res: Response) => {
  const foundBlogs = await blogsService.getBlogs();
  res.send(foundBlogs);
}

export const getBlogByIdController = async (req: Request, res: Response) => {
  const blog = await blogsService.getBlogById(req.params.id);
  if (blog) res.send(blog);
  else res.send(404);
}

export const deleteBlogController = async (req: Request, res: Response) => {

  const isDeleted = await blogsService.deleteBlog(req.params.id);
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
  const newBlog = await blogsService.createBlog(prepareBody);
  res.status(201).send(newBlog);
}

export const updateBlogController = async (req: Request, res: Response) => {
  const prepareBody = {
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }
  const isBlogUpdated = await blogsService.updateBlog(req.params.id, prepareBody);
  if (isBlogUpdated) {
    const updatedBlog = blogsService.getBlogById(req.params.id)
    res.send(204) // .send(updatedBlog)
  } else {
    res.send(404)
  };
}