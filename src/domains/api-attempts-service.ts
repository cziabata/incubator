import { Request } from "express";
import { apiAttemptsRepository } from "../repositories/mongo/api-attempts-repository";

export const apiAttemptsService = {
  async registerAttempt(req: Request): Promise<boolean> {

    const URL = req.originalUrl;
    const IP = req.ip || req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || "";

    const result = await apiAttemptsRepository.registerAttempt({ IP, URL, date: new Date() });
    return result;
  }
}