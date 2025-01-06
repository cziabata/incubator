import { IIdType, ISessionType } from "./shared";

declare global {
  declare namespace Express {
    export interface Request {
      user: IIdType | undefined;
      session: ISessionType | undefined;
    }
  }
}