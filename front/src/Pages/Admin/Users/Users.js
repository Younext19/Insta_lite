import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Button/CustomButton";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Number of items per page
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    getUsers(token).then((data) => setUserData(data));
  }, [token]);

  const deleteUserFunc = () => {
    deleteUser(token, selectedUser.id).then(() => {
      setDeleteUserModal(false);
      getUsers(token).then((data) => setUserData(data));
    });
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = userData?.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => {
    return currentItems.map((user, index) => (
      <tr key={index}>
        <td>{user.fullname ? user.fullname : "N/A"}</td>
        <td>{user.pseudo ? user.pseudo : "N/A"}</td>
        <td>{user.mail}</td>
        <td>{user.role}</td>
        <td>{user.hasPrivileges ? "Oui" : "Non"}</td>
        <td>
          <div className="actionsContainer">
            {user.role === "ROLE_UTILISATEUR" && (
              <>
                <div
                  className="editIcon"
                  onClick={() => {
                    setEditUserModal(true);
                    setSelectedUser(user);
                  }}
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
              </>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="userContent">
      <div className="tableInfo">
        <p className="tableTitle">Gestion des utilisateurs </p>
        <p className="tableDescription">
          Dans cette page vous auriez la possibilité de modifier un utilisateur
        </p>

        <div className="tableHeader">
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
            <th>Privilège</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData?.length > 0 ? (
            renderTableRows()
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(userData?.length / pageSize) },
          (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
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
      <EditUserModal
        showModal={editUserModal}
        handleClose={() => setEditUserModal(false)}
        userData={selectedUser}
      />
    </div>
  );
}
