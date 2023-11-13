import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Login.css";
import instaLogo from "../../../assets/instagram.png";
import mail from "../../../assets/mail.png";
import pw from "../../../assets/password.png";
import user from "../../../assets/user.png";
import FormInput from "../../../components/formInput/FormInput";
import Button from "../../../components/Button/Button";
import Sidebar from "../../../components/SideBar/Sidebar";

const LoginSchema = Yup.object().shape({
  mail: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [validFormStyle, setValidFormStyle] = useState(false);

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Add your login logic here
    },
  });
  useEffect(() => {
    setValidFormStyle(formik.isValid);
    if (formik.values.mail === "") {
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
          value={formik.values.mail}
          placeholder={"Email"}
          name={"mail"}
          type={"mail"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.mail}
          errorMessage={formik.touched.mail && formik.errors.mail}
          src={mail}
          imgStyle={"image"}
        />

        <FormInput
          value={formik.values.password}
          placeholder={"Mot de passe"}
          name={"password"}
          type={"password"}
          inputStyle={"formInput"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={!formik.errors.password}
          errorMessage={formik.touched.password && formik.errors.password}
          src={pw}
          imgStyle={"image"}
        />

        <Button
          className={validFormStyle ? "submitButton" : "disabledSubmitButton"}
          title={"Login"}
          onClick={formik.handleSubmit}
        />

        <a className="createAccount" href="signup">
          Create a new account
        </a>
      </div>
    </div>
  );
}
