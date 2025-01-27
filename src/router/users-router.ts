import { Router } from "express";
import { basicAuthGuard } from "../middlewares/guards/base.auth.guard";
import { createUserValidators } from "../middlewares/validators/user-validators";
import { usersController } from "../composition-root/users-composition-root";

export const usersRouter = Router();

usersRouter.get("/", basicAuthGuard, usersController.getUsersController.bind(usersController));
usersRouter.post("/", basicAuthGuard, ...createUserValidators, usersController.createUserController.bind(usersController));
usersRouter.delete("/:id", basicAuthGuard, usersController.deleteUserController.bind(usersController));