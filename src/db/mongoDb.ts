import { Collection, MongoClient, ServerApiVersion }from 'mongodb';
import * as dotenv from "dotenv";
import { SETTINGS } from '../config';
import { IBlogView } from '../@types/blogs';
import { IPostView } from '../@types/posts';
import { IUserDB } from '../@types/users';
dotenv.config();

export let blogsCollection: Collection<IBlogView>;
export let postsCollection: Collection<IPostView>;
export let usersCollection: Collection<IUserDB>;

export async function runDb(url: string ) {

  let client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
  let db = client.db(SETTINGS.DB_NAME);

  blogsCollection = db.collection<IBlogView>("blogs");
  postsCollection = db.collection<IPostView>("posts");
  usersCollection = db.collection<IUserDB>("users");

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return true;
  } catch(e) {
    console.log(e);
    await client.close();
    return false
  }
}
