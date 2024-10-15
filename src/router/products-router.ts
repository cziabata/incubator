import { Router } from "express";
import { 
  createProductController, 
  deleteProductController, 
  getProductByIdController, 
  getProductsController, 
  updateProductController 
} from "../controller/products";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", getProductByIdController);
productsRouter.delete("/:id", deleteProductController);
productsRouter.post("/", createProductController);
productsRouter.put("/:id", updateProductController);