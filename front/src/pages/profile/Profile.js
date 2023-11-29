import React, { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import "./Profile.css";
import defaultProfilePicture from "../../assets/instagram.png";

import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileSeparator from "../../components/ProfileSeparator/ProfileSeparator";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";
import CustomModal from "../../components/Modal/CustomModal";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/Button/Button";
import EditPasswordModal from "./components/EditPasswordModal";
import EditInfo from "./components/EditUserInfo/EditInfo";
export default function Profile() {
  const userData = {
    name: "John Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profilePicture: defaultProfilePicture,
  };

  const [modalVisibility, setModalVisibility] = useState(false);

  const editUser = () => {
    console.log("edit user");
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <ProfileHeader userData={userData} onClick={editUser} />
      <ProfileSeparator />

      <EditInfo userInfo={userData} />

      <EditPasswordModal
        visible={modalVisibility}
        onRequestClose={closeModal}
      />
    </>
  );
}
