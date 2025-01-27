import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { io_container } from "../../composition-root/users-composition-root";
import { IIdType } from "../../@types/shared";
import { UsersRepository } from "../../repositories/mongo/users-repository";

const usersRepository = io_container.resolve(UsersRepository);

export const accessTokenOptionalGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [authType, token] = authHeader.split(" ");

  if (authType !== "Bearer" || !token) {
    return next();
  }

  const payload = await jwtService.verifyToken(token);

  if (!payload) {
    return next();
  }

  const { userId, exp } = payload;

  if (!exp || Date.now() > exp * 1000) {
    return next();
  }

  const userExists = await usersRepository.doesExistById(userId);

  if (userExists) {
    req.user = { id: userId } as IIdType;
  }

  next();
};
