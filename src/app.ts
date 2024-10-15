import express, { Request, Response } from "express";
import cors from 'cors';
import { productsRouter } from "./router/products-router";
import { adressesRouter } from "./router/adresses-router";
import { SETTINGS } from "./config";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.PRODUCTS, productsRouter);
app.use(SETTINGS.PATH.ADRESSES, adressesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello incubator!!!444")
} )