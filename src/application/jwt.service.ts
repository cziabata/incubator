import jwt from "jsonwebtoken";
import { SETTINGS } from "../config";
import { sessionSevice } from "./session.service";
import { IRefreshTokenPayload } from "../@types/auth";

export const jwtService = {
  async createToken(userId: string): Promise<string> {
    return jwt.sign(
      { userId },
      SETTINGS.AC_SECRET,
      {
        expiresIn: SETTINGS.AC_TIME,
      }
    );
  },
  async createRefreshToken(userId: string, iat: number, deviceId: string): Promise<string> {
    return jwt.sign(
      { userId, deviceId, iat },
      SETTINGS.AC_SECRET,
      {
        expiresIn: SETTINGS.REFRESH_TOKEN_TIME,
      }
    );
  },
  async decodeToken(token: string): Promise<any> {
    try {
      return jwt.decode(token);
    } catch (e: unknown) {
      console.error("Can't decode token", e);
      return null;
    }
  },
  async verifyToken(token: string): Promise<IRefreshTokenPayload | null> {
    try {
      return jwt.verify(token, SETTINGS.AC_SECRET) as IRefreshTokenPayload;
    } catch (error) {
      console.error(error, "Error occured while token verify");
      return null;
    }
  },
};