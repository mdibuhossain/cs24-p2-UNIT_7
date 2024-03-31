import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { stsController } from "../controllers/sts.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const stsRouter = Router();

stsRouter.get("/", authMiddleware, roleMiddleware.isAdmin, stsController.getAllSts);
stsRouter.get("/managers", authMiddleware, roleMiddleware.isAdmin, stsController.getManagers);
stsRouter.get("/:sid", authMiddleware, stsController.getSingleSts);
stsRouter.post("/", authMiddleware, stsController.createSts);
stsRouter.put("/managers", authMiddleware, roleMiddleware.isAdmin, stsController.assignManager);

export default stsRouter;
