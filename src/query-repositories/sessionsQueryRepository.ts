import { WithId } from "mongodb";
import { sessionsCollection } from "../db/mongoDb";
import { IActiveDevice, ISession } from "../@types/auth";

export const sessionsQueryRepository = {
  async getAllActiveDevices(userId: string): Promise<IActiveDevice[]> {

    const sessions = await sessionsCollection.find({ user_id: userId }).toArray();
    return sessions.map(s => this._mapToOutput(s));
  },

  _mapToOutput(session: WithId<ISession>): IActiveDevice {
      return {
        ip: session.ip,
        title: session.device_name,
        lastActiveDate: session.iat.toString(),
        deviceId: session.device_id,
      };
    },
}