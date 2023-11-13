import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Signup.css";
import Button from "../../../components/Button/Button";
import instaLogo from "../../../assets/instagram.png";
import mail from "../../../assets/mail.png";
import pw from "../../../assets/password.png";
import user from "../../../assets/user.png";
import idCard from "../../../assets/id-card.png";
import visible from "../../../assets/visible.png";
import hide from "../../../assets/hide.png";
import FormInput from "../../../components/formInput/FormInput";

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
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Add your registration logic here
    },
  });

  useEffect(() => {
    setValidFormStyle(formik.isValid);
    if (formik.values.email === "") {
      setValidFormStyle(false);
    }
  }, [formik.isValid]);

  return (
    <div className="container">
      <div className="boxForm">
        <div className="signupHeader">
          <img src={instaLogo} alt="instaLogo" className="instaLogo" />
          <p className="instaTitle">Instagram</p>
        </div>

        <FormInput
          value={formik.values.email}
          placeholder={"Email"}
          name={"email"}
          type={"email"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.email}
          errorMessage={formik.touched.email && formik.errors.email}
          src={mail}
          imgStyle={"image"}
        />

        <FormInput
          value={formik.values.fullName}
          placeholder={"Nom et prénom"}
          name={"fullName"}
          type={"text"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.fullName}
          errorMessage={formik.touched.fullName && formik.errors.fullName}
          src={idCard}
          imgStyle={"image"}
        />

        <FormInput
          value={formik.values.username}
          placeholder={"Pseudo"}
          name={"username"}
          type={"text"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.username}
          errorMessage={formik.touched.username && formik.errors.username}
          src={user}
          imgStyle={"image"}
        />

        <FormInput
          value={formik.values.password}
          placeholder={"Mot de passe"}
          name={"password"}
          type={passwordVisible ? "text" : "password"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.password}
          errorMessage={formik.touched.password && formik.errors.password}
          src={passwordVisible ? visible : hide}
          imgStyle={"image"}
          onImgPress={() => {
            setPasswordVisible(!passwordVisible);
          }}
        />

        <FormInput
          value={formik.values.verifyPassword}
          placeholder={"Confirmer mot de passe"}
          name={"verifyPassword"}
          type={confirmPasswordVisible ? "text" : "password"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.verifyPassword}
          errorMessage={
            formik.touched.verifyPassword && formik.errors.verifyPassword
          }
          src={confirmPasswordVisible ? visible : hide}
          imgStyle={"image"}
          onImgPress={() => {
            setConfirmPasswordVisible(!confirmPasswordVisible);
          }}
        />

        <Button
          title={"Register"}
          className={validFormStyle ? "submitButton" : "disabledSubmitButton"}
          onClick={formik.handleSubmit}
        />

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
