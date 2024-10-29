import { SortDirection } from "mongodb";
import { IPaginationValues } from "../@types/shared";

export function getPaginationValues(query: any): IPaginationValues {

  const values = {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
  }

  return values
}