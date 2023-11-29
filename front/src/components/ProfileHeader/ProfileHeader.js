import React from "react";
import "./ProfileHeader.css";
import defaultProfilePicture from "../../assets/instagram.png";

export default function ProfileHeader({ userData, onClick }) {
  return (
    <>
      <div className="profile-info">
        <div className="profile-header">
          <img
            className="profile-picture"
            src={userData.profilePicture || defaultProfilePicture}
            alt={`younes's profile`}
          />
          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>{userData.description}</p>
            <button className="edit-profile-button" onClick={onClick}>
              Modifier votre mot de passe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
