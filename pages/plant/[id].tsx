import { Plant, PlantLog } from "@prisma/client";
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
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Layout from "../../components/Layout";
import { ModalTreshold } from "../../components/modalTreshold";
import { SignIn } from "../../components/SignIn";
import { fromDate } from "../../functions/localTimeString";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const plant = await prisma.plant.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      logs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    props: JSON.parse(JSON.stringify(plant)),
  };
};

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/plant/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
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

export const options = {
  responsive: true,
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const luminosityData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Luminosité",
      data: labels.map(() => {
        return Math.random() * 100;
      }),
      borderColor: "rgba(255, 222, 105, 0.5)",
      backgroundColor: "rgba(254, 242, 205, 0.6)",
    },
  ],
};

export const soilMoistureData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Humidité du sol",
      data: labels.map(() => {
        return Math.random() * 100;
      }),
      borderColor: "rgba(255, 148, 62, 0.3)",
      backgroundColor: "rgba(92, 159, 27, 0.4)",
    },
  ],
};

export const humidityData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Humidité",
      data: labels.map(() => {
        return Math.random() * 100;
      }),
      borderColor: "rgba(0, 168, 243, 0.3)",
      backgroundColor: "rgba(127, 237, 254, 0.3)",
    },
  ],
};

const Plant: React.FC<
  Plant & {
    logs: PlantLog[];
  }
> = (props) => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);

  if (!session) {
    return <SignIn />;
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover px-5 pb-5 xl:px-10 xl:pb-10"
        style={{ backgroundImage: "url(/wave.svg)" }}
      >
        <h2 className="plantTitle mb-10 text-5xl font-bold text-white xl:mb-0">
          {props.name}
        </h2>

        <div className="grid justify-center xl:grid-cols-[30%_70%]">
          <section>
            <img
              className="order-1 mt-16 max-w-sm p-12 xl:order-none"
              src={props.image}
            />
            {/* <h2 className="mb-4 mt-10 text-2xl text-white">
              🗒️ Notes
              <button
                onClick={() => {
                  setShowModal(true);
                }}
              >
                ✏️
              </button>
            </h2> */}
          </section>

          <section>
            <div className="flex items-center justify-center">
              <button
                className="waterAPlant btn btn-accent flex h-32 w-60 items-center justify-center rounded-3xl text-xl font-bold text-white shadow-lg"
                onClick={() => waterAPlant(props.id)}
              >
                <span>Arroser la plante</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="mb-4 text-2xl text-white">
                📈 Statistiques de votre plante{" "}
                <span className="ml-2 font-mono text-sm text-gray-100">
                  Mis à jour{" "}
                  {props.logs && props.logs.length > 0
                    ? fromDate(new Date(props.logs.at(0).createdAt))
                    : "N/A"}
                </span>
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <p className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  💦 Humidité dans l'air :{" "}
                  {props.logs && props.logs.length > 0
                    ? `${props.logs.at(0).humidity} %`
                    : "N/A"}
                  <Line options={options} data={humidityData} />
                </p>

                <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  🪴 Humidité dans le sol :{" "}
                  {props.logs && props.logs.length > 0
                    ? `${props.logs.at(0).soilMoisture} %`
                    : "N/A"}
                  <Line options={options} data={soilMoistureData} />
                </div>

                <p className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  💡 Luminosité :{" "}
                  {props.logs && props.logs.length > 0
                    ? `${props.logs.at(0).luminosity} %`
                    : "N/A"}
                  <Line options={options} data={luminosityData} />
                </p>

                <p className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  🌡️ Température :{" "}
                  <span className="text-gray-600">
                    {props.logs && props.logs.length > 0
                      ? `${props.logs.at(0).temperature} °C`
                      : "N/A"}
                  </span>
                </p>
              </div>
              <h2 className="mb-4 mt-10 text-2xl text-white">
                🤖 Seuils pour arrosage automatique{" "}
                <button
                  onClick={() => {
                    setShowModal(true);
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
                      {props.wateringFrequency == null
                        ? "Aucune Valeur"
                        : props.wateringFrequency}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold">Quantité d'arrosage :</span>
                    <p>
                      {props.waterQuantity == null
                        ? "Aucune Valeur"
                        : props.waterQuantity}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold">
                      Seuil d'humidité de la terre :
                    </span>
                    <p>
                      {props.soilMoistureThreshold == 0
                        ? "Aucune Valeur"
                        : props.soilMoistureThreshold}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold">
                      Seuil d'humidité extérieure :
                    </span>
                    <p>
                      {props.humidityThreshold == 0
                        ? "Aucune Valeur"
                        : props.humidityThreshold}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold">
                      Seuil de température extérieure :
                    </span>
                    <p>
                      {props.temperatureThreshold == 0
                        ? "Aucune Valeur"
                        : props.temperatureThreshold}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold">Seuil de luminosité :</span>
                    <p>
                      {props.luminosityThreshold == 0
                        ? "Aucune Valeur"
                        : props.luminosityThreshold}
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="mb-4 mt-10 text-2xl text-white">
                ℹ️ Informations sur votre plante
              </h2>

              <div className="rounded-xl bg-white p-4 shadow-xl">
                <p>
                  <span className="font-bold">Nom commun :</span>{" "}
                  {props.commonName}
                </p>
                <p>
                  <span className="font-bold">Nom latin :</span>{" "}
                  {props.latinName}
                </p>
                <p>
                  <span className="font-bold">Description :</span>{" "}
                  {props.description}
                </p>
              </div>
              <button
                className="btn btn-error mt-10 w-44 text-white"
                onClick={() => deletePost(props.id)}
              >
                Supprimer
              </button>
            </div>
          </section>
        </div>
        {showModal && (
          <ModalTreshold plant={props} setShowModal={setShowModal} />
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
    // await Router.push("/plant/" + id);
  } catch (error) {
    console.error(error);
  }
}
