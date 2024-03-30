import prisma from "../db/db.config.js";

export class dashboardController {
  static async getTotalWasteCollection(req, res) {
    try {
      const stsWaste = await prisma.sts_vehicle_record.aggregate({
        _sum: {
          waste: true,
        },
      });
      const dumpWaste = await prisma.dump_record.aggregate({
        _sum: {
          weight: true,
        },
      });
      const wasteTransferredFromSts = stsWaste._sum.waste || 0;
      const wasteReceivedFromSts = dumpWaste._sum.weight || 0;
      const numberOfVehiclesLeavingSts =
        await prisma.sts_vehicle_record.count();
      const numberOfVehiclesEnterLandfill = await prisma.dump_record.count();

      const stsList = await prisma.sts.findMany({
        include: {
          sts_vehicle_record: {
            select: {
              waste: true,
            },
          },
        },
      });
      const eachStsVehicleRecord = stsList.map((sts) => {
        const totalWaste = sts.sts_vehicle_record.reduce(
          (acc, curr) => acc + curr.waste,
          0
        );
        return {
          id: sts.id,
          ward: sts.ward,
          totalWaste: totalWaste,
          totalVehicle: sts.sts_vehicle_record.length,
        };
      });

      const landfillList = await prisma.landfill.findMany({
        include: {
          dump_records: {
            select: {
              weight: true,
            },
          },
        },
      });

      const eachLandfillDumpRecord = landfillList.map((landfill) => {
        const totalWeight = landfill.dump_records.reduce(
          (acc, curr) => acc + curr.weight,
          0
        );
        return {
          id: landfill.id,
          totalWeight: totalWeight,
          totalVehicle: landfill.dump_records.length,
        };
      });

      res.status(200).json({
        overview: {
          total_sts_waste: wasteTransferredFromSts,
          total_dump_waste: wasteReceivedFromSts,
          total_vehicles_leaving_sts: numberOfVehiclesLeavingSts,
          total_vehicles_enter_landfill: numberOfVehiclesEnterLandfill,
        },
        eachStsVehicleRecord,
        eachLandfillDumpRecord,
      });
    } catch (error) {
      return res.status(400).json({ errors: error.messages });
    }
  }
}
