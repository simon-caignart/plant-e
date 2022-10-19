/* eslint-disable @next/next/no-img-element */
import { Plant } from "@prisma/client";
import Router from "next/router";
import ReactDom from "react-dom";
import { PlantCreateInput } from "../types/PlantCreateInput";

export function ModalDeletePlant(props: {
  plant: Plant;
  setShowModal: (arg0: boolean) => void;
}): JSX.Element {
  async function deletePlant(): Promise<void> {
    await fetch(`/api/plant/${props.plant.id}`, {
      method: "DELETE",
    });
    Router.push("/");
  }

  const main = document.getElementById("__next");

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDom.createPortal(
      <div
        className="modal modal-open modal-bottom sm:modal-middle"
        onMouseDown={() => props.setShowModal(false)}
      >
        <div
          className="modal-box !max-w-3xl whitespace-normal"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <h3 className="text-xl font-medium">
            Supprimer <span className="font-bold">{props.plant.name}</span> ?
          </h3>

          <div className="divider" />

          <p className="mb-2 font-medium">
            Vous êtes sur le point de supprimer votre plante. Cette action est
            irreversible, êtes vous sûr ?
          </p>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              Annuler
            </button>
            <button onClick={deletePlant} className="btn btn-error text-white">
              Supprimer
            </button>
          </div>
        </div>
      </div>,
      main
    );
  } else {
    return <></>;
  }
}

async function addPlant(plantCreateInput: PlantCreateInput) {
  try {
    await fetch("/api/plant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantCreateInput),
    });
    await Router.push("/");
  } catch (error) {
    console.error(error);
  }
}
