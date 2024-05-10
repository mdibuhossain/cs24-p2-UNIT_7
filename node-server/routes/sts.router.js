import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { stsController } from "../controllers/sts.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const stsRouter = Router();

stsRouter.get("/", authMiddleware, stsController.getAllSts);
stsRouter.get("/managers", authMiddleware, roleMiddleware.isAdmin, stsController.getManagers);
stsRouter.get("/:sid", authMiddleware, stsController.getSingleSts);
stsRouter.post("/", authMiddleware, stsController.createSts);
stsRouter.delete("/:sid", authMiddleware, stsController.deleteSts);
stsRouter.put("/managers", authMiddleware, roleMiddleware.isAdmin, stsController.assignManager);
stsRouter.post("/third-party-to-sts", authMiddleware, stsController.createEntryThirdPartyToSTS);



export default stsRouter;
