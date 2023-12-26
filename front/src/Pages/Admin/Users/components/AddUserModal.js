import React from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Invalid email").required("Email is required"),
  pseudo: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const AddUserModal = ({ showModal, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      pseudo: "",
      role: "utilisateur",
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted:", values);
      // Add your login logic here

      // Assuming some asynchronous logic is being performed (e.g., API request)
      // await yourAsyncSubmitFunction(values);

      // Reset the form to its initial values
      handleClose();
      resetForm();
    },
  });

  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Ajouter un utilisateur</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            value={formik.values.fullName}
            onChange={formik.handleChange}
            name="fullName"
            onBlur={formik.handleBlur}
            type="text"
            id="fullName"
            required
          />

          <label htmlFor="pseudo">Pseudo:</label>
          <input
            value={formik.values.pseudo}
            onChange={formik.handleChange}
            name="pseudo"
            onBlur={formik.handleBlur}
            type="text"
            id="pseudo"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            required
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            name="role"
            onBlur={formik.handleBlur}
            required
          >
            <option value="utilisateur">Utilisateur Normal</option>
            <option value="administrateur">Administrateur</option>
            <option value="utilisateur_privilege">
              Utilisateur avec Privilège
            </option>
          </select>

          <CustomButton text={"Ajouter"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
