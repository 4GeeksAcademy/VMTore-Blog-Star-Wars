import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-transparent">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="navbar-brand mb-0 p-2 h1">
          <i className="fab fa-jedi-order"></i> StarWars Database©
        </span>
      </Link>
      <div className="ms-auto p-2">
        <Link to="/characters">
          <button
            className="btn btn-warning mx-2"
            onClick={() => actions.getCharactersList()}
          >
            Characters
          </button>
        </Link>
        <Link to="/planets">
          <button
            className="btn btn-warning mx-2"
            onClick={() => actions.getPlanetsList()}
          >
            Planets
          </button>
        </Link>
        <Link to="/vehicles">
          <button
            className="btn btn-warning mx-2"
            onClick={() => actions.getVehiclesList()}
          >
            Vehicles
          </button>
        </Link>
        <Link to="/favorites">
          <button className="btn btn-warning mx-2">
            <i className="fas fa-heart"></i> {store.favorites.length}
          </button>
        </Link>
      </div>
    </nav>
  );
};
