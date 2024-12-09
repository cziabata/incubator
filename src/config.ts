import { config } from 'dotenv';
config()

const PATH = {
  HOMETASK_API: '/hometask/api'
}

export const SETTINGS = {

  PORT: process.env.PORT || 3000,
  ADMIN_AUTH: 'admin:qwerty',
  MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
  DB_NAME: process.env.DB_NAME || "incubator",
  AC_SECRET: process.env.AC_SECRET as string,
  AC_TIME: process.env.AC_TIME as string,
  RT_SECRET: process.env.RT_SECRET,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  TO_EMAIL: process.env.TO_EMAIL,

  PATH: {

    AUTH: `${PATH.HOMETASK_API}/auth`,

    CLEAR_ALL: `${PATH.HOMETASK_API}/testing/all-data`,

    POSTS: `${PATH.HOMETASK_API}/posts`,
    BLOGS:  `${PATH.HOMETASK_API}/blogs`,
    USERS: `${PATH.HOMETASK_API}/users`,
    COMMENTS: `${PATH.HOMETASK_API}/comments`,
    
    PRODUCTS: '/products',
    ADRESSES: '/adresses',
    
  },

}