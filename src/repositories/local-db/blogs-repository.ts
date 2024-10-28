// import { getDB, setDB } from "../db/db";
// import { IBlogInput, IBlogView } from "../types/blogs";

// export const blogsRepository = {
//   getBlogs() {
//     return getDB().blogs;
//   },

//   createBlog(data: IBlogInput) {
//     const db = getDB();
//     const newBlog = {
//       id: String(db.blogs.length + 1),
//       name: data.name,
//       description: data.description,
//       websiteUrl: data.websiteUrl,
//     };

//     setDB({ blogs: [...db.blogs, newBlog] });
//     return this.mapToOutput(newBlog);
//   },

//   getBlogById(id: string) {
//     const blog = getDB().blogs.find(p => p.id === id);
//     return blog ? this.mapToOutput(blog) : null;
//   },

//   updateBlog(id: string, data: IBlogInput) {
//     const db = getDB();
//     const index = db.blogs.findIndex(p => p.id === id);
//     if (index !== -1) {
//       const updatedBlogs = [...db.blogs];
//       updatedBlogs[index] = {
//         ...updatedBlogs[index],
//         name: data.name,
//         description: data.description,
//         websiteUrl: data.websiteUrl,
//       };
//       setDB({ blogs: updatedBlogs });
//       return true;
//     } else {
//       return false;
//     }
//   },

//   deleteBlog(id: string) {
//     const db = getDB();
//     const updatedBlogs = db.blogs.filter(blog => blog.id !== id);
//     if (updatedBlogs.length !== db.blogs.length) {
//       setDB({ blogs: updatedBlogs });
//       return true;
//     }
//     return false;
//   },

//   find(id: string) {
//     const db = getDB();
//     return db.blogs.find(b => b.id === id)
// },

//   mapToOutput(blog: IBlogView): IBlogView {
//     return {
//       id: blog.id,
//       name: blog.name,
//       description: blog.description,
//       websiteUrl: blog.websiteUrl,
//     };
//   }
// }