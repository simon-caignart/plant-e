import { getSession } from "next-auth/react";
import { PlantCreateInput } from "../../../components/modalAddPlant";
import prisma from "../../../lib/prisma";

// POST /api/plant
// Create a new plant
export default async function handle(req, res) {
  console.log("req.body", req.body);
  const plant: PlantCreateInput = req.body;
  const session = await getSession({ req });
  const result = await prisma.plant.create({
    data: {
      id: plant.id,
      name: plant.name,
      latinName: plant.latinName,
      commonName: plant.commonName,
      image: plant.image,
      description: plant.description,
      luminosityThreshold: plant.luminosityThreshold,
      temperatureThreshold: plant.temperatureThreshold,
      humidityThreshold: plant.humidityThreshold,
      soilMoistureThreshold: plant.soilMoistureThreshold,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
