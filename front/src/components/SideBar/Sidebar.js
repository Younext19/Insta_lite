import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import instaLogo from "../../assets/instagram.png";

import "./Sidebar.css";
import NavItem from "../NavItem/NavItem";

const Sidebar = ({ isLogged }) => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavItem title="Accueil" link="/home" />
          </li>
          <li>
            <NavItem title="Feed" link="/feed" />
          </li>
          <li>
            <NavItem title="Profile" link={isLogged ? "/profile" : "/login"} />
          </li>
          {isLogged ? (
            <li className="bottomContent">
              <p className="clickableUsername">Disconnect Button</p>
            </li>
          ) : (
            <li className="bottomContent">
              <p className="clickableUsername">Login</p>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
