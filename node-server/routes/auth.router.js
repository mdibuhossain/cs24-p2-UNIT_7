import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authMiddleware, authController.logout);
// TODO: Add the reset password routes
authRouter.post("/reset-password/initiate", authController.resetPasswordInitiate);
// TODO: Add the reset password confirm route
authRouter.post("/reset-password/confirm", authController.resetPasswordConfirm);
authRouter.put("/change-password", authMiddleware, authController.changePassword);

export default authRouter;
