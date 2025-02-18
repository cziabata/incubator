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

export interface IUpdateConfirmationAfterPasswordReset {
  _id: ObjectId
  confirmationCode: string
  expirationDate: Date
  isConfirmed: boolean
}

export interface IUsedRefreshToken {
  token: string
}

export interface ISession {
  user_id: string
  device_id: string
  iat: string
  device_name: string
  ip: string
  exp: Date
}

export interface IActiveDevice {
  ip: string
  title: string
  lastActiveDate: string
  deviceId: string
}

export interface IRefreshTokenPayload {
  userId: string
  exp: number,
  iat: number,
  deviceId: string
}