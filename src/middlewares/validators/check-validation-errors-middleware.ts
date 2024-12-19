import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { FieldNamesType } from "../../@types/shared";

export const checkValidationErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const status = req.statusCode === 404 ? 404 : 400;
    const eArray = errors.array({ onlyFirstError: true }) as { path: FieldNamesType, msg: string }[];
    res.status(status).json({
      errorsMessages: eArray.map(x => ({ field: x.path, message: x.msg }))
    });
    return;
  }
  next();
};

// {
//   errorsMessages: [
//     {
//       field: "email",
//       message: "User with such email doesnt exist"
//     }
//   ]
// }