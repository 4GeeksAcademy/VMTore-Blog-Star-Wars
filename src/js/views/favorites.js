import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { InfoModal } from "../component/infoModal";
import { Modal, Button } from "react-bootstrap";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  const handleShowModal = (item) => {
    setCurrentItem(item);
    setItemType(item.type);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="text-center favorites-title">Your Favorites</h1>
      <div className="row">
        {store.favorites.map((item) => (
          <div className="col-md-3 col-sm-4 g-2" key={item.uniqueId}>
            <div
              className="card mt-3 mb-3 cards"
              style={{ width: "18rem", height: "35rem" }}
            >
              <img
                src={
                  item.type === "character"
                    ? `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`
                    : item.type === "planet"
                    ? `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`
                    : `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`
                }
                className="card-img-top"
                alt={item.properties.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.properties.name}</h5>
                <p className="card-text">
                  {item.type === "character" && (
                    <>
                      Gender: {item.properties.gender}
                      <br />
                      Birth Year: {item.properties.birth_year}
                    </>
                  )}
                  {item.type === "planet" && (
                    <>
                      Climate: {item.properties.climate}
                      <br />
                      Population: {item.properties.population}
                    </>
                  )}
                  {item.type === "vehicle" && (
                    <>
                      Model: {item.properties.model}
                      <br />
                      Manufacturer: {item.properties.manufacturer}
                    </>
                  )}
                </p>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowModal(item)}
                  >
                    Learn more
                  </button>
                  <button
                    className="btn btn-danger favorite-btn"
                    onClick={() => actions.addToFavorites(item, item.type)}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
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
