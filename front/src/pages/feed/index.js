import React, { useState } from "react";
import "./style.css";
import Sidebar from "../../components/SideBar/Sidebar";
import Post from "../../components/Post/Post";

// Dummy data representing posts

export default function Feed() {
  return (
    <div className="feed-container">
      <Sidebar />
      <Post />
    </div>
  );
}
