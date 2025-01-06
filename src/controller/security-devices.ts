import { securityDevicesService } from "../domains/security-devices-service";
import { sessionsQueryRepository } from "../query-repositories/sessionsQueryRepository";
import { Request, Response } from "express";

export const getAllActiveDevicesController = async (req: Request, res: Response) => {

  const userId = req.user?.id as string;

  const activeDevices = await sessionsQueryRepository.getAllActiveDevices(userId);
  res.status(200).send(activeDevices);
  return;
}

export const deleteAllActiveSessionsController = async (req: Request, res: Response) => {

  const success = await securityDevicesService.deleteAllActiveSessions(req);
  if(success) {
    res.send(204);
  } else {
    res.send(400);
  }
  return;
}

export const deleteActiveSessionByIdController = async (req: Request, res: Response) => {
  
  const userId = req.user?.id as string;
  const deviceId = req.params.deviceId as string;

  const status = await securityDevicesService.deleteActiveSessionById(deviceId, userId);
  res.send(status);
  return;
}