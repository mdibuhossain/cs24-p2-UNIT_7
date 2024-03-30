import prisma from "../db/db.config.js";

export class landfillController {
  static async getAllLandfills(req, res) {
    try {
      const landfills = await prisma.landfill.findMany();
      return res.status(200).json(landfills);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getSingleLandfill(req, res) {
    try {
      const { lid } = req.params;
      const landfill = await prisma.landfill.findUnique({
        where: {
          id: Number(lid),
        },
      });
      return res.status(200).json(landfill);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createLandfill(req, res) {
    try {
      const payload = req.body;
      const landfill = await prisma.landfill.create({
        data: payload,
      });
      return res.status(201).json(landfill);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async assignManager(req, res) {
    try {
      const { uid, lid } = req.body;
      const findUser = await prisma.user.findUnique({
        where: { id: Number(uid) },
        include: { Landfill: true, Sts: true },
      });
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updateUser = await prisma.user.update({
        where: { id: Number(uid) },
        data: {
          landfillId: Number(lid) > -1 ? Number(lid) : null,
          role: Number(lid) > -1 ? "LANDFILL_MANAGER" : "UNASSIGNED",
        },
      });
      if (Number(lid) === -1) {
        return res.status(201).json({ message: "Successfully unassigned." });
      }
      return res.status(201).json({ message: "Successfully assigned." });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getManagers(req, res) {
    try {
      const managers = await prisma.landfill.findMany({
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
