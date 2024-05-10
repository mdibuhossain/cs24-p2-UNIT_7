import prisma from "../db/db.config.js";

export class WorkforceController {
  static async registerWorkforce(req, res) {
    const payload = req.body;
    try {
      const newWorkforce = await prisma.workforce.create({
        data: {
          name: payload.name,
          dateOfBirth: payload.dateOfBirth,
          dateOfHire: payload.dateOfHire,
          jobTitle: payload.jobTitle,
          paymentRatePerHour: payload.paymentRatePerHour,
          contact: payload.contact,
          collectionRoute: payload.collectionRoute,
          contractorManagerId: payload.contractorManagerId,
        },
      });
      return res.status(201).json(newWorkforce);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getSingleWorkforce(req, res) {
    try {
      const { wid } = req.params;
      const workforce = await prisma.workforce.findUnique({
        where: {
          id: Number(wid),
        },
      });
      return res.status(200).json(workforce);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getWorkforces(req, res) {
    try {
      const workforces = await prisma.workforce.findMany();
      return res.status(200).json(workforces);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
