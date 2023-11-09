import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/auth/signup/Signup";
import { useState } from "react";
import Feed from "./pages/feed";
// import { atom, useAtom } from 'jotai'

function App() {
  const [hasToken, setHasToken] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        {hasToken ? (
          <Route path="/" element={<Feed />} />
        ) : (
          <Route path="signup" element={<Signup />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
