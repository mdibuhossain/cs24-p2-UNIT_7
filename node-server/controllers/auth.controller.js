import prisma from "../db/db.config.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";

export class authController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await prisma.user.findUnique({
        where: { email },
      });
      if (!findUser) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
      if (!bcrypt.compareSync(password, findUser.password)) {
        return res.status(400).json({ errors: "Invalid credentials" });
      } else {
        if (findUser.role === "UNASSIGNED") {
          return res.status(403).json({ errors: "Unauthorized" });
        } else {
          const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
          return res.status(200).json({ message: "Login successful" });
        }
      }
    } catch (error) {
      return res.status(400).json({ errors: error.messages });
    }
  }

  static async logout(req, res) {
    try {
      res.cookie("token", "", {
        maxAge: 1,
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ errors: error.messages });
    }
  }

  static async resetPasswordInitiate(req, res) {
    // This is a placeholder for the resetPasswordInitiate function
    res.send("Reset Password Initiate route");
  }
  static async resetPasswordConfirm(req, res) {
    // This is a placeholder for the resetPasswordConfirm function
    res.send("Reset Password Confirm route");
  }
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const findUser = req.user;
      if (!bcrypt.compareSync(oldPassword, findUser.password)) {
        return res.status(400).json({ errors: "Invalid credentials" });
      } else {
        const salt = bcrypt.genSaltSync(3);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        await prisma.user.update({
          where: { id: findUser.id },
          data: {
            password: hashedPassword,
          },
        });
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      }
    } catch (error) {
      return res.status(500).json({ errors: error.messages });
    }
  }
}