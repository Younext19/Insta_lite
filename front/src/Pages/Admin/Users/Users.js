import React, { useEffect } from "react";
import Table from "../components/Table/Table";

import "./Users.css";
import CustomButton from "../../../components/Button/CustomButton";
import { EyeIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import { useState } from "react";
import DeleteUserModal from "./components/DeleteUserModal";
import EditUserModal from "./components/EditUserModal";
import AddUserModal from "./components/AddUserModal";
import { deleteUser, getUsers } from "../../../api/users";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDM2NDA2MDQsImZ1bGxuYW1lIjoiYWRtaW4iLCJzdWIiOiJhZG1pbkBhZG1pbi5mcnIifQ._LpIE7ewCWL0deA6ujsMeOnjzOS2Us3zx9R7M9OvJtk";
  useEffect(() => {
    getUsers(token).then((data) => setUserData(data));
  }, []);

  const deleteUserFunc = () => {
    console.log("delete");
    deleteUser(token, selectedUser.id).then((data) => {
      setDeleteUserModal(false);
      getUsers(token).then((data) => setUserData(data));
    });
  };
  const addUserFunc = () => {
    console.log("add");
  };
  return (
    <div className="userContent">
      <div className="tableInfo">
        <p className="tableTitle">Gestion des utilisateurs </p>
        <p className="tableDescription">
          Dans cette page vous auriez la possibilité de modifier un utilisateur
        </p>

        <div className="tableHeader">
          <input className="searchInput" placeholder="Search dazdza" />
          <CustomButton
            text={"Ajouter"}
            onClick={() => setAddUserModal(true)}
          />
        </div>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom & Prénom</th>
            <th>Pseudo</th>

            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        {userData?.length > 0 ? (
          userData?.map((user, index) => (
            <tr key={index}>
              <td>{user.fullname ? user.fullname : "N/A"}</td>
              <td>{user.pseudo ? user.pseudo : "N/A"}</td>
              <td>{user.mail}</td>
              <td>{user.role}</td>
              <td>
                <div className="actionsContainer">
                  <div
                    className="editIcon"
                    onClick={() => setEditUserModal(true)}
                  >
                    <PencilIcon size={24} />
                  </div>
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      setDeleteUserModal(true);
                      setSelectedUser(user);
                    }}
                  >
                    <TrashIcon size={24} />
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No users found</td>
          </tr>
        )}
      </table>
      <DeleteUserModal
        showModal={deleteUserModal}
        closeModal={() => setDeleteUserModal(false)}
        userName={selectedUser.fullname}
        handleDelete={deleteUserFunc}
      />
      <AddUserModal
        showModal={addUserModal}
        handleClose={() => setAddUserModal(false)}
      />
    </div>
  );
}
