import { Request, Response } from "express";
import { authService } from "../domains/auth-service";

export const loginController = async (req: Request, res: Response) => {
  const { loginOrEmail, password } = req.body

  const accessToken = await authService.loginUser(
    loginOrEmail,
    password
  );
  if (!accessToken) {
    res.sendStatus(401);
  } else {
    res.sendStatus(204);
  }
}