// App.js
import React from "react";
import { useRoutes } from "react-router-dom";
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
import {
  HOME,
  FEED,
  PROFILE,
  USERS,
  POSTS,
  LOGIN,
  SIGNUP,
} from './utils/routes';
import PrivateRoute from "./components/Route/PrivateRoute";

const App = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: <Error />,
    },
    {
      path: HOME,
      element: <Home />,
    },
    {
      path: FEED,
      element: <Feed />,
    },
    {
      path: PROFILE,
      element: <PrivateRoute element={Profile} route={PROFILE} />,
    },
    {
      path: USERS,
      element: <PrivateRoute element={Users} route={USERS} />,
    },
    {
      path: POSTS,
      element: <PrivateRoute element={Posts} route={POSTS} />,
    },
    {
      path: LOGIN,
      element: <PrivateRoute element={Login} route={LOGIN} />,
    },
    {
      path: SIGNUP,
      element: <PrivateRoute element={Signup} route={SIGNUP} />,
    },
  ])

  return (
    <div className="app-container">
      <SideBar />
      <div className="contentContainer">
        {routes}
      </div>
    </div>
  );
};

export default App;
