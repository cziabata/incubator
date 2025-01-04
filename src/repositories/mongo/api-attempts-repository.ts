import { IApiAttempt } from "../../@types/shared";
import { apiAttemptsCollection } from "../../db/mongoDb";

export const apiAttemptsRepository = {
  async registerAttempt(values: IApiAttempt): Promise<boolean> {
    const result = await apiAttemptsCollection.insertOne(values);
    return result.acknowledged;
  }
}