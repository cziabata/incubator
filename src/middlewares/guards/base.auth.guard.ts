import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../../config";

export const basicAuthGuard = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] as string; // 'Basic xxxx'

  if (!auth || !auth.startsWith('Basic ')) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const encodedCredentials = auth.slice(6);
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf8');

  if (decodedCredentials !== SETTINGS.ADMIN_AUTH) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};