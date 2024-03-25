import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/reset-password/initiate",authController.resetPasswordInitiate);
authRouter.post("/reset-password/confirm", authController.resetPasswordConfirm);
authRouter.put("/change-password", authController.changePassword);

export default authRouter;
