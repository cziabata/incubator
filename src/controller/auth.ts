import { Request, Response } from "express";
import { authService } from "../domains/auth-service";
import { IUserInput } from "../@types/users";
import { io_container } from "../composition-root/users-composition-root";
import { UsersQueryRepository } from "../query-repositories/usersQueryRepository";

const usersQueryRepository = io_container.resolve(UsersQueryRepository);

export const loginController = async (req: Request, res: Response) => {
  
  const data = await authService.loginUser(req);
  
  if (!data) {
    res.status(401).json({
      message: "Invalid login or password"
    });
    return;
  }
  
  const { accessToken, refreshToken } = data;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.status(200).send({ accessToken });
}

export const authMeController = async (req: Request, res: Response) => {

  const userId = req.user?.id as string;
  if (!userId) { 
    res.sendStatus(401);
    return;
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

export const refreshTokenController = async(req: Request, res: Response) => {

  const result = await authService.refreshTokens(req);

  if(!result) {
    res.status(400).send("Error while refreshing tokens");
    return;
  }

  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.status(200).send({ accessToken });
}

export const logoutController = async(req: Request, res: Response) => { 

  const result = await authService.logout(req);

  if(!result) {
    res.status(400).send("Error while logging out");
    return;
  }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  res.sendStatus(204);
}

export const passwordRecoveryController = async(req: Request, res: Response) => {
  const email = req.body.email;
  const success = await authService.passwordRecovery(email);
  if(success) {
    res.send(204);
  } else {
    res.send(400)
  }
}

export const newPasswordController = async(req: Request, res: Response) => {
  const password = req.body.newPassword;
  const code = req.body.recoveryCode;

  const success = await authService.confirmPasswordRecovery(password, code);
  if(success) {
    res.send(204);
  } else {
    res.send(400)
  }
}