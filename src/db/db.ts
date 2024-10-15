import { IAdressesDB } from "../types/adresses"
import { IProductsDB } from "../types/products"

export type DBType = { 
  products: IProductsDB[]
  adresses: IAdressesDB[]
}

export const db: DBType = {
  products: [{id: 0, title: 'tomato'}, {id: 1, title: 'orange'}],
  adresses: [{id: 0, title: 'adress 1'}, {id: 1, title: 'street 2'}]
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
      db.products = []
      db.adresses = []
      // db.some = []
      return
  }

  // если что-то передано - то заменяем старые значения новыми
  db.products = dataset.products || db.products
  db.adresses = dataset.adresses || db.adresses
  // db.some = dataset.some || db.some
}