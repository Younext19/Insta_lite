// Navbar.js

import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideBar.css";
import CustomButton from "../Button/CustomButton";
import { FEED, HOME, LOGIN, POSTS, PROFILE, USERS } from "../../utils/routes";
import { useAtom } from "jotai";
import { userAtom } from "../../services/userService";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useAtom(userAtom);

  const [userRole, setUserRole] = useState(localStorage.getItem("user-role"));
  const [token, setToken] = useState(localStorage.getItem("user-token"));

  const adminLinks = useMemo(
    () => [
      { to: HOME, label: "Accueil" },
      { to: FEED, label: "Publications" },
      { to: POSTS, label: "Gestion des publications" },
      { to: USERS, label: "Gestion des utilisateurs" },
    ],
    []
  );

  const visitorsLinks = useMemo(
    () => [
      { to: HOME, label: "Home" },
      { to: FEED, label: "Feed" },
    ],
    []
  );

  const userLinks = useMemo(
    () => [...visitorsLinks, { to: PROFILE, label: "Profile" }],
    [visitorsLinks]
  );

  const links = useMemo(() => {
    if (userRole === "ROLE_ADMINISTRATEUR") {
      return adminLinks;
    }

    if (userRole === "ROLE_UTILISATEUR") {
      return userLinks;
    }

    return visitorsLinks;
  }, [userRole, adminLinks, userLinks, visitorsLinks]);

  const disconnectUser = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-role");
    setToken(null);
    setUserRole(null);
    setUser(null);
    navigate(HOME);
  };

  const redirectToLogin = () => {
    navigate(LOGIN);
  };

  useEffect(() => {
    setToken(localStorage.getItem("user-token"));
    setUserRole(localStorage.getItem("user-role"));
  }, [user]);

  return (
    <nav>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to} className={pathname === to ? "selected" : ""}>
            <Link to={to} className="labelStyle">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="positionEnd">
        {token ? (
          <CustomButton
            text="Se déconnecter"
            onClick={disconnectUser}
            personnalisedWidth={"70%"}
          />
        ) : (
          <CustomButton
            text="S'authentifier"
            onClick={redirectToLogin}
            personnalisedWidth={"70%"}
          />
        )}
      </div>
    </nav>
  );
};

export default SideBar;
