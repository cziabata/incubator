import { blogsCollection, postsCollection, usersCollection } from "../../db/mongoDb";

export const clearAllRepository = {
  async deleteAll() {
    try {
      await blogsCollection.deleteMany({});
      await postsCollection.deleteMany({});
      await usersCollection.deleteMany({});
      console.log("Both collections have been cleared.");
    } catch (e) {
      console.log("Error while clearing collections:", e);
    }
  },
}