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