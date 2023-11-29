import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import { useState } from "react";
import Login from "./pages/auth/login/Login";
import Loader from "./components/Loader/Loader";
import { useEffect } from "react";
import { verifyCookie } from "./services/token.service";
import LandingPage from "./pages/landing/LandingPage";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Layout from "./components/Layout/Layout";
import Feed from "./pages/feed/Feed";
import UsersBar from "./pages/admin/UsersManagement/UsersBar";
import ImgBar from "./pages/admin/ImagesManagement/ImgBar";
// import { atom, useAtom } from 'jotai'

function App() {
  const [fetchingToken, setFetchingToken] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? "");
  // useEffect(() => {
  //   const auxTok = localStorage.getItem("accessToken");
  //   setToken(auxTok);
  // }, []);

  // useEffect(() => {
  //   let cookieToken = localStorage.getItem("accessToken");
  //   let refreshToken = localStorage.getItem("refreshToken");
  //   verifyCookie(cookieToken, refreshToken, setToken, setFetchingToken);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              [null, undefined, "", "no token"].includes(token) && <Login />
            }
          />
          <Route
            path="/signup"
            element={
              [null, undefined, "", "no token"].includes(token) && <Signup />
            }
          />
          <Route
            path="/home"
            element={
              [null, undefined, "", "no token"].includes(token) && (
                <Layout>
                  <Home />
                </Layout>
              )
            }
          />
          <Route
            path="/feed"
            element={
              [null, undefined, "", "no token"].includes(token) && (
                <Layout>
                  <Feed />
                </Layout>
              )
            }
          />
          <Route
            path="/profile"
            element={
              [null, undefined, "", "no token"].includes(token) && (
                <Layout>
                  <Profile />
                </Layout>
              )
            }
          />
          <Route
            path="/users"
            element={
              [null, undefined, "", "no token"].includes(token) && (
                <Layout isAdmin={true}>
                  <UsersBar />
                </Layout>
              )
            }
          />
          <Route
            path="/images"
            element={
              [null, undefined, "", "no token"].includes(token) && (
                <Layout isAdmin={true}>
                  <ImgBar />
                </Layout>
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <Router>

//             </Router>
//           <>
//           <Route path="/" element={<Home />} />
//           <Route path="/feed" element={<Feed />} />
//         </>
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </>
//         )}

//         <Route path="/profile" element={<Profile />} />
//         <Route path="/home">
//           <HomeLayout>
//             <Feed />
//           </HomeLayout>
//         </Route>
//         <Route path="/profile/:username">
//           <HomeLayout>
//             <Profile />
//           </HomeLayout>
//         </Route>
