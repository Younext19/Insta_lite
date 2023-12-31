import React, { useEffect, useState } from "react";
import "./DisplayModal.css";
import { getImagePost } from "../../../../api/posts";
const DisplayModal = ({ showModal, closeModal, userData }) => {
  const [IMG, setIMG] = useState("");

  const token = localStorage.getItem("user-token");

  useEffect(() => {
    getImagePost(userData.originName, token).then((data) => {
      setIMG(data);
      if (data) {
        handleData(data);
      }
    });
  }, [userData.originName]);
  const handleData = (data) => {
    const dataUrl = `data:image/png;base64,${data}`;
    setIMG(dataUrl);
  };
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <div className="user-post">
          <img src={IMG} alt={`Post ${userData.id}`} className="post-image" />
          <p className="dataTitle">{userData.title}</p>
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
