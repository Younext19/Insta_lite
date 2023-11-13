import React from "react";
import "./Button.css";
export default function Button({ title, onClick, className, disabled }) {
  return (
    <>
      <button className={className} onClick={onClick} disabled={disabled}>
        {title}
      </button>
    </>
  );
}
