import { isAfter, parseISO } from "date-fns";

export function checkIsDateInFuture(date: Date | string) {
  const now = new Date(Date.now());
  const parsedDate = parseISO(date.toString());
  return isAfter(parsedDate, now); 
}