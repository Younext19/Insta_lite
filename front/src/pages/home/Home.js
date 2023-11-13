import React, { useState } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import illustration from "../../assets/illustration.png";
import Button from "../../components/Button/Button";

export default function Home() {
  const [selectedPage, setselectedPage] = useState("Home");

  return (
    <>
      <Navbar selectedPage={selectedPage} setselectedPage={setselectedPage} />

      <div className="homePage">
        <div className="homePage__left">
          <div className="centeredContent">
            <img src={illustration} className="illustrationImage" />
          </div>
        </div>
        <div className="homePage__right">
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
              onClick={() => console.log("navigate to login")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
