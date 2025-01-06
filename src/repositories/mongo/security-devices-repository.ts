import { sessionsCollection } from "../../db/mongoDb";
import { ISession } from "../../@types/auth";

export const securityDevicesRepository = {
  async deleteAllActiveSessions(user_id: string, device_id: string): Promise<boolean> {
    const result = await sessionsCollection.deleteMany({ 
      user_id,
      device_id: { $ne: device_id }
     });
    return result.acknowledged;
  },
  async deleteActiveSessionByDeviceId(userId: string, deviceId: string): Promise<boolean> {
    const result = await sessionsCollection.deleteOne({ user_id: userId, device_id: deviceId });
    return result.acknowledged;
  },
  async checkIfUserHasSuchDevice(userId: string, deviceId: string): Promise<boolean> {
    const result = await sessionsCollection.findOne({ user_id: userId, device_id: deviceId });
    return !!result;
  },
  async createSession(newSession: ISession): Promise<boolean> {
    const result = await sessionsCollection.insertOne(newSession);
    return result.acknowledged;
  },
  async updateSession (device_id: string, updates: Partial<ISession>): Promise<boolean> {
    const result = await sessionsCollection.updateOne({ device_id }, { $set: updates });
    return result.acknowledged;
  },
}