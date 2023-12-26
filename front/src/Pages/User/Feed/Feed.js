import React from "react";
import instagram from "../../../assets/instagram.png";
import "./Feed.css";

import Post from "./Components/Post";

export default function Feed() {
  const isConnected = true;

  const postData = [
    {
      pseudo: "Fouad",
      imageUrl: instagram,
      title: "this is a post title not same as insta",
      totalLikes: 20,
      liked: true,
      comments: [
        {
          username: "ilyes",
          content:
            "this is a commentcommentcommentcommentcomment commentcommentcommentcommentcomment commentcommentcommentcommentcomme  fafa lorem ipsum dolor iset im just writing to jump a line and do it cool i love this bro",
          userImg: instagram,
        },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        {
          username: "sofiane",
          content: "this is a comment",
          userImg: instagram,
        },
        {
          username: "younes",
          content: "this is a comment",
          userImg: instagram,
        },
      ],
      isPrivate: true,
    },
    {
      pseudo: "Fouad",
      imageUrl: instagram,
      title: "this is a post title not same as insta",
      totalLikes: 20,
      liked: false,
      comments: [
        {
          username: "ilyes",
          content:
            "this is a commentcommentcommentcommentcomment commentcommentcommentcommentcomment commentcommentcommentcommentcomme  fafa lorem ipsum dolor iset im just writing to jump a line and do it cool i love this bro",
          userImg: instagram,
        },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        { username: "ilyes", content: "this is a comment", userImg: instagram },
        {
          username: "sofiane",
          content: "this is a comment",
          userImg: instagram,
        },
        {
          username: "younes",
          content: "this is a comment",
          userImg: instagram,
        },
      ],
      isPrivate: true,
    },
  ];

  return (
    <div className="feedContainer">
      {postData.map((post, index) => (
        <Post post={post} isConnected={isConnected} />
      ))}
    </div>
  );
}
