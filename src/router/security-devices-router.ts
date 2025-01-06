import { Router } from "express";
import { deleteActiveSessionByIdController, deleteAllActiveSessionsController, getAllActiveDevicesController } from "../controller/security-devices";
import { refreshTokenGuard } from "../middlewares/guards/refresh.token.guard";

export const securityDevicesRouter = Router();

securityDevicesRouter.get("/devices", refreshTokenGuard, getAllActiveDevicesController);
securityDevicesRouter.delete("/devices", refreshTokenGuard, deleteAllActiveSessionsController);
securityDevicesRouter.delete("/devices/:deviceId", refreshTokenGuard, deleteActiveSessionByIdController);

