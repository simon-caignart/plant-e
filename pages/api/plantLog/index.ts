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
    if (lastPlantLog.needToWater) {
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

    const lastWatered = await prisma.plantLog.findFirst({
      where: {
        plantId: plantLog.plantId,
        wasWatered: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const lastTimeWatered = new Date(lastWatered.createdAt);
    const now = new Date();

    const diff = now.getTime() - lastTimeWatered.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDays > plant.wateringFrequency) {
      needToWater = true;
    }
  }

  await prisma.plantLog.create({
    data: {
      humidity: plantLog.humidity,
      luminosity: plantLog.luminosity,
      soilMoisture: plantLog.soilMoisture,
      waterLevelToLow: plantLog.waterLevelToLow,
      temperature: plantLog.temperature,
      wasWatered: needToWater,
      needToWater: false,
      plant: { connect: { id: plantLog.plantId } },
    },
  });

  res.json({
    message: "Plant log created",
    needToWater: needToWater,
    waterQuantity: plant.waterQuantity,
  });
}
