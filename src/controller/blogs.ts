import { Response, Request } from 'express';
import { blogsService } from '../domains/blogs-service';
import { getPaginationValues } from '../utils/pagination-helper';
import { IPaginationValues } from '../@types/shared';
import { IPostInput } from '../@types/posts';

export const getBlogsController = async (req: Request, res: Response) => {
  const paginationValues: IPaginationValues = getPaginationValues(req.query);
  const foundBlogs = await blogsService.getBlogs({
    ...paginationValues,
    searchNameTerm: req.query.searchNameTerm ? req.query.searchNameTerm : null,
  });
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

export const getBlogPostsController = async (req: Request, res: Response) => {
  const paginationValues: IPaginationValues = getPaginationValues(req.query);
  const blogId = req.params.id;
  const userId = req.user?.id;
  const foundBlogs = await blogsService.getBlogPosts({
    ...paginationValues,
    blogId,
  }, userId);
  if (foundBlogs) res.send(foundBlogs);
  else res.send(404);
}

export const createPostForBlogController = async (req: Request, res: Response) => {
  const prepareBody: IPostInput = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.params.id,
  }
  const newPost = await blogsService.createPostForBlog(prepareBody);
  res.status(201).send(newPost);
}