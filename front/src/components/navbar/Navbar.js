import React, { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import instaLogo from "../../assets/instagram.png";
import Button from "../Button/Button";

export default function Navbar({ selectedPage, setselectedPage }) {
  const [ToggleMenu, setToggleMenu] = useState(false);
  return (
    <header>
      <div className="normal-navbar">
        <img src={instaLogo} width={50} height={50} alt="instaLogo" />
        <div className="centered_bar">
          <div className="navbar__item">
            <a
              className={selectedPage === "Home" ? "selected" : "navTextStyle"}
              onClick={() => {
                setselectedPage("Home");
              }}
              href="#home"
            >
              Home
            </a>
          </div>

          <div className="navbar__item">
            <a
              className={
                selectedPage === "Contact" ? "selected" : "navTextStyle"
              }
              onClick={() => {
                setselectedPage("Contact");
              }}
              href="#contact"
            >
              Contactez nous
            </a>
          </div>
          <div className="navbar__item">
            <Button title="Get started" className="getStartedButton" />
          </div>
        </div>
      </div>
      <div className="app__navbar-smallscreen">
        {ToggleMenu ? (
          <div />
        ) : (
          <GiHamburgerMenu
            color="#222e50"
            fontSize={30}
            onClick={() => {
              setToggleMenu(!ToggleMenu);
            }}
          />
        )}

        {ToggleMenu && (
          <div className="small_screen_navbar show-box">
            <GiHamburgerMenu
              color="#222e50"
              fontSize={30}
              onClick={() => {
                setToggleMenu(!ToggleMenu);
              }}
            />
            <div className="navbar__item">
              <a
                className={selectedPage == "Home" ? "selected" : "navTextStyle"}
                onClick={() => {
                  setselectedPage("Home");
                  setToggleMenu(!ToggleMenu);
                }}
                href="#home"
              >
                Home
              </a>
            </div>

            <div className="navbar__item">
              <a
                className={
                  selectedPage === "Contact" ? "selected" : "navTextStyle"
                }
                onClick={() => {
                  setselectedPage("Contact");
                  setToggleMenu(!ToggleMenu);
                }}
                href="#contact"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
