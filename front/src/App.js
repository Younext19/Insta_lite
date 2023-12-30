// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
import Feed from "./Pages/User/Feed/Feed";
import Profile from "./Pages/User/Profile/Profile";
import Users from "./Pages/Admin/Users/Users";
import Posts from "./Pages/Admin/Posts/Posts";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Signup/Signup";
import Error from "./Pages/ErrorPage/Error";
const App = () => {
  const userRole = "admin";

  return (
    // App.js

    <div className="app-container">
      <SideBar userRole={userRole} />
      <div className="contentContainer">
        <Routes>
          <Route element={<Error />} path="*" />
          <Route element={<Home />} path="/home" /> {/** Les trois */}
          <Route element={<Feed />} path="/feed" /> {/** Les trois */}
          <Route element={<Profile />} path="/profile" />{" "}
          {/** Authentifié user */}
          <Route element={<Users />} path="/users" /> {/** Authentifié admin */}
          <Route element={<Posts />} path="/posts" />
          {/* Authentifié admin */}
          <Route element={<Login />} path="/login" />
          {/** login ( non auth) */}
          <Route element={<Signup />} path="/signup" />
          {/** signup ( non auth) */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
