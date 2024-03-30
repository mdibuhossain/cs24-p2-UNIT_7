import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { vehicleController } from "../controllers/vehicle.controller.js";

const vehicleRouter = Router();

vehicleRouter.get("/", authMiddleware, vehicleController.getVehicles);
vehicleRouter.get("/sts-records", authMiddleware, vehicleController.getStsRecords);
vehicleRouter.get("/:vid", authMiddleware, vehicleController.getVehicle);
vehicleRouter.post("/", authMiddleware, vehicleController.createVehicle);
vehicleRouter.post("/sts-records", authMiddleware, vehicleController.createStsRecord);
vehicleRouter.post("/dump-record", authMiddleware, vehicleController.createDumpRecord);

export default vehicleRouter;

