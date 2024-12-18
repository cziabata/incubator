import { ObjectId } from "mongodb"

export interface ILoginInput {
  loginOrEmail: string
  password: string
}

export interface ISuccessLogin {
  accessToken: string
}

export interface IMeView {
  email: string
  login: string
  userId: string
}

export interface IUpdateConfirmationAfterEmailResendingDto {
  _id: ObjectId
  confirmationCode: string
  expirationDate: Date
}

export interface IUsedRefreshToken {
  token: string
}