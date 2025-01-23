import { IPaginationResultValues, IPaginationValues } from "./shared"

export interface ICommentView {
  id: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
  }
  createdAt: string
  likesInfo: { 
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
  }
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
  likes: ILikeDB[]
  likesCount: number
  dislikesCount: number
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

export type LikeStatus = "Like" | "Dislike" | "None"
export interface ILikeDB {
  createdAt: Date
  status: LikeStatus
  authorId: string
}

export interface IUpdateLikeDto {
  status: LikeStatus
  authorId: string
  commentId: string
}