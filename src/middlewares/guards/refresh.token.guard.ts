import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { IIdType, ISessionType } from "../../@types/shared";
import { refreshTokenRepository } from "../../repositories/mongo/refresh-tokens-repository";
import { sessionsQueryRepository } from "../../query-repositories/sessionsQueryRepository";

export const refreshTokenGuard = async (req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).send("Refresh token is missing");
    return;
  }

  const payload = await jwtService.verifyToken(refreshToken);
  if (!payload) {
    res.status(401).send("Invalid token");
    return;
  }
  const { userId, exp, iat, deviceId } = payload;

  const session = await sessionsQueryRepository.getActiveDeviceByIatAndUserId(new Date(iat).toISOString(), userId);

  if (!session || exp > session.exp.getTime()) {
    res.status(401).send("Invalid token");
    return;
}

  const isExist = await refreshTokenRepository.doesExist(refreshToken);

  if (isExist) {
    res.status(401).send("Token is blacklisted");
    return;
  }

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
  req.session = { iat: new Date(iat).toISOString(), deviceId } as ISessionType;
  next();
};
