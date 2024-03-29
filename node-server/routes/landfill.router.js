import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { landfillController } from "../controllers/landfill.controller.js";

const landfillRouter = Router();

landfillRouter.get("/", authMiddleware, landfillController.getAllLandfills);
landfillRouter.get("/:lid", authMiddleware, landfillController.getSingleLandfill);
landfillRouter.post("/", authMiddleware, landfillController.createLandfill);
landfillRouter.get("/managers", authMiddleware, landfillController.getManagers);


export default landfillRouter;
