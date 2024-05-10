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
  static async deleteSts(req, res) {
    try {
      const { sid } = req.params;
      const sts = await prisma.sts.delete({
        where: {
          id: Number(sid),
        },
      });
      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async assignManager(req, res) {
    try {
      const { uid, sid } = req.body;
      const findUser = await prisma.user.findUnique({
        where: { id: Number(uid) },
        include: { Landfill: true, Sts: true, Contractor: true },
      });
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updateUser = await prisma.user.update({
        where: { id: Number(uid) },
        data: {
          stsId: Number(sid) > -1 ? Number(sid) : null,
          role: Number(sid) > -1 ? "STS_MANAGER" : "UNASSIGNED",
        },
      });
      if (Number(sid) === -1) {
        return res.status(201).json({ message: "Successfully unassigned." });
      }
      return res.status(201).json({ message: "Successfully assigned." });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getManagers(req, res) {
    try {
      const managers = await prisma.sts.findMany({
        select: {
          id: true,
          ward: true,
          managers: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      return res.status(200).json(managers);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createEntryThirdPartyToSTS(req, res) {
    try {
      const payload = req.body;
      const newEntry = await prisma.sts_receives.create({
        data: {
          arrival_time: payload.arrival_time,
          waste: payload.waste,
          stsId: payload.stsId,
          vehicleType: payload.vehicleType,
          typeOfWaste: payload.typeOfWaste,
          contractorId: payload.contractorId,
        },
      });
      return res.status(201).json(newEntry);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}
