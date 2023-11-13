import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/signup/Signup";
import { useState } from "react";
import Feed from "./pages/feed";
import Login from "./pages/auth/login/Login";
// import { atom, useAtom } from 'jotai'

function App() {
  const [hasToken, setHasToken] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/feed" element={<Feed />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
