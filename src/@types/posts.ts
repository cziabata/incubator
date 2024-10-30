import { IPaginationResultValues, IPaginationValues } from "./shared"

export interface IPostView {
  id: string,
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
}

export interface IPostInput {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export interface ISearchPostsValues extends IPaginationValues {
 
}

export interface IPostsDto extends IPaginationResultValues {
  items: IPostView[]
}