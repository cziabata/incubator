import { IPaginationResultValues } from "./shared"

export interface ICommentView {
  id: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
  }
  createdAt: string
}

export interface ICommentInput {
  content: string
}

export interface ICommentDto extends IPaginationResultValues {
  items: ICommentView[]
}