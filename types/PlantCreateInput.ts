export type PlantCreateInput = {
  id?: string;
  name?: string;
  latinName: string;
  commonName: string;
  image: string;
  description: string;
  luminosityThreshold: number;
  temperatureThreshold: number;
  humidityThreshold: number;
  soilMoistureThreshold: number;
};
