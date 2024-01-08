// Home.js

import React from "react";
import "./Home.css";
import illustration from "../../assets/illustration.png";
import CustomButton from "../../components/Button/CustomButton";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../../utils/routes";

const Home = () => {
  function redirectToLogin() {
    Navigate(LOGIN);
  }
  const token = localStorage.getItem("user-token");

  return (
    <div className="homeContainer">
      <img src={illustration} className="illustrationImage" />
      <div className="centeredContent">
        <p className="title">Amstagram</p>
        <p className="description">
          Votre nouvelle plateforme de partage de photos ! Capturez et partagez
          les moments de la vie sans effort. Explorez un fil dynamique,
          connectez-vous avec des amis et exprimez-vous avec des likes et des
          commentaires.
        </p>
        {!token && (
          <a className="alreadyHaveAnAccount" onClick={() => {}} href="login">
            Commencer !
          </a>
        )}
      </div>
      {/* Add your content here */}
    </div>
  );
};

export default Home;
