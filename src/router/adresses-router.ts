import { Router } from "express";
import { 
  getAdresseByIdController, 
  getAdressesController 
} from "../controller/adresses";

export const adressesRouter = Router();

adressesRouter.get("/", getAdressesController)

adressesRouter.get("/:id", getAdresseByIdController)