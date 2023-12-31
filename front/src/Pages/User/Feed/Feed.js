import React, { useEffect, useState } from "react";
import instagram from "../../../assets/instagram.png";
import "./Feed.css";
import { CommentIcon, HeartFillIcon, HeartIcon } from "@primer/octicons-react";

import {
  getImagePost,
  getImagePostAnonyme,
  getPosts,
  getPostsAnonyme,
} from "../../../api/posts";

export default function Feed() {
  const token = localStorage.getItem("user-token");
  const [dataa, setdataa] = useState(null);
  useEffect(() => {
    // Fetch data from API
    if (token) {
      getPosts(token).then((postData) => {
        // Create an array to store modified data
        const modifiedData = [];

        // Use Promise.all to wait for all getImagePost requests to complete
        Promise.all(
          postData.map((post) =>
            getImagePost(post.originName, token).then((imageData) => {
              // Modify the post object and push it to the array
              modifiedData.push({ ...post, image: imageData });
            })
          )
        ).then(() => {
          // Set the state after all requests are completed
          setdataa(modifiedData);
        });
      });
    } else {
      getPostsAnonyme().then((data) => {
        const modifiedData = [];

        // Use Promise.all to wait for all getImagePost requests to complete
        if (data) {
          Promise.all(
            data.map((post) =>
              getImagePostAnonyme(post.originName).then((imageData) => {
                // Modify the post object and push it to the array
                modifiedData.push({ ...post, image: imageData });
              })
            )
          ).then(() => {
            // Set the state after all requests are completed
            setdataa(modifiedData);
          });
        }
      });
    }
  }, []);

  return (
    <div className="feedContainer">
      {dataa?.map((res) => {
        const dataUrl = `data:image/png;base64,${res.image}`;

        return (
          <div className="post" key={res.originName}>
            <div className="postHeader">
              <div className="postHeaderLeft">
                <img src={instagram} alt="user" className="circleUserImage" />
                <p className="userName">{res.fullnameUser}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img src={dataUrl} alt="postimage" className="imagePostDisplay" />
            </div>
            <div className="separator" />
            <div className="actionsContainer">
              <a className="comment-button" href="#comment">
                <CommentIcon size={24} />
              </a>
            </div>
            <div className="commentBtn">
              <i className="far fa-comment"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
