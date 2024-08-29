import React, { useState } from "react";
import { useAtom } from "jotai";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Login.css";
import instaLogo from "../../../assets/instagram.png";
import mail from "../../../assets/mail.png";
import pw from "../../../assets/password.png";
import CustomButton from "../../../components/Button/CustomButton";
import { login } from "../../../api/auth";
import { userAtom } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../utils/routes";

const LoginSchema = Yup.object().shape({
  mail: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [, setUser] = useAtom(userAtom);
  const [pwvis, setpwvis] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: LoginSchema,
  });

  const onSubmit = () => {
    const loginData = {
      username: formik.values.mail.toLocaleLowerCase(),
      password: formik.values.password,
    };
    login(loginData)
      .then((res) => {
        // save token to local storage
        localStorage.setItem("user-token", res.data.access_token);
        localStorage.setItem("user-role", res.data.role);
        setUser(res.data);
        navigate(HOME);
      })
      .catch((err) => {
        alert("Échec de connexion !");
      });
  };

  return (
    <div className="container">
      <div className="boxForm">
        <div className="signupHeader">
          <img src={instaLogo} alt="instaLogo" className="instaLogo" />
          <p className="instaTitle">Amstagram</p>
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
            type={pwvis ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          <a
            href="#"
            onClick={() => {
              setpwvis(!pwvis);
            }}
          >
            <img src={pw} alt="password" className="passwordIcon" />
          </a>{" "}
        </div>

        <CustomButton
          text={"Se connecter"}
          onClick={onSubmit}
          personnalisedWidth={"50%"}
          personnalisedMarginTop={"20px"}
          type="submit"
        />

        <a className="createAccount" href="signup">
          Créer un compte
        </a>
      </div>
    </div>
  );
}
