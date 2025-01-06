import { Request } from "express";
import { sessionsQueryRepository } from "../query-repositories/sessionsQueryRepository";
import { securityDevicesRepository } from "../repositories/mongo/security-devices-repository"
import { ISession } from "../@types/auth";

export const securityDevicesService = {
  async deleteAllActiveSessions(req: Request): Promise<boolean> {

    const userId = req.user?.id as string;
    const deviceId = req.session?.deviceId as string;

    const result = await securityDevicesRepository.deleteAllActiveSessions(userId, deviceId);
    return result;
  },
  async deleteActiveSessionById(deviceId: string, userId: string): Promise<number> {
    const isSessionsExists = await sessionsQueryRepository.getActiveDeviceById(deviceId);
    if (!isSessionsExists) {
      return 404;
    }
    const isUserHasSuchDevice = await securityDevicesRepository.checkIfUserHasSuchDevice(userId, deviceId);
    if (!isUserHasSuchDevice) {
      return 403;
    }
    const result = await securityDevicesRepository.deleteActiveSessionByDeviceId(userId, deviceId);
    if (!result) {
      return 500;
    }
    return 204;
  },
  async createSession(newSession: ISession): Promise<boolean> {
    const result = await securityDevicesRepository.createSession(newSession);
    return result;
  },
  async updateSession(device_id: string, updates: Partial<ISession>): Promise<boolean> {
    const result = await securityDevicesRepository.updateSession(device_id, updates);
    return result;
  },
}