import { Plant, PlantLog } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Layout from "../../components/Layout";
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

const Plant: React.FC<
  Plant & {
    logs: PlantLog[];
  }
> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return <SignIn />;
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover px-5 pb-5 xl:px-10 xl:pb-10"
        style={{ backgroundImage: "url(/wave.svg)" }}
      >
        <h2 className="mb-10 text-5xl text-white xl:mb-0">{props.name}</h2>

        <div className="grid items-center justify-center xl:grid-cols-[30%_70%]">
          <img
            className="order-1 max-w-sm p-12 xl:order-none"
            src={props.image}
          />
          <section>
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
                  <span className="text-gray-600"></span>
                </p>

                <div className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  🪴 Humidité dans le sol :{" "}
                  {props.logs && props.logs.length > 0
                    ? `${props.logs.at(0).soilMoisture} %`
                    : "N/A"}
                  <span className="text-gray-600"></span>
                </div>

                <p className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  💡 Luminosité:{" "}
                  {props.logs && props.logs.length > 0
                    ? `${props.logs.at(0).luminosity} %`
                    : "N/A"}
                  <span className="text-gray-600"></span>
                </p>

                <p className="rounded-xl bg-white px-4 py-6 text-xl shadow-xl">
                  🌡️ Température:{" "}
                  <span className="text-gray-600">
                    {props.logs && props.logs.length > 0
                      ? `${props.logs.at(0).temperature} °C`
                      : "N/A"}
                  </span>
                </p>
              </div>

              <h2 className="mb-4 mt-10 text-2xl text-white">
                ℹ️ Informations sur votre plante
              </h2>

              <div className="rounded-xl bg-white p-4 shadow-xl">
                <p>
                  <span className="font-bold">Nom commun</span>:{" "}
                  {props.commonName}
                </p>
                <p>
                  <span className="font-bold">Nom latin</span>:{" "}
                  {props.latinName}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {props.description}
                </p>
              </div>
            </div>
          </section>
          <button
            className="btn btn-error mt-10 w-44"
            onClick={() => deletePost(props.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Plant;
