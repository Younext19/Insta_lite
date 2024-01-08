import React from "react";
import "./DeleteUserModal.css"; // Import the CSS file
import CustomButton from "../../../../components/Button/CustomButton";

const DeleteUserModal = ({ showModal, closeModal, handleDelete, userName }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div
        className="modal-content delete-confirmation"
        onClick={(res) => res.stopPropagation()}
      >
        <p>Etes vous sur de vouloir supprimer {userName}</p>
        <div className="button-container">
          <CustomButton
            text={"Oui"}
            onClick={() => {
              handleDelete();
              window.location.reload();
            }}
            type={"submit"}
          />
          <CustomButton text={"Non"} onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
