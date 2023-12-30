import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Signup.css";
import instaLogo from "../../../assets/instagram.png";
import mail from "../../../assets/mail.png";
import pw from "../../../assets/password.png";
import user from "../../../assets/user.png";
import idCard from "../../../assets/id-card.png";
import visible from "../../../assets/visible.png";
import hide from "../../../assets/hide.png";
import { signup } from "../../../api/auth";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  fullName: Yup.string().required("Full Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  verifyPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Signup() {
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
    console.log("Form submitted:", formik.values);
    const userData = {
      mail: formik.values.email,
      fullName: formik.values.fullName,
      pseudo: formik.values.username,
      password: formik.values.password,
    };

    signup(userData)
      .then((res) => {
        // TODO: set token in localstorage & set user in jotai
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // Add your registration logic here
  };

  return (
    <div className="container">
      <div className="boxForm">
        <div className="signupHeader">
          <img src={instaLogo} alt="instaLogo" className="instaLogo" />
          <p className="instaTitle">Instagram</p>
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

        <a className="submitButton" onClick={onSubmit}>
          Créer un compte
        </a>
        <a
          className="alreadyHaveAnAccount"
          onClick={() => {
            console.log("redirect to /signup");
          }}
          href="login"
        >
          Se connecter à un compte existant
        </a>
      </div>
    </div>
  );
}
