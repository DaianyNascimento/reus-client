import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getCsrfToken } from "./consts";
import { Custom404Page } from "./pages/Custom404Page";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

export default function App() {
  useEffect(() => {
    getCsrfToken();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Custom404Page />} />
      </Routes>
    </div>
  );
}
