import React, { Component } from "react";
import git_icon from "../../img/GH.png";
export const Footer = () => {
  return (
    <nav
      className="navbar fixed-bottom bg-body-tertiary footer-bar"
      data-bs-theme="dark"
    >
      <div className="container-fluid justify-content-center">
        <a
          className="navbar-brand"
          target="_blank"
          href="https://github.com/VMTore"
        >
          Made with the force <i className="fab fa-jedi-order"></i> by ©VMTore{" "}
          <img className="git-img" src={git_icon} />
        </a>
      </div>
    </nav>
  );
};
