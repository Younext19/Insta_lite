import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";

import "./Posts.css";
import CustomButton from "../../../components/Button/CustomButton";
import CustomModal from "../../../components/Modal/CustomModal";
import { EyeIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import DisplayModal from "./components/DisplayModal";
import DeleteModal from "./components/DeleteModal";
import AddPostModal from "./components/AddPostModal";
import { getPosts } from "../../../api/posts";

export default function Posts() {
  const [displayImageModal, setDisplayImageModal] = useState(false);
  const [deletePubModal, setDeletePubModal] = useState(false);
  const [addPubModal, setAddPubModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [userData, setUserData] = useState([]);
  function deletePost() {
    setDeletePubModal(false);

    //refresh data ....
  }
  function addPost(postData) {
    console.log("🚀 ~ file: Posts.js:77 ~ addPost ~ postData:", postData);
  }
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5mcnIiLCJmdWxsbmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTMxNTU2fQ.-a3rTVonnlelYlj83Pu0tsb74EpnYdlIFkZoubLFCs0";

    //get data from api
    getPosts(token).then((data) => {
      console.log("🚀 ~ file: Posts.js:30 ~ getPosts ~ data:", data);
      setUserData(data);
    });
  }, []);
  return (
    <div className="userContent">
      <div className="tableInfo">
        <p className="tableTitle">Gestion des publications </p>
        <p className="tableDescription">
          Dans cette page vous auriez la possibilité de modifier des
          publications
        </p>

        <div className="tableHeader">
          <input className="searchInput" placeholder="Search dazdza" />
          <CustomButton text={"Ajouter"} onClick={() => setAddPubModal(true)} />
        </div>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Total Likes</th>
            <th>Visibilité</th>
            <th>Actions</th>
          </tr>
        </thead>
        {userData?.map((user, index) => (
          <tr key={index}>
            <td>
              {user.title.length > 30
                ? user.title.substring(0, 30) + "..."
                : user.title}
            </td>
            <td>{user.totalLikes}</td>
            <td>{user.isPrivate ? "Privé" : "Public"}</td>
            <td>
              <div className="actionsContainer">
                <div
                  className="eyeIcon"
                  onClick={() => {
                    setDisplayImageModal(true);
                    setSelectedPost(user);
                  }}
                >
                  <EyeIcon size={24} />
                </div>

                <div className="editIcon">
                  <PencilIcon size={24} />
                </div>
                <div
                  className="deleteIcon"
                  onClick={() => {
                    setDeletePubModal(true);
                    setSelectedPost(user);
                  }}
                >
                  <TrashIcon size={24} />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <DisplayModal
        showModal={displayImageModal}
        closeModal={() => setDisplayImageModal(false)}
        userData={selectedPost}
      />
      <DeleteModal
        showModal={deletePubModal}
        closeModal={() => setDeletePubModal(false)}
        handleDelete={deletePost}
        userData={selectedPost}
      />
      <AddPostModal
        showModal={addPubModal}
        closeModal={() => setAddPubModal(false)}
        handleAddPost={addPost}
      />
    </div>
  );
}
