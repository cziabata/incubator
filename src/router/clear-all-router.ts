import { Router } from "express";
import { deleteAllController } from "../controller/clear-all";

export const clearAllRouter = Router();

clearAllRouter.delete("/", deleteAllController)