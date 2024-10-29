import { IAdressView } from "../@types/adresses"
import { IBlogView } from "../@types/blogs"
import { IPostView } from "../@types/posts"
import { IProductView } from "../@types/products"

export type DBType = { 
  products: IProductView[]
  adresses: IAdressView[]
  blogs: IBlogView[]
  posts: IPostView[]
}

export const db: DBType = {
  products: [{id: 0, title: 'tomato'}, {id: 1, title: 'orange'}],
  adresses: [{id: 0, title: 'adress 1'}, {id: 1, title: 'street 2'}],
  blogs: [],
  posts: [],
}

export const getDB = (): DBType => db;

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
      db.products = []
      db.adresses = []
      db.blogs = []
      db.posts = []
      // db.some = []
      return
  }

  // если что-то передано - то заменяем старые значения новыми
  db.products = dataset.products || db.products
  db.adresses = dataset.adresses || db.adresses
  db.blogs = dataset.blogs || db.blogs
  db.posts = dataset.posts || db.posts
  // db.some = dataset.some || db.some
}