import prisma from "../../../lib/prisma";
import { PlantCreateInput } from "../../../types/PlantCreateInput";

// DELETE /api/plant/:id
export default async function handle(req, res) {
  const plantId = req.query.id;
  const plantCreateInput: PlantCreateInput = req.body;
  if (req.method === "DELETE") {
    const post = await prisma.plant.delete({
      where: { id: plantId },
    });
    res.json(post);
  } else if (req.method === "PUT") {
    const update = await prisma.plant.update({
      where: { id: plantId },
      data: {
        id: plantCreateInput.id,
        name: plantCreateInput.name,
        latinName: plantCreateInput.latinName,
        commonName: plantCreateInput.commonName,
        image: plantCreateInput.image,
        description: plantCreateInput.description,
        wateringFrequency: plantCreateInput.wateringFrequency,
        waterQuantity: plantCreateInput.waterQuantity,
        luminosityThreshold: plantCreateInput.luminosityThreshold,
        temperatureThreshold: plantCreateInput.temperatureThreshold,
        humidityThreshold: plantCreateInput.humidityThreshold,
        soilMoistureThreshold: plantCreateInput.soilMoistureThreshold,
      },
    });
    res.json(update);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
