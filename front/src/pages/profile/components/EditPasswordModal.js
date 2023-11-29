import React, { useState } from "react";
import CustomModal from "../../../components/Modal/CustomModal";
import FormInput from "../../../components/formInput/FormInput";
import Button from "../../../components/Button/Button";

export default function EditPasswordModal({ visible, onRequestClose }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const onChangeCurrentPassword = (e) => {
    setCurrentPw(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPw(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPw(e.target.value);
  };
  function submitEditPassword() {
    console.log("submitEditPassword");
    onRequestClose();
  }
  return (
    <CustomModal isOpen={visible} onRequestClose={onRequestClose}>
      <div>
        <p className="titleText">Votre mot de passe</p>
        <FormInput
          value={currentPw}
          type={"password"}
          onChange={onChangeCurrentPassword}
          withImg={false}
          inputStyle={"formInput"}
          withButton={false}
          isValid={true}
          placeholder={"Votre mot de passe"}
        />
        <p className="titleText">Nouveau mot de passe</p>

        <FormInput
          value={newPw}
          type={"password"}
          onChange={onChangeNewPassword}
          withImg={false}
          inputStyle={"formInput"}
          withButton={false}
          isValid={true}
          placeholder={"Nouveau mot de passe"}
        />
        <FormInput
          value={confirmPw}
          type={"password"}
          onChange={onChangeConfirmPassword}
          withImg={false}
          inputStyle={"formInput"}
          withButton={false}
          isValid={true}
          placeholder={"Confirmez votre mot de passe"}
        />
        <div className="buttons">
          <Button
            className={"submitButton"}
            title="Réinitialiser"
            onClick={submitEditPassword}
          />
        </div>
      </div>
    </CustomModal>
  );
}
