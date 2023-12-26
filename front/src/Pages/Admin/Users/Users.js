import React from "react";
import Table from "../components/Table/Table";

import "./Users.css";
import CustomButton from "../../../components/Button/CustomButton";
import { EyeIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import { useState } from "react";
import DeleteUserModal from "./components/DeleteUserModal";
import EditUserModal from "./components/EditUserModal";
import AddUserModal from "./components/AddUserModal";
const userData = [
  {
    id: "randomdazm",
    fullname: "haddam",
    pseudo: "younes",
    mail: "younes@younes.frr",
    role: "ROLE.CHEKAM",
  },
  {
    id: "randomdazm",
    fullname: "haddam",
    pseudo: "younes",
    mail: "younes@younes.frr",
    role: "ROLE.CHEKAM",
  },
];
export default function Users() {
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
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
        {userData.map((user, index) => (
          <tr key={index}>
            <td>{user.fullname}</td>
            <td>{user.pseudo}</td>
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
        ))}
      </table>
      <DeleteUserModal
        showModal={deleteUserModal}
        closeModal={() => setDeleteUserModal(false)}
        userName={selectedUser.fullname}
      />
      <AddUserModal
        showModal={addUserModal}
        handleClose={() => setAddUserModal(false)}
      />
    </div>
  );
}
