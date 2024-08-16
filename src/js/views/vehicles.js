import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { InfoModal } from "../component/infoModal";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Vehicles = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  const handleShowModal = (vehicle) => {
    setCurrentItem(vehicle);
    setItemType("vehicle");
    setShowModal(true);
  };

  useEffect(() => {
    actions.getVehiclesList(); // Llama la acción para obtener la lista de vehicles
  }, []);

  const handleFavoriteClick = (vehicle) => {
    actions.addToFavorites(vehicle, "vehicle"); // Especifica el tipo
  };

  return (
    <div className="container">
      <div className="row">
        {store.vehicles.map((vehicle) => (
          <div className="col-md-3 col-sm-4 g-2" key={vehicle.uid}>
            <div
              className="card mt-3 mb-3 cards"
              style={{ width: "18rem", height: "auto" }}
            >
              <img
                src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                className="card-img-top"
                alt={vehicle.properties.name}
              />
              <div className="card-body">
                <h5 className="card-title">{vehicle.properties.name}</h5>
                <p className="card-text">
                  Model: {vehicle.properties.model}
                  <br />
                  Vehicle class: {vehicle.properties.vehicle_class}
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleShowModal(vehicle)}
                >
                  Learn more
                </button>
                <button
                  className={`btn ${
                    store.favorites.some(
                      (fav) => fav.uniqueId === `${vehicle.uid}-vehicle`
                    )
                      ? "btn-danger"
                      : "btn-outline-danger"
                  } favorite-btn`}
                  onClick={() => handleFavoriteClick(vehicle)}
                >
                  <i
                    className={`fas ${
                      store.favorites.some(
                        (fav) => fav.uniqueId === `${vehicle.uid}-vehicle`
                      )
                        ? "fa-heart"
                        : "fa-heart"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentItem && (
        <InfoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          item={currentItem}
          type={itemType}
        />
      )}
    </div>
  );
};
