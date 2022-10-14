import prisma from "../../../lib/prisma";
import { PlantUpdateInput } from "../../../types/PlantUpdateInput";

// /api/plant/:id
export default async function handle(req, res) {
  const plantId = req.query.id;
  const plantUpdateInput: PlantUpdateInput = JSON.parse(req.body);
  if (req.method === "DELETE") {
    const plant = await prisma.plant.delete({
      where: { id: plantId },
    });
    res.json(plant);
  } else if (req.method === "PUT") {
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
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
