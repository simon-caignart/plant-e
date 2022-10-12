import prisma from "../../../lib/prisma";

export type WaterPlantInput = {
  plantId: string;
};

// POST /api/waterPlant
export default async function handle(req, res) {
  const waterPlant: WaterPlantInput = req.body;

  // get last plant log and update it to say it was watered
  const lastPlantLog = await prisma.plantLog.findFirst({
    where: {
      plantId: waterPlant.plantId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // if lastPlantLog exists, update it to say it needs to be watered
  if (lastPlantLog.needToWater == false) {
    await prisma.plantLog.update({
      where: {
        id: lastPlantLog.id,
      },
      data: {
        needToWater: true,
      },
    });
    // if lastPlantLog doesn't exist, create a new plant log and say it needs to be watered
  } else {
    // create a plant log saying it needs to be watered
    await prisma.plantLog.create({
      data: {
        ...lastPlantLog,
        needToWater: true,
      },
    });
  }

  res.json({
    message:
      "need to water plant task created, the plant will be watered on the next communication with the device",
  });
}
