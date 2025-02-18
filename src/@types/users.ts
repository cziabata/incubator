import { IPaginationResultValues, IPaginationValues } from "./shared"

export interface IUserView {
  id: string
  login:string
  email: string
  createdAt: string
}

export interface IUserInput {
  login: string
  password: string
  email: string
}

export interface IUserDB {
  id: string
  login:string
  email: string
  createdAt: string
  password: string
  registerConfirmation: {
    confirmationCode: string
    expirationDate: Date | null,
    isConfirmed: boolean
  }
}

export interface IUsersDto extends IPaginationResultValues {
  items: IUserView[]
}

export interface ISearchUsersValues extends IPaginationValues {
  searchLoginTerm: string | null
  searchEmailTerm: string | null
}