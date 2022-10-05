import { Plant, PlantLog } from "@prisma/client";
import Router from "next/router";
import React from "react";
import { fromDate } from "../functions/localTimeString";

const PlantCard: React.FC<{
  plant: Plant & {
    logs: PlantLog[];
  };
}> = ({ plant }) => {
  return (
    <div
      onClick={() => Router.push("/plant/" + plant.id)}
      className="flex h-52 cursor-pointer gap-6 rounded-2xl bg-white p-5 shadow-xl transition-shadow duration-200 hover:shadow-2xl"
    >
      <section className="flex w-1/3 items-center">
        <img src={plant.image} className="max-h-full object-scale-down" />
      </section>
      <section className="flex h-full flex-col gap-2">
        <h2 className="text-3xl font-bold">{plant.name}</h2>
        <p className="text-lg">
          🪴{" : "}
          {plant.logs && plant.logs.length > 0
            ? `${plant.logs.at(0).soilMoisture} %`
            : "N/A"}
        </p>
        <p className="text-lg">
          💡{" : "}
          {plant.logs && plant.logs.length > 0
            ? `${plant.logs.at(0).luminosity} %`
            : "N/A"}
        </p>
        <div className="flex-1" />
        <p className="font-mono text-sm text-gray-500">
          Mis à jour{" "}
          {plant.logs && plant.logs.length > 0
            ? fromDate(new Date(plant.logs.at(0).createdAt))
            : "N/A"}
        </p>
      </section>
    </div>
  );
};

export default PlantCard;
