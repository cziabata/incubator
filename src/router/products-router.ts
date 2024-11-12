import { Router } from "express";
import { 
  createProductController, 
  deleteProductController, 
  getProductByIdController, 
  getProductsController, 
  updateProductController 
} from "../controller/products";
import { checkIdProductValidators, createProductValidators, updateProductValidators } from "../middlewares/validators/product-validators";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", ...checkIdProductValidators, getProductByIdController);
productsRouter.delete("/:id", ...checkIdProductValidators, deleteProductController);
productsRouter.post("/", basicAuthGuard, ...createProductValidators, createProductController);
productsRouter.put("/:id", ...updateProductValidators, updateProductController);