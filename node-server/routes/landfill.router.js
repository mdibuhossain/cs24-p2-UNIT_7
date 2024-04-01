import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { landfillController } from "../controllers/landfill.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const landfillRouter = Router();

landfillRouter.get("/", authMiddleware, landfillController.getAllLandfills);
landfillRouter.get("/managers", authMiddleware, roleMiddleware.isAdmin, landfillController.getManagers);
landfillRouter.get("/:lid", authMiddleware, landfillController.getSingleLandfill);
landfillRouter.post("/", authMiddleware, roleMiddleware.isAdmin, landfillController.createLandfill);
landfillRouter.put("/managers", authMiddleware, roleMiddleware.isAdmin, landfillController.assignManager);


export default landfillRouter;
