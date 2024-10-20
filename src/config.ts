import { config } from 'dotenv'
config()

const PATH = {
  HT_02: '/ht_02/api'
}

export const SETTINGS = {
  PORT: process.env.PORT || 3000,
  ADMIN_AUTH: 'admin:qwerty',
  PATH: {
    POSTS: `${PATH.HT_02}/posts`,
    BLOGS:  `${PATH.HT_02}/blogs`,
    PRODUCTS: '/products',
    ADRESSES: '/adresses',
    CLEAR_ALL_02: `${PATH.HT_02}/testing/all-data`,
  },
}