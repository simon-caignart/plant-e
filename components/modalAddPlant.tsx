/* eslint-disable @next/next/no-img-element */
import { PlusIcon } from "@heroicons/react/24/solid";
import Router from "next/router";
import { useState } from "react";
import ReactDom from "react-dom";
import { PlantCreateInput } from "../types/PlantCreateInput";

export function ModalAddPlant(props: {
  plant: PlantCreateInput;
  setShowModal: (arg0: boolean) => void;
}): JSX.Element {
  const [form, setForm] = useState<PlantCreateInput>({
    id: props.plant.id,
    name: props.plant.name,
    latinName: props.plant.latinName,
    commonName: props.plant.commonName,
    image: props.plant.image,
    description: props.plant.description,
    luminosityThreshold: props.plant.luminosityThreshold,
    temperatureThreshold: props.plant.temperatureThreshold,
    humidityThreshold: props.plant.humidityThreshold,
    soilMoistureThreshold: props.plant.soilMoistureThreshold,
  });

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
            Ajouter <span className="font-bold">{props.plant.commonName}</span>{" "}
            dans mon jardin
          </h3>

          <div className="divider" />

          <h2 className="mb-2 text-lg font-medium">Paramétrage</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPlant(form);
            }}
          >
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text">
                  Identifiant de votre arroseur 2000
                </span>
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  setForm({ ...form, id: e.target.value });
                }}
                className="input input-bordered"
                placeholder="cl8smhs1c00003b6le4gle6n9"
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text">Nom de votre plante</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Écrivez le nom de votre plante, par exemple: 'Mon basilic', ou 'Roger'"
                className="input input-bordered w-full"
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
            </div>

            <div className="collapse-arrow collapse ">
              <input type="checkbox" />
              <div className="collapse-title mt-2 pl-0 text-lg font-medium">
                Voir plus d'informations
              </div>
              <div className="collapse-content">
                <div className="flex gap-4">
                  <div className="form-control w-full max-w-xs">
                    <label htmlFor="commonName" className="label">
                      <span className="label-text">Nom Commun</span>
                    </label>
                    <input
                      defaultValue={props.plant.commonName}
                      type="text"
                      name="commonName"
                      onChange={(e) => {
                        setForm({ ...form, commonName: e.target.value });
                      }}
                      required
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label htmlFor="latinName" className="label">
                      <span className="label-text">Nom Latin</span>
                    </label>
                    <input
                      defaultValue={props.plant.latinName}
                      onChange={(e) => {
                        setForm({ ...form, latinName: e.target.value });
                      }}
                      type="text"
                      required
                      name="Nom Latin"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label htmlFor="description" className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                    }}
                    className="textarea textarea-bordered w-full"
                    defaultValue={props.plant.description}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="form-control w-full">
                    <label className="label" htmlFor="luminosityThreshold">
                      <span className="label-text">Seuil de luminosité</span>
                    </label>
                    <input
                      defaultValue={props.plant.luminosityThreshold}
                      type="number"
                      name="luminosityThreshold"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          luminosityThreshold: Number(e.target.value),
                        });
                      }}
                      className="input input-bordered"
                      placeholder="50"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label" htmlFor="temperatureThreshold">
                      <span className="label-text">Seuil de température</span>
                    </label>
                    <input
                      defaultValue={props.plant.temperatureThreshold}
                      type="number"
                      name="temperatureThreshold"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          temperatureThreshold: Number(e.target.value),
                        });
                      }}
                      className="input input-bordered"
                      placeholder="20"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="form-control w-full">
                    <label className="label" htmlFor="humidityThreshold">
                      <span className="label-text">
                        Seuil d'humidité dans l'air
                      </span>
                    </label>
                    <input
                      required
                      type="number"
                      defaultValue={props.plant.humidityThreshold}
                      name="humidityThreshold"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          humidityThreshold: Number(e.target.value),
                        });
                      }}
                      className="input input-bordered"
                      placeholder="50"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label" htmlFor="soilMoistureThreshold">
                      <span className="label-text">
                        Seuil d'humidité du sol
                      </span>
                    </label>
                    <input
                      type="number"
                      name="soilMoistureThreshold"
                      defaultValue={props.plant.soilMoistureThreshold}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          soilMoistureThreshold: Number(e.target.value),
                        });
                      }}
                      className="input input-bordered"
                      placeholder="50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

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
              <button
                type="submit"
                disabled={form.id === undefined}
                className="btn btn-primary"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Ajouter
              </button>
            </div>
          </form>
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
