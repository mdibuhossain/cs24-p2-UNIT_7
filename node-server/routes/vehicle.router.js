import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { vehicleController } from "../controllers/vehicle.controller.js";

const vehicleRouter = Router();

vehicleRouter.get("/", authMiddleware, vehicleController.getVehicles);
vehicleRouter.get("/sts-records", authMiddleware, vehicleController.getAllStsRecords);
vehicleRouter.get("/dump-records", authMiddleware, vehicleController.getAllDumpRecords);
vehicleRouter.get("/landfills/:lid/dump-records", authMiddleware, vehicleController.getSingleDumpRecords);
vehicleRouter.get("/sts/:sid/sts-records", authMiddleware, vehicleController.getSingleStsRecords);
// vehicleRouter.get("/:vid", authMiddleware, vehicleController.getVehicle);
vehicleRouter.post("/", authMiddleware, vehicleController.createVehicle);
vehicleRouter.post("/sts-records", authMiddleware, vehicleController.createStsRecord);
vehicleRouter.post("/dump-records", authMiddleware, vehicleController.createDumpRecord);

export default vehicleRouter;

