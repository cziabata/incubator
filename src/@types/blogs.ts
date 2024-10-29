import { IPostView } from "./posts"
import { IPaginationResultValues, IPaginationValues } from "./shared"

export interface IBlogView {
  id: string
  name: string
  description: string
  websiteUrl: string
  isMembership: boolean
  createdAt: string
}

export interface IBlogInput {
  name: string
  description: string
  websiteUrl: string
}

export interface IBlogDto extends IPaginationResultValues {
  items: IBlogView[]
}

export interface IBlogPostsDto extends IPaginationResultValues {
  items: IPostView[]
}

export interface ISearchBlogsValues extends IPaginationValues {
  searchNameTerm: any
}

export interface ISearchPostsByBlogIdValues extends IPaginationValues {
  blogId: string
}

