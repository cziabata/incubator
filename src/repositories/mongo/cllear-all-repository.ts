import { blogsCollection, commentsCollection, postsCollection, usersCollection } from "../../db/mongoDb";

export const clearAllRepository = {
  async deleteAll() {
    try {
      await blogsCollection.deleteMany({});
      await postsCollection.deleteMany({});
      await usersCollection.deleteMany({});
      await commentsCollection.deleteMany({});
      console.log("All collections have been cleared.");
    } catch (e) {
      console.log("Error while clearing collections:", e);
    }
  },
}