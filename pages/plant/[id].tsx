/* eslint-disable @next/next/no-img-element */
import { Plant } from "@prisma/client";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { ModalDeletePlant } from "../../components/modalDeletePlant";
import { ModalTreshold } from "../../components/modalTreshold";
import { SignIn } from "../../components/SignIn";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { fromDate } from "../../functions/localTimeString";
import { PlantUpdateInput } from "../../types/PlantUpdateInput";

const fetcher = (args: RequestInfo | URL) =>
  fetch(args).then((res) => res.json());

const Plant: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const plantId = router.query.id as string;

  const {
    data: plantData,
    error,
    mutate,
  } = useSWR("/api/plant/" + plantId, fetcher);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (error) return <p>Cette plante n'a pas été trouvé</p>;
  if (!plantData) return <p className="h-screen w-screen bg-plant-green"></p>;

  async function updateAutomaticWatering(
    id: string,
    currentAutomaticWatering: boolean
  ): Promise<void> {
    const plantUpdateInput: PlantUpdateInput = {
      automaticWatering: !currentAutomaticWatering,
    };

    await fetch(`/api/plant/${id}`, {
      method: "POST",
      body: JSON.stringify(plantUpdateInput),
    });

    mutate();
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = plantData.logs.map((log) =>
    new Date(log.createdAt).toTimeString().slice(0, 5)
  );

  const luminosityData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Luminosité",
        data: plantData.logs
          .slice()
          .reverse()
          .map((log) => {
            return log.luminosity;
          }),
        borderColor: "rgba(255, 222, 105, 0.5)",
        backgroundColor: "rgba(254, 242, 205, 0.6)",
      },
    ],
  };

  const soilMoistureData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Humidité du sol",
        data: plantData.logs
          .slice()
          .reverse()
          .map((log) => {
            return log.soilMoisture;
          }),
        borderColor: "rgba(255, 148, 62, 0.3)",
        backgroundColor: "rgba(92, 159, 27, 0.4)",
      },
    ],
  };

  const humidityData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Humidité",
        data: plantData.logs
          .slice()
          .reverse()
          .map((log) => {
            return log.humidity;
          }),
        borderColor: "rgba(0, 168, 243, 0.3)",
        backgroundColor: "rgba(127, 237, 254, 0.3)",
      },
    ],
  };

  const temperatureData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Temperature",
        data: plantData.logs
          .slice()
          .reverse()
          .map((log) => {
            return log.temperature;
          }),
        borderColor: "rgba(205, 32, 38, 0.3)",
        backgroundColor: "rgba(255, 43, 58, 0.3)",
      },
    ],
  };

  if (!session) {
    return <SignIn />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-plant-green bg-cover px-5 pb-5 xl:px-10 xl:pb-10">
        <h2 className="mb-10 pt-5 text-5xl text-white xl:mb-0">
          {plantData.name}
        </h2>

        <div className="grid justify-center xl:grid-cols-[30%_70%]">
          <section className="grid xl:mt-16">
            <img
              className="xl:order-0 order-1 w-1/2 max-w-[14rem] justify-self-center xl:m-12 xl:w-full xl:max-w-[19rem]"
              src={plantData.image}
              alt={plantData.commonName}
            />
          </section>

          <section className=" mt-5 flex flex-col gap-1">
            <h2 className="mb-4 text-2xl text-white">⚡  Actions Rapides</h2>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="waterAPlant btn btn-accent flex w-56 items-center justify-center text-white shadow-lg"
                onClick={() => waterAPlant(plantData.id)}
              >
                <span>Arroser la plante</span>
              </button>
              <button
                onClick={() =>
                  updateAutomaticWatering(
                    plantData.id,
                    plantData.automaticWatering
                  )
                }
                className="btn btn-ghost bg-fuchsia-500 text-white shadow-lg hover:bg-fuchsia-600"
              >
                Arrosage automatique :{" "}
                {plantData.automaticWatering ? "Activé" : "Désactivé"}
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-error w-44 text-white shadow-lg hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>

            <h2 className="mb-4 mt-10 text-2xl text-white">
              📈  Statistiques{" "}
              <span className="ml-2 font-mono text-sm text-gray-100">
                {plantData.logs && plantData.logs.length > 0
                  ? `Mis à jour ${fromDate(
                      new Date(plantData.logs.at(0).createdAt)
                    )}`
                  : ""}
              </span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse-title">
                  🚰  Dernier arrosage :{" "}
                  {plantData.logs && plantData.logs.length > 0
                    ? capitalizeFirstLetter(
                        fromDate(
                          new Date(
                            new Array(...plantData.logs).find(
                              (log) => log.wasWatered
                            ).createdAt
                          )
                        )
                      )
                    : "Aucune valeur"}
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse-title">
                  🪣  Réservoir :{" "}
                  {plantData.logs &&
                  plantData.logs.length > 0 &&
                  plantData.logs.at(0).waterLevelToLow
                    ? "Il est temps de le remplir !"
                    : "Le réservoir est plein"}
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse collapse-arrow">
                  <input
                    type="checkbox"
                    id="collapse-humidity"
                    onChange={(e) => {
                      const element = document.getElementById(
                        "collapse-soilMoisture"
                      ) as HTMLInputElement;

                      element.checked = e.target.checked;
                    }}
                  />
                  <div className="collapse-title">
                    💦  Humidité dans l'air :{" "}
                    {plantData.logs && plantData.logs.length > 0
                      ? `${plantData.logs.at(0).humidity} %`
                      : "Aucune valeur"}{" "}
                  </div>
                  <div className="collapse-content">
                    <Line options={options} data={humidityData} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse collapse-arrow">
                  <input
                    type="checkbox"
                    id="collapse-soilMoisture"
                    onChange={(e) => {
                      const element = document.getElementById(
                        "collapse-humidity"
                      ) as HTMLInputElement;

                      element.checked = e.target.checked;
                    }}
                  />
                  <div className="collapse-title">
                    🪴  Humidité dans le sol :{" "}
                    {plantData.logs && plantData.logs.length > 0
                      ? `${plantData.logs.at(0).soilMoisture} %`
                      : "Aucune valeur"}
                  </div>
                  <div className="collapse-content">
                    <Line options={options} data={soilMoistureData} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse collapse-arrow">
                  <input
                    type="checkbox"
                    id="collapse-luminosity"
                    onChange={(e) => {
                      const element = document.getElementById(
                        "collapse-temperature"
                      ) as HTMLInputElement;

                      element.checked = e.target.checked;
                    }}
                  />
                  <div className="collapse-title">
                    💡  Luminosité:{" "}
                    {plantData.logs && plantData.logs.length > 0
                      ? `${plantData.logs.at(0).luminosity} %`
                      : "Aucune valeur"}
                  </div>
                  <div className="collapse-content">
                    <Line options={options} data={luminosityData} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                <div className="collapse collapse-arrow">
                  <input
                    type="checkbox"
                    id="collapse-temperature"
                    onChange={(e) => {
                      const element = document.getElementById(
                        "collapse-luminosity"
                      ) as HTMLInputElement;

                      element.checked = e.target.checked;
                    }}
                  />
                  <div className="collapse-title">
                    🌡️  Température:{" "}
                    <span className="text-gray-600">
                      {plantData.logs && plantData.logs.length > 0
                        ? `${plantData.logs.at(0).temperature} °C`
                        : "Aucune valeur"}
                    </span>
                  </div>
                  <div className="collapse-content">
                    <Line options={options} data={temperatureData} />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mb-4 mt-10 text-2xl text-white">
              🤖  Arrosage automatique{" "}
              <button
                onClick={() => {
                  setShowEditModal(true);
                }}
              >
                ✏️
              </button>
            </h2>
            <div className="rounded-xl bg-white p-4 shadow-xl">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                  <span className="font-bold">Fréquence d'arrosage :</span>
                  <p>
                    {plantData.wateringFrequency == null
                      ? "Aucune Valeur"
                      : `Tous les ${plantData.wateringFrequency} jours`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">
                    Quantité d'eau par arrosage :
                  </span>
                  <p>
                    {plantData.waterQuantity == null
                      ? "Aucune Valeur"
                      : `${plantData.waterQuantity} ml`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">
                    Seuil d'humidité de la terre :
                  </span>
                  <p>
                    {plantData.soilMoistureThreshold == 0
                      ? "Aucune Valeur"
                      : `${plantData.soilMoistureThreshold} %`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">
                    Seuil d'humidité extérieure :
                  </span>
                  <p>
                    {plantData.humidityThreshold == 0
                      ? "Aucune Valeur"
                      : `${plantData.humidityThreshold} %`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">
                    Seuil de température extérieure :
                  </span>
                  <p>
                    {plantData.temperatureThreshold == 0
                      ? "Aucune Valeur"
                      : `${plantData.temperatureThreshold} °C`}
                  </p>
                </div>
                <div>
                  <span className="font-bold">Seuil de luminosité :</span>
                  <p>
                    {plantData.luminosityThreshold == 0
                      ? "Aucune Valeur"
                      : `${plantData.luminosityThreshold} %`}
                  </p>
                </div>
              </div>
            </div>
            <h2 className="mb-4 mt-10 text-2xl text-white">
              ℹ️  Informations sur votre plante
            </h2>

            <div className="rounded-xl bg-white p-4 shadow-xl">
              <p>
                <span className="font-bold">Nom commun :</span>{" "}
                {plantData.commonName}
              </p>
              <p>
                <span className="font-bold">Nom latin :</span>{" "}
                {plantData.latinName}
              </p>
              <p>
                <span className="font-bold">Description :</span>{" "}
                {plantData.description}
              </p>
            </div>
          </section>
        </div>
        {showEditModal && (
          <ModalTreshold plant={plantData} setShowModal={setShowEditModal} />
        )}
        {showDeleteModal && (
          <ModalDeletePlant
            plant={plantData}
            setShowModal={setShowDeleteModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default Plant;

async function waterAPlant(id: string) {
  try {
    await fetch("/api/waterPlant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    toast.success(
      "Un arrosage a été programmé, votre plante sera bientôt arrosé ! 🚰"
    );
  } catch (error) {
    console.error(error);
  }
}
