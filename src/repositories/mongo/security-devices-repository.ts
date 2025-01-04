import { sessionsCollection } from "../../db/mongoDb";

export const securityDevicesRepository = {
  async deleteAllActiveSessions(userId: string): Promise<boolean> {
    const result = await sessionsCollection.deleteMany({ user_id: userId });
    return result.acknowledged;
  }
}