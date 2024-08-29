import React from "react";
import "./DeleteModal.css"; // Import the CSS file
import CustomButton from "../../../../components/Button/CustomButton";

const DeleteModal = ({ showModal, closeModal, handleDelete }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div
        className="modal-content delete-confirmation"
        onClick={(res) => res.stopPropagation()}
      >
        <p>Are you sure you want to delete this?</p>
        <div className="button-container">
          <CustomButton text={"Yes"} onClick={handleDelete} />
          <CustomButton text={"No"} onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
