import React from "react";
import "./AddUserModal.css"; // Import your custom CSS for styling
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser } from "../../../../api/users";

const UserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Invalid email").required("Email is required"),
  pseudo: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});

const AddUserModal = ({ showModal, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      pseudo: "",
      role: "ROLE_UTILISATEUR",
      password: "",
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      handleClose();
      resetForm();
    },
  });

  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  const addUsr = () => {
    const token = localStorage.getItem("user-token");

    const data = {
      fullname: formik.values.fullName,
      mail: formik.values.email,
      pseudo: formik.values.pseudo,
      role: formik.values.role,
      password: formik.values.password,
      hasPrivileges: formik.values.hasPrivileges,
    };
    addUser(token, data).then((res) => {
      window.location.reload();
    });
  };

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
          <label htmlFor="password">Mot de passe:</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
            type="text"
            id="password"
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
            <option value="ROLE_UTILISATEUR">Utilisateur Normal</option>
            <option value="ROLE_ADMINISTRATEUR">Administrateur</option>
          </select>
          {/** Has priviliege cehckbox */}
          <div className="hasPrivileges">
            <label htmlFor="hasPrivileges">
              Un utilisateur avec des privilege
            </label>
            <input
              type="checkbox"
              id="hasPrivileges"
              name="hasPrivileges"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hasPriviliege}
            />
          </div>

          <CustomButton text={"Ajouter"} onClick={addUsr} />
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
