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