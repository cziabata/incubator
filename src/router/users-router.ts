import { Router } from "express";
import { createUserController, deleteUserController, getUsersController } from "../controller/users";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";
import { createUserValidators } from "../middlewares/validators/user-validators";

export const usersRouter = Router();

usersRouter.get("/", basicAuthGuard, getUsersController);
usersRouter.post("/", basicAuthGuard, ...createUserValidators, createUserController);
usersRouter.delete("/:id", basicAuthGuard, deleteUserController);