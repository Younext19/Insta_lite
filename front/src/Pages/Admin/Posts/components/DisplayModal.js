import React, { useEffect, useState } from "react";
import "./DisplayModal.css";
import { getImagePost } from "../../../../api/posts";
const DisplayModal = ({ showModal, closeModal, userData }) => {
  const [IMG, setIMG] = useState("");

  console.log(
    "🚀 ~ file: DisplayModal.js:5 ~ DisplayModal ~ userData:",
    userData.originName
  );

  useEffect(() => {
    getImagePost(
      userData.originName,
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5mcnIiLCJmdWxsbmFtZSI6ImFkbWluIiwiZXhwIjoxNzAzOTQ0OTEwfQ.JcMNwUorYeiHEzJuuh94KBUU967b3tErOJK21yiFv80"
    ).then((data) => {
      setIMG(data);
      if (data) {
        handleData(data);
      }
      console.log("🚀 ~ file: DisplayModal.js:16 ~ ).then ~ data:", data);
    });
  }, [userData.originName]);
  const handleData = (data) => {
    const imageData = new Uint8Array(data);
    const binaryString = imageData.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64 = btoa(binaryString);
    const dataUrl = `data:image/png;base64,${base64}`;
    setIMG(dataUrl);
  };
  console.log("🚀 ~ file: DisplayModal.js:4 ~ DisplayModal ~ userData:", IMG);
  if (!showModal) {
    return null; // Don't render anything if the modal is not visible
  }
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(res) => res.stopPropagation()}>
        <div className="user-post">
          <img
            src={
              "http://localhost:8082/images/download/a113a2a9-7a3d-4776-93fd-4c8d02a91896.png"
            }
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
