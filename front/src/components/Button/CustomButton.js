import React from "react";

const CustomButton = ({
  text,
  backgroundColor,
  textColor,
  onClick,
  personnalisedWidth,
  personnalisedMarginTop,
  type,
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "#3498db",
    color: textColor || "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontWeight: "bold",
    width: personnalisedWidth,
    marginTop: personnalisedMarginTop || "0px",
  };

  return (
    <button style={buttonStyle} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default CustomButton;
