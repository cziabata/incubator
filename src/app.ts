import express, { Request, Response } from "express";
import cors from 'cors';
import { SETTINGS } from "./config";
import { productsRouter } from "./router/products-router";
import { adressesRouter } from "./router/adresses-router";
import { blogsRouter } from "./router/blogs-router";
import { postsRouter } from "./router/posts-router";
import { clearAllRouter } from "./router/clear-all-router";
import { usersRouter } from "./router/users-router";
import { authRouter } from "./router/auth-router";
import { commentsRouter } from "./router/comments-router";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.CLEAR_ALL, clearAllRouter);

app.use(SETTINGS.PATH.PRODUCTS, productsRouter);
app.use(SETTINGS.PATH.ADRESSES, adressesRouter);

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);

app.use(SETTINGS.PATH.AUTH, authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello incubator!!!444")
} )