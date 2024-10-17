import { Router } from "express";
import { 
  createProductController, 
  deleteProductController, 
  getProductByIdController, 
  getProductsController, 
  updateProductController 
} from "../controller/products";
import { checkIdProductValidators, createProductValidators, updateProductValidators } from "../middlewares/validators/product-validators";
import { authMiddleware } from "../middlewares/global/auth-middleware";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", ...checkIdProductValidators, getProductByIdController);
productsRouter.delete("/:id", ...checkIdProductValidators, deleteProductController);
productsRouter.post("/", authMiddleware, ...createProductValidators, createProductController);
productsRouter.put("/:id", ...updateProductValidators, updateProductController);