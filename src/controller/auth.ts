import { Request, Response } from "express";
import { authService } from "../domains/auth-service";
import { jwtService } from "../application/jwt.service";
import { usersQueryRepository } from "../query-repositories/usersQueryRepository";
import { IUserInput } from "../@types/users";

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
  const refreshToken = await jwtService.createRefreshToken(user._id.toString());

  res.cookie('refreshToken ', refreshToken, { httpOnly: true, secure: true });
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

export const registrationController = async (req: Request, res: Response) => {

  const prepareData: IUserInput = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
  }

  const success = await authService.registerUser(prepareData);

  if(success) {
    res.send(204);
  } else {
    res.send(400)
  }
  
  return;
}

export const confirmRegistrationController = async(req: Request, res: Response) => {
  const code = req.body.code;

  const success = await authService.confirmRegistration(code);
  if(success) {
    res.send(204);
  } else {
    res.send(400)
  }
}

export const emailResendingController = async(req: Request, res: Response) => {
  const email = req.body.email;
  const success = await authService.resendEmail(email);
  if(success) {
    res.send(204);
  } else {
    res.send(400)
  }
}