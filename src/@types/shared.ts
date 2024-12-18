import { SortDirection } from "mongodb";
import { IAdressesInput } from "./adresses";
import { IProductInput } from "./products";

export type FieldNamesType =
  keyof IAdressesInput |
  keyof IProductInput

export interface IIdType { 
  id: string 
}

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

export enum ResultStatus {
  Success = 'Success',
  NotFound = 'NotFound',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
  BadRequest = 'BadRequest'
}

export interface Result<T = null> {
  status: ResultStatus;
  errorMessage?: string;
  extensions?: [{ field: 'id', message: '' }]
  data: T
}