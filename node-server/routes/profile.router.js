import { Router } from "express";
import { profileController } from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/", profileController.getProfiles);
profileRouter.put("/", profileController.updateProfile);

export default profileRouter;
