import express, { Request, Response } from "express";
import { productsRouter } from "./router/products-router";
import { adressesRouter } from "./router/adresses-router";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/products", productsRouter);
app.use("/adresses", adressesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello incubator!!!444")
} )

app.listen(PORT, () => {
  console.log(`App started on ${PORT} port`)
})