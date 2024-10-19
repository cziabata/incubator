export interface IPostView {
  id: string,
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
}

export interface IPostInput {
  title: string
  shortDescription: string
  content: string
  blogId: string
}