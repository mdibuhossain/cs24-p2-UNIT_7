import prisma from "../db/db.config.js";

export class vehicleController {
  static async getVehicles(req, res) {
    try {
      const findVehicles = await prisma.vehicle.findMany();
      return res.status(200).json(findVehicles);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getVehicle(req, res) {
    try {
      const { vid } = req.params;
      const findVehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(vid) },
      });
      return res.status(200).json(findVehicle);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createVehicle(req, res) {
    try {
      const payload = req.body;
      console.log(payload);
      const createVehicle = await prisma.vehicle.create({
        data: payload,
      });
      return res.status(201).json(createVehicle);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getAllStsRecords(req, res) {
    try {
      const findStsRecords = await prisma.sts_vehicle_record.findMany({
        include: { Vehicle: true, Sts: true },
      });
      return res.status(200).json(findStsRecords);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getSingleStsRecords(req, res) {
    try {
      const { sid } = req.params;
      const findStsRecords = await prisma.sts_vehicle_record.findMany({
        where: { stsId: parseInt(sid) },
        include: { Vehicle: true, Sts: true },
      });
      return res.status(200).json(findStsRecords);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createStsRecord(req, res) {
    try {
      const payload = req.body;
      const createStsRecord = await prisma.sts_vehicle_record.create({
        data: payload,
      });
      return res.status(201).json(createStsRecord);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async createDumpRecord(req, res) {
    try {
      const payload = req.body;
      const createDumpRecord = await prisma.dump_record.create({
        data: payload,
      });
      return res.status(201).json(createDumpRecord);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getAllDumpRecords(req, res) {
    try {
      const findDumpRecords = await prisma.dump_record.findMany({
        include: { Vehicle: true, Landfill: true, Sts: true },
      });
      return res.status(200).json(findDumpRecords);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
  static async getSingleDumpRecords(req, res) {
    try {
      const { lid } = req.params;
      const findDumpRecords = await prisma.dump_record.findMany({
        where: { landfillId: parseInt(lid) },
        include: { Vehicle: true, Landfill: true, Sts: true },
      });
      return res.status(200).json(findDumpRecords);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}
