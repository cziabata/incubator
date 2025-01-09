import { WithId } from "mongodb";
import { sessionsCollection } from "../db/mongoDb";
import { IActiveDevice, ISession } from "../@types/auth";

export const sessionsQueryRepository = {
  async getAllActiveDevices(userId: string): Promise<IActiveDevice[]> {

    const sessions = await sessionsCollection.find({ user_id: userId }).toArray();
    const activeSessions = sessions.filter(session => session.exp.getTime() > Date.now());
    return activeSessions.map(s => this._mapToOutput(s));
  },

  async getActiveDeviceById(deviceId: string): Promise<IActiveDevice | null> {
    const session = await sessionsCollection.findOne({ device_id: deviceId });
    if (!session) {
      return null;
    }
    return this._mapToOutput(session);
  },

  async getActiveDeviceByIatAndUserId(iat: string, userId: string): Promise<WithId<ISession> | null> {
    const session = await sessionsCollection.findOne({ iat, user_id: userId });
    if (!session) {
      return null;
    }
    return session;
  },

  _mapToOutput(session: WithId<ISession>): IActiveDevice {
      return {
        ip: session.ip,
        title: session.device_name,
        lastActiveDate: session.iat,
        deviceId: session.device_id,
      };
    },
}