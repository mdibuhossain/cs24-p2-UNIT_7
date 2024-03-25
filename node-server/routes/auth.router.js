import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", authMiddleware, authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.post("/reset-password/initiate", authMiddleware, authController.resetPasswordInitiate);
authRouter.post("/reset-password/confirm", authMiddleware, authController.resetPasswordConfirm);
authRouter.put("/change-password", authMiddleware, authController.changePassword);

export default authRouter;
