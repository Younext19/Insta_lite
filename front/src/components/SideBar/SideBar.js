// Navbar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import CustomButton from "../Button/CustomButton";

const SideBar = ({ userRole }) => {
  const adminLinks = [
    { to: "/home", label: "Accueil" },
    { to: "/feed", label: "Publications" },
    { to: "/posts", label: "Gestion des publications" },
    { to: "/users", label: "Gestion des utilisateurs" },
  ];

  const userLinks = [
    { to: "/home", label: "Home" },
    { to: "/feed", label: "Feed" },
    { to: "/profile", label: "Profile" },
  ];

  const links = userRole === "admin" ? adminLinks : userLinks;

  const token = localStorage.getItem("token");

  const [selectedLink, setSelectedLink] = useState(
    // Retrieve the selected link from localStorage or set the default
    localStorage.getItem("selectedLink") || links[0].to
  );

  // Update the selected link in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedLink", selectedLink);
  }, [selectedLink]);

  function disconnectUser() {
    //Vider le cache & go to login
    console.log("user disconnected");
    console.log("🚀 ~ file: SideBar.js:25 ~ SideBar ~ token:", token);
    console.log("zebi");
  }
  return (
    <nav>
      <ul>
        {links.map(({ to, label }) => (
          <li
            key={to}
            className={selectedLink === to ? "selected" : ""}
            onClick={() => setSelectedLink(to)}
          >
            <Link to={to} className="labelStyle">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="positionEnd">
        <CustomButton
          text={token ? "Se déconnecter" : "S'authentifier"}
          onClick={disconnectUser}
          personnalisedWidth={"70%"}
        />
      </div>
    </nav>
  );
};

export default SideBar;
