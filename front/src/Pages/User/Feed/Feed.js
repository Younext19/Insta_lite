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

import cadenate from "../../../assets/cadenate.png";
import CustomModal from "../../../components/Modal/CustomModal";

export default function Feed() {
  const token = localStorage.getItem("user-token");
  const [dataa, setdataa] = useState(null);
  const [commentVisibility, setCommentVisibility] = useState(false);
  useEffect(() => {
    // Fetch data from API
    if (token) {
      getPosts(token).then((postData) => {
        console.log("🚀 ~ file: Feed.js:20 ~ getPosts ~ postData:", postData);
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
      {dataa?.length === 0 ? (
        <div>No data available</div>
      ) : (
        dataa?.map((res) => {
          console.log("🚀 ~ file: Feed.js:66 ~ dataa?.map ~ res:", res);
          const dataUrl = `data:image/png;base64,${res.image}`;
          return (
            <div className="post" key={res.originName}>
              <div className="postHeader">
                <div className="postHeaderLeft">
                  <p className="userName">{res.fullnameUser}</p>

                  {res.private && (
                    <img
                      src={cadenate}
                      alt="cadenate"
                      className="iconCadenate"
                    />
                  )}
                </div>
              </div>

              <p className="descriptionn">{res.title}</p>
              <div className="imageContainer">
                <img
                  src={dataUrl}
                  alt="postimage"
                  className="imagePostDisplay"
                />
              </div>
              <div className="separator" />
              <div className="actionsContainer">
                <a
                  className="comment-button"
                  href="#comment"
                  onClick={() => setCommentVisibility(true)}
                >
                  <CommentIcon size={24} />
                </a>
              </div>

              <CustomModal
                isOpen={commentVisibility}
                onRequestClose={() => setCommentVisibility(false)}
                ovf="scroll"
              >
                <div className="comment-content-all">
                  <div className="comment-content">
                    <p className="usernameComment">fouad</p>
                    <p className="comment">dazidhazldhzak</p>
                    <div className="separator" />
                  </div>
                  {token && (
                    <div className="commentContainer">
                      <input
                        className="comment-input"
                        placeholder="Ajouter un commentaire..."
                      />
                      <div className="commentBtn">
                        <i className="far fa-comment">Commenter</i>
                      </div>
                    </div>
                  )}
                </div>
              </CustomModal>
            </div>
          );
        })
      )}
    </div>
  );
}
