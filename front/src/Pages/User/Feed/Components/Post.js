import React from "react";
import "./Post.css";
import { CommentIcon, HeartFillIcon, HeartIcon } from "@primer/octicons-react";
import { useState } from "react";
import CustomModal from "../../../../components/Modal/CustomModal";
import CustomButton from "../../../../components/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  content: Yup.string(),
});
export default function Post({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Add your login logic here
    },
  });
  function publishComment() {
    console.log(formik.values);
  }
  return (
    <div className="post">
      <div className="postHeader">
        <div className="postHeaderLeft">
          <img src={post.imageUrl} alt="user" className="circleUserImage" />
          <p className="userName">{post.pseudo}</p>
        </div>
      </div>
      <div className="imageContainer">
        <img src={post.imageUrl} alt="postimage" className="imagePostDisplay" />
      </div>
      <div className="separator" />
      <div className="actionsContainer">
        <a
          onClick={() => setIsLiked(!isLiked)}
          className="like-button"
          href="#comment"
        >
          {isLiked ? <HeartIcon size={24} /> : <HeartFillIcon size={24} />}
        </a>
        <a onClick={openModal} className="comment-button" href="#comment">
          <CommentIcon size={24} />
        </a>
      </div>
      <div className="commentBtn">
        <i className="far fa-comment"></i>
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="existing-comments">
          {post.comments.map((res, index) => {
            return (
              <div className="user-profile-header" key={index}>
                <img
                  src={res.userImg}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <div className="comment-content">
                  <p className="username">{res.username}</p>
                  <p className="comment">{res.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="userInput">
          <input
            className="commentInput"
            placeholder="This is a simple comment"
            value={formik.values.content}
            onChange={formik.handleChange}
            name="content"
          />
          <CustomButton text={"Commenter"} onClick={publishComment} />
        </div>
      </CustomModal>
    </div>
  );
}
