import React from "react";
import FormInput from "../../../../components/formInput/FormInput";
import "./style.css";
import Button from "../../../../components/Button/Button";
export default function EditInfo({ userInfo }) {
  return (
    <div className="editInfoContainer">
      <div>
        <p className="editTitle">Modifier vos informations</p>
      </div>

      <p className="titleEdit">Nom et prénom</p>
      <FormInput
        value={""}
        type={"password"}
        withImg={false}
        inputStyle={"formInput"}
        withButton={false}
        isValid={true}
      />

      <p className="titleEdit">Bio</p>
      <FormInput
        value={""}
        type={"password"}
        withImg={false}
        inputStyle={"formInput"}
        withButton={false}
        isValid={true}
      />
      <div className="buttonContainer">
        <Button title={"Enregistrer"} className={"submitButton"} />
      </div>
    </div>
  );
}
