import React, { useState } from "react";
import "./LandingPage.css";
import illustration from "../../assets/illustration.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [selectedPage, setselectedPage] = useState("Home");
  const navigate = useNavigate();

  return (
    <>
      <div className="landing_container">
        <div className="landing__left">
          <div className="centeredContent">
            <img src={illustration} className="illustrationImage" />
          </div>
        </div>
        <div className="landing_right">
          <div className="centeredContent">
            <p className="title">Amstagram</p>
            <p className="description">
              your new photo-sharing hub! Capture and share life's moments
              effortlessly. Explore a vibrant feed, connect with friends, and
              express yourself with likes and comments.
            </p>
            <Button
              title="Get started"
              className="getStartedButton"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
