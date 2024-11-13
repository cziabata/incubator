import { Request, Response } from "express";
import { authService } from "../domains/auth-service";
import { jwtService } from "../application/jwt.service";
import { usersQueryRepository } from "../query-repositories/usersQueryRepository";

export const loginController = async (req: Request, res: Response) => {
  const { loginOrEmail, password } = req.body

  const user = await authService.loginUser(
    loginOrEmail,
    password
  );
  if (!user) {
    res.status(401).json({
      message: "Invalid login or password"
    });
    return;
  }
  const accessToken = await jwtService.createToken(user._id.toString());

  res.status(200).send({ accessToken });
}

export const authMeController = async (req: Request, res: Response) => {

  const userId = req.user?.id as string;
  if (!userId) { 
    res.sendStatus(401);
    return
  }

  const me = await usersQueryRepository.getUserById(userId);
  res.status(200).send({
    userId: me?.id,
    email: me?.email,
    login: me?.login
  });
  return;
}