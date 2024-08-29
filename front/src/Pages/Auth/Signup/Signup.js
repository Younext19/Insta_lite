import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Signup.css";
import instaLogo from "../../../assets/instagram.png";
import visible from "../../../assets/visible.png";
import hide from "../../../assets/hide.png";
import { signup } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../../utils/routes";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  fullName: Yup.string().required("Full Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Mot de passe est requis")
    .min(8, "Mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
    ),
  verifyPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mot de pase ne correspond pas")
    .required("Confirmation du mot de passe est requis"),
});

export default function Signup() {
  const navigate = useNavigate();

  const [validFormStyle, setValidFormStyle] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      username: "",
      password: "",
      verifyPassword: "",
    },
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    setValidFormStyle(formik.isValid);
    if (formik.values.email === "") {
      setValidFormStyle(false);
    }
  }, [formik.isValid]);
  // on submit
  const onSubmit = () => {
    const userData = {
      mail: formik.values.email,
      fullname: formik.values.fullName,
      pseudo: formik.values.username,
      password: formik.values.password,
      role: "ROLE_UTILISATEUR",
    };

    signup(userData)
      .then((res) => {
        navigate(LOGIN);
      })
      .catch((err) => {});
    // Add your registration logic here
  };

  return (
    <div className="container">
      <div className="boxForm">
        <div className="signupHeader">
          <img src={instaLogo} alt="instaLogo" className="instaLogo" />
          <p className="instaTitle">Amstagram</p>
        </div>

        <div className="username">
          <input
            className="usernameInput"
            placeholder="Nom d'utilisateur"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            onBlur={formik.handleBlur}
            type="text"
          />
        </div>
        <div className="nameInputWithIconn">
          <input
            className="nameInputt"
            placeholder="Nom complet"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            name="fullName"
            onBlur={formik.handleBlur}
            type="text"
          />
        </div>

        <div className="mailInputWithIcon">
          <input
            className="mailInput"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
            type="mail"
          />
        </div>

        <div className="passwordInputWithIcon">
          <input
            value={formik.values.password}
            className="passwordInput"
            type={passwordVisible ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          <img
            src={passwordVisible ? visible : hide}
            alt="password"
            className="passwordIcon"
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
          />
        </div>
        <div className="passwordInputWithIcon">
          <input
            value={formik.values.verifyPassword}
            className="passwordInput"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="verifyPassword"
          />
          <img
            src={confirmPasswordVisible ? visible : hide}
            alt="password"
            className="passwordIcon"
            onClick={() => {
              setConfirmPasswordVisible(!confirmPasswordVisible);
            }}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="errorText">{formik.errors.password}</div>
        )}
        <a className="submitButton" onClick={onSubmit}>
          Créer un compte
        </a>
        <a className="alreadyHaveAnAccount" onClick={() => {}} href="login">
          Se connecter à un compte existant
        </a>
      </div>
    </div>
  );
}
