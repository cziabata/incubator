import { Collection, MongoClient, ServerApiVersion }from 'mongodb';
import * as dotenv from "dotenv";
import { SETTINGS } from '../config';
import { IBlogView } from '../@types/blogs';
import { IPostView } from '../@types/posts';
import { IUserDB } from '../@types/users';
import { ICommentDB } from '../@types/comments';
import { IUsedRefreshToken } from '../@types/auth';
import { IApiAttempt } from '../@types/shared';
dotenv.config();

export let blogsCollection: Collection<IBlogView>;
export let postsCollection: Collection<IPostView>;
export let usersCollection: Collection<IUserDB>;
export let commentsCollection: Collection<ICommentDB>;
export let refreshTokensBlackListCollection: Collection<IUsedRefreshToken>;
export let apiAttemptsCollection: Collection<IApiAttempt>;

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
  commentsCollection = db.collection<ICommentDB>("comments");
  refreshTokensBlackListCollection = db.collection<IUsedRefreshToken>("refreshTokensBlackList");
  apiAttemptsCollection = db.collection<IApiAttempt>("loginAttempts");

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
