import React, { useState } from "react";
import "./style.css";
import Sidebar from "../../components/SideBar/Sidebar";

// Dummy data representing posts
const posts = [
  {
    id: 1,
    username: "john_doe",
    image: "https://placekitten.com/300/300", // Replace with your image URLs
    caption: "A beautiful day at the beach 🏖",
    likes: 20,
    comments: [
      { id: 1, username: "user1", text: "Great photo!" },
      { id: 2, username: "user2", text: "Love it!" },
    ],
  },
  {
    id: 1,
    username: "john_doe",
    image: "https://placekitten.com/300/300", // Replace with your image URLs
    caption: "A beautiful day at the beach 🏖",
    likes: 20,
    comments: [
      { id: 1, username: "user1", text: "Great photo!" },
      { id: 2, username: "user2", text: "Love it!" },
    ],
  },
  {
    id: 1,
    username: "john_doe",
    image: "https://placekitten.com/300/300", // Replace with your image URLs
    caption: "A beautiful day at the beach 🏖",
    likes: 20,
    comments: [
      { id: 1, username: "user1", text: "Great photo!" },
      { id: 2, username: "user2", text: "Love it!" },
    ],
  },
  // Add more posts as needed
];

export default function Feed() {
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        username: "current_user", // Replace with the actual logged-in user's username
        text: commentText,
      };

      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <>
      <div className="post-container">
        <div className="post-header">
          <img src={post.image} alt="User Avatar" className="user-avatar" />
          <p className="username">{post.username}</p>
        </div>
        <img src={post.image} alt="Post" className="post-image" />
        <div className="post-actions">
          <button
            onClick={handleLike}
            className={isLiked ? "like-btn liked" : "like-btn"}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>
          <p>{post.likes} likes</p>
        </div>
        <div className="post-caption">
          <p className="username">{post.username}</p>
          <p>{post.caption}</p>
        </div>
        <div className="post-comments">
          {comments.map((comment) => (
            <p key={comment.id} className="comment">
              <span className="username">{comment.username}</span>{" "}
              {comment.text}
            </p>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
}
