import { SortDirection } from "mongodb";
import { IAdressesInput } from "./adresses";
import { IProductInput } from "./products";

export type FieldNamesType =
  keyof IAdressesInput |
  keyof IProductInput

export interface IPaginationValues {
  pageNumber: number
  pageSize: number
  sortBy: any
  sortDirection: SortDirection
}

export interface IPaginationResultValues {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}