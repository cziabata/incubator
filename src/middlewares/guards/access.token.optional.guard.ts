import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { IIdType } from "../../@types/shared";

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
