import { config } from 'dotenv';
config()

const PATH = {
  HT_02: '/ht_02/api',
  HT_03: '/hometask_03/api'
}

export const SETTINGS = {
  PORT: process.env.PORT || 3000,
  ADMIN_AUTH: 'admin:qwerty',
  MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
  DB_NAME: process.env.DB_NAME || "incubator",
  PATH: {
    POSTS: `${PATH.HT_03}/posts`,
    BLOGS:  `${PATH.HT_03}/blogs`,
    USERS: `${PATH.HT_03}/users`,
    AUTH: `${PATH.HT_03}/auth`,
    PRODUCTS: '/products',
    ADRESSES: '/adresses',
    CLEAR_ALL_02: `${PATH.HT_03}/testing/all-data`,
  },
}