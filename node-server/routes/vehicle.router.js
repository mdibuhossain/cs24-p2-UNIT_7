import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { vehicleController } from "../controllers/vehicle.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const vehicleRouter = Router();

vehicleRouter.get("/", authMiddleware, vehicleController.getVehicles);
vehicleRouter.get("/sts-records", authMiddleware, roleMiddleware.isAdmin, vehicleController.getAllStsRecords);
vehicleRouter.get("/dump-records", authMiddleware, roleMiddleware.isAdmin, vehicleController.getAllDumpRecords);
vehicleRouter.get("/landfills/:lid/dump-records", authMiddleware, roleMiddleware.isLandfillManager,vehicleController.getSingleDumpRecords);
vehicleRouter.get("/sts/:sid/sts-records", authMiddleware, roleMiddleware.isSTSManager, vehicleController.getSingleStsRecords);
// vehicleRouter.get("/:vid", authMiddleware, vehicleController.getVehicle);
vehicleRouter.post("/", authMiddleware, roleMiddleware.isAdmin, vehicleController.createVehicle);
vehicleRouter.post("/sts-records", authMiddleware, roleMiddleware.isSTSManager, vehicleController.createStsRecord);
vehicleRouter.post("/dump-records", authMiddleware, roleMiddleware.isLandfillManager, vehicleController.createDumpRecord);

export default vehicleRouter;

