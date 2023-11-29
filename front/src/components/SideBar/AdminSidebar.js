import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import instaLogo from "../../assets/instagram.png";

import "./Sidebar.css";
import NavItem from "../NavItem/NavItem";

const AdminSideBar = ({ isLogged }) => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavItem title="Gestion des utilisateurs" link="/users" />
          </li>
          <li>
            <NavItem title="Gestion des images" link="/images" />
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

export default AdminSideBar;
