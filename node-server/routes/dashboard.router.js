import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controlller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const dashboardRouter = Router();

dashboardRouter.get("/total-waste-collection", authMiddleware, roleMiddleware.isAdmin, dashboardController.getTotalWasteCollection);


export default dashboardRouter;
