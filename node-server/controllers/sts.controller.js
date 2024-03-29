import prisma from "../db/db.config.js";

export class stsController {
  static async getAllSts(req, res) {
    try {
      const sts = await prisma.sts.findMany();
      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getSingleSts(req, res) {
    try {
      const { sid } = req.params;
      const sts = await prisma.sts.findUnique({
        where: {
          id: Number(sid),
        },
      });
      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createSts(req, res) {
    try {
      const payload = req.body;
      const sts = await prisma.sts.create({
        data: payload,
      });
      return res.status(201).json(sts);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async assignManager(req, res) {
    try {
      const { uid, sid } = req.body;
      const findUser = await prisma.user.findUnique({
        where: {
          id: Number(uid),
        },
      });
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updateUser = await prisma.user.update({
        where: { id: Number(sid) },
        data: { stsId: Number(uid) },
      });
      return res.status(201).json({ message: "Successfully assigned." });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getManagers(req, res) {
    try {
      const managers = await prisma.sts.findMany({
        select: {
          manager: true,
        },
      });
      return res.status(200).json(managers);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}
