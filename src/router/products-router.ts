import { Router } from "express";
import { 
  createProductController, 
  deleteProductController, 
  getProductByIdController, 
  getProductsController, 
  updateProductController 
} from "../controller/products";
import { checkIdProductValidators, createProductValidators, updateProductValidators } from "../middlewares/validators/product-validators";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", ...checkIdProductValidators, getProductByIdController);
productsRouter.delete("/:id", ...checkIdProductValidators, deleteProductController);
productsRouter.post("/", ...createProductValidators, createProductController);
productsRouter.put("/:id", ...updateProductValidators, updateProductController);