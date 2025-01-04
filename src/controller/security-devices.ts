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

  const userId = req.user?.id as string;

  const success = await securityDevicesService.deleteAllActiveSessions(userId);
  if(success) {
    res.send(204);
  } else {
    res.send(400);
  }
  return;
}