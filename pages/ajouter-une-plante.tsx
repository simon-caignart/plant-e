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
      luminosityThreshold: 60,
      temperatureThreshold: 25,
      wateringFrequency: 9,
      waterQuantity: 70,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 1,
      commonName: "Ficus lyre",
      latinName: "Ficus lyrata",
      image: "/Plant2.png",
      description:
        "Le ficus lyrata est une très belle plante d’intérieur, appréciée pour son beau feuillage vert coriace et brillant.",
      wateringFrequency: 7,
      waterQuantity: 160,
      luminosityThreshold: 60,
      temperatureThreshold: 25,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 2,
      commonName: "Couteau",
      latinName: "Dracaena trifasciata",
      image: "/Plant3.png",
      description:
        "Dracaena trifasciata, communément appelée la plante serpent, est l'une des espèces de plantes d'intérieur les plus populaires et les plus résistantes. Jusqu'en 2017, elle était classée botaniquement comme Sansevieria trifasciata, mais ses points communs avec les espèces de Dracaena étaient trop nombreux pour être négligés. La plante se caractérise par des feuilles rigides en forme d'épée et peut varier de six pouces à huit pieds de haut. La couleur des plantes serpentines peut varier, mais beaucoup ont des feuilles à bandes vertes et présentent généralement une bordure jaune. Ces plantes sont faciles à cultiver et, dans de nombreux cas, sont presque indestructibles. Elles se développeront dans une lumière très vive ou dans les coins presque sombres de la maison. Les plantes serpent poussent généralement lentement à la lumière de l'intérieur, mais augmenter leur exposition à la lumière stimulera leur croissance si elles reçoivent quelques heures de soleil direct. La plantation et le rempotage se font de préférence au printemps.",
      wateringFrequency: 5,
      waterQuantity: 40,
      luminosityThreshold: 50,
      temperatureThreshold: 27,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 3,
      commonName: "Plante ZZ",
      latinName: "Zamioculcas zamiifolia",
      image: "/Plant4.png",
      description:
        "Le Zamioculcas (Zamioculcas zamiifolia), ou Plante ZZ pour simplifier, tire ce nom courant de l'abréviation de son nom scientifique. Elle est originaire d'Afrique de l'Est (Tanzanie, Archipel de Zanzibar face aux côtes tanzaniennes) ce qui explique qu'elle soit cultivée comme plante d'intérieur sous nos latitudes puisqu'elle aime la chaleur et réprouve les excès d'eau. La forme élancée de cette plante vivace acaule lui vient des feuilles persistantes qui naissent du rhizome tubéreux enterré : elles sont constituées de folioles de forme elliptique, vert sombre, charnues et luisantes, qui lui confèrent une certaine esthétique qui s'intègre très bien dans les intérieurs actuels modernes voire design.        ",
      wateringFrequency: 7,
      waterQuantity: 90,
      luminosityThreshold: 50,
      temperatureThreshold: 25,
      humidityThreshold: 69,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 4,
      commonName: "Langue de belle‑mère",
      latinName: "Sansevieria trifasciata",
      image: "/Plant5.png",
      description:
        "La sansevière est une plante vivace ne possédant pas de tige. Ses feuilles ont une silhouette fine et allongée, faisant penser à une épée. Elles présentent un coloris vert foncé, rayé de bandes verticales vert clair. Ensemble, elles forment une touffe érigée pouvant atteindre 1,5 m voire plus lorsque les conditions sont bonnes. La floraison est printanière et peut jouer les prolongations en été. À cette période, la langue de belle‑mère se pare de grappes de petites fleurs blanches et odorantes.",
      wateringFrequency: 5,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 5,
      commonName: "Doigts de dragon",
      latinName: "Sansevieria cylindrica",
      image: "/Plant6.png",
      description:
        "Sansevieria cylindrica, la sansevière ou sansevieria à feuilles cylindriques, est une plante succulente appartenant à la famille des Asparagacées. Les sansevierias sont proches des agaves et yuccas, mais alors que ceux-ci sont américains, le genre Sanseveria qui regroupe environ 70 espèces, est africain ou asiatique. La sansevieria à feuilles cylindriques nous vient d’Afrique tropicale. Plante rare, il y a encore 20 ans, elle est devenue un classique des jardineries. Insolite, graphique, très décorative, Sansevieria cylindrica est de plus une plante d’intérieur facile à vivre et de longue durée.",
      wateringFrequency: 7,
      waterQuantity: 150,
      luminosityThreshold: 90,
      temperatureThreshold: 25,
      humidityThreshold: 0,
      soilMoistureThreshold: 25,
    },
    {
      plantId: 6,
      commonName: "Faux philodendron",
      latinName: "Monstera deliciosa",
      image: "/Plant7.png",
      description:
        "Le faux philodendron (Monstera deliciosa) est une plante vivace de la famille des Araceae. Elle est très proche des philodendrons avec lesquels on la confond fréquemment en utilisant le nom de ce genre comme nom vernaculaire pour désigner les individus commercialisés comme plante ornementale d'appartement.",
      wateringFrequency: 5,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
    },
    {
      plantId: 7,
      commonName: "Pilea",
      latinName: "Pilea peperomioides",
      image: "/Plant8.png",
      description:
        "Le Pilea peperomioides, également appelé plante à monnaie chinoise, est une plante décorative et design.",
      wateringFrequency: 5,
      waterQuantity: 0,
      luminosityThreshold: 0,
      temperatureThreshold: 0,
      humidityThreshold: 0,
      soilMoistureThreshold: 30,
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
        <h1 className="mb-10 pt-5 text-3xl text-white md:text-4xl xl:text-5xl">
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
