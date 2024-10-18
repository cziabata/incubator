import express, { Request, Response } from "express";
import cors from 'cors';
import { SETTINGS } from "./config";
import { productsRouter } from "./router/products-router";
import { adressesRouter } from "./router/adresses-router";
import { blogsRouter } from "./router/blogs-router";
import { postsRouter } from "./router/posts-router";
import { clearAllRouter } from "./router/clear-all-router";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.CLEAR_ALL_02, clearAllRouter);

app.use(SETTINGS.PATH.PRODUCTS, productsRouter);
app.use(SETTINGS.PATH.ADRESSES, adressesRouter);

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello incubator!!!444")
} )