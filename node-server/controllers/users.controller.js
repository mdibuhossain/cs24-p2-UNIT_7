import prisma from "../db/db.config.js";
import { encryptPass } from "../utils/utils.js";

export class usersController {
  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          photo: true,
          role: true,
          createdAt: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
  static async getUser(req, res) {
    try {
      const { uid } = req.params;
      const findUser = await prisma.user.findUnique({
        where: { id: parseInt(uid) },
      });
      if (!findUser) {
        return res.status(404).json({ errors: "User not found" });
      }
      res.status(200).json(findUser);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name: name || "",
          email,
          password: encryptPass(password),
          role: role || "UNASSIGNED",
        },
      });
      const { password: pass, ...rest } = newUser;
      res.status(201).json(rest);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { uid } = req.params;
      const { name, email, password, role } = req.body;
      const currentUser = req.user;
      if (currentUser.role === "SYSTEM_ADMIN") {
        const findUser = await prisma.user.findUnique({
          where: { id: parseInt(uid) },
        });
        if (!findUser) {
          return res.status(404).json({ errors: "User not found" });
        }
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(uid) },
          data: {
            name: name?.length > 0 ? name : findUser.name,
            email: email?.length > 0 ? email : findUser.email,
            password:
              password?.length > 0 ? encryptPass(password) : findUser.password,
            role: role?.length > 0 ? role : findUser.role,
          },
        });
        const { password: pass, ...rest } = updatedUser;
        res.status(201).json(rest);
      } else if (currentUser.id === parseInt(uid)) {
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(uid) },
          data: {
            name: name?.length > 0 ? name : findUser.name,
          },
        });
        const { password: pass, ...rest } = updatedUser;
        res.status(201).json(rest);
      }
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { uid } = req.params;
      const findUser = await prisma.user.findUnique({
        where: { id: parseInt(uid) },
      });
      if (!findUser) {
        return res.status(404).json({ errors: "User not found" });
      }
      await prisma.user.delete({ where: { id: parseInt(uid) } });
      res.status(204).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }

  static async getRoles(req, res) {
    // This is a placeholder for the getRoles function
    res.send("Get Roles route");
  }
  
  static async assignRole(req, res) {
    // This is a placeholder for the assignRole function
    res.send("Assign Role route");
  }
}
