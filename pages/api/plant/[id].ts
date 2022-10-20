import prisma from "../../../lib/prisma";
import { PlantUpdateInput } from "../../../types/PlantUpdateInput";

// /api/plant/:id
export default async function handle(req, res) {
  const plantId = req.query.id;

  if (req.method === "DELETE") {
    const plant = await prisma.plant.delete({
      where: { id: plantId },
    });
    res.json(plant);
  } else if (req.method === "PUT") {
    const plantUpdateInput: PlantUpdateInput = JSON.parse(
      JSON.stringify(req.body)
    );
    const update = await prisma.plant.update({
      where: { id: plantId },
      data: {
        name: plantUpdateInput.name,
        latinName: plantUpdateInput.latinName,
        commonName: plantUpdateInput.commonName,
        image: plantUpdateInput.image,
        description: plantUpdateInput.description,
        wateringFrequency: plantUpdateInput.wateringFrequency,
        waterQuantity: plantUpdateInput.waterQuantity,
        luminosityThreshold: plantUpdateInput.luminosityThreshold,
        temperatureThreshold: plantUpdateInput.temperatureThreshold,
        humidityThreshold: plantUpdateInput.humidityThreshold,
        soilMoistureThreshold: plantUpdateInput.soilMoistureThreshold,
        automaticWatering: plantUpdateInput.automaticWatering,
      },
    });
    res.json(update);
  } else if (req.method === "POST") {
    const plantNewUpdateInput: PlantUpdateInput = JSON.parse(req.body);
    const update = await prisma.plant.update({
      where: { id: plantId },
      data: {
        name: plantNewUpdateInput.name,
        latinName: plantNewUpdateInput.latinName,
        commonName: plantNewUpdateInput.commonName,
        image: plantNewUpdateInput.image,
        description: plantNewUpdateInput.description,
        wateringFrequency: plantNewUpdateInput.wateringFrequency,
        waterQuantity: plantNewUpdateInput.waterQuantity,
        luminosityThreshold: plantNewUpdateInput.luminosityThreshold,
        temperatureThreshold: plantNewUpdateInput.temperatureThreshold,
        humidityThreshold: plantNewUpdateInput.humidityThreshold,
        soilMoistureThreshold: plantNewUpdateInput.soilMoistureThreshold,
        automaticWatering: plantNewUpdateInput.automaticWatering,
      },
    });
    res.json(update);
  } else if (req.method === "GET") {
    const plant = await prisma.plant.findUnique({
      where: {
        id: plantId,
      },
      include: {
        logs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 480,
        },
      },
    });

    res.json(plant)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
