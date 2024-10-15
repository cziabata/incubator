import {config} from 'dotenv'
config()
 
export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    PATH: {
        POSTS: '/posts',
        BLOGS: '/blogs',
        PRODUCTS: '/products',
        ADRESSES: '/adresses',
    },
}