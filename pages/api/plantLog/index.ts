import prisma from "../../../lib/prisma";
import { PlantLogCreateInput } from "./../../../types/PlantLogCreateInput";

// POST /api/plantLog
export default async function handle(req, res) {
  const plantLog: PlantLogCreateInput = req.body;

  let needToWater = false;

  // Check if the user asked to water a plant
  const lastPlantLog = await prisma.plantLog.findFirst({
    where: {
      plantId: plantLog.plantId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (lastPlantLog) {
    if (lastPlantLog.needToWater && !lastPlantLog.wasWatered) {
      needToWater = true;
    }
  }

  // get plant data
  const plant = await prisma.plant.findUnique({
    where: {
      id: plantLog.plantId,
    },
  });

  // Check if the plant needs to be watered
  if (plant) {
    if (plantLog.soilMoisture < plant.soilMoistureThreshold) {
      needToWater = true;
    }
  }

  const result = await prisma.plantLog.create({
    data: {
      humidity: plantLog.humidity,
      luminosity: plantLog.luminosity,
      soilMoisture: plantLog.soilMoisture,
      waterLevelToLow: plantLog.waterLevelToLow,
      temperature: plantLog.temperature,
      wasWatered: needToWater,
      needToWater: needToWater,
      plant: { connect: { id: plantLog.plantId } },
    },
  });

  res.json(result);
}
