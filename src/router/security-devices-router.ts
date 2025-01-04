import { Router } from "express";
import { getAllActiveDevicesController } from "../controller/security-devices";
import { refreshTokenGuard } from "../middlewares/guards/refresh.token.guard";

export const securityDevicesRouter = Router();

securityDevicesRouter.get("/devices", refreshTokenGuard, getAllActiveDevicesController);

