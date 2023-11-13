import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import instaLogo from "../../assets/instagram.png";

import "./Sidebar.css";
import NavItem from "./NavItem";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavItem title="Accueil" link="/" />
          </li>
          <li>
            <NavItem title="Feed" link="/feed" />
          </li>
          <li>
            <NavItem title="Profile" link="/profile" />
          </li>
          <li className="bottomContent">
            <p className="clickableUsername">Disconnect Button</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
