import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { usersRepository } from "../../repositories/mongo/users-repository";
import { IIdType } from "../../@types/shared";

export const accessTokenGuard = async (req: Request, res: Response, next: NextFunction) => {

  if(!req.headers.authorization) {
    res.status(401).send("Authorization header missing");
    return;
  }  

  const [authType, token] = req.headers.authorization.split(" "); 

  if(authType !== "Bearer") {
    res.status(401).send("Invalid authorization type");
    return;
  }   

  const payload = await jwtService.verifyToken(token);

  if(payload) {

    const { userId } = payload;

    const user = await usersRepository.doesExistById(userId);

    if(!user) { 
      res.status(401).send("User not found");
      return;
    }  
    req.user = { id: userId } as IIdType;
    next(); 
  } else {
    res.status(401).send("Invalid token");
    return
  }
}