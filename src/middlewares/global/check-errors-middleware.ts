import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { FieldNamesType } from "../../@types/shared";

export const checkErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const eArray = errors.array({ onlyFirstError: true }) as { path: FieldNamesType, msg: string }[]
    res.status(400).json({
      errorsMessages: eArray.map(x => ({ field: x.path, message: x.msg }))
    })
    return
  }
  next();
}