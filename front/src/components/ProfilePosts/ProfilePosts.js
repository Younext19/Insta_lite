import React from "react";
import "./style.css";
import instagram from "../../assets/instagram.png";
export default function ProfilePosts() {
  const posts = [
    { id: 1, imageUrl: instagram },
    { id: 2, imageUrl: instagram },
    { id: 2, imageUrl: instagram },
    { id: 2, imageUrl: instagram },
    { id: 2, imageUrl: instagram },
    { id: 2, imageUrl: instagram },
  ];
  return (
    <div className="profile-posts">
      {posts.map((post) => (
        <div className="profile-post" key={post.id}>
          <a href="#" className="post-link" onClick={() => console.log("test")}>
            <img src={post.imageUrl} alt={`Post ${post.id}`} />
          </a>
        </div>
      ))}
    </div>
  );
}
