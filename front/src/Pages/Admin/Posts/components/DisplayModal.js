import React from "react";
import "./DisplayModal.css";
const DisplayModal = ({ showModal, closeModal, userData }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <div className="user-post">
          <img
            src={userData.imageUrl}
            alt={`Post ${userData.id}`}
            className="post-image"
          />
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
