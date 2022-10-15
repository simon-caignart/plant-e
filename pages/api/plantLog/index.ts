import { Plant } from "@prisma/client";
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

    if (lastWatered) {
      const lastTimeWatered = new Date(lastWatered.createdAt);
      const now = new Date();

      const diff = now.getTime() - lastTimeWatered.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      if (diffDays > plant.wateringFrequency) {
        needToWater = true;
      }
    }
  }

  // Send thirsty notification if the automatic watering system is not enabled
  if (!plant.automaticWatering) {
    if (needToWater) {
      await sendThirstyNotification(plantLog, plant);
    }
  }

  if (plantLog.waterLevelToLow) {
    await sendWaterLevelLowNotification(plantLog, plant);
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
    // needToWater always false if automatic watering is disabled
    needToWater: plant.automaticWatering ? needToWater : false,
    waterQuantity: plant.waterQuantity,
  });
}

async function sendThirstyNotification(plantLog: PlantLogCreateInput, plant) {
  const plantUser = await prisma.plant.findUnique({
    where: {
      id: plantLog.plantId,
    },
    include: {
      user: true,
    },
  });

  if (plantUser) {
    const body = {
      to: plantUser.user?.fcmToken,
      priority: "high",
      notification: {
        title: `Votre plante "${plant.name}" a soif ! 💦`,
      },
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAA0sIWlR0:APA91bEehiyPGieZ4oLt30135luu4U_xg9N_SRMbNre3t0NvAG2-EeJGnGFdG0WwJolnuFcHlRH9Bzz100Ajkdww6h8lUIR-VzVccFjqLqjS10Fg1O1ww2h6J4ZHSld2e6jfjOysN0_x`,
      },
      body: JSON.stringify(body),
    });
  }
}

async function sendWaterLevelLowNotification(
  plantLog: PlantLogCreateInput,
  plant: Plant
) {
  const plantUser = await prisma.plant.findUnique({
    where: {
      id: plantLog.plantId,
    },
    include: {
      user: true,
    },
  });

  if (plantUser) {
    const body = {
      to: plantUser.user?.fcmToken,
      priority: "high",
      notification: {
        title: `Le réservoir de votre plante "${plant.name}" est presque vide ⚠️`,
        body: "Il est temps de le remplir !",
      },
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAA0sIWlR0:APA91bEehiyPGieZ4oLt30135luu4U_xg9N_SRMbNre3t0NvAG2-EeJGnGFdG0WwJolnuFcHlRH9Bzz100Ajkdww6h8lUIR-VzVccFjqLqjS10Fg1O1ww2h6J4ZHSld2e6jfjOysN0_x`,
      },
      body: JSON.stringify(body),
    });
  }
}
