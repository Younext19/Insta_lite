// AddPostModal.js

import React, { useState } from "react";
import "./AddPostModal.css"; // Import the CSS file
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  file: Yup.string().required("Full Name is required"),
  titre: Yup.string().required("Invalid email").required("Email is required"),
  private: Yup.boolean(),
});
const AddPostModal = ({ showModal, closeModal, handleAddPost }) => {
  const formik = useFormik({
    initialValues: {
      file: "",
      titre: "",
      private: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted:", values);
      // Add your login logic here

      // Assuming some asynchronous logic is being performed (e.g., API request)
      // await yourAsyncSubmitFunction(values);

      // Reset the form to its initial values
      resetForm();
      closeModal();
    },
  });

  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div
        className="modal-content add-post-modal"
        onClick={(res) => res.stopPropagation()}
      >
        <h2>Ajouter une publication</h2>
        <div className="input-group">
          <label>
            {/* Display custom file input button */}
            <div className="custom-file-input">
              <span>Parcourir une image</span>
              <input
                type="file"
                accept="image/*"
                onChange={formik.handleChange}
                name="file"
                onBlur={formik.handleBlur}
                id="file"
                required
              />
            </div>
          </label>
          {/* Display selected file name */}
          {formik.values && (
            <span className="custom-file-label">{formik.values.file}</span>
          )}
        </div>
        <div className="input-group">
          <input
            type="text"
            value={formik.values.titre}
            onChange={formik.handleChange}
            name="titre"
            onBlur={formik.handleBlur}
            className="titleInput"
            placeholder="Entrer un titre"
          />
        </div>
        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={formik.values.private}
              onChange={formik.handleChange}
              name="private"
              onBlur={formik.handleBlur}
            />
            Private
          </label>
        </div>
        <CustomButton
          text={"Add Post"}
          onClick={formik.handleSubmit}
          type={"submit"}
        />
      </div>
    </div>
  );
};

export default AddPostModal;
