import { IPaginationResultValues, IPaginationValues } from "./shared"

export interface ICommentView {
  id: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
  }
  createdAt: string
}

export interface ICommentDB {
  id?: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
  }
  createdAt: string
  postId: string
}

export interface ICommentInput {
  content: string
}

export interface ICommentDto extends IPaginationResultValues {
  items: ICommentView[]
}

export interface ISearchCommentsValues extends IPaginationValues {
  postId: string
}

export interface INewCommentDto {
  content: string;
  commentatorInfo: {
      userId: string;
      userLogin: string;
  };
  createdAt: string;
  postId: string;
}