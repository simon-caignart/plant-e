import prisma from "../../../lib/prisma";
import { PlantLogCreateInput } from "./../../../types/PlantLogCreateInput";

// POST /api/plantLog
export default async function handle(req, res) {
  const plantLog: PlantLogCreateInput = req.body;

  // TODO: do computation on plantLog to determine if plant needs water
  const needToWater = true;

  const result = await prisma.plantLog.create({
    data: {
      humidity: plantLog.humidity,
      luminosity: plantLog.luminosity,
      soilMoisture: plantLog.soilMoisture,
      waterLevelToLow: plantLog.waterLevelToLow,
      temperature: plantLog.temperature,
      wasWatered: needToWater,
      plant: { connect: { id: plantLog.plantId } },
    },
  });

  res.json(result);
}
