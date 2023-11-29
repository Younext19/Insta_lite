import React from "react";
import "./NavItem.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavItem({ title, link }) {
  console.log(link);
  const location = useLocation();

  return (
    <Link
      className={`navItem ${location.pathname === link ? "selected" : ""}`}
      to={link}
    >
      {title}
    </Link>
  );
}
