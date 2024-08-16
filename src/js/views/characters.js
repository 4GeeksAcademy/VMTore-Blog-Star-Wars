import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { InfoModal } from "../component/infoModal";
import { Modal, Button } from "react-bootstrap";

export const Characters = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  useEffect(() => {
    actions.getCharactersList(); // Llama la acción para obtener la lista de personajes
  }, [actions]);

  const handleFavoriteClick = (character) => {
    const type = "character"; // Especificamos el tipo de ítem
    actions.addToFavorites(character, type);
  };

  const handleShowModal = (character) => {
    setCurrentItem(character);
    setItemType("character");
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row">
        {store.characters.map((character) => (
          <div className="col-md-3 col-sm-4 g-2" key={character.uid}>
            <div
              className="card mt-3 mb-3 cards"
              style={{ width: "18rem", position: "relative" }}
            >
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                className="card-img-top"
                alt={character.properties.name}
              />
              <div className="card-body">
                <h5 className="card-title">{character.properties.name}</h5>
                <p className="card-text">
                  Gender: {character.properties.gender}
                  <br />
                  Birth Year: {character.properties.birth_year}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowModal(character)}
                  >
                    Learn more
                  </button>
                  <button
                    className={`btn ${
                      store.favorites.some(
                        (fav) => fav.uniqueId === `${character.uid}-character`
                      )
                        ? "btn-danger"
                        : "btn-outline-danger"
                    } favorite-btn`}
                    onClick={() => handleFavoriteClick(character)}
                  >
                    <i
                      className={`fas ${
                        store.favorites.some(
                          (fav) => fav.uniqueId === `${character.uid}-character`
                        )
                          ? "fa-heart"
                          : "fa-heart"
                      }`}
                    ></i>
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
