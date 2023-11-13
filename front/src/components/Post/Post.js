import React from "react";
import instagram from "../../assets/instagram.png";
import "./Post.css";
export default function Post() {
  return (
    <div className="post-content">
      <div className="post">
        <div className="post-header">
          <img src={instagram} alt="User Avatar" className="user-avatar" />
          <p className="username">zdzdz</p>
        </div>
        <img src={instagram} alt="Post" className="post-image" />
        <div className="post-actions">
          <button
            onClick={() => console.log("dz")}
            className={true ? "like-btn liked" : "like-btn"}
          >
            {true ? "Unlike" : "Like"}
          </button>
          <p>20 likes</p>
        </div>
      </div>
    </div>
  );
}
