import { IAdressesInput } from "./adresses";
import { IProductInput } from "./products";

export type FieldNamesType = 
  keyof IAdressesInput | 
  keyof IProductInput 