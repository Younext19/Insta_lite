import React, { useEffect, useState } from "react";
import "./DisplayModal.css";
import { getImagePost } from "../../../../api/posts";
const DisplayModal = ({ showModal, closeModal, userData }) => {
  const [IMG, setIMG] = useState("");

  console.log(
    "🚀 ~ file: DisplayModal.js:5 ~ DisplayModal ~ userData:",
    userData.originName
  );

  getImagePost(
    userData.originName,
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5mcnIiLCJmdWxsbmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTMxNTU2fQ.-a3rTVonnlelYlj83Pu0tsb74EpnYdlIFkZoubLFCs0"
  ).then((data) => {
    setIMG(data);
    if (data) {
      setIMG(data);
    }
    console.log("🚀 ~ file: DisplayModal.js:16 ~ ).then ~ data:", data);
  });

  console.log("🚀 ~ file: DisplayModal.js:4 ~ DisplayModal ~ userData:", IMG);
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <div className="user-post">
          <img src={IMG} alt={`Post ${userData.id}`} className="post-image" />
          <p className="dataTitle">{userData.title}</p>
          <p>Total Likes: {userData.totalLikes}</p>
          <p>
            Ceci est un publication{userData?.isPrivate ? " privé" : " public"}
          </p>
          <div className="comments">
            {userData?.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <img
                  src={comment.userImg}
                  alt={`User ${comment.username}`}
                  className="comment-image"
                />
                <p>
                  <strong>{comment.username}</strong>: {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayModal;
