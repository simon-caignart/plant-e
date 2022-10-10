import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { PlantCreateInput } from "../../../types/PlantCreateInput";

// POST /api/plant
// Create a new plant
export default async function handle(req, res) {
  console.log("req.body", req.body);
  const plantCreateInput: PlantCreateInput = req.body;
  const session = await getSession({ req });
  const result = await prisma.plant.create({
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
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
