import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import instagram from "../../assets/instagram.png";
import "./Post.css";
import {
  CommentIcon,
  HeartFillIcon,
  HeartIcon,
  KebabHorizontalIcon,
} from "@primer/octicons-react";
import CustomModal from "../Modal/CustomModal";
import FormInput from "../formInput/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  content: Yup.string(),
});
export default function Post() {
  const [isLiked, setIsLiked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isConnected = true;

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const publishComment = () => {
    const data = { comment: "edzz", userId: "deka", postId: "edz" };
    console.log(data);
  };
  const postData = [
    {
      pseudo: "Fouad",
      imageUrl: instagram,
      title: "this is a post title not same as insta",
      totalLikes: 20,
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
    <div className="scrolling">
      {postData.map((res, index) => {
        return (
          <div className="post" key={index}>
            <div className="post-header">
              <div className="user-profile-header">
                <img
                  src={res.imageUrl}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <p className="username">{res.pseudo}</p>
              </div>
              <div className="settings-header">
                <a onClick={() => console.log("hi")}>
                  <KebabHorizontalIcon size={16} className="settingsIcon" />
                </a>
              </div>
            </div>
            <div className="private-section">
              <p>{res.title}</p>
            </div>
            <div className="img-container">
              <img src={res.imageUrl} alt="Post" className="post-image" />
            </div>
            {isConnected && (
              <div className="post-actions">
                <a
                  onClick={() => setIsLiked(!isLiked)}
                  className="like-button"
                  href="#comment"
                >
                  {isLiked ? (
                    <HeartIcon size={24} />
                  ) : (
                    <HeartFillIcon size={24} />
                  )}
                </a>
                <a onClick={openModal} className="like-button" href="#comment">
                  <CommentIcon size={24} />
                </a>
                <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <div className="existing-comments">
                    {res.comments.map((res, index) => {
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
                  <FormInput
                    value={formik.values.content}
                    placeholder={"Ajouter un commentaire..."}
                    name={"content"}
                    type={"string"}
                    inputStyle={"formInput"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid={!formik.errors.mail}
                    withImg={false}
                    withButton={true}
                    onPublishClick={publishComment}
                  />
                </CustomModal>
              </div>
            )}

            <p className="totalLikes">{res.totalLikes} likes</p>
          </div>
        );
      })}
    </div>
  );
}
