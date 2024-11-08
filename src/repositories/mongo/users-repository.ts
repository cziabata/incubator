import { ObjectId, WithId } from "mongodb";
import { IUserDB, IUserView } from "../../@types/users";
import { usersCollection } from "../../db/mongoDb";

export const usersRepository = {
  async createUser(newUser: IUserDB): Promise<string> {
    const createdUser = await usersCollection.insertOne(newUser);
    return createdUser.insertedId.toString();
  },

  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<IUserDB> | null> {
    return usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },

  async deleteUser(id: string): Promise<boolean> {
    if (!this._checkObjectId(id)) return false;
    const isDeleted = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return isDeleted.deletedCount === 1;
  },

  async findUserById(id: string): Promise<WithId<IUserDB> | null> {
    if (!this._checkObjectId(id)) return null;
    return usersCollection.findOne({ _id: new ObjectId(id) });
  },

  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id)
  },
}