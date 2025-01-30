import { IPaginationResultValues, IPaginationValues, LikeStatus } from "./shared"

export interface IPostView {
  id: string,
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
  extendedLikesInfo: {
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
    newestLikes: ILikesDetails[]
  }
}

export interface IPostDB {
  id: string,
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
  likesCount: number
  dislikesCount: number
  likes: ILikeDB[]
}

export interface IPostInput {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export interface ILikesDetails {
  userId: string
  login: string
  addedAt: Date
}

export interface ILikeDB {
  addedAt: Date
  userId: string
  login: string
  status: LikeStatus
}

export interface ISearchPostsValues extends IPaginationValues {
 
}

export interface IPostsDto extends IPaginationResultValues {
  items: IPostView[]
}