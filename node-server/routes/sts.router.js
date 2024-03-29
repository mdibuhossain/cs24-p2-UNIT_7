import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { stsController } from "../controllers/sts.controller.js";

const stsRouter = Router();

stsRouter.get("/", authMiddleware, stsController.getAllSts);
stsRouter.get("/:sid", authMiddleware, stsController.getSingleSts);
stsRouter.get("/:sid", authMiddleware, stsController.getSingleSts);
stsRouter.get("/managers", authMiddleware, stsController.getManagers);
stsRouter.post("/", authMiddleware, stsController.createSts);
stsRouter.post("/managers", authMiddleware, stsController.assignManager);

export default stsRouter;
