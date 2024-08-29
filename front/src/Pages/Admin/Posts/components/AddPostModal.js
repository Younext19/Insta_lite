// AddPostModal.js

import React, { useState } from "react";
import "./AddPostModal.css"; // Import the CSS file
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPost } from "../../../../api/posts";

const LoginSchema = Yup.object().shape({
  file: Yup.string().required("Full Name is required"),
  titre: Yup.string().required("Invalid email").required("Email is required"),
  private: Yup.boolean(),
});
const AddPostModal = ({ showModal, closeModal }) => {
  const [file, setFiles] = useState(null);
  const token = localStorage.getItem("user-token");
  const formik = useFormik({
    initialValues: {
      file: "",
      titre: "",
      private: false,
    },
    validationSchema: LoginSchema,
  });

  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  const validateFileSize = () => {
    // Check if a file is selected
    if (file) {
      // Check the file size (in bytes)
      const maxSizeInBytes = 1048576; // 1 MB
      if (file.size > maxSizeInBytes) {
        setFiles(null);
        alert("File size is too large. Please pick a smaller file.");
      } else {
        setFiles(file);
      }
    }
  };
  const addPostevent = () => {
    validateFileSize();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", formik.values.titre);
    formData.append("isPrivate", formik.values.private);

    addPost(token, formData).then((res) => {
      closeModal();
    });
  };
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
                onChange={(event) => {
                  formik.setFieldValue("file", event.target.files[0].name);
                  setFiles(event.target.files[0]);
                }}
                name="file"
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
          text={"Ajouter une publication"}
          onClick={() => {
            window.location.reload();
            addPostevent();
          }}
          type={"submit"}
        />
      </div>
    </div>
  );
};

export default AddPostModal;
