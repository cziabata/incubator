import { Request, Response, NextFunction } from "express";
import { apiAttemptsQueryRepository } from "../../query-repositories/apiAttemptsQueryRepository";
import { apiAttemptsService } from "../../domains/api-attempts-service";

export const apiAttemptsGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Используем `req.originalUrl`, так как `baseUrl` работает только для вложенных роутеров.
    const URL = req.originalUrl;

    // Получаем IP адрес из заголовков запроса или из сокета.
    const IP = req.ip || req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || "";

    const attempts = await apiAttemptsQueryRepository.countRequests({ IP, URL, date: new Date() });

    if (attempts.length > 5) {
      res.status(429).send("Too many attempts");
      return;
    }

    await apiAttemptsService.registerAttempt(req);

    next();
  } catch (error) {
    console.error("Error in loginAttemptsGuard:", error);
    res.status(500).send("Internal server error");
  }
};
