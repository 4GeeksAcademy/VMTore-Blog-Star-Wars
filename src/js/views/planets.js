import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Tatooine from "/src/img/Tatooine.webp";
import { Context } from "../store/appContext";
import { InfoModal } from "../component/infoModal";
import { Modal, Button } from "react-bootstrap";
import "../../styles/demo.css";

export const Planets = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  useEffect(() => {
    actions.getPlanetsList(); // Llama la acción para obtener la lista de planetas
  }, []);

  const handleFavoriteClick = (planet) => {
    actions.addToFavorites(planet, "planet"); // Especifica el tipo
  };

  const handleShowModal = (planet) => {
    setCurrentItem(planet);
    setItemType("planet");
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row">
        {store.planets.map((planet) => (
          <div className="col-md-3 col-sm-4 g-2" key={planet.uid}>
            <div className="card mt-3 mb-3 cards" style={{ width: "18rem" }}>
              <img
                src={
                  planet.properties.name.toLowerCase() === "tatooine"
                    ? store.TatooineImg.tatooine
                    : `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`
                }
                className="card-img-top"
                alt={planet.properties.name}
              />
              <div className="card-body">
                <h5 className="card-title">{planet.properties.name}</h5>
                <p className="card-text">
                  Climate: {planet.properties.climate}
                  <br />
                  Population: {planet.properties.population}
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleShowModal(planet)}
                >
                  Learn more
                </button>
                <button
                  className={`btn ${
                    store.favorites.some(
                      (fav) => fav.uniqueId === `${planet.uid}-planet`
                    )
                      ? "btn-danger"
                      : "btn-outline-danger"
                  } favorite-btn`}
                  onClick={() => handleFavoriteClick(planet)}
                >
                  <i
                    className={`fas ${
                      store.favorites.some(
                        (fav) => fav.uniqueId === `${planet.uid}-planet`
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
