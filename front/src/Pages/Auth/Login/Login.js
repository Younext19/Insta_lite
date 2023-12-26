import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Login.css";
import instaLogo from "../../../assets/instagram.png";
import mail from "../../../assets/mail.png";
import pw from "../../../assets/password.png";
import user from "../../../assets/user.png";
import CustomButton from "../../../components/Button/CustomButton";

const LoginSchema = Yup.object().shape({
  mail: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      console.log("🚀 ~ file: Login.js:25 ~ Login ~ values:", values);
      console.log("🚀 ~ file: Login.js:25 ~ Login ~ values:", values);
      // Add your login logic here
    },
  });

  return (
    <div className="container">
      <div className="boxForm">
        <div className="signupHeader">
          <img src={instaLogo} alt="instaLogo" className="instaLogo" />
          <p className="instaTitle">Instagram</p>
        </div>
        <div className="mailInputWithIcon">
          <input
            className="mailInput"
            placeholder="Email"
            value={formik.values.mail}
            onChange={formik.handleChange}
            name="mail"
            onBlur={formik.handleBlur}
            type="mail"
          />
          <img src={mail} alt="mail" className="mailIcon" />
        </div>
        <div className="passwordInputWithIcon">
          <input
            value={formik.values.password}
            className="passwordInput"
            type="password"
            placeholder="Mot de passe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          <img src={pw} alt="password" className="passwordIcon" />
        </div>

        <CustomButton
          text={"Login"}
          onClick={formik.handleSubmit}
          personnalisedWidth={"50%"}
          personnalisedMarginTop={"20px"}
          type={"submit"}
        />

        <a className="createAccount" href="signup">
          Create a new account
        </a>
      </div>
    </div>
  );
}
