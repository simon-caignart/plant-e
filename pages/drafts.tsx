import { Plant } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import Layout from "../components/Layout";
import PlantCard from "../components/PlantCard";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const plants = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { plants },
  };
};

type Props = {
  plants: Plant[];
};

const Drafts: React.FC<Props> = (props) => {
  const {data: session} = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.plants.map((plant) => (
            <div key={plant.id} className="post">
              <PlantCard plant={plant} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;