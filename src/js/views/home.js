import React from "react";
import starwars from "../../img/starwars-logo.png";
import "../../styles/home.css";

export const Home = () => (
  <div className="text-center mt-5">
    <h1></h1>
    <p>
      <img id="logo" src={starwars} />
    </p>
    <a href="#" className="btn btn-warning mt-5">
      May the force be with you
    </a>
  </div>
);
