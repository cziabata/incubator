import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { IIdType, ISessionType } from "../../@types/shared";
import { refreshTokenRepository } from "../../repositories/mongo/refresh-tokens-repository";

export const refreshTokenGuard = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).send("Refresh token is missing");
    return;
  }

  const isExist = await refreshTokenRepository.doesExist(refreshToken);

  if (isExist) {
    res.status(401).send("Token is blacklisted");
    return;
  }

  const payload = await jwtService.verifyToken(refreshToken);

  if (!payload) {
    res.status(401).send("Invalid token");
    return;
  }

  const { userId, exp, iat, deviceId } = payload;

  if (exp && Date.now() >= exp * 1000) { 
    res.status(401).send("Token expired");
    return;
  }

  const user = await usersRepository.doesExistById(userId);

  if (!user) {
    res.status(401).send("User not found");
    return;
  }

  req.user = { id: userId } as IIdType;
  req.session = { iat, deviceId } as ISessionType;
  next();
};
