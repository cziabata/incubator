import { refreshTokensBlackListCollection } from "../../db/mongoDb";

export const refreshTokenRepository = {
  async doesExist(token: string): Promise<boolean> {
    const result = await refreshTokensBlackListCollection.findOne({ token });
    return Boolean(result?.token);
  },
  async insertToken(token: string): Promise<boolean> {
    const result = await refreshTokensBlackListCollection.insertOne({ token });
    return result.acknowledged;
  },
}