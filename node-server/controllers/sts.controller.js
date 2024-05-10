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
      console.log(payload);
      const sts = await prisma.sts.create({
        data: {
          ward: payload.ward,
          capacity: payload.capacity,
          lastHour: payload.lastHour + ":00",
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
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
  static async generateBills(req, res) {
    const payload = req.body;
    try {
      const findSts = await prisma.sts.findUnique({
        where: {
          id: parseInt(payload.stsId),
        },
      });
      const datePart = payload.date.toString();
      const startingDateTime = datePart + " 00:00:00";
      // const endingDateTime = datePart + " " + findSts.lastHour;
      const endingDateTime = datePart + " 23:59:59";
      console.log(startingDateTime, endingDateTime);
      const weightReceived = await prisma.sts_receives.findMany({
        where: {
          stsId: parseInt(payload.stsId),
          contractorId: payload.contractorId,
          arrival_time: {
            gte: new Date(startingDateTime),
            lte: new Date(endingDateTime),
          },
        },
        select: {
          waste: true,
        },
      });
      const thirdParty = await prisma.contractor.findUnique({
        where: {
          id: parseInt(payload.contractorId),
        },
      });
      const totalWasteReceived =
        weightReceived.reduce((acc, curr) => {
          return acc + curr.waste;
        }, 0) / 1000.0;
      const requireWaste = thirdParty.requiredWasteAmount;
      const paymentPerTon = thirdParty.paymentPerTon;
      const basicPay = totalWasteReceived * paymentPerTon;
      const deficit = Math.max(0, requireWaste - totalWasteReceived);
      const fine = deficit * paymentPerTon;
      const totalBill = basicPay - fine;
      console.log(
        totalWasteReceived,
        requireWaste,
        paymentPerTon,
        basicPay,
        deficit,
        fine,
        totalBill
      );
      return res.status(200).json({
        totalWasteReceived,
        requireWaste,
        paymentPerTon,
        basicPay,
        deficit,
        fine,
        totalBill,
      });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}
