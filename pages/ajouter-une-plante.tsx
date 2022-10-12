import React, { useState } from "react";
import Layout from "../components/Layout";
import { ModalAddPlant } from "../components/modalAddPlant";

const AddAPlant: React.FC = () => {
  const plants = [
    {
      plantId: 0,
      commonName: "Caoutchouc",
      latinName: "Ficus Elastica",
      image: "/Plant1.png",
      description:
        "Le figuier à caoutchouc, ou plus couramment caoutchouc, (Ficus elastica) est un arbre sempervirent de la famille des Moracées, originaire d'Asie. C'est une plante qui produit du latex et qui est cultivée en pot comme plante d'intérieur dans les pays tempérés[Quoi ?]. Cette espèce est en régression à la suite de la contamination des cultures par un champignon pathogène (en Asie du Sud-Est notamment).",
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      wateringFrequency: 0,
      waterQuantity: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 1,
      commonName: "Nom commun",
      latinName: "Nom latin",
      image: "/Plant2.png",
      description: "Une plante",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 2,
      commonName: "Nom commun",
      latinName: "Nom latin",
      image: "/Plant3.png",
      description: "Une plante",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 3,
      commonName: "Plante 5",
      latinName: "Plante 5",
      image: "/Plant4.png",
      description: "Une plante",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 4,
      commonName: "Langue de belle‑mère",
      latinName: "Sansevieria trifasciata",
      image: "/Plant5.png",
      description:
        "La sansevière est une plante vivace ne possédant pas de tige. Ses feuilles ont une silhouette fine et allongée, faisant penser à une épée. Elles présentent un coloris vert foncé, rayé de bandes verticales vert clair. Ensemble, elles forment une touffe érigée pouvant atteindre 1,5 m voire plus lorsque les conditions sont bonnes. La floraison est printanière et peut jouer les prolongations en été. À cette période, la langue de belle‑mère se pare de grappes de petites fleurs blanches et odorantes.",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 5,
      commonName: "Nom commun",
      latinName: "Nom latin",
      image: "/Plant6.png",
      description: "Une plante",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 6,
      commonName: "Faux philodendron",
      latinName: "Monstera deliciosa",
      image: "/Plant7.png",
      description:
        "Le faux philodendron (Monstera deliciosa) est une plante vivace de la famille des Araceae. Elle est très proche des philodendrons avec lesquels on la confond fréquemment en utilisant le nom de ce genre comme nom vernaculaire pour désigner les individus commercialisés comme plante ornementale d'appartement.",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
    {
      plantId: 7,
      commonName: "Pilea",
      latinName: "Pilea peperomioides",
      image: "/Plant8.png",
      description:
        "Le Pilea peperomioides, également appelé plante à monnaie chinoise, est une plante décorative et design.",
      wateringFrequency: 0,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 0,
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const [selectedPlantId, setSelectedPlantId] = useState<number | undefined>(
    undefined
  );

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover px-5 pb-5 xl:px-10 xl:pb-10"
        style={{ backgroundImage: "url(/wave.svg)" }}
      >
        <h1 className="mb-10 text-3xl text-white md:text-4xl xl:text-5xl">
          Ajouter une plante
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {plants.map((plant) => (
            <div
              key={plant.plantId}
              className="card card-side bg-white shadow-xl"
            >
              <figure className="m-4 w-1/3">
                <img className="h-56 object-contain" src={plant.image} />
              </figure>
              <div className="card-body w-2/3">
                <h2 className="card-title text-gray-700">{plant.commonName}</h2>
                <p className="text-gray-700">
                  {plant.description.slice(0, 50)}...
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedPlantId(plant.plantId);
                      setShowModal(true);
                      console.log(plant)
                    }}
                  >
                    Choisir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <ModalAddPlant
            plant={plants.at(selectedPlantId)}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default AddAPlant;
