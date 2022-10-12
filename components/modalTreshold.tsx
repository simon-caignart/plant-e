/* eslint-disable @next/next/no-img-element */
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Router from "next/router";
import { useState } from "react";
import ReactDom from "react-dom";
import { PlantCreateInput } from "../types/PlantCreateInput";

export function ModalTreshold(props: {
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
    wateringFrequency: props.plant.wateringFrequency,
    waterQuantity: props.plant.waterQuantity,
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
            Changer les seuils de{" "}
            <span className="font-bold">{props.plant.commonName}</span>
          </h3>

          <div className="divider" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePlant(form, props);
            }}
          >
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
                  <span className="label-text">Seuil d'humidité du sol</span>
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
            <div className="flex gap-4">
              <div className="form-control w-full">
                <label className="label" htmlFor="waterQuantity">
                  <span className="label-text">
                    Quantité d'eau par arrosage
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={props.plant.waterQuantity}
                  name="waterQuantity"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      waterQuantity: Number(e.target.value),
                    });
                  }}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label" htmlFor="wateringFrequency">
                  <span className="label-text">Fréquence d'arrosage</span>
                </label>
                <input
                  type="number"
                  name="wateringFrequency"
                  defaultValue={props.plant.wateringFrequency}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      wateringFrequency: Number(e.target.value),
                    });
                  }}
                  className="input input-bordered"
                  required
                />
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
                <PencilSquareIcon className="mr-2 h-5 w-5" />
                Modifier
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

async function updatePlant(plantCreateInput: PlantCreateInput, props: any) {
  try {
    await fetch("/api/plant/"+ props.plant.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantCreateInput),
    });
    props.setShowModal(false);
    await Router.push("/plant/" + props.plant.id);
  } catch (error) {
    console.error(error);
  }
}
