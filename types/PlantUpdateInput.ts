export type PlantUpdateInput = {
  id?: string;
  name?: string;
  latinName?: string;
  commonName?: string;
  image?: string;
  description?: string;
  wateringFrequency?: number;
  waterQuantity?: number;
  luminosityThreshold?: number;
  temperatureThreshold?: number;
  humidityThreshold?: number;
  soilMoistureThreshold?: number;
  automaticWatering?: boolean;
};
