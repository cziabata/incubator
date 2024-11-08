import { Router } from "express";
import { createUserController, deleteUserController, getUsersController } from "../controller/users";
import { authMiddleware } from "../middlewares/global/auth-middleware";
import { createUserValidators } from "../middlewares/validators/user-validators";

export const usersRouter = Router();

usersRouter.get("/", authMiddleware, getUsersController);
usersRouter.post("/", authMiddleware, ...createUserValidators, createUserController);
usersRouter.delete("/:id", authMiddleware, deleteUserController);