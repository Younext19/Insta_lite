import React from "react";
import "./NavItem.css";
export default function NavItem({ title, link }) {
  return (
    <div className="navItem">
      <a className="item" href={link}>
        {title}
      </a>
    </div>
  );
}
