// Error.js

import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import "./Error.css";
import error from "../../assets/404.png";
const Error = () => {
  return (
    <div className="error-container">
      <img src={error} alt="Error" className="error-image" />
      <h1 className="error-text">Oops ! Quelque chose s'est mal passé.</h1>
      <p className="error-description">
        La page que vous cherchez pourrait être temporairement indisponible.{" "}
      </p>
      <Link to="/home">
        {/* Replace "/home" with the path you want to redirect to */}
        <button className="error-button">Aller à la page d'accueil</button>
      </Link>
    </div>
  );
};

export default Error;
