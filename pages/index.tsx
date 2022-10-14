import { PlusIcon } from "@heroicons/react/24/solid";
import { Plant, PlantLog } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import PlantCard from "../components/PlantCard";
import { SignIn } from "../components/SignIn";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { plants: [] } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      plants: {
        include: {
          logs: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });
  return {
    props: { plants: JSON.parse(JSON.stringify(user.plants)) },
  };
};

type Props = {
  plants: (Plant & {
    logs: PlantLog[];
  })[];
};

const Dashboard: React.FC<Props> = (props) => {
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
        <h1 className="mb-10 pt-5 text-3xl text-white md:text-4xl xl:text-5xl">
          Mon jardin
        </h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {props.plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
          <div className="flex h-52 cursor-pointer items-center justify-center rounded-2xl bg-white text-xl shadow-xl  transition-shadow duration-200 hover:shadow-2xl ">
            <Link href={"/ajouter-une-plante"}>
              <a className="flex items-center gap-2">
                <PlusIcon className="inline h-6 w-6" /> Ajouter une plante
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
