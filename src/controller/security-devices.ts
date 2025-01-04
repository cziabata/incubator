import { sessionsQueryRepository } from "../query-repositories/sessionsQueryRepository";
import { Request, Response } from "express";

export const getAllActiveDevicesController = async (req: Request, res: Response) => {
  
  const userId = req.user?.id as string;

  const activeDevices = await sessionsQueryRepository.getAllActiveDevices(userId);
  res.status(200).send(activeDevices);
  return;
}