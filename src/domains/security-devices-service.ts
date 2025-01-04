import { securityDevicesRepository } from "../repositories/mongo/security-devices-repository"

export const securityDevicesService = {
  async deleteAllActiveSessions(userId: string): Promise<boolean> {
    const result = await securityDevicesRepository.deleteAllActiveSessions(userId);
    return result;
  }
}