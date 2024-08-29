import React from "react";
import Modal from "react-modal";

export default function CustomModal({
  isOpen,
  onRequestClose,
  children,
  ovf = "hidden",
}) {
  const customStyles = {
    content: {
      width: "50%",
      height: "420px",
      margin: "auto",
      borderRadius: "8px",
      overflow: ovf,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      {children}
    </Modal>
  );
}
