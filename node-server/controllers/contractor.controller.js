import prisma from "../db/db.config.js";

export class ContractorController {
  static async registerContractor(req, res) {
    const payload = req.body;
    try {
      const newContractor = await prisma.contractor.create({
        data: {
          name: payload.name,
          contractId: parseInt(payload.contractId),
          registrationId: parseInt(payload.registrationId),
          tin: payload.tin,
          contact: payload.contact,
          area: payload.area,
          workforce: parseInt(payload.workforce),
          paymentPerTon: parseInt(payload.paymentPerTon),
          requiredWasteAmount: parseInt(payload.requiredWasteAmount),
          contractDuration: parseInt(payload.contractDuration),
          registrationDate: payload.registrationDate,
        },
      });
      return res.status(201).json(newContractor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getSingleContractor(req, res) {
    try {
      const { cid } = req.params;
      const contractor = await prisma.contractor.findUnique({
        where: {
          id: Number(cid),
        },
      });
      return res.status(200).json(contractor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getContractors(req, res) {
    try {
      const contractors = await prisma.contractor.findMany();
      return res.status(200).json(contractors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async assignManager(req, res) {
    try {
      const { uid, cid } = req.body;
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
          contractorId: Number(cid) > -1 ? Number(cid) : null,
          role: Number(cid) > -1 ? "CONTRACTOR_MANAGER" : "UNASSIGNED",
        },
      });
      if (Number(cid) === -1) {
        return res.status(201).json({ message: "Successfully unassigned." });
      }
      return res.status(201).json({ message: "Successfully assigned." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async createCollectionPlan(req, res) {
    try {
      const payload = req.body;
      const createCollectionPlan = await prisma.collection_plan.create({
        data: {
          area: payload.area,
          collectionStart: payload.collectionStart,
          duration: parseInt(payload.duration),
          numberOfLabour: parseInt(payload.numberOfLabour),
          numberofVans: parseInt(payload.numberofVans),
          expectedWaste: parseInt(payload.expectedWaste),
          contractorId: parseInt(payload.contractorId),
        },
      });
      return res.status(201).json(createCollectionPlan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
