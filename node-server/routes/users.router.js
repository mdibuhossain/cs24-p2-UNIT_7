import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, roleMiddleware.isAdmin, usersController.getUsers);
userRouter.get("/roles", authMiddleware, roleMiddleware.isAdmin, usersController.getRoles);
userRouter.get("/:uid", authMiddleware, roleMiddleware.isAdmin, usersController.getUser);
userRouter.post("/", authMiddleware, roleMiddleware.isAdmin, usersController.createUser);
userRouter.put("/:uid", authMiddleware, usersController.updateUser);
userRouter.put("/:uid/roles", authMiddleware, roleMiddleware.isAdmin, usersController.assignRole);
userRouter.delete("/:uid", authMiddleware, roleMiddleware.isAdmin, usersController.deleteUser);

export default userRouter;
