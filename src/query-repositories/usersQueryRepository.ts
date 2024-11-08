import { ObjectId, WithId } from "mongodb";
import { ISearchUsersValues, IUsersDto, IUserView } from "../@types/users";
import { usersCollection } from "../db/mongoDb";

export const usersQueryRepository = {

  async getUsers(query: ISearchUsersValues): Promise<IUsersDto> {
    
    const { pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm } = query;

    const filter: any = {};

    if (searchLoginTerm) {
      filter.login = { $regex: searchLoginTerm, $options: "i" }
    }
    if (searchEmailTerm) {
      filter.email = { $regex: searchLoginTerm, $options: "i" }
    }

    const totalCount = await usersCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const users = await usersCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return {
      items: users.map(p => this._mapToOutput(p)),
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
    }
  },

  async getUserById(id: string): Promise<IUserView | null> {
    if (!this._checkObjectId(id)) return null;
    const user = await usersCollection.findOne({_id: new ObjectId(id)});
    return user ? this._mapToOutput(user) : null;
},

  _mapToOutput(user: WithId<IUserView>): IUserView {
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  },
  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
}
}