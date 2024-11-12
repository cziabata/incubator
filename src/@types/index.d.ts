import { IIdType } from "./shared";

declare global {
  declare namespace Express {
    export interface Request {
      user: IIdType | undefined;
    }
  }
}