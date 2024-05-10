import { Router } from "express";
import { WorkforceController } from "../controllers/workforce.controller.js";

const workforceRouter = Router();

workforceRouter.post("/", WorkforceController.registerWorkforce);
workforceRouter.get("/", WorkforceController.getWorkforces);
workforceRouter.get("/:wid", WorkforceController.getSingleWorkforce);

export default workforceRouter;
