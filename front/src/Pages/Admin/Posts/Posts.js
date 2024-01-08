import React, { useEffect, useState } from "react";

import "./Posts.css";
import CustomButton from "../../../components/Button/CustomButton";
import { EyeIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import DisplayModal from "./components/DisplayModal";
import DeleteModal from "./components/DeleteModal";
import AddPostModal from "./components/AddPostModal";
import { deletePostImage, getPosts, getPostsAnonyme } from "../../../api/posts";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/userService";

export default function Posts() {
  const [user] = useAtom(userAtom);
  const [displayImageModal, setDisplayImageModal] = useState(false);
  const [deletePubModal, setDeletePubModal] = useState(false);
  const [addPubModal, setAddPubModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("user-token");
  function deletePost() {
    setDeletePubModal(false);
    deletePostImage(selectedPost.originName, token).then((res) => {});

    //refresh data ....
  }

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    //get data from api
    getPosts(token).then((data) => {
      setUserData(data);
    });
  }, [user]);
  return (
    <div className="userContent">
      <div className="tableInfo">
        <p className="tableTitle">Gestion des publications </p>
        <p className="tableDescription">
          Dans cette page vous auriez la possibilité de modifier des
          publications
        </p>

        <div className="tableHeader">
          <CustomButton text={"Ajouter"} onClick={() => setAddPubModal(true)} />
        </div>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Visibilité</th>
            <th>Actions</th>
          </tr>
        </thead>
        {userData.length > 0 ? (
          userData?.map((user, index) => (
            <tr key={index}>
              <td>
                {user.title.length > 30
                  ? user.title.substring(0, 30) + "..."
                  : user.title}
              </td>
              <td>{user.private ? "Privé" : "Public"}</td>
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
          ))
        ) : (
          <tr>
            <td colSpan="4">No data</td>
          </tr>
        )}
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
      />
    </div>
  );
}
