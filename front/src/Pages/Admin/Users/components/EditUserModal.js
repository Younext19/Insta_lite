import React, { useEffect } from "react";
import "./EditUserModal.css"; // Import your custom CSS for styling
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { patchUser } from "../../../../api/users";

const UserSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  pseudo: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const EditUserModal = ({ showModal, handleClose, userData }) => {
  const token = localStorage.getItem("user-token");
  const formik = useFormik({
    initialValues: {
      fullName: userData.fullname || "",
      email: userData.mail || "",
      pseudo: userData.pseudo || "",
      role: userData.role || "ROLE_UTILISATEUR",
      hasPrivileges: userData.hasPrivileges || false,
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      handleClose();
      resetForm();
    },
  });

  useEffect(() => {
    // Check if userData exists and has values
    if (userData && Object.keys(userData).length > 0) {
      formik.setValues({
        fullName: userData.fullname || "",
        pseudo: userData.pseudo || "",
        role: userData.role || "ROLE_UTILISATEUR",
        hasPrivileges: userData.hasPrivileges || false,
      });
    }
  }, [userData, formik.setValues]);

  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  const editUsr = () => {
    const data = {
      fullname: formik.values.fullName,
      pseudo: formik.values.pseudo,
      role: formik.values.role,
      hasPrivileges: formik.values.hasPrivileges,
    };
    patchUser(token, data, userData.id);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <h2>Modifier un utilisateur</h2>
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
          {/** Has privilege checkbox */}
          <div className="hasPrivileges">
            <label htmlFor="hasPrivileges">
              Un utilisateur avec des privilèges
            </label>
            <input
              type="checkbox"
              id="hasPrivileges"
              name="hasPrivileges"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.hasPrivileges}
            />
          </div>

          <CustomButton text={"Modifier"} onClick={editUsr} />
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
