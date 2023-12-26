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
          <Route element={<Home />} path="/home" />
          <Route element={<Feed />} path="/feed" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Users />} path="/users" />
          <Route element={<Posts />} path="/posts" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
        </Routes>
      </div>
    </div>
  );
};

export default App;
