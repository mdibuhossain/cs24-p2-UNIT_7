import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", usersController.getUsers);
userRouter.get("/:uid", usersController.getUser);
userRouter.get("/roles", usersController.getRoles);

userRouter.post("/", usersController.createUser);

userRouter.put("/:uid", usersController.updateUser);
userRouter.put("/:uid/roles", usersController.assignRole);

userRouter.delete("/:uid", usersController.deleteUser);

export default userRouter;
