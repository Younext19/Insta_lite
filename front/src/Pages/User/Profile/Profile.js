import React from "react";
import instagram from "../../../assets/instagram.png";
import "./Profile.css";
import CustomButton from "../../../components/Button/CustomButton";
import EditableInput from "./Components/EditableInput";

export default function Profile() {
  const isConnected = true;

  return (
    <div className="profileContainer">
      <div className="profile-header">
        <img
          className="profile-picture"
          src={instagram}
          alt={`younes's profile`}
        />
        <div className="profile-details">
          <p className="profile-username">Younes</p>
          <p className="profile-bio">this is a simple desc</p>
        </div>
      </div>
      <div className="separator" />
      <div className="editProfile">
        <EditableInput initialValue={"Younes"} editableLabel={"Pseudonyme"} />
        <EditableInput
          initialValue={"Younes@gmail.com"}
          editableLabel={"Email"}
        />
        <EditableInput
          initialValue={"Ceci est une description"}
          editableLabel={"Description"}
        />
      </div>
    </div>
  );
}
