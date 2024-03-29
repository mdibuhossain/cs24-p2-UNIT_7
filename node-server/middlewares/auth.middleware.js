import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../db/db.config.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["token"];
  console.log(token);
  if (token === null || token === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const findUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { Landfill: true, Sts: true },
    });
    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized" });
    } else if (findUser.role === "UNASSIGNED") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not assigned any role." });
    }
    req.user = findUser;
    next();
  });
};
