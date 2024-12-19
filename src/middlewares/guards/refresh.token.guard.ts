import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { IIdType } from "../../@types/shared";
import { refreshTokenRepository } from "../../repositories/mongo/refresh-tokens-repository";

export const refreshTokenGuard = async (req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401);
    return;
  }
  // {
  //   status: ResultStatus.Unauthorized,
  //   errorMessage: "Havent payload",
  //   data: null,
  // };

  const isExist = await refreshTokenRepository.doesExist(refreshToken);

  if (isExist) {
    res.status(401);
    return;
  }

  const payload = await jwtService.verifyToken(refreshToken);

  if (payload) {

    const { userId } = payload;

    const user = await usersRepository.doesExistById(userId);

    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    req.user = { id: userId } as IIdType;
    next();
  } else {
    res.status(401).send("Invalid token");
    return
  }
}