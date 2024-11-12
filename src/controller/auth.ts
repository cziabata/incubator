import { Request, Response } from "express";
import { authService } from "../domains/auth-service";
import { jwtService } from "../application/jwt.service";

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