import React from "react";
import starwars from "../../img/starwars-logo.png";
import git_icon from "../../img/GH.png";
import "../../styles/home.css";

export const Home = () => (
  <div className="text-center mt-5">
    <h1></h1>
    <p>
      <img id="logo" src={starwars} />
    </p>
    <p className="mt-5 subtitle">May the force be with you</p>
  </div>
);
