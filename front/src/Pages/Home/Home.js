// Home.js

import React from "react";
import "./Home.css";
import illustration from "../../assets/illustration.png";
import CustomButton from "../../components/Button/CustomButton";
import { Navigate } from "react-router-dom";
import { HOME } from "../../utils/routes";

const Home = () => {
  return (
    <div className="homeContainer">
      <img src={illustration} className="illustrationImage" />
      <div className="centeredContent">
        <p className="title">Amstagram</p>
        <p className="description">
          your new photo-sharing hub! Capture and share life's moments
          effortlessly. Explore a vibrant feed, connect with friends, and
          express yourself with likes and comments.
        </p>
        <CustomButton text={"Get Started"} onClick={() => Navigate(HOME)} />
      </div>
      {/* Add your content here */}
    </div>
  );
};

export default Home;
